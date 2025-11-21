import { getGeoEndpoint, getForecastEndpoint } from "./config/apiConfig";

/**
 * Fetches geolocation data for a given zip code
 * @param {string} zipCode - The zip code to look up
 * @returns {Promise<Object>} - Geolocation data with latitude and longitude
 */
export async function fetchGeolocation(zipCode) {
  const baseUrl = getGeoEndpoint();
  const url = `${baseUrl}?zip_code=${zipCode}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Geolocation API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch geolocation: ${error.message}`);
  }
}

/**
 * Fetches weather forecast data for a given location and date
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {string} date - Date in MM/DD/YYYY format
 * @returns {Promise<Object>} - Forecast data
 */
export async function fetchForecast(latitude, longitude, date) {
  const baseUrl = getForecastEndpoint();
  const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&date=${date}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch forecast: ${error.message}`);
  }
}

/**
 * Formats a date object to MM/DD/YYYY format
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

