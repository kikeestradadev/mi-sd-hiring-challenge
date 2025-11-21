/**
 * ForecastHeader Component
 * Displays the location name and state
 * 
 * @param {Object} props - Component props
 * @param {string} props.locationName - Name of the location
 * @param {string} props.locationState - State of the location
 * @returns {HTMLElement} - Header element
 */
export function ForecastHeader({ locationName, locationState }) {
  const header = document.createElement('div');
  header.className = 'forecast-header';
  
  const locationText = locationState 
    ? `${locationName}, ${locationState}` 
    : locationName;
  
  header.innerHTML = `
    <h1 class="location-title">${locationText}</h1>
  `;
  
  return header;
}

