import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuthUrl, getAccessToken, fetchSpotifyData } from './spotifyAuth';

const Spotify = () => {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [track, setTrack] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setToken(token);
      fetchCurrentlyPlaying(token);
    }
  }, []);

  const handleSpotifyClick = () => {
    const token = getAccessToken();
    if (!token) {
      window.location = getAuthUrl();
    } else {
      setToken(token);
      fetchCurrentlyPlaying(token);
    }
  };

  const fetchCurrentlyPlaying = async (token) => {
    const data = await fetchSpotifyData('me/player/currently-playing', token);
    setCurrentlyPlaying(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (token && searchQuery) {
      const data = await fetchSpotifyData(`search?q=${searchQuery}&type=track&limit=1`, token);
      if (data.tracks.items.length > 0) {
        setTrack(data.tracks.items[0]);
      }
    }
  };

  return (
    <Card
      className="bg-card rounded-lg p-6 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground"
      onClick={handleSpotifyClick}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search Spotify..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="text-primary" onClick={handleSearch}>
          <SearchIcon className="w-6 h-6" />
        </Button>
      </div>
      {currentlyPlaying && (
        <div className="w-full flex justify-center">
          <img
            src={currentlyPlaying.item.album.images[0].url}
            alt="Album Cover"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
      {currentlyPlaying && (
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">{currentlyPlaying.item.name}</div>
          <div className="text-muted-foreground">{currentlyPlaying.item.artists.map(artist => artist.name).join(', ')}</div>
        </div>
      )}
      {track && (
        <div className="w-full flex justify-center">
          <img
            src={track.album.images[0].url}
            alt="Album Cover"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
      {track && (
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">{track.name}</div>
          <div className="text-muted-foreground">{track.artists.map(artist => artist.name).join(', ')}</div>
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