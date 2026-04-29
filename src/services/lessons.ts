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

export type NextLevel = { lessonId: string; challengeId: string };

export function getNextLevel(
  lessons: Lesson[],
  lessonId: string,
  challengeId: string,
): NextLevel | null {
  const li = lessons.findIndex((l) => l.id === lessonId);
  if (li < 0) return null;
  const lesson = lessons[li];
  const ci = (lesson.challenges ?? []).findIndex((c) => c.id === challengeId);
  if (ci < 0) return null;

  const nextInLesson = lesson.challenges?.[ci + 1];
  if (nextInLesson) return { lessonId: lesson.id, challengeId: nextInLesson.id };

  const nextLesson = lessons[li + 1];
  const nextChallenge = nextLesson?.challenges?.[0];
  if (nextLesson && nextChallenge) return { lessonId: nextLesson.id, challengeId: nextChallenge.id };

  return null;
}

