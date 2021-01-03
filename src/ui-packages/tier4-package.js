import bg1 from "../assets/tier4/bg.jpg"

import enemyImg from "../assets/tier4/salo.png";

import yuvalImg from "../assets/tier4/yuval.png";

import snackImg1 from "../assets/tier4/bug.png";


export function makeTier4Package() {
    return function () {


        function getBgImages() {
            return [bg1]
        }


        function getEnemyImages() {
            return [enemyImg]
        }

        function getPlayerImages() {
            return [yuvalImg]
        }

        function getSnacksImages() {
            return [snackImg1]
        }


        return Object.freeze({
            getBgImages,
            getPlayerImages,
            getSnacksImages,
            getEnemyImages
        })
    }
}