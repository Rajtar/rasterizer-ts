import {RasterizerScreen} from "./RasterizerScreen";
import {Rasterizer} from "./Rasterizer";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new RasterizerScreen(canvas);
    targetScreen.setAllPixelsColor(0, 0, 0);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen);
    rasterizer.launchRenderLoop()
}

document.addEventListener("DOMContentLoaded", initialize);