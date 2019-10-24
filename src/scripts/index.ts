import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./geometry/Vector3";
import {Triangle} from "./geometry/Triangle";
import {Color} from "./screen/Color";
import {Settings} from "./screen/Settings";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;

    const red: Color = new Color(255, 0, 0);
    const green: Color = new Color(0, 255, 0);
    const blue: Color = new Color(0, 0, 255);

    const a1: Vector3 = new Vector3(0.75, 0);
    const b1: Vector3 = new Vector3(0.75, 0.5);
    const c1: Vector3 = new Vector3(-0.5, 0.6);
    const triangle1: Triangle = new Triangle(a1, b1, c1, red, green, blue);

    const a2: Vector3 = new Vector3(0.75, -0.7);
    const b2: Vector3 = new Vector3(0.75, -0.2);
    const c2: Vector3 = new Vector3(0, -0.7);
    const triangle2: Triangle = new Triangle(a2, b2, c2, blue, green, red);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [triangle1, triangle2]);
    rasterizer.launchRenderLoop();
}

document.addEventListener("DOMContentLoaded", initialize);