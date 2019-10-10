import {RasterizerScreen} from "./RasterizerScreen";

export class Rasterizer {

    private readonly targetScreen: RasterizerScreen;
    private lastCalledTime: DOMHighResTimeStamp;

    constructor(screen: RasterizerScreen) {
        this.targetScreen = screen;
    }

    public launchRenderLoop(): void{
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
        const array = new Uint8ClampedArray(1600*900*4);
        for(let i=0; i < array.length; i++) {
            array[i] = 255;
        }
        this.targetScreen.setPixelsFromBuffer(array);
        this.targetScreen.setFpsDisplay(this.calculateFps());
    }
}