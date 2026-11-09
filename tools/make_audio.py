"""
Creates natural-sounding audio for a text in the Mananam app, using Microsoft's
neural voices (the same voices as Edge "Read aloud"), and saves MP3 files the app
plays on every device, offline.

    python tools/make_audio.py              # Sri Rudram, default voices
    python tools/make_audio.py --male       # male Telugu voice for meanings
    python tools/make_audio.py --only a     # meanings only   (--only m = mantras only)

  Most natural Telugu meanings (Sarvam "Bulbul", trained on Indian speech; needs a free/paid API key
  from https://dashboard.sarvam.ai):
    pip install sarvamai
    python tools/make_audio.py --only a --engine sarvam --key YOUR_KEY --speaker kavitha --redo

Needs:  pip install edge-tts   (for the default engine)
Files already made are skipped, so you can stop and run it again any time.
"""
import argparse, asyncio, json, os, re, sys, time

edge_tts = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

VOICES = {
    "meaning_f": "te-IN-ShrutiNeural",   # Telugu, female
    "meaning_m": "te-IN-MohanNeural",    # Telugu, male
    "mantra":    "hi-IN-MadhurNeural",   # reads the Sanskrit mantra from Devanagari
}


def load_text(text_id):
    path = os.path.join(ROOT, "texts", text_id, "text.js")
    s = open(path, encoding="utf-8").read()
    mark = "['%s'] = " % text_id
    body = s[s.index(mark) + len(mark):].rstrip().rstrip(";")
    return json.loads(body)


def to_deva(s):
    """Telugu script -> Devanagari (Sanskrit mantras)."""
    s = s.replace("గ్ం", "ం").replace("(", " ").replace(")", " ").replace("శ్లో॥", "")
    out = []
    for ch in s:
        c = ord(ch)
        if 0x0C00 <= c <= 0x0C7F:
            c = {0x0C46: 0x0C47, 0x0C4A: 0x0C4B, 0x0C0E: 0x0C0F, 0x0C12: 0x0C13, 0x0C31: 0x0C30}.get(c, c)
            out.append(chr(c - 0x0300))
        else:
            out.append(ch)
    s = "".join(out)
    s = re.sub(r"\s*\n\s*", " । ", s)
    return re.sub(r"(।\s*){2,}", "। ", s)


def jobs_for(text, only):
    jobs = []
    for part in text["parts"]:
        for unit in part["units"]:
            steps = [("v", it) for it in unit["items"]] + ([("s", unit["summary"])] if unit.get("summary") else [])
            for i, (kind, it) in enumerate(steps, start=1):
                base = "%s-%s-%d" % (part["id"], unit["n"], i)
                if kind == "v":
                    if only in (None, "m"):
                        jobs.append((base + "-m", to_deva(it["text"]), "mantra"))
                    if only in (None, "a"):
                        jobs.append((base + "-a", it["meaning"], "meaning"))
                elif only in (None, "a"):
                    jobs.append((base + "-a", it, "meaning"))
    return jobs


def split_text(text, limit=1500):
    parts, buf = [], ""
    for piece in re.split(r"(?<=[.!?।॥])\s+", text):
        if len(buf) + len(piece) + 1 > limit and buf:
            parts.append(buf); buf = piece
        else:
            buf = (buf + " " + piece).strip()
    if buf: parts.append(buf)
    return parts


def sarvam_to_file(client, text, path, speaker, pace):
    """Sarvam Bulbul v3 -> WAV (pieces joined)."""
    import base64, io, wave
    frames, params = [], None
    for piece in split_text(text):
        import inspect
        params_ok = inspect.signature(client.text_to_speech.convert).parameters
        args = dict(text=piece, model="bulbul:v3", speaker=speaker, pace=pace)
        if "language_code" in params_ok:      # newer sarvamai library
            args["language_code"] = "te-IN"
        else:                                  # older sarvamai library
            args["target_language_code"] = "te-IN"
        if "output_audio_codec" in params_ok:
            args["output_audio_codec"] = "wav"
        r = client.text_to_speech.convert(**args)
        b64 = (getattr(r, "audios", None) or r["audios"])[0]
        w = wave.open(io.BytesIO(base64.b64decode(b64)))
        params = params or w.getparams()
        frames.append(w.readframes(w.getnframes()))
    pcm = b"".join(frames)
    try:
        import lameenc                      # small MP3s (about 0.5 MB per minute)
        enc = lameenc.Encoder()
        enc.set_bit_rate(64); enc.set_in_sample_rate(params.framerate)
        enc.set_channels(params.nchannels); enc.set_quality(2)
        open(path, "wb").write(enc.encode(pcm) + enc.flush())
        return "mp3"
    except ImportError:
        out = wave.open(path, "wb"); out.setparams(params); out.writeframes(pcm); out.close()
        return "wav"


async def make_one(job, outdir, voices, sem, stats, engine="edge", client=None, speaker=None, redo=False):
    key, text, kind = job
    use_sarvam = engine == "sarvam" and kind == "meaning"
    ext = "mp3"
    path = os.path.join(outdir, key + ".mp3")
    if not redo and any(os.path.exists(os.path.join(outdir, key + e)) and os.path.getsize(os.path.join(outdir, key + e)) > 1000 for e in (".mp3", ".wav")):
        stats["skip"] += 1
        return
    voice = voices[kind]
    rate = "-12%" if kind == "mantra" else "-4%"
    async with sem:
        for attempt in range(6):
            try:
                tmp = path + ".part"
                if use_sarvam:
                    got = await asyncio.to_thread(sarvam_to_file, client, text, tmp, speaker, 0.95)
                    if got == "wav": path = path[:-3] + "wav"; ext = "wav"
                else:
                    await edge_tts.Communicate(text, voice, rate=rate).save(tmp)
                os.replace(tmp, path)
                other = path[:-3] + ("mp3" if ext == "wav" else "wav")
                if os.path.exists(other): os.remove(other)
                stats["made"] += 1
                done = stats["made"] + stats["skip"]
                print("  %4d / %d  %s" % (done, stats["total"], key), flush=True)
                return
            except Exception as e:  # network hiccups: wait and retry
                msg = str(e)
                code = getattr(e, "status_code", None)
                print("  ! %s try %d failed: %s %s" % (key, attempt + 1, code or "", msg[:200]), flush=True)
                if code in (401, 402, 403) or "credit" in msg.lower() or "quota" in msg.lower():
                    print("\nStopping: Sarvam refused the key or there are no credits left (see the line above).", flush=True)
                    try:
                        n = write_index(os.path.basename(outdir), outdir, voices)
                        print("Saved so far: the app knows %d audio files. Run again after adding credits to make the rest." % n, flush=True)
                    finally:
                        os._exit(1)
                await asyncio.sleep((20 + attempt * 20) if code == 429 else (2 + attempt * 3))
                last = e
        stats["fail"].append((key, str(last)))


def write_names(text, text_id):
    """audio/<text>/FILE-NAMES.csv: which file name belongs to which mantra (for your own recordings)."""
    import csv
    path = os.path.join(ROOT, "audio", text_id, "FILE-NAMES.csv")
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["file (mantra = -m, meaning = -a)", "part", "anuvakam", "step", "starts with"])
        for part in text["parts"]:
            for unit in part["units"]:
                steps = [("v", it) for it in unit["items"]] + ([("s", unit["summary"])] if unit.get("summary") else [])
                for i, (kind, it) in enumerate(steps, start=1):
                    base = "%s-%s-%d" % (part["id"], unit["n"], i)
                    first = (it["text"] if kind == "v" else "సారాంశం (summary)").split("\n")[0][:40]
                    w.writerow([base + ("-m.mp3 / " + base + "-a.mp3" if kind == "v" else "-a.mp3"), part["id"], unit["n"], i, first])


def write_index(text_id, outdir, voices):
    files = {}
    for f in sorted(os.listdir(outdir)):
        if (f.endswith(".mp3") or f.endswith(".wav") or f.endswith(".m4a")) and os.path.getsize(os.path.join(outdir, f)) > 1000:
            files[f[:-4]] = 1 if f.endswith(".mp3") else f[-3:]
    js = ("// Made by tools/make_audio.py – lists the natural-voice MP3 files the app can play.\n"
          "(window.MANANAM_AUDIO = window.MANANAM_AUDIO || {})['%s'] = %s;\n") % (
        text_id, json.dumps({"voices": voices, "files": files}, ensure_ascii=False, indent=0))
    open(os.path.join(outdir, "index.js"), "w", encoding="utf-8").write(js)
    return len(files)


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--text", default="rudram")
    ap.add_argument("--male", action="store_true", help="male Telugu voice for meanings")
    ap.add_argument("--only", choices=["m", "a"], help="m = mantras only, a = meanings only")
    ap.add_argument("--parallel", type=int, default=4)
    ap.add_argument("--engine", choices=["edge", "sarvam"], default="edge", help="sarvam = most natural Telugu meanings")
    ap.add_argument("--key", help="Sarvam API key (or set SARVAM_API_KEY)")
    ap.add_argument("--speaker", default="kavitha", help="Sarvam voice name")
    ap.add_argument("--redo", action="store_true", help="make files again even if they exist")
    ap.add_argument("--index-only", action="store_true", help="only refresh the list of audio files (after adding your own recordings)")
    a = ap.parse_args()
    global edge_tts
    text = load_text(a.text)
    outdir = os.path.join(ROOT, "audio", a.text)
    os.makedirs(outdir, exist_ok=True)
    write_names(text, a.text)
    if a.index_only:
        n = write_index(a.text, outdir, {"note": "index refreshed"})
        print("The app now knows %d audio files in %s" % (n, outdir)); return
    client = None
    if a.engine == "sarvam":
        try:
            from sarvamai import SarvamAI
        except ImportError:
            sys.exit("Please run first:  pip install sarvamai")
        key = a.key or os.environ.get("SARVAM_API_KEY")
        if not key: sys.exit("Give your Sarvam key with --key or SARVAM_API_KEY")
        client = SarvamAI(api_subscription_key=key)
    if a.engine == "edge" or a.only != "a":
        try:
            import edge_tts as _e
            edge_tts = _e
        except ImportError:
            sys.exit("Please run first:  pip install edge-tts")

    voices = {"mantra": VOICES["mantra"], "meaning": VOICES["meaning_m" if a.male else "meaning_f"]}
    jobs = jobs_for(text, a.only)
    stats = {"made": 0, "skip": 0, "fail": [], "total": len(jobs)}
    if a.engine == "sarvam":
        voices["meaning"] = "Sarvam bulbul:v3, Telugu (te-IN), speaker " + a.speaker
    print("Making %d audio files in %s" % (len(jobs), outdir))
    if a.only != "a": print("Mantra voice:  %s" % voices["mantra"])
    if a.only != "m": print("Meaning voice: %s" % voices["meaning"])
    print("(the first file can take up to a minute)\n", flush=True)
    t0 = time.time()
    sem = asyncio.Semaphore(a.parallel)
    await asyncio.gather(*(make_one(j, outdir, voices, sem, stats, a.engine, client, a.speaker, a.redo) for j in jobs))
    n = write_index(a.text, outdir, voices)
    print("\nDone in %d min. New: %d, already there: %d, failed: %d. The app now knows %d files."
          % ((time.time() - t0) // 60, stats["made"], stats["skip"], len(stats["fail"]), n))
    if stats["fail"]:
        print("Some failed (run the script again to retry):")
        for k, e in stats["fail"][:10]:
            print("  ", k, e[:100])


if __name__ == "__main__":
    asyncio.run(main())
