/**
 * Converts a coordinate to a 3 word address
 * @param {Object} coordinates - The coordinate object
 * @param {number} coordinates.lat - The latitude
 * @param {number} coordinates.lng - The longitude
 * @param {string} [language=en] - The language to return the 3 word address in
 * @returns {Promise} Promise 3 word address response
 */

what3words.api.convertTo3wa({lat:51.508344, lng:-0.12549900}, 'en')
  .then(function(response) {
    console.log("[convertTo3wa]", response);
  });