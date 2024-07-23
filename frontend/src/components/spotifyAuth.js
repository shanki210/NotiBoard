import axios from 'axios';

const clientId = '64974d62f3134d339c73dad88371b52f';
const redirectUri = 'http://localhost:5173/callback';
const scope = '5a27dd26170b4dcd8e016e82e589c032';

export const getAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
};

export const getAccessToken = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem('spotify_access_token');
  if (!token && hash) {
    const params = new URLSearchParams(hash.substring(1));
    token = params.get('access_token');
    window.location.hash = '';
    window.localStorage.setItem('spotify_access_token', token);
  }
  return token;
};

export const fetchSpotifyData = async (endpoint, token) => {
  const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
