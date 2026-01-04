import { useEffect, useState } from "react";

const useCountdown60 = (start = false) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!start) return;

    setTimeLeft(60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return timeLeft;
};

export default useCountdown60;
