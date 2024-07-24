import React, { useState, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { FaPause } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";

function PomodoroTimerWidget() {
  const [timeLeft, setTimeLeft] = useState(1500); // Default to 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(1500); // Default to 25 minutes
  const [shortBreakTime, setShortBreakTime] = useState(300); // Default to 5 minutes
  const [longBreakTime, setLongBreakTime] = useState(900); // Default to 15 minutes
  const [currentMode, setCurrentMode] = useState("work"); // Can be "work", "shortBreak", or "longBreak"
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      alert(
        `Time is up! Time for ${currentMode === "work" ? "break" : "work"}`
      );
      if (currentMode === "work") {
        setCurrentMode("shortBreak"); // or "longBreak" based on your logic
        setTimeLeft(shortBreakTime);
      } else {
        setCurrentMode("work");
        setTimeLeft(customTime);
      }
    }
    return () => clearInterval(timer);
  }, [
    isActive,
    timeLeft,
    currentMode,
    shortBreakTime,
    longBreakTime,
    customTime,
  ]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    if (currentMode === "work") {
      setTimeLeft(customTime);
    } else if (currentMode === "shortBreak") {
      setTimeLeft(shortBreakTime);
    } else if (currentMode === "longBreak") {
      setTimeLeft(longBreakTime);
    }
  };

  const handleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleCustomTimeChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    if (!isNaN(minutes)) {
      setCustomTime(minutes * 60);
    }
  };

  const handleShortBreakChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    if (!isNaN(minutes)) {
      setShortBreakTime(minutes * 60);
    }
  };

  const handleLongBreakChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    if (!isNaN(minutes)) {
      setLongBreakTime(minutes * 60);
    }
  };

  const applySettings = () => {
    if (currentMode === "work") {
      setTimeLeft(customTime);
    } else if (currentMode === "shortBreak") {
      setTimeLeft(shortBreakTime);
    } else if (currentMode === "longBreak") {
      setTimeLeft(longBreakTime);
    }
    setIsSettingsOpen(false);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-[#0077b6] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-[#0077b6] dark:text-card-foreground">
      <div className="text-4xl font-bold text-primary-foreground dark:text-primary-foreground">
        {formatTime(timeLeft)}
      </div>
      <div className="text-primary-foreground text-sm font-medium mt-2 dark:text-primary-foreground">
        {currentMode === "work"
          ? "Pomodoro Timer"
          : currentMode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </div>
      <div>
        <button
          className="text-white hover:bg-green-600 transition-colors duration-300 p-2 rounded-full"
          style={{ height: "2rem", margin: "0.5rem 0.5rem" }}
          onClick={handleStart}
        >
          <CiPlay1 size={24} />
        </button>
        <button
          className="text-white hover:bg-red-600 transition-colors duration-300 p-2 rounded-full"
          style={{ height: "2rem", margin: "0.5rem 0.5rem" }}
          onClick={handleStop}
        >
          <FaPause size={24} />
        </button>
        <button
          className="text-white hover:bg-blue-600 transition-colors duration-300 p-2 rounded-full"
          style={{ height: "2rem", margin: "0.5rem 0.5rem" }}
          onClick={handleReset}
        >
          <LuTimerReset size={24} />
        </button>
        <button
          className="text-white hover:bg-yellow-600 transition-colors duration-300 p-2 rounded-full"
          style={{ height: "2rem", margin: "0.5rem 0.5rem" }}
          onClick={handleSettings}
        >
          <IoSettingsSharp size={24} />
        </button>
      </div>
      {isSettingsOpen && (
        <div className="settings-modal mt-30 p-4 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Work Timer (minutes):
              <input
                type="range"
                min="1"
                max="60"
                value={Math.floor(customTime / 60)}
                onChange={handleCustomTimeChange}
                className="w-full mt-2 accent-blue-600"
              />
              <span className="block mt-1 text-center">
                {Math.floor(customTime / 60)} minutes
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Short Break (minutes):
              <input
                type="range"
                min="1"
                max="30"
                value={Math.floor(shortBreakTime / 60)}
                onChange={handleShortBreakChange}
                className="w-full mt-2 accent-blue-600"
              />
              <span className="block mt-1 text-center">
                {Math.floor(shortBreakTime / 60)} minutes
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Long Break (minutes):
              <input
                type="range"
                min="1"
                max="60"
                value={Math.floor(longBreakTime / 60)}
                onChange={handleLongBreakChange}
                className="w-full mt-2 accent-blue-600"
              />
              <span className="block mt-1 text-center">
                {Math.floor(longBreakTime / 60)} minutes
              </span>
            </label>
          </div>
          <button
            className="btn btn-primary mt-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={applySettings}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimerWidget;
