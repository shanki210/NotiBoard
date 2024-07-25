import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";

const GoogleMeetWidget = () => {
  const [meetUrl, setMeetUrl] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

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
        backgroundImage:
          "url('https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Meet_Backgrounds_hero.width-1300.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "300px",
        maxHeight: "300px",
      }}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
          <Input
            type="text"
            placeholder="Enter Google Meet Code..."
            value={meetUrl}
            onChange={(e) =>
              setMeetUrl(`https://meet.google.com/${e.target.value}`)
            }
            className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="w-full flex justify-center mb-4">
        <Button onClick={handleJoinMeeting} className="text-primary">
          <span style={{ color: "white" }} className="d-flex">
            <VideoIcon
              className="w-5 h-6 text-white"
              style={{ marginRight: "0.5rem" }}
            />
            Join Meet
          </span>
        </Button>
      </div>
      <div className="w-full flex justify-center mb-4">
        <div
          onClick={handleCreateMeeting}
          className="btn btn-danger text-danger"
        >
          <span style={{ color: "white" }}>
            <IoMdAdd style={{ width: "1.5rem", height: "1.5rem" }} />
          </span>
        </div>
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
