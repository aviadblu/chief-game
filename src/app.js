import "./scss/main.scss";
import {makeCanvas, makeCanvasWrapper} from "./factories/domFactory"
import {makePlayer} from "./factories/player"
import {makeEnemy} from "./factories/enemy"
import {makeSnack} from "./factories/snack";
import {makeController} from "./factories/controller";
import {makeTimerBar} from "./factories/timerBar";
import {makeSnacksCollectedBar} from "./factories/snacksCollectedBar";
import playerImg from "./assets/aviad-linoy.png";
import enemyImg from "./assets/chief.png";
import snackImg from "./assets/lolipop.png";


function Start() {
    let stopFlag = false;
    let collectedSnacks = 0;
    const canvas = makeCanvas(800);
    const canvasWrapper = makeCanvasWrapper();
    canvasWrapper.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const controller = makeController(canvas.width, canvas.height, ctx)()
    controller.startTimer()

    const x = canvas.width / 2
    const y = canvas.height / 2
    document.body.appendChild(canvasWrapper)
    const player = makePlayer(canvas.width, canvas.height, ctx, playerImg)(x - 300, y)
    const enemy = makeEnemy(canvas.width, canvas.height, ctx, enemyImg)(x + 300, y)
    const timerBar = makeTimerBar(canvas.width, canvas.height, ctx)()
    const snacksCollectedBar = makeSnacksCollectedBar(canvas.width, canvas.height, ctx)()

    addEventListener('keydown', (event) => {
        player.press(event.key, 1);
    })

    addEventListener('keyup', (event) => {
        player.press(event.key, 0);
    })

    const updateChaseOnFrame = 1;
    let frameCounter = 0

    controller.doSomethingEvery(3, () => {
        addSnack(20)
    })

    function drawFrame() {
        if (stopFlag)
            return
        frameCounter++;
        if (checkLoose(player.reportLocation(), enemy.reportLocation())) {
            stop()
            return
        }
        requestAnimationFrame(drawFrame)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.draw()
        player.update()
        enemy.draw()
        if (frameCounter % updateChaseOnFrame === 0)
            enemy.updateMoveDirectionPoint(player.reportLocation())
        timerBar.draw(`Time: ${controller.getElapsedTime()}`)
        enemy.update()

        controller.getSnacks().forEach((snack) => {
            const collected = snack.checkIfSnackCollected(player.reportLocation())
            if (collected)
                collectedSnacks++
            snack.draw()
        })

        snacksCollectedBar.draw(`${collectedSnacks} Snacks collected`)
    }

    drawFrame()

    function stop() {
        console.log("Stop!")
        controller.clearTimer()
        stopFlag = true;
    }

    function checkLoose(playerVec, enemyVec) {
        const distance = Math.sqrt(Math.pow((playerVec[0] - enemyVec[0]), 2) + Math.pow((playerVec[1] - enemyVec[1]), 2))
        return distance < 80
    }

    function checkSnackHit(playerVec, snacks) {

    }

    function addSnack(duration) {
        const randX = getRandomArbitrary(0, canvas.width);
        const randY = getRandomArbitrary(0, canvas.height);
        const snack = makeSnack(canvas.width, canvas.height, ctx)(randX, randY, snackImg, 100)
        controller.addSnack(snack, duration)
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    return Object.freeze({
        stop
    })
}

const game = Start()

//setTimeout(game.stop, 5000)


