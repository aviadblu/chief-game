export function makeEnemy(canvasW, canvasH, ctx, utils, image, size, speed) {
    const img = new Image()
    img.src = image

    let moveDirectionX = 0;
    let moveDirectionY = 0;

    return function (position) {
        const center = size / 2
        const minX = center
        const maxX = canvasW - center
        const minY = center
        const maxY = canvasH - center

        const rect = utils.rect(position[0], position[1], size, size)()

        function draw() {
            ctx.drawImage(img, position[0] - center, position[1] - center, size, size)
        }

        function vectorNorm(vec) {
            const len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])
            return [vec[0] / len, vec[1] / len]
        }

        function updateMoveDirectionPoint(targetPoint) {
            const directionVec = vectorNorm([position[0] - targetPoint[0], position[1] - targetPoint[1]])
            position[0] = position[0] - directionVec[0] * speed
            position[1] = position[1] - directionVec[1] * speed
        }

        function update() {
            position[0] = position[0] + moveDirectionX;
            position[1] = position[1] + moveDirectionY;
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

        function reportRect() {
            return rect.getRect()
        }

        return Object.freeze({
            draw,
            updateMoveDirectionPoint,
            update,
            reportLocation,
            reportRect
        })
    }
}
