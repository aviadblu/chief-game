export function makePlayer(canvasW, canvasH, ctx, image) {
    const moveSpeed = 10;
    const imageSize = 85;
    const img = new Image()
    img.src = image

    return function (x, y) {
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
            ctx.drawImage(img, x - playerCenter, y - playerCenter, imageSize, imageSize)
        }

        function press(key, isPressed) {
            if (keyPressMap.hasOwnProperty(key))
                keyPressMap[key] = isPressed ? 1 : 0
        }

        function update() {
            if (keyPressMap.ArrowUp)
                y = y - moveSpeed
            if (keyPressMap.ArrowDown)
                y = y + moveSpeed
            if (keyPressMap.ArrowRight)
                x = x + moveSpeed
            if (keyPressMap.ArrowLeft)
                x = x - moveSpeed
            fixBoundaries()
        }

        function fixBoundaries() {
            if (x < minX) x = minX
            if (x > maxX) x = maxX
            if (y < minY) y = minY
            if (y > maxY) y = maxY
        }

        function reportLocation() {
            return [x, y]
        }

        return Object.freeze({
            draw,
            press,
            update,
            reportLocation
        })
    }
}
