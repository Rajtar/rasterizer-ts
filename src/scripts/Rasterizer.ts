import {ScreenHandler} from "./screen/ScreenHandler";
import {Triangle} from "./geometry/Triangle";
import {ScreenBuffer} from "./screen/ScreenBuffer";
import {Color} from "./screen/Color";
import {Vector3} from "./math/Vector3";
import {Settings} from "./screen/Settings";
import {Camera} from "./Camera/Camera";
import {KeyboardInputData} from "./Input/KeyboardInputData";
import {DrawableObject} from "./geometry/DrawableObject";

export class Rasterizer {

    private readonly targetScreen: ScreenHandler;
    private readonly triangles: Triangle[];
    private readonly camera: Camera;
    private lastCalledTime: DOMHighResTimeStamp;

    constructor(targetScreen: ScreenHandler, drawableObjects: DrawableObject[], camera: Camera) {
        this.targetScreen = targetScreen;
        let accumulatedTriangles: Triangle[] = [];
        for (const drawableObject of drawableObjects) {
            accumulatedTriangles = accumulatedTriangles.concat(drawableObject.toTriangles());
        }
        this.triangles = accumulatedTriangles;
        this.camera = camera;
    }

    public update(): void {
        const objectsToRender = [];
        this.camera.setLookAt(KeyboardInputData.lookAt, KeyboardInputData.target, new Vector3(0, 1, 0));
        for (const object of this.triangles) {
            if (object instanceof Triangle) {
                const triangleObject = object as Triangle;
                objectsToRender.push(this.camera.project(triangleObject));
            }

            /***************************/
            object.transform.scale(new Vector3(KeyboardInputData.scaling, KeyboardInputData.scaling, KeyboardInputData.scaling));
            if (KeyboardInputData.rotationDirection.getMagnitude() != 0) {
                object.transform.rotate(KeyboardInputData.rotationDirection, KeyboardInputData.rotationAngle);
            }
            /***************************/
        }
        this.render(objectsToRender);
        this.targetScreen.setFpsDisplay(this.calculateFps());
        window.requestAnimationFrame(this.update.bind(this));
    }

    private calculateFps(): number {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
        }
        const delta: number = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        return Math.round(1 / delta);
    }

    private render(triangles: Triangle[]): void {
        const screenBuffer = new ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        const depthBuffer: number[] = new Array(this.targetScreen.width * this.targetScreen.height).fill(Number.MAX_SAFE_INTEGER);

        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, Settings.clearColor);

            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);

            for (const triangle of triangles) {
                if (triangle.isIn(screenX, screenY)) {
                    const lambdaCords: Vector3 = triangle.toLambdaCoordinates(screenX, screenY);
                    const depth: number = Rasterizer.calculateDepth(lambdaCords, triangle);
                    if (depth < depthBuffer[i / 4]) {
                        depthBuffer[i / 4] = depth;
                        screenBuffer.setColor(i, Rasterizer.calculateInterpolatedColor(lambdaCords, triangle));
                    }
                }
            }
        }
        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
    }

    private calculateScreenY(i: number): number {
        return Math.floor((i / 4) / this.targetScreen.width);
    }

    private calculateScreenX(i: number): number {
        return (i / 4) % this.targetScreen.width;
    }

    private static calculateDepth(lambdaCords: Vector3, triangle: Triangle): number {
        return lambdaCords.x * triangle.a.z + lambdaCords.y * triangle.b.z + lambdaCords.z * triangle.c.z;
    }

    private static calculateInterpolatedColor(lambdaCords: Vector3, triangle: Triangle): Color {
        const redInterpolated = lambdaCords.x * triangle.aColor.r + lambdaCords.y * triangle.bColor.r + lambdaCords.z * triangle.cColor.r;
        const greenInterpolated = lambdaCords.x * triangle.aColor.g + lambdaCords.y * triangle.bColor.g + lambdaCords.z * triangle.cColor.g;
        const blueInterpolated = lambdaCords.x * triangle.aColor.b + lambdaCords.y * triangle.bColor.b + lambdaCords.z * triangle.cColor.b;
        return new Color(redInterpolated, greenInterpolated, blueInterpolated);
    }

}