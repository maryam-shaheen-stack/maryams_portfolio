import { useSyncExternalStore } from "react";
import { getHeroProgress, subscribeHeroProgress } from "../lib/scrollStore";

/** React hook wrapper around the hero scroll-progress store (0 → 1). */
export function useHeroProgress() {
  return useSyncExternalStore(subscribeHeroProgress, getHeroProgress, getHeroProgress);
}
