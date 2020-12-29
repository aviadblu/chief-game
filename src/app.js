import "./scss/main.scss";
import {makeCanvas, makeCanvasWrapper} from "./factories/domFactory"
import {makePlayer} from "./factories/player"
import {makeEnemy} from "./factories/enemy"
import playerImg from "./assets/jul.png";
import enemyImg from "./assets/chief.png";




function Start() {
    let stopFlag = false;
    const canvas = makeCanvas(800);
    const canvasWrapper = makeCanvasWrapper();
    canvasWrapper.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const x = canvas.width / 2
    const y = canvas.height / 2
    document.body.appendChild(canvasWrapper)
    const player = makePlayer(canvas.width, canvas.height, ctx, playerImg)(x - 300, y)
    const enemy = makeEnemy(canvas.width, canvas.height, ctx, enemyImg)(x + 300, y)


    addEventListener('keydown', (event) => {
        player.press(event.key, 1);
    })

    addEventListener('keyup', (event) => {
        player.press(event.key, 0);
    })

    const updateChaseOnFrame = 1;
    let frameCounter = 0

    function animate() {
        if(stopFlag)
            return
        frameCounter++;
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.draw()
        player.update()
        enemy.draw()
        if (frameCounter % updateChaseOnFrame === 0)
            enemy.updateMoveDirectionPoint(player.reportLocation())
        enemy.update()
        if(checkLoose(player.reportLocation(), enemy.reportLocation()))
            Stop()
    }

    animate()

    function Stop() {
        stopFlag = true;
    }

    function checkLoose(playerVec, enemyVec) {
        const distance = Math.sqrt(Math.pow((playerVec[0] - enemyVec[0]), 2) + Math.pow((playerVec[1] - enemyVec[1]), 2))
        return distance < 80
    }

    return Object.freeze({
        stop: Stop
    })
}

const game = Start()

setTimeout(game.stop, 5000)


