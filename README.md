# webstudio-helpers
This repo contains helper classes for the platform https://webstudio.is/.
## ws_oAuth
The goal of this module is to support oAuth calls to external services.
### Overview
It contains 2 methods:
* __get_token(backend_url?code)__ (async): use this method to exchange a code for an access token providing a url to a backend service
* __call_endpoint(endpoint_url, token)__ (async): use this method to make actual API calls using the token received from the get_token method.
### How to use
1. Drag a HTML Embed component on your screen
2. Link to the ws_oAuth library by adding `<script src="https://cdn.jsdelivr.net/gh/basicity/webstudio-helpers@v0.0.8/oauth.js"></script>`
3. Add a second HTML Embed component on your screen and add the following code replacing your_backend_url and your_endpoint by your own values.
 ```javascript
<script>
    async function init() {
        const token = await ws_oAuth.get_token('your_backend_url');
        console.log(token)

        if (token) {
            const data = await ws_oAuth.call_endpoint(`your_endpoint`, token.access_token);
            console.log(data)
            }
        }
        init()
</script>
```
4. Check the result in the console

## ws_parser
