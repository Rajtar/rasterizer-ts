import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./math/Vector3";
import {Triangle} from "./geometry/Triangle";
import {Color} from "./screen/Color";
import {Settings} from "./screen/Settings";
import {KeyboardInput} from "./Input/KeyboardInput";
import {Camera} from "./Camera/Camera";
import {CameraSettings} from "./Camera/CameraSettings";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardInput.registerKeyBindings();

    const red: Color = new Color(255, 0, 0);
    const green: Color = new Color(0, 255, 0);
    const blue: Color = new Color(0, 0, 255);

    const a1: Vector3 = new Vector3(0.75, 0, 0);
    const b1: Vector3 = new Vector3(0.75, 0.5, 0);
    const c1: Vector3 = new Vector3(-0.5, 0.6, 0);
    const triangle: Triangle = new Triangle(a1, b1, c1, red, green, blue);

    const camera = new Camera();
    camera.setLookAt(CameraSettings.lookAt, CameraSettings.target, new Vector3(0, 1, 0));
    camera.setPerspective(45, 1, 0.1, 100);

    // triangle.transform.translate(new Vector3(0, 0, -10));
    // triangle.transform.scale(new Vector3(3, 3, 3));
    // triangle.transform.rotate(new Vector3(1, 0, 0), 60);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [triangle], camera);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

