import {KeyboardInputData} from "./KeyboardInputData";
import {Vector3} from "../math/Vector3";

export class KeyboardBinder {
    static registerKeyBindings(): void {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x - 0.01, KeyboardInputData.lookAt.y, KeyboardInputData.lookAt.z);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x - 0.01, KeyboardInputData.target.y, KeyboardInputData.target.z);
                return;
            }
            if (event.key === 'd') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x + 0.01, KeyboardInputData.lookAt.y, KeyboardInputData.lookAt.z);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x + 0.01, KeyboardInputData.target.y, KeyboardInputData.target.z);
                return;
            }

            if (event.key === 'w') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x, KeyboardInputData.lookAt.y, KeyboardInputData.lookAt.z - 0.01);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x, KeyboardInputData.target.y, KeyboardInputData.target.z - 0.01);
                return;
            }
            if (event.key === 's') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x, KeyboardInputData.lookAt.y, KeyboardInputData.lookAt.z + 0.01);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x, KeyboardInputData.target.y, KeyboardInputData.target.z + 0.01);
                return;
            }

            if (event.key === '+') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x, KeyboardInputData.lookAt.y + 0.01, KeyboardInputData.lookAt.z);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x, KeyboardInputData.target.y + 0.01, KeyboardInputData.target.z);
                return;
            }
            if (event.key === '-') {
                KeyboardInputData.lookAt = new Vector3(KeyboardInputData.lookAt.x, KeyboardInputData.lookAt.y - 0.01, KeyboardInputData.lookAt.z);
                KeyboardInputData.target = new Vector3(KeyboardInputData.target.x, KeyboardInputData.target.y - 0.01, KeyboardInputData.target.z);
                return;
            }
            if (event.key === 'n') {
                KeyboardInputData.rotationDirection = new Vector3(0, 1, 0);
                KeyboardInputData.rotationAngle -= 0.1;
                return;
            }
            if (event.key === 'm') {
                KeyboardInputData.rotationDirection = new Vector3(0, 1, 0);
                KeyboardInputData.rotationAngle += 0.1;
                return;
            }
            if (event.key === 'j') {
                KeyboardInputData.scaling -= 0.001;
                return;
            }
            if (event.key === 'k') {
                KeyboardInputData.scaling += 0.001;
                return;
            }
        }, false);
    }
}