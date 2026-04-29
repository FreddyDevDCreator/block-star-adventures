import { A as API_BASE_URL } from "./router-yaET50bD.mjs";
import "../_libs/react.mjs";
import "../_libs/idb.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
let currentAudio = null;
function stopRemoteAudio() {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
  } catch {
  }
  currentAudio = null;
}
function base64ToBlob(base64, mime = "audio/mpeg") {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}
async function narrateRemote(text) {
  const path = "/tts/speak";
  const endpoint = `${API_BASE_URL}${path}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      // Backend chooses a kid-friendly African English female voice.
      // We keep this simple so the backend can evolve without frontend changes.
      voice: "african_english_female"
    })
  });
  if (!res.ok) {
    throw new Error(`TTS error: ${res.status}`);
  }
  const data = await res.json();
  stopRemoteAudio();
  const audio = "audioUrl" in data ? new Audio(data.audioUrl) : new Audio(URL.createObjectURL(base64ToBlob(data.audioBase64, data.mime)));
  currentAudio = audio;
  audio.preload = "auto";
  audio.volume = 1;
  try {
    await audio.play();
  } catch (e) {
    throw e;
  }
}
function stopRemoteNarration() {
  stopRemoteAudio();
}
export {
  narrateRemote,
  stopRemoteNarration
};
