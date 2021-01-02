export function makeGamePage(makeCanvas) {
    return function () {

        function build() {
            const canvas = makeCanvas()
            document.getElementById("canvasWrapper").appendChild(canvas);
        }

        function context() {
            return Object.freeze({})
        }

        return Object.freeze({
            id: "game",
            html: `
                <div id="canvasWrapper" class="canvas-wrapper"></div>                       
            `,
            build,
            context
        })
    }
}