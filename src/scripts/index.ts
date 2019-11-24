import {ScreenHandler} from "./io/output/screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./math/Vector3";
import {Settings} from "./io/output/screen/Settings";
import {KeyboardBinder} from "./io/input/keyboard/KeyboardBinder";
import {Camera} from "./Camera/Camera";
import {KeyboardInputData} from "./io/input/keyboard/KeyboardInputData";
import {FileLoader} from "./io/input/file/FileLoader";
import {ObjLoader} from "./io/input/mesh/ObjLoader";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardBinder.registerKeyBindings();

    const camera = new Camera();
    camera.setLookAt(KeyboardInputData.lookAt, KeyboardInputData.target, new Vector3(0, 1, 0));
    camera.setPerspective(45, 16/9, 0.1, 100);

    const objText = FileLoader.loadFile("resources/models/teapot.obj");
    const meshLoader = new ObjLoader();
    const objMesh = meshLoader.loadMesh(objText);

    objMesh.transform.scale(new Vector3(0.4, 0.4, 0.4));

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [objMesh], camera);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

