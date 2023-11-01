/**
 * Namespace representing the parser for webstudio.is
 * @namespace
 */

const ws_parser = (function () {

    /**
     * Updates the HTML content with the actual data based on the classnames of the HTML elements where each classname represents a property.
     * @param {HTMLElement} parent_container - The parent element of the HTML element that needs to be updated
     * @param {object} data - The JSON object containing the data to update the HTML
     * @returns {HTMLElement} - The updated HTML element 
     * @memberOf ws_parser
    */
    function render(parent_container, data) {
        // get all elements that require dynamic content
        const elements = parent_container.querySelectorAll('[class^="dynamic_"]')
        // loop over them
        elements.forEach(el => {
            const list = el.classList;

            // get all the classes that do not start with dynamic__ to create a list of properties
            const properties = Array.from(list).filter(c => !c.startsWith('dynamic__'));
            // get the content from the corresponding properties from the object
            let content = properties.map(c => data[c]).join(' ');

            // check for option classes to modify the look of the content
            const options = Array.from(list).filter(c => c.startsWith('option__'));
            options.forEach(o => {
                content = eval(`${o.split('--')[0]}('${content}','${o.split('--').length > 0 ? o.split('--')[1] : ''}')`)
            })

            // check the type of content that needs to be rendered
            // this can be a list (array of objects), field (an object) or an attribute (src or href)
            if (list.contains('dynamic__list')) {
                let output = '';
                // loop over the list and execute the render() function again
                data.forEach(i => {
                    const template = el.querySelector('.dynamic__template');
                    console.log(i)
                    output += render(template, i).parentElement.innerHTML;
                })
                parent_container.innerHTML = output
            }
            // replace the textContent of the element
            if (list.contains('dynamic__field')) {
                el.textContent = content
            }
            // replace the src attribute of the element
            if (list.contains('dynamic__attribute--src')) {
                el.setAttribute('src',content)
            }
            // replaces the href attribute of the element
            if (list.contains('dynamic__attribute--href')) {
                el.setAttribute('href',content)
            }
        })
        return parent_container
    }

    /**
      * An internal function to check if an element is part of  a template.
      * If true, the render function can ignore the element because it is rendered in a list
      * @param {HTMLElement} element - The HTML element that needs to be checked
      * @returns {boolean} - a true or false value indicating if the element is part of a template or not
      * @memberOf ws_parser
    */
    function is_part_of_template(element) {
        let currentElement = element;

        while (currentElement) {
            if (currentElement.classList.contains('dynamic__template')) {
                return true; // Found the class in the current element
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }

    /**
     * Returns a given time in seconds to the format 00h 00min 00sec
     * @param {number} seconds - The amount of seconds that needs to be converted.
     * @returns {string} - The converted seconds
     * @memberOf ws_parser
    */
    function option__to_time(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}min ${remainingSeconds}sec`
    }

    /**
     * Replaces the spaces in a string with a comma
     * @param {string} content - The string that needs to be replaced
     * @returns {string} - The replaced string
     * @memberOf ws_parser
    */
    function option__separator_comma(content) {
        return content.trim().split(' ').join(', ')
    }

    /**
     * Replaces the spaces in a string with a dash
     * @param {string} content - The string that needs to be replaced
     * @returns {string} - The replaced string
     * @memberOf ws_parser
    */
    function option__separator_dash(content) {
        return content.trim().split(' ').join(' - ')
    }

    /**
     * Divides a number by the argument
     * @param {number} content - The number that needs to be divided
     * @param {number} divider - The number the content needs to be diveded with
     * @returns {number} - The diveded number
     * @memberOf ws_parser
    */
    function option__divide(content, number) {
        return parseFloat(content / number).toFixed(2);
    }

    /**
      * Multiplies a number by the argument
      * @param {number} content - The number that needs to be multiplied
      * @param {number} mulitplier - The number the content needs to be multiplied with
      * @returns {number} - The multiplied number
      * @memberOf ws_parser
    */
    function option__multiply(content, number) {
        return content * number;
    }

    /**
     * Adds a unit (string) at the end of the input
     * @param {string} content - The original string
     * @param {string} after - The string that needs to be attached after the original string
     * @returns {string} - The original string followed by the after parameter
     * @memberOf ws_parser
    */
    function option__add_after(content, after) {
        return `${content} ${after}`
    }

    /**
     * Adds a unit (string) at the end of the input
     * @param {string} content - The original string
     * @param {string} unit - The string that needs to be attached before the original string
     * @returns {string} - The before argument followed by the original string
     * @memberOf ws_parser
    */
    function option__add_before(content, before) {
        return `${before} ${content}`
    }

    /**
     * Converts a date to DD - MM - YYYY hh:mm
     * @param {string} content - The original date in ISO format
     * @returns {string} - The date in converted format
     * @memberOf ws_parser
    */
    function option__format_date(content) {
        return `${content.slice(8, 10)} - ${content.slice(5, 7)} - ${content.slice(0, 4)} ${content.slice(11, 16)}`
    }

    /**
      * Convert meters / second into kilometers / hour
      * @param {number} content - The original number
      * @returns {number} - The converted number rounded to 1 digit
      * @memberOf ws_parser
    */
    function option__to_km_h(content){
        return parseFloat((content * 3600) / 1000).toFixed(1)
    }

    return {
        render
    }

})();
