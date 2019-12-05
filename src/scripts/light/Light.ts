import {Vector3} from "../math/Vector3";
import {Triangle} from "../geometry/Triangle";
import {Color} from "../camera/Color";

export abstract class Light {

    private readonly _position: Vector3;
    private readonly _ambient: Color;
    private readonly _diffuse: Color;
    private readonly _specular: Color;
    private readonly _shininess: number;

    abstract enlighten(triangle: Triangle): Triangle;

    constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        this._position = position;
        this._ambient = ambient;
        this._diffuse = diffuse;
        this._specular = specular;
        this._shininess = shininess;
    }

    get position(): Vector3 {
        return this._position;
    }

    get ambient(): Color {
        return this._ambient;
    }

    get diffuse(): Color {
        return this._diffuse;
    }

    get specular(): Color {
        return this._specular;
    }

    get shininess(): number {
        return this._shininess;
    }
}