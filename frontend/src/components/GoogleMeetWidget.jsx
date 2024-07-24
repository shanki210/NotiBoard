import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GoogleMeetWidget = () => {
  const [meetUrl, setMeetUrl] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch the user's schedule from an API or service
  //   const fetchSchedule = async () => {
  //     try {
  //       // Replace this with actual API call
  //       const response = await fetch("/api/schedule");
  //       const data = await response.json();
  //       setSchedule(data);
  //     } catch (error) {
  //       console.error("Failed to fetch schedule", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSchedule();
  // }, []);

  const handleJoinMeeting = () => {
    if (meetUrl) {
      window.open(meetUrl, "_blank");
    }
  };

  const handleCreateMeeting = () => {
    // Logic to create a new meeting, e.g., open a modal or redirect to a scheduling page
    window.open("https://calendar.google.com/", "_blank"); // Placeholder URL
  };

  return (
    <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <VideoIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Enter Google Meet URL..."
            value={meetUrl}
            onChange={(e) => setMeetUrl(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary"
          onClick={handleJoinMeeting}
        >
          <VideoIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="w-full flex justify-center mb-4">
        <Button onClick={handleCreateMeeting} className="text-primary">
          <span style={{ color: "white" }}> Create Meet</span>
        </Button>
      </div>

      <div className="w-full">
        <div className="text-2xl font-bold mb-2">Your Schedule</div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {schedule.length > 0 ? (
              schedule.map((event) => (
                <li key={event.id} className="mb-2">
                  {event.title} at {event.time}
                </li>
              ))
            ) : (
              <li>No upcoming events</li>
            )}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default GoogleMeetWidget;

function VideoIcon(props) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
