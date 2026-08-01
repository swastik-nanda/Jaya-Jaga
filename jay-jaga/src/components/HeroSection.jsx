import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { CrowdContext } from "../contexts/CrowdContext";

const CROWD_PILL_COLOR = {
  Low:         "bg-green-500/20 text-green-300 border-green-500/40",
  Moderate:    "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  High:        "bg-orange-500/20 text-orange-300 border-orange-500/40",
  "Very High": "bg-red-500/20 text-red-300 border-red-500/40",
  Critical:    "bg-[#B52020]/20 text-red-300 border-[#B52020]/40",
};

const CROWD_DOT = {
  Low:         "bg-green-500",
  Moderate:    "bg-yellow-400",
  High:        "bg-orange-500",
  "Very High": "bg-red-500",
  Critical:    "bg-[#B52020]",
};

function HeroSection() {
  const crowdCtx    = useContext(CrowdContext);
  const worstLevel  = crowdCtx?.worstCrowdLevel ?? "";
  const isLoading   = crowdCtx?.isLoading ?? true;

  return (
    <section
      id="home"
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/dieties/main-dieties-wp.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0A1E]/85 via-[#3B1A08]/75 to-[#0F0A1E]/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-playfair text-shadow-lg">
            <span className="hero-underline">Jay Jagannath</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-3 text-[#C9922D]">
              Shubha Ratha Yatra
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed text-[#F5EDD4]">
            Experience the timeless epic through magnificent performances,
            cultural exhibitions, and spiritual celebrations
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/crowd"
              className="bg-[#C9922D] hover:bg-[#E8B455] text-[#0F0A1E] px-8 py-3 rounded-full
                         font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Plan My Visit
            </Link>
            <Link
              to="/about"
              className="border-2 border-[#F5EDD4] text-[#F5EDD4] hover:bg-[#F5EDD4] hover:text-[#0F0A1E]
                         px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Explore the Festival
            </Link>
          </div>

          {/* Live crowd badge */}
          {!isLoading && worstLevel && (
            <Link to="/crowd" className="inline-flex items-center gap-2">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                               backdrop-blur-sm transition-all hover:scale-105
                               ${CROWD_PILL_COLOR[worstLevel] ?? "bg-gray-500/20 text-gray-300 border-gray-500/40"}`}>
                <span className={`w-2 h-2 rounded-full ${CROWD_DOT[worstLevel] ?? "bg-gray-400"}`} />
                {worstLevel} crowd right now — tap to see map
              </span>
            </Link>
          )}
          {isLoading && (
            <div className="inline-block h-8 w-52 rounded-full shimmer opacity-30" />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9922D] animate-bounce">
        <ChevronRight className="rotate-90" size={32} />
      </div>
    </section>
  );
}

export default HeroSection;
