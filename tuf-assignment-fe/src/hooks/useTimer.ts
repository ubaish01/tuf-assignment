import { useState, useEffect } from "react";
import useBanner from "./useBanner";

const useTimer = () => {
  const { banner } = useBanner();
  const [time, setTime] = useState<number>(banner?.timer || 0);
  const [timer, setTimer] = useState("00:00");
  const [active, setActive] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    // Pad minutes and seconds to always display two digits
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = secs.toString().padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setActive(time > 0 && Boolean(banner?.active));
    setTimer(formatTime(time));

    return () => clearInterval(intervalId);
  }, [time]);

  return { timer, active };
};

export default useTimer;
