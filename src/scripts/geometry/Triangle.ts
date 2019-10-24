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

    toBarycentricCoordinates(x: number, y: number): Vector3 {
        const lambdaA = ((this.b.y - this.c.y) * (x - this.c.x) + (this.c.x - this.b.x) * (y - this.c.y)) /
                        ((this.b.y - this.c.y) * (this.a.x - this.c.x) + (this.c.x - this.b.x) * (this.a.y - this.c.y));

        const lambdaB = ((this.c.y - this.a.y) * (x - this.c.x) + (this.a.x - this.c.x) * (y - this.c.y)) /
                        ((this.c.y - this.a.y) * (this.b.x - this.c.x) + (this.a.x - this.c.x) * (this.b.y - this.c.y));

        const lambdaC = 1 - lambdaA - lambdaB;
        
        return new Vector3(lambdaA, lambdaB, lambdaC);
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