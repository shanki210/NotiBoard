import { useEffect, useState } from "react";
import axios from "axios";

const GoogleCalenderSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);

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

  return (
    <>
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
    </>
  );
};

export default GoogleCalenderSchedule;
