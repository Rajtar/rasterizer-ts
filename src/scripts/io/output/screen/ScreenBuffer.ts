import {Color} from "../../../light/Color";
import {Settings} from "./Settings";

export class ScreenBuffer {

    private readonly _buffer: Uint8ClampedArray;

    constructor(screenWidth: number, screenHeight: number) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
        for (let i = 0, bufferLength = this._buffer.length; i < bufferLength; i+=4) {
            this._buffer[i] = Settings.clearColor.r;
            this._buffer[i+1] = Settings.clearColor.g;
            this._buffer[i+2] = Settings.clearColor.b;
            this._buffer[i+3] = Settings.clearColor.a;
        }
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