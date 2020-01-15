import {ScreenHandler} from "./io/output/screen/ScreenHandler";
import {Rasterizer} from "./Rasterizer";
import {Vector3} from "./math/Vector3";
import {Settings} from "./io/output/screen/Settings";
import {KeyboardBinder} from "./io/input/keyboard/KeyboardBinder";
import {Camera} from "./camera/Camera";
import {KeyboardInputData} from "./io/input/keyboard/KeyboardInputData";
import {FileLoader} from "./io/input/file/FileLoader";
import {ObjLoader} from "./io/input/mesh/ObjLoader";
import {PointLight} from "./light/PointLight";
import {LightIntensity} from "./light/LightIntensity";
import {DirectionalLight} from "./light/DirectionalLight";
import {DrawableObject} from "./geometry/DrawableObject";

function constructMeshes(): DrawableObject[] {
    const meshLoader = new ObjLoader();

    const monkeyMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/monkey.obj"));
    monkeyMesh.transform.scale(new Vector3(0.75, 0.75, 0.75));

    const cubeMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/cube.obj"));
    cubeMesh.transform.scale(new Vector3(0.5, 0.5, 0.5));
    cubeMesh.transform.translate(new Vector3(1.75, -1.25, -0.25));

    const octahedronMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/octahedron.obj"));
    octahedronMesh.transform.scale(new Vector3(0.3, 0.3, 0.3));
    octahedronMesh.transform.translate(new Vector3(-2, 1, 0));

    const dodecahedronMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/dodecahedron.obj"));
    dodecahedronMesh.transform.scale(new Vector3(0.3, 0.3, 0.3));
    dodecahedronMesh.transform.translate(new Vector3(-2, -1, 0));

    const tetrahedronMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/tetrahedron.obj"));
    tetrahedronMesh.transform.scale(new Vector3(0.3, 0.3, 0.3));
    tetrahedronMesh.transform.translate(new Vector3(2, 1, 0));

    const sphereMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/sphere.obj"));
    sphereMesh.transform.scale(new Vector3(0.015, 0.015, 0.015));
    sphereMesh.transform.translate(new Vector3(-2, 0, 0));

    const icosahedronMesh = meshLoader.loadMesh(FileLoader.loadFile("resources/models/icosahedron.obj"));
    icosahedronMesh.transform.scale(new Vector3(0.5, 0.5, 0.5));
    icosahedronMesh.transform.translate(new Vector3(2, 0, 0));
    return [monkeyMesh, cubeMesh, octahedronMesh, dodecahedronMesh, tetrahedronMesh, sphereMesh, icosahedronMesh];
}

function initialize(): void {
    const canvas: HTMLCanvasElement = document.getElementById("screenCanvas") as HTMLCanvasElement;
    const targetScreen = new ScreenHandler(canvas);
    Settings.screenWidth = canvas.width;
    Settings.screenHeight = canvas.height;
    KeyboardBinder.registerKeyBindings();

    const camera = new Camera();
    camera.setLookAt(KeyboardInputData.cameraPosition, KeyboardInputData.cameraTarget, new Vector3(0, 1, 0));
    camera.setPerspective(45, 16/9, 0.1, 100);

    const ambientLightColor = new LightIntensity(0, 0, 0);
    const specularLightColor = new LightIntensity(0.2, 0.2, 0.2);
    const light1 = new PointLight(KeyboardInputData.lightPosition, ambientLightColor, new LightIntensity(1, 0, 0), specularLightColor, 20);
    const light2 = new PointLight( new Vector3(-3, 0, 1.5), ambientLightColor, new LightIntensity(0, 0, 1), specularLightColor, 20);
    const light3 = new DirectionalLight( new Vector3(0, 1, 0), ambientLightColor, new LightIntensity(0.5, 0.5, 0.5), new LightIntensity(0.05, 0.05, 0.05), 20);

    const lights = [light1, light2, light3];
    const drawableObjects = constructMeshes();
    const rasterizer: Rasterizer = new Rasterizer(targetScreen, drawableObjects, lights, camera);
    rasterizer.update();
}

document.addEventListener("DOMContentLoaded", initialize);

