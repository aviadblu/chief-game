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
import playerImg from "./assets/aviad-linoy.png";
import enemyImg from "./assets/chief.png";
import snackImg from "./assets/lolipop.png";

const canvas = makeCanvas(800);
const canvasWrapper = makeCanvasWrapper();
const ctx = canvas.getContext('2d');
const utils = makeUtils()()
const stateManager = makeStateManager(utils)()
const frameDrawManager = makeFrameDrawManager(canvas.width, canvas.height, ctx)()
const timerBar = makeTimerBar(canvas.width, canvas.height, ctx)()
const snacksCollectedBar = makeSnacksCollectedBar(canvas.width, canvas.height, ctx)()
const controller = makeController(canvas.width, canvas.height, ctx, utils, stateManager, frameDrawManager, timerBar, snacksCollectedBar)()
const player = makePlayer(canvas.width, canvas.height, ctx, playerImg)
const enemy = makeEnemy(canvas.width, canvas.height, ctx, enemyImg)
const snack = makeSnack(canvas.width, canvas.height, ctx, snackImg)

canvasWrapper.appendChild(canvas);
document.body.appendChild(canvasWrapper)

controller.registerPlayer(player)
controller.registerEnemy(enemy)
controller.registerSnack(snack)



controller.start()