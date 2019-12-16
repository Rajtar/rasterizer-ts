import {Vector3} from "../math/Vector3";
import {LightIntensity} from "./LightIntensity";

export abstract class Light {

    private _position: Vector3;
    private readonly _ambient: LightIntensity;
    private readonly _diffuse: LightIntensity;
    private readonly _specular: LightIntensity;
    private readonly _shininess: number;

    protected constructor(position: Vector3, ambient: LightIntensity, diffuse: LightIntensity, specular: LightIntensity, shininess: number) {
        this._position = position;
        this._ambient = ambient;
        this._diffuse = diffuse;
        this._specular = specular;
        this._shininess = shininess;
    }

    abstract calculateVertexLightIntensity(vertex: Vector3, normal: Vector3): LightIntensity;

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value;
    }

    get ambient(): LightIntensity {
        return this._ambient;
    }

    get diffuse(): LightIntensity {
        return this._diffuse;
    }

    get specular(): LightIntensity {
        return this._specular;
    }

    get shininess(): number {
        return this._shininess;
    }
}