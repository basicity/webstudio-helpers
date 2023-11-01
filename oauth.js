const ws_oAuth = (function () {
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

    async function call_endpoint(endpoint_url, token) {
        // check strava documentation for endpoints: https://developers.strava.com/docs/reference/
        const response = await fetch(endpoint_url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    return {
        get_token,
        call_endpoint
    }

})();
