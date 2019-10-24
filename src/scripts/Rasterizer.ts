import {ScreenHandler} from "./screen/ScreenHandler";
import {Triangle} from "./geometry/Triangle";
import {ScreenBuffer} from "./screen/ScreenBuffer";
import {Color} from "./screen/Color";
import {Vector3} from "./geometry/Vector3";

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
            screenBuffer.setColor(i, new Color(0, 0, 0, 50));

            const screenX = (i / 4) % this.targetScreen.width;
            const screenY = Math.floor((i / 4) / this.targetScreen.width);

            for (const triangle of this.triangles) {
                if (this.isInTriangle(screenX, screenY, triangle)) {
                    const lambdaCords: Vector3 = triangle.toBarycentricCoordinates(screenX, screenY);
                    const depth: number = lambdaCords.x * triangle.a.z + lambdaCords.y * triangle.b.z + lambdaCords.z * triangle.c.z;
                    if (depth < depthBuffer[i / 4]) {
                        depthBuffer[i / 4] = depth;
                        const redInterpolated = lambdaCords.x * triangle.aColor.r + lambdaCords.y * triangle.bColor.r + lambdaCords.z * triangle.cColor.r;
                        const greenInterpolated = lambdaCords.x * triangle.aColor.g + lambdaCords.y * triangle.bColor.g + lambdaCords.z * triangle.cColor.g;
                        const blueInterpolated = lambdaCords.x * triangle.aColor.b + lambdaCords.y * triangle.bColor.b + lambdaCords.z * triangle.cColor.b;
                        screenBuffer.setColor(i, new Color(redInterpolated, greenInterpolated, blueInterpolated));
                    }
                }
            }
        }

        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
        this.targetScreen.setFpsDisplay(this.calculateFps());
    }

    private isInTriangle(x: number, y: number, triangle: Triangle): boolean {
        const x1 = triangle.screenA.x;
        const x2 = triangle.screenB.x;
        const x3 = triangle.screenC.x;
        const y1 = triangle.screenA.y;
        const y2 = triangle.screenB.y;
        const y3 = triangle.screenC.y;
        return (x1 - x2) * (y - y1) - (y1 - y2) * (x - x1) > 0 &&
            (x2 - x3) * (y - y2) - (y2 - y3) * (x - x2) > 0 &&
            (x3 - x1) * (y - y3) - (y3 - y1) * (x - x3) > 0;
    }

}