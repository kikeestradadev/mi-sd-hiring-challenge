import { getIconPath } from "../utils/iconUtils";
import { formatTimestamp } from "../utils/dateUtils";

/**
 * ForecastCard Component
 * Displays a single day's forecast information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.dayData - Day forecast data object
 * @returns {HTMLElement} - Forecast card element
 */
export function ForecastCard({ dayData }) {
  const dayCard = document.createElement('div');
  dayCard.className = 'forecast-day-card';
  
  const dateText = formatTimestamp(dayData.time);
  const highTemp = Math.round(dayData.temperatureHigh);
  const lowTemp = Math.round(dayData.temperatureLow);
  
  dayCard.innerHTML = `
    <div class="day-header">
      <span class="day-date">${dateText}</span>
    </div>
    <div class="day-content">
      <img src="${getIconPath(dayData.icon)}" alt="${dayData.icon}" class="day-icon" />
      <div class="day-temps">
        <span class="temp-high">${highTemp}°</span>
        <span class="temp-low">${lowTemp}°</span>
      </div>
    </div>
    <div class="day-summary">${dayData.summary}</div>
  `;
  
  return dayCard;
}

