import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Map } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import JagaEyes from "./JagaEyes";
import { CrowdContext } from "../contexts/CrowdContext";

/* ── Static data ─────────────────────────────────────────────────────────── */
const EXPLORE_ITEMS = [
  { icon: "🛕", label: "Rath Yatra",  path: "/about",    desc: "The chariot festival" },
  { icon: "🗓", label: "Festivals",   path: "/festivals", desc: "Annual events & schedule" },
  { icon: "📜", label: "History",     path: "/history",   desc: "12th century origins" },
  { icon: "🖼", label: "Gallery",     path: "/gallery",   desc: "Photos & moments" },
  { icon: "📬", label: "Contact",     path: "/contact",   desc: "Get in touch" },
];

const EXPLORE_PATHS = EXPLORE_ITEMS.map((i) => i.path);

const CROWD_DOT_COLOR = {
  Low:         "bg-green-500",
  Moderate:    "bg-yellow-400",
  High:        "bg-orange-500",
  "Very High": "bg-red-500",
  Critical:    "bg-[#B52020]",
  "":          "bg-gray-500",
};

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [scrollY,        setScrollY]        = useState(0);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [exploreOpen,    setExploreOpen]    = useState(false);
  const [userMenuOpen,   setUserMenuOpen]   = useState(false);
  const [user,           setUser]           = useState(null);

  const exploreRef  = useRef(null);
  const userMenuRef = useRef(null);

  const crowdCtx      = useContext(CrowdContext);
  const worstLevel    = crowdCtx?.worstCrowdLevel ?? "";
  const crowdLoading  = crowdCtx?.isLoading ?? true;

  const isHome   = location.pathname === "/";
  const isSolid  = !isHome || scrollY > 50;
  const isExploreActive = EXPLORE_PATHS.includes(location.pathname);

  /* ── Side-effects ── */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const raw   = localStorage.getItem("user");
    if (token && raw) {
      try { setUser(JSON.parse(raw)); } catch { localStorage.removeItem("user"); }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target))
        setExploreOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  /* ── Link helpers ── */
  const navLinkCls = ({ isActive }) =>
    `relative text-sm font-semibold tracking-wide transition-colors duration-200 gold-underline
     ${isActive ? "text-[#C9922D] active" : "text-[#F5EDD4] hover:text-[#C9922D]"}`;

  /* ── Crowd dot ── */
  const CrowdDot = () => (
    <span
      className={`inline-block w-2 h-2 rounded-full ml-1.5 flex-shrink-0
        ${crowdLoading ? "bg-gray-500 animate-pulse" : CROWD_DOT_COLOR[worstLevel] ?? "bg-gray-500"}
        ${!crowdLoading && worstLevel && worstLevel !== "Low" ? "crowd-dot-pulse" : ""}`}
      title={crowdLoading ? "Loading…" : `Worst: ${worstLevel}`}
    />
  );

  /* ── JSX ── */
  return (
    <>
      {/* ── Main bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300
          ${isSolid
            ? "bg-[#0F0A1E]/95 backdrop-blur-custom shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <JagaEyes />
            <span className="font-playfair text-lg font-bold text-[#C9922D] group-hover:text-[#E8B455] transition-colors">
              Jay Jagannath!
            </span>
          </Link>

          {/* Desktop Center Nav */}
          <div className="hidden md:flex items-center gap-8">

            {/* Explore Dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                id="nav-explore-btn"
                onClick={() => setExploreOpen((p) => !p)}
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors duration-200 gold-underline
                  ${isExploreActive || exploreOpen ? "text-[#C9922D] active" : "text-[#F5EDD4] hover:text-[#C9922D]"}`}
              >
                Explore
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-3 w-64 bg-[#1a1030] border border-[#C9922D]/20
                               rounded-xl shadow-2xl overflow-hidden"
                  >
                    {EXPLORE_ITEMS.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setExploreOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[#C9922D]/10 transition-colors group"
                      >
                        <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-[#F5EDD4] font-semibold text-sm group-hover:text-[#C9922D] transition-colors">
                            {item.label}
                          </p>
                          <p className="text-[#7C6F5B] text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Crowd Map */}
            <NavLink to="/crowd" className={navLinkCls} id="nav-crowd-link">
              <span className="flex items-center gap-1">
                Crowd Map <CrowdDot />
              </span>
            </NavLink>

            {/* Hotels */}
            <NavLink to="/hotels" className={navLinkCls} id="nav-hotels-link">
              Hotels
            </NavLink>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  id="nav-avatar-btn"
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C9922D] flex items-center justify-center
                                  text-[#0F0A1E] font-bold text-sm uppercase
                                  group-hover:bg-[#E8B455] transition-colors">
                    {user.name?.[0] ?? "U"}
                  </div>
                  <span className="text-[#F5EDD4] text-sm font-medium hidden lg:block">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className={`text-[#F5EDD4] transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-44 bg-[#1a1030] border border-[#C9922D]/20
                                 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <Link
                        to="/bookings"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 text-sm text-[#F5EDD4] hover:bg-[#C9922D]/10 hover:text-[#C9922D] transition-colors"
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-[#C9922D]/10"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                id="nav-login-btn"
                className="border border-[#C9922D] text-[#C9922D] hover:bg-[#C9922D] hover:text-[#0F0A1E]
                           px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[#F5EDD4] hover:text-[#C9922D] transition-colors p-1"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#0F0A1E] flex flex-col"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#C9922D]/20 flex-shrink-0">
              <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
                <JagaEyes />
                <span className="font-playfair font-bold text-[#C9922D]">Jay Jagannath!</span>
              </Link>
              <button
                onClick={closeMobile}
                className="text-[#F5EDD4] hover:text-[#C9922D] transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Overlay Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {/* Explore section */}
              <p className="text-[#7C6F5B] text-xs font-semibold uppercase tracking-widest mb-3">Explore</p>
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#C9922D]/10
                             text-[#F5EDD4] hover:text-[#C9922D] transition-colors text-base font-medium"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-[#C9922D]/20 my-4" />

              {/* Crowd Map */}
              <Link
                to="/crowd"
                onClick={closeMobile}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[#C9922D]/10
                           text-[#F5EDD4] hover:text-[#C9922D] transition-colors text-base font-medium"
              >
                <span className="flex items-center gap-2">
                  <Map size={18} /> Crowd Map
                </span>
                <CrowdDot />
              </Link>

              {/* Hotels */}
              <Link
                to="/hotels"
                onClick={closeMobile}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-[#C9922D]/10
                           text-[#F5EDD4] hover:text-[#C9922D] transition-colors text-base font-medium"
              >
                🏨 Hotels
              </Link>

              <div className="border-t border-[#C9922D]/20 my-4" />

              {/* Auth */}
              {user ? (
                <>
                  <div className="px-3 py-2 text-[#C9922D] font-semibold">
                    Hello, {user.name?.split(" ")[0]} 👋
                  </div>
                  <Link
                    to="/bookings"
                    onClick={closeMobile}
                    className="block px-3 py-3 text-[#F5EDD4] hover:text-[#C9922D] transition-colors font-medium"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-3 text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="block w-full text-center mt-4 border border-[#C9922D] text-[#C9922D]
                             hover:bg-[#C9922D] hover:text-[#0F0A1E] px-6 py-3 rounded-full
                             font-semibold transition-all"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Floating Crowd Widget ── */}
      {location.pathname !== "/crowd" && (
        <AnimatePresence>
          {!crowdLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="fixed bottom-6 right-4 z-40 md:hidden"
            >
              <Link
                to="/crowd"
                className="flex items-center gap-2 bg-[#0F0A1E]/90 border border-[#C9922D]/40
                           backdrop-blur-custom px-4 py-2.5 rounded-full shadow-xl
                           text-[#F5EDD4] text-sm font-semibold"
              >
                <Map size={15} className="text-[#C9922D]" />
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${CROWD_DOT_COLOR[worstLevel] ?? "bg-gray-500"}`}
                />
                {worstLevel || "—"}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
