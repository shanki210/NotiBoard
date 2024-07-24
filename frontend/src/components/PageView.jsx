import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PomodoroTimerWidget from "./PomodoroTimerWidget";
import ClockWidget from "./Clock";
import GoogleSlidesWidget from "./GoogleSlidesWidget";
import Spotify from "./Spotify";
import GoogleMeetWidget from "./GoogleMeetWidget";
import PollWidget from "./PollWidget";
import GoogleFormWidget from "./GoogleFormWidget";
import ChatBot from "./ChatBot";
import GoogleCalenderWidget from "./GoogleCalenderWidget";
import "../App.css";


export default function PageView({ darkMode, toggleDarkMode }) {
  return (
    <div className={` min-h-screen min-w-screen ${
        darkMode ? "bg-dark-mode" : "bg-light-mode"
      } transition-colors duration-500`}>
       <div
      className={`min-h-screen flex flex-col`}
      style={{ margin: "0px 100px" }}
    >
      <header className="px-6 py-4 flex justify-between items-center">
        <div>
        <h1
              className={`text-4xl font-bold text-card-foreground ${
                darkMode ? "text-white" : "text-sky-500"
              } candy-text transition-colors duration-500`}
            >
              NotiBoard
            </h1>
        </div>
        <div onClick={toggleDarkMode} className="cursor-pointer">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </div>
      </header>
      <div
        className={`flex-1 grid grid-cols-[45%_55%] gap-8 p-6 ${
          darkMode ? "dark:bg-[#1a1a1a] dark:text-card-foreground" : ""
        }`}
      >
        <div className="flex flex-col gap-6 relative">
          <div className="hover:shadow-lg transition-shadow duration-300">
            <PomodoroTimerWidget />
          </div>

          <div
            className="hover:scale-105 transition-shadow duration-300"
            style={{ minHeight: "250px", maxHeight: "250px" }}
          >
            <ChatBot />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div
              className="hover:scale-105 transition-shadow duration-300 "
              style={{ minHeight: "310px", maxHeight: "310px" }}
            >
              <Spotify />
            </div>
            <div
              className="hover:scale-105 transition-shadow duration-300 "
              style={{ minHeight: "310px", maxHeight: "310px" }}
            >
              <GoogleCalenderWidget />
            </div>

            <div className="hover:scale-105 transition-shadow duration-300">
              <GoogleMeetWidget />
            </div>
            <div className="bg-card rounded-lg flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground hover:scale-105 transition-shadow duration-300">
              <GoogleFormWidget />
            </div>
          </div>
        </div>
        <div className=" rounded-lg p-6  flex flex-col gap-2">
          <ClockWidget />
          <div className="flex-1 bg-[#ffffff] rounded-lg border border-input overflow-hidden hover:scale-105 transition-shadow duration-50">
            <iframe
              src="https://docs.google.com/presentation/d/1Wb3sqd0u9KVXu1GsBOp6bKTq1g3jdrCTqZMeMWqJAwU/embed?start=true&loop=true&delayms=2000"
              frameBorder="0"
              width="100%"
              height="100%"
              allowFullScreen
              style={{ minHeight: "400px", marginBottom: "1rem" }}
            />
          </div>
          <PollWidget
            question={"What's your favorite lunch spot?"}
            options={["Cafe Downtown", "Long Drive Hotel", "Office Mess"]}
            onVote={[]}
          />
        </div>
      </div>
    </div>
    </div>
   
  );
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-sun"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}
