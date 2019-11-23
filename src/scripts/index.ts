import {ScreenHandler} from "./screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./math/Vector3";
import {Triangle} from "./geometry/Triangle";
import {Color} from "./screen/Color";
import {Settings} from "./screen/Settings";
import {KeyboardBinder} from "./Input/KeyboardBinder";
import {Camera} from "./Camera/Camera";
import {KeyboardInputData} from "./Input/KeyboardInputData";
import {Mesh} from "./geometry/Mesh";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardBinder.registerKeyBindings();

    const red: Color = new Color(255, 0, 0);
    const green: Color = new Color(0, 255, 0);
    const blue: Color = new Color(0, 0, 255);

    const a1: Vector3 = new Vector3(0, 0.0, 0);
    const b1: Vector3 = new Vector3(0.5, 0.0, 0);
    const c1: Vector3 = new Vector3(0.5, 0.5, 0);
    const lowerFront: Triangle = new Triangle(a1, b1, c1, red, green, blue);

    const a2: Vector3 = new Vector3(0, 0.0, 0);
    const b2: Vector3 = new Vector3(0.5, 0.5, 0);
    const c2: Vector3 = new Vector3(0, 0.5, 0);
    const upperFront: Triangle = new Triangle(a2, b2, c2, red, green, blue);

    const a3: Vector3 = new Vector3(0.5, 0, -0.5);
    const b3: Vector3 = new Vector3(0.5, 0, 0);
    const c3: Vector3 = new Vector3(0, 0, 0);
    const closerBottom: Triangle = new Triangle(a3, b3, c3, red, green, blue);

    const a4: Vector3 = new Vector3(0, 0, -0.5);
    const b4: Vector3 = new Vector3(0.5, 0, -0.5);
    const c4: Vector3 = new Vector3(0, 0, 0);
    const fartherBottom: Triangle = new Triangle(a4, b4, c4, red, green, blue);

    const a5: Vector3 = new Vector3(0, 0.5, 0);
    const b5: Vector3 = new Vector3(0.5, 0.5, 0);
    const c5: Vector3 = new Vector3(0.5, 0.5, -0.5);
    const closerTop: Triangle = new Triangle(a5, b5, c5, red, green, blue);

    const a6: Vector3 = new Vector3(0, 0.5, 0);
    const b6: Vector3 = new Vector3(0.5, 0.5, -0.5);
    const c6: Vector3 = new Vector3(0, 0.5, -0.5);
    const fartherTop: Triangle = new Triangle(a6, b6, c6, red, green, blue);

    const a7: Vector3 = new Vector3(0.5, 0.5, -0.5);
    const b7: Vector3 = new Vector3(0.5, 0.0, -0.5);
    const c7: Vector3 = new Vector3(0, 0.0, -0.5);
    const lowerBack: Triangle = new Triangle(a7, b7, c7, red, green, blue);

    const a8: Vector3 = new Vector3(0, 0.5, -0.5);
    const b8: Vector3 = new Vector3(0.5, 0.5, -0.5);
    const c8: Vector3 = new Vector3(0, 0.0, -0.5);
    const upperBack: Triangle = new Triangle(a8, b8, c8, red, green, blue);

    const a9: Vector3 = new Vector3(0, 0, -0.5);
    const b9: Vector3 = new Vector3(0, 0, 0);
    const c9: Vector3 = new Vector3(0, 0.5, 0);
    const lowerLeft: Triangle = new Triangle(a9, b9, c9, red, green, blue);

    const a10: Vector3 = new Vector3(0, 0, -0.5);
    const b10: Vector3 = new Vector3(0, 0.5, 0);
    const c10: Vector3 = new Vector3(0, 0.5, -0.5);
    const upperLeft: Triangle = new Triangle(a10, b10, c10, red, green, blue);

    const a11: Vector3 = new Vector3(0.5, 0.5, 0);
    const b11: Vector3 = new Vector3(0.5, 0, 0);
    const c11: Vector3 = new Vector3(0.5, 0, -0.5);
    const lowerRight: Triangle = new Triangle(a11, b11, c11, red, green, blue);

    const a12: Vector3 = new Vector3(0.5, 0.5, -0.5);
    const b12: Vector3 = new Vector3(0.5, 0.5, 0);
    const c12: Vector3 = new Vector3(0.5, 0, -0.5);
    const upperRight: Triangle = new Triangle(a12, b12, c12, red, green, blue);


    const camera = new Camera();
    camera.setLookAt(KeyboardInputData.lookAt, KeyboardInputData.target, new Vector3(0, 1, 0));
    camera.setPerspective(45, 16 / 9, 0.1, 100);

    // triangle.transform.scale(new Vector3(1, 1, 1));
    // triangle.transform.rotate(new Vector3(1, 0, 0), 1);
    // triangle.transform.translate(new Vector3(0, 1, 0));
    // triangle2.transform.translate(new Vector3(0, 1, 0));

    const cube = new Mesh([lowerFront, upperFront, closerBottom, fartherBottom, closerTop, fartherTop, lowerBack, upperBack, lowerLeft, upperLeft, lowerRight, upperRight]);
    cube.transform.scale(new Vector3(2, 2, 2));

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [cube], camera);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

