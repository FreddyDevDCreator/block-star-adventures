// Content lives here as plain TS so it's bundled and tree-shaken at build
// time. Add new lessons by appending to LESSONS.
export interface Scene {
  text: string;
  bubble: string;
  panelEmoji: string;
  bg: string;
}

export interface Challenge {
  id: string;
  title: string;
  goal: string;
  // simple grid sim: rocket starts at (0,0), goal at (2,2). Player builds
  // blocks that emit moves; we check the final position equals goal.
  start: { x: number; y: number };
  goalPos: { x: number; y: number };
  hint: string;
  reward: { coins: number; xp: number; badge?: string };
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  scenes: Scene[];
  challenge: Challenge;
}

export const LESSONS: Lesson[] = [
  {
    id: "rocket-to-the-moon",
    title: "Rocket to the Moon",
    subtitle: "Learn sequence, loops & conditions",
    scenes: [
      {
        text: "Meet Bolt — a brave little rocket dreaming of the Moon.",
        bubble: "Eiii! I have been waiting to fly! Will you help me reach the Moon, my friend?",
        panelEmoji: "🚀",
        bg: "from-sky-200 to-indigo-200",
      },
      {
        text: "To fly, Bolt needs a list of steps — we call this a sequence.",
        bubble: "First we fuel up, then we count down, then we fly! Step by step, one by one!",
        panelEmoji: "📜",
        bg: "from-amber-100 to-orange-200",
      },
      {
        text: "Doing the same step again and again is called a LOOP.",
        bubble: "Move, move, move — a loop saves us plenty of time! Very clever, no?",
        panelEmoji: "🔁",
        bg: "from-emerald-100 to-teal-200",
      },
      {
        text: "Sometimes Bolt must DECIDE which way to go.",
        bubble: "If there is a star, grab it! If not, keep flying. That is what we call a condition!",
        panelEmoji: "❓",
        bg: "from-fuchsia-100 to-pink-200",
      },
      {
        text: "The Moon is near! Now let us build Bolt's path together.",
        bubble: "Drag the blocks, press Run, and watch me go! You can do it — I believe in you!",
        panelEmoji: "🌙",
        bg: "from-indigo-200 to-violet-300",
      },
    ],
    challenge: {
      id: "rocket-1",
      title: "Fly Bolt to the Moon",
      goal: "Reach the moon tile by combining Move and Repeat blocks.",
      start: { x: 0, y: 0 },
      goalPos: { x: 2, y: 2 },
      hint: "Try a Repeat 2 block with Move Right and Move Up snapped inside it.",
      reward: { coins: 25, xp: 50, badge: "First Flight" },
    },
  },
];

export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);
export const firstLesson = () => LESSONS[0];
