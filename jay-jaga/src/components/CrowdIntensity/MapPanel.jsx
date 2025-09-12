import React from "react";
import { getCrowdColor } from "../../utils/utils";

const MapPanel = ({ locations, handleMarkerClick }) => {
  return (
    <main className="w-2/3 bg-white p-6 border-r border-gray-200 flex flex-col">
      <div className="bg-amber-50 rounded-lg h-full p-4 relative flex items-center justify-center border border-amber-200">
        <h2 className="absolute top-4 text-xl font-semibold text-center text-gray-700">
          Temple Area Map
        </h2>
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full max-h-[600px] mx-auto rounded-lg"
        >
          {/* SVG definitions and static map elements */}
          <defs>
            <pattern
              id="dot-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1"
                fill="#d4a373"
                fillOpacity="0.3"
              ></circle>
            </pattern>
            <filter id="label-bg-filter">
              <feFlood floodColor="white" floodOpacity="0.75" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x="0"
            y="0"
            width="600"
            height="500"
            fill="url(#dot-pattern)"
          ></rect>
          <g className="text-xs text-gray-500 font-semibold">
            <text x="550" y="40">
              N
            </text>
            <text x="550" y="80">
              S
            </text>
            <path
              d="M552 45 L552 75 M545 52 L552 45 L559 52 M545 68 L552 75 L559 68"
              stroke="#a1a1aa"
              strokeWidth="1"
              fill="none"
            />
          </g>
          <rect
            x="200"
            y="170"
            width="200"
            height="160"
            fill="#fdf6e3"
            stroke="#d4a373"
            strokeWidth="3"
            rx="8"
          />
          <text
            x="300"
            y="255"
            textAnchor="middle"
            className="fill-gray-700 text-sm font-bold"
          >
            Jagannath Temple
          </text>
          <rect
            x="400"
            y="240"
            width="10"
            height="20"
            fill="#fae1b1"
            stroke="#d4a373"
            strokeWidth="1.5"
          />
          <text
            x="410"
            y="235"
            textAnchor="start"
            className="fill-gray-600 text-[10px] font-semibold"
          >
            East Gate
          </text>
          <rect
            x="290"
            y="163"
            width="20"
            height="10"
            fill="#fae1b1"
            stroke="#d4a373"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="160"
            textAnchor="middle"
            className="fill-gray-600 text-[10px] font-semibold"
          >
            North Gate
          </text>
          <rect
            x="290"
            y="327"
            width="20"
            height="10"
            fill="#fae1b1"
            stroke="#d4a373"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="352"
            textAnchor="middle"
            className="fill-gray-600 text-[10px] font-semibold"
          >
            South Gate
          </text>
          <rect
            x="190"
            y="240"
            width="10"
            height="20"
            fill="#fae1b1"
            stroke="#d4a373"
            strokeWidth="1.5"
          />
          <text
            x="185"
            y="235"
            textAnchor="end"
            className="fill-gray-600 text-[10px] font-semibold"
          >
            West Gate
          </text>
          <rect
            x="440"
            y="150"
            width="25"
            height="220"
            fill="#efe6d5"
            stroke="#d4a373"
            strokeWidth="2"
            rx="3"
          />
          <rect
            x="410"
            y="235"
            width="150"
            height="30"
            fill="#efe6d5"
            stroke="#d4a373"
            strokeWidth="2"
            rx="3"
          />
          <rect
            x="50"
            y="400"
            width="60"
            height="40"
            fill="#fdf6e3"
            stroke="#d4a373"
            strokeWidth="2"
            rx="3"
          />
          <text
            x="80"
            y="425"
            textAnchor="middle"
            className="fill-gray-600 text-xs font-medium"
          >
            Swargadwar
          </text>

          {/* Dynamic Markers */}
          {locations.map((location) => (
            <g
              key={location.id}
              className="cursor-pointer map-label-group"
              onClick={() => handleMarkerClick(location)}
            >
              <circle cx={location.x} cy={location.y} r="20">
                <animate
                  attributeName="r"
                  values="15;25;15"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.3;0.1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill"
                  values={`${getCrowdColor(
                    location.crowdLevel
                  )};${getCrowdColor(location.crowdLevel)}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={location.x}
                cy={location.y}
                r="8"
                fill={getCrowdColor(location.crowdLevel)}
                stroke="#854d0e"
                strokeWidth="2"
              />
            </g>
          ))}
          {/* Dynamic Labels */}
          {locations.map((location) => (
            <g key={`label-${location.id}`} className="pointer-events-none">
              <text
                x={location.x}
                y={location.y + (location.labelPos === "bottom" ? 26 : -20)}
                textAnchor="middle"
                className="fill-gray-800 text-xs font-bold"
                style={{ filter: "url(#label-bg-filter)" }}
              >
                {location.shortName}
              </text>
              <text
                x={location.x}
                y={location.y - 35}
                textAnchor="middle"
                className="fill-gray-900 text-sm font-bold opacity-0 full-label transition-opacity duration-300"
                style={{ filter: "url(#label-bg-filter)" }}
              >
                {location.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </main>
  );
};

export default MapPanel;
