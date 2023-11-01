const ws_parser = (function () {

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
                content = eval(`${o}('${content}')`)
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

    function option__totime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}min ${remainingSeconds}sec`
    }

    function option__separator_coma(content) {
        return content.trim().split(' ').join(' - ')
    }

    function option__separator_dash(content) {
        return content.trim().split(' ').join(' - ')
    }

    function option__divide_by_thousand(content) {
        return Math.round(content / 1000);
    }

    return {
        render
    }

})();
