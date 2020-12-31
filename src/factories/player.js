export function makePlayer(canvasW, canvasH, ctx, image) {
    const moveSpeed = 10;
    const imageSize = 85;
    const img = new Image()
    img.src = image

    return function (position) {
        const keyPressMap = {
            'ArrowUp': 0,
            'ArrowDown': 0,
            'ArrowRight': 0,
            'ArrowLeft': 0
        }

        const playerCenter = imageSize / 2
        const minX = playerCenter
        const maxX = canvasW - playerCenter
        const minY = playerCenter
        const maxY = canvasH - playerCenter

        function draw() {
            ctx.drawImage(img, position[0] - playerCenter, position[1] - playerCenter, imageSize, imageSize)
        }

        function press(key, isPressed) {
            if (keyPressMap.hasOwnProperty(key))
                keyPressMap[key] = isPressed ? 1 : 0
        }

        function update() {
            if (keyPressMap.ArrowUp)
                position[1] = position[1] - moveSpeed
            if (keyPressMap.ArrowDown)
                position[1] = position[1] + moveSpeed
            if (keyPressMap.ArrowRight)
                position[0] = position[0] + moveSpeed
            if (keyPressMap.ArrowLeft)
                position[0] = position[0] - moveSpeed
            fixBoundaries()
        }

        function fixBoundaries() {
            if (position[0] < minX) position[0] = minX
            if (position[0] > maxX) position[0] = maxX
            if (position[1] < minY) position[1] = minY
            if (position[1] > maxY) position[1] = maxY
        }

        function reportLocation() {
            return [position[0], position[1]]
        }

        return Object.freeze({
            draw,
            press,
            update,
            reportLocation
        })
    }
}
