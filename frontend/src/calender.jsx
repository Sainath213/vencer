// Install dependencies before running:
// npm install @fullcalendar/react @fullcalendar/daygrid axios

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for draggable events
import axios from "axios";

const CalendarFeature = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Handle adding a new event
  const handleDateClick = (info) => {
    const medicationName = prompt("Enter medication name:");
    if (!medicationName) return;

    const newEvent = {
      title: medicationName,
      date: info.dateStr,
      backgroundColor: "#007bff", // Default color
    };

    // Save the event to the backend
    axios
      .post("http://localhost:5000/api/events", newEvent)
      .then((response) => {
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Infusion Scheduling Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true} // Allow drag and drop
        dateClick={handleDateClick}
        eventDrop={(info) => {
          // Update event date in the backend
          const updatedEvent = {
            ...info.event.extendedProps,
            title: info.event.title,
            date: info.event.startStr,
          };

          axios
            .put(
              `http://localhost:5000/api/events/${info.event.id}`,
              updatedEvent
            )
            .then(() => {
              setEvents((prevEvents) =>
                prevEvents.map((event) =>
                  event.id === info.event.id ? updatedEvent : event
                )
              );
            })
            .catch((error) => {
              console.error("Error updating event:", error);
            });
        }}
      />
    </div>
  );
};

export default CalendarFeature;
