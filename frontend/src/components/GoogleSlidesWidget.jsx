import React from "react";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function GoogleSlidesWidget() {
  return (
    <>
      {/* <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SlidesIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="View Google Slides..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <SlidesIcon className="w-6 h-6" />
        </Button>
      </div> */}
      <div className="w-full flex justify-center">
        <iframe
          src="https://docs.google.com/presentation/d/1Wb3sqd0u9KVXu1GsBOp6bKTq1g3jdrCTqZMeMWqJAwU/embed?start=true&loop=true&delayms=2000"
          width="400"
          height="300"
          allowFullScreen="true"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
      {/* <div className="mt-4 text-center">
        <div className="text-2xl font-bold">Google Slides</div>
        <div className="text-muted-foreground">View the presentation</div>
      </div> */}
    </>
  );
}

export default GoogleSlidesWidget;

function SlidesIcon(props) {
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
      <path d="M3 4h18v16H3z" />
      <path d="M3 10h18" />
      <path d="M3 14h18" />
    </svg>
  );
}
