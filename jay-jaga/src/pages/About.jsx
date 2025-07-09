import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NavBarSecondary from "../components/NavBarSecondary";
import data from "../data/data.json";
import Content from "../Contents/Content";

// Table of contents data
const toc = [
  {
    text: "Basanta Panchami, Akshaya Tritiya & Ratha Anukula",
    id: "basanta-panchami",
  },
  { text: "Construction of Chariots", id: "construction" },
  { text: "Pahandi Bije & Tahia Lagi", id: "pahandi-bije" },
  { text: "Rituals of Car Festival", id: "rituals" },
  { text: "Adapa Mandapa Bije", id: "adapa-mandapa" },
  { text: "Hera Panchami", id: "hera-panchami" },
  { text: "Dakshina Moda & Rasa Lila", id: "dakshina-moda" },
  { text: "Bahuda Yatra & Laxmi Narayana Bheta", id: "bahuda-yatra" },
  { text: "Suna Vesha", id: "suna-vesha" },
  { text: "Adhara Pana", id: "adhara-pana" },
  { text: "Niladri Bije", id: "niladri-bije" },
  { text: "Nandighosa - Chariot of Jagannath", id: "nandighosa" },
  { text: "Taladhwaja - Chariot of Balabhadra", id: "taladhwaja" },
  { text: "Devadalana - Chariot of Subhadra", id: "devadalana" },
  { text: "Car Festival Photo Gallery", id: "photo-gallery" },
];

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

function About() {
  // Split into two columns
  const left = toc.slice(0, 8);
  const right = toc.slice(8);

  return (
    <>
      <NavBarSecondary></NavBarSecondary>
      <section className="mt-5 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Text above hero image */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-playfair font-bold text-amber-900 mb-4 drop-shadow-lg">
              About the Ratha Yatra Festival
            </h1>
            <p className="text-md sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Ratha Yatra, the magnificent and vibrant chariot festival, takes
              place annually on Asadha Sukla Dwitiya, the second day of the
              bright fortnight of Asadha (June-July). This grand event draws
              millions of devotees from across India and around the world to
              witness the renowned Car Festival of Lord Jagannath in Puri. The
              festival is also referred to as 'Gundicha Yatra' and 'Ghosha
              Yatra.' According to tradition, 'Gundicha' was the queen of Raja
              Indradyumna, the legendary founder of the original Jagannath
              temple, who is credited with initiating this spectacular
              celebration. Consequently, the festival is named in her honor.
            </p>
          </div>

          {/* Hero Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img
              src="/ratha-yatra/raths-wp.jpg"
              alt="Festival Hero"
              className="w-full h-80 sm:h-[32rem] object-cover brightness-95"
            />
          </div>

          {/* Table of Contents */}
          <div className="bg-white/95 border rounded-lg shadow-md mx-auto max-w-4xl">
            <div className="border-b bg-gray-200/80 rounded-t-lg">
              <h2 className="text-2xl font-bold font-sans text-center py-3 tracking-wide">
                Table of Contents
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              {/* Left Column */}
              <ul className="py-4 px-6 space-y-2">
                {left.map((item, i) => (
                  <li key={item.id} className="border-b last:border-b-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={
                        "w-full text-left py-1 transition-colors duration-150 " +
                        (item.active
                          ? "text-blue-800 font-bold hover:underline"
                          : "text-blue-800 font-semibold hover:underline")
                      }
                    >
                      {i + 1}. {item.text}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Right Column */}
              <ul className="py-4 px-6 space-y-2">
                {right.map((item, i) => (
                  <li key={item.id} className="border-b last:border-b-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left py-1 text-blue-800 font-semibold hover:underline transition-colors duration-150"
                    >
                      {i + 9}. {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Example empty sections for scroll targets (add your content later) */}
          <div className="mt-24 space-y-24">
            {toc.map((item, idx) => {
              // Find the data for this section by id
              const sectionData = data.find((d) => d.id === item.id);
              return (
                <section
                  key={item.id}
                  id={item.id}
                  className="max-w-4xl mx-auto py-12 border-b"
                >
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">
                    {idx + 1}. {item.text}
                  </h3>
                  {/* Render the content for this section */}
                  <Content data={sectionData} />
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
