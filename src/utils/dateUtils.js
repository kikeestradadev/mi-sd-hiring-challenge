import { convertDate } from "../utils";

/**
 * Formats a Unix timestamp to a readable date string
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} - Formatted date string (e.g., "Monday, Jan 15")
 */
export function formatTimestamp(timestamp) {
  const date = new Date(convertDate(timestamp));
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  
  return `${dayName}, ${month} ${day}`;
}

