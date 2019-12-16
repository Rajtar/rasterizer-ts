import {ScreenHandler} from "./io/output/screen/ScreenHandler";
import {Triangle} from "./geometry/Triangle";
import {ScreenBuffer} from "./io/output/screen/ScreenBuffer";
import {Color} from "./light/Color";
import {Vector3} from "./math/Vector3";
import {Camera} from "./camera/Camera";
import {KeyboardInputData} from "./io/input/keyboard/KeyboardInputData";
import {DrawableObject} from "./geometry/DrawableObject";
import {Light} from "./light/Light";
import {LightIntensity} from "./light/LightIntensity";

export class Rasterizer {

    private readonly targetScreen: ScreenHandler;
    private readonly triangles: Triangle[];
    private readonly lights: Light[];
    private readonly camera: Camera;
    private lastCalledTime: DOMHighResTimeStamp;

    constructor(targetScreen: ScreenHandler, drawableObjects: DrawableObject[], lights: Light[], camera: Camera) {
        this.targetScreen = targetScreen;
        let accumulatedTriangles: Triangle[] = [];
        for (const drawableObject of drawableObjects) {
            accumulatedTriangles = accumulatedTriangles.concat(drawableObject.toTriangles());
        }
        this.triangles = accumulatedTriangles;
        this.lights = lights;
        this.camera = camera;
    }

    public update(): void {
        const trianglesToRender = [];
        this.camera.setLookAt(KeyboardInputData.cameraPosition, KeyboardInputData.cameraTarget, new Vector3(0, 1, 0));
        for (const triangle of this.triangles) {
            const projectedTriangle = this.camera.project(triangle);
            trianglesToRender.push(this.enlightenTriangle(projectedTriangle));

            /***************************/
            triangle.transform.scale(new Vector3(KeyboardInputData.scaling, KeyboardInputData.scaling, KeyboardInputData.scaling));
            if (KeyboardInputData.rotationDirection.getMagnitude() != 0) {
                triangle.transform.rotate(KeyboardInputData.rotationDirection, KeyboardInputData.rotationAngle);
            }
            /***************************/
        }

        this.lights[0].position = KeyboardInputData.lightPosition;

        this.targetScreen.clearScreen();
        this.render(trianglesToRender);
        this.targetScreen.setFpsDisplay(this.calculateFps());
        window.requestAnimationFrame(this.update.bind(this));
    }

    private enlightenTriangle(triangle: Triangle): Triangle {
        let aLightIntensity = new LightIntensity();
        let bLightIntensity = new LightIntensity();
        let cLightIntensity = new LightIntensity();
        for (const light of this.lights) {
            aLightIntensity = aLightIntensity.add(light.calculateVertexLightIntensity(triangle.a, triangle.aNormal));
            bLightIntensity = bLightIntensity.add(light.calculateVertexLightIntensity(triangle.b, triangle.bNormal));
            cLightIntensity = cLightIntensity.add(light.calculateVertexLightIntensity(triangle.c, triangle.cNormal));
        }
        const newAColor = triangle.aColor.multiply(aLightIntensity);
        const newBColor = triangle.bColor.multiply(bLightIntensity);
        const newCColor = triangle.cColor.multiply(cLightIntensity);
        return triangle.withColors(newAColor, newBColor, newCColor);
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

        for (let t = 0, trianglesLength = triangles.length; t < trianglesLength; ++t) {
            const currentTriangle = triangles[t];
            for (let x = currentTriangle.minX; x <= currentTriangle.maxX; ++x) {
                for (let y = currentTriangle.minY; y <= currentTriangle.maxY; ++y) {
                    if (currentTriangle.isIn(x, y)) {
                        const lambdaCords: Vector3 = currentTriangle.toLambdaCoordinates(x, y);
                        const depth: number = Rasterizer.calculateDepth(lambdaCords, currentTriangle);
                        const bufferIndex = this.calculateBufferIndex(x, y);
                        if (depth < depthBuffer[bufferIndex / 4]) {
                            depthBuffer[bufferIndex / 4] = depth;
                            screenBuffer.setColor(bufferIndex, Rasterizer.calculateInterpolatedColor(lambdaCords, currentTriangle));
                        }
                    }
                }
            }
        }

        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
    }

    private calculateBufferIndex(screenX: number, screenY: number): number {
        return Math.floor((screenY * this.targetScreen.width + screenX) * 4);
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