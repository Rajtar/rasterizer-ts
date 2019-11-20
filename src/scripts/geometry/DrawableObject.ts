import {Transform} from "./Transform";

export abstract class DrawableObject {
    private readonly _transform: Transform;

    protected constructor() {
        this._transform = new Transform();
    }

    abstract isIn(x: number, y: number): boolean;

    get transform(): Transform {
        return this._transform;
    }
}