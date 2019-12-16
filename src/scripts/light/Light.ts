import {Vector3} from "../math/Vector3";
import {Triangle} from "../geometry/Triangle";
import {Color} from "../camera/Color";

export abstract class Light {

    private _position: Vector3;
    private readonly _ambient: Color;
    private readonly _diffuse: Color;
    private readonly _specular: Color;
    private readonly _shininess: number;

    protected constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        this._position = position;
        this._ambient = ambient;
        this._diffuse = diffuse;
        this._specular = specular;
        this._shininess = shininess;
    }

    enlighten(triangle: Triangle): Triangle {
        const newAColor = this.calculateVertexColor(triangle.a, triangle.aColor, triangle.aNormal);
        const newBColor = this.calculateVertexColor(triangle.b, triangle.bColor, triangle.bNormal);
        const newCColor = this.calculateVertexColor(triangle.c, triangle.cColor, triangle.cNormal);
        return triangle.withColors(newAColor, newBColor, newCColor);
    }

    abstract calculateVertexColor(vertex: Vector3, vertexColor: Color, normal: Vector3): Color;

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value;
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