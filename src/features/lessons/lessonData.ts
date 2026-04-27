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
        text: "Meet Bolt — a brave little rocket stuck on Earth.",
        bubble: "Hi! I dream of touching the Moon. Will you help me?",
        panelEmoji: "🚀",
        bg: "from-sky-200 to-indigo-200",
      },
      {
        text: "To fly, Bolt needs a list of steps — that's called a sequence.",
        bubble: "First we fuel up, then we count down, then we GO!",
        panelEmoji: "📜",
        bg: "from-amber-100 to-orange-200",
      },
      {
        text: "Repeating the same step is called a LOOP. Smart, right?",
        bubble: "Move, move, move… loops save us so much time!",
        panelEmoji: "🔁",
        bg: "from-emerald-100 to-teal-200",
      },
      {
        text: "Sometimes Bolt must DECIDE: turn left or boost up?",
        bubble: "If there's a star, grab it! That's a condition.",
        panelEmoji: "❓",
        bg: "from-fuchsia-100 to-pink-200",
      },
      {
        text: "Now the Moon is in sight! Let's code Bolt's path.",
        bubble: "Drag the blocks, press Run, and watch me fly!",
        panelEmoji: "🌙",
        bg: "from-indigo-200 to-violet-300",
      },
    ],
    challenge: {
      id: "rocket-1",
      title: "Fly Bolt to the Moon",
      goal: "Reach the moon tile by combining MOVE and REPEAT blocks.",
      start: { x: 0, y: 0 },
      goalPos: { x: 2, y: 2 },
      hint: "Try a Repeat 2 with Move Right and Move Up inside.",
      reward: { coins: 25, xp: 50, badge: "First Flight" },
    },
  },
];

export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);
export const firstLesson = () => LESSONS[0];
