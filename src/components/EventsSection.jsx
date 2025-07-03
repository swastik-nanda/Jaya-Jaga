import React from "react";
import { Clock } from "lucide-react";

const EVENTS = [
  {
    day: "Day 1",
    title: "Opening Ceremony",
    time: "7:00 PM",
    description:
      "Grand opening with traditional lamp lighting and cultural performances",
    highlight: true,
  },
  {
    day: "Day 2-3",
    title: "Epic Performances",
    time: "6:00 PM",
    description:
      "Dramatic presentations of key Ramayana episodes with live music",
  },
  {
    day: "Day 4",
    title: "Cultural Workshops",
    time: "2:00 PM",
    description:
      "Interactive sessions on traditional arts, music, and storytelling",
  },
  {
    day: "Day 5",
    title: "Dance Spectacular",
    time: "7:30 PM",
    description: "Classical dance performances depicting the epic journey",
  },
  {
    day: "Day 6",
    title: "Art Exhibition",
    time: "10:00 AM",
    description: "Gallery showcasing contemporary interpretations of the epic",
  },
  {
    day: "Day 7",
    title: "Grand Finale",
    time: "8:00 PM",
    description: "Closing ceremony with fireworks and community celebration",
    highlight: true,
  },
];

function EventsSection() {
  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6 font-playfair">
            Festival Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seven days of magnificent performances, cultural workshops, and
            spiritual celebrations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                event.highlight ? "ring-2 ring-amber-400" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                    {event.day}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3 font-playfair">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
