export function makeSnacksCollectedBar(canvasW, canvasH, ctx) {

    return function () {

        function draw(text) {
            ctx.font = "20px Courier New";
            ctx.fillText(text, 150, 20);
        }

        return Object.freeze({
            draw: draw
        })
    }
}
