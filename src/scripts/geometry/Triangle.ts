import {Vector3} from "../math/Vector3";
import {Color} from "../light/Color";
import {Settings} from "../io/output/screen/Settings";
import {DrawableObject} from "./DrawableObject";
import {MathUtils} from "../math/MathUtils";

export class Triangle extends DrawableObject {

    private readonly _a: Vector3;
    private readonly _b: Vector3;
    private readonly _c: Vector3;

    private readonly _aNormal: Vector3;
    private readonly _bNormal: Vector3;
    private readonly _cNormal: Vector3;

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

    private readonly isABTopLeft: boolean;
    private readonly isBCTopLeft: boolean;
    private readonly isCATopLeft: boolean;

    constructor(a: Vector3, b: Vector3, c: Vector3, aNormal: Vector3, bNormal: Vector3, cNormal: Vector3, aColor = Color.RED, bColor = Color.GREEN, cColor = Color.BLUE) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._aNormal = aNormal;
        this._bNormal = bNormal;
        this._cNormal = cNormal;
        this._aColor = aColor;
        this._bColor = bColor;
        this._cColor = cColor;

        const x1 = Math.round((this.a.x + 1) * Settings.screenWidth * 0.5);
        const x2 = Math.round((this.b.x + 1) * Settings.screenWidth * 0.5);
        const x3 = Math.round((this.c.x + 1) * Settings.screenWidth * 0.5);
        const y1 = Math.round(Math.abs((this.a.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));
        const y2 = Math.round(Math.abs((this.b.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));
        const y3 = Math.round(Math.abs((this.c.y + 1) * Settings.screenHeight * 0.5 - Settings.screenHeight));

        const clippedX1 = MathUtils.clampFromZero(x1, Settings.screenWidth);
        const clippedY1 = MathUtils.clampFromZero(y1, Settings.screenHeight);
        const clippedX2 = MathUtils.clampFromZero(x2, Settings.screenWidth);
        const clippedY2 = MathUtils.clampFromZero(y2, Settings.screenHeight);
        const clippedX3 = MathUtils.clampFromZero(x3, Settings.screenWidth);
        const clippedY3 = MathUtils.clampFromZero(y3, Settings.screenHeight);

        this.screenA = new Vector3(clippedX1, clippedY1);
        this.screenB = new Vector3(clippedX2, clippedY2);
        this.screenC = new Vector3(clippedX3, clippedY3);

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

        this.isABTopLeft = this.dyAB < 0 || (this.dyAB === 0 && this.dxAB > 0);
        this.isBCTopLeft = this.dyBC < 0 || (this.dyBC === 0 && this.dxBC > 0);
        this.isCATopLeft = this.dyCA < 0 || (this.dyCA === 0 && this.dxCA > 0);
    }

    withColors(newAColor: Color, newBColor: Color, newCColor: Color): Triangle {
        return new Triangle(this.a, this.b, this.c, this.aNormal, this.bNormal, this.cNormal, newAColor, newBColor, newCColor);
    }

    withNormals(newANormal: Vector3, newBNormal: Vector3, newCNormal: Vector3): Triangle {
        return new Triangle(this.a, this.b, this.c, newANormal, newBNormal, newCNormal, this.aColor, this.bColor, this.cColor);
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
        let isABOk: boolean;
        this.isABTopLeft ?
            isABOk = this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) >= 0 :
            isABOk = this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0;


        let isBCOk: boolean;
        this.isBCTopLeft ?
            isBCOk = this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) >= 0 :
            isBCOk = this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0;

        let isCAOk: boolean;
        this.isCATopLeft ?
            isCAOk = this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) >= 0 :
            isCAOk = this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;

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

    get aNormal(): Vector3 {
        return this._aNormal;
    }

    get bNormal(): Vector3 {
        return this._bNormal;
    }

    get cNormal(): Vector3 {
        return this._cNormal;
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