export function makeGamePage(makeCanvas, bgImage) {
    return function () {

        function build() {
            const canvas = makeCanvas()
            const canvasWrapper = document.getElementById("canvasWrapper")
            canvasWrapper.appendChild(canvas);

            console.log(bgImage);
            canvasWrapper.style.backgroundImage = "url('" + bgImage + "')"
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