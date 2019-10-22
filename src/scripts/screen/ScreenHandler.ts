export class ScreenHandler {

    private readonly _canvasCtx: CanvasRenderingContext2D;
    private readonly _width: number;
    private readonly _height: number;

    constructor(canvas: HTMLCanvasElement) {
        this._canvasCtx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
    }

    setPixelColor(x: number, y: number, r: number, g: number, b: number): void {
        this._canvasCtx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (255) + ")";
        this._canvasCtx.fillRect(x, y, 1, 1);
    }

    setAllPixelsColor(r: number, g: number, b: number): void {
        this._canvasCtx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (255) + ")";
        this._canvasCtx.fillRect(0, 0, this._width, this._height);
    }

    setPixelsFromBuffer(colorBuffer: Uint8ClampedArray): void {
        const imageData: ImageData = new ImageData(colorBuffer, this.width, this.height);
        this._canvasCtx.putImageData(imageData,0,0);
    }

    setFpsDisplay(fps: number): void {
        this._canvasCtx.fillStyle = "#08a300";
        this._canvasCtx.fillText("FPS: " + fps, 10, 20);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}