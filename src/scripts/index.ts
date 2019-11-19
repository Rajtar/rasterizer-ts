import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./geometry/Vector3";
import {Triangle} from "./geometry/Triangle";
import {Color} from "./screen/Color";
import {Settings} from "./screen/Settings";
import {KeyboardInput} from "./Input/KeyboardInput";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardInput.registerKeyBindings();

    const red: Color = new Color(255, 0, 0);
    const green: Color = new Color(0, 255, 0);
    const blue: Color = new Color(0, 0, 255);

    const a1: Vector3 = new Vector3(0.75, 0, 0.5);
    const b1: Vector3 = new Vector3(0.75, 0.5, 0.5);
    const c1: Vector3 = new Vector3(-0.5, 0.6, 0.5);
    const triangle1: Triangle = new Triangle(a1, b1, c1, red, green, blue);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [triangle1]);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

