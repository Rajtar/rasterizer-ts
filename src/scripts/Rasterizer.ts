import {ScreenHandler} from "./screen/ScreenHandler";
import {Triangle} from "./geometry/Triangle";
import {ScreenBuffer} from "./screen/ScreenBuffer";
import {Color} from "./screen/Color";

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
        let depthBuffer: number[];

        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, new Color(0, 0, 0, 50));

            const screenX = (i / 4) % this.targetScreen.width;
            const screenY = Math.floor((i / 4) / this.targetScreen.width);

            for (const triangle of this.triangles) {
                if (this.isInTriangle(screenX, screenY, triangle)) {
                    screenBuffer.setColor(i, new Color(255, 0, 0));
                }
            }
        }

        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
        this.targetScreen.setFpsDisplay(this.calculateFps());
    }

    private isInTriangle(x: number, y: number, triangle: Triangle): boolean {
        const x1 = (triangle.a.x + 1) * this.targetScreen.width * 0.5;
        const x2 = (triangle.b.x + 1) * this.targetScreen.width * 0.5;
        const x3 = (triangle.c.x + 1) * this.targetScreen.width * 0.5;

        const y1 = Math.abs((triangle.a.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);
        const y2 = Math.abs((triangle.b.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);
        const y3 = Math.abs((triangle.c.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);

        return (x1 - x2) * (y - y1) - (y1 - y2) * (x - x1) > 0 &&
            (x2 - x3) * (y - y2) - (y2 - y3) * (x - x2) > 0 &&
            (x3 - x1) * (y - y3) - (y3 - y1) * (x - x3) > 0;
    }

}