export class ScreenBuffer {

    private readonly _buffer: Uint8ClampedArray;

    constructor(screenWidth: number, screenHeight: number) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
    }

    getLength(): number {
        return this._buffer.length;
    }

    setColor(index: number, r: number, g: number, b: number, a = 255): void {
        this._buffer[index] = r;
        this._buffer[index + 1] = g;
        this._buffer[index + 2] = b;
        this._buffer[index + 3] = a;
    }

    get buffer(): Uint8ClampedArray {
        return this._buffer;
    }
}