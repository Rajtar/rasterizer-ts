import {ScreenHandler} from "./io/output/screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./math/Vector3";
import {Settings} from "./io/output/screen/Settings";
import {KeyboardBinder} from "./io/input/keyboard/KeyboardBinder";
import {Camera} from "./camera/Camera";
import {KeyboardInputData} from "./io/input/keyboard/KeyboardInputData";
import {FileLoader} from "./io/input/file/FileLoader";
import {ObjLoader} from "./io/input/mesh/ObjLoader";
import {DirectionalLight} from "./light/DirectionalLight";
import {Color} from "./camera/Color";
import {PointLight} from "./light/PointLight";

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardBinder.registerKeyBindings();

    const camera = new Camera();
    camera.setLookAt(KeyboardInputData.cameraPosition, KeyboardInputData.cameraTarget, new Vector3(0, 1, 0));
    camera.setPerspective(45, 16/9, 0.1, 100);

    const objText = FileLoader.loadFile("resources/models/monkey.obj");
    const meshLoader = new ObjLoader();
    const objMesh = meshLoader.loadMesh(objText);

    // objMesh.transform.scale(new Vector3(0.25, 0.25, 0.25));
    // objMesh.transform.translate(new Vector3(0, 0, -10));
    // objMesh.transform.translate(new Vector3(-0.5, -0.5, 0));

    const ambientLightColor = new Color(0, 0, 0);
    const diffuseLightColor = new Color(0.3, 0.3, 0.3);
    const specularLightColor = new Color(0.2, 0.2, 0.2);

    const light = new PointLight(KeyboardInputData.lightPosition, ambientLightColor, diffuseLightColor, specularLightColor, 20);
    const light2 = new PointLight( new Vector3(-3, 0, 3), ambientLightColor, diffuseLightColor, new Color(0.2, 0.2, 0.2), 20);

    const rasterizer: Rasterizer = new Rasterizer(targetScreen, [objMesh], [light], camera);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

