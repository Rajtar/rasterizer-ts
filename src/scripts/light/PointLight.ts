import {Light} from "./Light";
import {Vector3} from "../math/Vector3";
import {LightIntensity} from "./LightIntensity";

export class PointLight extends Light {

    constructor(position: Vector3, ambient: LightIntensity, diffuse: LightIntensity, specular: LightIntensity, shininess: number) {
        super(position, ambient, diffuse, specular, shininess);
    }

    calculateVertexLightIntensity(vertex: Vector3, normal: Vector3): LightIntensity {
        const N = normal.getNormalized();
        let V = vertex.multiply(-1);
        const L = this.position.substract(V).getNormalized();
        V = V.getNormalized();
        const R = L.getReflectedBy(N);

        const iD = L.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);

        const rIntensity = (this.ambient.r + (iD * this.diffuse.r) + (iS * this.specular.r));
        const gIntensity = (this.ambient.g + (iD * this.diffuse.g) + (iS * this.specular.g));
        const bIntensity = (this.ambient.b + (iD * this.diffuse.b) + (iS * this.specular.b));

        return new LightIntensity(rIntensity, gIntensity, bIntensity);
    }

}