export class Vector3 {

    private readonly x: number;
    private readonly y: number;
    private readonly z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static betweenPoints(p1: Vector3, p2: Vector3): Vector3 {
        const x = p1.x - p2.x;
        const y = p1.y - p2.y;
        const z = p1.z - p2.z;
        return new Vector3(x, y, z);
    }

    getMagnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    getNormalized(): Vector3 {
        return this.divide(this.getMagnitude());
    }

    dot(other: Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross(other: Vector3): Vector3 {
        return new Vector3((this.y * other.z) - (this.z * other.y),
                           (this.z * other.x) - (this.x * other.z),
                           (this.x * other.y) - (this.y * other.x));
    }

    add(other: Vector3): Vector3 {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.y)
    }

    substract(other: Vector3): Vector3 {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.y)
    }

    multiply(other: Vector3): Vector3
    multiply(other: number): Vector3
    multiply(other: any): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x * other.x, this.y * other.y, this.z * other.y)
        } else {
            return new Vector3(this.x * other, this.y * other, this.z * other)
        }
    }

    divide(other: Vector3): Vector3
    divide(other: number): Vector3
    divide(other: any): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x / other.x, this.y / other.y, this.z / other.y)
        } else {
            return new Vector3(this.x / other, this.y / other, this.z / other)
        }
    }
}