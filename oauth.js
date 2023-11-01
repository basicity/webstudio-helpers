const ws_oAuth = (function () {
    /**
     * Convert the code parameter in the querystring to an access token that can be used for API calls
     * @param {string} backend_url - The url of the service that will make the call to the token provider. This needs to be done server side to prevent exposure of the client_secret
     * @returns {object} - The entire authentication object containing the access token and additional information.
    */
    async function get_token(backend_url) {
        // check if the querystring contains a parameter with a code
        // only execute the remainging functions if that code was found
        const checkCode = new URLSearchParams(window.location.search).get('code');
        if (checkCode) {
            // call backend service to get the token
            const response = await fetch(`${backend_url}?code=${checkCode}`);
            const token = await response.json();
            return token
        } else {
            console.log('no code found in url yet');
            return;
        }
    }

    /**
     * Makes an API call to an endpoint and retrieves the response as JSON
     * @param {string} endpoint_url - The entire url of the endpoint that needs to be called
     * @param {string} token - A valid access token that is attached to the header of the request
     * @returns {object} - The response of the API call in JSON format
    */
    async function call_endpoint(endpoint_url, token) {
        // check strava documentation for endpoints: https://developers.strava.com/docs/reference/
        const response = await fetch(endpoint_url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await response.json();
        return data;
    }

    return {
        get_token,
        call_endpoint
    }

})();
