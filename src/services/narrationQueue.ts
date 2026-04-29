const KEY = "bsa:narrationQueue:v1";

export function queueNarration(text: string): void {
  try {
    if (!text.trim()) return;
    sessionStorage.setItem(KEY, text);
  } catch {
    // ignore
  }
}

export function consumeQueuedNarration(): string | null {
  try {
    const text = sessionStorage.getItem(KEY);
    if (!text) return null;
    sessionStorage.removeItem(KEY);
    return text;
  } catch {
    return null;
  }
}

