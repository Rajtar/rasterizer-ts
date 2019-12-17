import {Triangle} from "./Triangle";
import {Vector3} from "../math/Vector3";

export class NormalsCreator {

    static createNormals(triangle: Triangle): Triangle {
        const ab = Vector3.betweenPoints(triangle.a, triangle.b);
        const ac = Vector3.betweenPoints(triangle.a, triangle.c);
        const triangleNormal = ab.cross(ac).getNormalized();
        return triangle.withNormals(triangleNormal, triangleNormal, triangleNormal);
    }
}