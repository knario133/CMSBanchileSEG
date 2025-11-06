/**
 * @file apiService.js
 * Centralized service for making API calls to .ashx handlers.
 * It abstracts the fetch logic, standardizes request options,
 * and provides consistent error handling for all API interactions.
 */
(function(window) {
    'use strict';

    /**
     * The base service for all API interactions.
     * @namespace apiService
     */
    const apiService = {
        /**
         * Performs a GET request.
         * @param {string} url - The URL to send the request to.
         * @returns {Promise<any>} A promise that resolves with the JSON response.
         */
        get: async function(url) {
            return await request('GET', url);
        },

        /**
         * Performs a POST request.
         * @param {string} url - The URL to send the request to.
         * @param {object} [data={}] - The data to send in the request body.
         * @returns {Promise<any>} A promise that resolves with the JSON response.
         */
        post: async function(url, data = {}) {
            return await request('POST', url, data);
        }
    };

    /**
     * Private request handler function.
     * @param {string} method - The HTTP method (GET, POST, etc.).
     * @param {string} url - The URL for the request.
     * @param {object|null} data - The data to be sent in the request body (for POST).
     * @returns {Promise<any>} A promise that resolves with the parsed JSON data.
     * @throws {Error} Throws an error if the network request fails or the API returns an error.
     */
    async function request(method, url, data = null) {
        const options = {
            method: method,
            headers: {},
            credentials: 'same-origin'
        };

        if (data && method === 'POST') {
            if (data instanceof FormData) {
                options.body = data;
            } else {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(data);
            }
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            // Based on memory: check for the specific structure of the response
            if (result.Respuesta && result.Respuesta.Error) {
                // Use the message from the API if available, otherwise a generic error
                throw new Error(result.Respuesta.Message || 'Ocurrió un error en la respuesta del servidor.');
            }

            // Return the actual results array
            return result.Respuesta ? result.Respuesta.Resultado : result;

        } catch (error) {
            console.error(`Error en la llamada a la API [${method} ${url}]:`, error);
            // Re-throw the error to be caught by the calling function
            throw error;
        }
    }

    // Expose the service to the global window object
    window.apiService = apiService;

})(window);
