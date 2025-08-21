"use client";

import { useEffect, useRef } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx) return;

    video.play();

    const draw = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <video
        ref={videoRef}
        src="/background.mp4"
        muted
        loop
        playsInline
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef} width={1920} height={1080} className="w-full h-full object-cover" />
    </div>
  );
};

export default Video;