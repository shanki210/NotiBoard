import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlayback from "./SpotifyPlayback";

const Spotify = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:4000/auth/token");
      const json = await response.json();
      console.log(json);
      setToken(json.access_token);
    }

    getToken();
  }, []);
  return (
    <>{token === "" ? <SpotifyLogin /> : <SpotifyPlayback token={token} />}</>
  );
  // <Card className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground">
  //   <div className="w-full flex justify-between items-center mb-4">
  //     <div className="relative w-full">
  //       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //         <SearchIcon className="w-5 h-5 text-muted-foreground" />
  //       </div>
  //       <Input
  //         type="search"
  //         placeholder="Search Spotify..."
  //         className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  //       />
  //     </div>
  //     <Button variant="ghost" size="icon" className="text-primary">
  //       <PauseIcon className="w-6 h-6" />
  //     </Button>
  //   </div>
  //   <div className="w-full flex justify-center">
  //     <img
  //       src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_640.jpg"
  //       alt="Album Cover"
  //       width={200}
  //       height={200}
  //       className="rounded-lg shadow-lg"
  //     />
  //   </div>
  //   <div className="mt-4 text-center">
  //     <div className="text-2xl font-bold">Song Title</div>
  //     <div className="text-muted-foreground">Artist Name</div>
  //   </div>
  // </Card>
};

export default Spotify;

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
