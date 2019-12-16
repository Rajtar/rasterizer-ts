export class Vector3 {

    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;

    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    static betweenPoints(p1: Vector3, p2: Vector3): Vector3 {
        const x = p1._x - p2._x;
        const y = p1._y - p2._y;
        const z = p1._z - p2._z;
        return new Vector3(x, y, z);
    }

    getMagnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    getNormalized(): Vector3 {
        return this.divide(this.getMagnitude());
    }

    getReflectedBy(normal: Vector3): Vector3 {
        const n = normal.getNormalized();
        return this.substract(n.multiply(2 * this.dot(n)));
    }

    dot(other: Vector3): number {
        return this._x * other._x + this._y * other._y + this._z * other._z;
    }

    cross(other: Vector3): Vector3 {
        return new Vector3((this._y * other._z) - (this._z * other._y),
                           (this._z * other._x) - (this._x * other._z),
                           (this._x * other._y) - (this._y * other._x));
    }

    add(other: Vector3): Vector3 {
        return new Vector3(this._x + other._x, this._y + other._y, this._z + other._z)
    }

    substract(other: Vector3): Vector3 {
        return new Vector3(this._x - other._x, this._y - other._y, this._z - other._z)
    }

    multiply(other: Vector3): Vector3
    multiply(other: number): Vector3
    multiply(other: any): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this._x * other._x, this._y * other._y, this._z * other._y)
        } else {
            return new Vector3(this._x * other, this._y * other, this._z * other)
        }
    }

    divide(other: Vector3): Vector3
    divide(other: number): Vector3
    divide(other: any): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this._x / other._x, this._y / other._y, this._z / other._y)
        } else {
            return new Vector3(this._x / other, this._y / other, this._z / other)
        }
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }
}