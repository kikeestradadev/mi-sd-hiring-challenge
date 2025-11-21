import { ForecastHeader } from "./ForecastHeader";
import { ForecastSummary } from "./ForecastSummary";
import { ForecastCard } from "./ForecastCard";

/**
 * ForecastContainer Component
 * Main container component that orchestrates all forecast sub-components
 * 
 * @param {Object} props - Component props
 * @param {Object} props.geoData - Geolocation data
 * @param {Object} props.forecastData - Forecast data
 * @returns {HTMLElement} - Main forecast container element
 */
export function ForecastContainer({ geoData, forecastData }) {
  if (!forecastData || !forecastData.daily) {
    throw new Error('Invalid forecast data');
  }
  
  const { daily } = forecastData;
  const locationName = (geoData && geoData.city) || (geoData && geoData.name) || 'Unknown Location';
  const locationState = (geoData && geoData.state) || '';
  
  // Create main container
  const container = document.createElement('div');
  container.className = 'forecast-container';
  
  // Render header component
  const header = ForecastHeader({ 
    locationName, 
    locationState 
  });
  container.appendChild(header);
  
  // Render summary component
  const summary = ForecastSummary({ 
    icon: daily.icon, 
    summary: daily.summary 
  });
  container.appendChild(summary);
  
  // Render daily forecast cards
  const dailySection = document.createElement('div');
  dailySection.className = 'forecast-daily';
  
  if (daily.data && daily.data.length > 0) {
    daily.data.forEach((dayData) => {
      const dayCard = ForecastCard({ dayData });
      dailySection.appendChild(dayCard);
    });
  }
  
  container.appendChild(dailySection);
  
  return container;
}

