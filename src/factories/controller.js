export function makeController(canvasW, canvasH, ctx, utils, stateManager) {

    return function () {
        const gameStatuses = Object.freeze({
            READY: 0,
            RUNNING: 1,
            PAUSED: 2,
            GAMEOVER: 3
        });

        let timerInterval;
        let registeredAsyncCb = {}
        let snacks = {}


        function start() {
            reset()

        }

        function stop() {

        }

        function pause() {

        }

        function reset() {
            stateManager.update({
                gameStatus: gameStatuses.READY,
                timeElapsed: 0,
                player: {
                  position: []
                },
                enemy: {
                    position: []
                },
                snacks: {}
            })
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timeElapsed++;
                Object.keys(registeredAsyncCb).forEach(key => {
                    const el = registeredAsyncCb[key]
                    if (getElapsedTime() % el.every === 0) {
                        el.cb.apply()
                    }
                })
            }, 1000)
        }

        function clearTimer() {
            clearInterval(timerInterval)
            timeElapsed = 0
        }

        function getElapsedTime() {
            return timeElapsed
        }

        function doSomethingEvery(everySec, cb) {
            registeredAsyncCb[utils.makeId(5)] = {
                every: everySec,
                cb
            }
        }

        function addSnack(snack, duration) {
            const id = utils.makeId(5)
            snacks[id] = {
                snack
            }
            setTimeout(() => {
                delete snacks[id]
            }, duration * 1000)
        }

        function getSnacks() {
            return Object.keys(snacks).map(key => snacks[key].snack)
        }

        return Object.freeze({
            start,
            stop,
            pause,
            reset,
            startTimer,
            clearTimer,
            getElapsedTime,
            doSomethingEvery,
            addSnack,
            getSnacks
        })
    }
}
