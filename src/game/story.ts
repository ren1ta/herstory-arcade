import toyStore from "@/assets/Screenshot 2026-11-08 at 3.10.24 PM 3.png";
import suffrageStreet from "@/assets/Screenshot 2026-11-08 at 3.19.03 PM.png";
import lab1950s from "@/assets/Screenshot 2026-11-08 at 3.19.41 PM.png";
import office1970s from "@/assets/Screenshot 2026-11-08 at 3.20.22 PM.png";
import livingRoom1985 from "@/assets/Screenshot 2026-11-08 at 3.21.02 PM.png";
import punkVenue from "@/assets/Screenshot 2026-11-08 at 3.21.40 PM.png";
import summit1999 from "@/assets/Screenshot 2026-11-08 at 3.22.30 PM.png";
import boardroom from "@/assets/Screenshot 2026-11-08 at 3.23.07 PM.png";
import computerLab from "@/assets/Screenshot 2026-11-08 at 3.23.42 PM.png";
import campus from "@/assets/Screenshot 2026-11-08 at 3.24.13 PM.png";
import aiLab from "@/assets/Screenshot 2026-11-08 at 3.27.22 PM.png";
import summitStage from "@/assets/Screenshot 2026-11-08 at.png";
import toyShopkeeper from "@/assets/toy shopkeeper.png";
import bystander from "@/assets/bystander.png";
import maleScientist from "@/assets/male scientist.png";
import bankManager from "@/assets/corporate ceo.png";
import venueOwner from "@/assets/music venue owner.png";
import summitPanelist from "@/assets/summit panelist.png";
import corporateCeo from "@/assets/corporate ceo.png";
import codingTeacher from "@/assets/computer lab teacher.png";
import universityDean from "@/assets/college dean.png";
import techLead from "@/assets/tech lead.png";
import keynoteSpeaker from "@/assets/keynote speaker'.png";

export type ChoiceKey = "A" | "B";
export type LifeStage = "CHILDHOOD" | "YOUTH" | "ADULTHOOD" | "MATURITY";
export type ActNumber = 1 | 2 | 3;

export interface Choice {
  key: ChoiceKey;
  label: string;
  /** The bold, progressive option clears the level; the other triggers GAME OVER. */
  bold: boolean;
}

export interface NpcInteraction {
  name: string;
  sprite: string;
  lines: string[];
  response: string;
}

export interface Act {
  number: ActNumber;
  numeral: "I" | "II" | "III";
  title: string;
  era: string;
  tagline: string;
}

export interface Level {
  id: string;
  act: ActNumber;
  stage: LifeStage;
  age: number;
  year: string;
  place: string;
  system: string;
  scene: string;
  choices: [Choice, Choice];
  clearTitle: string;
  clearText: string;
  history: string;
  gameOverTitle: string;
  gameOverText: string;
  background: string;
  npc: NpcInteraction;
  /** Optional CSS filter so reused scenes feel different. */
  tint?: string;
}

const NPC = {
  toyShopkeeper: {
    name: "1950s SHOPKEEPER",
    sprite: toyShopkeeper,
    lines: ["Kitchen sets are over here for girls.", "The rocket kits are really meant for boys."],
    response: "I shouldn't have to choose between what I like and what people expect of me.",
  },
  suffrageActivist: {
    name: "1910s BYSTANDER",
    sprite: bystander,
    lines: ["The march is getting louder.", "Will you stand with us and demand the vote?"],
    response: "Their voices deserve to be heard—and I can add mine to the march.",
  },
  labSupervisor: {
    name: "MALE LAB SUPERVISOR",
    sprite: maleScientist,
    lines: ["Your results are impressive.", "I'll present the discovery under my name."],
    response: "My work and my name belong together. I won't let this discovery be taken from me.",
  },
  bankManager: {
    name: "1974 BANK MANAGER",
    sprite: bankManager,
    lines: ["Your business plan looks solid.", "I'm afraid I still need your husband's signature."],
    response: "My finances are my own. This rule must change for every woman who comes after me.",
  },
  tvAnnouncer: {
    name: "TV ANNOUNCER",
    sprite: bystander,
    lines: ["And now, another story about a princess waiting to be rescued.", "That's the only kind of story kids want to see, right?"],
    response: "Stories can show girls solving problems and saving the day, too.",
  },
  venueOwner: {
    name: "VENUE OWNER",
    sprite: venueOwner,
    lines: ["The main stage is booked.", "You and the other women can hand out flyers at the door."],
    response: "If this stage has no room for us, we'll make our own—and bring everyone with us.",
  },
  summitPanelist: {
    name: "SUMMIT PANELIST",
    sprite: summitPanelist,
    lines: ["Let's discuss what women experience.", "We don't need to get into race or class today."],
    response: "Race, class, and gender can overlap. We need to hear from people at those crossroads.",
  },
  corporateCeo: {
    name: "CORPORATE CEO",
    sprite: corporateCeo,
    lines: ["The promotion is going to someone else.", "He just feels like a better fit for the team."],
    response: "Let's examine the evidence. Fair pay and promotion need transparent standards.",
  },
  codingTeacher: {
    name: "CODING TEACHER",
    sprite: codingTeacher,
    lines: ["Boys, take the coding challenge.", "Girls, why don't you choose the background colours?"],
    response: "I want to solve the coding challenge, too. Programming belongs to everyone.",
  },
  universityDean: {
    name: "UNIVERSITY DEAN",
    sprite: universityDean,
    lines: ["We should keep these reports private.", "Please sign this agreement so the university can move on."],
    response: "Silence protects the institution, not students. We need accountability and change.",
  },
  techLead: {
    name: "TECH LEAD",
    sprite: techLead,
    lines: ["The hiring model is ready to ship.", "It scores applicants lower when their CV mentions a women's college."],
    response: "A deadline can't excuse discrimination. We need to audit the data and fix the bias first.",
  },
  keynoteSpeaker: {
    name: "KEYNOTE SPEAKER",
    sprite: keynoteSpeaker,
    lines: ["Technology has completely solved gender bias!", "There's nothing left to fix—let's celebrate."],
    response: "Equality isn't finished. We need digital rights, fair technology, and action that continues.",
  },
} satisfies Record<string, NpcInteraction>;

export const ACTS: Act[] = [
  {
    number: 1,
    numeral: "I",
    title: "THE HISTORICAL REVOLUTION",
    era: "1890s – 1970s",
    tagline: "Win the right to learn, to vote, to be credited — and to be your own legal person.",
  },
  {
    number: 2,
    numeral: "II",
    title: "THE INTERSECTIONAL SHIFT",
    era: "1980s – 2000s",
    tagline: "Rewrite the stories, the stages and the rules — for every kind of woman.",
  },
  {
    number: 3,
    numeral: "III",
    title: "THE DIGITAL ERA & TECH JUSTICE",
    era: "2010s – 2026",
    tagline: "Code, connect and debug a world where old bias hides inside new tech.",
  },
];

export const LEVELS: Level[] = [
  // ---------------- ACT I ----------------
  {
    id: "1.1",
    act: 1,
    stage: "CHILDHOOD",
    age: 7,
    year: "1950s",
    place: "Main Street Toy Store",
    system: "[SYSTEM: 1956 · MAIN STREET TOY STORE]",
    scene:
      "It's your birthday money and your choice. The shopkeeper hands you a shiny mini-kitchen set — then steers the boys behind you towards the chemistry kits and rockets.",
    choices: [
      { key: "A", label: "Set down the stove and claim the science rocket kit.", bold: true },
      { key: "B", label: "Accept the toy stove quietly.", bold: false },
    ],
    clearTitle: "FUTURE SCIENTIST UNLOCKED!",
    clearText:
      "You march to the 'boys' shelf and buy the rocket kit. That night the kitchen table becomes a launch pad — and your curiosity has nowhere to go but up.",
    history:
      "Toys of the 1950s were sharply split: chemistry and rocket sets were boxed with pictures of boys, while girls were sold stoves and dolls. Mae Jemison loved science as a child in the 1960s — and in 1992 became the first Black woman in space.",
    gameOverTitle: "CURIOSITY.EXE STOPPED",
    gameOverText:
      "You take the stove. It's a fine toy — but the message sticks: science is 'for boys'. Toys that tell children what they're supposed to like can quietly shrink their dreams.",
    background: toyStore,
    npc: NPC.toyShopkeeper,
  },
  {
    id: "1.2",
    act: 1,
    stage: "YOUTH",
    age: 19,
    year: "1910s",
    place: "Suffrage March",
    system: "[SYSTEM: 1913 · SUFFRAGE MARCH, GOVERNMENT HALL]",
    scene:
      "Outside the government hall, bystanders heckle and shove the suffragists. An empty soapbox stands beside a line of activists from every background.",
    choices: [
      { key: "A", label: "Walk away to avoid trouble.", bold: false },
      {
        key: "B",
        label: "Step onto the soapbox alongside diverse activists and demand voting rights.",
        bold: true,
      },
    ],
    clearTitle: "VOTES FOR WOMEN!",
    clearText:
      "Your voice carries over the jeers. More marchers join you — and you refuse to let anyone be pushed to the back of the line.",
    history:
      "At the 1913 Woman Suffrage Procession in Washington DC, crowds attacked the marchers. Ida B. Wells was told to walk at the back with other Black women — she refused. The 19th Amendment (1920) followed New Zealand (1893), yet many Black women in the US South could not vote freely until 1965.",
    gameOverTitle: "SILENCED",
    gameOverText:
      "You slip away. The hecklers get louder and the march gets smaller. Rights are rarely handed out — they were won by ordinary people who stood up when it was scary.",
    background: suffrageStreet,
    npc: NPC.suffrageActivist,
  },
  {
    id: "1.3",
    act: 1,
    stage: "ADULTHOOD",
    age: 32,
    year: "1950s",
    place: "X-Ray Lab · The Matilda Effect",
    system: "[SYSTEM: 1952 · X-RAY CRYSTALLOGRAPHY LAB, LONDON]",
    scene:
      "Your X-ray photograph reveals the shape of DNA. Your male supervisor glances at it and says he'll present the discovery — under his name.",
    choices: [
      { key: "A", label: "Publish your raw data under your own lead authorship.", bold: true },
      { key: "B", label: "Let him take the credit to avoid conflict.", bold: false },
    ],
    clearTitle: "CREDIT WHERE IT'S DUE",
    clearText:
      "Your name goes first on the paper. The data — and the discovery — are on the record as yours.",
    history:
      "Rosalind Franklin's 'Photo 51' (1952) was key to discovering DNA's double helix. It was shown to Watson and Crick without her knowledge. She published her own paper in Nature in 1953, but the 1962 Nobel Prize went to three men. Historian Margaret Rossiter named this pattern the 'Matilda Effect'.",
    gameOverTitle: "THE MATILDA EFFECT",
    gameOverText:
      "He takes the stage and the credit. For centuries, women's discoveries were filed under men's names — and history forgot who really did the work.",
    background: lab1950s,
    npc: NPC.labSupervisor,
  },
  {
    id: "1.4",
    act: 1,
    stage: "MATURITY",
    age: 45,
    year: "1974",
    place: "City Bank Loan Office",
    system: "[SYSTEM: 1974 · CITY BANK, LOAN OFFICE]",
    scene:
      "Your business plan is solid and your savings are real. The bank manager slides your form back: 'No loan without your husband's signature.'",
    choices: [
      { key: "A", label: "Ask a male colleague to sign for you.", bold: false },
      { key: "B", label: "Lobby Congress and spark the Equal Credit Opportunity Act.", bold: true },
    ],
    clearTitle: "CREDIT IN HER OWN NAME",
    clearText:
      "You rally women's groups, testify and flood Congress with letters. The bank's rule is about to become illegal.",
    history:
      "Before 1974, US banks could refuse a woman credit unless a man co-signed. The Equal Credit Opportunity Act (1974) banned credit discrimination based on sex or marital status — Congresswoman Lindy Boggs added those words to the bill herself.",
    gameOverTitle: "CO-SIGNED AWAY",
    gameOverText:
      "You get the loan — but the rule survives, and so does the idea that a woman's money needs a man's permission. The next woman in line hits the same wall.",
    background: office1970s,
    npc: NPC.bankManager,
  },

  // ---------------- ACT II ----------------
  {
    id: "2.1",
    act: 2,
    stage: "CHILDHOOD",
    age: 8,
    year: "1985",
    place: "Saturday Morning Cartoons",
    system: "[SYSTEM: 1985 · SATURDAY MORNING CARTOONS]",
    scene:
      "Every cartoon on TV tells the same story: the princess screams, waits in a tower, and gets rescued by the prince.",
    choices: [
      { key: "A", label: "Accept it — that's just how stories go.", bold: false },
      {
        key: "B",
        label: "Write and mail a script where the princess saves herself using engineering.",
        bold: true,
      },
    ],
    clearTitle: "PLOT TWIST!",
    clearText:
      "Your princess builds a pulley lift, escapes the tower and rescues the prince. The studio writes back: 'We love it.'",
    history:
      "In 1985 cartoonist Alison Bechdel's comic introduced a simple test: does a story have two women who talk to each other about something other than a man? Decades later, many films still fail it.",
    gameOverTitle: "DAMSEL MODE: ON",
    gameOverText:
      "You keep watching. When every story shows girls waiting to be saved, kids start to believe it. Media shapes what we imagine is possible.",
    background: livingRoom1985,
    npc: NPC.tvAnnouncer,
  },
  {
    id: "2.2",
    act: 2,
    stage: "YOUTH",
    age: 20,
    year: "1993",
    place: "Riot Grrrl Scene",
    system: "[SYSTEM: 1993 · UNDERGROUND MUSIC VENUE]",
    scene:
      "The venue owner bans female bands from the main stage: 'You can hand out flyers at the door.'",
    choices: [
      {
        key: "A",
        label: "Launch an independent zine and set up an outside stage advocating bodily autonomy.",
        bold: true,
      },
      { key: "B", label: "Accept handing out flyers at the door.", bold: false },
    ],
    clearTitle: "GIRLS TO THE FRONT!",
    clearText:
      "Your photocopied zine spreads hand to hand, and your car-park stage draws a bigger crowd than the main room.",
    history:
      "Riot Grrrl bands like Bikini Kill (early 1990s) made their own zines and shows, shouted 'Girls to the front!' so women felt safe at gigs, and sang about consent and body autonomy. DIY culture proved anyone could make their own media.",
    gameOverTitle: "STUCK AT THE DOOR",
    gameOverText:
      "You hand out flyers for bands who won't share the stage. When women only get supporting roles, the whole scene loses half its voices.",
    background: punkVenue,
    npc: NPC.venueOwner,
  },
  {
    id: "2.3",
    act: 2,
    stage: "ADULTHOOD",
    age: 30,
    year: "1999",
    place: "Intersectional Summit",
    system: "[SYSTEM: 1999 · INTERNATIONAL WOMEN'S SUMMIT]",
    scene:
      "The panel talks about 'women' as if everyone lives the same life. Nobody mentions how race, class and gender pile up together.",
    choices: [
      { key: "A", label: "Stay silent to keep the peace.", bold: false },
      {
        key: "B",
        label: "Introduce Kimberlé Crenshaw's framework of INTERSECTIONALITY.",
        bold: true,
      },
    ],
    clearTitle: "THE CROSSROADS",
    clearText:
      "You explain it like traffic at a crossroads: discrimination can hit from several directions at once. The room goes quiet — then the questions pour in.",
    history:
      "Law professor Kimberlé Crenshaw coined 'intersectionality' in 1989, after courts dismissed Black women's cases because they weren't 'only' about race or 'only' about sex. Today the idea shapes laws, research and activism worldwide.",
    gameOverTitle: "LEFT OUT AGAIN",
    gameOverText:
      "You stay quiet and the summit moves on. Women facing racism, poverty and sexism all at once are left out of the plan — again.",
    background: summit1999,
    npc: NPC.summitPanelist,
  },
  {
    id: "2.4",
    act: 2,
    stage: "MATURITY",
    age: 48,
    year: "2005",
    place: "Glass Ceiling Boardroom",
    system: "[SYSTEM: 2005 · GLASS TOWER BOARDROOM]",
    scene:
      "You have the best results on the team. The promotion goes to a less-qualified man the boss 'gets along with'.",
    choices: [
      {
        key: "A",
        label: "Present an audited performance report and demand a structural pay-equity audit.",
        bold: true,
      },
      { key: "B", label: "Accept middle management quietly.", bold: false },
    ],
    clearTitle: "GLASS CEILING: CRACKED",
    clearText:
      "The numbers don't lie. The audit finds pay gaps across the whole company — and the board has to fix them for everyone.",
    history:
      "Lilly Ledbetter discovered she had been paid less than male managers for nearly 20 years. Her fight led to the Lilly Ledbetter Fair Pay Act (2009). In 2018 Iceland became the first country to make companies prove they pay equally.",
    gameOverTitle: "CEILING HOLDS",
    gameOverText:
      "You stay put. The gap stays too — and grows every year in pay, pension and power. Unfair systems keep running until someone audits them.",
    background: boardroom,
    npc: NPC.corporateCeo,
    tint: "hue-rotate(200deg) saturate(0.85)",
  },

  // ---------------- ACT III ----------------
  {
    id: "3.1",
    act: 3,
    stage: "CHILDHOOD",
    age: 10,
    year: "2012",
    place: "School Coding Club",
    system: "[SYSTEM: 2012 · SCHOOL CODING CLUB]",
    scene:
      "The teacher splits the room: boys get the coding challenge, girls get to 'pick the background colours'.",
    choices: [
      {
        key: "A",
        label: "Write a Python automation script that proves your programming skills.",
        bold: true,
      },
      { key: "B", label: "Stick to choosing background colours.", bold: false },
    ],
    clearTitle: "HELLO, WORLD!",
    clearText:
      "Your script sorts the whole club's homework in seconds. The teacher reshuffles the teams — coding is for everyone.",
    history:
      "The first computer program was written by Ada Lovelace in the 1840s, and Grace Hopper helped create early programming languages. In 2012 Reshma Saujani founded Girls Who Code to close the gender gap in tech.",
    gameOverTitle: "SYNTAX ERROR",
    gameOverText:
      "You pick the colours while others learn to code. Small moments like this add up — women are still far fewer in tech jobs today.",
    background: computerLab,
    npc: NPC.codingTeacher,
    tint: "hue-rotate(70deg)",
  },
  {
    id: "3.2",
    act: 3,
    stage: "YOUTH",
    age: 22,
    year: "2017",
    place: "Viral Campus Movement",
    system: "[SYSTEM: 2017 · UNIVERSITY CAMPUS]",
    scene:
      "Students report harassment on campus. The administration wants it hushed up — and slides a non-disclosure agreement across the table.",
    choices: [
      { key: "A", label: "Sign the non-disclosure agreement.", bold: false },
      {
        key: "B",
        label: "Launch a global hashtag campaign (#MeToo) and organise walkouts.",
        bold: true,
      },
    ],
    clearTitle: "#METOO GOES GLOBAL",
    clearText:
      "Your post is shared thousands of times. Students walk out together, and the university is forced to change its rules.",
    history:
      "Activist Tarana Burke started 'Me Too' in 2006. In October 2017 the hashtag spread to millions of posts in over 85 countries. In 2018 about 20,000 Google employees walked out over how harassment claims were handled.",
    gameOverTitle: "SILENCE SIGNED",
    gameOverText:
      "The agreement keeps the story secret — and keeps the problem alive. Breaking the silence helps survivors know they are not alone.",
    background: campus,
    npc: NPC.universityDean,
    tint: "hue-rotate(-45deg) saturate(1.2)",
  },
  {
    id: "3.3",
    act: 3,
    stage: "ADULTHOOD",
    age: 30,
    year: "2024",
    place: "AI Bias Audit",
    system: "[SYSTEM: 2024 · AI HIRING LAB]",
    scene:
      "Your team's AI hiring tool is ready to launch — but it scores CVs lower when they mention a women's college.",
    choices: [
      { key: "A", label: "Ship the biased code to meet the deadline.", bold: false },
      {
        key: "B",
        label: "Halt deployment and retrain the dataset for algorithmic fairness.",
        bold: true,
      },
    ],
    clearTitle: "BUG REPORT: BIAS FIXED",
    clearText:
      "You stop the launch, audit the training data and retest. The fixed model judges skills — not gender.",
    history:
      "In 2018 it was reported that an experimental hiring AI at a major tech company had taught itself to downgrade CVs containing the word 'women's'. The same year, Joy Buolamwini's 'Gender Shades' study showed face recognition misread darker-skinned women far more often than lighter-skinned men.",
    gameOverTitle: "BIAS DEPLOYED",
    gameOverText:
      "The tool ships and thousands of qualified women are quietly filtered out. AI learns from old data — and old data carries old prejudice.",
    background: aiLab,
    npc: NPC.techLead,
    tint: "hue-rotate(150deg) saturate(1.3)",
  },
  {
    id: "3.4",
    act: 3,
    stage: "MATURITY",
    age: 40,
    year: "2026",
    place: "Global Digital Summit",
    system: "[SYSTEM: 2026 · GLOBAL DIGITAL SUMMIT]",
    scene:
      "The keynote speaker beams: 'Thanks to technology, gender bias is completely solved!' The audience applauds.",
    choices: [
      {
        key: "A",
        label: "Take the main stage and present a framework for digital rights and Ecofeminism.",
        bold: true,
      },
      { key: "B", label: "Nod along complacently.", bold: false },
    ],
    clearTitle: "SIMULATION BROKEN!",
    clearText:
      "You show the data: online harassment, the gender gap in internet access, and climate change hitting women hardest. The applause turns into a pledge.",
    history:
      "The UN's ITU estimated that in 2023 about 244 million more men than women used the internet. The word 'ecofeminism' was coined by Françoise d'Eaubonne in 1974, and Wangari Maathai's Green Belt Movement planted tens of millions of trees — winning her the 2004 Nobel Peace Prize.",
    gameOverTitle: "COMPLACENCY LOOP",
    gameOverText:
      "Everyone claps and moves on. When people believe a problem is solved, they stop fixing it. Equality needs updates, just like technology.",
    background: summitStage,
    npc: NPC.keynoteSpeaker,
  },
];

export const LEVELS_PER_ACT = 4;

export function getAct(n: ActNumber): Act {
  return ACTS[n - 1] ?? ACTS[0]!;
}
