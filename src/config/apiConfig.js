/**
 * API Configuration
 * Centralized configuration for API endpoints
 * 
 * For Parcel v1, environment variables need to be prefixed with PARCEL_
 * or accessed via process.env at build time.
 * 
 * Create a .env file in the root directory with:
 *   PARCEL_API_BASE_URL=https://se-weather-api.herokuapp.com/api/v1
 *   PARCEL_GEO_ENDPOINT=/geo
 *   PARCEL_FORECAST_ENDPOINT=/forecast
 * 
 * Note: Parcel v1 has limited .env support. Variables must be prefixed with PARCEL_
 * or accessed via process.env. For better .env support, consider upgrading to Parcel v2.
 */

// Get environment variables with fallback to defaults
const getEnvVar = (key, defaultValue) => {
  // Parcel v1: Try PARCEL_ prefix first, then direct key
  const parcelKey = `PARCEL_${key}`;
  
  if (typeof process !== 'undefined' && process.env) {
    // Try PARCEL_ prefixed version first (Parcel v1 convention)
    if (process.env[parcelKey]) {
      return process.env[parcelKey];
    }
    // Fallback to direct key (for other bundlers or manual setup)
    if (process.env[key]) {
      return process.env[key];
    }
  }
  return defaultValue;
};

const API_CONFIG = {
  BASE_URL: getEnvVar('API_BASE_URL', 'https://se-weather-api.herokuapp.com/api/v1'),
  ENDPOINTS: {
    GEO: getEnvVar('GEO_ENDPOINT', '/geo'),
    FORECAST: getEnvVar('FORECAST_ENDPOINT', '/forecast')
  }
};

/**
 * Gets the full URL for the geolocation endpoint
 * @returns {string} - Full geolocation endpoint URL
 */
export function getGeoEndpoint() {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GEO}`;
}

/**
 * Gets the full URL for the forecast endpoint
 * @returns {string} - Full forecast endpoint URL
 */
export function getForecastEndpoint() {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORECAST}`;
}

/**
 * Gets the complete API configuration
 * @returns {Object} - API configuration object
 */
export function getApiConfig() {
  return API_CONFIG;
}

