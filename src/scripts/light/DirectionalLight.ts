import {Light} from "./Light";
import {Vector3} from "../math/Vector3";
import {LightIntensity} from "./LightIntensity";

export class DirectionalLight extends Light {

    constructor(position: Vector3, ambient: LightIntensity, diffuse: LightIntensity, specular: LightIntensity, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    calculateVertexLightIntensity(vertex: Vector3, normal: Vector3): LightIntensity {
        const N = normal.getNormalized();
        const V = vertex.multiply(-1).getNormalized();
        const R = this.position.getReflectedBy(N).getNormalized();

        const iD = this.position.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rIntensity = (this.ambient.r + (iD * this.diffuse.r) + (iS * this.specular.r));
        const gIntensity = (this.ambient.g + (iD * this.diffuse.g) + (iS * this.specular.g));
        const bIntensity = (this.ambient.b + (iD * this.diffuse.b) + (iS * this.specular.b));

        return new LightIntensity(rIntensity, gIntensity, bIntensity);
    }
}