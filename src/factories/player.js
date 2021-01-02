export function makePlayer(canvasW, canvasH, ctx, utils, image, size, speed) {
    const img = new Image()
    img.src = image

    return function (position) {
        const keyPressMap = {
            'ArrowUp': 0,
            'ArrowDown': 0,
            'ArrowRight': 0,
            'ArrowLeft': 0
        }

        const playerCenter = size / 2
        const minX = playerCenter
        const maxX = canvasW - playerCenter
        const minY = playerCenter
        const maxY = canvasH - playerCenter

        let rect = utils.rect(position[0] - playerCenter, position[1] - playerCenter, size, size)()

        function draw() {
            ctx.drawImage(img, position[0] - playerCenter, position[1] - playerCenter, size, size)
        }

        function press(key, isPressed) {
            if (keyPressMap.hasOwnProperty(key))
                keyPressMap[key] = isPressed ? 1 : 0
        }

        function update() {
            if (keyPressMap.ArrowUp)
                position[1] = position[1] - speed
            if (keyPressMap.ArrowDown)
                position[1] = position[1] + speed
            if (keyPressMap.ArrowRight)
                position[0] = position[0] + speed
            if (keyPressMap.ArrowLeft)
                position[0] = position[0] - speed
            fixBoundaries()
            rect = utils.rect(position[0] - playerCenter, position[1] - playerCenter, size, size)()
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

        function reportRect() {
            return rect.getRect()
        }

        return Object.freeze({
            draw,
            press,
            update,
            reportLocation,
            reportRect
        })
    }
}
