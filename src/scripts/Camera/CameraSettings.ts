import {Vector3} from "../math/Vector3";

export class CameraSettings {
    static lookAt = new Vector3(0, 0, 5);
    static target = new Vector3(0, 0, 0);

    static scaling = 1;

    static rotationDirection = new Vector3(0, 0, 0);
    static rotationAngle = 0;
};