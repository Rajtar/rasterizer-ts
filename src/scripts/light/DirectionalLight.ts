import {Light} from "./Light";
import {Triangle} from "../geometry/Triangle";
import {Vector3} from "../math/Vector3";
import {Color} from "../camera/Color";

export class DirectionalLight extends Light {

    constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    enlighten(triangle: Triangle): Triangle {
        const newAColor = this.calculateVertexColor(triangle.a, triangle.aNormal);
        const newBColor = this.calculateVertexColor(triangle.b, triangle.bNormal);
        const newCColor = this.calculateVertexColor(triangle.c, triangle.cNormal);
        return triangle.withColors(newAColor, newBColor, newCColor);
    }

    calculateVertexColor(vertex: Vector3, normal: Vector3): Color {
        const N = normal.getNormalized();
        const V = vertex.multiply(-1);
        const R = this.position.getReflected(N);

        const iD = this.position.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rChannel = this.ambient.r + iD * this.diffuse.r + iS * this.specular.r;
        const gChannel = this.ambient.g + iD * this.diffuse.g + iS * this.specular.g;
        const bChannel = this.ambient.b + iD * this.diffuse.b + iS * this.specular.b;

        return new Color(rChannel, gChannel, bChannel);
    }
}