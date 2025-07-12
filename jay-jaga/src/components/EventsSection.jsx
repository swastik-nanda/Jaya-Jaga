import React from "react";
import { Clock } from "lucide-react";
import GoToButton from "./GoToButton";

// Updated event schedule
const EVENTS = [
  {
    day: "Day 1",
    title: "Pahandi Bije",
    time: "7:00 AM",
    description: "Ceremonial procession of the deities to the chariots.",
    highlight: true,
  },
  {
    day: "Day 2-4",
    title: "Adapa Abhada + Puri Sightseeing",
    time: "10:00 AM",
    description:
      "Special Mahaprasad at Gundicha Temple and guided tours of Puri’s landmarks.",
  },
  {
    day: "Day 5",
    title: "Hera Panchami",
    time: "7:30 PM",
    description:
      "Celebration of Goddess Lakshmi’s symbolic visit to Gundicha Temple.",
  },
  {
    day: "Day 6",
    title: "Ratha Moda + Sandhya Adapa Mandap Darshan",
    time: "6:00 PM",
    description: "Turning of the chariots and evening darshan at Adapa Mandap.",
  },
  {
    day: "Day 7",
    title: "Bahuda Yatra + Lakshmi Narayan Bheta",
    time: "8:00 AM",
    description:
      "Return journey of the deities and the divine meeting of Lakshmi and Narayan.",
    highlight: true,
  },
  {
    day: "Day 8",
    title: "Suna Vesha",
    time: "4:00 PM",
    description: "Deities adorned with gold ornaments in a grand display.",
  },
  {
    day: "Day 9",
    title: "Adhara Pana",
    time: "6:00 PM",
    description:
      "Offering of a special sweet drink to the deities on the chariots.",
  },
  {
    day: "Day 10",
    title: "Niladri Bije + Rasogolla Divas",
    time: "7:00 PM",
    description:
      "Deities return to the main temple; celebration of Rasogolla Divas.",
  },
  {
    day: "Day 11",
    title: "Nilachal Abhada",
    time: "12:00 PM",
    description: "Resumption of regular Mahaprasad at Jagannath Temple.",
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
            Eleven days of magnificent rituals, cultural experiences, and
            spiritual celebrations
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <GoToButton
              buttonText="See Related Festivals"
              route="festivals"
              className="text-lg"
            />
            {/* New Book Hotels button */}
            <GoToButton
              buttonText="Book Hotels"
              route="hotels"
              className="text-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md"
            />
          </div>
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
