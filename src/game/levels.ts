import level1 from "@/assets/level-1.jpg";
import level2 from "@/assets/level-2.jpg";
import level3 from "@/assets/level-3.jpg";
import level4 from "@/assets/level-4.jpg";

export type ChoiceKey = "A" | "B" | "C";

export interface Choice {
  key: ChoiceKey;
  label: string;
  outcomeTitle: string;
  outcome: string;
}

export interface Level {
  number: number;
  wave: string;
  era: string;
  theme: string;
  system: string;
  prompt: string;
  goal: string;
  context: string;
  choices: Choice[];
  unlockTitle: string;
  unlock: string;
  indiaFact: string;
  background: string;
}

export const LEVELS: Level[] = [
  {
    number: 1,
    wave: "The First Wave",
    era: "1890s – 1920s",
    theme: "Legal Rights & Suffrage",
    system: "[SYSTEM: 1910 LONDON / NEW YORK]",
    prompt: "You are legally bound as a dependent. Your campaign group debates next steps.",
    goal: "Win basic legal recognition, political rights and equality under the law.",
    context:
      "Under 'coverture', a married woman's legal identity was absorbed into her husband's. She could not vote, often could not own property in her own name, sign contracts, or claim custody of her children.",
    choices: [
      {
        key: "A",
        label: "Focus only on SUFFRAGE — the vote unlocks everything else.",
        outcomeTitle: "VOTES FOR WOMEN!",
        outcome:
          "Marches, petitions and hunger strikes pay off. New Zealand gives women the vote in 1893, Britain (partly) in 1918, and the USA's 19th Amendment passes in 1920. But many leaders sidelined Black, immigrant and working-class women to win support — the vote did not arrive for everyone at once.",
      },
      {
        key: "B",
        label: "Prioritise PROPERTY and CHILD CUSTODY laws.",
        outcomeTitle: "A LEGAL PERSON AT LAST",
        outcome:
          "You push the Married Women's Property Acts (UK, 1870 & 1882) and custody reforms. Women can now keep their own wages, own homes and claim their children. Without the vote, though, lawmakers can still roll these rights back.",
      },
      {
        key: "C",
        label: "Join working-class activists and women of colour to fight INTERSECTING battles.",
        outcomeTitle: "AIN'T I A WOMAN?",
        outcome:
          "You stand with Sojourner Truth ('Ain't I a Woman?', 1851) and Ida B. Wells, who was told to march at the back of the 1913 suffrage parade — and refused. The road is harder but wider: rights won for some women are not won for all. Many Black women in the US South could not vote freely until 1965.",
      },
    ],
    unlockTitle: "RIGHT TO VOTE UNLOCKED",
    unlock:
      "New Zealand (1893) and the USA's 19th Amendment (1920) — while acknowledging the mainstream movement's early racial and class exclusions.",
    indiaFact:
      "In 1921 Madras Presidency became one of the first places in India to let (some) women vote. Universal adult suffrage arrived with the Constitution in 1950.",
    background: level1,
  },
  {
    number: 2,
    wave: "The Second Wave",
    era: "1960s – 1980s",
    theme: "Workplace & Reproductive Rights",
    system: "[SYSTEM: 1970 CORPORATE / SUBURBIA]",
    prompt: "You face workplace discrimination and lack financial autonomy.",
    goal: "Challenge systemic sexism and cultural expectations: 'The Personal is Political'.",
    context:
      "Women hit glass ceilings, were paid less for the same work, could be fired for being pregnant, and in many places needed a husband's signature to get bank credit.",
    choices: [
      {
        key: "A",
        label: "Campaign for EQUAL PAY, anti-discrimination laws and independent bank credit.",
        outcomeTitle: "MONEY IN HER OWN NAME",
        outcome:
          "Your pressure helps pass the US Equal Pay Act (1963), Title VII of the Civil Rights Act (1964) and the Equal Credit Opportunity Act (1974). For the first time, millions of women can get a credit card in their own name.",
      },
      {
        key: "B",
        label: "Build CRISIS CENTRES, women's shelters and anti-violence hotlines.",
        outcomeTitle: "SAFE HAVENS OPEN",
        outcome:
          "You help open early women's refuges (Chiswick, London, 1971) and rape crisis centres (Washington DC, 1972). Violence at home — once dismissed as a 'private matter' — becomes a public issue that governments must answer for.",
      },
      {
        key: "C",
        label: "Form CONSCIOUSNESS-RAISING circles to challenge domestic roles.",
        outcomeTitle: "THE PERSONAL IS POLITICAL",
        outcome:
          "In living rooms everywhere, women share stories and realise their 'private' struggles — housework, marriage, body image — are shared and political. Carol Hanisch's 1969 essay gives the movement its famous slogan.",
      },
    ],
    unlockTitle: "LANDMARK LAWS UNLOCKED",
    unlock:
      "Roe v. Wade (1973) recognises abortion rights in the USA (overturned in 2022 — rights can be lost!). Black, Chicana and lesbian feminists such as the Combahee River Collective (1977) spark independent multi-cultural organising.",
    indiaFact:
      "India's 'Towards Equality' report (1974) exposed deep gender gaps, and the Equal Remuneration Act followed in 1976.",
    background: level2,
  },
  {
    number: 3,
    wave: "The Third Wave",
    era: "1990s – 2000s",
    theme: "Intersectionality & Individual Choice",
    system: "[SYSTEM: 1995 GLOBAL / UNDERGROUND SCENE]",
    prompt: "Redefining what feminism looks and feels like.",
    goal: "Dismantle rigid definitions of womanhood and embrace diverse identities.",
    context:
      "Earlier gains often treated 'woman' as one story — usually white, middle-class and straight. A new generation asks: whose voices are missing? Race, class, sexuality and disability all matter.",
    choices: [
      {
        key: "A",
        label: "Apply Kimberlé Crenshaw's framework of INTERSECTIONALITY (1989).",
        outcomeTitle: "THE CROSSROADS",
        outcome:
          "Crenshaw showed that courts dismissed Black women's cases because they weren't 'only' racism or 'only' sexism. Like traffic at a crossroads, discrimination can come from many directions at once — and now there's a word for it.",
      },
      {
        key: "B",
        label: "Join RIOT GRRRL punk to reclaim bodily autonomy and challenge media tropes.",
        outcomeTitle: "GIRLS TO THE FRONT!",
        outcome:
          "Bands like Bikini Kill launch Riot Grrrl (1991). Handmade zines and loud guitars challenge sexist media images. DIY culture proves anyone can make their own media — and their own rules.",
      },
      {
        key: "C",
        label: "Celebrate INDIVIDUAL CHOICE, fashion, and queer & trans inclusion.",
        outcomeTitle: "NO SINGLE BOX",
        outcome:
          "You champion each woman's right to choose how she dresses, works and lives, and fight for queer and trans inclusion. At the UN Beijing Conference (1995), 189 countries declare: 'Women's rights are human rights.'",
      },
    ],
    unlockTitle: "GLOBAL MOVEMENT UNLOCKED",
    unlock: "A diverse, globalised movement that breaks down rigid gender binaries.",
    indiaFact:
      "In 1997 India's Supreme Court issued the Vishaka Guidelines, protecting women from sexual harassment at work.",
    background: level3,
  },
  {
    number: 4,
    wave: "The Fourth Wave",
    era: "2010s – Present",
    theme: "Digital Activism & Tech Justice",
    system: "[SYSTEM: 2026 DIGITAL SPHERE]",
    prompt: "Online networks are booming, but tech systems are replicating old prejudices.",
    goal: "Use global connectivity and fight modern tech and algorithmic bias.",
    context:
      "Smartphones put a megaphone in every pocket. But the algorithms behind hiring, policing and social feeds learn from old data — and old data carries old prejudice.",
    choices: [
      {
        key: "A",
        label: "Launch VIRAL DIGITAL MOVEMENTS like #MeToo to break the silence.",
        outcomeTitle: "#METOO GOES GLOBAL",
        outcome:
          "Tarana Burke started 'Me Too' in 2006; in 2017 the hashtag exploded into millions of posts across 85+ countries. Powerful abusers face consequences. Hashtags open doors — offline action keeps them open.",
      },
      {
        key: "B",
        label: "Audit and expose ALGORITHMIC BIAS in AI hiring tools and facial recognition.",
        outcomeTitle: "BUG REPORT: BIAS FOUND",
        outcome:
          "Joy Buolamwini's 'Gender Shades' study (2018) found facial recognition misread darker-skinned women up to ~35% of the time vs under 1% for lighter-skinned men. An experimental AI hiring tool was scrapped after it downgraded CVs with the word 'women's'. You demand audits, fairer data and diverse coders.",
      },
      {
        key: "C",
        label: "Fight for CLIMATE JUSTICE (Ecofeminism) and global body autonomy.",
        outcomeTitle: "GREEN POWER",
        outcome:
          "Climate change hits women and girls hardest. You follow Wangari Maathai's Green Belt Movement (tens of millions of trees planted) and connect care for the planet with every person's right to control their own body and future.",
      },
    ],
    unlockTitle: "VICTORY!",
    unlock:
      "You complete the arcade run — proving that the fight for equality evolves alongside human technology.",
    indiaFact:
      "In 1973 the women of the Chipko movement in the Himalayas hugged trees to stop them being cut — an early icon of ecofeminism. #MeToo India sparked a national conversation in 2018.",
    background: level4,
  },
];
