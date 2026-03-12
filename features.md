# Anay's Clay Crew — Feature Implementation Tracker

## LAYERING OVERHAUL

### Positioning System
- [ ] Hardcoded absolute `left`/`bottom` pixel values for all 16 blobs
- [ ] Remove row-based auto-scaling CSS transforms
- [ ] Front row: `filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5))`
- [ ] Back row: `filter: saturate(0.72) brightness(0.88)`

### Front Row (z 14–16)
- [ ] "THE DEV" — left: 38%, bottom: -10px, width: 195px, z: 16
- [ ] "THE LOL PLAYER" — left: 22%, bottom: -15px, width: 185px, z: 15
- [ ] "THE LEGO BUILDER" — left: 58%, bottom: -5px, width: 175px, z: 14

### Mid Row (z 8–13)
- [ ] "EXPLORER" (Competitive Programmer) — left: 30%, bottom: 140px, w: 160px, z: 13
- [ ] "NERD" — left: 50%, bottom: 120px, w: 155px, z: 12
- [ ] "PIRATE" (Mars Rover) — left: 68%, bottom: 150px, w: 150px, z: 11
- [ ] "INJURED" — left: 15%, bottom: 160px, w: 145px, z: 10
- [ ] "MUSICIAN" (Hackathon) — left: 76%, bottom: 130px, w: 148px, z: 9
- [ ] "CHEF" — left: 42%, bottom: 200px, w: 142px, z: 8

### Back Row (z 1–7)
- [ ] "PHILOSOPHER" — left: 55%, bottom: 280px, w: 128px, z: 7
- [ ] "SLEEPY" — left: 35%, bottom: 300px, w: 122px, z: 6
- [ ] "COOL" — left: 65%, bottom: 270px, w: 130px, z: 5
- [ ] "ASTRONAUT" — left: 46%, bottom: 340px, w: 118px, z: 4
- [ ] "ANGRY" — left: 28%, bottom: 260px, w: 112px, z: 3
- [ ] "DETECTIVE" — left: 72%, bottom: 310px, w: 120px, z: 2
- [ ] "WILDCARD" — left: 58%, bottom: 370px, w: 108px, z: 1

---

## BLOB PERSONA DESIGNS

- [ ] Blob 1 "THE DEV" (#DAFC92) — glasses, laptop (>_ terminal), DJSCE badge, focused smile
- [ ] Blob 2 "THE LOL PLAYER" (#4ECDC4) — LoL sword, crown, AWS badge, WINNER ribbon
- [ ] Blob 3 "THE LEGO BUILDER" (#FFD93D) — 2×4 LEGO brick, stud hair, instruction booklet
- [ ] Blob 4 "THE COMPETITIVE PROGRAMMER" (#1E488F) — 1497 badge, LeetCode clipboard, {} curly braces floating
- [ ] Blob 5 "THE MARS ROVER" (#C0392B) — helmet ring, rover wheel, ROS2 device, ♂ symbol, wrench
- [ ] Blob 6 "THE HACKATHON BLOB" (#9B59FF) — winner medal, sweat drops, energy drink can, eye bags, clock "5 HRS"
- [ ] Blob 7 "THE DOODLER" (#FF6B9D) — paint splatters, paintbrush, canvas easel, palette
- [ ] Blob 8 "THE SURFER" (#2980B9) — surfboard, forehead sunglasses, wave emoji, wider stance sway
- [ ] Blob 9 "THE PUZZLE SOLVER" (#A8E6CF) — Rubik's cube, lightbulb, orbiting ?-marks, glasses
- [ ] Blob 10 "THE MOVIE BUFF" (#E67E22) — clapperboard, film reel, popcorn, wide-eyes
- [ ] Blob 11 "THE SLEEPY ONE" (#FFD93D) — DJSCE hoodie pouch pocket, "Z z z" zzz text
- [ ] Blob 12 "THE ROBOT" (#BDC3C7) — rivets, antenna, square pupils, circuit board, "01" binary float
- [ ] Blob 13 "THE COOL ONE" (#2F3542) — DJCSI badge, headphones, lime star, "500+" float
- [ ] Blob 14 "THE CHEF" (orange) — vada pav in pan, 🌶️ steam float
- [ ] Blob 15 "THE ASTRONAUT" (near-white) — "DJSA" on visor, Mars flag, Antariksh rover near shoulder
- [ ] Blob 16 "THE WILDCARD" (lime) — GitHub Octocat flag, "13" on chest, enthusiastic wave

---

## GSAP ANIMATIONS
- [ ] Dev: laptop screen color flash #DAFC92 (compile success loop)
- [ ] LOL Player: sword arm slowly raises/lowers (auto-attack idle)
- [ ] LEGO Builder: arm moves up every 4s (placing imaginary brick)
- [ ] Competitive Programmer: {} braces orbit head in loop; fastest eye tracking
- [ ] Doodler: colored dots float up from paintbrush tip
- [ ] Puzzle Solver: mouth straight→smile snap every 6s (solve moment)
- [ ] Movie Buff: clapperboard snap animation occasionally
- [ ] Robot: mechanical stepped arm motion (not smooth)
- [ ] Wildcard: most enthusiastic wave (fastest, biggest amplitude)

---

## MOBILE COMPATIBILITY
- [ ] Blob positions shift for small screens (≤768px)
- [ ] Card layout stacks/wraps on mobile
- [ ] Blob sizes scale down on mobile
- [ ] Touch tap triggers jump/bounce animation

---

## DONE
*(items will be checked off as implemented)*
