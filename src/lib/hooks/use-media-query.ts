"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const id = requestAnimationFrame(() => {
      setMatches(media.matches);
    });

    media.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(id);
      media.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
