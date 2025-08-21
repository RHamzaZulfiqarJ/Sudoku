"use client";

import { useEffect, useRef } from "react";

const VideoCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx) return;

    const render = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
    };

    video.addEventListener("play", () => {
      render();
    });

    video.play().catch((err) => {
      console.error("Autoplay failed:", err);
    });

    return () => {
      video.pause();
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src="/Background.mp4"
        muted
        loop
        playsInline
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoCanvas;