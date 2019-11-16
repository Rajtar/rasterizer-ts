import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./geometry/Vector3";
import {Triangle} from "./geometry/Triangle";
import {Color} from "./screen/Color";
import {Settings} from "./screen/Settings";
import {VertexProcessor} from "./geometry/VertexProcessor";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;

    const red: Color = new Color(255, 0, 0);
    const green: Color = new Color(0, 255, 0);
    const blue: Color = new Color(0, 0, 255);

    const vp = new VertexProcessor();
    vp.setLookAt(new Vector3(0, 0, -5), new Vector3(0, 0,0), new Vector3(0, 1, 0));
    vp.setPerspective(45, 1, 0.1, 100);

    const a1: Vector3 = vp.transform(new Vector3(0.75, 0, 0.5));
    const b1: Vector3 = vp.transform(new Vector3(0.75, 0.5, 0.5));
    const c1: Vector3 = vp.transform(new Vector3(-0.5, 0.6, 0.5));
    const triangle1: Triangle = new Triangle(c1, b1, a1, red, green, blue);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [triangle1]);
    rasterizer.launchRenderLoop();
}

document.addEventListener("DOMContentLoaded", initialize);