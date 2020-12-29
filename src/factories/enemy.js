export function makeEnemy(canvasW, canvasH, ctx, image) {
    const moveSpeed = 5;
    const imageSize = 140;
    const img = new Image()
    img.src = image

    let moveDirectionX = 0;
    let moveDirectionY = 0;

    return function (x, y) {
        const center = imageSize / 2
        const minX = center
        const maxX = canvasW - center
        const minY = center
        const maxY = canvasH - center

        function draw() {
            ctx.drawImage(img, x - center, y - center, imageSize, imageSize)
        }

        function vectorNorm(vec) {
            const len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])
            return [vec[0] / len, vec[1] / len]
        }

        function updateMoveDirectionPoint(targetPoint) {
            const directionVec = vectorNorm([x - targetPoint[0], y - targetPoint[1]])
            x = x - directionVec[0] * moveSpeed
            y = y - directionVec[1] * moveSpeed
        }

        function update() {
            x = x + moveDirectionX;
            y = y + moveDirectionY;
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
            draw: draw,
            updateMoveDirectionPoint: updateMoveDirectionPoint,
            update: update,
            reportLocation: reportLocation
        })
    }
}
