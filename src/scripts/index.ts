import {RasterizerScreen} from "./RasterizerScreen";

document.addEventListener("DOMContentLoaded", initialize);

let targetScreen: RasterizerScreen;
let lastCalledTime: DOMHighResTimeStamp;

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    targetScreen = new RasterizerScreen(canvas);

    targetScreen.setAllPixelsColor(0, 0, 0);
    launchRenderLoop();
}

function launchRenderLoop(): void{
    render();
    window.requestAnimationFrame(launchRenderLoop);
}

function calculateFps(): number {
    if (!lastCalledTime) {
        lastCalledTime = performance.now();
    }
    const delta: number = (performance.now() - lastCalledTime) / 1000;
    lastCalledTime = performance.now();
    return Math.round(1 / delta);
}

function render(): void {
    const array = new Uint8ClampedArray(1600*900*4);
    for(let i=0; i < array.length; i++) {
        array[i] = 200;
    }
    targetScreen.setPixelsFromBuffer(array);
    targetScreen.setFpsDisplay(calculateFps());
}