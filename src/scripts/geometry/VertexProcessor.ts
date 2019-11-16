import {Matrix4x4} from "./Matrix4x4";
import {Vector3} from "./Vector3";

export class VertexProcessor {
    private readonly viewToProjection: Matrix4x4 = new Matrix4x4();
    private readonly worldToView: Matrix4x4 = new Matrix4x4();
    private VP: Matrix4x4;

    setLookAt(position: Vector3, target: Vector3, upDirection: Vector3): void {
        const cameraDirection = target.substract(position).getNormalized();
        upDirection = upDirection.getNormalized();
        const s = cameraDirection.cross(upDirection);
        const u = s.cross(cameraDirection);

        // column
        // this.worldToView.data[0] = new Float32Array([s.x, u.x, -cameraDirection.x, 0]);
        // this.worldToView.data[1] = new Float32Array([s.y, u.y, -cameraDirection.y, 0]);
        // this.worldToView.data[2] = new Float32Array([s.z, u.z, -cameraDirection.z, 0]);
        // this.worldToView.data[3] = new Float32Array([-position.x, -position.y, -position.z, 1]);

        // row
        this.worldToView.data[0] = new Float32Array([s.x, s.y, s.z, -position.x]);
        this.worldToView.data[1] = new Float32Array([u.x, u.y, u.z, -position.y]);
        this.worldToView.data[2] = new Float32Array([-cameraDirection.x, -cameraDirection.y, -cameraDirection.z, -position.z]);
        this.worldToView.data[3] = new Float32Array([0, 0, 0, 1]);
    }

    setPerspective(fovY: number, aspect: number, near: number, far: number): void {
        fovY *= Math.PI / 360;
        const f = Math.cos(fovY) / Math.sin(fovY);
        // column
        // this.viewToProjection.data[0] = new Float32Array([f/aspect, 0, 0, 0]);
        // this.viewToProjection.data[1] = new Float32Array([0, f, 0, 0]);
        // this.viewToProjection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), -1]);
        // this.viewToProjection.data[3] = new Float32Array([0, 0, (2 * far * near) / (near - far), 0]);

        // row
        this.viewToProjection.data[0] = new Float32Array([f/aspect, 0, 0, 0]);
        this.viewToProjection.data[1] = new Float32Array([0, f, 0, 0]);
        this.viewToProjection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)]);
        this.viewToProjection.data[3] = new Float32Array([0, 0, -1, 0]);
        this.VP = this.viewToProjection.multiply(this.worldToView);
    }

    transform(vertex: Vector3): Vector3 {
        return this.VP.multiply(vertex);
    }
}