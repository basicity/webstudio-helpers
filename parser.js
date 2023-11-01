const ws_parser = (function () {

    /**
     * Updates the HTML content with the actual data based on the classnames of the HTML elements where each classname represents a property.
     * This function does not returns a value, but updates the existing HTML.
     * @param {string} container_name - The classname of the HTML parent element that needs to be updated
     * @param {object} data - The JSON object containing the data to update the HTML
    */
    function render(container_name, data) {
        // get all the HTML that needs to be rendered
        const container = document.querySelector(`.${container_name}`)
        // get all elements that require dynamic content
        const elements = container.querySelectorAll('[class^="dynamic_"]')
        // loop over them
        elements.forEach(el => {
            const list = el.classList;
            // get all the classes that do not start with dynamic__
            const properties = Array.from(list).filter(c => !c.startsWith('dynamic__'));
            // get the content from the corresponding properties from the object
            let content = properties.map(c => data[c]).join(' ');

            // check for option classes to modify the look of the content
            const options = Array.from(list).filter(c => c.startsWith('option__'));
            console.log(options);
            options.forEach(o => {
                content = eval(`${o.split('--')[0]}('${content}','${o.split('--').length > 0 ? o.split('--')[1] : ''}')`)
            })

            // fill in the textContent or src
            if (list.contains('dynamic__content')) {
                el.textContent = content
            }
            if (list.contains('dynamic__src')) {
                el.setAttribute('src', content)
            }
        })
    }

    /**
     * Returns a given time in seconds to the format 00h 00min 00sec
     * @param {number} seconds - The amount of seconds that needs to be converted.
     * @returns {string} - The converted seconds
    */
    function option__totime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}min ${remainingSeconds}sec`
    }

    /**
     * Replaces the spaces in a string with a comma
     * @param {string} content - The string that needs to be replaced
     * @returns {string} - The replaced string
    */
    function option__separator_comma(content) {
        return content.trim().split(' ').join(', ')
    }

    /**
     * Replaces the spaces in a string with a dash
     * @param {string} content - The string that needs to be replaced
     * @returns {string} - The replaced string
    */
    function option__separator_dash(content) {
        return content.trim().split(' ').join(' - ')
    }

    /**
     * Divides a number by 1000
     * @param {number} content - The number that needs to be divided
     * @returns {number} - The diveded number
    */
    function option__divide_by_thousand(content) {
        return Math.round(content / 1000);
    }

    /**
     * Adds a unit (string) at the end of the input
     * @param {string} content - The original string
     * @param {string} unit - The unit (string) that needs to be attached to the original string
     * @returns {string} - The original string followed by the unit (string)
    */
    function option__add_unit(content, unit) {
        return `${content} ${unit}`
    }

    return {
        render
    }

})();
