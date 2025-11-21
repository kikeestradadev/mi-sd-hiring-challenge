/**
 * ErrorState Component
 * Displays an error message with a retry option
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {HTMLElement} - Error container element
 */
export function ErrorState({ message }) {
  const container = document.createElement('div');
  container.className = 'error-container';
  container.innerHTML = `
    <p class="error-message">${message}</p>
    <button class="retry-button" onclick="location.reload()">Try Again</button>
  `;
  return container;
}

