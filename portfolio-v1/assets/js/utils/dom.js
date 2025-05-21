/**
 * Add event listener to multiple elements
 * @param {NodeList} elements - Elements to add event listener to
 * @param {string} eventType - Type of event to listen for
 * @param {Function} callback - Function to execute when event occurs
 */
export const addEventOnElements = (elements, eventType, callback) => {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

/**
 * Update copyright year in footer
 */
export const updateCopyright = () => {
    const copyrightElement = document.getElementById('copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = new Date().getFullYear();
    }
}; 