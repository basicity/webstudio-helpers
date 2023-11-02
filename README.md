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
The goal of this module is to make to easily convert JSON data into HTML elements by using a system of adding class names to the HTML elements.
### Overview
The module contains one public method:
* __render(parent_container, data)__: call this method with the HTML element that is the parent of the block that needs dynamic content. The second argument is the JSON data used for the rendering.
### How to use?
1. Drag a HTML Embed component on your screen
2. Link to the ws_oAuth library by adding `<script src="https://cdn.jsdelivr.net/gh/basicity/webstudio-helpers@v0.0.8/parser.js"></script>`
3. Add a second HTML Embed component on your screen and add the following code replacing your_html_element and your_data by your own values.
```javascript
ws_parser.render(document.querySelector('your_html_element'), your_data)
```
### How to add class names?
There are 4 types of class names you can add:
1. __dyanmic__field__: indicating an element to show a single property of an object.
2. __dynamic__attribute--src__: indicating that the src attribute of the element must be updated.
3. __dynamic__attribute--href__: indicating that the href attribute of the element must be updated.
4. __dynamic__list__: indicating an element to render an array of objects.
#### Scenario 1: adding property values
##### Situation
Assume that you have a block element with multiple child elements and a JSON object
```html
<div class="container">
    <p></p>
    <div>
        <p>/<p>
    </div>
</div>
```

```json
{
    "firstname": "John",
    "lastname": "Doe",
    "age": 27
}
```
#### For a src attribute
#### For a href attribute
#### For a list