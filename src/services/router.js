export function makeRouter() {

    return function() {
        let activeRoute = ""

        function setRoute(viewFactory) {
            if(activeRoute !== viewFactory.id) {
                document.body.innerHTML = ""
            }
            activeRoute = viewFactory.id
            document.body.innerHTML = viewFactory.html.trim()
            viewFactory.build()
            Object.assign(window, viewFactory.context())
        }

        return Object.freeze({
            setRoute
        })
    }
}