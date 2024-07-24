import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GoogleCalenderWidget = () => {
  const [meetUrl, setMeetUrl] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/schedule");
        setSchedule(response.data);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleJoinMeeting = () => {
    if (meetUrl) {
      window.open(meetUrl, "_blank");
    }
  };

  const handleCreateMeeting = () => {
    window.open("https://calendar.google.com/", "_blank");
  };

  return (
    <Card
      className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground"
      style={{
        minHeight: "300px",
        maxHeight: "300px",
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-school-season-back-to-school-notice-school-schedule-image_31902.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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

export default GoogleCalenderWidget;

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
