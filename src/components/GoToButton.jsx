import React from "react";
import { useNavigate } from "react-router-dom";

function GoToButton({ buttonText, route, className = "", children, ...props }) {
  const navigate = useNavigate();
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

  return (
    <button
      onClick={() => navigate(normalizedRoute)}
      className={`
        inline-block
        px-6 py-2
        bg-amber-600
        hover:bg-amber-700
        text-white
        font-semibold
        rounded-full
        shadow-md
        transition
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-amber-400
        focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children || buttonText}
    </button>
  );
}

export default GoToButton;
