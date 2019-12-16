import {Light} from "./Light";
import {Vector3} from "../math/Vector3";
import {Color} from "../camera/Color";

export class PointLight extends Light {

    constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    calculateVertexColor(vertex: Vector3, vertexColor: Color, normal: Vector3): Color {
        const N = normal.getNormalized();
        let V = vertex.multiply(-1);
        const L = this.position.substract(V).getNormalized();
        V = V.getNormalized();
        const R = L.getReflectedBy(N);

        const iD = L.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rChannel = vertexColor.r * (this.ambient.r + (iD * this.diffuse.r) + (iS * this.specular.r));
        const gChannel = vertexColor.g * (this.ambient.g + (iD * this.diffuse.g) + (iS * this.specular.g));
        const bChannel = vertexColor.b * (this.ambient.b + (iD * this.diffuse.b) + (iS * this.specular.b));

        return new Color(rChannel, gChannel, bChannel);
    }

}