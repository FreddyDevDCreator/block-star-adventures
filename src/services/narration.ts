import { API_BASE_URL } from "@/services/api";

type RemoteNarrationResponse = { audioBase64: string; mime?: string } | { audioUrl: string };

let currentAudio: HTMLAudioElement | null = null;

function stopRemoteAudio(): void {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
  } catch {
    // ignore
  }
  currentAudio = null;
}

function base64ToBlob(base64: string, mime = "audio/mpeg"): Blob {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}

export async function narrateRemote(text: string): Promise<void> {
  const path = import.meta.env.VITE_TTS_PATH || "/tts/speak";
  const endpoint = `${API_BASE_URL}${path}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      // Backend chooses a kid-friendly African English female voice.
      // We keep this simple so the backend can evolve without frontend changes.
      voice: "african_english_female",
    }),
  });

  if (!res.ok) {
    throw new Error(`TTS error: ${res.status}`);
  }

  const data = (await res.json()) as RemoteNarrationResponse;

  stopRemoteAudio();

  const audio =
    "audioUrl" in data
      ? new Audio(data.audioUrl)
      : new Audio(URL.createObjectURL(base64ToBlob(data.audioBase64, data.mime)));

  currentAudio = audio;
  audio.preload = "auto";
  audio.volume = 1;
  // Autoplay restrictions can block audio until a user gesture.
  // Let caller decide how to fall back (audio.ts already does).
  await audio.play();
}

export function stopRemoteNarration(): void {
  stopRemoteAudio();
}
