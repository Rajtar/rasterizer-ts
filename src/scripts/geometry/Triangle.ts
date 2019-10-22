import {Vector3} from "./Vector3";

export class Triangle {
    private readonly _a: Vector3;
    private readonly _b: Vector3;
    private readonly _c: Vector3;

    constructor(a: Vector3, b: Vector3, c: Vector3) {
        this._a = a;
        this._b = b;
        this._c = c;
    }

    get a(): Vector3 {
        return this._a;
    }

    get b(): Vector3 {
        return this._b;
    }

    get c(): Vector3 {
        return this._c;
    }
}