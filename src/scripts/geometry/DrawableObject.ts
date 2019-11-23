import {Transform} from "./Transform";
import {Triangle} from "./Triangle";

export abstract class DrawableObject {
    private readonly _transform: Transform;

    protected constructor() {
        this._transform = new Transform();
    }

    abstract isIn(x: number, y: number): boolean;
    abstract toTriangles(): Triangle[]

    get transform(): Transform {
        return this._transform;
    }
}