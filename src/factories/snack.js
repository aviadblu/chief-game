export function makeSnack(canvasW, canvasH, ctx, image) {

    return function (position, size) {
        const img = new Image()
        img.src = image

        let collected = false
        position = fixOutOfBounds(position, size)

        const center = size / 2
        const rectXRange = [position[0] - center, position[0] - center + size]
        const rectYRange = [position[1] - center, position[1] - center + size]

        function draw() {
            if (!collected)
                ctx.drawImage(img, position[0] - center, position[1] - center, size, size)
        }

        function reportLocation() {
            return [position[0], position[1]]
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
            if (givenPosition[1] + halfSize > canvasW)
                fixedPosition[1] = canvasW - halfSize
            return fixedPosition;
        }

        function checkIfSnackCollected(playerLocation) {
            if (collected)
                return false
            collected = playerLocation[0] >= rectXRange[0] && playerLocation[0] <= rectXRange[1] && playerLocation[1] >= rectYRange[0] && playerLocation[1] <= rectYRange[1]
            return collected
        }

        return Object.freeze({
            draw,
            reportLocation,
            checkIfSnackCollected
        })
    }
}
