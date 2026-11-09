"""
Creates natural-sounding audio for a text in the Mananam app, using Microsoft's
neural voices (the same voices as Edge "Read aloud"), and saves MP3 files the app
plays on every device, offline.

    python tools/make_audio.py              # Sri Rudram, default voices
    python tools/make_audio.py --male       # male Telugu voice for meanings
    python tools/make_audio.py --only a     # meanings only   (--only m = mantras only)

Needs:  pip install edge-tts
Files already made are skipped, so you can stop and run it again any time.
"""
import argparse, asyncio, json, os, re, sys, time

try:
    import edge_tts
except ImportError:
    sys.exit("Please run first:  pip install edge-tts")

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


async def make_one(job, outdir, voices, sem, stats):
    key, text, kind = job
    path = os.path.join(outdir, key + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        stats["skip"] += 1
        return
    voice = voices[kind]
    rate = "-12%" if kind == "mantra" else "-4%"
    async with sem:
        for attempt in range(4):
            try:
                tmp = path + ".part"
                await edge_tts.Communicate(text, voice, rate=rate).save(tmp)
                os.replace(tmp, path)
                stats["made"] += 1
                done = stats["made"] + stats["skip"]
                print("  %4d / %d  %s" % (done, stats["total"], key), flush=True)
                return
            except Exception as e:  # network hiccups: wait and retry
                await asyncio.sleep(2 + attempt * 3)
                last = e
        stats["fail"].append((key, str(last)))


def write_index(text_id, outdir, voices):
    files = sorted(f[:-4] for f in os.listdir(outdir) if f.endswith(".mp3") and os.path.getsize(os.path.join(outdir, f)) > 1000)
    js = ("// Made by tools/make_audio.py – lists the natural-voice MP3 files the app can play.\n"
          "(window.MANANAM_AUDIO = window.MANANAM_AUDIO || {})['%s'] = %s;\n") % (
        text_id, json.dumps({"voices": voices, "files": {k: 1 for k in files}}, ensure_ascii=False, indent=0))
    open(os.path.join(outdir, "index.js"), "w", encoding="utf-8").write(js)
    return len(files)


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--text", default="rudram")
    ap.add_argument("--male", action="store_true", help="male Telugu voice for meanings")
    ap.add_argument("--only", choices=["m", "a"], help="m = mantras only, a = meanings only")
    ap.add_argument("--parallel", type=int, default=4)
    a = ap.parse_args()

    voices = {"mantra": VOICES["mantra"], "meaning": VOICES["meaning_m" if a.male else "meaning_f"]}
    text = load_text(a.text)
    outdir = os.path.join(ROOT, "audio", a.text)
    os.makedirs(outdir, exist_ok=True)
    jobs = jobs_for(text, a.only)
    stats = {"made": 0, "skip": 0, "fail": [], "total": len(jobs)}
    print("Making %d audio files in %s" % (len(jobs), outdir))
    print("Voices: mantras = %s, meanings = %s\n" % (voices["mantra"], voices["meaning"]))
    t0 = time.time()
    sem = asyncio.Semaphore(a.parallel)
    await asyncio.gather(*(make_one(j, outdir, voices, sem, stats) for j in jobs))
    n = write_index(a.text, outdir, voices)
    print("\nDone in %d min. New: %d, already there: %d, failed: %d. The app now knows %d files."
          % ((time.time() - t0) // 60, stats["made"], stats["skip"], len(stats["fail"]), n))
    if stats["fail"]:
        print("Some failed (run the script again to retry):")
        for k, e in stats["fail"][:10]:
            print("  ", k, e[:100])


if __name__ == "__main__":
    asyncio.run(main())
