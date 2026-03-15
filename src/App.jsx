import { useState, useEffect, useCallback, useRef } from "react";
import { BookOpen, Music, Piano, Headphones, PenLine, Check, ExternalLink, Trophy, RotateCcw, ChevronLeft, ChevronRight, LayoutList, Library, Search } from "lucide-react";

// ── TRACK CONFIG ─────────────────────────────────────────────────────────────
const TRACKS = [
  { key: "theory",      label: "Theory",       icon: BookOpen,    color: "#1c4a8a", bg: "#eef3fc", border: "#c5d6f5" },
  { key: "score",       label: "Score Study",  icon: Music,       color: "#7a4520", bg: "#fdf4ec", border: "#e8cdb0" },
  { key: "keyboard",    label: "Keyboard",     icon: Piano,       color: "#1a5e38", bg: "#ecf8f2", border: "#aedbca" },
  { key: "ear",         label: "Ear Training", icon: Headphones,  color: "#5a2d80", bg: "#f5eeff", border: "#d0b8f0" },
  { key: "composition", label: "Composition",  icon: PenLine,     color: "#8a1c35", bg: "#fdedf1", border: "#e8b8c8" },
];

// ── PROGRAM DATA ─────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "s0", number: 1,
    title: "Tonal Grammar",
    months: "Months 1–3",
    overview: "Rebuild harmonic thinking on functional and syntactic grounds — chord grammar, voice-leading conventions, figured bass — before moving to larger forms. You are not learning this material from scratch; you are reframing intuitions you already possess.",
    tracks: {
      theory: [
        { id: "s0_th_0", text: "Fux, Gradus ad Parnassum: 2-voice species 1–5 (Mann trans., Norton)", note: "The grammar underlying all common-practice texture. Do not rush." },
        { id: "s0_th_1", text: "Fux, Gradus ad Parnassum: 3-voice species work" },
        { id: "s0_th_2", text: "Schoenberg, Preliminary Exercises in Counterpoint: Ch. 1–5 (ed. Stein)", note: "More directly tonal than Fux; use as bridge after completing 2-voice work." },
        { id: "s0_th_3", text: "Aldwell & Schachter, Harmony and Voice Leading: Ch. 1–10", note: "Triads, voice leading principles, first-inversion chords, cadences. Do every exercise." },
        { id: "s0_th_4", text: "Aldwell & Schachter: Ch. 11–18", note: "7th chords, the leading tone, the subdominant region, sequences." },
        { id: "s0_th_5", text: "Aldwell & Schachter: Ch. 19–25", note: "Applied dominants, tonicization, modulation to closely related keys." },
        { id: "s0_th_6", text: "Harmony, Counterpoint, Partimento (Sanguinetti et al.): parallel track with A&S", note: "Where A&S identifies harmony, H/C/P generates it from bass-line conventions. Work corresponding exercises alongside each A&S chapter." },
        { id: "s0_th_7", text: "Sanguinetti, The Art of Partimento: Part One (history and theory)" },
        { id: "s0_th_8", text: "Gjerdingen, Music in the Galant Style: Introduction and Part One (begin)", note: "Schema theory — Romanesca, Monte, Fonte, Ponte. Read alongside Haydn/Mozart score study." },
      ],
      score: [
        { id: "s0_sc_0", text: "Palestrina, Missa Papae Marcelli — Kyrie and Agnus Dei", note: "Modal counterpoint as reference before common practice. Focus on dissonance treatment.", link: "https://imslp.org/wiki/Missa_Papae_Marcelli_(Palestrina,_Giovanni_Pierluigi_da)" },
        { id: "s0_sc_1", text: "Mozart, Ave Verum Corpus K.618", note: "Near-perfect specimen of late Classical diatonicism. Analyze voice leading bar by bar. Memorize its harmonic rhythm.", link: "https://imslp.org/wiki/Ave_verum_corpus,_K.618_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s0_sc_2", text: "Mozart, Lacrimosa from Requiem K.626", note: "Introduces chromatic voice leading and mode mixture in a controlled context. Compare with Ave Verum.", link: "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s0_sc_3", text: "Haydn, The Creation — 'With Verdure Clad' and 'The Heavens Are Telling'", note: "Classical oratorio rhetoric at its clearest. Trace the tonal plan of both numbers.", link: "https://imslp.org/wiki/The_Creation,_Hob.XXI:2_(Haydn,_Joseph)" },
        { id: "s0_sc_4", text: "Bach, Chorale Preludes BWV 639, 645, 659", note: "Study alongside the plain chorales: understand how the same progressions generate ornamental counterpoint.", link: "https://imslp.org/wiki/Orgelb%C3%BCchlein,_BWV_599-644_(Bach,_Johann_Sebastian)" },
        { id: "s0_sc_5", text: "Schubert: Der Lindenbaum, Die Forelle, Heidenröslein", note: "Diatonic language, clear phrase rhythm, simple forms. Harmonize each melody before analyzing the original.", link: "https://imslp.org/wiki/Die_Forelle,_D.550_(Schubert,_Franz)" },
        { id: "s0_sc_6", text: "Schubert: Der Erlkönig, Ganymed, Auf der Donau", note: "Chromatic harmony, mode mixture, and text-driven formal deviation appear here for the first time.", link: "https://imslp.org/wiki/Der_Erl%C3%B6nig,_D.328_(Schubert,_Franz)" },
        { id: "s0_sc_7", text: "Schumann, Dichterliebe Op.48 (complete cycle)", note: "The tonal ambiguity of the opening and the non-resolving final song are among the most instructive passages in all Romantic vocal music. Study the complete cycle, not selected songs.", link: "https://imslp.org/wiki/Dichterliebe,_Op.48_(Schumann,_Robert)" },
      ],
      keyboard: [
        { id: "s0_kb_0", text: "Begin daily figured bass routine: realize 1–2 simple diatonic basses each morning", note: "Accuracy before speed. Begin with bass lines from Williams Vol. 1." },
        { id: "s0_kb_1", text: "Work through Williams, Figured Bass Accompaniment Vol. 1: diatonic figures" },
        { id: "s0_kb_2", text: "Add chromatic figures to daily realization after Month 1" },
        { id: "s0_kb_3", text: "Work through Williams, Figured Bass Accompaniment Vol. 2: chromatic and advanced figures" },
        { id: "s0_kb_4", text: "Practice standard progressions in all 12 keys daily: I–IV–V–I, I–ii–V–I, I–vi–IV–V–I, deceptive cadences", note: "Then have someone play them back and identify by ear. Functional Ear Trainer can automate this." },
      ],
      ear: [
        { id: "s0_er_0", text: "Establish daily chorale singing: one Bach chorale in all 4 voices each morning (functional solfège)" },
        { id: "s0_er_1", text: "Install Functional Ear Trainer — begin daily I–IV–V–I and basic progression drills" },
        { id: "s0_er_2", text: "Extend solfège: sing bass and inner voices through chorales (not just soprano)" },
        { id: "s0_er_3", text: "Cadence identification test: correctly identify all cadence types (authentic, half, deceptive, plagal) in 10 consecutive unfamiliar excerpts", note: "Target: consistent accuracy before moving to Stage Two." },
      ],
      composition: [
        { id: "s0_co_0", text: "Complete Fux 2-voice species exercises: 10+ exercises per species (5 species total)" },
        { id: "s0_co_1", text: "Complete Fux 3-voice species work" },
        { id: "s0_co_2", text: "Complete Schoenberg Preliminary Exercises Ch. 1–5 (5+ exercises each chapter)" },
        { id: "s0_co_3", text: "Work H/C/P exercises alongside each A&S chapter as a parallel compositional track" },
      ],
    },
  },
  {
    id: "s1", number: 2,
    title: "Contrapuntal Forms",
    months: "Months 3–7",
    overview: "The chorale, the two-voice invention, and the fugue. Peter Schubert & Neidhöfer's Baroque Counterpoint becomes the primary compositional guide — where Fux teaches rules, Schubert teaches how to make pieces. Composition is the primary measure of progress at this stage.",
    tracks: {
      theory: [
        { id: "s1_th_0", text: "Read Alfred Mann, The Study of Fugue (Norton) — complete", note: "Read in full before composing any fugue. Historical, theoretical, and analytic depth." },
        { id: "s1_th_1", text: "Schubert & Neidhöfer, Baroque Counterpoint: Parts 1–2 (two-voice imitative writing)" },
        { id: "s1_th_2", text: "Schubert & Neidhöfer, Baroque Counterpoint: Parts 3–4 (fugal procedure)", note: "Covers fugal exposition construction, episode types, and stretto with graded exercises at each step." },
        { id: "s1_th_3", text: "Sanguinetti, Art of Partimento: Part Two — work through exercises" },
        { id: "s1_th_4", text: "Aldwell & Schachter: review fugue chapters for harmonic-functional perspective" },
        { id: "s1_th_5", text: "Gjerdingen, Music in the Galant Style: Parts 2–3 (schemata in Haydn and Mozart)", note: "Alongside score study of the keyboard works and quartets." },
      ],
      score: [
        { id: "s1_sc_0", text: "Bach, WTC Book I: analyze all 24 preludes (tonal plan and form type)", link: "https://imslp.org/wiki/The_Well-Tempered_Clavier,_Book_1,_BWV_846-869_(Bach,_Johann_Sebastian)" },
        { id: "s1_sc_1", text: "Bach, WTC Book I: analyze all 24 fugues (subject, answer type, devices, proportions)", note: "One fugue per week: write out tonal plan, mark all contrapuntal devices.", link: "https://imslp.org/wiki/The_Well-Tempered_Clavier,_Book_1,_BWV_846-869_(Bach,_Johann_Sebastian)" },
        { id: "s1_sc_2", text: "Bach, 15 Two-Part Inventions BWV 772–786: analyze all (subject, countersubject, episodes)", link: "https://imslp.org/wiki/Inventions_and_Sinfonias,_BWV_772-801_(Bach,_Johann_Sebastian)" },
        { id: "s1_sc_3", text: "Scarlatti, Sonatas K.141, K.466, K.380: trace modulation scheme of each", note: "Binary form with unexpected harmonic adventures. Bridge between Baroque and Classical syntax.", link: "https://imslp.org/wiki/Keyboard_Sonata_in_D_minor,_K.141_(Scarlatti,_Domenico)" },
        { id: "s1_sc_4", text: "Haydn, Piano Sonata Hob. XVI/34 (E minor): first movement phrase rhythm and development", link: "https://imslp.org/wiki/Piano_Sonata_in_E_minor,_Hob.XVI:34_(Haydn,_Joseph)" },
        { id: "s1_sc_5", text: "Haydn, Piano Sonata Hob. XVI/50 (C major): development section as model of Classical wit", link: "https://imslp.org/wiki/Piano_Sonata_in_C_major,_Hob.XVI:50_(Haydn,_Joseph)" },
        { id: "s1_sc_6", text: "Mozart, Piano Sonata K.331: analyze variation techniques, then minuet and rondo as forms", link: "https://imslp.org/wiki/Piano_Sonata_No.11_in_A_major,_K.331/300i_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s1_sc_7", text: "Haydn, String Quartet Op.33 No.2 (The Joke): phrase rhythm and finale deception", link: "https://imslp.org/wiki/String_Quartet_No.30_in_E-flat_major,_Op.33_No.2_(Haydn,_Joseph)" },
        { id: "s1_sc_8", text: "Haydn, String Quartet Op.76 No.3 (Emperor): slow movement variation set and hymn texture", link: "https://imslp.org/wiki/String_Quartet_No.75_in_C_major,_Op.76_No.3_(Haydn,_Joseph)" },
        { id: "s1_sc_9", text: "Mozart, String Quartet K.465 (Dissonance): analyze slow introduction; Allegro as model exposition", note: "The introduction is one of the most analyzed passages in the repertoire — modal ambiguity within a tonal frame.", link: "https://imslp.org/wiki/String_Quartet_No.19_in_C_major,_K.465_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s1_sc_10", text: "Bach, Mass in B minor (begin): Kyrie fugue structure and opening Gloria movements", note: "Too large to study fully now. Start here; return repeatedly throughout the program.", link: "https://imslp.org/wiki/Mass_in_B_minor,_BWV_232_(Bach,_Johann_Sebastian)" },
      ],
      keyboard: [
        { id: "s1_kb_0", text: "Harmonize 50 Bach chorales at the keyboard before consulting Bach's realization", note: "Write your version, compare with Bach, note divergences. Use Riemenschneider edition." },
        { id: "s1_kb_1", text: "Realize Sanguinetti Part Two partimento exercises at keyboard" },
        { id: "s1_kb_2", text: "Realize continuo from Corelli trio sonata movements (bass + figures)" },
        { id: "s1_kb_3", text: "Begin C.P.E. Bach, Essay Part Two: skeleton score realization exercises" },
      ],
      ear: [
        { id: "s1_er_0", text: "Add 7th chord recognition: dominant 7th, half-diminished, fully-diminished, major 7th (Functional Ear Trainer)" },
        { id: "s1_er_1", text: "Score-to-sound mapping: follow a Bach invention recording while tracking your Roman numeral analysis" },
        { id: "s1_er_2", text: "Track modulations in binary forms: identify key area at each section's close by ear" },
        { id: "s1_er_3", text: "Sing all 4 voices through 50 Bach chorales from Riemenschneider" },
        { id: "s1_er_4", text: "4-part SATB dictation review: once per week, take down a 4–8 bar chorale phrase from a recording of the Riemenschneider set (no score). Notate all four voices, then check against score.", note: "You are good at this but likely rusty. The goal is not to develop the skill from scratch but to restore fluency — expect it to come back quickly. Use chorales already studied in the theory track so harmonic context is familiar." },
      ],
      composition: [
        { id: "s1_co_0", text: "Harmonize 50 Bach chorales on paper (Riemenschneider ed., before consulting Bach)" },
        { id: "s1_co_1", text: "Compose 3–4 two-voice inventions (exposition, sequence episode, middle entry in related key, closing)" },
        { id: "s1_co_2", text: "Write 10 fugue subjects and identify the correct answer (real vs. tonal) for each" },
        { id: "s1_co_3", text: "Write 3 complete three-voice fugue expositions (subject, answer, countersubject, all entries)" },
        { id: "s1_co_4", text: "Compose 2 complete two-voice fugues" },
        { id: "s1_co_5", text: "Compose 1 complete three-voice fugue", note: "The capstone of Stage Two. Subject and countersubject should work in double counterpoint." },
      ],
    },
  },
  {
    id: "s2", number: 3,
    title: "Instrumental Forms",
    months: "Months 7–12",
    overview: "The compositional and analytic core. Binary form, minuet and trio, rondo, and sonata — all three formal theories (Rosen, Caplin, Hepokoski/Darcy) are deployed together: Rosen for rhetorical logic, Caplin for formal-function vocabulary at the phrase level, Hepokoski/Darcy as a reference for normative-deformation analysis.",
    tracks: {
      theory: [
        { id: "s2_th_0", text: "Rosen, The Classical Style: Ch. 1–3 (phrase structure, period form, the nature of Classical style)", note: "Essential rhetorical companion for all of Stage Three. Read before composing binary forms." },
        { id: "s2_th_1", text: "Rosen, Sonata Forms: Part One (the logic of exposition, development, recapitulation)" },
        { id: "s2_th_2", text: "Caplin, Analyzing Classical Form: Ch. 1–4 (sentence, period, hybrid themes)", note: "Read before composing any binary movements. Gives precise language for phrase-level formal function." },
        { id: "s2_th_3", text: "Caplin, Analyzing Classical Form: Ch. 9–12 (sonata-form movements)", note: "Formal function vocabulary: primary theme zone, transition, subordinate theme, closing section." },
        { id: "s2_th_4", text: "Hepokoski & Darcy, Elements of Sonata Theory: EEC, ESC, deformation (use as reference)", note: "Do not read cover to cover. Use as reference for specific analytic problems — especially Beethoven deformations." },
        { id: "s2_th_5", text: "Ratner, Classic Music: rondo and variation form chapters" },
        { id: "s2_th_6", text: "Gjerdingen, Music in the Galant Style: complete (alongside Haydn/Mozart score study)" },
        { id: "s2_th_7", text: "C.P.E. Bach, Essay on Keyboard Instruments: Part Two (complete)", note: "Skeleton score realization, stylistic ornamentation, improvised elaboration." },
      ],
      score: [
        { id: "s2_sc_0", text: "Bach, English and French Suites: write tonal plan of each dance movement", link: "https://imslp.org/wiki/English_Suites,_BWV_806-811_(Bach,_Johann_Sebastian)" },
        { id: "s2_sc_1", text: "Haydn, Symphony No.94 (Surprise): complete tonal map of first movement", note: "Every key area, every formal section, length in measures.", link: "https://imslp.org/wiki/Symphony_No.94_in_G_major_(Haydn,_Joseph)" },
        { id: "s2_sc_2", text: "Haydn, Symphony No.104 (London): tonal map and formal proportions", link: "https://imslp.org/wiki/Symphony_No.104_in_D_major_(Haydn,_Joseph)" },
        { id: "s2_sc_3", text: "Mozart, Symphony No.40 K.550: development fragmentation and chromatic sequence analysis", link: "https://imslp.org/wiki/Symphony_No.40_in_G_minor,_K.550_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s2_sc_4", text: "Mozart, Symphony No.41 (Jupiter) K.551: finale — analyze the five fugal subjects and their relationships", note: "One of the summits of the tradition. Complete after Stage Two fugue work.", link: "https://imslp.org/wiki/Symphony_No.41_in_C_major,_K.551_(Mozart,_Wolfgang_Amadeus)" },
        { id: "s2_sc_5", text: "Beethoven, Symphony No.1 Op.21: point of comparison with Haydn and Mozart", link: "https://imslp.org/wiki/Symphony_No.1_in_C_major,_Op.21_(Beethoven,_Ludwig_van)" },
        { id: "s2_sc_6", text: "Beethoven, Symphony No.3 (Eroica) Op.55: enormous development; coda as second development", link: "https://imslp.org/wiki/Symphony_No.3_in_E-flat_major,_Op.55_(Beethoven,_Ludwig_van)" },
        { id: "s2_sc_7", text: "Beethoven, Symphony No.5 Op.67: four-movement tonal narrative; attacca transition", link: "https://imslp.org/wiki/Symphony_No.5_in_C_minor,_Op.67_(Beethoven,_Ludwig_van)" },
        { id: "s2_sc_8", text: "Beethoven, String Quartet Op.18 No.4: compare development with Mozart K.465", link: "https://imslp.org/wiki/String_Quartet_No.4_in_C_minor,_Op.18_No.4_(Beethoven,_Ludwig_van)" },
        { id: "s2_sc_9", text: "Beethoven, String Quartet Op.59 No.1 (Razumovsky): coda as second development", link: "https://imslp.org/wiki/String_Quartet_No.7_in_F_major,_Op.59_No.1_(Beethoven,_Ludwig_van)" },
        { id: "s2_sc_10", text: "Schubert, String Quintet D.956: slow movement — ♭VI key relationship; F minor middle section", note: "A landmark study piece. Anticipates Bruckner. The harmonic world is unlike anything in Haydn or Mozart.", link: "https://imslp.org/wiki/String_Quintet_in_C_major,_D.956_(Schubert,_Franz)" },
        { id: "s2_sc_11", text: "Bach, Mass in B minor (continue): Credo movements (fugue structures) and da capo arias", link: "https://imslp.org/wiki/Mass_in_B_minor,_BWV_232_(Bach,_Johann_Sebastian)" },
        { id: "s2_sc_12", text: "Brahms, Ein Deutsches Requiem: No.4 (textural clarity); No.6 (fugal writing)", link: "https://imslp.org/wiki/Ein_deutsches_Requiem,_Op.45_(Brahms,_Johannes)" },
        { id: "s2_sc_13", text: "Verdi, Requiem: Kyrie voice leading; Dies Irae for dramatic formal disruption", link: "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)" },
      ],
      keyboard: [
        { id: "s2_kb_0", text: "Daily figured bass including Neapolitan 6th, Italian, French, and German augmented 6th figures" },
        { id: "s2_kb_1", text: "Realize Corelli and Handel trio sonata movements with improvised inner voice elaboration" },
        { id: "s2_kb_2", text: "C.P.E. Bach Essay exercises: full skeleton score realization at keyboard" },
        { id: "s2_kb_3", text: "Harmonize chorales requiring applied dominants and at least one modulation" },
      ],
      ear: [
        { id: "s2_er_0", text: "Identify secondary key area in 10 consecutive sonata expositions by ear — without consulting the score" },
        { id: "s2_er_1", text: "Identify Neapolitan 6th, Italian 6th, French 6th, and German 6th by sound" },
        { id: "s2_er_2", text: "Score-to-sound: follow one Haydn quartet movement per week with Roman numeral annotations" },
        { id: "s2_er_3", text: "Listen to each assigned symphony with a tonal map in hand; track formal sections in real time" },
        { id: "s2_er_4", text: "4-part SATB dictation: increase to 8–16 bar phrases from Haydn and Mozart string quartets (inner parts only — no outer voice given). Notate all four parts, then verify against score.", note: "This step shifts dictation from chorale to instrumental texture. The rhythmic independence of the inner voices in quartet writing is more demanding than chorale homophony — the skill transfers directly to analytical hearing of Classical chamber music." },
      ],
      composition: [
        { id: "s2_co_0", text: "Compose 3 binary movements in minuet style (vary first-section cadence: V, vi, and III endings)", note: "Different handling of the return in each." },
        { id: "s2_co_1", text: "Compose 1 minuet and trio in major", note: "Analyze each minuet using Caplin's formal function vocabulary before composing." },
        { id: "s2_co_2", text: "Compose 1 minuet and trio in minor" },
        { id: "s2_co_3", text: "Compose 1 movement in simple rondo form (ABACA + coda)" },
        { id: "s2_co_4", text: "Compose 1 sonata-rondo movement" },
        { id: "s2_co_5", text: "Compose 1 slow movement in sonata form (piano sketch)", note: "Slow movements are formally simpler. Start here before the allegro." },
        { id: "s2_co_5b", text: "Small Forms — Transition & Retransition studies: compose 3 isolated transition passages (16–24 bars each) moving to the dominant, and 3 retransition passages restoring the tonic. Then compose one complete ABA ternary piece in which the A-to-B transition and B-to-A retransition are the primary compositional challenge.", note: "Caplin: a transition must dissolve the home key and generate momentum; a retransition must suspend forward motion and create expectation. Master both in the small container of ternary form before committing them to the longer time-spans of a sonata allegro." },
        { id: "s2_co_6", text: "Compose 1 allegro first movement in sonata form", note: "The capstone of Stage Three. Apply all three formal theories to your own work." },
      ],
    },
  },
  {
    id: "s3", number: 4,
    title: "Late Romanticism & The Threshold",
    months: "Months 10–18",
    overview: "Harmonic language that stresses or suspends functional tonality without abandoning it entirely. The key analytical question throughout: what is this composer retaining from the common-practice system, and what is being dissolved or replaced? The Tristan Prelude is the essential document of this stage.",
    tracks: {
      theory: [
        { id: "s3_th_0", text: "Aldwell & Schachter: Ch. 26–34 (mixture, Neapolitan, augmented sixths, ninth chords, chromatic modulation)" },
        { id: "s3_th_1", text: "Schoenberg, Fundamentals of Musical Composition: developing variation chapters", note: "Conceptual bridge between Classical motivic technique and early 20th-century practice." },
        { id: "s3_th_2", text: "Study Wagner Tristan Prelude with Mitchell analysis and Aldwell & Schachter appendix", note: "Analyze the opening four measures in full: the Tristan chord, its approach, its non-resolution." },
        { id: "s3_th_3", text: "Schubert & Neidhöfer, Baroque Counterpoint: invertible counterpoint at the 10th and 12th (late chapters)" },
      ],
      score: [
        { id: "s3_sc_0", text: "Brahms, Symphony No.4 Op.98: identify passacaglia theme; track all 30 variations", link: "https://imslp.org/wiki/Symphony_No.4_in_E_minor,_Op.98_(Brahms,_Johannes)" },
        { id: "s3_sc_1", text: "Brahms, Clarinet Quintet Op.115: chromatic voice leading; late Romantic economy", link: "https://imslp.org/wiki/Clarinet_Quintet_in_B_minor,_Op.115_(Brahms,_Johannes)" },
        { id: "s3_sc_2", text: "Brahms, Violin Sonata No.1 Op.78: cyclic recall; lyrical thematic material", link: "https://imslp.org/wiki/Violin_Sonata_No.1_in_G_major,_Op.78_(Brahms,_Johannes)" },
        { id: "s3_sc_3", text: "Franck, Violin Sonata in A major: cyclic form; chromatic harmony in French tradition", link: "https://imslp.org/wiki/Violin_Sonata_in_A_major_(Franck,_C%C3%A9sar)" },
        { id: "s3_sc_4", text: "Schubert, Symphony No.9 (Great C major) D.944: harmonic rhythm and sequential extension", note: "Study how Schubert sustains tension across enormous spans. The exposition alone exceeds many complete Haydn first movements.", link: "https://imslp.org/wiki/Symphony_No.9_in_C_major,_D.944_(Schubert,_Franz)" },
        { id: "s3_sc_5", text: "Dvořák, String Quartet Op.96 (American): pentatonic and modal inflections within functional harmony", link: "https://imslp.org/wiki/String_Quartet_No.12_in_F_major,_Op.96_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)" },
        { id: "s3_sc_6", text: "Wagner, Tristan und Isolde — Prelude and Liebestod (complete)", note: "The essential document of harmonic dissolution. Do not skip. The Tristan chord and its non-resolution are the pivot around which all subsequent harmony turns.", link: "https://imslp.org/wiki/Tristan_und_Isolde,_WWV_90_(Wagner,_Richard)" },
        { id: "s3_sc_7", text: "Bruckner, Symphony No.7 — Adagio", note: "Extreme harmonic expansion through Wagner-tubas and enormous phrase lengths.", link: "https://imslp.org/wiki/Symphony_No.7_in_E_major_(Bruckner,_Anton)" },
        { id: "s3_sc_8", text: "Wolf, Mörike Lieder: Auf ein altes Bild; Schlafendes Jesuskind; Gesang Weylas", note: "Compare directly with Schubert songs on related subjects — the historical distance in harmonic language becomes audible.", link: "https://imslp.org/wiki/M%C3%B6rikelieder_(Wolf,_Hugo)" },
        { id: "s3_sc_9", text: "Mahler, Kindertotenlieder: modal harmony, tonal ambiguity, formal fragmentation", link: "https://imslp.org/wiki/Kindertotenlieder_(Mahler,_Gustav)" },
        { id: "s3_sc_10", text: "Fauré, Piano Quartet No.1 Op.15: non-functional chord successions that feel inevitable", note: "One of the most underrated harmonic languages in the literature.", link: "https://imslp.org/wiki/Piano_Quartet_No.1_in_C_minor,_Op.15_(Faur%C3%A9,_Gabriel)" },
        { id: "s3_sc_11", text: "Fauré, Requiem: modal harmony in sacred context — compare with Brahms and Verdi", link: "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)" },
        { id: "s3_sc_12", text: "Ravel, String Quartet in F major: compare with Debussy SQ (more tonally anchored)", link: "https://imslp.org/wiki/String_Quartet_in_F_major_(Ravel,_Maurice)" },
      ],
      keyboard: [
        { id: "s3_kb_0", text: "Chromatic modulation exercises in all keys: pivot-chord, common-tone, and chromatic-shift types" },
        { id: "s3_kb_1", text: "Wagner Tristan Prelude: play through slowly at keyboard; sing each voice separately" },
        { id: "s3_kb_2", text: "Realize Brahms-era harmonic progressions (with aug. sixths and chromatic mediants) from figured bass skeletons" },
      ],
      ear: [
        { id: "s3_er_0", text: "Identify chromatic modulation type by ear: pivot chord vs. common tone vs. chromatic shift" },
        { id: "s3_er_1", text: "Identify augmented sixth chord types by sound in orchestral contexts (Brahms, Schubert)" },
        { id: "s3_er_2", text: "Listen to the Wagner Tristan Prelude on repeat with score until each chromatic gesture is anticipated, not merely recognized" },
        { id: "s3_er_3", text: "Score-to-sound: Brahms Symphony No.4 with tonal annotations; track the passacaglia variations by ear" },
        { id: "s3_er_4", text: "4-part chromatic dictation: take down 8–16 bar passages from Brahms piano intermezzi or chamber music in which at least one chromatic chord (augmented sixth, Neapolitan, chromatic mediant) appears per phrase.", note: "The goal is to hear chromatic voice-leading in real time — not just identify chord types in isolation, but hear the voice that moves by half-step and the harmonic destination it implies. This directly supports the Tristan analysis work in the theory and score-study tracks." },
      ],
      composition: [
        { id: "s3_co_0", text: "Compose a short piano piece using at least one chromatic modulation to a distant key", note: "The piece should return to the tonic by a different route than it departed." },
        { id: "s3_co_1", text: "Compose a fugue with double counterpoint: subject and countersubject exchangeable at multiple intervals" },
        { id: "s3_co_2", text: "Compose a short (8–12 measure) passage that delays dominant resolution in the manner of the Tristan Prelude" },
      ],
    },
  },
  {
    id: "s4", number: 5,
    title: "Extended Harmony",
    months: "Month 12 Onward",
    overview: "The destination the earlier study has been building toward. The analytic tools from all previous stages now become the lens through which post-tonal and extended tonal language becomes legible. At every work, ask: what is retained from the common-practice system, what is dissolved, and what replaces it? This stage has no fixed endpoint.",
    tracks: {
      theory: [
        { id: "s4_th_0", text: "Hindemith, The Craft of Musical Composition Vol.1 (complete)", note: "A systematic attempt to rebuild harmonic theory from acoustics. Controversial but clarifying as a counterpoint to functional theory." },
        { id: "s4_th_1", text: "Antokoletz, The Music of Béla Bartók (complete)", note: "The definitive analytic study. Introduces interval-class analysis and axis tonality in accessible terms." },
        { id: "s4_th_2", text: "Taruskin, Music in the Early 20th Century (Oxford History Vol.4)", note: "The best narrative of how the common practice dissolved. Strong on Stravinsky, Schoenberg, the neoclassicists." },
        { id: "s4_th_3", text: "Schoenberg, Style and Idea: 'Brahms the Progressive' and 'My Evolution'" },
        { id: "s4_th_4", text: "Bartók, Harvard Lectures (study alongside String Quartet No.4 score)" },
      ],
      score: [
        { id: "s4_sc_0", text: "Debussy, Préludes Book I: La cathédrale engloutie, La fille aux cheveux de lin, Des pas sur la neige", note: "In each: ask what has replaced the function of the dominant.", link: "https://imslp.org/wiki/Pr%C3%A9ludes,_Book_1_(Debussy,_Claude)" },
        { id: "s4_sc_1", text: "Debussy, String Quartet in G minor Op.10", note: "Debussy's harmonic language pressed into a Classical form. The tension between world and expectation is itself the subject.", link: "https://imslp.org/wiki/String_Quartet_in_G_minor,_Op.10_(Debussy,_Claude)" },
        { id: "s4_sc_2", text: "Debussy, Pelléas et Mélisande — selected scenes: modal vocal writing and static harmonics", link: "https://imslp.org/wiki/Pell%C3%A9as_et_M%C3%A9lisande,_L.88_(Debussy,_Claude)" },
        { id: "s4_sc_3", text: "Ravel, Pavane pour une infante défunte; Piano Sonatine (Sonatine first movement as compressed sonata form)", link: "https://imslp.org/wiki/Pavane_pour_une_infante_d%C3%A9funte_(Ravel,_Maurice)" },
        { id: "s4_sc_4", text: "Fauré, Piano Quartet No.2 Op.45: late Fauré, tonal centers without dominant confirmation", link: "https://imslp.org/wiki/Piano_Quartet_No.2_in_G_minor,_Op.45_(Faur%C3%A9,_Gabriel)" },
        { id: "s4_sc_5", text: "Prokofiev, Classical Symphony Op.25: identify every Classical formal feature; note departures", link: "https://imslp.org/wiki/Symphony_No.1,_Op.25_(Prokofiev,_Sergei)" },
        { id: "s4_sc_6", text: "Prokofiev, Violin Sonata No.1 Op.80: motivic obsession; modal slow movement", note: "A natural work to study in depth as a violinist.", link: "https://imslp.org/wiki/Violin_Sonata_No.1,_Op.80_(Prokofiev,_Sergei)" },
        { id: "s4_sc_7", text: "Shostakovich, String Quartet No.8 Op.110: DSCH monogram; tonality established by repetition, not function", link: "https://imslp.org/wiki/String_Quartet_No.8,_Op.110_(Shostakovich,_Dmitri)" },
        { id: "s4_sc_8", text: "Bartók, Music for Strings, Percussion and Celesta: fugue tonal plan (chromatic expansion from A); axis tonality", link: "https://imslp.org/wiki/Music_for_Strings,_Percussion_and_Celesta_(Bart%C3%B3k,_B%C3%A9la)" },
        { id: "s4_sc_9", text: "Bartók, String Quartet No.4: arch form (ABCBA); chromatic voice leading", note: "Study alongside the Harvard Lectures for theoretical framing in Bartók's own words.", link: "https://imslp.org/wiki/String_Quartet_No.4_(Bart%C3%B3k,_B%C3%A9la)" },
        { id: "s4_sc_10", text: "Hindemith, Mathis der Maler Symphony: study alongside The Craft of Musical Composition", link: "https://imslp.org/wiki/Mathis_der_Maler_(symphony)_(Hindemith,_Paul)" },
      ],
      keyboard: [
        { id: "s4_kb_0", text: "For each Debussy prelude studied: identify at keyboard what replaces dominant function" },
        { id: "s4_kb_1", text: "Realize Bartók axis-tonality progressions at keyboard using axis substitutions" },
        { id: "s4_kb_2", text: "Experiment with whole-tone, octatonic, and pentatonic scale harmonizations at keyboard" },
      ],
      ear: [
        { id: "s4_er_0", text: "Identify whole-tone, pentatonic, and octatonic scales by ear in musical context" },
        { id: "s4_er_1", text: "Identify modal centers without dominant confirmation in Debussy and Fauré passages" },
        { id: "s4_er_2", text: "Follow Bartók String Quartet No.4 with score: map the arch form structure in real time" },
        { id: "s4_er_3", text: "Compare Prokofiev Classical Symphony with a Haydn symphony by ear: identify the 'wrong-note' departures" },
      ],
      composition: [
        { id: "s4_co_0", text: "Write a complete harmonic analysis of Debussy String Quartet, first movement", note: "Identify specific techniques by name: whole-tone passages, modal areas, non-functional successions." },
        { id: "s4_co_1", text: "Compose a short piece (20–30 measures) using at least two Stage Five techniques within a recognizable formal plan" },
        { id: "s4_co_2", text: "Sketch a formal plan for a movement using Bartók's arch-form (ABCBA) symmetrical logic" },
      ],
    },
  },
];

const MILESTONES = [
  { month: 2,  name: "Figured bass: diatonic",          test: "Realize a diatonic figured bass in major and minor at keyboard without preparation, at a slow but steady tempo." },
  { month: 3,  name: "Chorale harmonization: diatonic",  test: "Harmonize an unfamiliar chorale melody in four voices at keyboard. Assess against a Bach realization." },
  { month: 4,  name: "Figured bass: chromatic",          test: "Realize a bass including Neapolitan, augmented sixth, and applied dominant figures." },
  { month: 4,  name: "Cadence identification by ear",    test: "Identify all cadence types correctly in 10 consecutive unfamiliar excerpts without consulting scores." },
  { month: 5,  name: "Two-voice invention: compose",     test: "Complete a two-voice invention with exposition, two episodes, middle entry, and closing. Play it at keyboard." },
  { month: 5,  name: "Chorale harmonization: chromatic", test: "Harmonize a chorale melody requiring applied dominants and one modulation." },
  { month: 6,  name: "Minuet and trio: compose",         test: "Compose a complete minuet and trio. The trio should be in a contrasting key and texture." },
  { month: 7,  name: "Fugue (2 voices): compose",        test: "Complete a two-voice fugue with subject, answer, countersubject, exposition, two episodes, and stretto close." },
  { month: 7,  name: "Harmonic ID by ear: diatonic + chromatic", test: "Identify Roman numeral function (including chromatic chords) in real-time listening of Haydn and Mozart." },
  { month: 8,  name: "Rondo: compose",                   test: "Compose a complete rondo movement in simple rondo form. The refrain should be harmonically closed and memorably shaped." },
  { month: 10, name: "Fugue (3 voices): compose",        test: "Complete a three-voice fugue. Subject and countersubject should work in double counterpoint." },
  { month: 10, name: "Sonata form: slow movement",       test: "Complete a slow movement in sonata form with primary theme, secondary theme, development, and recapitulation." },
  { month: 10, name: "Modulation recognition by ear",    test: "Identify the secondary key area and its approach in 10 consecutive sonata expositions from recordings, without score." },
  { month: 11, name: "Small Forms: transition & retransition", test: "Complete 3 transition and 3 retransition passages independently. Then complete an ABA ternary piece in which the formal boundary moments (transition, retransition) are the primary compositional concern. Each formal function should be identifiable without labeling." },
  { month: 12, name: "Sonata form: allegro movement",    test: "Complete an allegro first movement. The development should contain at least one sequence and one retransition." },
  { month: 12, name: "Partitura realization",            test: "Realize a Baroque trio sonata continuo part from bass line and figures at keyboard, with appropriate inner voices." },
  { month: 15, name: "Extended harmony: analytic",       test: "Write a harmonic analysis of the Debussy String Quartet, first movement, identifying specific techniques by name." },
  { month: 18, name: "Extended harmony: compositional",  test: "Compose a short piece (20–30 measures) employing at least two Stage Five techniques within a recognizable formal plan." },
];

// ── CONCURRENT GROUPS ─────────────────────────────────────────────────────────
// Each group is a set of task IDs that should be worked simultaneously.
const CONCURRENT_GROUPS = [
  // Stage 1 ─ Species counterpoint: reading feeds directly into exercises
  ["s0_th_0", "s0_co_0"],                                         // Fux 2-voice → write 2-voice exercises
  ["s0_th_1", "s0_co_1"],                                         // Fux 3-voice → write 3-voice exercises
  ["s0_th_2", "s0_co_2"],                                         // Schoenberg Prelim → Schoenberg exercises
  // Stage 1 ─ A&S Ch.1-10 cluster: first harmony + keyboard + ear + score
  ["s0_th_3", "s0_kb_0", "s0_kb_1", "s0_er_0", "s0_sc_1"],      // A&S Ch.1-10 + diatonic FB + Williams Vol.1 + chorale singing + Ave Verum
  // Stage 1 ─ A&S Ch.11-18: chromatic figures + Functional Ear Trainer + Schubert simple
  ["s0_th_4", "s0_kb_2", "s0_er_1", "s0_sc_5"],
  // Stage 1 ─ A&S Ch.19-25: Williams Vol.2 + cadence ID + Schubert/Schumann
  ["s0_th_5", "s0_kb_3", "s0_er_3", "s0_sc_6", "s0_sc_7"],
  // Stage 1 ─ H/C/P parallel track: always alongside A&S
  ["s0_th_6", "s0_co_3"],                                         // H/C/P reading + H/C/P composition exercises
  // Stage 1 ─ Sanguinetti Part One: theoretical grounding for keyboard practice
  ["s0_th_7", "s0_kb_0"],
  // Stage 1 ─ Gjerdingen: read alongside Haydn
  ["s0_th_8", "s0_sc_3"],                                         // Gjerdingen intro + Haydn Creation
  // Stage 1 ─ Progressions in 12 keys ↔ Functional Ear Trainer
  ["s0_kb_4", "s0_er_1"],
  // Stage 1 ─ Palestrina: read with Fux 2-voice for modal context
  ["s0_sc_0", "s0_th_0"],
  // Stage 1 ─ Bach Chorale Preludes: study beside Palestrina and Ave Verum
  ["s0_sc_4", "s0_sc_0", "s0_sc_1"],
  // Stage 1 ─ Chorale singing reinforces A&S harmony reading
  ["s0_er_0", "s0_er_2"],                                         // Soprano solfège → extend to all voices

  // Stage 2 ─ Mann must be read before composing any fugue
  ["s1_th_0", "s1_sc_1", "s1_co_2", "s1_co_3"],                 // Mann + WTC fugues + write subjects + write expositions
  // Stage 2 ─ Schubert & N Parts 1-2: invention reading → compose inventions
  ["s1_th_1", "s1_co_1"],
  // Stage 2 ─ Schubert & N Parts 3-4: fugal procedure → compose fugues
  ["s1_th_2", "s1_co_3", "s1_co_4", "s1_co_5"],
  // Stage 2 ─ Sanguinetti Part Two: exercises realized at keyboard
  ["s1_th_3", "s1_kb_1"],
  // Stage 2 ─ Gjerdingen Parts 2-3: schemata alongside Haydn/Mozart scores
  ["s1_th_5", "s1_sc_3", "s1_sc_7", "s1_sc_9"],                 // Gjerdingen + Scarlatti + Haydn Op.33 + Mozart K.465
  // Stage 2 ─ WTC score study: preludes + fugues + score-to-sound ear training
  ["s1_sc_0", "s1_sc_1", "s1_er_1"],
  // Stage 2 ─ 50 Chorales: paper + keyboard + singing are one continuous activity
  ["s1_kb_0", "s1_co_0", "s1_er_3"],
  // Stage 2 ─ Corelli continuo at keyboard alongside Mass in B minor
  ["s1_kb_2", "s1_sc_10"],
  // Stage 2 ─ Track modulations alongside WTC fugue analysis
  ["s1_sc_1", "s1_er_2"],
  // Stage 2 ─ A&S fugue chapters: after Mann, alongside composition
  ["s1_th_4", "s1_co_2", "s1_co_3"],

  // Stage 3 ─ Caplin Ch.1-4: phrase vocabulary before composing binary/minuet
  ["s2_th_2", "s2_co_0", "s2_co_1", "s2_co_2"],
  // Stage 3 ─ Rosen: read before composing sonata movements
  ["s2_th_0", "s2_th_1", "s2_co_5", "s2_co_6"],
  // Stage 3 ─ Caplin Ch.9-12 + Haydn symphonies + ear + compose slow movement
  ["s2_th_3", "s2_sc_1", "s2_sc_2", "s2_er_0", "s2_co_5"],
  // Stage 3 ─ H&D as reference during sonata allegro composition
  ["s2_th_4", "s2_co_6"],
  // Stage 3 ─ Ratner + rondo compositions
  ["s2_th_5", "s2_co_3", "s2_co_4"],
  // Stage 3 ─ Gjerdingen complete + Beethoven symphonies
  ["s2_th_6", "s2_sc_5", "s2_sc_6", "s2_sc_7"],
  // Stage 3 ─ C.P.E. Bach Essay + keyboard realization
  ["s2_th_7", "s2_kb_2"],
  // Stage 3 ─ Mozart 40/41 + identify secondary key by ear + allegro composition
  ["s2_sc_3", "s2_sc_4", "s2_er_0", "s2_co_6"],
  // Stage 3 ─ Beethoven quartets + aug 6th ear + Schubert Quintet
  ["s2_sc_8", "s2_sc_9", "s2_sc_10", "s2_er_1"],
  // Stage 3 ─ Figured bass (chromatic) + A&S chromatic chapters
  ["s2_kb_0", "s2_th_3"],
  // Stage 3 ─ Haydn quartet ear training + follow with score
  ["s2_er_2", "s2_sc_1", "s2_sc_2"],
  // Stage 3 ─ Tonal map listening + symphony scores
  ["s2_er_3", "s2_sc_5", "s2_sc_6", "s2_sc_7"],

  // Stage 4 ─ A&S Ch.26-34: chromatic theory → keyboard exercises + ear + composition
  ["s3_th_0", "s3_kb_0", "s3_er_0", "s3_co_0"],
  // Stage 4 ─ Schoenberg Fundamentals: alongside late Brahms scores
  ["s3_th_1", "s3_sc_0", "s3_sc_1"],
  // Stage 4 ─ Tristan cluster: the most tightly coupled group in the program
  ["s3_th_2", "s3_sc_6", "s3_kb_1", "s3_er_2", "s3_co_2"],
  // Stage 4 ─ Invertible counterpoint reading → double counterpoint fugue
  ["s3_th_3", "s3_co_1"],
  // Stage 4 ─ Brahms Sym 4: score + ear (passacaglia tracking)
  ["s3_sc_0", "s3_er_3"],
  // Stage 4 ─ Brahms/Franck chamber + chromatic keyboard + aug 6th ear
  ["s3_sc_1", "s3_sc_2", "s3_sc_3", "s3_kb_2", "s3_er_1"],
  // Stage 4 ─ Mahler/Wolf: dissolution of tonality, compare with Tristan
  ["s3_sc_8", "s3_sc_9", "s3_sc_6"],

  // Stage 5 ─ Antokoletz + Bartók scores + ear + keyboard
  ["s4_th_1", "s4_sc_8", "s4_sc_9", "s4_er_2", "s4_kb_1"],
  // Stage 5 ─ Bartók Harvard Lectures alongside SQ No.4
  ["s4_th_4", "s4_sc_9"],
  // Stage 5 ─ Hindemith Craft + Mathis der Maler
  ["s4_th_0", "s4_sc_10"],
  // Stage 5 ─ Debussy cluster: scores + keyboard + ear + analysis composition
  ["s4_sc_0", "s4_sc_1", "s4_sc_2", "s4_kb_0", "s4_er_0", "s4_er_1", "s4_co_0"],
  // Stage 5 ─ Extended harmony composition uses Debussy and Bartók as models
  ["s4_co_1", "s4_sc_0", "s4_sc_1", "s4_sc_8"],
  // Stage 5 ─ Prokofiev Classical Symphony + comparison ear training
  ["s4_sc_5", "s4_er_3"],
  // Stage 5 ─ Taruskin: broad narrative alongside Stage 5 scores
  ["s4_th_2", "s4_sc_5", "s4_sc_7", "s4_sc_8"],
  // Stage 5 ─ Arch form composition: Bartók scores as models
  ["s4_co_2", "s4_sc_8", "s4_sc_9"],
];

// Build flat task lookup: id → {track, text}
const TASK_LOOKUP = {};
for (const stage of STAGES) {
  for (const [track, tasks] of Object.entries(stage.tracks)) {
    for (const task of tasks) {
      TASK_LOOKUP[task.id] = { track, text: task.text };
    }
  }
}

// Build concurrent map: taskId → [{taskId, track, shortText}]
const CONCURRENT_MAP = {};
for (const group of CONCURRENT_GROUPS) {
  for (const id of group) {
    if (!CONCURRENT_MAP[id]) CONCURRENT_MAP[id] = [];
    for (const otherId of group) {
      if (otherId !== id) {
        const existing = CONCURRENT_MAP[id];
        if (!existing.find(e => e.taskId === otherId)) {
          const info = TASK_LOOKUP[otherId];
          if (info) {
            const shortText = info.text.length > 48 ? info.text.slice(0, 46).trimEnd() + "…" : info.text;
            existing.push({ taskId: otherId, track: info.track, shortText });
          }
        }
      }
    }
  }
}

// ── LIBRARY DATA ─────────────────────────────────────────────────────────────
// Era tags: Renaissance · Baroque · Classical · Romantic · Modern · Contemporary
// Topic keys map to LIBRARY_TOPICS

const LIBRARY_TOPICS = [
  { key: "all",          label: "All" },
  { key: "counterpoint", label: "Counterpoint & Fugue" },
  { key: "harmony",      label: "Harmony & Voice Leading" },
  { key: "partimento",   label: "Partimento & Figured Bass" },
  { key: "form",         label: "Form & Analysis" },
  { key: "orchestration",label: "Orchestration" },
  { key: "posttonal",    label: "Post-Tonal Theory" },
  { key: "aesthetics",   label: "Style, History & Aesthetics" },
  { key: "craft",        label: "Composition & Craft" },
  { key: "cogacoustics", label: "Philosophy, Cognition & Acoustics" },
  { key: "beyond",       label: "Beyond the Program" },
  { key: "jazz",         label: "Jazz Theory" },
];

const LIBRARY = [
  // ── COUNTERPOINT & FUGUE ────────────────────────────────────────────────
  { id:"lb_cp_0", topic:"counterpoint", era:"Renaissance",
    author:"Thomas Morley", title:"A Plain and Easy Introduction to Practical Music", year:"1597",
    note:"The definitive English Renaissance music treatise, written as a Socratic dialogue between master and pupil. Covers notation, sight-singing, descant, and counterpoint with wit and pedagogical clarity. An essential primary source for understanding Elizabethan polyphonic practice and the transmission of Italian Renaissance technique to England." },
  { id:"lb_cp_0b", topic:"counterpoint", era:"Renaissance",
    author:"Gioseffo Zarlino", title:"Le Istitutioni harmoniche", year:"1558",
    note:"The foundational Renaissance treatise. Establishes modal counterpoint as a rational system and provides the theoretical grounding Fux would later codify. Essential for understanding Palestrina." },
  { id:"lb_cp_1", topic:"counterpoint", era:"Baroque",
    author:"Johann Joseph Fux", title:"Gradus ad Parnassum", year:"1725",
    note:"The species counterpoint curriculum that has defined pedagogy for three centuries. Bach, Haydn, Mozart, and Beethoven all studied from it. Mann's 1965 Norton translation is the standard English edition." },
  { id:"lb_cp_2", topic:"counterpoint", era:"Baroque",
    author:"Friedrich Marpurg", title:"Abhandlung von der Fuge", year:"1753",
    note:"The first systematic treatise on fugue, written in direct dialogue with Bach's practice. Indispensable for understanding the theoretical underpinning of WTC-era fugue construction." },
  { id:"lb_cp_2b", topic:"counterpoint", era:"Classical",
    author:"Johann Philipp Kirnberger", title:"The Art of Strict Musical Composition", year:"1771",
    note:"A crucial bridge between Baroque species counterpoint and Classical harmonic thinking. Kirnberger was Bach's pupil and attempted to systematize Bach's practice into a theory of strict composition. His concept of essential and non-essential dissonance anticipates Schenker. Indispensable for understanding how Classical composers theorized the counterpoint they had inherited." },
  { id:"lb_cp_3", topic:"counterpoint", era:"Romantic",
    author:"Luigi Cherubini", title:"Treatise on Counterpoint and Fugue", year:"1835",
    note:"The nineteenth century's standard academic manual. Influenced generations of conservatory-trained composers. More systematic and less flexible than Fux; useful as a historical complement." },
  { id:"lb_cp_4", topic:"counterpoint", era:"Romantic",
    author:"Ebenezer Prout", title:"Counterpoint: Strict and Free", year:"1890",
    note:"A late Victorian synthesis that bridges species work and free composition. More thorough on invertible counterpoint than most predecessors." },
  { id:"lb_cp_5", topic:"counterpoint", era:"Modern",
    author:"Knud Jeppesen", title:"Counterpoint: The Polyphonic Vocal Style of the Sixteenth Century", year:"1931",
    note:"The authoritative modern study of Palestrina's language. Empirically derived from the corpus rather than abstract rules. Essential companion to Fux for anyone working in modal style." },
  { id:"lb_cp_6", topic:"counterpoint", era:"Modern",
    author:"Alfred Mann", title:"The Study of Fugue", year:"1958",
    note:"Historical, theoretical, and analytic in scope. Covers fugue doctrine from Baroque to Romantic with extended analysis of Bach and Handel. The best single-volume survey of the fugue tradition." },
  { id:"lb_cp_7", topic:"counterpoint", era:"Modern",
    author:"Arnold Schoenberg", title:"Preliminary Exercises in Counterpoint", year:"1963",
    note:"Graded exercises moving from strict species to tonal counterpoint. More directly applicable to common-practice writing than Fux. Edited posthumously by Leonard Stein." },
  { id:"lb_cp_8", topic:"counterpoint", era:"Contemporary",
    author:"Peter Schubert & Christoph Neidhöfer", title:"Baroque Counterpoint", year:"2006",
    note:"The most practically oriented modern text. Moves directly from reading to composition with graded exercises at every step. The preferred compositional guide for imitative and fugal writing in this program." },
  { id:"lb_cp_9", topic:"counterpoint", era:"Contemporary",
    author:"Peter Schubert", title:"Modal Counterpoint, Renaissance Style", year:"2007",
    note:"A rigorous and beautifully organized introduction to the Palestrina idiom. Complements Jeppesen with practical compositional exercises." },

  // ── HARMONY & VOICE LEADING ──────────────────────────────────────────────
  { id:"lb_hv_0", topic:"harmony", era:"Baroque",
    author:"Jean-Philippe Rameau", title:"Traité de l'harmonie", year:"1722",
    note:"The founding document of harmonic theory. Introduces the concepts of the fundamental bass, chord inversion, and tonal function. All subsequent harmony pedagogy stands in its shadow." },
  { id:"lb_hv_1", topic:"harmony", era:"Baroque",
    author:"Jean-Philippe Rameau", title:"Génération harmonique", year:"1737",
    note:"Rameau's attempt to ground harmonic theory in acoustics. Introduces the concept of the corps sonore as the physical basis of harmony. More speculative than the Traité but historically important." },
  { id:"lb_hv_2", topic:"harmony", era:"Classical",
    author:"Heinrich Christoph Koch", title:"Introductory Essay on Composition", year:"1782",
    note:"A three-volume treatise bridging Baroque thoroughbass practice and emerging Classical formal thought. The first serious treatment of phrase rhythm and period structure as compositional objects." },
  { id:"lb_hv_3", topic:"harmony", era:"Classical",
    author:"Gottfried Weber", title:"Theory of Musical Composition", year:"1817",
    note:"Introduced Roman numeral notation in its modern form. Influential on nineteenth-century pedagogy; notable for its explicit treatment of ambiguous and enharmonic harmonies." },
  { id:"lb_hv_4", topic:"harmony", era:"Romantic",
    author:"Simon Sechter", title:"The Correct Order of Musical Harmony", year:"1853",
    note:"The most systematic Viennese harmony treatise of the century. Schubert studied briefly with Sechter; Bruckner was a devoted pupil. The theory of Stufentheorie (scale-degree theory) is fully developed here." },
  { id:"lb_hv_5", topic:"harmony", era:"Romantic",
    author:"Hugo Riemann", title:"Harmony Simplified", year:"1893",
    note:"Riemann's mature statement of functional harmony theory. Introduces the Tonic–Subdominant–Dominant framework and the concept of harmonic function as distinct from scale-degree identity." },
  { id:"lb_hv_5b", topic:"harmony", era:"Modern",
    author:"Ernst Kurth", title:"Romantic Harmony and its Crisis in Wagner's Tristan", year:"1920",
    note:"The most penetrating theoretical study of the Tristan Prelude ever written. Kurth argues that late Romantic harmony is driven by kinetic energies in the leading voices rather than by chord-to-chord syntax — a fundamentally dynamic rather than static conception of harmony. Essential reading for Stage Four; transforms how the Tristan chord and its non-resolution are heard." },
  { id:"lb_hv_6", topic:"harmony", era:"Modern",
    author:"Heinrich Schenker", title:"Harmonielehre", year:"1906",
    note:"Schenker's first major theoretical work. Not yet the layered voice-leading theory of his maturity, but a rich account of scale-degree function and chromatic harmony in common-practice music." },
  { id:"lb_hv_7", topic:"harmony", era:"Modern",
    author:"Heinrich Schenker", title:"Counterpoint (2 vols.)", year:"1910–22",
    note:"Schenker's comprehensive reworking of species counterpoint as a theory of prolongation. Volume I covers two-voice; Volume II three- and more. Dense, demanding, and ultimately formative." },
  { id:"lb_hv_8", topic:"harmony", era:"Modern",
    author:"Heinrich Schenker", title:"Free Composition (Der freie Satz)", year:"1935",
    note:"The culminating statement of Schenkerian theory. Presents the Ursatz and the hierarchy of structural levels from background to foreground. The essential text for tonal voice-leading analysis." },
  { id:"lb_hv_9", topic:"harmony", era:"Modern",
    author:"Allen Forte & Steven Gilbert", title:"Introduction to Schenkerian Analysis", year:"1982",
    note:"The standard English-language primer. More accessible than Schenker's own prose; develops analytical method through progressively complex examples." },
  { id:"lb_hv_10", topic:"harmony", era:"Contemporary",
    author:"Edward Aldwell & Carl Schachter", title:"Harmony and Voice Leading", year:"1978",
    note:"The most rigorous tonal harmony textbook in English. Integrates Schenkerian voice-leading awareness into chord-by-chord analysis and composition. This program's primary harmony spine." },
  { id:"lb_hv_11", topic:"harmony", era:"Romantic",
    author:"Pyotr Ilyich Tchaikovsky", title:"Guide to the Practical Study of Harmony", year:"1872",
    note:"A systematic harmony manual written for Moscow Conservatory students. Covers diatonic and chromatic harmony through modulation with clear graded exercises. Notable for its directness and practicality — Tchaikovsky had little patience for the abstraction of German theory. A revealing document of Russian conservatory pedagogy and of how a major Romantic composer understood harmonic grammar." },
  { id:"lb_hv_12", topic:"harmony", era:"Contemporary",
    author:"Walter Piston", title:"Harmony", year:"1941",
    note:"Clear, comprehensive, and methodical. Less voice-leading-oriented than Aldwell & Schachter but broader in coverage of chromatic chords. A useful complementary reference." },

  // ── PARTIMENTO & FIGURED BASS ────────────────────────────────────────────
  { id:"lb_pb_0", topic:"partimento", era:"Baroque",
    author:"Johann David Heinichen", title:"Der General-Bass in der Composition", year:"1728",
    note:"The most exhaustive Baroque thoroughbass treatise. Covers an enormous range of figures, ornamental formulas, and improvisatory conventions. A primary source for understanding early 18th-century harmonic practice." },
  { id:"lb_pb_1", topic:"partimento", era:"Baroque",
    author:"C.P.E. Bach", title:"Essay on the True Art of Playing Keyboard Instruments", year:"1753",
    note:"Part I covers ornamentation and keyboard technique; Part II covers accompaniment and thoroughbass realization. The definitive account of mid-eighteenth-century performance and harmonic practice from the inside." },
  { id:"lb_pb_2", topic:"partimento", era:"Baroque",
    author:"F.T. Arnold", title:"The Art of Accompaniment from a Thorough-Bass", year:"1931",
    note:"A vast scholarly compendium drawing on dozens of original sources. Not a pedagogical manual but the definitive reference for historical figured bass practice." },
  { id:"lb_pb_3", topic:"partimento", era:"Contemporary",
    author:"Peter Williams", title:"Figured Bass Accompaniment (2 vols.)", year:"1970",
    note:"The clearest modern pedagogical guide to figured bass realization. Graded from simple diatonic figures through chromatic and ornamental ones. The primary practical text for keyboard realization in this program." },
  { id:"lb_pb_4", topic:"partimento", era:"Contemporary",
    author:"Giorgio Sanguinetti", title:"The Art of Partimento", year:"2012",
    note:"The definitive scholarly and pedagogical introduction to the Neapolitan partimento tradition. Part One covers history and theory; Part Two is a graded exercise anthology. Reveals how pre-Rameau generations internalized harmony through bass-line generation." },
  { id:"lb_pb_5", topic:"partimento", era:"Contemporary",
    author:"Robert O. Gjerdingen", title:"Music in the Galant Style", year:"2007",
    note:"Reconceives eighteenth-century Classical music through the lens of learnable voice-leading schemata rather than abstract harmonic categories. The Romanesca, Monte, Fonte, and Ponte replace Roman numerals as analytical units." },
  { id:"lb_pb_6", topic:"partimento", era:"Contemporary",
    author:"Giorgio Sanguinetti et al.", title:"Harmony, Counterpoint, Partimento", year:"2015",
    note:"A three-strand pedagogy that teaches harmony generatively from the bass rather than analytically from the soprano. Designed to run alongside conventional harmony study as a compositional countertrack." },

  // ── FORM & ANALYSIS ──────────────────────────────────────────────────────
  { id:"lb_fa_0", topic:"form", era:"Classical",
    author:"Adolf Bernhard Marx", title:"Musical Form in the Age of Beethoven", year:"1845",
    note:"Introduced the term 'sonata form' as a pedagogical concept and gave it its three-part exposition–development–recapitulation narrative. Enormously influential; also responsible for a generation of oversimplification." },
  { id:"lb_fa_0b", topic:"form", era:"Romantic",
    author:"Donald Francis Tovey", title:"Essays in Musical Analysis (6 vols.)", year:"1935",
    note:"The finest analytical prose on the Classical-Romantic repertoire in any language. Tovey's programme note essays on Haydn, Mozart, Beethoven, Schubert, Brahms, and their contemporaries combine precise formal observation with musical intelligence of the highest order. Not a theory textbook but an education in how to hear and think about large-scale structure. Every essay on a work in this program is worth reading before the score." },
  { id:"lb_fa_0c", topic:"form", era:"Modern",
    author:"Rudolf Réti", title:"The Thematic Process in Music", year:"1951",
    note:"Argues that the unity of great Classical works derives from the transformation of a small number of melodic cells across an entire composition. The analytic method is controversial and not universally accepted, but the fundamental question — what makes a multi-movement work cohere? — is the right one, and Réti asks it more seriously than anyone before Schoenberg's developing-variation concept." },
  { id:"lb_fa_1", topic:"form", era:"Romantic",
    author:"Hugo Riemann", title:"Analysis of J.S. Bach's Wohltemperirtes Clavier", year:"1890",
    note:"Representative of Riemann's mature analytic method: phrase-rhythm parsing, motivic analysis, functional harmonic labeling. The first detailed analytic commentary on the WTC." },
  { id:"lb_fa_2", topic:"form", era:"Modern",
    author:"Erwin Ratz", title:"Einführung in die musikalische Formenlehre", year:"1951",
    note:"A rigorous formalist account of Classical structure that anticipates Caplin. Introduces the concept of 'loose' and 'tight' construction that becomes central to formal-function theory." },
  { id:"lb_fa_3", topic:"form", era:"Modern",
    author:"Leonard Ratner", title:"Classic Music: Expression, Form, and Style", year:"1980",
    note:"Introduces topic theory — the network of stylistic allusions (hunt, march, learned style, singing style) that Classical composers drew on. A crucial complement to formal analysis." },
  { id:"lb_fa_4", topic:"form", era:"Contemporary",
    author:"Charles Rosen", title:"The Classical Style", year:"1971",
    note:"The most eloquent account of how Haydn, Mozart, and Beethoven articulated musical rhetoric. Not a textbook but a sustained argument; essential reading before any Classical analysis." },
  { id:"lb_fa_5", topic:"form", era:"Contemporary",
    author:"Charles Rosen", title:"Sonata Forms", year:"1980",
    note:"A corrective to Marx's oversimplification. Demonstrates the diversity of actual sonata-form practice and insists on understanding form as a dynamic rhetorical process, not a template." },
  { id:"lb_fa_6", topic:"form", era:"Contemporary",
    author:"William Caplin", title:"Classical Form", year:"1998",
    note:"The definitive formal-function theory. Every formal unit from the four-measure basic idea to the complete movement is given precise functional definitions. The analytic vocabulary of this program." },
  { id:"lb_fa_7", topic:"form", era:"Contemporary",
    author:"William Caplin", title:"Analyzing Classical Form", year:"2013",
    note:"A more accessible companion to Classical Form with extensive worked analyses. Recommended when the earlier volume feels abstract." },
  { id:"lb_fa_8", topic:"form", era:"Contemporary",
    author:"James Hepokoski & Warren Darcy", title:"Elements of Sonata Theory", year:"2006",
    note:"Introduces the concepts of the Essential Expositional Closure, the Essential Structural Closure, and formal 'deformation.' Particularly powerful for Beethoven and later repertoire. Use as reference rather than primary reading." },
  { id:"lb_fa_9", topic:"form", era:"Contemporary",
    author:"Carl Dahlhaus", title:"Between Romanticism and Modernism", year:"1980",
    note:"Analytic essays on late nineteenth-century music that demonstrate how Romantic composers stretched and subverted Classical formal norms. Essential for Stage Four score study." },

  // ── ORCHESTRATION ────────────────────────────────────────────────────────
  { id:"lb_or_0", topic:"orchestration", era:"Romantic",
    author:"Hector Berlioz", title:"Grand Treatise on Modern Instrumentation and Orchestration", year:"1843",
    note:"The founding text of orchestration as an independent discipline. Covers each instrument with unprecedented detail and includes extended analysis of orchestral texture. Revised and expanded by Richard Strauss in 1904." },
  { id:"lb_or_1", topic:"orchestration", era:"Romantic",
    author:"Nikolai Rimsky-Korsakov", title:"Principles of Orchestration", year:"1913",
    note:"A posthumously published manual drawn from Rimsky-Korsakov's own scores. More practically oriented than Berlioz; covers doublings, registers, and balance with clarity and economy." },
  { id:"lb_or_1b", topic:"orchestration", era:"Modern",
    author:"Cecil Forsyth", title:"Orchestration", year:"1914",
    note:"The other standard English orchestration treatise alongside Piston. More historically oriented than Piston — Forsyth grounds every instrument's treatment in the actual repertoire with extensive score quotation. Particularly strong on strings and on the orchestral balance problems that arise in Romantic-era writing. Worth reading in parallel with Rimsky-Korsakov." },
  { id:"lb_or_2", topic:"orchestration", era:"Modern",
    author:"Walter Piston", title:"Orchestration", year:"1955",
    note:"The standard American conservatory orchestration text through the second half of the twentieth century. Systematic, accurate, and well-illustrated with score excerpts." },
  { id:"lb_or_3", topic:"orchestration", era:"Contemporary",
    author:"Samuel Adler", title:"The Study of Orchestration", year:"1982",
    note:"Broader in scope than Piston; includes twentieth-century extended techniques and a wider range of repertoire examples. The most comprehensive modern orchestration textbook." },

  // ── POST-TONAL THEORY ────────────────────────────────────────────────────
  { id:"lb_pt_0", topic:"posttonal", era:"Modern",
    author:"Arnold Schoenberg", title:"Theory of Harmony (Harmonielehre)", year:"1911",
    note:"Schoenberg's comprehensive account of tonal harmony and its dissolution. The final chapters, tracing the path from chromatic harmony to 'the emancipation of the dissonance,' are the most significant. A primary document of modernism." },
  { id:"lb_pt_1", topic:"posttonal", era:"Modern",
    author:"Arnold Schoenberg", title:"Structural Functions of Harmony", year:"1954",
    note:"A more systematic and accessible account than the Harmonielehre. Covers extended tonality, chromatic harmony, and the transition to atonality. Written for American students." },
  { id:"lb_pt_2", topic:"posttonal", era:"Modern",
    author:"Paul Hindemith", title:"The Craft of Musical Composition, Vol. 1", year:"1937",
    note:"Hindemith's attempt to rebuild harmonic theory from acoustic first principles. Introduces a chord-ranking system based on intervallic tension. Controversial but clarifying as a counterpoint to functional theory." },
  { id:"lb_pt_3", topic:"posttonal", era:"Modern",
    author:"Olivier Messiaen", title:"The Technique of My Musical Language", year:"1944",
    note:"A composer's first-person account of his own methods: modes of limited transposition, non-retrogradable rhythms, added values, and Hindu rhythmic principles. An essential document for understanding mid-century French modernism." },
  { id:"lb_pt_4", topic:"posttonal", era:"Modern",
    author:"Allen Forte", title:"The Structure of Atonal Music", year:"1973",
    note:"Introduced pitch-class set theory as an analytic system for post-tonal music. Provides the vocabulary (prime form, interval vector, set class) that dominates academic analysis of atonal repertoire." },
  { id:"lb_pt_5", topic:"posttonal", era:"Contemporary",
    author:"Elliott Antokoletz", title:"The Music of Béla Bartók", year:"1984",
    note:"The most thorough analytic study of Bartók's language. Integrates interval-class analysis with Bartók's own axis-tonality concept. The essential guide to Stage Five Bartók score study." },
  { id:"lb_pt_6", topic:"posttonal", era:"Contemporary",
    author:"George Perle", title:"Serial Composition and Atonality", year:"1962",
    note:"A rigorous survey of twelve-tone techniques in Schoenberg, Berg, and Webern. The clearest introduction to row analysis and its compositional implications." },
  { id:"lb_pt_7", topic:"posttonal", era:"Contemporary",
    author:"Joseph Straus", title:"Introduction to Post-Tonal Theory", year:"1990",
    note:"The standard undergraduate post-tonal theory text. Systematic coverage of pitch-class sets, twelve-tone rows, and transformational operations; well-suited as a self-study guide." },
  { id:"lb_pt_8", topic:"posttonal", era:"Contemporary",
    author:"Vincent Persichetti", title:"Twentieth-Century Harmony", year:"1961",
    note:"A practical survey of extended harmonic materials: modal harmony, pandiatonicism, polytonality, and twelve-tone technique. Less rigorous than Forte or Straus but more immediately usable for composition." },
  { id:"lb_pt_9", topic:"posttonal", era:"Contemporary",
    author:"Pierre Boulez", title:"Boulez on Music Today", year:"1963",
    note:"Boulez's systematic account of serial technique extended to rhythm, dynamics, and timbre as well as pitch. Dense and polemical; represents the extreme structuralist wing of post-war European modernism. Essential context for understanding the post-Webern generation, even for those who ultimately reject the premises." },
  { id:"lb_pt_10", topic:"posttonal", era:"Contemporary",
    author:"Milton Babbitt", title:"Words About Music", year:"1987",
    note:"Collected lectures by the most rigorous American serialist. Babbitt's arguments for musical complexity, his account of twelve-tone combinatoriality, and his concept of the 'time-point system' represent one pole of post-war compositional thinking. Required as intellectual counterweight to Hindemith and the neoclassicists." },

  // ── STYLE, HISTORY & AESTHETICS ──────────────────────────────────────────
  { id:"lb_sh_0", topic:"aesthetics", era:"Baroque",
    author:"Johann Mattheson", title:"Der vollkommene Capellmeister", year:"1739",
    note:"An encyclopedic account of musical knowledge as Mattheson understood it: rhetoric, melody, counterpoint, form, and the affections. One of the richest primary sources for understanding Baroque compositional thinking." },
  { id:"lb_sh_1", topic:"aesthetics", era:"Baroque",
    author:"Johann Joachim Quantz", title:"On Playing the Flute", year:"1752",
    note:"Despite the title, a comprehensive treatise on performance, taste, and musical aesthetics in the mid-eighteenth century. Essential for understanding galant style from the inside." },
  { id:"lb_sh_2", topic:"aesthetics", era:"Classical",
    author:"Daniel Gottlob Türk", title:"Klavierschule", year:"1789",
    note:"The most thorough late-Classical account of keyboard performance and the relationship between notation, articulation, and expression. Indispensable for understanding Classical rhetoric at the level of the measure." },
  { id:"lb_sh_3", topic:"aesthetics", era:"Romantic",
    author:"Eduard Hanslick", title:"On the Musically Beautiful", year:"1854",
    note:"The central document of musical formalism. Argues that music's content is 'tonally moving forms' rather than expressed emotion. A polemical and historically indispensable text." },
  { id:"lb_sh_3b", topic:"aesthetics", era:"Romantic",
    author:"E.T.A. Hoffmann", title:"Music Criticism (selected essays)", year:"1809",
    note:"Hoffmann's reviews of Beethoven's Fifth Symphony and instrumental music more broadly are the founding documents of Romantic musical aesthetics. His claim that instrumental music is the most Romantic of the arts, that it opens an 'unknown realm' beyond ordinary language, shaped how the entire nineteenth century understood what music was for. Read the Beethoven Fifth review alongside the symphony itself." },
  { id:"lb_sh_3c", topic:"aesthetics", era:"Modern",
    author:"Carl Dahlhaus", title:"The Idea of Absolute Music", year:"1978",
    note:"A scholarly history of the concept that music has no content beyond itself. Dahlhaus traces the idea from Wackenroder and Hoffmann through Hanslick and into the twentieth century. The philosophical complement to his historical works; essential for understanding why the aesthetics of the repertoire in this program still matters." },
  { id:"lb_sh_4", topic:"aesthetics", era:"Romantic",
    author:"Carl Dahlhaus", title:"Nineteenth-Century Music", year:"1989",
    note:"The most intellectually serious historical account of Romantic music. Dahlhaus weaves aesthetic argument through historical narrative; the treatment of absolute music vs. program music is definitive." },
  { id:"lb_sh_5", topic:"aesthetics", era:"Modern",
    author:"Arnold Schoenberg", title:"Style and Idea", year:"1950",
    note:"A collection of essays spanning Schoenberg's career. 'Brahms the Progressive' is the essential argument for motivic coherence as a link between tonal and atonal practice. Required reading for Stage Four and Five." },
  { id:"lb_sh_6", topic:"aesthetics", era:"Contemporary",
    author:"Richard Taruskin", title:"Oxford History of Western Music (5 vols.)", year:"2005",
    note:"The most comprehensive modern history of Western music. Volumes 3–4 are especially valuable for this program: Romanticism through the early twentieth century, written with rigorous historical contextualization." },
  { id:"lb_sh_7", topic:"aesthetics", era:"Contemporary",
    author:"Leonard Meyer", title:"Emotion and Meaning in Music", year:"1956",
    note:"A foundational account of musical expectation, implication, and realization. Bridges music theory and cognitive psychology; shaped how a generation of analysts thought about tension and release." },
  { id:"lb_sh_8", topic:"aesthetics", era:"Contemporary",
    author:"Charles Rosen", title:"The Romantic Generation", year:"1995",
    note:"Rosen's companion to The Classical Style; covers Schubert, Schumann, Chopin, and the Lied with the same rhetorical intelligence. The treatment of Schubert's harmonic language is the best short account available." },

  // ── COMPOSITION & CRAFT ──────────────────────────────────────────────────
  { id:"lb_cc_0", topic:"craft", era:"Baroque",
    author:"Johann Mattheson", title:"Der vollkommene Capellmeister", year:"1739",
    note:"See also: Style, History & Aesthetics. As a compositional guide it covers melody construction, the doctrine of the affections, and the relationship between text and musical gesture with unmatched richness." },
  { id:"lb_cc_1", topic:"craft", era:"Romantic",
    author:"Carl Czerny", title:"School of Practical Composition (3 vols.)", year:"1848",
    note:"A comprehensive survey of every genre of composition from the Classical tradition. More prescriptive than analytical, but a valuable record of mid-nineteenth-century compositional norms." },
  { id:"lb_cc_2", topic:"craft", era:"Modern",
    author:"Arnold Schoenberg", title:"Fundamentals of Musical Composition", year:"1967",
    note:"Schoenberg's pedagogy distilled. Covers phrase construction, period forms, binary, ternary, rondo, and sonata through the lens of developing variation. Applies equally to tonal and post-tonal music." },
  { id:"lb_cc_3", topic:"craft", era:"Modern",
    author:"Ernst Toch", title:"The Shaping Forces in Music", year:"1948",
    note:"An elegant and thoughtful account of melody, harmony, counterpoint, and form as interactive forces rather than independent parameters. One of the most readable theory books written in the twentieth century." },
  { id:"lb_cc_4", topic:"craft", era:"Modern",
    author:"Paul Hindemith", title:"A Composer's World", year:"1952",
    note:"Hindemith's Harvard lectures: a composer's account of what music is for, how it is made, and what it demands. More philosophical than the Craft of Musical Composition; illuminates the aesthetic presuppositions behind his technical system." },
  { id:"lb_cc_5", topic:"craft", era:"Contemporary",
    author:"Fred Lerdahl & Ray Jackendoff", title:"A Generative Theory of Tonal Music", year:"1983",
    note:"Applies Chomskyan linguistics to tonal music, deriving hierarchical metrical and grouping structures from a small set of preference rules. Theoretically ambitious and empirically grounded; influential on cognitive music theory." },
  { id:"lb_cc_6", topic:"craft", era:"Contemporary",
    author:"David Lewin", title:"Generalized Musical Intervals and Transformations", year:"1987",
    note:"The foundational text of transformational theory. Reconceives musical relations not as measurements between objects but as actions performed by a virtual agent. Dense and mathematically demanding but intellectually transformative." },

  // ── PHILOSOPHY, COGNITION & ACOUSTICS ───────────────────────────────────
  { id:"lb_ca_0", topic:"cogacoustics", era:"Romantic",
    author:"Hermann von Helmholtz", title:"On the Sensations of Tone", year:"1863",
    note:"The founding work of musical acoustics as a scientific discipline. Helmholtz investigates the physics of sound, the anatomy of hearing, and the psychoacoustics of consonance and dissonance — deriving harmonic phenomena from the behavior of overtone series. Rameau's fundamental bass, the interval hierarchy, and the origin of tonality are all grounded here in acoustic reality. Essential background for understanding why Rameau's theory works and where it breaks down." },
  { id:"lb_ca_1", topic:"cogacoustics", era:"Romantic",
    author:"Edmund Gurney", title:"The Power of Sound", year:"1880",
    note:"The most serious Victorian philosophy of music. Gurney resists both pure formalism (Hanslick) and crude emotionalism, arguing that musical value resides in the specific 'ideal motion' of melodic form — a phenomenological account that anticipates later cognitive approaches. Underread and rewarding." },
  { id:"lb_ca_2", topic:"cogacoustics", era:"Modern",
    author:"Victor Zuckerkandl", title:"Sound and Symbol: Music and the External World", year:"1956",
    note:"A philosopher's account of what it means to hear music — specifically, what kind of reality tones inhabit. Zuckerkandl argues that tonal hearing is a form of genuine perception of dynamic qualities in the world, not a projection onto neutral sound. His account of melodic motion and harmonic tension as objective rather than subjective phenomena is a valuable corrective to purely formalist or purely emotivist theories. Accessible and beautifully written." },
  { id:"lb_ca_3", topic:"cogacoustics", era:"Modern",
    author:"Leonard Meyer", title:"Emotion and Meaning in Music", year:"1956",
    note:"A foundational account of musical expectation, implication, and realization. Bridges music theory and cognitive psychology; shaped how a generation of analysts thought about tension and release. Already listed under Aesthetics — central to both categories." },
  { id:"lb_ca_4", topic:"cogacoustics", era:"Contemporary",
    author:"John Sloboda", title:"The Musical Mind", year:"1985",
    note:"The first serious cognitive psychology of music. Covers musical representation, performance, improvisation, and development from an information-processing perspective. Grounded in empirical research rather than philosophical speculation; a useful corrective to the more abstract accounts in this section." },
  { id:"lb_ca_5", topic:"cogacoustics", era:"Contemporary",
    author:"Fred Lerdahl & Ray Jackendoff", title:"A Generative Theory of Tonal Music", year:"1983",
    note:"Applies Chomskyan linguistics to tonal music, deriving hierarchical metrical and grouping structures from preference rules. Already listed under Composition & Craft — belongs equally here as the most rigorous cognitive music theory in the literature." },
  { id:"lb_ca_6", topic:"cogacoustics", era:"Contemporary",
    author:"David Huron", title:"Sweet Anticipation: Music and the Psychology of Expectation", year:"2006",
    note:"The most comprehensive modern account of musical expectation and its emotional consequences. Huron's ITPRA theory (Imagination, Tension, Prediction, Reaction, Appraisal) provides a psychologically grounded framework for understanding why tonal syntax creates emotional effects. Directly relevant to understanding how functional harmony exploits and violates listener expectation — makes explicit what Aldwell & Schachter teach implicitly." },
  { id:"lb_ca_7", topic:"cogacoustics", era:"Contemporary",
    author:"Nicholas Cook", title:"Music, Imagination, and Culture", year:"1990",
    note:"A carefully argued critique of both formalist and cognitive approaches to music. Cook examines how listeners actually perceive large-scale musical structure (finding that most don't perceive the structural spans that analysts describe) and draws uncomfortable but important conclusions about the relationship between theoretical analysis and musical experience." },
  { id:"lb_ca_8", topic:"cogacoustics", era:"Contemporary",
    author:"Diana Deutsch (ed.)", title:"The Psychology of Music", year:"1982",
    note:"The standard reference anthology for music psychology. Covers pitch perception, melodic and harmonic organization, rhythm, meter, musical ability, and performance. Used as a reference rather than read cover to cover; invaluable for grounding theoretical claims in perceptual reality." },
  { id:"lb_ca_9", topic:"cogacoustics", era:"Contemporary",
    author:"Richard Parncutt", title:"Harmony: A Psychoacoustical Approach", year:"1989",
    note:"Applies Terhardt's virtual pitch theory to harmonic perception — deriving root-finding, chord hierarchy, and tonal tension directly from the psychoacoustics of complex tones. Bridges Helmholtz's acoustics and the cognitive accounts of Lerdahl and Huron. Technically demanding but rewards the effort with a genuine grounding of harmonic syntax in auditory physiology." },
  { id:"lb_ca_10", topic:"cogacoustics", era:"Contemporary",
    author:"Carol Krumhansl", title:"Cognitive Foundations of Musical Pitch", year:"1990",
    note:"The most consequential empirical work in music cognition. Krumhansl's probe-tone experiments establish tonal hierarchy quantitatively — demonstrating that listeners internalize a graded stability structure in which tonic triad tones are perceptually more stable than diatonic scale tones, which are more stable than chromatic tones. This hierarchy shapes melodic expectation, harmonic tension, and key-finding. The empirical bedrock on which Huron, Lerdahl's later theoretical work, and Parncutt all build. Should be read alongside Meyer." },
  { id:"lb_ca_11", topic:"cogacoustics", era:"Contemporary",
    author:"W. Jay Dowling & Darrell Harwood", title:"Music Cognition", year:"1986",
    note:"A rigorous and comprehensive empirical cognitive psychology of music. Covers pitch perception, melodic memory, interval and contour processing, harmony, rhythm, and meter through controlled experimental research. Less philosophically ambitious than Meyer or Huron but more systematically grounded in experimental results. Best used as a reference alongside the Deutsch anthology — between them they cover the experimental literature through the 1980s." },
  { id:"lb_ca_12", topic:"cogacoustics", era:"Contemporary",
    author:"Bob Snyder", title:"Music and Memory", year:"2000",
    note:"Applies cognitive memory research — echoic memory, short-term (event) memory, and long-term memory — directly to musical structure. Explains why phrase lengths cluster around 3–8 seconds (the span of short-term auditory storage), why certain formal units are perceivable as unified events and others are not, and how long-term memory shapes tonal and formal expectation. Answers questions that formal theory raises but cannot answer from within: why do these particular structural spans feel like units?" },
  { id:"lb_ca_13", topic:"cogacoustics", era:"Contemporary",
    author:"Aniruddh Patel", title:"Music, Language, and the Brain", year:"2008",
    note:"The most neuroscientifically grounded account of musical cognition currently available. Covers the music-language interface (syntactic processing, the ERAN response to harmonic violations, shared neural resources), pitch and melody, rhythm and meter, and musical meaning. Patel's OPERA hypothesis — that music exercises the neural substrates of linguistic processing — has direct implications for why musical training affects language perception. Essential for understanding what the brain is doing during the ear training and score-study work throughout this program." },

  // ── BEYOND THE PROGRAM ───────────────────────────────────────────────────
  // These works point toward musical territories the program does not enter.
  // They are listed not as assigned reading but as natural continuations for
  // anyone who has completed or is advancing through Stage Five.

  // — Rhythmic Complexity & Metric Modulation —
  { id:"lb_bx_0", topic:"beyond", era:"Contemporary",
    author:"Jonathan Bernard", title:"The Music of Edgard Varèse", year:"1987",
    note:"The analytical entry point into Varèse's pitch-space and rhythmic language — the earliest serious engagement with rhythm as a primary structural parameter rather than a vehicle for pitch events. Varèse is the missing figure between Stravinsky's rhythmic primitivism and the metric complexity of Carter and Ligeti." },
  { id:"lb_bx_1", topic:"beyond", era:"Contemporary",
    author:"Elliott Carter", title:"Harmony Book", year:"2002",
    note:"Carter's own systematic account of his harmonic language: an all-interval tetrachord-based system developed over decades of practice. Terse and demanding but irreplaceable as a primary source. Read alongside the String Quartets 2–5 and the Double Concerto." },
  { id:"lb_bx_2", topic:"beyond", era:"Contemporary",
    author:"Link, Jonathan & Boland, Marguerite (eds.)", title:"Elliott Carter Studies", year:"2012",
    note:"A collection of analytic essays covering metric modulation, all-interval harmony, and formal processes across Carter's output. More accessible than the Harmony Book as a starting point; the essays on metric modulation are the best available introduction to that technique." },
  { id:"lb_bx_3", topic:"beyond", era:"Contemporary",
    author:"Ligeti, György", title:"György Ligeti in Conversation", year:"1983",
    note:"Ligeti's most extended self-commentary — on micropolyphony, the piano études, his engagement with Conlon Nancarrow's player-piano polyrhythms, and his evolving relationship to tonality. A necessary companion to score study; Ligeti's own descriptions of his technical aims are more illuminating than most secondary analysis." },
  { id:"lb_bx_4", topic:"beyond", era:"Contemporary",
    author:"Steinitz, Richard", title:"György Ligeti: Music of the Imagination", year:"2003",
    note:"The standard English-language monograph. Strong analytical coverage of the orchestral works, the string quartets, and the piano études — the last of which synthesize African polyrhythm, Nancarrow's metric complexity, and post-tonal harmonic practice into some of the most technically and analytically demanding piano music of the century." },

  // — Minimalism —
  { id:"lb_bx_5", topic:"beyond", era:"Contemporary",
    author:"Keith Potter", title:"Four Musical Minimalists", year:"2000",
    note:"The most comprehensive analytic study of Riley, Young, Glass, and Reich. The chapters on Reich are especially strong: Potter traces the development of phasing, additive process, and harmonic stasis from the tape pieces through Music for 18 Musicians and beyond. Essential for understanding how minimalism retheorizes repetition, pulse, and tonal stasis as compositional resources." },
  { id:"lb_bx_6", topic:"beyond", era:"Contemporary",
    author:"Steve Reich", title:"Writings on Music 1965–2000", year:"2002",
    note:"Reich's collected essays and process notes. 'Music as a Gradual Process' (1968) is the foundational manifesto of process music; the later essays show how his thinking evolved toward harmonic richness and rhythmic complexity in the mature works. Short, direct, and indispensable." },
  { id:"lb_bx_7", topic:"beyond", era:"Contemporary",
    author:"Robert Fink", title:"Repeating Ourselves: American Minimal Music as Cultural Practice", year:"2005",
    note:"A cultural and analytic study that situates minimalism within broader American consumer culture and advertising aesthetics. More controversial than Potter but raises important questions about why minimalism sounds the way it does and what social functions musical repetition serves." },

  // — Spectralism —
  { id:"lb_bx_8", topic:"beyond", era:"Contemporary",
    author:"Murail, Tristan", title:"Target Practice (collected writings, tr. Joshua Cody)", year:"2005",
    note:"Murail's theoretical essays on spectral composition: the use of the harmonic series and acoustic models of sound as compositional material rather than stylistic reference. 'Spectra and Pixies' and 'The Revolution of Complex Sounds' are the essential texts. The direct link between Helmholtz's acoustics, already in this library, and spectral composition practice becomes apparent here." },
  { id:"lb_bx_9", topic:"beyond", era:"Contemporary",
    author:"Fineberg, Joshua (ed.)", title:"Spectral Music: History and Techniques", year:"2000",
    note:"A double issue of Contemporary Music Review collecting historical, theoretical, and compositional perspectives on spectralism. Includes texts by Grisey, Murail, Levinas, and others. The best single anthology for entering this repertoire analytically." },
  { id:"lb_bx_10", topic:"beyond", era:"Contemporary",
    author:"Grisey, Gérard", title:"'Tempus ex Machina: A Composer's Reflections on Musical Time'", year:"1987",
    note:"Grisey's account of his temporal philosophy — the spectrum of time from 'smooth' to 'striated,' and the relationship between acoustic envelope, spectral structure, and formal duration. One of the most original theoretical texts of the late twentieth century; connects Helmholtz and Parncutt to living compositional practice." },

  // — Jazz Theory —
  { id:"lb_bx_11", topic:"jazz", era:"Contemporary",
    author:"Mark Levine", title:"The Jazz Theory Book", year:"1995",
    note:"The standard professional jazz theory reference. Covers chord-scale relationships, reharmonization, modal jazz, bebop language, and rhythm changes with comprehensiveness and practical clarity. The harmonic vocabulary is entirely distinct from common-practice theory — extended tertian chords used as color rather than tendency, voice-leading governed by the melodic line rather than resolution — and engaging with it illuminates the functional tonal system by contrast. Start here." },
  { id:"lb_bx_12", topic:"jazz", era:"Contemporary",
    author:"Robert Rawlins & Nor Eddine Bahha", title:"Jazzology: The Encyclopedia of Jazz Theory for All Musicians", year:"2005",
    note:"More systematic and textbook-like than Levine; covers melody, harmony, rhythm, and form with explicit attention to the underlying theoretical principles rather than just the formulas. Useful as a reference alongside Levine." },
  { id:"lb_bx_13", topic:"jazz", era:"Contemporary",
    author:"Henry Martin", title:"Charlie Parker and Thematic Improvisation", year:"1996",
    note:"An analytic study of bebop improvisation as motivic and thematic process — demonstrating that Parker's solos have internal coherence of the kind Schoenberg attributed to developing variation. The theoretical bridge between the jazz and classical analytic traditions." },
  { id:"lb_bx_14", topic:"jazz", era:"Contemporary",
    author:"Dmitri Tymoczko", title:"A Geometry of Music", year:"2011",
    note:"A unified geometric theory of voice-leading that covers common-practice tonality, jazz harmony, and twentieth-century scalar music within a single mathematical framework. Orbifold geometry represents chord progressions as paths through a multidimensional space; efficient voice-leading corresponds to short paths. Genuinely original and applicable across the full range of tonal and post-tonal music. The most ambitious theoretical synthesis since Schenker." },
];

// ── STORAGE HELPERS ──────────────────────────────────────────────────────────
async function loadProgress() {
  try {
    const raw = localStorage.getItem("mtp_completed");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}
async function saveProgress(completed) {
  try { localStorage.setItem("mtp_completed", JSON.stringify([...completed])); } catch {}
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function countTasks(stage) {
  return Object.values(stage.tracks).reduce((n, arr) => n + arr.length, 0);
}
function countCompleted(stage, completed) {
  return Object.values(stage.tracks).reduce((n, arr) =>
    n + arr.filter(t => completed.has(t.id)).length, 0);
}
function totalTasks() { return STAGES.reduce((n, s) => n + countTasks(s), 0); }
function totalCompleted(completed) { return STAGES.reduce((n, s) => n + countCompleted(s, completed), 0); }

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeTrack, setActiveTrack] = useState("theory");
  const [view, setView] = useState("stage"); // "stage" | "milestones"
  const [completed, setCompleted] = useState(new Set());
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [highlightedTask, setHighlightedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  // Scroll to highlighted task
  useEffect(() => {
    if (!highlightedTask) return;
    const el = document.querySelector(`[data-task-id="${highlightedTask}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(() => setHighlightedTask(null), 1800);
    return () => clearTimeout(t);
  }, [highlightedTask]);

  // Reset header expansion when switching stages or tracks
  useEffect(() => { setHeaderCollapsed(false); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activeStage, activeTrack, view]);

  useEffect(() => {
    loadProgress().then(c => { setCompleted(c); setLoaded(true); });
  }, []);

  const toggleTask = useCallback((id) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveProgress(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      const empty = new Set();
      setCompleted(empty);
      saveProgress(empty);
    }
  }, []);

  const navigateToConcurrent = useCallback((taskId, track) => {
    setActiveTrack(track);
    // Small delay so the track panel re-renders before we scroll
    setTimeout(() => setHighlightedTask(taskId), 60);
  }, []);

  const stage = STAGES[activeStage];
  const trackTasks = stage.tracks[activeTrack] || [];
  const trackCfg = TRACKS.find(t => t.key === activeTrack);
  const stageTotal = countTasks(stage);
  const stageDone = countCompleted(stage, completed);
  const trackDone = trackTasks.filter(t => completed.has(t.id)).length;
  const allTotal = totalTasks();
  const allDone = totalCompleted(completed);
  const globalPct = allTotal ? Math.round((allDone / allTotal) * 100) : 0;

  if (!loaded) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#f5efe0", fontFamily:"Georgia, serif", color:"#7a7060", fontSize:14 }}>
        Loading…
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{height:100%;overflow:hidden}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#ccc6b8;border-radius:3px}
        .app-root{display:flex;height:100vh;font-family:'EB Garamond',Georgia,serif;background:#f5efe0;color:#26200e;overflow:hidden}

        /* ─── Sidebar ─── */
        .sidebar{
          background:#18253d;
          display:flex;flex-direction:column;overflow:hidden;
          border-right:1px solid #0e1929;
          flex-shrink:0;
          transition:width .25s cubic-bezier(.4,0,.2,1);
        }
        .sidebar.open { width:280px; }
        .sidebar.closed { width:48px; }

        /* Header — full and collapsed variants */
        .sb-header{padding:14px 14px 12px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;gap:6px;overflow:hidden}
        .sb-header-top{display:flex;align-items:center;justify-content:space-between;gap:6px}
        .sb-app-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:13px;font-weight:600;color:#ddd4c0;line-height:1.35;letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity .2s}
        .sidebar.closed .sb-app-title{opacity:0;width:0;pointer-events:none}
        .sb-app-sub{font-size:9px;color:#4a5f82;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;transition:opacity .2s}
        .sidebar.closed .sb-app-sub{display:none}
        .sb-prog-row{display:flex;align-items:center;gap:7px;transition:opacity .2s}
        .sidebar.closed .sb-prog-row{display:none}
        .sb-prog-bar{flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
        .sb-prog-fill{height:100%;background:#b07828;border-radius:2px;transition:width .4s ease}
        .sb-prog-pct{font-size:10px;color:#4a5f82;min-width:26px;text-align:right}

        /* Toggle button */
        .sb-toggle{width:24px;height:24px;border-radius:4px;border:none;background:rgba(255,255,255,.06);color:#5a7099;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s,color .15s}
        .sb-toggle:hover{background:rgba(255,255,255,.12);color:#ddd4c0}
        .sidebar.closed .sb-toggle{margin:0 auto}

        /* Nav */
        .sb-nav{flex:1;overflow-y:auto;overflow-x:hidden;padding:6px 0}
        .sb-section-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#344a68;padding:10px 14px 3px;white-space:nowrap;transition:opacity .2s}
        .sidebar.closed .sb-section-lbl{opacity:0;height:0;padding:0;overflow:hidden}

        /* Stage items — full */
        .sb-stage-item{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;cursor:pointer;transition:background .15s;position:relative;overflow:hidden}
        .sb-stage-item:hover{background:#1e3057}
        .sb-stage-item.active{background:#243968}
        .sb-stage-item.active::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#b07828}
        .sb-num{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:10px;color:#5a7099;flex-shrink:0;margin-top:1px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;transition:background .15s,color .15s}
        .sb-stage-item.active .sb-num{background:#b07828;color:#fff}
        .sb-stage-text{flex:1;min-width:0;transition:opacity .2s,width .2s}
        .sidebar.closed .sb-stage-text{opacity:0;width:0;overflow:hidden;pointer-events:none}
        .sb-stage-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:13px;font-weight:600;color:#c8d6ea;line-height:1.3;white-space:normal}
        .sb-stage-months{font-size:10px;color:#3e5474;margin-top:2px;white-space:normal}
        .sb-mini{width:36px;text-align:right;flex-shrink:0;padding-top:2px;transition:opacity .2s}
        .sidebar.closed .sb-mini{opacity:0;width:0;overflow:hidden;pointer-events:none}
        .sb-mini-bar{height:2px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden;margin-top:3px}
        .sb-mini-fill{height:100%;background:#b07828;border-radius:1px;transition:width .3s}
        .sb-mini-pct{font-size:9px;color:#344a68}

        /* Collapsed tooltip on hover */
        .sb-stage-item{position:relative}
        .sidebar.closed .sb-stage-item:hover::after{
          content:attr(data-label);
          position:absolute;left:52px;top:50%;transform:translateY(-50%);
          background:#0e1929;color:#ddd4c0;font-size:12px;
          padding:5px 10px;border-radius:4px;white-space:nowrap;
          pointer-events:none;z-index:100;font-family:'EB Garamond',Georgia,serif;
          border:1px solid rgba(255,255,255,.08);
        }

        .sb-divider{height:1px;background:rgba(255,255,255,.05);margin:6px 14px}
        .sidebar.closed .sb-divider{margin:6px 8px}

        .sb-milestone-item{display:flex;align-items:center;gap:9px;padding:8px 14px;cursor:pointer;transition:background .15s;font-size:12px;color:#5a7099;white-space:nowrap;overflow:hidden}
        .sb-milestone-item:hover{background:#1e3057;color:#9ab0cc}
        .sb-milestone-item.active{background:#243968;color:#ddd4c0}
        .sb-milestone-label{transition:opacity .2s}
        .sidebar.closed .sb-milestone-label{opacity:0;width:0;overflow:hidden}
        .sidebar.closed .sb-milestone-item:hover::after{
          content:'Milestones';
          position:absolute;left:52px;top:auto;
          background:#0e1929;color:#ddd4c0;font-size:12px;
          padding:5px 10px;border-radius:4px;white-space:nowrap;
          pointer-events:none;z-index:100;font-family:'EB Garamond',Georgia,serif;
          border:1px solid rgba(255,255,255,.08);
        }

        .sb-reset{display:flex;align-items:center;gap:6px;padding:10px 14px;cursor:pointer;font-size:11px;color:#344a68;transition:color .15s;border-top:1px solid rgba(255,255,255,.05);margin-top:4px;white-space:nowrap;overflow:hidden}
        .sb-reset:hover{color:#7a9bb8}
        .sb-reset-label{transition:opacity .2s}
        .sidebar.closed .sb-reset-label{opacity:0;width:0;overflow:hidden}

        /* Search */
        .sb-search-wrap{padding:8px 10px 6px;border-top:1px solid rgba(255,255,255,.06)}
        .sidebar.closed .sb-search-wrap{padding:8px 6px 6px;display:flex;justify-content:center}
        .sb-search-inner{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border-radius:5px;padding:5px 8px;border:1px solid rgba(255,255,255,.06);transition:border-color .15s}
        .sb-search-inner:focus-within{border-color:rgba(176,120,40,.5)}
        .sidebar.closed .sb-search-inner{padding:5px;justify-content:center;width:30px;height:30px;border-radius:50%}
        .sb-search-input{flex:1;background:none;border:none;outline:none;font-family:'EB Garamond',Georgia,serif;font-size:12px;color:#ddd4c0;min-width:0}
        .sb-search-input::placeholder{color:#344a68}
        .sidebar.closed .sb-search-input{display:none}

        /* Search results view */
        .srch-wrap{flex:1;overflow-y:auto;padding:24px 32px}
        .srch-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:600;color:#18253d;margin-bottom:4px}
        .srch-sub{font-size:13px;color:#9a9082;margin-bottom:20px}
        .srch-section{margin-bottom:24px}
        .srch-section-head{font-family:'Cormorant Garamond',Georgia,serif;font-size:14px;font-weight:600;color:#18253d;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #d8d0c4}
        .srch-result{display:flex;gap:10px;padding:9px 11px;border-radius:5px;cursor:pointer;border:1px solid transparent;transition:background .12s;align-items:flex-start;margin-bottom:3px}
        .srch-result:hover{background:#ede6d4;border-color:#d8d0c4}
        .srch-badge{font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;padding:2px 7px;border-radius:3px;white-space:nowrap;flex-shrink:0;margin-top:2px}
        .srch-text{font-size:13px;color:#26200e;line-height:1.5}
        .srch-note{font-size:11.5px;color:#9a9082;font-style:italic;line-height:1.5;margin-top:2px}
        .srch-empty{font-size:13px;color:#9a9082;font-style:italic;padding:20px 0}

        /* ─── Main ─── */
        .main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}

        /* Stage header — collapsible */
        .stage-hdr{
          background:#f5efe0;flex-shrink:0;
          border-bottom:1px solid #d8d0c4;
          overflow:hidden;
          transition:max-height .3s cubic-bezier(.4,0,.2,1), padding .3s cubic-bezier(.4,0,.2,1);
        }
        .stage-hdr.expanded{ max-height:300px; padding:18px 32px 16px; }
        .stage-hdr.collapsed{ max-height:80px; padding:0 32px; }

        /* Always-visible slim bar inside header */
        .stage-hdr-slim{
          display:flex; align-items:center; gap:10px;
          min-height:46px; padding:8px 0; cursor:pointer;
        }
        .stage-slim-tag{
          font-size:10px;text-transform:uppercase;letter-spacing:.1em;
          color:#b07828;font-weight:600;
          font-family:'Cormorant Garamond',Georgia,serif;
          white-space:nowrap;flex-shrink:0;
        }
        .stage-slim-sep{color:#ccc6b8;font-size:12px;flex-shrink:0}
        .stage-slim-title{
          font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;
          font-weight:600;color:#18253d;
          white-space:normal; word-break:normal;
          flex:1;min-width:0;line-height:1.3;
        }
        .stage-slim-chevron{
          color:#8a7f6e;flex-shrink:0;
          width:22px;height:22px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          background:rgba(0,0,0,.06);
          transition:transform .3s cubic-bezier(.4,0,.2,1), background .15s, color .15s;
        }
        .stage-hdr.collapsed .stage-slim-chevron{ transform:rotate(-180deg); }
        .stage-hdr-slim:hover .stage-slim-chevron{ background:rgba(0,0,0,.12); color:#18253d; }

        /* Expanded body — fades out as header collapses */
        .stage-hdr-body{
          overflow:hidden;
          transition:opacity .2s, max-height .3s cubic-bezier(.4,0,.2,1);
        }
        .stage-hdr.expanded .stage-hdr-body{ opacity:1; max-height:220px; }
        .stage-hdr.collapsed .stage-hdr-body{ opacity:0; max-height:0; pointer-events:none; }

        .stage-hdr-top{display:flex;align-items:baseline;gap:10px;margin-bottom:5px}
        .stage-tag{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#b07828;font-weight:600;font-family:'Cormorant Garamond',Georgia,serif}
        .stage-months-tag{font-size:10px;color:#9a9082;letter-spacing:.04em}
        .stage-main-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:600;color:#18253d;line-height:1.1;margin-bottom:8px}
        .stage-overview{font-size:13px;color:#6a6054;line-height:1.7}
        .stage-prog-row{display:flex;align-items:center;gap:16px;margin-top:14px}
        .stage-prog-label{font-size:11px;color:#9a9082}
        .stage-prog-bar{width:120px;height:4px;background:#e0d8cc;border-radius:2px;overflow:hidden}
        .stage-prog-fill{height:100%;background:#b07828;border-radius:2px;transition:width .4s ease}
        .stage-prog-num{font-size:11px;color:#b07828;font-weight:600}
        /* Track tabs */
        .track-tabs{display:flex;padding:0 32px;background:#f0e9d8;border-bottom:1px solid #d8d0c4;gap:0;flex-shrink:0;overflow-x:auto}
        .track-tabs::-webkit-scrollbar{height:0}
        .track-tab{display:flex;align-items:center;gap:6px;padding:11px 15px 10px;cursor:pointer;font-size:12px;font-weight:500;color:#9a9082;border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap;font-family:'EB Garamond',Georgia,serif}
        .track-tab:hover{color:#26200e}
        .track-tab.active{border-bottom-color:var(--tc);color:var(--tc)}
        .track-tab-badge{min-width:17px;height:17px;padding:0 4px;border-radius:9px;font-size:10px;display:inline-flex;align-items:center;justify-content:center;background:#e0d8cc;color:#9a9082;transition:all .15s}
        .track-tab.active .track-tab-badge{background:var(--tc);color:#fff}
        /* Content */
        .track-body{flex:1;overflow-y:auto;padding:24px 32px}
        /* Tasks */
        .task-list{display:flex;flex-direction:column;gap:4px;max-width:740px}
        .task-item{display:flex;gap:11px;padding:11px 13px;border-radius:5px;cursor:pointer;transition:background .12s;align-items:flex-start;border:1px solid transparent}
        .task-item:hover{background:#ede6d4;border-color:#d8d0c4}
        .task-item.done{opacity:.5}
        .task-cb{width:17px;height:17px;border-radius:3px;border:1.5px solid #c8bfb0;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;transition:all .15s;background:#fff}
        .task-item.done .task-cb{background:var(--tc);border-color:var(--tc)}
        .task-body-txt{flex:1;min-width:0}
        .task-main{font-size:13.5px;line-height:1.55;color:#26200e}
        .task-item.done .task-main{text-decoration:line-through;color:#9a9082}
        .task-note{font-size:12px;color:#9a9082;line-height:1.6;margin-top:4px;font-style:italic}
        .task-link{display:inline-flex;align-items:center;gap:3px;font-size:11px;color:#b07828;text-decoration:none;margin-top:3px}
        .task-link:hover{text-decoration:underline}
        /* Concurrent chips */
        .concurrent-row{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
        .concurrent-chip{
          display:inline-flex;align-items:center;gap:4px;
          padding:2px 7px 2px 5px;border-radius:20px;
          font-size:10.5px;font-family:'EB Garamond',Georgia,serif;
          border:1px solid;cursor:pointer;
          transition:opacity .15s, filter .15s;
          max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
          line-height:1.6;
        }
        .concurrent-chip:hover{filter:brightness(.9);}
        .task-item.done .concurrent-chip{opacity:.4;pointer-events:none}
        /* Flash highlight when navigating to a task from a chip */
        @keyframes task-flash {
          0%   { background: #fde8a0; border-color: #b07828; }
          60%  { background: #fde8a0; border-color: #b07828; }
          100% { background: transparent; border-color: transparent; }
        }
        .task-item.highlighted { animation: task-flash 1.8s ease forwards; }
        /* Footer */
        .track-footer{padding:11px 32px;border-top:1px solid #d8d0c4;background:#f0e9d8;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-shrink:0}
        .tf-section{display:flex;align-items:center;gap:9px}
        .tf-label{font-size:11px;color:#9a9082;white-space:nowrap}
        .tf-label-dim{font-size:11px;color:#b8b0a8;white-space:nowrap}
        .tf-bar{width:100px;height:3px;background:#d8d0c4;border-radius:2px;overflow:hidden}
        .tf-bar-wide{width:140px;height:3px;background:#d8d0c4;border-radius:2px;overflow:hidden}
        .tf-fill{height:100%;border-radius:2px;transition:width .3s}
        .tf-num{font-size:11px;font-weight:600;white-space:nowrap}
        .tf-divider{width:1px;height:20px;background:#d8d0c4;flex-shrink:0}
        /* Milestones */
        .milestones-wrap{flex:1;overflow-y:auto;padding:28px 32px}
        .ms-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:600;color:#18253d;margin-bottom:6px}
        .ms-sub{font-size:13px;color:#6a6054;margin-bottom:28px;line-height:1.6}
        table.ms-table{width:100%;border-collapse:collapse;max-width:820px}
        .ms-table th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#9a9082;padding:8px 12px;border-bottom:2px solid #d8d0c4;font-family:'EB Garamond',Georgia,serif}
        .ms-table td{padding:11px 12px;border-bottom:1px solid #e0d8cc;font-size:13px;vertical-align:top;line-height:1.55}
        .ms-table tr:hover td{background:#ede6d4}
        .ms-month{font-size:11px;color:#b07828;font-weight:600;white-space:nowrap;font-family:'Cormorant Garamond',Georgia,serif}
        .ms-milestone-name{font-weight:500;font-family:'Cormorant Garamond',Georgia,serif;font-size:14.5px;color:#18253d}
        .ms-test{color:#6a6054;font-size:12.5px;font-style:italic}
        /* Library */
        .lib-wrap{flex:1;overflow-y:auto;padding:28px 32px;display:flex;flex-direction:column;gap:0}
        .lib-header{margin-bottom:20px}
        .lib-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:600;color:#18253d;margin-bottom:5px}
        .lib-sub{font-size:13px;color:#6a6054;line-height:1.6}
        .lib-topics{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
        .lib-topic-btn{
          padding:5px 13px;border-radius:20px;border:1px solid #d8d0c4;
          background:#fff;font-family:'EB Garamond',Georgia,serif;font-size:12px;
          color:#6a6054;cursor:pointer;transition:all .15s;white-space:nowrap;
        }
        .lib-topic-btn:hover{border-color:#b07828;color:#b07828}
        .lib-topic-btn.active{background:#18253d;border-color:#18253d;color:#ddd4c0}
        .lib-section{margin-bottom:32px}
        .lib-section-head{
          display:flex;align-items:center;gap:10px;
          margin-bottom:12px;padding-bottom:7px;
          border-bottom:1px solid #d8d0c4;
        }
        .lib-section-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-weight:600;color:#18253d}
        .lib-section-count{font-size:11px;color:#9a9082}
        .lib-entries{display:flex;flex-direction:column;gap:0}
        .lib-entry{
          display:grid;grid-template-columns:110px 1fr;gap:12px;
          padding:11px 12px;border-radius:5px;
          border:1px solid transparent;transition:background .12s;
        }
        .lib-entry:hover{background:#ede6d4;border-color:#d8d0c4}
        .lib-meta{display:flex;flex-direction:column;gap:4px;padding-top:1px}
        .lib-era{
          display:inline-block;font-size:9.5px;text-transform:uppercase;
          letter-spacing:.07em;padding:2px 7px;border-radius:3px;
          font-family:'EB Garamond',Georgia,serif;font-weight:500;white-space:nowrap;
        }
        .lib-year{font-size:11px;color:#9a9082;white-space:nowrap}
        .lib-body{}
        .lib-author{font-size:12px;color:#9a9082;margin-bottom:1px}
        .lib-book-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:600;color:#18253d;font-style:italic;line-height:1.3;margin-bottom:5px}
        .lib-note{font-size:12.5px;color:#6a6054;line-height:1.65}
      `}</style>

      <div className="app-root">
        {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

          {/* Header */}
          <div className="sb-header">
            <div className="sb-header-top">
              {sidebarOpen && (
                <div style={{ minWidth: 0 }}>
                  <div className="sb-app-title">Common-Practice Music Theory</div>
                  <div className="sb-app-sub">Self-Directed Study Program</div>
                </div>
              )}
              <button className="sb-toggle" onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
                {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>
            {sidebarOpen && (
              <div className="sb-prog-row">
                <div className="sb-prog-bar">
                  <div className="sb-prog-fill" style={{ width: `${globalPct}%` }} />
                </div>
                <span className="sb-prog-pct">{globalPct}%</span>
              </div>
            )}
          </div>

          <nav className="sb-nav">
            {sidebarOpen && <div className="sb-section-lbl">Stages</div>}
            {STAGES.map((s, i) => {
              const total = countTasks(s);
              const done = countCompleted(s, completed);
              const pct = total ? Math.round((done / total) * 100) : 0;
              const isActive = activeStage === i && view === "stage";
              return (
                <div key={s.id}
                  className={`sb-stage-item${isActive ? " active" : ""}`}
                  data-label={`Stage ${s.number}: ${s.title}`}
                  title={!sidebarOpen ? `Stage ${s.number}: ${s.title}` : undefined}
                  onClick={() => { setActiveStage(i); setView("stage"); }}>
                  <div className="sb-num">{s.number}</div>
                  {sidebarOpen && <>
                    <div className="sb-stage-text">
                      <div className="sb-stage-name">{s.title}</div>
                      <div className="sb-stage-months">{s.months}</div>
                    </div>
                    <div className="sb-mini">
                      <div className="sb-mini-pct">{done}/{total}</div>
                      <div className="sb-mini-bar">
                        <div className="sb-mini-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </>}
                </div>
              );
            })}

            <div className="sb-divider" />

            <div className={`sb-milestone-item${view === "milestones" ? " active" : ""}`}
              title={!sidebarOpen ? "Milestones" : undefined}
              onClick={() => setView("milestones")}>
              <Trophy size={13} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span className="sb-milestone-label">Milestones</span>}
            </div>

            <div className={`sb-milestone-item${view === "library" ? " active" : ""}`}
              title={!sidebarOpen ? "Appendix: Library" : undefined}
              onClick={() => setView("library")}>
              <Library size={13} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span className="sb-milestone-label">Appendix: Library</span>}
            </div>

            <div className="sb-reset" title={!sidebarOpen ? "Reset progress" : undefined} onClick={resetAll}>
              <RotateCcw size={11} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span className="sb-reset-label">Reset all progress</span>}
            </div>

            {/* Search */}
            <div className="sb-search-wrap">
              <div className="sb-search-inner"
                onClick={() => { if (!sidebarOpen) { setSidebarOpen(true); } }}
                title={!sidebarOpen ? "Search" : undefined}>
                <Search size={11} style={{ color: "#5a7099", flexShrink: 0 }} />
                <input
                  className="sb-search-input"
                  placeholder="Search tasks & library…"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setView("search"); else if (view === "search") setView("stage"); }}
                  onFocus={() => { if (searchQuery) setView("search"); }}
                />
              </div>
            </div>
          </nav>
        </aside>

        {/* ── MAIN ────────────────────────────────────────────────────────── */}
        <div className="main">
          {view === "milestones" ? (
            <MilestonesView />
          ) : view === "library" ? (
            <LibraryView />
          ) : view === "search" ? (
            <SearchView query={searchQuery} onNavigateTask={(stageIdx, track, taskId) => {
              setActiveStage(stageIdx); setActiveTrack(track); setView("stage");
              setTimeout(() => setHighlightedTask(taskId), 80);
            }} onNavigateLibrary={() => setView("library")} />
          ) : (
            <>
              {/* Stage header — collapses on scroll down, expands on scroll up */}
              <div className={`stage-hdr ${headerCollapsed ? "collapsed" : "expanded"}`}>
                {/* Slim bar — always visible, click to toggle */}
                <div className="stage-hdr-slim" onClick={() => setHeaderCollapsed(c => !c)}>
                  <span className="stage-slim-tag">Stage {stage.number}</span>
                  <span className="stage-slim-sep">·</span>
                  <span className="stage-slim-title">{stage.title}</span>
                  <ChevronLeft size={15} className="stage-slim-chevron" style={{ transform: headerCollapsed ? "rotate(-90deg)" : "rotate(90deg)" }} />
                </div>

                {/* Expanded body */}
                <div className="stage-hdr-body">
                  <div className="stage-hdr-top">
                    <span className="stage-tag">Stage {stage.number}</span>
                    <span className="stage-months-tag">{stage.months}</span>
                  </div>
                  <div className="stage-main-title">{stage.title}</div>
                  <div className="stage-overview">{stage.overview}</div>
                </div>
              </div>

              {/* Track tabs */}
              <div className="track-tabs">
                {TRACKS.map(t => {
                  const tasks = stage.tracks[t.key] || [];
                  const done = tasks.filter(x => completed.has(x.id)).length;
                  const isActive = activeTrack === t.key;
                  const Icon = t.icon;
                  return (
                    <div key={t.key}
                      className={`track-tab${isActive ? " active" : ""}`}
                      style={{ "--tc": t.color }}
                      onClick={() => setActiveTrack(t.key)}>
                      <Icon size={13} />
                      {t.label}
                      <span className="track-tab-badge">{done}/{tasks.length}</span>
                    </div>
                  );
                })}
              </div>

              {/* Task list */}
              <div className="track-body" style={{ "--tc": trackCfg.color }}
                ref={scrollRef}
                onScroll={e => {
                  const el = e.currentTarget;
                  const y = el.scrollTop;
                  if (y > lastScrollY.current + 8) {
                    setHeaderCollapsed(true);
                  }
                  lastScrollY.current = y;
                }}>
                <div className="task-list">
                  {trackTasks.map(task => {
                    const isDone = completed.has(task.id);
                    const isHighlighted = highlightedTask === task.id;
                    const concurrents = (CONCURRENT_MAP[task.id] || []).filter(c => c.track !== activeTrack);
                    // Dedupe by track: show at most one chip per other track, prefer shortest text
                    const chipsByTrack = {};
                    for (const c of concurrents) {
                      if (!chipsByTrack[c.track] || c.shortText.length < chipsByTrack[c.track].shortText.length) {
                        chipsByTrack[c.track] = c;
                      }
                    }
                    const chips = Object.values(chipsByTrack);
                    return (
                      <div key={task.id}
                        data-task-id={task.id}
                        className={`task-item${isDone ? " done" : ""}${isHighlighted ? " highlighted" : ""}`}
                        style={{ "--tc": trackCfg.color }}
                        onClick={() => toggleTask(task.id)}>
                        <div className="task-cb">
                          {isDone && <Check size={11} color="#fff" strokeWidth={3} />}
                        </div>
                        <div className="task-body-txt">
                          <div className="task-main">{task.text}</div>
                          {task.note && <div className="task-note">{task.note}</div>}
                          {task.link && (
                            <a className="task-link" href={task.link} target="_blank" rel="noreferrer"
                              onClick={e => e.stopPropagation()}>
                              <ExternalLink size={10} /> IMSLP score
                            </a>
                          )}
                          {chips.length > 0 && (
                            <div className="concurrent-row" onClick={e => e.stopPropagation()}>
                              {chips.map(chip => {
                                const tc = TRACKS.find(t => t.key === chip.track);
                                const Icon = tc?.icon;
                                return (
                                  <span key={chip.taskId}
                                    className="concurrent-chip"
                                    style={{ background: tc?.bg, color: tc?.color, borderColor: tc?.border }}
                                    title={`Do alongside: ${TASK_LOOKUP[chip.taskId]?.text}`}
                                    onClick={() => navigateToConcurrent(chip.taskId, chip.track)}>
                                    {Icon && <Icon size={10} />}
                                    {tc?.label}: {chip.shortText}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Track footer */}
              <div className="track-footer">
                <span className="tf-label-dim">Stage {stage.number} progress</span>
                <div style={{ flex: 1, height: 3, background: "#d8d0c4", borderRadius: 2, overflow: "hidden" }}>
                  <div className="tf-fill" style={{ width: `${stageTotal ? Math.round((stageDone/stageTotal)*100) : 0}%`, background: "#b07828" }} />
                </div>
                <span className="tf-num" style={{ color: "#b07828" }}>{stageDone} / {stageTotal}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const ERA_COLORS = {
  "Renaissance": { bg:"#f0ece0", color:"#5a4820" },
  "Baroque":     { bg:"#e8f0e4", color:"#2a5a28" },
  "Classical":   { bg:"#e4ecf8", color:"#1c3d7a" },
  "Romantic":    { bg:"#f8e8e4", color:"#7a2828" },
  "Modern":      { bg:"#ede4f4", color:"#4a2870" },
  "Contemporary":{ bg:"#e4f0f4", color:"#1a4a5a" },
};

function LibraryView() {
  const [activeTopic, setActiveTopic] = useState("all");

  const filtered = activeTopic === "all" ? LIBRARY : LIBRARY.filter(b => b.topic === activeTopic);

  // Group by topic for display
  const topicsToShow = activeTopic === "all"
    ? LIBRARY_TOPICS.filter(t => t.key !== "all")
    : LIBRARY_TOPICS.filter(t => t.key === activeTopic);

  return (
    <div className="lib-wrap">
      <div className="lib-header">
        <div className="lib-title">Appendix: Theory Books & Treatises</div>
        <div className="lib-sub">
          Significant works in music theory, counterpoint, harmony, and aesthetics from the Renaissance to the present.
          Includes primary sources by composer-theorists alongside the modern scholarly literature.
        </div>
      </div>

      <div className="lib-topics">
        {LIBRARY_TOPICS.map(t => (
          <button key={t.key}
            className={`lib-topic-btn${activeTopic === t.key ? " active" : ""}`}
            onClick={() => setActiveTopic(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {topicsToShow.map(topic => {
        const entries = LIBRARY.filter(b => b.topic === topic.key);
        if (!entries.length) return null;
        return (
          <div key={topic.key} className="lib-section">
            <div className="lib-section-head">
              <span className="lib-section-title">{topic.label}</span>
              <span className="lib-section-count">{entries.length} works</span>
            </div>
            <div className="lib-entries">
              {entries.map(book => {
                const eraStyle = ERA_COLORS[book.era] || { bg:"#f0ece0", color:"#5a4820" };
                return (
                  <div key={book.id} className="lib-entry">
                    <div className="lib-meta">
                      <span className="lib-era" style={{ background: eraStyle.bg, color: eraStyle.color }}>
                        {book.era}
                      </span>
                      <span className="lib-year">{book.year}</span>
                    </div>
                    <div className="lib-body">
                      <div className="lib-author">{book.author}</div>
                      <div className="lib-book-title">{book.title}</div>
                      <div className="lib-note">{book.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Normalize for search: lowercase + strip diacritics so "Dvorak" finds "Dvořák"
function norm(str) {
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function SearchView({ query, onNavigateTask, onNavigateLibrary }) {
  const q = norm(query);
  if (!q.trim()) return (
    <div className="srch-wrap">
      <div className="srch-title">Search</div>
      <div className="srch-empty">Start typing in the search box to find tasks and library entries.</div>
    </div>
  );

  // Search tasks
  const taskResults = [];
  STAGES.forEach((stage, stageIdx) => {
    TRACKS.forEach(track => {
      const tasks = stage.tracks[track.key] || [];
      tasks.forEach(task => {
        if (norm(task.text).includes(q) || (task.note && norm(task.note).includes(q))) {
          taskResults.push({ stage, stageIdx, track, task });
        }
      });
    });
  });

  // Search library
  const libResults = LIBRARY.filter(b =>
    norm(b.title).includes(q) ||
    norm(b.author).includes(q) ||
    norm(b.note).includes(q) ||
    norm(b.era).includes(q)
  );

  const total = taskResults.length + libResults.length;

  return (
    <div className="srch-wrap">
      <div className="srch-title">Search results</div>
      <div className="srch-sub">{total} result{total !== 1 ? "s" : ""} for "{query}"</div>

      {taskResults.length > 0 && (
        <div className="srch-section">
          <div className="srch-section-head">Curriculum Tasks ({taskResults.length})</div>
          {taskResults.map(({ stage, stageIdx, track, task }) => {
            return (
              <div key={task.id} className="srch-result"
                onClick={() => onNavigateTask(stageIdx, track.key, task.id)}>
                <span className="srch-badge"
                  style={{ background: track.bg, color: track.color, border: `1px solid ${track.border}` }}>
                  {track.label}
                </span>
                <div>
                  <div className="srch-text">{task.text}</div>
                  <div style={{ fontSize: 11, color: "#9a9082", marginTop: 2 }}>
                    Stage {stage.number}: {stage.title}
                  </div>
                  {task.note && <div className="srch-note">{task.note}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {libResults.length > 0 && (
        <div className="srch-section">
          <div className="srch-section-head">Library ({libResults.length})</div>
          {libResults.map(book => {
            const eraStyle = ERA_COLORS[book.era] || { bg:"#f0ece0", color:"#5a4820" };
            const topicLabel = LIBRARY_TOPICS.find(t => t.key === book.topic)?.label || book.topic;
            return (
              <div key={book.id} className="srch-result" onClick={onNavigateLibrary}>
                <span className="srch-badge" style={{ background: eraStyle.bg, color: eraStyle.color }}>
                  {book.era}
                </span>
                <div>
                  <div style={{ fontSize: 11, color: "#9a9082", marginBottom: 1 }}>{book.author} · {topicLabel}</div>
                  <div className="srch-text" style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic" }}>{book.title}</div>
                  <div className="srch-note">{book.note.slice(0, 160)}{book.note.length > 160 ? "…" : ""}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {total === 0 && (
        <div className="srch-empty">No results found. Try a different spelling — diacritics are ignored automatically.</div>
      )}
    </div>
  );
}

function MilestonesView() {
  return (
    <div className="milestones-wrap">
      <div className="ms-title">Milestones & Self-Assessment</div>
      <div className="ms-sub">
        Each milestone marks a point where a skill has been internalized, not merely practiced.
        Approximate months assume 10–15 hours of sustained weekly work.
      </div>
      <table className="ms-table">
        <thead>
          <tr>
            <th style={{ width: 70 }}>Month</th>
            <th style={{ width: 220 }}>Milestone</th>
            <th>Self-Assessment Test</th>
          </tr>
        </thead>
        <tbody>
          {MILESTONES.map((m, i) => (
            <tr key={i}>
              <td><span className="ms-month">~{m.month}</span></td>
              <td><span className="ms-milestone-name">{m.name}</span></td>
              <td><span className="ms-test">{m.test}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
