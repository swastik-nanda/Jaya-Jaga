// This file acts as the single source of truth for the static properties of each location.
export const locationData = [
  {
    id: 1,
    name: "Baisi Pahacha (22 Steps)",
    shortName: "Baisi Pahacha",
    labelPos: "bottom",
    coords: { x: 345, y: 250 },
  },
  {
    id: 2,
    name: "Grand Road (Bada Danda)",
    shortName: "Grand Road",
    labelPos: "top",
    coords: { x: 450, y: 250 },
  },
  {
    id: 3,
    name: "Main Temple Gate (Singhadwara)",
    shortName: "Main Gate",
    labelPos: "top",
    coords: { x: 415, y: 250 },
  },
  {
    id: 4,
    name: "Northern Gate (Hasti Dwara)",
    shortName: "North Gate",
    labelPos: "top",
    coords: { x: 300, y: 155 },
  },
  {
    id: 5,
    name: "Southern Gate (Aswadwara)",
    shortName: "South Gate",
    labelPos: "bottom",
    coords: { x: 300, y: 345 },
  },
  {
    id: 6,
    name: "Swargadwar Cremation Ground",
    shortName: "Swargadwar",
    labelPos: "top",
    coords: { x: 80, y: 420 },
  },
  {
    id: 7,
    name: "Western Gate (Vyaghra Dwara)",
    shortName: "West Gate",
    labelPos: "top",
    coords: { x: 185, y: 250 },
  },
];

// NEW: Export the crowdLevels array so other components can use it
export const crowdLevels = ["Low", "Moderate", "High", "Very High", "Critical"];
