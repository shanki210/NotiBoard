import { useState, useEffect } from "react";
import axios from "axios";

export default function Component() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: 72,
    description: "Sunny",
    icon: "sun",
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`
        );
        const { temperature, weathercode } = response.data.current_weather;
        const description = getWeatherDescription(weathercode);
        setWeather({
          temperature: Math.round(temperature),
          description,
          icon: getWeatherIcon(weathercode),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (weathercode) => {
    const descriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Light rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Light snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Showers",
      81: "Heavy showers",
      82: "Violent showers",
      85: "Light snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with hail",
      99: "Thunderstorm with heavy hail",
    };
    return descriptions[weathercode] || "Unknown";
  };

  const getWeatherIcon = (weathercode) => {
    const icons = {
      0: "http://openweathermap.org/img/wn/01d.png",
      1: "http://openweathermap.org/img/wn/02d.png",
      2: "http://openweathermap.org/img/wn/03d.png",
      3: "http://openweathermap.org/img/wn/04d.png",
      // Add more mappings here based on the weather codes
    };
    return icons[weathercode] || "http://openweathermap.org/img/wn/01d.png"; // Default icon
  };

  const backgroundImages = {
    "Clear sky": "url('https://example.com/clear-sky.jpg')",
    "Mainly clear": "url('https://example.com/mainly-clear.jpg')",
    "Partly cloudy":
      "url('https://www.shutterstock.com/image-photo/underwater-empty-swimming-pool-background-600nw-1713567430.jpgE')",
    Overcast: "url('https://example.com/overcast.jpg')",
    Fog: "url('https://example.com/fog.jpg')",
    "Rime fog": "url('https://example.com/rime-fog.jpg')",
    "Light drizzle": "url('https://example.com/light-drizzle.jpg')",
    "Moderate drizzle": "url('https://example.com/moderate-drizzle.jpg')",
    "Dense drizzle": "url('https://example.com/dense-drizzle.jpg')",
    "Light rain": "url('https://example.com/light-rain.jpg')",
    "Moderate rain": "url('https://example.com/moderate-rain.jpg')",
    "Heavy rain": "url('https://example.com/heavy-rain.jpg')",
    "Light snow": "url('https://example.com/light-snow.jpg')",
    "Moderate snow": "url('https://example.com/moderate-snow.jpg')",
    "Heavy snow": "url('https://example.com/heavy-snow.jpg')",
    Showers: "url('https://example.com/showers.jpg')",
    "Heavy showers": "url('https://example.com/heavy-showers.jpg')",
    "Violent showers": "url('https://example.com/violent-showers.jpg')",
    "Light snow showers": "url('https://example.com/light-snow-showers.jpg')",
    "Heavy snow showers": "url('https://example.com/heavy-snow-showers.jpg')",
    Thunderstorm: "url('https://example.com/thunderstorm.jpg')",
    "Thunderstorm with hail":
      "url('https://example.com/thunderstorm-with-hail.jpg')",
    "Thunderstorm with heavy hail":
      "url('https://example.com/thunderstorm-with-heavy-hail.jpg')",
  };

  const defaultBackground =
    "url('https://www.w3schools.com/w3images/ocean.jpg')";

  const backgroundImage = defaultBackground;
  // backgroundImages[weather.description] ||
  // "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdeep-sea-texture&psig=AOvVaw0CTze6LjSmVnponAGbCcGI&ust=1721910225555000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDV4cfWv4cDFQAAAAAdAAAAABAE";

  return (
    <div
      className={`bg-cover bg-center rounded-lg shadow-lg p-6 flex items-center justify-between ${
        theme === "dark" ? "dark" : ""
      }`}
      style={{
        backgroundImage: backgroundImage,
        marginTop: "-1.5rem",
        marginBottom: "1rem",
      }}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-6">
          <div className="text-5xl font-bold text-white">
            {weather.temperature}°F
          </div>
          <div className="flex flex-col items-start">
            <div className="text-xl font-medium text-white">
              {weather.description}
            </div>
            <div className="text-muted-foreground">
              <img
                src={weather.icon}
                alt={weather.description}
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="text-5xl font-bold text-white">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-muted-foreground text-white">
          {time.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

function CloudRainWindIcon(props) {
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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="m9.2 22 3-7" />
      <path d="m9 13-3 7" />
      <path d="m17 13-3 7" />
    </svg>
  );
}

function SunIcon(props) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
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
