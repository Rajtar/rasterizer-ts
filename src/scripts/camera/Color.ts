export class Color {

    private readonly _r: number;
    private readonly _g: number;
    private readonly _b: number;
    private readonly _a: number;

    public static readonly RED = new Color(255, 0, 0);
    public static readonly GREEN = new Color(0, 255, 0);
    public static readonly BLUE = new Color(0, 0, 255);

    constructor(r: number, g: number, b: number, a = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
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