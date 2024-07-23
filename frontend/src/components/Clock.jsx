import { useEffect, useState } from "react";

const ClockWidget = () => {
  const [clockTime, setClockTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-right text-3xl font-bold mb-4 dark:text-card-foreground">
      {clockTime}
    </div>
  );
};

export default ClockWidget;
