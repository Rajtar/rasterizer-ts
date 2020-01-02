import {LightIntensity} from "./LightIntensity";

export class Color {

    private readonly _r: number;
    private readonly _g: number;
    private readonly _b: number;
    private readonly _a: number;

    public static readonly RED = new Color(255, 0, 0);
    public static readonly GREEN = new Color(0, 255, 0);
    public static readonly BLUE = new Color(0, 0, 255);
    public static readonly BLACK = new Color(0, 0, 0);
    public static readonly WHITE = new Color(255, 255, 255);

    constructor(r = 0, g = 0, b = 0, a = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    multiply(other: LightIntensity): Color {
        return new Color(this.r * other.r, this.g * other.g, this.b * other.b);
    }

    get r(): number {
        return this._r;
    }

    get g(): number {
        return this._g;
    }

    get b(): number {
        return this._b;
    }

    get a(): number {
        return this._a;
    }
}