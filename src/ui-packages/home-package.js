import bg1 from "../assets/home/bg-rainbow.png"
import bg2 from "../assets/home/bg2.jpg"
import bg3 from "../assets/home/bg3.jpg"

import enemyImg from "../assets/home/chief.png";

import deanImg from "../assets/home/dean.png";
import julImg from "../assets/home/jul.png";
import deanJulImg from "../assets/home/dean-jul.png";
import aviadLinoyImg from "../assets/home/aviad-linoy.png";

import snackImg1 from "../assets/home/lolipop.png";
import snackImg2 from "../assets/home/candy1.png";
import snackImg3 from "../assets/home/candy2.png";
import snackImg4 from "../assets/home/candy3.png";
import snackImg5 from "../assets/home/candy4.png";

export function makeHomePackage() {
    return function () {


        function getBgImages() {
            return [bg1, bg2, bg3]
        }


        function getEnemyImages() {
            return [enemyImg]
        }

        function getPlayerImages() {
            return [deanImg, julImg, deanJulImg, aviadLinoyImg]
        }

        function getSnacksImages() {
            return [snackImg1, snackImg2, snackImg3, snackImg4, snackImg5]
        }


        return Object.freeze({
            getBgImages,
            getPlayerImages,
            getSnacksImages,
            getEnemyImages
        })
    }
}