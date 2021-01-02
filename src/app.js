import "./scss/main.scss";
import {makeUtils} from "./factories/utils";
import {makeStateManager} from "./services/stateManager";
import {makeController} from "./services/controller";
import {makeFrameDrawManager} from "./services/frameDrawManager";
import {makeCanvas, makeCanvasWrapper} from "./factories/domFactory"
import {makePlayer} from "./factories/player"
import {makeEnemy} from "./factories/enemy"
import {makeSnack} from "./factories/snack";
import {makeTimerBar} from "./factories/timerBar";
import {makeSnacksCollectedBar} from "./factories/snacksCollectedBar";
import {makeRouter} from "./services/router";
import {makeHomePage} from "./views/homepage";
import {makeGamePage} from "./views/game";
import deanImg from "./assets/dean.png";
import julImg from "./assets/jul.png";
import deanJulImg from "./assets/dean-jul.png";
import aviadLinoyImg from "./assets/aviad-linoy.png";

import enemyImg from "./assets/chief.png";
import snackImg1 from "./assets/lolipop.png";
import snackImg2 from "./assets/candy1.png";
import snackImg3 from "./assets/candy2.png";
import snackImg4 from "./assets/candy3.png";
import snackImg5 from "./assets/candy4.png";

import bg1 from "./assets/bg-rainbow.png"
import bg2 from "./assets/bg2.jpg"
import bg3 from "./assets/bg3.jpg"

const backgroundOptions = [bg1, bg2, bg3]
const playerOptions = [deanImg, julImg, deanJulImg, aviadLinoyImg]
const enemyOptions = [enemyImg]

const router = makeRouter()()
router.setRoute(makeHomePage(playerOptions, enemyOptions, backgroundOptions, startGame)())

function init(playerImg, enemyImg, snacksImg) {
    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext('2d');
    const utils = makeUtils()()
    const stateManager = makeStateManager(utils)()
    const frameDrawManager = makeFrameDrawManager(canvas.width, canvas.height, ctx)()
    const timerBar = makeTimerBar(canvas.width, canvas.height, ctx)()
    const snacksCollectedBar = makeSnacksCollectedBar(canvas.width, canvas.height, ctx)()
    const controller = makeController(canvas.width, canvas.height, ctx, utils, stateManager, frameDrawManager, timerBar, snacksCollectedBar)()
    const player = makePlayer(canvas.width, canvas.height, ctx, utils, playerImg, 100, 5)
    const enemy = makeEnemy(canvas.width, canvas.height, ctx, utils, enemyImg, 100, 0.8)
    const snack = makeSnack(canvas.width, canvas.height, ctx, utils, snacksImg)

    controller.registerPlayer(player)
    controller.registerEnemy(enemy)
    controller.registerSnack(snack)

    controller.ready()
}

function startGame(bgImage, enemyImg, deanImg) {
    router.setRoute(makeGamePage(makeCanvas, bgImage)())
    init(enemyImg, deanImg, [snackImg1, snackImg2, snackImg3, snackImg4, snackImg5])
}
