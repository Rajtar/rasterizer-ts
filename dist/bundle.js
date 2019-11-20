/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/Camera/CameraSettings.ts":
/*!**********************************************!*\
  !*** ./src/scripts/Camera/CameraSettings.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ../math/Vector3 */ "./src/scripts/math/Vector3.ts");
class CameraSettings {
}
exports.CameraSettings = CameraSettings;
CameraSettings.lookAt = new Vector3_1.Vector3(0, 0, 5);
CameraSettings.target = new Vector3_1.Vector3(0, 0, 0);
CameraSettings.scaling = 1;
CameraSettings.rotationDirection = new Vector3_1.Vector3(0, 0, 0);
CameraSettings.rotationAngle = 0;
;


/***/ }),

/***/ "./src/scripts/Input/KeyboardInput.ts":
/*!********************************************!*\
  !*** ./src/scripts/Input/KeyboardInput.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CameraSettings_1 = __webpack_require__(/*! ../Camera/CameraSettings */ "./src/scripts/Camera/CameraSettings.ts");
const Vector3_1 = __webpack_require__(/*! ../math/Vector3 */ "./src/scripts/math/Vector3.ts");
class KeyboardInput {
    static registerKeyBindings() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x - 0.01, CameraSettings_1.CameraSettings.lookAt.y, CameraSettings_1.CameraSettings.lookAt.z);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x - 0.01, CameraSettings_1.CameraSettings.target.y, CameraSettings_1.CameraSettings.target.z);
                return;
            }
            if (event.key === 'd') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x + 0.01, CameraSettings_1.CameraSettings.lookAt.y, CameraSettings_1.CameraSettings.lookAt.z);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x + 0.01, CameraSettings_1.CameraSettings.target.y, CameraSettings_1.CameraSettings.target.z);
                return;
            }
            if (event.key === 'w') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x, CameraSettings_1.CameraSettings.lookAt.y, CameraSettings_1.CameraSettings.lookAt.z - 0.01);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x, CameraSettings_1.CameraSettings.target.y, CameraSettings_1.CameraSettings.target.z - 0.01);
                return;
            }
            if (event.key === 's') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x, CameraSettings_1.CameraSettings.lookAt.y, CameraSettings_1.CameraSettings.lookAt.z + 0.01);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x, CameraSettings_1.CameraSettings.target.y, CameraSettings_1.CameraSettings.target.z + 0.01);
                return;
            }
            if (event.key === '+') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x, CameraSettings_1.CameraSettings.lookAt.y + 0.01, CameraSettings_1.CameraSettings.lookAt.z);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x, CameraSettings_1.CameraSettings.target.y + 0.01, CameraSettings_1.CameraSettings.target.z);
                return;
            }
            if (event.key === '-') {
                CameraSettings_1.CameraSettings.lookAt = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.lookAt.x, CameraSettings_1.CameraSettings.lookAt.y - 0.01, CameraSettings_1.CameraSettings.lookAt.z);
                CameraSettings_1.CameraSettings.target = new Vector3_1.Vector3(CameraSettings_1.CameraSettings.target.x, CameraSettings_1.CameraSettings.target.y - 0.01, CameraSettings_1.CameraSettings.target.z);
                return;
            }
            if (event.key === 'n') {
                CameraSettings_1.CameraSettings.rotationDirection = new Vector3_1.Vector3(1, 0, 0);
                CameraSettings_1.CameraSettings.rotationAngle += 0.001;
                return;
            }
            if (event.key === 'm') {
                CameraSettings_1.CameraSettings.rotationDirection = new Vector3_1.Vector3(1, 0, 0);
                CameraSettings_1.CameraSettings.rotationAngle += 0.001;
                return;
            }
            if (event.key === 'j') {
                CameraSettings_1.CameraSettings.scaling -= 0.001;
                return;
            }
            if (event.key === 'k') {
                CameraSettings_1.CameraSettings.scaling += 0.001;
                return;
            }
        }, false);
    }
}
exports.KeyboardInput = KeyboardInput;


/***/ }),

/***/ "./src/scripts/Rasterizer.ts":
/*!***********************************!*\
  !*** ./src/scripts/Rasterizer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Triangle_1 = __webpack_require__(/*! ./geometry/Triangle */ "./src/scripts/geometry/Triangle.ts");
const ScreenBuffer_1 = __webpack_require__(/*! ./screen/ScreenBuffer */ "./src/scripts/screen/ScreenBuffer.ts");
const Color_1 = __webpack_require__(/*! ./screen/Color */ "./src/scripts/screen/Color.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const Settings_1 = __webpack_require__(/*! ./screen/Settings */ "./src/scripts/screen/Settings.ts");
const VertexProcessor_1 = __webpack_require__(/*! ./geometry/VertexProcessor */ "./src/scripts/geometry/VertexProcessor.ts");
const CameraSettings_1 = __webpack_require__(/*! ./Camera/CameraSettings */ "./src/scripts/Camera/CameraSettings.ts");
class Rasterizer {
    constructor(targetScreen, drawableObjects) {
        this.targetScreen = targetScreen;
        this.drawableObjects = drawableObjects;
    }
    update() {
        const objectsToRender = [];
        const vp = new VertexProcessor_1.VertexProcessor();
        vp.setLookAt(CameraSettings_1.CameraSettings.lookAt, CameraSettings_1.CameraSettings.target, new Vector3_1.Vector3(0, 1, 0));
        vp.setPerspective(45, 1, 0.1, 100);
        for (const object of this.drawableObjects) {
            if (object instanceof Triangle_1.Triangle) {
                const triangleObject = object;
                objectsToRender.push(new Triangle_1.Triangle(vp.transform(triangleObject.a, object.transform), vp.transform(triangleObject.b, object.transform), vp.transform(triangleObject.c, object.transform), triangleObject.aColor, triangleObject.bColor, triangleObject.cColor));
            }
            /***************************/
            object.transform.scale(new Vector3_1.Vector3(CameraSettings_1.CameraSettings.scaling, CameraSettings_1.CameraSettings.scaling, CameraSettings_1.CameraSettings.scaling));
            if (CameraSettings_1.CameraSettings.rotationDirection.getMagnitude() != 0) {
                object.transform.rotate(CameraSettings_1.CameraSettings.rotationDirection, CameraSettings_1.CameraSettings.rotationAngle);
            }
            /***************************/
        }
        this.render(objectsToRender);
        this.targetScreen.setFpsDisplay(this.calculateFps());
        window.requestAnimationFrame(this.update.bind(this));
    }
    calculateFps() {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
        }
        const delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        return Math.round(1 / delta);
    }
    render(triangles) {
        const screenBuffer = new ScreenBuffer_1.ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        const depthBuffer = new Array(this.targetScreen.width * this.targetScreen.height).fill(Number.MAX_SAFE_INTEGER);
        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, Settings_1.Settings.clearColor);
            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);
            for (const triangle of triangles) {
                if (triangle.isIn(screenX, screenY)) {
                    const lambdaCords = triangle.toLambdaCoordinates(screenX, screenY);
                    const depth = Rasterizer.calculateDepth(lambdaCords, triangle);
                    if (depth < depthBuffer[i / 4]) {
                        depthBuffer[i / 4] = depth;
                        screenBuffer.setColor(i, Rasterizer.calculateInterpolatedColor(lambdaCords, triangle));
                    }
                }
            }
        }
        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
    }
    calculateScreenY(i) {
        return Math.floor((i / 4) / this.targetScreen.width);
    }
    calculateScreenX(i) {
        return (i / 4) % this.targetScreen.width;
    }
    static calculateDepth(lambdaCords, triangle) {
        return lambdaCords.x * triangle.a.z + lambdaCords.y * triangle.b.z + lambdaCords.z * triangle.c.z;
    }
    static calculateInterpolatedColor(lambdaCords, triangle) {
        const redInterpolated = lambdaCords.x * triangle.aColor.r + lambdaCords.y * triangle.bColor.r + lambdaCords.z * triangle.cColor.r;
        const greenInterpolated = lambdaCords.x * triangle.aColor.g + lambdaCords.y * triangle.bColor.g + lambdaCords.z * triangle.cColor.g;
        const blueInterpolated = lambdaCords.x * triangle.aColor.b + lambdaCords.y * triangle.bColor.b + lambdaCords.z * triangle.cColor.b;
        return new Color_1.Color(redInterpolated, greenInterpolated, blueInterpolated);
    }
}
exports.Rasterizer = Rasterizer;


/***/ }),

/***/ "./src/scripts/geometry/DrawableObject.ts":
/*!************************************************!*\
  !*** ./src/scripts/geometry/DrawableObject.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = __webpack_require__(/*! ./Transform */ "./src/scripts/geometry/Transform.ts");
class DrawableObject {
    constructor() {
        this._transform = new Transform_1.Transform();
    }
    get transform() {
        return this._transform;
    }
}
exports.DrawableObject = DrawableObject;


/***/ }),

/***/ "./src/scripts/geometry/Transform.ts":
/*!*******************************************!*\
  !*** ./src/scripts/geometry/Transform.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Matrix4x4_1 = __webpack_require__(/*! ../math/Matrix4x4 */ "./src/scripts/math/Matrix4x4.ts");
class Transform {
    constructor() {
        this._objectToWorld = Matrix4x4_1.Matrix4x4.createIdentity();
    }
    translate(translation) {
        const translationMatrix = new Matrix4x4_1.Matrix4x4();
        translationMatrix.data[0] = new Float32Array([1, 0, 0, translation.x]);
        translationMatrix.data[1] = new Float32Array([0, 1, 0, translation.y]);
        translationMatrix.data[2] = new Float32Array([0, 0, 1, translation.z]);
        translationMatrix.data[3] = new Float32Array([0, 0, 0, 1]);
        this._objectToWorld = translationMatrix.multiply(this._objectToWorld);
    }
    scale(scaling) {
        const scalingMatrix = new Matrix4x4_1.Matrix4x4();
        scalingMatrix.data[0] = new Float32Array([scaling.x, 0, 0, 0]);
        scalingMatrix.data[1] = new Float32Array([0, scaling.y, 0, 0]);
        scalingMatrix.data[2] = new Float32Array([0, 0, scaling.z, 0]);
        scalingMatrix.data[3] = new Float32Array([0, 0, 0, 1]);
        this._objectToWorld = scalingMatrix.multiply(this._objectToWorld);
    }
    rotate(rotationDirection, angle) {
        const rotationMatrix = new Matrix4x4_1.Matrix4x4();
        const sin = Math.sin(angle * Math.PI / 180);
        const cos = Math.cos(angle * Math.PI / 180);
        rotationDirection = rotationDirection.getNormalized();
        const x = rotationDirection.x;
        const y = rotationDirection.y;
        const z = rotationDirection.z;
        rotationMatrix.data[0][0] = x * x * (1 - cos) + cos;
        rotationMatrix.data[0][1] = x * y * (1 - cos) - z * sin;
        rotationMatrix.data[0][2] = x * z * (1 - cos) + y * sin;
        rotationMatrix.data[0][3] = 0;
        rotationMatrix.data[1][0] = y * x * (1 - cos) + z * sin;
        rotationMatrix.data[1][1] = y * y * (1 - cos) + cos;
        rotationMatrix.data[1][2] = y * z * (1 - cos) - x * sin;
        rotationMatrix.data[1][3] = 0;
        rotationMatrix.data[2][0] = x * z * (1 - cos) - y * sin;
        rotationMatrix.data[2][1] = y * z * (1 - cos) + x * sin;
        rotationMatrix.data[2][2] = z * z * (1 - cos) + cos;
        rotationMatrix.data[2][3] = 0;
        rotationMatrix.data[3][0] = 0;
        rotationMatrix.data[3][1] = 0;
        rotationMatrix.data[3][2] = 0;
        rotationMatrix.data[3][3] = 1;
        this._objectToWorld = rotationMatrix.multiply(this._objectToWorld);
    }
    get objectToWorld() {
        return this._objectToWorld;
    }
}
exports.Transform = Transform;


/***/ }),

/***/ "./src/scripts/geometry/Triangle.ts":
/*!******************************************!*\
  !*** ./src/scripts/geometry/Triangle.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ../math/Vector3 */ "./src/scripts/math/Vector3.ts");
const Settings_1 = __webpack_require__(/*! ../screen/Settings */ "./src/scripts/screen/Settings.ts");
const DrawableObject_1 = __webpack_require__(/*! ./DrawableObject */ "./src/scripts/geometry/DrawableObject.ts");
class Triangle extends DrawableObject_1.DrawableObject {
    constructor(a, b, c, aColor, bColor, cColor) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._aColor = aColor;
        this._bColor = bColor;
        this._cColor = cColor;
        const x1 = (this.a.x + 1) * Settings_1.Settings.screenWidth * 0.5;
        const x2 = (this.b.x + 1) * Settings_1.Settings.screenWidth * 0.5;
        const x3 = (this.c.x + 1) * Settings_1.Settings.screenWidth * 0.5;
        const y1 = Math.abs((this.a.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight);
        const y2 = Math.abs((this.b.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight);
        const y3 = Math.abs((this.c.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight);
        this.screenA = new Vector3_1.Vector3(x1, y1);
        this.screenB = new Vector3_1.Vector3(x2, y2);
        this.screenC = new Vector3_1.Vector3(x3, y3);
        this.minX = Math.min(this.screenA.x, this.screenB.x, this.screenC.x);
        this.maxX = Math.max(this.screenA.x, this.screenB.x, this.screenC.x);
        this.minY = Math.min(this.screenA.y, this.screenB.y, this.screenC.y);
        this.maxY = Math.max(this.screenA.y, this.screenB.y, this.screenC.y);
        this.dxAB = this.screenA.x - this.screenB.x;
        this.dxBC = this.screenB.x - this.screenC.x;
        this.dxCA = this.screenC.x - this.screenA.x;
        this.dyAB = this.screenA.y - this.screenB.y;
        this.dyBC = this.screenB.y - this.screenC.y;
        this.dyCA = this.screenC.y - this.screenA.y;
        this.isATopLeft = this.dyAB < 0 || (this.dyAB === 0 && this.dxAB > 0);
        this.isBTopLeft = this.dyBC < 0 || (this.dyBC === 0 && this.dxBC > 0);
        this.isCTopLeft = this.dyCA < 0 || (this.dyCA === 0 && this.dxCA > 0);
    }
    toLambdaCoordinates(x, y) {
        const lambdaA = (this.dyBC * (x - this.screenC.x) + -this.dxBC * (y - this.screenC.y)) /
            (this.dyBC * -this.dxCA + -this.dxBC * -this.dyCA);
        const lambdaB = (this.dyCA * (x - this.screenC.x) + -this.dxCA * (y - this.screenC.y)) /
            (this.dyCA * this.dxBC + -this.dxCA * this.dyBC);
        const lambdaC = 1 - lambdaA - lambdaB;
        return new Vector3_1.Vector3(lambdaA, lambdaB, lambdaC);
    }
    isIn(x, y) {
        return this.isInBoundingBox(x, y) &&
            this.isInTriangle(x, y);
    }
    isInTriangle(x, y) {
        const isABOk = (this.isATopLeft && this.isBTopLeft) ?
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) >= 0 :
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0;
        const isBCOk = (this.isBTopLeft && this.isCTopLeft) ?
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) >= 0 :
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0;
        const isCAOk = (this.isCTopLeft && this.isATopLeft) ?
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) >= 0 :
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;
        return isABOk && isBCOk && isCAOk;
    }
    isInBoundingBox(x, y) {
        return x <= this.maxX && x >= this.minX &&
            y <= this.maxY && y >= this.minY;
    }
    get a() {
        return this._a;
    }
    get b() {
        return this._b;
    }
    get c() {
        return this._c;
    }
    get aColor() {
        return this._aColor;
    }
    get bColor() {
        return this._bColor;
    }
    get cColor() {
        return this._cColor;
    }
}
exports.Triangle = Triangle;


/***/ }),

/***/ "./src/scripts/geometry/VertexProcessor.ts":
/*!*************************************************!*\
  !*** ./src/scripts/geometry/VertexProcessor.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Matrix4x4_1 = __webpack_require__(/*! ../math/Matrix4x4 */ "./src/scripts/math/Matrix4x4.ts");
class VertexProcessor {
    constructor() {
        this.viewToProjection = new Matrix4x4_1.Matrix4x4();
        this.worldToView = new Matrix4x4_1.Matrix4x4();
    }
    setLookAt(position, target, upDirection) {
        const cameraDirection = target.substract(position).getNormalized();
        upDirection = upDirection.getNormalized();
        const s = cameraDirection.cross(upDirection);
        const u = s.cross(cameraDirection);
        this.worldToView.data[0] = new Float32Array([s.x, s.y, s.z, -position.x]);
        this.worldToView.data[1] = new Float32Array([u.x, u.y, u.z, -position.y]);
        this.worldToView.data[2] = new Float32Array([-cameraDirection.x, -cameraDirection.y, -cameraDirection.z, -position.z]);
        this.worldToView.data[3] = new Float32Array([0, 0, 0, 1]);
    }
    setPerspective(fovY, aspect, near, far) {
        fovY *= Math.PI / 360;
        const f = Math.cos(fovY) / Math.sin(fovY);
        this.viewToProjection.data[0] = new Float32Array([f / aspect, 0, 0, 0]);
        this.viewToProjection.data[1] = new Float32Array([0, f, 0, 0]);
        this.viewToProjection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)]);
        this.viewToProjection.data[3] = new Float32Array([0, 0, -1, 0]);
        this.VP = this.viewToProjection.multiply(this.worldToView); // TODO: can't be here
    }
    transform(vertex, objectTransform) {
        // const WVP = objectTransform.objectToWorld.multiply(this.VP);
        const WVP = this.VP.multiply(objectTransform.objectToWorld);
        return WVP.multiply(vertex);
    }
}
exports.VertexProcessor = VertexProcessor;


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ScreenHandler_1 = __webpack_require__(/*! ./screen/ScreenHandler */ "./src/scripts/screen/ScreenHandler.ts");
const Rasterizer_1 = __webpack_require__(/*! ./Rasterizer */ "./src/scripts/Rasterizer.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const Triangle_1 = __webpack_require__(/*! ./geometry/Triangle */ "./src/scripts/geometry/Triangle.ts");
const Color_1 = __webpack_require__(/*! ./screen/Color */ "./src/scripts/screen/Color.ts");
const Settings_1 = __webpack_require__(/*! ./screen/Settings */ "./src/scripts/screen/Settings.ts");
const KeyboardInput_1 = __webpack_require__(/*! ./Input/KeyboardInput */ "./src/scripts/Input/KeyboardInput.ts");
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    KeyboardInput_1.KeyboardInput.registerKeyBindings();
    const red = new Color_1.Color(255, 0, 0);
    const green = new Color_1.Color(0, 255, 0);
    const blue = new Color_1.Color(0, 0, 255);
    const a1 = new Vector3_1.Vector3(0.75, 0, 0);
    const b1 = new Vector3_1.Vector3(0.75, 0.5, 0);
    const c1 = new Vector3_1.Vector3(-0.5, 0.6, 0);
    const triangle = new Triangle_1.Triangle(a1, b1, c1, red, green, blue);
    // triangle.transform.translate(new Vector3(0, 0, -10));
    // triangle.transform.scale(new Vector3(3, 3, 3));
    // triangle.transform.rotate(new Vector3(1, 0, 0), 60);
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [triangle]);
    rasterizer.update();
}
document.addEventListener("DOMContentLoaded", initialize);


/***/ }),

/***/ "./src/scripts/math/Matrix4x4.ts":
/*!***************************************!*\
  !*** ./src/scripts/math/Matrix4x4.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ./Vector3 */ "./src/scripts/math/Vector3.ts");
class Matrix4x4 {
    constructor(asIdentity = false) {
        if (asIdentity) {
            this.data = [new Float32Array([1, 0, 0, 0]),
                new Float32Array([0, 1, 0, 0]),
                new Float32Array([0, 0, 1, 0]),
                new Float32Array([0, 0, 0, 1])];
        }
        else {
            this.data = [new Float32Array(4),
                new Float32Array(4),
                new Float32Array(4),
                new Float32Array(4)];
        }
    }
    static createIdentity() {
        return new Matrix4x4(true);
    }
    multiply(other) {
        if (other instanceof Vector3_1.Vector3) {
            const w = 1;
            const tx = this.data[0][0] * other.x + this.data[0][1] * other.y + this.data[0][2] * other.z + this.data[0][3] * w;
            const ty = this.data[1][0] * other.x + this.data[1][1] * other.y + this.data[1][2] * other.z + this.data[1][3] * w;
            const tz = this.data[2][0] * other.x + this.data[2][1] * other.y + this.data[2][2] * other.z + this.data[2][3] * w;
            const tw = this.data[3][0] * other.x + this.data[3][1] * other.y + this.data[3][2] * other.z + this.data[3][3] * w;
            return new Vector3_1.Vector3(tx / tw, ty / tw, tz / tw);
        }
        else {
            const result = new Matrix4x4();
            result.data[0][0] = this.data[0][0] * other.data[0][0] + this.data[0][1] * other.data[1][0] + this.data[0][2] * other.data[2][0] + this.data[0][3] * other.data[3][0];
            result.data[0][1] = this.data[0][0] * other.data[0][1] + this.data[0][1] * other.data[1][1] + this.data[0][2] * other.data[2][1] + this.data[0][3] * other.data[3][1];
            result.data[0][2] = this.data[0][0] * other.data[0][2] + this.data[0][1] * other.data[1][2] + this.data[0][2] * other.data[2][2] + this.data[0][3] * other.data[3][2];
            result.data[0][3] = this.data[0][0] * other.data[0][3] + this.data[0][1] * other.data[1][3] + this.data[0][2] * other.data[2][3] + this.data[0][3] * other.data[3][3];
            result.data[1][0] = this.data[1][0] * other.data[0][0] + this.data[1][1] * other.data[1][0] + this.data[1][2] * other.data[2][0] + this.data[1][3] * other.data[3][0];
            result.data[1][1] = this.data[1][0] * other.data[0][1] + this.data[1][1] * other.data[1][1] + this.data[1][2] * other.data[2][1] + this.data[1][3] * other.data[3][1];
            result.data[1][2] = this.data[1][0] * other.data[0][2] + this.data[1][1] * other.data[1][2] + this.data[1][2] * other.data[2][2] + this.data[1][3] * other.data[3][2];
            result.data[1][3] = this.data[1][0] * other.data[0][3] + this.data[1][1] * other.data[1][3] + this.data[1][2] * other.data[2][3] + this.data[1][3] * other.data[3][3];
            result.data[2][0] = this.data[2][0] * other.data[0][0] + this.data[2][1] * other.data[1][0] + this.data[2][2] * other.data[2][0] + this.data[2][3] * other.data[3][0];
            result.data[2][1] = this.data[2][0] * other.data[0][1] + this.data[2][1] * other.data[1][1] + this.data[2][2] * other.data[2][1] + this.data[2][3] * other.data[3][1];
            result.data[2][2] = this.data[2][0] * other.data[0][2] + this.data[2][1] * other.data[1][2] + this.data[2][2] * other.data[2][2] + this.data[2][3] * other.data[3][2];
            result.data[2][3] = this.data[2][0] * other.data[0][3] + this.data[2][1] * other.data[1][3] + this.data[2][2] * other.data[2][3] + this.data[2][3] * other.data[3][3];
            result.data[3][0] = this.data[3][0] * other.data[0][0] + this.data[3][1] * other.data[1][0] + this.data[3][2] * other.data[2][0] + this.data[3][3] * other.data[3][0];
            result.data[3][1] = this.data[3][0] * other.data[0][1] + this.data[3][1] * other.data[1][1] + this.data[3][2] * other.data[2][1] + this.data[3][3] * other.data[3][1];
            result.data[3][2] = this.data[3][0] * other.data[0][2] + this.data[3][1] * other.data[1][2] + this.data[3][2] * other.data[2][2] + this.data[3][3] * other.data[3][2];
            result.data[3][3] = this.data[3][0] * other.data[0][3] + this.data[3][1] * other.data[1][3] + this.data[3][2] * other.data[2][3] + this.data[3][3] * other.data[3][3];
            return result;
        }
    }
}
exports.Matrix4x4 = Matrix4x4;


/***/ }),

/***/ "./src/scripts/math/Vector3.ts":
/*!*************************************!*\
  !*** ./src/scripts/math/Vector3.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    static betweenPoints(p1, p2) {
        const x = p1._x - p2._x;
        const y = p1._y - p2._y;
        const z = p1._z - p2._z;
        return new Vector3(x, y, z);
    }
    getMagnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }
    getNormalized() {
        return this.divide(this.getMagnitude());
    }
    dot(other) {
        return this._x * other._x + this._y * other._y + this._z * other._z;
    }
    cross(other) {
        return new Vector3((this._y * other._z) - (this._z * other._y), (this._z * other._x) - (this._x * other._z), (this._x * other._y) - (this._y * other._x));
    }
    add(other) {
        return new Vector3(this._x + other._x, this._y + other._y, this._z + other._z);
    }
    substract(other) {
        return new Vector3(this._x - other._x, this._y - other._y, this._z - other._z);
    }
    multiply(other) {
        if (other instanceof Vector3) {
            return new Vector3(this._x * other._x, this._y * other._y, this._z * other._y);
        }
        else {
            return new Vector3(this._x * other, this._y * other, this._z * other);
        }
    }
    divide(other) {
        if (other instanceof Vector3) {
            return new Vector3(this._x / other._x, this._y / other._y, this._z / other._y);
        }
        else {
            return new Vector3(this._x / other, this._y / other, this._z / other);
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
}
exports.Vector3 = Vector3;


/***/ }),

/***/ "./src/scripts/screen/Color.ts":
/*!*************************************!*\
  !*** ./src/scripts/screen/Color.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r, g, b, a = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }
    get r() {
        return this._r;
    }
    get g() {
        return this._g;
    }
    get b() {
        return this._b;
    }
    get a() {
        return this._a;
    }
}
exports.Color = Color;


/***/ }),

/***/ "./src/scripts/screen/ScreenBuffer.ts":
/*!********************************************!*\
  !*** ./src/scripts/screen/ScreenBuffer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ScreenBuffer {
    constructor(screenWidth, screenHeight) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
    }
    getLength() {
        return this._buffer.length;
    }
    setColor(index, color) {
        this._buffer[index] = color.r;
        this._buffer[index + 1] = color.g;
        this._buffer[index + 2] = color.b;
        this._buffer[index + 3] = color.a;
    }
    get buffer() {
        return this._buffer;
    }
}
exports.ScreenBuffer = ScreenBuffer;


/***/ }),

/***/ "./src/scripts/screen/ScreenHandler.ts":
/*!*********************************************!*\
  !*** ./src/scripts/screen/ScreenHandler.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ScreenHandler {
    constructor(canvas) {
        this._canvasCtx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
    }
    setPixelsFromBuffer(colorBuffer) {
        const imageData = new ImageData(colorBuffer, this.width, this.height);
        this._canvasCtx.putImageData(imageData, 0, 0);
    }
    setFpsDisplay(fps) {
        this._canvasCtx.fillStyle = "#08a300";
        this._canvasCtx.fillText("FPS: " + fps, 10, 20);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}
exports.ScreenHandler = ScreenHandler;


/***/ }),

/***/ "./src/scripts/screen/Settings.ts":
/*!****************************************!*\
  !*** ./src/scripts/screen/Settings.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(/*! ./Color */ "./src/scripts/screen/Color.ts");
class Settings {
}
exports.Settings = Settings;
Settings.clearColor = new Color_1.Color(0, 0, 0, 50);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvQ2FtZXJhL0NhbWVyYVNldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL0lucHV0L0tleWJvYXJkSW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9EcmF3YWJsZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9UcmFuc2Zvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJpYW5nbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVmVydGV4UHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvTWF0cml4NHg0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvVmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL1NjcmVlbkJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2NyZWVuSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUF3QztBQUV4QyxNQUFhLGNBQWM7O0FBQTNCLHdDQVFDO0FBUFUscUJBQU0sR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5QixxQkFBTSxHQUFHLElBQUksaUJBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRTlCLHNCQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRVosZ0NBQWlCLEdBQUcsSUFBSSxpQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsNEJBQWEsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDVkYsdUhBQXdEO0FBQ3hELDhGQUF3QztBQUV4QyxNQUFhLGFBQWE7SUFDdEIsTUFBTSxDQUFDLG1CQUFtQjtRQUN0QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDbkIsK0JBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxDQUFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0SCwrQkFBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFPLENBQUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RILE9BQU87YUFDVjtZQUNELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7Z0JBQ25CLCtCQUFjLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQU8sQ0FBQywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEgsK0JBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxDQUFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0SCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFO2dCQUNuQiwrQkFBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFPLENBQUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3RILCtCQUFjLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQU8sQ0FBQywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdEgsT0FBTzthQUNWO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDbkIsK0JBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxDQUFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN0SCwrQkFBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFPLENBQUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3RILE9BQU87YUFDVjtZQUVELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7Z0JBQ25CLCtCQUFjLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQU8sQ0FBQywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEgsK0JBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxDQUFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0SCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFO2dCQUNuQiwrQkFBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFPLENBQUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RILCtCQUFjLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQU8sQ0FBQywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEgsT0FBTzthQUNWO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDbkIsK0JBQWMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsK0JBQWMsQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDO2dCQUN0QyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFO2dCQUNuQiwrQkFBYyxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCwrQkFBYyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUM7Z0JBQ3RDLE9BQU87YUFDVjtZQUNELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7Z0JBQ25CLCtCQUFjLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQztnQkFDaEMsT0FBTzthQUNWO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDbkIsK0JBQWMsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO2dCQUNoQyxPQUFPO2FBQ1Y7UUFDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUF2REQsc0NBdURDOzs7Ozs7Ozs7Ozs7Ozs7QUN6REQsd0dBQTZDO0FBQzdDLGdIQUFtRDtBQUNuRCwyRkFBcUM7QUFDckMsNkZBQXVDO0FBQ3ZDLG9HQUEyQztBQUMzQyw2SEFBMkQ7QUFDM0Qsc0hBQXVEO0FBR3ZELE1BQWEsVUFBVTtJQU1uQixZQUFZLFlBQTJCLEVBQUUsZUFBaUM7UUFDdEUsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQUVNLE1BQU07UUFDVCxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7UUFDakMsRUFBRSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLE1BQU0sRUFBRSwrQkFBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLElBQUksTUFBTSxZQUFZLG1CQUFRLEVBQUU7Z0JBQzVCLE1BQU0sY0FBYyxHQUFHLE1BQWtCLENBQUM7Z0JBQzFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNqUTtZQUVELDZCQUE2QjtZQUM3QixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLGlCQUFPLENBQUMsK0JBQWMsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVHLElBQUksK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLCtCQUFjLENBQUMsaUJBQWlCLEVBQUUsK0JBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMzRjtZQUNELDZCQUE2QjtTQUNoQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDM0M7UUFDRCxNQUFNLEtBQUssR0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxTQUFxQjtRQUNoQyxNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RixNQUFNLFdBQVcsR0FBYSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUxSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpDLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUM5QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFO29CQUNqQyxNQUFNLFdBQVcsR0FBWSxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RSxNQUFNLEtBQUssR0FBVyxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDNUIsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQzNCLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztxQkFDMUY7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLGdCQUFnQixDQUFDLENBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLGdCQUFnQixDQUFDLENBQVM7UUFDOUIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFvQixFQUFFLFFBQWtCO1FBQ2xFLE9BQU8sV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQUVPLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxXQUFvQixFQUFFLFFBQWtCO1FBQzlFLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xJLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEksTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuSSxPQUFPLElBQUksYUFBSyxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FFSjtBQXRGRCxnQ0FzRkM7Ozs7Ozs7Ozs7Ozs7OztBQ2hHRCxrR0FBc0M7QUFFdEMsTUFBc0IsY0FBYztJQUdoQztRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUlELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUFaRCx3Q0FZQzs7Ozs7Ozs7Ozs7Ozs7O0FDZEQsb0dBQTRDO0FBRzVDLE1BQWEsU0FBUztJQUdsQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsU0FBUyxDQUFDLFdBQW9CO1FBQzFCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDMUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFnQjtRQUNsQixNQUFNLGFBQWEsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUN0QyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsaUJBQTBCLEVBQUUsS0FBYTtRQUM1QyxNQUFNLGNBQWMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFD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RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDcEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxPQUFPLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLFlBQVksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNyQyxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxPQUFPLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFFTyxlQUFlLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDeEMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7WUFDbkMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBaElELDRCQWdJQzs7Ozs7Ozs7Ozs7Ozs7O0FDcklELG9HQUE0QztBQUk1QyxNQUFhLGVBQWU7SUFBNUI7UUFDcUIscUJBQWdCLEdBQWMsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDOUMsZ0JBQVcsR0FBYyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztJQStCOUQsQ0FBQztJQTVCRyxTQUFTLENBQUMsUUFBaUIsRUFBRSxNQUFlLEVBQUUsV0FBb0I7UUFDOUQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuRSxXQUFXLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2SCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFZLEVBQUUsTUFBYyxFQUFFLElBQVksRUFBRSxHQUFXO1FBQ2xFLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxZQUFZLENB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Q0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsT0FBTyxJQUFJLGlCQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FB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QyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUE3QkQsc0NBNkJDOzs7Ozs7Ozs7Ozs7Ozs7QUM3QkQsb0ZBQThCO0FBRTlCLE1BQWEsUUFBUTs7QUFBckIsNEJBSUM7QUFEVSxtQkFBVSxHQUFVLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmFTZXR0aW5ncyB7XHJcbiAgICBzdGF0aWMgbG9va0F0ID0gbmV3IFZlY3RvcjMoMCwgMCwgNSk7XHJcbiAgICBzdGF0aWMgdGFyZ2V0ID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcblxyXG4gICAgc3RhdGljIHNjYWxpbmcgPSAxO1xyXG5cclxuICAgIHN0YXRpYyByb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgc3RhdGljIHJvdGF0aW9uQW5nbGUgPSAwO1xyXG59OyIsImltcG9ydCB7Q2FtZXJhU2V0dGluZ3N9IGZyb20gXCIuLi9DYW1lcmEvQ2FtZXJhU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dCB7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJLZXlCaW5kaW5ncygpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdhJykge1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MubG9va0F0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MubG9va0F0LnggLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnopO1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnggLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdkJykge1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MubG9va0F0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MubG9va0F0LnggKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnopO1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnggKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAndycpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLmxvb2tBdCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLmxvb2tBdC54LCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnRhcmdldCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLnRhcmdldC54LCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncycpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLmxvb2tBdCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLmxvb2tBdC54LCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnogKyAwLjAxKTtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnRhcmdldCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLnRhcmdldC54LCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnogKyAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJysnKSB7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5sb29rQXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy5sb29rQXQueCwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnkgKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy50YXJnZXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy50YXJnZXQueCwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnkgKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5sb29rQXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy5sb29rQXQueCwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnkgLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy50YXJnZXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy50YXJnZXQueCwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnkgLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ24nKSB7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5yb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDEsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3Mucm90YXRpb25BbmdsZSArPSAwLjAwMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnbScpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnJvdGF0aW9uRGlyZWN0aW9uID0gbmV3IFZlY3RvcjMoMSwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5yb3RhdGlvbkFuZ2xlICs9IDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdqJykge1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3Muc2NhbGluZyAtPSAwLjAwMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaycpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnNjYWxpbmcgKz0gMC4wMDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7U2NyZWVuQnVmZmVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuQnVmZmVyXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtWZXJ0ZXhQcm9jZXNzb3J9IGZyb20gXCIuL2dlb21ldHJ5L1ZlcnRleFByb2Nlc3NvclwiO1xyXG5pbXBvcnQge0NhbWVyYVNldHRpbmdzfSBmcm9tIFwiLi9DYW1lcmEvQ2FtZXJhU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vZ2VvbWV0cnkvRHJhd2FibGVPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXN0ZXJpemVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhcmdldFNjcmVlbjogU2NyZWVuSGFuZGxlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhd2FibGVPYmplY3RzOiBEcmF3YWJsZU9iamVjdFtdO1xyXG4gICAgcHJpdmF0ZSBsYXN0Q2FsbGVkVGltZTogRE9NSGlnaFJlc1RpbWVTdGFtcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXIsIGRyYXdhYmxlT2JqZWN0czogRHJhd2FibGVPYmplY3RbXSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuID0gdGFyZ2V0U2NyZWVuO1xyXG4gICAgICAgIHRoaXMuZHJhd2FibGVPYmplY3RzID0gZHJhd2FibGVPYmplY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0c1RvUmVuZGVyID0gW107XHJcbiAgICAgICAgY29uc3QgdnAgPSBuZXcgVmVydGV4UHJvY2Vzc29yKCk7XHJcbiAgICAgICAgdnAuc2V0TG9va0F0KENhbWVyYVNldHRpbmdzLmxvb2tBdCwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XHJcbiAgICAgICAgdnAuc2V0UGVyc3BlY3RpdmUoNDUsIDEsIDAuMSwgMTAwKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiB0aGlzLmRyYXdhYmxlT2JqZWN0cykge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgVHJpYW5nbGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWFuZ2xlT2JqZWN0ID0gb2JqZWN0IGFzIFRyaWFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0c1RvUmVuZGVyLnB1c2gobmV3IFRyaWFuZ2xlKHZwLnRyYW5zZm9ybSh0cmlhbmdsZU9iamVjdC5hLCBvYmplY3QudHJhbnNmb3JtKSwgdnAudHJhbnNmb3JtKHRyaWFuZ2xlT2JqZWN0LmIsIG9iamVjdC50cmFuc2Zvcm0pLCB2cC50cmFuc2Zvcm0odHJpYW5nbGVPYmplY3QuYywgb2JqZWN0LnRyYW5zZm9ybSksIHRyaWFuZ2xlT2JqZWN0LmFDb2xvciwgdHJpYW5nbGVPYmplY3QuYkNvbG9yLCB0cmlhbmdsZU9iamVjdC5jQ29sb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICAgICAgb2JqZWN0LnRyYW5zZm9ybS5zY2FsZShuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy5zY2FsaW5nLCBDYW1lcmFTZXR0aW5ncy5zY2FsaW5nLCBDYW1lcmFTZXR0aW5ncy5zY2FsaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChDYW1lcmFTZXR0aW5ncy5yb3RhdGlvbkRpcmVjdGlvbi5nZXRNYWduaXR1ZGUoKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudHJhbnNmb3JtLnJvdGF0ZShDYW1lcmFTZXR0aW5ncy5yb3RhdGlvbkRpcmVjdGlvbiwgQ2FtZXJhU2V0dGluZ3Mucm90YXRpb25BbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIob2JqZWN0c1RvUmVuZGVyKTtcclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5zZXRGcHNEaXNwbGF5KHRoaXMuY2FsY3VsYXRlRnBzKCkpO1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMubGFzdENhbGxlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWx0YTogbnVtYmVyID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgxIC8gZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKHRyaWFuZ2xlczogVHJpYW5nbGVbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbkJ1ZmZlciA9IG5ldyBTY3JlZW5CdWZmZXIodGhpcy50YXJnZXRTY3JlZW4ud2lkdGgsIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgZGVwdGhCdWZmZXI6IG51bWJlcltdID0gbmV3IEFycmF5KHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICogdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KS5maWxsKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JlZW5CdWZmZXIuZ2V0TGVuZ3RoKCk7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgU2V0dGluZ3MuY2xlYXJDb2xvcik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5YID0gdGhpcy5jYWxjdWxhdGVTY3JlZW5YKGkpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5ZID0gdGhpcy5jYWxjdWxhdGVTY3JlZW5ZKGkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0cmlhbmdsZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmlhbmdsZS5pc0luKHNjcmVlblgsIHNjcmVlblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFtYmRhQ29yZHM6IFZlY3RvcjMgPSB0cmlhbmdsZS50b0xhbWJkYUNvb3JkaW5hdGVzKHNjcmVlblgsIHNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCB0cmlhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZGVwdGhCdWZmZXJbaSAvIDRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2kgLyA0XSA9IGRlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgdHJpYW5nbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0UGl4ZWxzRnJvbUJ1ZmZlcihzY3JlZW5CdWZmZXIuYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVNjcmVlblkoaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoaSAvIDQpIC8gdGhpcy50YXJnZXRTY3JlZW4ud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlU2NyZWVuWChpOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoaSAvIDQpICUgdGhpcy50YXJnZXRTY3JlZW4ud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hLnogKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYi56ICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmMuejtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogQ29sb3Ige1xyXG4gICAgICAgIGNvbnN0IHJlZEludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuciArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuciArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IucjtcclxuICAgICAgICBjb25zdCBncmVlbkludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuZyArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuZyArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuZztcclxuICAgICAgICBjb25zdCBibHVlSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5iICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5iICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5iO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkSW50ZXJwb2xhdGVkLCBncmVlbkludGVycG9sYXRlZCwgYmx1ZUludGVycG9sYXRlZCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gXCIuL1RyYW5zZm9ybVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlT2JqZWN0IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RyYW5zZm9ybTogVHJhbnNmb3JtO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4gICAgZ2V0IHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge01hdHJpeDR4NH0gZnJvbSBcIi4uL21hdGgvTWF0cml4NHg0XCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XHJcbiAgICBwcml2YXRlIF9vYmplY3RUb1dvcmxkOiBNYXRyaXg0eDQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0VG9Xb3JsZCA9IE1hdHJpeDR4NC5jcmVhdGVJZGVudGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCB0cmFuc2xhdGlvbi54XSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIHRyYW5zbGF0aW9uLnldKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgdHJhbnNsYXRpb24uel0pO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0VG9Xb3JsZCA9IHRyYW5zbGF0aW9uTWF0cml4Lm11bHRpcGx5KHRoaXMuX29iamVjdFRvV29ybGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlKHNjYWxpbmc6IFZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY2FsaW5nTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3NjYWxpbmcueCwgMCwgMCwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIHNjYWxpbmcueSwgMCwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIHNjYWxpbmcueiwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICB0aGlzLl9vYmplY3RUb1dvcmxkID0gc2NhbGluZ01hdHJpeC5tdWx0aXBseSh0aGlzLl9vYmplY3RUb1dvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGUocm90YXRpb25EaXJlY3Rpb246IFZlY3RvcjMsIGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhbmdsZSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgcm90YXRpb25EaXJlY3Rpb24gPSByb3RhdGlvbkRpcmVjdGlvbi5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgeCA9IHJvdGF0aW9uRGlyZWN0aW9uLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHJvdGF0aW9uRGlyZWN0aW9uLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IHJvdGF0aW9uRGlyZWN0aW9uLno7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMF0gPSB4ICogeCAqICgxIC0gY29zKSArIGNvcztcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzFdID0geCAqIHkgKiAoMSAtIGNvcykgLSB6ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMl0gPSB4ICogeiAqICgxIC0gY29zKSArIHkgKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bMF0gPSB5ICogeCAqICgxIC0gY29zKSArIHogKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVsxXSA9IHkgKiB5ICogKDEgLSBjb3MpICsgY29zO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bMl0gPSB5ICogeiAqICgxIC0gY29zKSAtIHggKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bMF0gPSB4ICogeiAqICgxIC0gY29zKSAtIHkgKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVsxXSA9IHkgKiB6ICogKDEgLSBjb3MpICsgeCAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzJdID0geiAqIHogKiAoMSAtIGNvcykgKyBjb3M7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMF0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMV0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMl0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bM10gPSAxO1xyXG5cclxuICAgICAgICB0aGlzLl9vYmplY3RUb1dvcmxkID0gcm90YXRpb25NYXRyaXgubXVsdGlwbHkodGhpcy5fb2JqZWN0VG9Xb3JsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG9iamVjdFRvV29ybGQoKTogTWF0cml4NHg0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0VG9Xb3JsZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vRHJhd2FibGVPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlhbmdsZSBleHRlbmRzIERyYXdhYmxlT2JqZWN0IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2M6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYUNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jQ29sb3I6IENvbG9yO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeENBOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUNBOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtaW5YOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1heFg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWluWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYXhZOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0FUb3BMZWZ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0JUb3BMZWZ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0NUb3BMZWZ0OiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMsIGM6IFZlY3RvcjMsIGFDb2xvcjogQ29sb3IsIGJDb2xvcjogQ29sb3IsIGNDb2xvcjogQ29sb3IpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2MgPSBjO1xyXG4gICAgICAgIHRoaXMuX2FDb2xvciA9IGFDb2xvcjtcclxuICAgICAgICB0aGlzLl9iQ29sb3IgPSBiQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fY0NvbG9yID0gY0NvbG9yO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9ICh0aGlzLmEueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeDIgPSAodGhpcy5iLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41O1xyXG4gICAgICAgIGNvbnN0IHgzID0gKHRoaXMuYy54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB5MSA9IE1hdGguYWJzKCh0aGlzLmEueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MiA9IE1hdGguYWJzKCh0aGlzLmIueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MyA9IE1hdGguYWJzKCh0aGlzLmMueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5BID0gbmV3IFZlY3RvcjMoeDEsIHkxKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkIgPSBuZXcgVmVjdG9yMyh4MiwgeTIpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQyA9IG5ldyBWZWN0b3IzKHgzLCB5Myk7XHJcblxyXG4gICAgICAgIHRoaXMubWluWCA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG5cclxuICAgICAgICB0aGlzLmR4QUIgPSB0aGlzLnNjcmVlbkEueCAtIHRoaXMuc2NyZWVuQi54O1xyXG4gICAgICAgIHRoaXMuZHhCQyA9IHRoaXMuc2NyZWVuQi54IC0gdGhpcy5zY3JlZW5DLng7XHJcbiAgICAgICAgdGhpcy5keENBID0gdGhpcy5zY3JlZW5DLnggLSB0aGlzLnNjcmVlbkEueDtcclxuXHJcbiAgICAgICAgdGhpcy5keUFCID0gdGhpcy5zY3JlZW5BLnkgLSB0aGlzLnNjcmVlbkIueTtcclxuICAgICAgICB0aGlzLmR5QkMgPSB0aGlzLnNjcmVlbkIueSAtIHRoaXMuc2NyZWVuQy55O1xyXG4gICAgICAgIHRoaXMuZHlDQSA9IHRoaXMuc2NyZWVuQy55IC0gdGhpcy5zY3JlZW5BLnk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNBVG9wTGVmdCA9IHRoaXMuZHlBQiA8IDAgfHwgKHRoaXMuZHlBQiA9PT0gMCAmJiB0aGlzLmR4QUIgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQlRvcExlZnQgPSB0aGlzLmR5QkMgPCAwIHx8ICh0aGlzLmR5QkMgPT09IDAgJiYgdGhpcy5keEJDID4gMCk7XHJcbiAgICAgICAgdGhpcy5pc0NUb3BMZWZ0ID0gdGhpcy5keUNBIDwgMCB8fCAodGhpcy5keUNBID09PSAwICYmIHRoaXMuZHhDQSA+IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvTGFtYmRhQ29vcmRpbmF0ZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCBsYW1iZGFBID0gKHRoaXMuZHlCQyAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5QkMgKiAtdGhpcy5keENBICsgLXRoaXMuZHhCQyAqIC10aGlzLmR5Q0EpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFCID0gKHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhDQSAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5Q0EgKiB0aGlzLmR4QkMgKyAtdGhpcy5keENBICogdGhpcy5keUJDKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQyA9IDEgLSBsYW1iZGFBIC0gbGFtYmRhQjtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMobGFtYmRhQSwgbGFtYmRhQiwgbGFtYmRhQyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5Cb3VuZGluZ0JveCh4LCB5KSAmJlxyXG4gICAgICAgICAgICB0aGlzLmlzSW5UcmlhbmdsZSh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzSW5UcmlhbmdsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGlzQUJPayA9ICh0aGlzLmlzQVRvcExlZnQgJiYgdGhpcy5pc0JUb3BMZWZ0KSA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhBQiAqICh5IC0gdGhpcy5zY3JlZW5BLnkpIC0gdGhpcy5keUFCICogKHggLSB0aGlzLnNjcmVlbkEueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhBQiAqICh5IC0gdGhpcy5zY3JlZW5BLnkpIC0gdGhpcy5keUFCICogKHggLSB0aGlzLnNjcmVlbkEueCkgPiAwO1xyXG5cclxuICAgICAgICBjb25zdCBpc0JDT2sgPSAodGhpcy5pc0JUb3BMZWZ0ICYmIHRoaXMuaXNDVG9wTGVmdCkgP1xyXG4gICAgICAgICAgICB0aGlzLmR4QkMgKiAoeSAtIHRoaXMuc2NyZWVuQi55KSAtIHRoaXMuZHlCQyAqICh4IC0gdGhpcy5zY3JlZW5CLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4QkMgKiAoeSAtIHRoaXMuc2NyZWVuQi55KSAtIHRoaXMuZHlCQyAqICh4IC0gdGhpcy5zY3JlZW5CLngpID4gMDtcclxuXHJcbiAgICAgICAgY29uc3QgaXNDQU9rID0gKHRoaXMuaXNDVG9wTGVmdCAmJiB0aGlzLmlzQVRvcExlZnQpID9cclxuICAgICAgICAgICAgdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkgLSB0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkgLSB0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSA+IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0FCT2sgJiYgaXNCQ09rICYmIGlzQ0FPaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzSW5Cb3VuZGluZ0JveCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB4IDw9IHRoaXMubWF4WCAmJiB4ID49IHRoaXMubWluWCAmJlxyXG4gICAgICAgICAgICB5IDw9IHRoaXMubWF4WSAmJiB5ID49IHRoaXMubWluWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYygpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYUNvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NDb2xvcjtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWF0cml4NHg0fSBmcm9tIFwiLi4vbWF0aC9NYXRyaXg0eDRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJ0ZXhQcm9jZXNzb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3VG9Qcm9qZWN0aW9uOiBNYXRyaXg0eDQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdvcmxkVG9WaWV3OiBNYXRyaXg0eDQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICBwcml2YXRlIFZQOiBNYXRyaXg0eDQ7XHJcblxyXG4gICAgc2V0TG9va0F0KHBvc2l0aW9uOiBWZWN0b3IzLCB0YXJnZXQ6IFZlY3RvcjMsIHVwRGlyZWN0aW9uOiBWZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2FtZXJhRGlyZWN0aW9uID0gdGFyZ2V0LnN1YnN0cmFjdChwb3NpdGlvbikuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIHVwRGlyZWN0aW9uID0gdXBEaXJlY3Rpb24uZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBjYW1lcmFEaXJlY3Rpb24uY3Jvc3ModXBEaXJlY3Rpb24pO1xyXG4gICAgICAgIGNvbnN0IHUgPSBzLmNyb3NzKGNhbWVyYURpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMud29ybGRUb1ZpZXcuZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3MueCwgcy55LCBzLnosIC1wb3NpdGlvbi54XSk7XHJcbiAgICAgICAgdGhpcy53b3JsZFRvVmlldy5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbdS54LCB1LnksIHUueiwgLXBvc2l0aW9uLnldKTtcclxuICAgICAgICB0aGlzLndvcmxkVG9WaWV3LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFstY2FtZXJhRGlyZWN0aW9uLngsIC1jYW1lcmFEaXJlY3Rpb24ueSwgLWNhbWVyYURpcmVjdGlvbi56LCAtcG9zaXRpb24uel0pO1xyXG4gICAgICAgIHRoaXMud29ybGRUb1ZpZXcuZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJzcGVjdGl2ZShmb3ZZOiBudW1iZXIsIGFzcGVjdDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm92WSAqPSBNYXRoLlBJIC8gMzYwO1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLmNvcyhmb3ZZKSAvIE1hdGguc2luKGZvdlkpO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXdUb1Byb2plY3Rpb24uZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW2YvYXNwZWN0LCAwLCAwLCAwXSk7XHJcbiAgICAgICAgdGhpcy52aWV3VG9Qcm9qZWN0aW9uLmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCBmLCAwLCAwXSk7XHJcbiAgICAgICAgdGhpcy52aWV3VG9Qcm9qZWN0aW9uLmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAoZmFyICsgbmVhcikgLyAobmVhciAtIGZhciksICgyICogZmFyICogbmVhcikgLyAobmVhciAtIGZhcildKTtcclxuICAgICAgICB0aGlzLnZpZXdUb1Byb2plY3Rpb24uZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIC0xLCAwXSk7XHJcbiAgICAgICAgdGhpcy5WUCA9IHRoaXMudmlld1RvUHJvamVjdGlvbi5tdWx0aXBseSh0aGlzLndvcmxkVG9WaWV3KTsgICAgIC8vIFRPRE86IGNhbid0IGJlIGhlcmVcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0odmVydGV4OiBWZWN0b3IzLCBvYmplY3RUcmFuc2Zvcm06IFRyYW5zZm9ybSk6IFZlY3RvcjMge1xyXG4gICAgICAgIC8vIGNvbnN0IFdWUCA9IG9iamVjdFRyYW5zZm9ybS5vYmplY3RUb1dvcmxkLm11bHRpcGx5KHRoaXMuVlApO1xyXG4gICAgICAgIGNvbnN0IFdWUCA9IHRoaXMuVlAubXVsdGlwbHkob2JqZWN0VHJhbnNmb3JtLm9iamVjdFRvV29ybGQpO1xyXG4gICAgICAgIHJldHVybiBXVlAubXVsdGlwbHkodmVydGV4KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vc2NyZWVuL1NjcmVlbkhhbmRsZXJcIjtcclxuaW1wb3J0IHtSYXN0ZXJpemVyfSBmcm9tIFwiLi9SYXN0ZXJpemVyXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtLZXlib2FyZElucHV0fSBmcm9tIFwiLi9JbnB1dC9LZXlib2FyZElucHV0XCI7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NyZWVuQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3QgdGFyZ2V0U2NyZWVuID0gbmV3IFNjcmVlbkhhbmRsZXIoY2FudmFzKTtcclxuICAgIFNldHRpbmdzLnNjcmVlbldpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIEtleWJvYXJkSW5wdXQucmVnaXN0ZXJLZXlCaW5kaW5ncygpO1xyXG5cclxuICAgIGNvbnN0IHJlZDogQ29sb3IgPSBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcclxuICAgIGNvbnN0IGdyZWVuOiBDb2xvciA9IG5ldyBDb2xvcigwLCAyNTUsIDApO1xyXG4gICAgY29uc3QgYmx1ZTogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMjU1KTtcclxuXHJcbiAgICBjb25zdCBhMTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNzUsIDAsIDApO1xyXG4gICAgY29uc3QgYjE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjc1LCAwLjUsIDApO1xyXG4gICAgY29uc3QgYzE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC41LCAwLjYsIDApO1xyXG4gICAgY29uc3QgdHJpYW5nbGU6IFRyaWFuZ2xlID0gbmV3IFRyaWFuZ2xlKGExLCBiMSwgYzEsIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG5cclxuICAgIC8vIHRyaWFuZ2xlLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IFZlY3RvcjMoMCwgMCwgLTEwKSk7XHJcbiAgICAvLyB0cmlhbmdsZS50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoMywgMywgMykpO1xyXG4gICAgLy8gdHJpYW5nbGUudHJhbnNmb3JtLnJvdGF0ZShuZXcgVmVjdG9yMygxLCAwLCAwKSwgNjApO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZXI6IFJhc3Rlcml6ZXIgPSBuZXcgUmFzdGVyaXplcih0YXJnZXRTY3JlZW4sIFt0cmlhbmdsZV0pO1xyXG4gICAgcmFzdGVyaXplci51cGRhdGUoKTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdGlhbGl6ZSk7XHJcblxyXG4iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXg0eDQge1xyXG5cclxuICAgIHJlYWRvbmx5IGRhdGE6IFtGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXldO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFzSWRlbnRpdHkgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmKGFzSWRlbnRpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW25ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW25ldyBGbG9hdDMyQXJyYXkoNCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KDQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoNCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlSWRlbnRpdHkoKTogTWF0cml4NHg0IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDR4NCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogTWF0cml4NHg0KTogTWF0cml4NHg0XHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgY29uc3QgdyA9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzBdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHkgPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMV1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0eiA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVsyXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR3ID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzNdWzNdICogdztcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHR4IC8gdHcsIHR5IC8gdHcsIHR6IC8gdHcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMF0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVsxXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzJdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bM10gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMF0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVsxXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzJdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bM10gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMF0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVsxXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzJdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bM10gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMF0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVsxXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzJdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bM10gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIFZlY3RvcjMge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3o6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwKSB7XHJcbiAgICAgICAgdGhpcy5feCA9IHg7XHJcbiAgICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgICAgdGhpcy5feiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJldHdlZW5Qb2ludHMocDE6IFZlY3RvcjMsIHAyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxLl94IC0gcDIuX3g7XHJcbiAgICAgICAgY29uc3QgeSA9IHAxLl95IC0gcDIuX3k7XHJcbiAgICAgICAgY29uc3QgeiA9IHAxLl96IC0gcDIuX3o7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3JtYWxpemVkKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLmdldE1hZ25pdHVkZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qob3RoZXI6IFZlY3RvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94ICogb3RoZXIuX3ggKyB0aGlzLl95ICogb3RoZXIuX3kgKyB0aGlzLl96ICogb3RoZXIuX3o7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Mob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoKHRoaXMuX3kgKiBvdGhlci5feikgLSAodGhpcy5feiAqIG90aGVyLl95KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ogKiBvdGhlci5feCkgLSAodGhpcy5feCAqIG90aGVyLl96KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ggKiBvdGhlci5feSkgLSAodGhpcy5feSAqIG90aGVyLl94KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKyBvdGhlci5feCwgdGhpcy5feSArIG90aGVyLl95LCB0aGlzLl96ICsgb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgc3Vic3RyYWN0KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLSBvdGhlci5feCwgdGhpcy5feSAtIG90aGVyLl95LCB0aGlzLl96IC0gb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlci5feCwgdGhpcy5feSAqIG90aGVyLl95LCB0aGlzLl96ICogb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlciwgdGhpcy5feSAqIG90aGVyLCB0aGlzLl96ICogb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpdmlkZShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIuX3gsIHRoaXMuX3kgLyBvdGhlci5feSwgdGhpcy5feiAvIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIsIHRoaXMuX3kgLyBvdGhlciwgdGhpcy5feiAvIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHooKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fejtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb2xvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYSA9IDI1NSkge1xyXG4gICAgICAgIHRoaXMuX3IgPSByO1xyXG4gICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkJ1ZmZlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY3JlZW5XaWR0aDogbnVtYmVyLCBzY3JlZW5IZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBVaW50OENsYW1wZWRBcnJheShzY3JlZW5XaWR0aCAqIHNjcmVlbkhlaWdodCAqIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKGluZGV4OiBudW1iZXIsIGNvbG9yOiBDb2xvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleF0gPSBjb2xvci5yO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDFdID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAyXSA9IGNvbG9yLmI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgM10gPSBjb2xvci5hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBidWZmZXIoKTogVWludDhDbGFtcGVkQXJyYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgU2NyZWVuSGFuZGxlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2FudmFzQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGl4ZWxzRnJvbUJ1ZmZlcihjb2xvckJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoY29sb3JCdWZmZXIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZwc0Rpc3BsYXkoZnBzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDhhMzAwXCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxUZXh0KFwiRlBTOiBcIiArIGZwcywgMTAsIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuICAgIHN0YXRpYyBzY3JlZW5XaWR0aDogbnVtYmVyO1xyXG4gICAgc3RhdGljIHNjcmVlbkhlaWdodDogbnVtYmVyO1xyXG4gICAgc3RhdGljIGNsZWFyQ29sb3I6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDUwKTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=