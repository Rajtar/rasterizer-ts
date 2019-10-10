import {RasterizerScreen} from "./RasterizerScreen";

document.addEventListener("DOMContentLoaded", initialize);

let targetScreen: RasterizerScreen;
let lastCalledTime: DOMHighResTimeStamp;
let fps: number;

function initialize() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("screenCanvas");
    targetScreen = new RasterizerScreen(canvas);

    targetScreen.setAllPixelsColor(0, 0, 0);
    launchRenderLoop();
}

function launchRenderLoop() {
    render();
    window.requestAnimationFrame(launchRenderLoop);
}

function calculateFps() : number {
    if (!lastCalledTime) {
        lastCalledTime = performance.now();
        fps = 0;
    }
    let delta = (performance.now() - lastCalledTime) / 1000;
    lastCalledTime = performance.now();
    return Math.round(1 / delta);
}

function render() {
    const array = new Uint8ClampedArray(1600*900*4);
    for(let i=0; i < array.length; i++) {
        array[i] = 255;
    }
    targetScreen.setPixelsFromBuffer(array);
    targetScreen.setFpsDisplay(calculateFps());
}