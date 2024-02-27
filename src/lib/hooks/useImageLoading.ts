import { useState, useEffect, useRef } from "react";

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

const useImage = (src: string): string => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    preloadImage(src)
      .then(() => setStatus("loaded"))
      .catch(() => setStatus("error"));
  }, [src]);

  if (status === "loading") {
    throw preloadImage(src);
  }
  if (status === "error") {
    throw new Error("Image loading failed");
  }
  return src;
};

export default useImage;
