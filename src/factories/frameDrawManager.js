export function makeFrameDrawManager(canvasW, canvasH, ctx) {

    return function () {
        let drawCb
        let stopFlag = false

        function drawFrame() {
            if(stopFlag)
                return
            requestAnimationFrame(drawFrame)
            ctx.clearRect(0, 0, canvasW, canvasH)
            drawCb.call()
        }


        function start() {
            stopFlag = false
            drawFrame()
        }

        function stop() {
            stopFlag = true
        }


        function onFrameCbRegister(cb) {
            drawCb = cb
        }


        return Object.freeze({
            onFrameCbRegister,
            start,
            stop
        })
    }
}
