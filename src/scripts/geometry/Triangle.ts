import {Vector3} from "../math/Vector3";
import {Color} from "../io/output/screen/Color";
import {Settings} from "../io/output/screen/Settings";
import {DrawableObject} from "./DrawableObject";

export class Triangle extends DrawableObject {

    private readonly _a: Vector3;
    private readonly _b: Vector3;
    private readonly _c: Vector3;

    private readonly _aColor: Color;
    private readonly _bColor: Color;
    private readonly _cColor: Color;

    private readonly screenA: Vector3;
    private readonly screenB: Vector3;
    private readonly screenC: Vector3;

    private readonly dxAB: number;
    private readonly dxBC: number;
    private readonly dxCA: number;
    private readonly dyAB: number;
    private readonly dyBC: number;
    private readonly dyCA: number;

    private readonly _minX: number;
    private readonly _maxX: number;
    private readonly _minY: number;
    private readonly _maxY: number;

    private readonly isATopLeft: boolean;
    private readonly isBTopLeft: boolean;
    private readonly isCTopLeft: boolean;

    constructor(a: Vector3, b: Vector3, c: Vector3, aColor: Color, bColor: Color, cColor: Color) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._aColor = aColor;
        this._bColor = bColor;
        this._cColor = cColor;

        const x1 = Math.round((this.a.x + 1) * Settings.screenWidth * 0.5);
        const x2 = Math.round((this.b.x + 1) * Settings.screenWidth * 0.5);
        const x3 = Math.round((this.c.x + 1) * Settings.screenWidth * 0.5);
        const y1 = Math.round(Math.abs((this.a.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));
        const y2 = Math.round(Math.abs((this.b.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));
        const y3 = Math.round(Math.abs((this.c.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));

        this.screenA = new Vector3(x1, y1);
        this.screenB = new Vector3(x2, y2);
        this.screenC = new Vector3(x3, y3);

        this._minX = Math.min(this.screenA.x, this.screenB.x, this.screenC.x);
        this._maxX = Math.max(this.screenA.x, this.screenB.x, this.screenC.x);
        this._minY = Math.min(this.screenA.y, this.screenB.y, this.screenC.y);
        this._maxY = Math.max(this.screenA.y, this.screenB.y, this.screenC.y);

        this.dxAB = this.screenA.x - this.screenB.x;
        this.dxBC = this.screenB.x - this.screenC.x;
        this.dxCA = this.screenC.x - this.screenA.x;

        this.dyAB = this.screenA.y - this.screenB.y;
        this.dyBC = this.screenB.y - this.screenC.y;
        this.dyCA = this.screenC.y - this.screenA.y;

        this.isATopLeft = this.dyAB < 0 || (this.dyAB === 0 && this.dxAB > 0);
        this.isBTopLeft = this.dyBC < 0 || (this.dyBC === 0 && this.dxBC > 0);
        this.isCTopLeft = this.dyCA < 0 || (this.dyCA === 0 && this.dxCA > 0);
    }

    toTriangles(): Triangle[] {
        return [this];
    }

    toLambdaCoordinates(x: number, y: number): Vector3 {
        const lambdaA = (this.dyBC * (x - this.screenC.x) + -this.dxBC * (y - this.screenC.y)) /
            (this.dyBC * -this.dxCA + -this.dxBC * -this.dyCA);

        const lambdaB = (this.dyCA * (x - this.screenC.x) + -this.dxCA * (y - this.screenC.y)) /
            (this.dyCA * this.dxBC + -this.dxCA * this.dyBC);

        const lambdaC = 1 - lambdaA - lambdaB;
        return new Vector3(lambdaA, lambdaB, lambdaC);
    }

    isIn(x: number, y: number): boolean {
        return this.isInBoundingBox(x, y) &&
            this.isInTriangle(x, y);
    }

    private isInBoundingBox(x: number, y: number): boolean {
        return x <= this._maxX && x >= this._minX &&
            y <= this._maxY && y >= this._minY;
    }

    private isInTriangle(x: number, y: number): boolean {
        const isABOk = (this.isATopLeft && this.isBTopLeft) ?
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) >= 0 :
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0;

        const isBCOk = (this.isBTopLeft && this.isCTopLeft) ?
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) >= 0 :
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0;

        const isCAOk = (this.isCTopLeft && this.isATopLeft) ?
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) >= 0 :
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;

        return isABOk && isBCOk && isCAOk;
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

    get aColor(): Color {
        return this._aColor;
    }

    get bColor(): Color {
        return this._bColor;
    }

    get cColor(): Color {
        return this._cColor;
    }

    get minX(): number {
        return this._minX;
    }

    get maxX(): number {
        return this._maxX;
    }

    get minY(): number {
        return this._minY;
    }

    get maxY(): number {
        return this._maxY;
    }
}