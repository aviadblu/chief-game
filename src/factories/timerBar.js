export function makeTimerBar(canvasW, canvasH, ctx) {

    return function () {

        function draw(text) {
            ctx.font = "20px Courier New";
            ctx.fillText(text, 5, 20);
        }

        return Object.freeze({
            draw: draw
        })
    }
}
