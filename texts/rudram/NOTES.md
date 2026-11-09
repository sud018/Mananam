# శ్రీ రుద్రం – proofreading notes

**Source:** "RUDRAM – NAMAKAM – CHAMAKAM with TELUGU MEANING", Kiron Type Institute, Vijayawada (PDF, 70 pages).
In the app: Dhyanam (2), Namakam (11 anuvakams, 173 mantras), Chamakam (11 anuvakams, 76 mantras) = 251 mantras, plus a summary for every anuvakam.

## How the text was checked
1. Every page was typed from the page images.
2. Every page was also read by Telugu OCR, colour-separated (black = mantra, pink = meaning, blue = summary). My typing was compared word by word with the OCR; every disagreement was looked at on the page image. All remaining disagreements are OCR misreadings.
3. All mantra lines were compared with independent published texts (hindupad.com Telugu Namakam; hindupad.com transliterated Chamakam). Results below.
4. Svara (accent) marks are not shown.

## Mantra lines – differences from the web texts (PDF form kept)
- Namakam 3.12 విధ్యద్భ్యశ్చ, 5.15 స్రోతస్యాయ, 6.13 వరూథినే, 10.10 శివతమ, 11.11 రుద్రేభ్యో, 11.16 యజ్ఞస్య – the web page has typos here; PDF matches the standard Taittiriya text.
- Namakam 10.8 ఉపహత్నుముగ్రమ్ (PDF, standard) – web has ఉపహంతుముగ్రమ్.
- Namakam 9.7 హృదయ్యాయ and 9.11 ఊర్మ్యాయ – PDF and web agree; some texts read హ్రదయ్యాయ / ఊర్వ్యాయ.
- Chamakam 1.1 అగ్నావిష్ణూ (PDF also prints విష్ణో as an alternative); 9.5 వృష్ట్యా (web: దృష్ట్యా).

## Meanings – printing slips I corrected (PDF wording otherwise kept as printed)
| Place | PDF prints | App shows |
|---|---|---|
| Namakam 1.1 | బాహ్యాంతశ్సత్రుహీనునిగా | బాహ్యాంతశ్శత్రుహీనునిగా |
| Namakam 1.9 | ఫర్జన్య | పర్జన్య |
| Namakam 3 summary | చేదించేవాడు, ఆశ్వమైన, ఆశ్వపతి | ఛేదించేవాడు, అశ్వమైన, అశ్వపతి |
| Namakam 4.15 | శరీరములను (for arrow-makers) | శరములను |
| Namakam 4.17 | శ్వాస రూపధారులకు | శ్వాన రూపధారులకు (dog) |
| Namakam 9.6 | విషయములైన గిరి గుహాదులు | విషమములైన |
| Namakam 10.5 | తండ్రిని చంకపుము | చంపకుము |
| Namakam 10.8 | హృదయ పద్మమును … ; నీ సేవలు … శత్రువును నశింప జేయు గాక | పద్మమున ; నీ సేనలు |
| Chamakam 11.3 | ఫర్జన్య సిద్ధి | పర్జన్య సిద్ధి |
| Many places | ఋ printed in a form that looks like బు | ఋ |

## Kept exactly as printed, but please check
- Namakam 1: సౌమస్య, సదృవమైన, బట్టెలు, నమపస్కారములు, రోగమలనుండి (likely slips).
- Namakam 7 summary: "నగారా మోగించే ఓడు" (probably కోల / stick).
- Namakam 10.7: "నీ యొక్క (ఉగ్ర) రూపమున ఉండు గాక" (probably దూరమున).

## Things the book itself does
- **Namakam 7, mantras 9–16:** the book says no meaning was found for these 8. The app shows short meanings taken from that anuvakam's own summary paragraph and marks them as such.
- **Chamakam summaries:** the book prints each summary after the *next* anuvakam's mantras. In the app each summary is placed with the anuvakam it describes.
- **"ఈ అనువాకం భావం"** notes come from the book's pages 65–67 (Namakam) and 67 (Chamakam).
- The Chamakam 11 summary was split from the book's combined Chamakam 10–11 paragraph on page 63.

## Svara (accent) marks
Mantras are shown with Vedic svaras (switch in ⚙ Settings). The PDF has no svaras, so the svara text comes from
**stotrasamhita/vedamantra-book** (GitHub, commit 3bbc26b6, `mantras/RudraPrashnah.tex`, `ChamakaPrashnah.tex`,
Unicode Devanagari with svaras; "for personal study use, not for commercial printing or distribution"),
converted to Telugu script. An independent project (Studylooping/rudram, TEXT.md) cross-checked this text against the
KYVeda Taittirīya Saṃhitā 4.5 / 4.7 and found 1–2 svara disagreements in the whole Namakam and none in the Chamakam.

- Marks: ◌॒ (line below) anudātta, ◌॑ (line above) svarita, ◌᳚ (double line) dīrgha svarita; unmarked = udātta / pracaya. ꣳ is written గ్ం as in Telugu books.
- Each of the 249 Vedic mantras was matched to the PDF's mantra automatically (similarity ≥ 0.9 for all; Namakam 11.16 placed by hand).
- Namakam 11: the source prints the refrain "తేషాగ్ం సహస్రయోజనేఽవ ధన్వాని తన్మసి" once; it is chanted after every line, so it is repeated in each mantra.
- Joined words across mantra boundaries were split (e.g. మేఽఙ్గాని → మే / అఙ్గాని).
- The svara text uses the Taittirīya spelling, which differs slightly from the PDF in places, e.g. సత్వనాం (PDF సత్త్వనాం), త్రికాలాగ్నికాలాయ (త్రికాగ్నికాలాయ), హ్రదయ్యాయ (హృదయ్యాయ), ఊర్వ్యాయ (ఊర్మ్యాయ), ఆభురస్య (అభురస్య), అఫ్సు (అప్సు), మసురాశ్చ (మసూరాశ్చ), దిత్యవాచ్చ (దిత్యవాట్చ). Turning svaras off shows the PDF text.
- The dhyāna ślokas and the closing ślokas are classical (not Vedic) and have no svaras.
- Font for mantras: Tiro Telugu (SIL Open Font License, `fonts/`).

## Pictures
The illustrations are original line drawings made for this app from symbols in each anuvakam (bow and quiver, linga, rivers, rain, cows, yajna fire, numbers). They are not copied from anywhere.
