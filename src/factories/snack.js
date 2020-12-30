export function makeSnack(canvasW, canvasH, ctx) {

    return function (x, y, image, size) {
        const img = new Image()
        img.src = image
        let collected = false

        const center = size / 2
        const rectXRange = [x - center, x - center + size]
        const rectYRange = [y - center, y - center + size]

        function draw() {
            if(!collected)
                ctx.drawImage(img, x - center, y - center, size, size)
        }

        function reportLocation() {
            return [x, y]
        }

        function checkIfSnackCollected(playerLocation) {
            if(collected)
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
