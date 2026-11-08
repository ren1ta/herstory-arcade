# Herstory Arcade

You are an expert retro-arcade web developer and narrative game designer. Your task is to build a fully interactive, story-driven web application titled: "Walk A Mile In Her Shoes"   for a school social science exhibition. 

The website must feature an authentic 8-bit / 16-bit pixel art aesthetic, complete with retro UI elements, sound effects, and a CRT scanline overlay effect.

---

### 1. VISUAL & UI DESIGN SPECIFICATIONS (Based on Provided Inspo)
- Color Palette: Soft pastel pinks, deep vintage lavenders, warm creams, and high-contrast neon highlights (#ff2a85 pink, #00f0ff cyan, #ffb800 gold).
- UI Framework: Window frames styled like vintage OS boxes or retro RPG menu screens with pixelated borders and retro fonts (e.g., 'Press Start 2P' and 'VT323').
- HUD Elements: Include a custom pixel-art health/progress bar styled with a heart and star tracker widget.
- Audio Controls: Include a persistent, adjustable volume settings slider and toggle for sound effects.

---

### 2. INTRODUCTORY SEQUENCE & CINEMATIC (10-Second Transition)
1. Avatar Selection Screen: 
   - The player selects one of the custom pixel avatars provided (e.g., the red-haired adventurer, white-bun cyber heroine, or dark-haired classic pixel styles).
2. The Living Room Scene: 
   - The chosen avatar appears in a cozy, retro pixel-art living room (featuring a couch, coffee table, potted plants, and a large TV screen).
3. The 10-Second Cinematic Animation:
   - Step 1 (0-3s): Footstep audio triggers as the avatar walks across the room.
   - Step 2 (3-6s): Sitting sound effect plays as the avatar plops down onto the couch.
   - Step 3 (6-8s): A clicking sound triggers as the avatar turns on the TV.
   - Step 4 (8-10s): A flashing neon "Whoosh!" sound effect plays as a digital vortex pulls the avatar directly *inside* the TV screen into the historical timeline game world!

---

### 3. GAME LEVELS & HISTORICAL TIMELINE SCRIPTS
Once pulled into the TV, the player navigates through four distinct interactive levels based on the historical waves of feminism:

#### LEVEL 1: The First Wave (1890s – 1920s) — Legal Rights & Suffrage
- Core Goal: Securing basic legal recognition, political rights, and formal equality under the law.
- Historical Context: Women legally classified as dependents—unable to vote, hold independent property, or sign contracts.
- Interactive Quest Script:
  > **[SYSTEM: 1910 LONDON/NEW YORK]** 
  > You are legally bound as a dependent. Your campaign group debates next steps.
  > * Choice A: Focus exclusively on Suffrage (Right to Vote) believing it unlocks all else.
  > * Choice B: Prioritize property and child custody laws.
  > * Choice C: Join working-class activists and women of color (like Sojourner Truth & Ida B. Wells) to fight intersecting battles.
  > * *Consequence/Unlock:* Passing the 19th Amendment (1920) / New Zealand (1893), but acknowledging the mainstream movement's early racial and class exclusions.

#### LEVEL 2: The Second Wave (1960s – 1980s) — Workplace & Reproductive Rights
- Core Goal: Challenging systemic sexism and cultural expectations ("The Personal is Political").
- Historical Context: Hitting glass ceilings, needing a husband's signature for bank credit.
- Interactive Quest Script:
  > **[SYSTEM: 1970 CORPORATE/SUBURBIA]** 
  > You face workplace discrimination and lack financial autonomy. 
  > * Choice A: Campaign for equal pay, anti-discrimination laws, and independent credit/bank accounts.
  > * Choice B: Establish grassroots crisis centers, women’s shelters, and anti-violence hotlines.
  > * Choice C: Form consciousness-raising circles to challenge domestic roles.
  > * *Consequence/Unlock:* Landmark legislation like Roe v. Wade (1973) and the spark for independent multi-cultural organizing.

#### LEVEL 3: The Third Wave (1990s – 2000s) — Intersectionality & Individual Choice
- Core Goal: Dismantling rigid definitions of womanhood and embracing diverse identities.
- Historical Context: Moving beyond a single narrative to include race, class, sexuality, and disability.
- Interactive Quest Script:
  > **[SYSTEM: 1995 GLOBAL / UNDERGROUND SCENE]** 
  > Redefining what feminism looks and feels like.
  > * Choice A: Apply Kimberlé Crenshaw’s framework of "Intersectionality" (1989).
  > * Choice B: Join the "Riot Grrrl" punk music movement to reclaim bodily autonomy and challenge media tropes.
  > * Choice C: Celebrate individual choice, fashion, and queer/trans inclusion.
  > * *Consequence/Unlock:* A diverse, globalized movement that breaks down rigid gender binaries.

#### LEVEL 4: The Fourth Wave (2010s – Present) — Digital Activism & Tech Justice
- Core Goal: Utilizing global connectivity and fighting modern tech/algorithmic bias.
- Historical Context: Social media mobilization meets artificial intelligence data prejudice.
- Interactive Quest Script:
  > **[SYSTEM: 2026 DIGITAL SPHERE]** 
  > Online networks are booming, but tech systems are replicating old prejudices.
  > * Choice A: Launch viral digital movements (like #MeToo) to break silence on institutional harassment.
  > * Choice B: Audit and expose Algorithmic Bias in AI hiring tools and facial recognition.
  > * Choice C: Fight for climate justice (Ecofeminism) and global body autonomy.
  > * *Consequence/Unlock:* Victory! You complete the arcade run, proving that the fight for equality evolves alongside human technology.

---

### 4. TECHNICAL & AUDIO IMPLEMENTATION
- Include standard HTML5 audio event triggers for:
  - `walk.mp3` (footsteps on wooden floor)
  - `sit.mp3` (couch plop sound)
  - `click.mp3` (UI button clicks)
  - `teleport_suck.mp3` (TV suction effect for the intro transition)
- Make sure all code is clean, modular, and fully functional so it can be previewed and deployed seamlessly for the exhibition table!

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9c6098f1-ed5f-42bf-b263-ebb5857cf3c4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
