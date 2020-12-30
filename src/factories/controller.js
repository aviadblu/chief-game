export function makeController(canvasW, canvasH, ctx) {
    return function () {
        let timeElapsed = 0;
        let timerInterval;
        let registeredAsyncCb = {}
        let snacks = {}


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
            registeredAsyncCb[makeId(5)] = {
                every: everySec,
                cb
            }
        }

        function makeId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function addSnack(snack, duration) {
            const id = makeId(5)
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
            startTimer,
            clearTimer,
            getElapsedTime,
            doSomethingEvery,
            addSnack,
            getSnacks
        })
    }
}