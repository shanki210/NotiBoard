import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

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

  const handleCreateMeeting = () => {
    window.open("https://calendar.google.com/", "_blank");
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul>
            {schedule.length > 0 ? (
              schedule.map((event) => (
                <li
                  key={event.id}
                  className="mb-2 text-white p-2 rounded"
                  style={{ border: "2px solid white ", fontWeight: "bold" }}
                >
                  {event.title} at {"("}
                  {event.time}
                  {")"}
                </li>
              ))
            ) : (
              <li>No upcoming events</li>
            )}
          </ul>
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
        </>
      )}
    </>
  );
};

export default GoogleCalenderSchedule;
