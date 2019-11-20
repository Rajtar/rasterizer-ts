import {CameraSettings} from "../Camera/CameraSettings";
import {Vector3} from "../math/Vector3";

export class KeyboardInput {
    static registerKeyBindings(): void {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x - 0.01, CameraSettings.lookAt.y, CameraSettings.lookAt.z);
                CameraSettings.target = new Vector3(CameraSettings.target.x - 0.01, CameraSettings.target.y, CameraSettings.target.z);
                return;
            }
            if (event.key === 'd') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x + 0.01, CameraSettings.lookAt.y, CameraSettings.lookAt.z);
                CameraSettings.target = new Vector3(CameraSettings.target.x + 0.01, CameraSettings.target.y, CameraSettings.target.z);
                return;
            }

            if (event.key === 'w') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x, CameraSettings.lookAt.y, CameraSettings.lookAt.z - 0.01);
                CameraSettings.target = new Vector3(CameraSettings.target.x, CameraSettings.target.y, CameraSettings.target.z - 0.01);
                return;
            }
            if (event.key === 's') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x, CameraSettings.lookAt.y, CameraSettings.lookAt.z + 0.01);
                CameraSettings.target = new Vector3(CameraSettings.target.x, CameraSettings.target.y, CameraSettings.target.z + 0.01);
                return;
            }

            if (event.key === '+') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x, CameraSettings.lookAt.y + 0.01, CameraSettings.lookAt.z);
                CameraSettings.target = new Vector3(CameraSettings.target.x, CameraSettings.target.y + 0.01, CameraSettings.target.z);
                return;
            }
            if (event.key === '-') {
                CameraSettings.lookAt = new Vector3(CameraSettings.lookAt.x, CameraSettings.lookAt.y - 0.01, CameraSettings.lookAt.z);
                CameraSettings.target = new Vector3(CameraSettings.target.x, CameraSettings.target.y - 0.01, CameraSettings.target.z);
                return;
            }
            if (event.key === 'n') {
                CameraSettings.rotationDirection = new Vector3(1, 0, 0);
                CameraSettings.rotationAngle += 0.001;
                return;
            }
            if (event.key === 'm') {
                CameraSettings.rotationDirection = new Vector3(1, 0, 0);
                CameraSettings.rotationAngle += 0.001;
                return;
            }
            if (event.key === 'j') {
                CameraSettings.scaling -= 0.001;
                return;
            }
            if (event.key === 'k') {
                CameraSettings.scaling += 0.001;
                return;
            }
        }, false);
    }
}