export class LightIntensity {

    private readonly _r: number;
    private readonly _g: number;
    private readonly _b: number;

    constructor(r = 0, g = 0, b = 0) {
        this._r = r;
        this._g = g;
        this._b = b;
    }

    add(other: LightIntensity): LightIntensity {
        return new LightIntensity(this.r + other.r, this.g + other.g, this.b + other.b);
    }

    multiply(other: LightIntensity): LightIntensity
    multiply(other: number): LightIntensity
    multiply(other: any): LightIntensity {
        if (other instanceof LightIntensity) {
            return new LightIntensity(this.r * other.r, this.g * other.g, this.b * other.b);
        } else {
            return new LightIntensity(this.r * other, this.g * other, this.b * other);
        }
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
}