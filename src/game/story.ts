import toyStore from "@/assets/scene-1950s-toy-store-final.png";
import suffrageStreet from "@/assets/scene-1910s-suffrage-street.png";
import lab1950s from "@/assets/scene-1950s-dna-lab.png";
import office1970s from "@/assets/scene-1974-bank-office.png";
import bedroom1980s from "@/assets/scene-1985-living-room.png";
import punkVenue from "@/assets/scene-1993-music-venue.png";
import summit1999 from "@/assets/scene-1999-summit-hall.png";
import boardroom2005 from "@/assets/scene-2005-boardroom.png";
import computerLab from "@/assets/scene-2012-computer-lab.png";
import campus2017 from "@/assets/scene-2017-campus.png";
import aiLab2024 from "@/assets/scene-2024-ai-lab.png";
import summit2026 from "@/assets/scene-2026-tech-summit.png";
import toyShopkeeper from "@/assets/npc-toy-shopkeeper.png";
import activist from "@/assets/npc-activist.png";
import labSupervisor from "@/assets/npc-lab-supervisor.png";
import bankManager from "@/assets/npc-bank-manager.png";
import tvAnnouncer from "@/assets/npc-tv-announcer.png";
import venueOwner from "@/assets/npc-venue-owner.png";
import summitPanelist from "@/assets/npc-summit-panelist.png";
import corporateCeo from "@/assets/npc-corporate-ceo.png";
import codingTeacher from "@/assets/npc-coding-teacher.png";
import universityDean from "@/assets/npc-university-dean.png";
import techLead from "@/assets/npc-tech-lead.png";
import keynoteSpeaker from "@/assets/npc-keynote-speaker.png";

export type ChoiceKey = "A" | "B";
export type LifeStage = "CHILDHOOD" | "YOUTH" | "ADULTHOOD" | "MATURITY";
export type ActNumber = 1 | 2 | 3;

export interface Choice {
  key: ChoiceKey;
  label: string;
  /** The bold, progressive option clears the level; the other triggers GAME OVER. */
  bold: boolean;
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
  npcName: string;
  npcSprite: string;
  npcDialogue: [string, string];
  avatarResponse: string;
  /** Optional CSS filter so reused scenes feel different. */
  tint?: string;
}

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
    npcName: "1950s SHOPKEEPER",
    npcSprite: toyShopkeeper,
    npcDialogue: [
      "The kitchen set is right over here, sweetheart.",
      "Those rockets and chemistry kits are really meant for the boys.",
    ],
    avatarResponse: "My curiosity isn't limited by a toy aisle. I deserve to choose what I want to learn.",
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
    npcName: "1910s ACTIVIST",
    npcSprite: activist,
    npcDialogue: [
      "They're trying to drown us out before we reach the hall.",
      "Stand with us: every woman deserves a voice and a vote.",
    ],
    avatarResponse: "No one should be pushed out of this movement. I'll stand here and make my voice count.",
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
    npcName: "LAB SUPERVISOR",
    npcSprite: labSupervisor,
    npcDialogue: [
      "This DNA image is remarkable. I'll present it at the next meeting.",
      "It will be simpler if the paper goes out under my name.",
    ],
    avatarResponse: "The evidence is mine, and so is the work. My contribution belongs on the record.",
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
    npcName: "BANK MANAGER",
    npcSprite: bankManager,
    npcDialogue: [
      "Your business plan looks promising.",
      "But bank policy says a husband must sign before we approve your credit.",
    ],
    avatarResponse: "A capable woman should control her own finances. This unfair rule has to change for everyone.",
  },

  // ---------------- ACT II ----------------
  {
    id: "2.1",
    act: 2,
    stage: "CHILDHOOD",
    age: 8,
    year: "1980s",
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
    background: bedroom1980s,
    npcName: "TV ANNOUNCER",
    npcSprite: tvAnnouncer,
    npcDialogue: [
      "Coming up: another princess waits for a prince to rescue her.",
      "That's the only kind of hero our viewers expect, right?",
    ],
    avatarResponse: "Girls can be the heroes of their own stories. Let's put a clever, fearless princess on screen.",
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
    npcName: "VENUE OWNER",
    npcSprite: venueOwner,
    npcDialogue: [
      "The main stage is booked for the guys tonight.",
      "You can hand out flyers by the door if you want to be involved.",
    ],
    avatarResponse: "We don't need permission to make music. We'll build our own stage and bring everyone with us.",
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
    npcName: "SUMMIT PANELIST",
    npcSprite: summitPanelist,
    npcDialogue: [
      "Our panel is discussing what women experience.",
      "We haven't made room to talk about how race and class change that experience.",
    ],
    avatarResponse: "We can't understand gender inequality in isolation. Race, class, and other barriers intersect.",
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
    background: boardroom2005,
    npcName: "CORPORATE CEO",
    npcSprite: corporateCeo,
    npcDialogue: [
      "Your performance is excellent, but the promotion is going to someone else.",
      "He feels like a better fit for the leadership team.",
    ],
    avatarResponse: "Let's measure the work and the pay fairly. An audit can expose the rules holding people back.",
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
    npcName: "CODING TEACHER",
    npcSprite: codingTeacher,
    npcDialogue: [
      "The boys can take the coding challenge today.",
      "Girls, could you choose the background colours for the project?",
    ],
    avatarResponse: "I want to solve the coding challenge too. Programming belongs to everyone in this room.",
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
    background: campus2017,
    npcName: "UNIVERSITY DEAN",
    npcSprite: universityDean,
    npcDialogue: [
      "Students have reported harassment, and we need to protect the university's reputation.",
      "Please sign this agreement and keep the matter quiet.",
    ],
    avatarResponse: "People deserve safety and support, not silence. We'll speak together and demand accountability.",
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
    background: aiLab2024,
    npcName: "TECH LEAD",
    npcSprite: techLead,
    npcDialogue: [
      "The hiring model is ready, but its scores are lower for women's colleges.",
      "We could launch now and investigate the results later.",
    ],
    avatarResponse: "We can't deploy a tool that discriminates. Stop the launch, audit the data, and test again.",
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
    background: summit2026,
    npcName: "KEYNOTE SPEAKER",
    npcSprite: keynoteSpeaker,
    npcDialogue: [
      "Technology has solved gender bias once and for all!",
      "Surely we can celebrate now and move on?",
    ],
    avatarResponse: "Equality isn't solved while people face digital exclusion, online harm, and unequal climate impacts.",
  },
];

export const LEVELS_PER_ACT = 4;

export function getAct(n: ActNumber): Act {
  return ACTS[n - 1] ?? ACTS[0]!;
}
