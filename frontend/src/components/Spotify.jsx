import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlayback from "./SpotifyPlayback";

const Spotify = () => {
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:4000/auth/token");
      const json = await response.json();
      console.log(json);
      setToken(json.access_token);
    }

    getToken();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission for search
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      // Fetch search results from Spotify API
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.tracks.items); // Set search results in state
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    }
  };

  return (
    <Card
      className="bg-card rounded-lg p-3 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-10305.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=ais_user')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "300px",
        maxHeight: "300px",
      }}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full">
          <form onSubmit={handleSearchSubmit}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Spotify..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </form>
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <PauseIcon className="w-6 h-6" />
        </Button>
      </div>

      <div>
        {token === "" ? <SpotifyLogin /> : <SpotifyPlayback token={token} />}
      </div>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                {result.name} -{" "}
                {result.artists.map((artist) => artist.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
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
