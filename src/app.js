import "./scss/main.scss";
import {makeUtils} from "./factories/utils";
import {makeStateManager} from "./factories/stateManager";
import {makeController} from "./factories/controller";
import {makeFrameDrawManager} from "./factories/frameDrawManager";
import {makeCanvas, makeCanvasWrapper} from "./factories/domFactory"
import {makePlayer} from "./factories/player"
import {makeEnemy} from "./factories/enemy"
import {makeSnack} from "./factories/snack";
import {makeTimerBar} from "./factories/timerBar";
import {makeSnacksCollectedBar} from "./factories/snacksCollectedBar";
import playerImg from "./assets/dean.png";
import enemyImg from "./assets/chief.png";
import snackImg1 from "./assets/lolipop.png";
import snackImg2 from "./assets/candy1.png";
import snackImg3 from "./assets/candy2.png";

const canvas = makeCanvas();
const canvasWrapper = makeCanvasWrapper();
const ctx = canvas.getContext('2d');
const utils = makeUtils()()
const stateManager = makeStateManager(utils)()
const frameDrawManager = makeFrameDrawManager(canvas.width, canvas.height, ctx)()
const timerBar = makeTimerBar(canvas.width, canvas.height, ctx)()
const snacksCollectedBar = makeSnacksCollectedBar(canvas.width, canvas.height, ctx)()
const controller = makeController(canvas.width, canvas.height, ctx, utils, stateManager, frameDrawManager, timerBar, snacksCollectedBar)()
const player = makePlayer(canvas.width, canvas.height, ctx, utils, playerImg, 100, 5)
const enemy = makeEnemy(canvas.width, canvas.height, ctx, utils, enemyImg, 100, 1.5)
const snack = makeSnack(canvas.width, canvas.height, ctx, utils, [snackImg1, snackImg2, snackImg3])

canvasWrapper.appendChild(canvas);
document.body.appendChild(canvasWrapper)

controller.registerPlayer(player)
controller.registerEnemy(enemy)
controller.registerSnack(snack)

controller.ready()