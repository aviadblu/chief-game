export function makeSnack(canvasW, canvasH, ctx, utils, images) {

    return function (position, size) {
        const img = new Image()
        img.src = images[Math.floor(utils.getRandomArbitrary(0, images.length))]

        let collected = false
        position = fixOutOfBounds(position, size)

        const center = size / 2
        const rect = utils.rect(position[0] - center, position[1] - center, size, size)()

        function draw() {
            if (!collected)
                ctx.drawImage(img, position[0] - center, position[1] - center, size, size)
        }

        function reportLocation() {
            return [position[0], position[1]]
        }

        function reportRect() {
            return rect.getRect()
        }

        function fixOutOfBounds(givenPosition, size) {
            const halfSize = size / 2
            const fixedPosition = givenPosition.slice()
            if (givenPosition[0] - halfSize < 0)
                fixedPosition[0] = halfSize
            if (givenPosition[0] + halfSize > canvasW)
                fixedPosition[0] = canvasW - halfSize
            if (givenPosition[1] - halfSize < 0)
                fixedPosition[1] = halfSize
            if (givenPosition[1] + halfSize > canvasH)
                fixedPosition[1] = canvasH - halfSize
            return fixedPosition;
        }

        function checkIfSnackCollected(playerRec) {
            if (collected)
                return false

            collected = rect.intersects(playerRec)
            return collected
        }

        return Object.freeze({
            draw,
            reportLocation,
            reportRect,
            checkIfSnackCollected
        })
    }
}
