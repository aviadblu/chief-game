export function makeController(canvasW, canvasH, ctx, utils, stateManager, frameDrawManager, timerBar, snacksCollectedBar) {

    return function () {
        let player, enemy, createSnack
        const gameStatuses = Object.freeze({
            READY: 0,
            RUNNING: 1,
            PAUSED: 2,
            GAMEOVER: 3
        });

        let timerInterval;
        let registeredAsyncCb = {}
        let centerPoint = [canvasW / 2, canvasH / 2]


        function registerPlayer(playerObj) {
            player = playerObj([centerPoint[0] - 300, centerPoint[1]])
        }

        function registerEnemy(enemyObj) {
            enemy = enemyObj([centerPoint[0] + 300, centerPoint[1]])
        }

        function registerSnack(snackObj) {
            createSnack = snackObj
        }

        function ready() {
            registerKeyboardEvents((key, type) => {
                player.press(key, type);
            })
            stateManager.update({
                gameStatus: gameStatuses.READY
            })
        }

        function start() {
            reset()
            stateManager.update({
                gameStatus: gameStatuses.RUNNING
            })
            startTimer()


            doSomethingEvery(3, () => {
                const randX = utils.getRandomArbitrary(0, canvasW);
                const randY = utils.getRandomArbitrary(0, canvasH);
                const snack = createSnack([randX, randY], Math.floor(utils.getRandomArbitrary(50, 150)))
                addSnack(snack, 20)
            })

            frameDrawManager.onFrameCbRegister(() => {

                if (checkLoose(player.reportLocation(), enemy.reportLocation())) {
                    loose()
                }
                player.draw()
                player.update()
                enemy.draw()
                enemy.updateMoveDirectionPoint(player.reportLocation())
                enemy.update()

                getSnacks().forEach((snack) => {
                    const collected = snack.checkIfSnackCollected(player.reportRect())
                    if (collected)
                        increaseCollectedSnacks()
                    snack.draw()
                })

                timerBar.draw(`Time: ${getElapsedTime()}`)
                snacksCollectedBar.draw(`${stateManager.getState()['collectedSnacks']} Snacks collected`)

            })
            frameDrawManager.start()
        }

        function stop() {
            clearTimer()
            stateManager.update({
                gameStatus: gameStatuses.RUNNING
            })
        }

        function pause() {
            if (stateManager.getState()['gameStatus'] === gameStatuses.RUNNING) {
                stateManager.update({
                    gameStatus: gameStatuses.PAUSED
                })
                clearTimer()
                frameDrawManager.stop()
            } else if (stateManager.getState()['gameStatus'] === gameStatuses.PAUSED) {
                stateManager.update({
                    gameStatus: gameStatuses.RUNNING
                })
                startTimer()
                frameDrawManager.start()
            }
        }

        function registerKeyboardEvents(cb) {
            addEventListener('keydown', (event) => {
                cb(event.key, 1)
            })

            addEventListener('keyup', (event) => {
                cb(event.key, 0)
            })

            addEventListener('keydown', (event) => {
                if (event.key === "Pause")
                    pause()
            })

            addEventListener('keydown', (event) => {
                if (event.key === " ") {

                    if ([gameStatuses.RUNNING, gameStatuses.PAUSED].includes(stateManager.getState()['gameStatus'])) {
                        pause()
                    }

                    if ([gameStatuses.READY, gameStatuses.GAMEOVER].includes(stateManager.getState()['gameStatus'])) {
                        start()
                    }
                }
            })

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
                snacks: {},
                collectedSnacks: 0
            })
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                stateManager.update({timeElapsed: getElapsedTime() + 1})
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
        }

        function getElapsedTime() {
            return stateManager.getState()['timeElapsed']
        }

        function doSomethingEvery(everySec, cb) {
            registeredAsyncCb[utils.makeId(5)] = {
                every: everySec,
                cb
            }
        }

        function addSnack(snack, duration) {
            const id = utils.makeId(5)
            const snacks = stateManager.getState()['snacks']
            snacks[id] = {
                snack
            }
            stateManager.update({snacks})

            setTimeout(() => {
                const snacks = stateManager.getState()['snacks']
                delete snacks[id]
                stateManager.update(snacks)
            }, duration * 1000)
        }

        function getSnacks() {
            const snacks = stateManager.getState()['snacks']
            return Object.keys(snacks).map(key => snacks[key].snack)
        }

        function increaseCollectedSnacks() {
            stateManager.update({
                collectedSnacks: stateManager.getState()['collectedSnacks'] + 1
            })
        }

        function checkLoose(playerVec, enemyVec) {
            const distance = Math.sqrt(Math.pow((playerVec[0] - enemyVec[0]), 2) + Math.pow((playerVec[1] - enemyVec[1]), 2))
            return distance < 80
        }

        function loose() {
            frameDrawManager.stop()
        }

        return Object.freeze({
            registerPlayer,
            registerEnemy,
            registerSnack,
            ready
        })
    }
}
