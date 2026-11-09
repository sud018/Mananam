# మననం (Mananam)

A personal app for understanding the meaning of mantras and stotras while you recite them.
"Mananam" (మననం) is the Vedantic step of reflecting on what you have heard, between
śravaṇa (hearing) and nididhyāsana (meditation).

## Folder layout
```
Mananam/
  index.html            the app (library → contents → reader)
  library.js            list of texts on the home screen
  manifest.webmanifest  home-screen app settings
  sw.js                 offline support
  icon-*.png            app icons
  texts/
    rudram/
      text.js           Sri Rudram (Namakam, Chamakam) text and Telugu meanings
      NOTES.md          proofreading notes for this text
```

## Adding a new text (for example Vishnu Sahasranamam)
1. Make a folder `texts/vishnu-sahasranamam/`.
2. Add `text.js` in the same format as `texts/rudram/text.js`:
   - `unitLabel`: what each section is called (అనువాకం, అధ్యాయం, …)
   - `itemLabel`: what each verse is called (మంత్రం, శ్లోకం, నామం, …)
   - `parts` → `units` → `items` (each item has `n`, `text`, `meaning`); a unit can have an `opening` and a `summary`.
   - A text with no natural parts just has one part.
3. In `library.js`, set `ready: true` for that entry (or add a new entry).
4. If you want it available offline before it is first opened, add its path to `CORE` in `sw.js`.

Progress, bookmarks and notes are kept separately for each text.

## Listening
- **Listen to mantra** reads the Sanskrit mantra. The app converts the Telugu-script mantra to Devanagari and uses a Hindi/Sanskrit voice if the device has one (otherwise the Telugu voice). It is plain pronunciation, not Vedic chanting.
- **Listen to meaning** reads the Telugu meaning with a Telugu voice.
- **Listen to whole anuvakam** plays mantra → meaning → next mantra … to the end, turning the pages by itself. ⚙ Settings lets you choose mantra + meaning, mantra only or meaning only, the speed, and the voices.
- iPhone: download voices in Settings → Accessibility → Spoken Content → Voices (Telugu, and Hindi for mantras). Windows: Microsoft Edge has Telugu and Hindi voices; Chrome on Windows has no Telugu voice.

## Natural-sounding audio (recommended)
Phone voices for Telugu and Sanskrit sound robotic. To get natural Microsoft neural voices on every device:
1. Install Python from python.org (tick "Add python.exe to PATH").
2. Double-click `tools\make_audio.bat`. It makes ~525 MP3 files in `audio\rudram\` (about 10–20 minutes; you can stop and restart, finished files are kept).
   - Meanings: Telugu "Shruti" (female). For a male voice run `python tools\make_audio.py --male`.
   - Mantras: Hindi "Madhur" reading the Sanskrit. This is clear pronunciation, not Vedic chanting.
3. Upload: `git add audio` → `git commit -m "Add audio"` → `git push`.
The app plays these files automatically; where a file is missing it uses the phone's voice.

## Most natural Telugu meanings
`python tools\make_audio.py --only a --engine sarvam --key YOUR_KEY --speaker kavitha --redo`
uses Sarvam Bulbul v3 (Indian-made, trained on Indian speech). Get a key at dashboard.sarvam.ai. Try a few speakers on sarvam.ai first.

## Your own chanting
In any mantra, tap **🎙 Record mantra** (or **🎙 Record meaning**), speak, tap Stop. From then on it plays in your voice, also in whole-anuvakam play. Recordings stay on that phone only.

## Language of buttons
⚙ Settings → Button language: తెలుగు or English. The mantras and meanings stay in Telugu.

## Owner
The footer shows the owner set in `library.js` (`MANANAM_OWNER`).
