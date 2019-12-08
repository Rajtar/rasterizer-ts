import {Light} from "./Light";
import {Triangle} from "../geometry/Triangle";
import {Vector3} from "../math/Vector3";
import {Color} from "../camera/Color";

export class DirectionalLight extends Light {

    constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    enlighten(triangle: Triangle): Triangle {
        const newAColor = this.calculateVertexColor(triangle.a, triangle.aColor, triangle.aNormal);
        const newBColor = this.calculateVertexColor(triangle.b, triangle.bColor, triangle.bNormal);
        const newCColor = this.calculateVertexColor(triangle.c, triangle.cColor, triangle.cNormal);
        return triangle.withColors(newAColor, newBColor, newCColor);
    }

    calculateVertexColor(vertex: Vector3, vertexColor: Color, normal: Vector3): Color {
        const N = normal.getNormalized();
        const V = vertex.multiply(-1);
        const R = this.position.getReflected(N);

        const iD = this.position.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rChannel = vertexColor.r * (this.ambient.r + (iD / 10 * this.diffuse.r) + (iS / 10 * this.specular.r));
        const gChannel = vertexColor.g * (this.ambient.g + (iD / 10 * this.diffuse.g) + (iS / 10 * this.specular.g));
        const bChannel = vertexColor.b * (this.ambient.b + (iD / 10 * this.diffuse.b) + (iS / 10 * this.specular.b));

        return new Color(rChannel, gChannel, bChannel);
    }
}