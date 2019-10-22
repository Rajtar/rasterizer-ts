import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./geometry/Vector3";
import {Triangle} from "./geometry/Triangle";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    targetScreen.setAllPixelsColor(0, 0, 0);

    const a: Vector3 = new Vector3(0.75, 0);
    const b: Vector3 = new Vector3(0.75, 0.5);
    const c: Vector3 = new Vector3(-0.5, 0.6);
    const triangle: Triangle = new Triangle(a, b, c);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, triangle);
    rasterizer.launchRenderLoop();
}

document.addEventListener("DOMContentLoaded", initialize);