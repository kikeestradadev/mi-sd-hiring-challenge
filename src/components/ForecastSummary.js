import { getIconPath } from "../utils/iconUtils";

/**
 * ForecastSummary Component
 * Displays the overall forecast summary with icon and description
 * 
 * @param {Object} props - Component props
 * @param {string} props.icon - Icon name (sunny, cloudy, rain, snow)
 * @param {string} props.summary - Summary text
 * @returns {HTMLElement} - Summary section element
 */
export function ForecastSummary({ icon, summary }) {
  const summarySection = document.createElement('div');
  summarySection.className = 'forecast-summary';
  
  summarySection.innerHTML = `
    <div class="summary-content">
      <img src="${getIconPath(icon)}" alt="${icon}" class="summary-icon" />
      <div class="summary-text">
        <p class="summary-description">${summary}</p>
      </div>
    </div>
  `;
  
  return summarySection;
}

