import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import GoogleCalenderSchedule from "./GoogleCalendarSchedule";

const GoogleCalenderWidget = () => {
  const [token, setToken] = useState(""); // State to store token

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/auth/google/token"
        );
        console.log(response.data);
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Failed to fetch token", error);
      }
    };

    fetchToken();
  }, []);

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
        <div className="text-2xl font-bold mb-2 flex">
          <FaPencilAlt
            style={{ width: "2rem", height: "2rem", marginRight: "0.25rem" }}
          />{" "}
          Your Schedule
        </div>
        {token === "" ? (
          <a
            className="btn btn-success"
            href="http://localhost:4000/auth/google"
          >
            Login to Google Calendar
          </a>
        ) : (
          <GoogleCalenderSchedule />
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
