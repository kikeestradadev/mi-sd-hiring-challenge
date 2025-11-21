/**
 * LoadingState Component
 * Displays a loading indicator while data is being fetched
 * 
 * @returns {HTMLElement} - Loading container element
 */
export function LoadingState() {
  const container = document.createElement('div');
  container.className = 'loading-container';
  container.innerHTML = `
    <p class="loading-message">Loading forecast...</p>
  `;
  return container;
}

