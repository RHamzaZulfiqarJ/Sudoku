"use client";

import { useEffect } from "react";

const Video = () => {
  useEffect(() => {
    // Get the video element and set its source
    const videoElement = document.getElementById("bg-video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = atob("L2JhY2tncm91bmQubXA0"); // "/background.mp4" encoded in Base64
    }
  }, []);

  return (
    <div>
      <video
        id="bg-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        disablePictureInPicture
        muted
        playsInline></video>
    </div>
  );
};

export default Video;
