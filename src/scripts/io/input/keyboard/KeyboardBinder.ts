import {KeyboardInputData} from "./KeyboardInputData";
import {Vector3} from "../../../math/Vector3";

export class KeyboardBinder {
    static registerKeyBindings(): void {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x - 0.01, KeyboardInputData.cameraPosition.y, KeyboardInputData.cameraPosition.z);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x - 0.01, KeyboardInputData.cameraTarget.y, KeyboardInputData.cameraTarget.z);
                return;
            }
            if (event.key === 'd') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x + 0.01, KeyboardInputData.cameraPosition.y, KeyboardInputData.cameraPosition.z);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x + 0.01, KeyboardInputData.cameraTarget.y, KeyboardInputData.cameraTarget.z);
                return;
            }

            if (event.key === 'w') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x, KeyboardInputData.cameraPosition.y, KeyboardInputData.cameraPosition.z - 0.01);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x, KeyboardInputData.cameraTarget.y, KeyboardInputData.cameraTarget.z - 0.01);
                return;
            }
            if (event.key === 's') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x, KeyboardInputData.cameraPosition.y, KeyboardInputData.cameraPosition.z + 0.01);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x, KeyboardInputData.cameraTarget.y, KeyboardInputData.cameraTarget.z + 0.01);
                return;
            }

            if (event.key === '+') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x, KeyboardInputData.cameraPosition.y + 0.01, KeyboardInputData.cameraPosition.z);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x, KeyboardInputData.cameraTarget.y + 0.01, KeyboardInputData.cameraTarget.z);
                return;
            }
            if (event.key === '-') {
                KeyboardInputData.cameraPosition = new Vector3(KeyboardInputData.cameraPosition.x, KeyboardInputData.cameraPosition.y - 0.01, KeyboardInputData.cameraPosition.z);
                KeyboardInputData.cameraTarget = new Vector3(KeyboardInputData.cameraTarget.x, KeyboardInputData.cameraTarget.y - 0.01, KeyboardInputData.cameraTarget.z);
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

            if (event.key === 'o') {
                KeyboardInputData.scaling -= 0.001;
                return;
            }
            if (event.key === 'p') {
                KeyboardInputData.scaling += 0.001;
                return;
            }

            if (event.key === 'u') {
                KeyboardInputData.lightPosition = new Vector3(KeyboardInputData.lightPosition.x, KeyboardInputData.lightPosition.y + 0.1, KeyboardInputData.lightPosition.z);
                return;
            }
            if (event.key === 'j') {
                KeyboardInputData.lightPosition = new Vector3(KeyboardInputData.lightPosition.x, KeyboardInputData.lightPosition.y - 0.1, KeyboardInputData.lightPosition.z);
                return;
            }

            if (event.key === 'k') {
                KeyboardInputData.lightPosition = new Vector3(KeyboardInputData.lightPosition.x + 0.1, KeyboardInputData.lightPosition.y, KeyboardInputData.lightPosition.z);
                return;
            }
            if (event.key === 'h') {
                KeyboardInputData.lightPosition = new Vector3(KeyboardInputData.lightPosition.x - 0.1, KeyboardInputData.lightPosition.y, KeyboardInputData.lightPosition.z);
                return;
            }

        }, false);
    }
}