import {Color} from "./Color";

export class ScreenBuffer {

    private readonly _buffer: Uint8ClampedArray;

    constructor(screenWidth: number, screenHeight: number) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
    }

    getLength(): number {
        return this._buffer.length;
    }

    setColor(index: number, color: Color): void {
        this._buffer[index] = color.r;
        this._buffer[index + 1] = color.g;
        this._buffer[index + 2] = color.b;
        this._buffer[index + 3] = color.a;
    }

    get buffer(): Uint8ClampedArray {
        return this._buffer;
    }
}