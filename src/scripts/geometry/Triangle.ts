import {Vector3} from "./Vector3";
import {Color} from "../screen/Color";
import {Settings} from "../screen/Settings";

export class Triangle {
    private readonly _a: Vector3;
    private readonly _b: Vector3;
    private readonly _c: Vector3;

    private readonly _screenA: Vector3;
    private readonly _screenB: Vector3;
    private readonly _screenC: Vector3;

    private readonly _aColor: Color;
    private readonly _bColor: Color;
    private readonly _cColor: Color;

    constructor(a: Vector3, b: Vector3, c: Vector3, aColor: Color, bColor: Color, cColor: Color) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._aColor = aColor;
        this._bColor = bColor;
        this._cColor = cColor;

        const x1 = (this.a.x + 1) * Settings.screenWidth * 0.5;
        const x2 = (this.b.x + 1) * Settings.screenWidth * 0.5;
        const x3 = (this.c.x + 1) * Settings.screenWidth * 0.5;
        const y1 = Math.abs((this.a.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight);
        const y2 = Math.abs((this.b.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight);
        const y3 = Math.abs((this.c.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight);

        this._screenA = new Vector3(x1, y1);
        this._screenB = new Vector3(x2, y2);
        this._screenC = new Vector3(x3, y3);
    }

    toBarycentricCoordinates(x: number, y: number): Vector3 {
        const x1 = this.screenA.x;
        const x2 = this.screenB.x;
        const x3 = this.screenC.x;
        const y1 = this.screenA.y;
        const y2 = this.screenB.y;
        const y3 = this.screenC.y;

        const lambdaA = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) /
                        ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));

        const lambdaB = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) /
                        ((y3 - y1) * (x2 - x3) + (x1 - x3) * (y2 - y3));

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

    get screenA(): Vector3 {
        return this._screenA;
    }

    get screenB(): Vector3 {
        return this._screenB;
    }

    get screenC(): Vector3 {
        return this._screenC;
    }

    get aColor(): Color {
        return this._aColor;
    }

    get bColor(): Color {
        return this._bColor;
    }

    get cColor(): Color {
        return this._cColor;
    }
}