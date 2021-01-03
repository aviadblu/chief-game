import "./scss/main.scss";
import {makeUtils} from "./factories/utils";
import {makeStateManager} from "./services/stateManager";
import {makeController} from "./services/controller";
import {makeFrameDrawManager} from "./services/frameDrawManager";
import {makeCanvas} from "./factories/domFactory"
import {makePlayer} from "./factories/player"
import {makeEnemy} from "./factories/enemy"
import {makeSnack} from "./factories/snack";
import {makeTimerBar} from "./factories/timerBar";
import {makeSnacksCollectedBar} from "./factories/snacksCollectedBar";
import {makeRouter} from "./services/router";
import {makeHomePage} from "./views/homepage";
import {makeGamePage} from "./views/game";

import {makeHomePackage} from "./ui-packages/home-package";
import {makeTier4Package} from "./ui-packages/tier4-package";

const uiPackage = makeTier4Package()()

const router = makeRouter()()
router.setRoute(makeHomePage(uiPackage.getPlayerImages(), uiPackage.getEnemyImages(), uiPackage.getBgImages(), startGame)())

function init(playerImg, enemyImg, snacksImg, enemySpeed, playerSpeed) {
    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext('2d');
    const utils = makeUtils()()
    const stateManager = makeStateManager(utils)()
    const frameDrawManager = makeFrameDrawManager(canvas.width, canvas.height, ctx)()
    const timerBar = makeTimerBar(canvas.width, canvas.height, ctx)()
    const snacksCollectedBar = makeSnacksCollectedBar(canvas.width, canvas.height, ctx)()
    const controller = makeController(canvas.width, canvas.height, ctx, utils, stateManager, frameDrawManager, timerBar, snacksCollectedBar)()
    const player = makePlayer(canvas.width, canvas.height, ctx, utils, playerImg, 100, playerSpeed)
    const enemy = makeEnemy(canvas.width, canvas.height, ctx, utils, enemyImg, 100, enemySpeed)
    const snack = makeSnack(canvas.width, canvas.height, ctx, utils, snacksImg)

    controller.registerPlayer(player)
    controller.registerEnemy(enemy)
    controller.registerSnack(snack)

    controller.ready()
}

function startGame(bgImage, enemyImg, deanImg) {
    router.setRoute(makeGamePage(makeCanvas, bgImage)())
    init(enemyImg, deanImg, uiPackage.getSnacksImages(), 1.4, 10)
}
