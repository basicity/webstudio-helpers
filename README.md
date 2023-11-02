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
There are 4 types of class names you can add to indicate dynamic content:
1. **dyanmic__field**: indicating an element to show a single property of an object.
2. **dynamic__attribute--src**: indicating that the src attribute of the element must be updated.
3. **dynamic__attribute--href**: indicating that the href attribute of the element must be updated.
4. **dynamic__list**: indicating an element to render an array of objects.
#### Scenario 1: adding property values using dynamic__field
Add the class  name **dynamic__field** followed by all the properties of the object you want to show. The properties will be rendered as textContent of the element and are separeted by a space. You can overwrite this using one of the [option class names](#options) class names.
##### Example
```html
<div class="container">
    <!-- show both the properties firstname and lastname -->
    <p class="dyanmic__field firstname lastname"></p>
    <div>
        <!-- only render the property age -->
        <p class="dyanmic__field age">/<p>
    </div>
</div>
```

```javascript
// json object
const person = {
    firstname: "John",
    lastname: "Doe",
    age: 27
}
```

```javascript
// code in the HTML embed element
ws_parser.render(document.querySelector('.container'), person)
```

```html
<!-- output -->
<div class="container">
    <!-- show both the properties firstname and lastname -->
    <p class="dyanmic__field firstname lastname">John Doe</p>
    <div>
        <!-- only render the property age -->
        <p class="dyanmic__field age">27/<p>
    </div>
</div>
``````
#### For a src attribute
#### For a href attribute
#### For a list

### Adding options {#options}