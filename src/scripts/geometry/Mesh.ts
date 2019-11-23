import {DrawableObject} from "./DrawableObject";
import {Triangle} from "./Triangle";

export class Mesh extends DrawableObject{

    private readonly triangles: Triangle[];

    constructor(triangles: Triangle[]) {
        super();
        this.triangles = triangles;
    }

    isIn(x: number, y: number): boolean {
        for (const triangle of this.triangles) {
            if (triangle.isIn(x, y)) {
                return true;
            }
        }
        return false;
    }

    toTriangles(): Triangle[] {
        for (const triangle of this.triangles) {
            triangle.transform.objectToWorld = this.transform.objectToWorld;
        }
        return this.triangles;
    }

}