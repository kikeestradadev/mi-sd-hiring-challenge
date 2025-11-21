import { ForecastContainer } from "./components/ForecastContainer";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";

/**
 * Renders the forecast view with data from both endpoints
 * Uses the ForecastContainer component to orchestrate all sub-components
 * 
 * @param {Object} geoData - Geolocation data
 * @param {Object} forecastData - Forecast data
 * @param {HTMLElement} container - Container element to render into
 */
export function renderForecast(geoData, forecastData, container) {
  try {
    const forecastComponent = ForecastContainer({ geoData, forecastData });
    container.innerHTML = '';
    container.appendChild(forecastComponent);
  } catch (error) {
    console.error('Error rendering forecast:', error);
    renderError(error.message, container);
  }
}

/**
 * Renders an error message
 * @param {string} message - Error message to display
 * @param {HTMLElement} container - Container element to render into
 */
export function renderError(message, container) {
  const errorComponent = ErrorState({ message });
  container.innerHTML = '';
  container.appendChild(errorComponent);
}

/**
 * Renders a loading state
 * @param {HTMLElement} container - Container element to render into
 */
export function renderLoading(container) {
  const loadingComponent = LoadingState();
  container.innerHTML = '';
  container.appendChild(loadingComponent);
}

