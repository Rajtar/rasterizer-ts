import {RasterizerScreen} from "./RasterizerScreen";

document.addEventListener("DOMContentLoaded", initialize);

var targetScreen: RasterizerScreen;
var lastX: number;
var lastY: number;

function initialize() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("screenCanvas");
    targetScreen = new RasterizerScreen(canvas);

    targetScreen.setAllPixelsColor(0, 0, 0);

    lastX = getRandomInt(0, targetScreen.width);
    lastY = getRandomInt(0, targetScreen.height);
    launchRenderLoop();
}

function launchRenderLoop() {

    render();
    window.requestAnimationFrame(launchRenderLoop);
}

function render() {
    let newX: number = lastX + getRandomDirection();
    let newY: number = lastY + getRandomDirection();

    while (newX == lastX && newY == lastY) {
        newX = lastX + getRandomDirection();
        newY = lastY + getRandomDirection();
    }

    targetScreen.setPixelColor(newX, newY, getRandomColor(), getRandomColor(), getRandomColor());
    lastX = newX;
    lastY = newY;
}

function getRandomColor() {
    return getRandomInt(0, 255);
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomDirection() {
    let min = Math.ceil(-1);
    let max = Math.floor(2);
    return Math.floor(Math.random() * (max - min)) + min;
}