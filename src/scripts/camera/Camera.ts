import {Matrix4x4} from "../math/Matrix4x4";
import {Vector3} from "../math/Vector3";
import {Triangle} from "../geometry/Triangle";

export class Camera {

    private readonly projection: Matrix4x4 = new Matrix4x4();
    private readonly view: Matrix4x4 = new Matrix4x4();
    private projectionView: Matrix4x4;

    setLookAt(position: Vector3, target: Vector3, upDirection: Vector3): void {
        const cameraDirection = target.substract(position).getNormalized();
        upDirection = upDirection.getNormalized();
        const s = cameraDirection.cross(upDirection);
        const u = s.cross(cameraDirection);

        this.view.data[0] = new Float32Array([s.x, s.y, s.z, -position.x]);
        this.view.data[1] = new Float32Array([u.x, u.y, u.z, -position.y]);
        this.view.data[2] = new Float32Array([-cameraDirection.x, -cameraDirection.y, -cameraDirection.z, -position.z]);
        this.view.data[3] = new Float32Array([0, 0, 0, 1]);
        this.updateProjectionView();
    }

    setPerspective(fovY: number, aspect: number, near: number, far: number): void {
        fovY *= Math.PI / 360;
        const f = Math.cos(fovY) / Math.sin(fovY);

        this.projection.data[0] = new Float32Array([f/aspect, 0, 0, 0]);
        this.projection.data[1] = new Float32Array([0, f, 0, 0]);
        this.projection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)]);
        this.projection.data[3] = new Float32Array([0, 0, -1, 0]);
        this.updateProjectionView();
    }

    project(triangle: Triangle): Triangle {
        const projectionViewWorld = this.projectionView.multiply(triangle.transform.objectToWorld);
        const newA = projectionViewWorld.multiply(triangle.a);
        const newB = projectionViewWorld.multiply(triangle.b);
        const newC = projectionViewWorld.multiply(triangle.c);
        const runtimeObjectToWorld = triangle.transform.objectToWorldRuntimeOnly;
        const newANormal = runtimeObjectToWorld.multiply(triangle.aNormal);
        const newBNormal = runtimeObjectToWorld.multiply(triangle.bNormal);
        const newCNormal = runtimeObjectToWorld.multiply(triangle.cNormal);
        return new Triangle(newA, newB, newC, newANormal, newBNormal, newCNormal, triangle.aColor, triangle.bColor, triangle.cColor);
    }

    private updateProjectionView(): void {
        this.projectionView = this.projection.multiply(this.view);
    }
}