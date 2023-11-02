# webstudio-helpers
This repo contains helper classes for the platform https://webstudio.is/.
Check https://basicity.github.io/webstudio-helpers/ for all info about the avaible methods.
***
- [webstudio-helpers](#webstudio-helpers)
  - [ws\_oAuth](#ws_oauth)
    - [Overview](#overview)
    - [How to use](#how-to-use)
  - [ws\_parser](#ws_parser)
    - [Overview](#overview-1)
    - [How to use?](#how-to-use-1)
    - [How to add class names?](#how-to-add-class-names)
      - [Scenario 1: adding property values using dynamic\_\_field](#scenario-1-adding-property-values-using-dynamic__field)
        - [Example](#example)
      - [Scenario 2: updating the src attribute of an image.](#scenario-2-updating-the-src-attribute-of-an-image)
      - [Example](#example-1)
      - [Scenario 3: updating the href attribute of a hyperlink](#scenario-3-updating-the-href-attribute-of-a-hyperlink)
      - [Example](#example-2)
      - [For a list](#for-a-list)
      - [Example](#example-3)
    - [Adding options](#adding-options)
    - [Example](#example-4)
***

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
***
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
1. **dynamic__field**: indicating an element to show a single property of an object.
2. **dynamic__attribute--src**: indicating that the src attribute of the element must be updated.
3. **dynamic__attribute--href**: indicating that the href attribute of the element must be updated.
4. **dynamic__list**: indicating an element to render an array of objects.
#### Scenario 1: adding property values using dynamic__field
Add the class  name **dynamic__field** followed by all the properties of the object you want to show. The properties will be rendered as textContent of the element and are separeted by a space. You can overwrite this using one of the [option class names](#adding-options).
##### Example
```html
<div class="container">
    <!-- show both the properties firstname and lastname -->
    <p class="dynamic__field firstname lastname"></p>
    <div>
        <!-- only render the property age -->
        <p class="dynamic__field age">/<p>
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
    <p class="dynamic__field firstname lastname">John Doe</p>
    <div>
        <!-- only render the property age -->
        <p class="dynamic__field age">27/<p>
    </div>
</div>
```
#### Scenario 2: updating the src attribute of an image.
Add the class **dynamic__attribute--src** to an <img> element followed by the property that contains the path of the image. You can add a part of the url before or after the image using the corresponding [option class names](#adding-options).
#### Example
```html
<div class="container">
    <!-- show the image -->
    <img class="dynamic__attribute--src profile" src="#" alt="">
</div>
```

```javascript
// json object
const person = {
    firstname: "John",
    lastname: "Doe",
    age: 27,
    picture: "https://myimage.com/image.jpg"
}
```

```javascript
// code in the HTML embed element
ws_parser.render(document.querySelector('.container'), person)
```

```html
<!-- output -->
<div class="container">
    <!-- show the image -->
    <img class="dynamic__attribute--src profile" src="https://myimage.com/image.jpg" alt="">
</div>
```
#### Scenario 3: updating the href attribute of a hyperlink
Add the class **dynamic__attribute--href** to an <a> element followed by the property that contains the url for the hyperlink. You can add a part of the url before or after the image using the corresponding [option class names](#adding-options).
#### Example
```html
<div class="container">
    <!-- update the hyperlink -->
    <a class="dynamic__attribute--href website" href="#">
        <span class="dynamic__field firstname lastname"></span>
    </a>
</div>
```

```javascript
// json object
const person = {
    firstname: "John",
    lastname: "Doe",
    age: 27,
    picture: "https://myimage.com/image.jpg",
    website: "https://mywebsite.com/"
}
```

```javascript
// code in the HTML embed element
ws_parser.render(document.querySelector('.container'), person)
```

```html
<!-- output -->
<div class="container">
    <!-- update the hyperlink -->
    <a class="dynamic__attribute--href website" href="https://mywebsite.com">
        <span class="dynamic__field firstname lastname">John Doe</span>
    </a>
</div>
```
#### For a list
Add the class **dynamic__list** to the HTML element that will serve as the parent of all items. This will mostly be an <ul>, <ol> or <dl> element. 
Add the class **dynamic__template** to the HTML element that will serve as the template for each element. This will mostly be a <li> or <div> element. Within the template, all fields can be tagged with the **dynamic__field** class name en will be treated as the element in [Scenario 1: Adding property values using dynamic__field](#scenario-1-adding-property-values-using-dynamic__field)
#### Example
```html
<div class="container">
    <!-- container for all the items -->
    <ul class="dynamic__list">
        <!-- the template of a single item -->
        <li class="dynamic__template">
            <div>
                <a class="dynamic__attribute--href website" href="">
                    <span class="dynamic__field firstname lastname"></span>
                </a>
                <img class="dynamic__attribute--src profile" src="#" alt="">
            </div>
        </li>
    </ul>
</div>
```

```javascript
// json object
const persons = [
    {
        firstname: "John",
        lastname: "Doe",
        picture: "https://myimage.com/image.jpg",
        website: "https://mywebsite.com/john"
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        picture: "https://myimage.com/image2.jpg",
        website: "https://mywebsite.com/jane/"
},
    {
        firstname: "Allen",
        lastname: "Smith",
        picture: "https://myimage.com/image3.jpg",
        website: "https://mywebsite.com/allen"
}
// ...
]
```

```javascript
// code in the HTML embed element
ws_parser.render(document.querySelector('.container'), persons)
```

```html
<!-- output -->
<div class="container">
    <!-- container for all the items -->
    <ul class="dynamic__list">
        <!-- the template of a single item -->
        <li class="dynamic__template">
            <div>
                <a class="dynamic__attribute--href website" href=https://mywebsite.com/john">
                    <span class="dynamic__field firstname lastname">John Doe</span>
                </a>
                <img class="dynamic__attribute--src profile" src="https://myimage.com/image.jpg" alt="">
            </div>
        </li>
        <li class="dynamic__template">
            <div>
                <a class="dynamic__attribute--href website" href=https://mywebsite.com/jane">
                    <span class="dynamic__field firstname lastname">Jane Doe</span>
                </a>
                <img class="dynamic__attribute--src profile" src="https://myimage.com/image2.jpg" alt="">
            </div>
        </li>
        <li class="dynamic__template">
            <div>
                <a class="dynamic__attribute--href website" href=https://mywebsite.com/allen">
                    <span class="dynamic__field firstname lastname">Allen Smith</span>
                </a>
                <img class="dynamic__attribute--src profile" src="https://myimage.com/image3.jpg" alt="">
            </div>
        </li>
        <!-- ... -->
    </ul>
</div>
```
### Adding options
The module contains a number of functions that can be applied to an element to make certain transformations to the content. These classes are known as option classes.
* **option__to_time(seconds)**: Returns a given time in seconds to the format 00h 00min 00sec.
* **option__separator_comma(content)**: Replaces the spaces in a string with a comma.
* **option__separator_dash(content)**: Replaces the spaces in a string with a dash.
* **option__divide(content, number)**: Divides a number by the argument.
* **option__multiply(content, number)**: Multiplies a number by the argument.
* **option__add_after(content, after)**: Adds a string at the end of the input.
* **option__add_before(content,before)**: Adds a string at the start of the input.
* **option__format_date(content)**: Converts a date to DD - MM - YYYY hh:mm.
### Example
```html
<div class="container">
    <!-- add https:// before the hyperlink -->
    <a class="dynamic__attribute--href website option__add_before--https://" href="#">
        <!-- add a comma between the firsname and lastname -->
        <span class="dynamic__field firstname lastname option__separator_coma"></span>
    </a>
    <div>
        <!-- format the date created -->
        <p class="dyanamic__field created option__format_date"></p>
</div>
```

```javascript
// json object
const person = {
    firstname: "John",
    lastname: "Doe",
    created: "2023-10-31T10:30:00",
    picture: "https://myimage.com/image.jpg",
    website: "mywebsite.com/"
}
```

```javascript
// code in the HTML embed element
ws_parser.render(document.querySelector('.container'), person)
```

```html
<!-- output -->
<div class="container">
    <!-- add https:// before the hyperlink -->
    <a class="dynamic__attribute--href website option__add_before--https://" href="https://mywebsite.com/">
        <!-- add a comma between the firsname and lastname -->
        <span class="dynamic__field firstname lastname option__separator_coma">John, Doe</span>
    </a>
    <div>
        <!-- format the date created -->
        <p class="dyanamic__field created option__format_date">31 - 10 - 2023 10:30</p>
</div>
```
