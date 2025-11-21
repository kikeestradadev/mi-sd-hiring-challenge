// Import images - Parcel will handle the paths
import sunnyIcon from "../../img/sunny.png";
import cloudyIcon from "../../img/cloudy.png";
import rainIcon from "../../img/rain.png";
import snowIcon from "../../img/snow.png";

/**
 * Gets the icon image path based on the icon name
 * @param {string} iconName - Icon name (sunny, cloudy, rain, snow)
 * @returns {string} - Path to the icon image
 */
export function getIconPath(iconName) {
  const iconMap = {
    sunny: sunnyIcon,
    cloudy: cloudyIcon,
    rain: rainIcon,
    snow: snowIcon
  };
  return iconMap[iconName] || iconMap.sunny;
}

