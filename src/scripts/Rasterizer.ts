import {ScreenHandler} from "./screen/ScreenHandler";
import {Triangle} from "./geometry/Triangle";
import {ScreenBuffer} from "./screen/ScreenBuffer";
import {Color} from "./screen/Color";
import {Vector3} from "./geometry/Vector3";
import {Settings} from "./screen/Settings";

export class Rasterizer {

    private readonly targetScreen: ScreenHandler;
    private readonly triangles: Triangle[];
    private lastCalledTime: DOMHighResTimeStamp;


    constructor(targetScreen: ScreenHandler, triangle: Triangle[]) {
        this.targetScreen = targetScreen;
        this.triangles = triangle;
    }

    public launchRenderLoop(): void {
        this.render();
        this.targetScreen.setFpsDisplay(this.calculateFps());
        window.requestAnimationFrame(this.launchRenderLoop.bind(this));
    }

    private calculateFps(): number {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
        }
        const delta: number = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        return Math.round(1 / delta);
    }

    private render(): void {
        const screenBuffer = new ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        const depthBuffer: number[] = new Array(this.targetScreen.width * this.targetScreen.height).fill(Number.MAX_SAFE_INTEGER);

        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, Settings.clearColor);

            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);

            for (const triangle of this.triangles) {
                if (triangle.isInTriangle(screenX, screenY)) {
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