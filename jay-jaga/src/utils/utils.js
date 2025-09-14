// This file contains helper functions used across the feature's components.

export const getCrowdColor = (level) => {
  switch (level) {
    case "Low":
      return "#10b981"; // Green
    case "Moderate":
      return "#f59e0b"; // Yellow
    case "High":
      return "#f97316"; // Orange
    case "Very High":
      return "#ef4444"; // Red
    case "Critical":
      return "#8b5cf6"; // Purple
    default:
      return "#6b7280"; // Gray
  }
};

export const getCrowdIntensity = (level) => {
  switch (level) {
    case "Low":
      return 20;
    case "Moderate":
      return 40;
    case "High":
      return 65;
    case "Very High":
      return 85;
    case "Critical":
      return 100;
    default:
      return 0;
  }
};

export const getRecommendation = (level) => {
  switch (level) {
    case "Low":
      return "Area is clear. A great time for a peaceful visit.";
    case "Moderate":
      return "Slightly busy. Easy to navigate with minor waits.";
    case "High":
      return "Expect significant delays and large crowds. Proceed with caution.";
    case "Very High":
      return "Area is heavily congested. Not recommended for children or elderly.";
    case "Critical":
      return "DANGER: Area is at capacity. For your safety, please avoid this location.";
    default:
      return "No recommendation available.";
  }
};
