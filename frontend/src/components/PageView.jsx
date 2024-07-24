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

export default function PageView() {
  return (
    <div
      className="bg-background min-h-screen flex flex-col dark:bg-[#1a1a1a]"
      style={{ margin: "0px 100px" }}
    >
      <header className="bg-muted px-6 py-4 flex justify-between items-center">
        <div />
      </header>
      <div className="flex-1 grid grid-cols-[35%_65%] gap-8 p-6 dark:bg-[#1a1a1a] dark:text-card-foreground">
        <div className="flex flex-col gap-6 relative">
          <PomodoroTimerWidget />
          {/* <GoogleSlidesWidget /> */}
          {/*  <PollWidget
            question={"What's your favorite lunch spot?"}
            options={["Cafe Downtown", "Long Drive Hotel", "Office Mess"]}
            onVote={[]}
          />  */}
          <div className="grid grid-cols-2 gap-6">
            <Spotify />
            <ChatBot />
            <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
              <GoogleMeetWidget />
            </Card>
            <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
              <GoogleFormWidget />
            </Card>
            {/*  <GoogleMeetWidget />
          }  <GoogleFormWidget/>  */}
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 flex flex-col dark:bg-[#2a2a2a] dark:text-card-foreground">
          <ClockWidget></ClockWidget>
          <div className="flex-1 bg-[#ffffff] rounded-lg border border-input overflow-hidden">
            <iframe
              src="https://docs.google.com/presentation/d/1Wb3sqd0u9KVXu1GsBOp6bKTq1g3jdrCTqZMeMWqJAwU/embed?start=true&loop=true&delayms=2000"
              frameBorder="0"
              width="100%"
              height="50%"
              allowFullScreen
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
