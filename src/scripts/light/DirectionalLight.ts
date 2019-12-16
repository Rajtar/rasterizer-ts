import {Light} from "./Light";
import {Vector3} from "../math/Vector3";
import {Color} from "../camera/Color";

export class DirectionalLight extends Light {

    constructor(position: Vector3, ambient: Color, diffuse: Color, specular: Color, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    calculateVertexColor(vertex: Vector3, vertexColor: Color, normal: Vector3): Color {
        const N = normal.getNormalized();
        const V = vertex.multiply(-1).getNormalized();
        const R = this.position.getReflectedBy(N).getNormalized();

        const iD = this.position.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rChannel = vertexColor.r * (this.ambient.r + (iD / 2 * this.diffuse.r) + (iS * this.specular.r));
        const gChannel = vertexColor.g * (this.ambient.g + (iD / 2 * this.diffuse.g) + (iS * this.specular.g));
        const bChannel = vertexColor.b * (this.ambient.b + (iD / 2 * this.diffuse.b) + (iS * this.specular.b));

        return new Color(rChannel, gChannel, bChannel);
    }
}