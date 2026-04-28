import { apiFetch } from "./api";

export type LessonScene = {
  id: string;
  speaker: string;
  text: string;
};

export type LessonChallenge = {
  id: string;
  type?: "grid" | "quiz";
  title: string;
  concept: string;
  prompt: string;
  goal: string;
  examples: unknown[];
  hints: string[];
  hint?: string;
  scenes?: LessonScene[];
  quiz?: {
    kind: "number" | "text" | "multipleChoice";
    question: string;
    answer?: number;
    acceptableAnswers?: string[];
    choices?: Array<{ id: string; label: string }>;
    correctChoiceId?: string;
    explanation?: string;
  };
  grid?: { width: number; height: number; blocked: Array<{ x: number; y: number }> };
  start?: { x: number; y: number; dir?: string };
  goalPos?: { x: number; y: number };
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  ageGroup: "kid" | "teen";
  challenges: LessonChallenge[];
};

export function getPrimaryChallenge(lesson: Lesson): LessonChallenge | null {
  return lesson.challenges[0] ?? null;
}

export function isGridChallenge(c: LessonChallenge): boolean {
  return (c.type ?? "grid") === "grid";
}

export function isQuizChallenge(c: LessonChallenge): boolean {
  return (c.type ?? "grid") === "quiz";
}

export async function fetchLessons(): Promise<Lesson[]> {
  return await apiFetch<Lesson[]>("/lessons");
}

export async function fetchLesson(lessonId: string): Promise<Lesson> {
  return await apiFetch<Lesson>(`/lessons/${encodeURIComponent(lessonId)}`);
}

