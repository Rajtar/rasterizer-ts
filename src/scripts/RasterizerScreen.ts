export class RasterizerScreen {
    private readonly _canvasCtx: CanvasRenderingContext2D;
    private readonly _width: number;
    private readonly _height: number;

    constructor(canvas: HTMLCanvasElement) {
        this._canvasCtx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
    }

    setPixelColor(x: number, y: number, r: number, g: number, b: number) {
        this._canvasCtx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (255) + ")";
        this._canvasCtx.fillRect(x, y, 1, 1);
    }

    setAllPixelsColor(r: number, g: number, b: number) {
        this._canvasCtx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (255) + ")";
        this._canvasCtx.fillRect(0, 0, this._width, this._height);
    }


    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}