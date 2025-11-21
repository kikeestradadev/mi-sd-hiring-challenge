import { fetchGeolocation, fetchForecast, formatDate } from "./api";
import { renderForecast, renderError, renderLoading } from "./render";
import "./styles.css";

/**
 * Main application logic
 */
async function init() {
  // Create input section
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="input-section">
      <div class="input-group">
        <label for="zipCode">Zip Code:</label>
        <input type="text" id="zipCode" placeholder="Enter zip code (e.g., 90210)" />
        <button id="searchButton">Get Forecast</button>
      </div>
      <div class="zip-code-help">
        <span class="help-icon">💡</span>
        <button id="showExamplesBtn" class="help-link-btn">Don't know a zip code? See examples</button>
      </div>
    </div>
    
    <!-- Popup Modal -->
    <div id="zipCodeModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Popular US Zip Codes</h2>
          <button class="modal-close" id="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <p class="modal-description">Click on any zip code to use it, or search for your own:</p>
          <div class="zip-code-examples">
            <button class="zip-example-btn" data-zip="90210">
              <span class="zip-code">90210</span>
              <span class="zip-location">Beverly Hills, CA</span>
            </button>
            <button class="zip-example-btn" data-zip="10018">
              <span class="zip-code">10018</span>
              <span class="zip-location">New York, NY</span>
            </button>
            <button class="zip-example-btn" data-zip="60601">
              <span class="zip-code">60601</span>
              <span class="zip-location">Chicago, IL</span>
            </button>
            <button class="zip-example-btn" data-zip="77001">
              <span class="zip-code">77001</span>
              <span class="zip-location">Houston, TX</span>
            </button>
          </div>
          <div class="modal-footer">
            <a href="https://tools.usps.com/zip-code-lookup.htm" target="_blank" rel="noopener noreferrer" class="external-link">
              🔍 Search for other zip codes on USPS
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div id="forecast-container"></div>
  `;
  
  const zipCodeInput = document.getElementById('zipCode');
  const searchButton = document.getElementById('searchButton');
  const forecastContainer = document.getElementById('forecast-container');
  const showExamplesBtn = document.getElementById('showExamplesBtn');
  const zipCodeModal = document.getElementById('zipCodeModal');
  const closeModal = document.getElementById('closeModal');
  const zipExampleButtons = document.querySelectorAll('.zip-example-btn');
  
  // Set default zip code for quick testing
  zipCodeInput.value = '90210';
  
  // Handle search button click
  searchButton.addEventListener('click', handleSearch);
  
  // Handle Enter key in input
  zipCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Auto-load forecast for default zip code
  handleSearch();
  
  // Modal functionality
  showExamplesBtn.addEventListener('click', () => {
    zipCodeModal.style.display = 'flex';
  });
  
  closeModal.addEventListener('click', () => {
    zipCodeModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  zipCodeModal.addEventListener('click', (e) => {
    if (e.target === zipCodeModal) {
      zipCodeModal.style.display = 'none';
    }
  });
  
  // Handle zip code example clicks
  zipExampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const zipCode = btn.getAttribute('data-zip');
      zipCodeInput.value = zipCode;
      zipCodeModal.style.display = 'none';
      handleSearch();
    });
  });
  
  async function handleSearch() {
    const zipCode = zipCodeInput.value.trim();
    
    if (!zipCode) {
      renderError('Please enter a zip code', forecastContainer);
      return;
    }
    
    // Show loading state
    renderLoading(forecastContainer);
    
    try {
      // Step 1: Fetch geolocation
      const geoData = await fetchGeolocation(zipCode);
      
      if (!geoData.latitude || !geoData.longitude) {
        throw new Error('Invalid geolocation data received');
      }
      
      // Step 2: Fetch forecast using today's date
      const today = new Date();
      const dateString = formatDate(today);
      const forecastData = await fetchForecast(
        geoData.latitude,
        geoData.longitude,
        dateString
      );
      
      // Step 3: Render the forecast
      renderForecast(geoData, forecastData, forecastContainer);
      
    } catch (error) {
      console.error('Error fetching forecast:', error);
      renderError(error.message, forecastContainer);
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
