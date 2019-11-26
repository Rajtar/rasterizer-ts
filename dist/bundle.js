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

/***/ "./src/scripts/Camera/Camera.ts":
/*!**************************************!*\
  !*** ./src/scripts/Camera/Camera.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Matrix4x4_1 = __webpack_require__(/*! ../math/Matrix4x4 */ "./src/scripts/math/Matrix4x4.ts");
const Triangle_1 = __webpack_require__(/*! ../geometry/Triangle */ "./src/scripts/geometry/Triangle.ts");
class Camera {
    constructor() {
        this.projection = new Matrix4x4_1.Matrix4x4();
        this.view = new Matrix4x4_1.Matrix4x4();
    }
    setLookAt(position, target, upDirection) {
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
    setPerspective(fovY, aspect, near, far) {
        fovY *= Math.PI / 360;
        const f = Math.cos(fovY) / Math.sin(fovY);
        this.projection.data[0] = new Float32Array([f / aspect, 0, 0, 0]);
        this.projection.data[1] = new Float32Array([0, f, 0, 0]);
        this.projection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)]);
        this.projection.data[3] = new Float32Array([0, 0, -1, 0]);
        this.updateProjectionView();
    }
    project(triangle) {
        const projectionViewWorld = this.projectionView.multiply(triangle.transform.objectToWorld);
        const newA = projectionViewWorld.multiply(triangle.a);
        const newB = projectionViewWorld.multiply(triangle.b);
        const newC = projectionViewWorld.multiply(triangle.c);
        return new Triangle_1.Triangle(newA, newB, newC, triangle.aColor, triangle.bColor, triangle.cColor);
    }
    updateProjectionView() {
        this.projectionView = this.projection.multiply(this.view);
    }
}
exports.Camera = Camera;


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
const ScreenBuffer_1 = __webpack_require__(/*! ./io/output/screen/ScreenBuffer */ "./src/scripts/io/output/screen/ScreenBuffer.ts");
const Color_1 = __webpack_require__(/*! ./io/output/screen/Color */ "./src/scripts/io/output/screen/Color.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const KeyboardInputData_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
class Rasterizer {
    constructor(targetScreen, drawableObjects, camera) {
        this.targetScreen = targetScreen;
        let accumulatedTriangles = [];
        for (const drawableObject of drawableObjects) {
            accumulatedTriangles = accumulatedTriangles.concat(drawableObject.toTriangles());
        }
        this.triangles = accumulatedTriangles;
        this.camera = camera;
    }
    update() {
        const objectsToRender = [];
        this.camera.setLookAt(KeyboardInputData_1.KeyboardInputData.lookAt, KeyboardInputData_1.KeyboardInputData.target, new Vector3_1.Vector3(0, 1, 0));
        for (const object of this.triangles) {
            if (object instanceof Triangle_1.Triangle) {
                const triangleObject = object;
                objectsToRender.push(this.camera.project(triangleObject));
            }
            /***************************/
            object.transform.scale(new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.scaling, KeyboardInputData_1.KeyboardInputData.scaling, KeyboardInputData_1.KeyboardInputData.scaling));
            if (KeyboardInputData_1.KeyboardInputData.rotationDirection.getMagnitude() != 0) {
                object.transform.rotate(KeyboardInputData_1.KeyboardInputData.rotationDirection, KeyboardInputData_1.KeyboardInputData.rotationAngle);
            }
            /***************************/
        }
        this.targetScreen.clearScreen();
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
        for (let t = 0, trianglesLength = triangles.length; t < trianglesLength; ++t) {
            const currentTriangle = triangles[t];
            for (let x = currentTriangle.minX; x <= currentTriangle.maxX; ++x) {
                for (let y = currentTriangle.minY; y <= currentTriangle.maxY; ++y) {
                    if (currentTriangle.isIn(x, y)) {
                        const lambdaCords = currentTriangle.toLambdaCoordinates(x, y);
                        const depth = Rasterizer.calculateDepth(lambdaCords, currentTriangle);
                        const bufferIndex = this.calculateBufferIndex(x, y);
                        if (depth < depthBuffer[bufferIndex / 4]) {
                            depthBuffer[bufferIndex / 4] = depth;
                            screenBuffer.setColor(bufferIndex, Rasterizer.calculateInterpolatedColor(lambdaCords, currentTriangle));
                        }
                    }
                }
            }
        }
        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
    }
    calculateBufferIndex(screenX, screenY) {
        return Math.floor((screenY * this.targetScreen.width + screenX) * 4);
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

/***/ "./src/scripts/geometry/Mesh.ts":
/*!**************************************!*\
  !*** ./src/scripts/geometry/Mesh.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DrawableObject_1 = __webpack_require__(/*! ./DrawableObject */ "./src/scripts/geometry/DrawableObject.ts");
class Mesh extends DrawableObject_1.DrawableObject {
    constructor(triangles) {
        super();
        this.triangles = triangles;
    }
    isIn(x, y) {
        for (const triangle of this.triangles) {
            if (triangle.isIn(x, y)) {
                return true;
            }
        }
        return false;
    }
    toTriangles() {
        for (const triangle of this.triangles) {
            triangle.transform.objectToWorld = this.transform.objectToWorld;
        }
        return this.triangles;
    }
}
exports.Mesh = Mesh;


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
        this.objectToWorld = Matrix4x4_1.Matrix4x4.createIdentity();
    }
    translate(translation) {
        const translationMatrix = new Matrix4x4_1.Matrix4x4();
        translationMatrix.data[0] = new Float32Array([1, 0, 0, translation.x]);
        translationMatrix.data[1] = new Float32Array([0, 1, 0, translation.y]);
        translationMatrix.data[2] = new Float32Array([0, 0, 1, translation.z]);
        translationMatrix.data[3] = new Float32Array([0, 0, 0, 1]);
        this.objectToWorld = translationMatrix.multiply(this.objectToWorld);
    }
    scale(scaling) {
        const scalingMatrix = new Matrix4x4_1.Matrix4x4();
        scalingMatrix.data[0] = new Float32Array([scaling.x, 0, 0, 0]);
        scalingMatrix.data[1] = new Float32Array([0, scaling.y, 0, 0]);
        scalingMatrix.data[2] = new Float32Array([0, 0, scaling.z, 0]);
        scalingMatrix.data[3] = new Float32Array([0, 0, 0, 1]);
        this.objectToWorld = scalingMatrix.multiply(this.objectToWorld);
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
        this.objectToWorld = rotationMatrix.multiply(this.objectToWorld);
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
const Settings_1 = __webpack_require__(/*! ../io/output/screen/Settings */ "./src/scripts/io/output/screen/Settings.ts");
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
        const x1 = Math.round((this.a.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const x2 = Math.round((this.b.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const x3 = Math.round((this.c.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const y1 = Math.round(Math.abs((this.a.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        const y2 = Math.round(Math.abs((this.b.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        const y3 = Math.round(Math.abs((this.c.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        this.screenA = new Vector3_1.Vector3(x1, y1);
        this.screenB = new Vector3_1.Vector3(x2, y2);
        this.screenC = new Vector3_1.Vector3(x3, y3);
        this._minX = Math.min(this.screenA.x, this.screenB.x, this.screenC.x);
        this._maxX = Math.max(this.screenA.x, this.screenB.x, this.screenC.x);
        this._minY = Math.min(this.screenA.y, this.screenB.y, this.screenC.y);
        this._maxY = Math.max(this.screenA.y, this.screenB.y, this.screenC.y);
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
    toTriangles() {
        return [this];
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
        return this.isInTriangle(x, y);
    }
    isInBoundingBox(x, y) {
        return x <= this._maxX && x >= this._minX &&
            y <= this._maxY && y >= this._minY;
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
    get minX() {
        return this._minX;
    }
    get maxX() {
        return this._maxX;
    }
    get minY() {
        return this._minY;
    }
    get maxY() {
        return this._maxY;
    }
}
exports.Triangle = Triangle;


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ScreenHandler_1 = __webpack_require__(/*! ./io/output/screen/ScreenHandler */ "./src/scripts/io/output/screen/ScreenHandler.ts");
const Rasterizer_1 = __webpack_require__(/*! ./Rasterizer */ "./src/scripts/Rasterizer.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const Settings_1 = __webpack_require__(/*! ./io/output/screen/Settings */ "./src/scripts/io/output/screen/Settings.ts");
const KeyboardBinder_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardBinder */ "./src/scripts/io/input/keyboard/KeyboardBinder.ts");
const Camera_1 = __webpack_require__(/*! ./Camera/Camera */ "./src/scripts/Camera/Camera.ts");
const KeyboardInputData_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
const FileLoader_1 = __webpack_require__(/*! ./io/input/file/FileLoader */ "./src/scripts/io/input/file/FileLoader.ts");
const ObjLoader_1 = __webpack_require__(/*! ./io/input/mesh/ObjLoader */ "./src/scripts/io/input/mesh/ObjLoader.ts");
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    KeyboardBinder_1.KeyboardBinder.registerKeyBindings();
    const camera = new Camera_1.Camera();
    camera.setLookAt(KeyboardInputData_1.KeyboardInputData.lookAt, KeyboardInputData_1.KeyboardInputData.target, new Vector3_1.Vector3(0, 1, 0));
    camera.setPerspective(45, 16 / 9, 0.1, 100);
    const objText = FileLoader_1.FileLoader.loadFile("resources/models/teapot.obj");
    const meshLoader = new ObjLoader_1.ObjLoader();
    const objMesh = meshLoader.loadMesh(objText);
    objMesh.transform.scale(new Vector3_1.Vector3(0.4, 0.4, 0.4));
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [objMesh], camera);
    rasterizer.update();
}
document.addEventListener("DOMContentLoaded", initialize);


/***/ }),

/***/ "./src/scripts/io/input/file/FileLoader.ts":
/*!*************************************************!*\
  !*** ./src/scripts/io/input/file/FileLoader.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FileLoader {
    static loadFile(filePath) {
        let result = null;
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", filePath, false);
        httpRequest.send();
        if (httpRequest.status == 200) {
            result = httpRequest.responseText;
        }
        return result;
    }
}
exports.FileLoader = FileLoader;


/***/ }),

/***/ "./src/scripts/io/input/keyboard/KeyboardBinder.ts":
/*!*********************************************************!*\
  !*** ./src/scripts/io/input/keyboard/KeyboardBinder.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const KeyboardInputData_1 = __webpack_require__(/*! ./KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
const Vector3_1 = __webpack_require__(/*! ../../../math/Vector3 */ "./src/scripts/math/Vector3.ts");
class KeyboardBinder {
    static registerKeyBindings() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x - 0.01, KeyboardInputData_1.KeyboardInputData.lookAt.y, KeyboardInputData_1.KeyboardInputData.lookAt.z);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x - 0.01, KeyboardInputData_1.KeyboardInputData.target.y, KeyboardInputData_1.KeyboardInputData.target.z);
                return;
            }
            if (event.key === 'd') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x + 0.01, KeyboardInputData_1.KeyboardInputData.lookAt.y, KeyboardInputData_1.KeyboardInputData.lookAt.z);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x + 0.01, KeyboardInputData_1.KeyboardInputData.target.y, KeyboardInputData_1.KeyboardInputData.target.z);
                return;
            }
            if (event.key === 'w') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x, KeyboardInputData_1.KeyboardInputData.lookAt.y, KeyboardInputData_1.KeyboardInputData.lookAt.z - 0.01);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x, KeyboardInputData_1.KeyboardInputData.target.y, KeyboardInputData_1.KeyboardInputData.target.z - 0.01);
                return;
            }
            if (event.key === 's') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x, KeyboardInputData_1.KeyboardInputData.lookAt.y, KeyboardInputData_1.KeyboardInputData.lookAt.z + 0.01);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x, KeyboardInputData_1.KeyboardInputData.target.y, KeyboardInputData_1.KeyboardInputData.target.z + 0.01);
                return;
            }
            if (event.key === '+') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x, KeyboardInputData_1.KeyboardInputData.lookAt.y + 0.01, KeyboardInputData_1.KeyboardInputData.lookAt.z);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x, KeyboardInputData_1.KeyboardInputData.target.y + 0.01, KeyboardInputData_1.KeyboardInputData.target.z);
                return;
            }
            if (event.key === '-') {
                KeyboardInputData_1.KeyboardInputData.lookAt = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lookAt.x, KeyboardInputData_1.KeyboardInputData.lookAt.y - 0.01, KeyboardInputData_1.KeyboardInputData.lookAt.z);
                KeyboardInputData_1.KeyboardInputData.target = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.target.x, KeyboardInputData_1.KeyboardInputData.target.y - 0.01, KeyboardInputData_1.KeyboardInputData.target.z);
                return;
            }
            if (event.key === 'n') {
                KeyboardInputData_1.KeyboardInputData.rotationDirection = new Vector3_1.Vector3(0, 1, 0);
                KeyboardInputData_1.KeyboardInputData.rotationAngle -= 0.1;
                return;
            }
            if (event.key === 'm') {
                KeyboardInputData_1.KeyboardInputData.rotationDirection = new Vector3_1.Vector3(0, 1, 0);
                KeyboardInputData_1.KeyboardInputData.rotationAngle += 0.1;
                return;
            }
            if (event.key === 'j') {
                KeyboardInputData_1.KeyboardInputData.scaling -= 0.001;
                return;
            }
            if (event.key === 'k') {
                KeyboardInputData_1.KeyboardInputData.scaling += 0.001;
                return;
            }
        }, false);
    }
}
exports.KeyboardBinder = KeyboardBinder;


/***/ }),

/***/ "./src/scripts/io/input/keyboard/KeyboardInputData.ts":
/*!************************************************************!*\
  !*** ./src/scripts/io/input/keyboard/KeyboardInputData.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ../../../math/Vector3 */ "./src/scripts/math/Vector3.ts");
class KeyboardInputData {
}
exports.KeyboardInputData = KeyboardInputData;
KeyboardInputData.lookAt = new Vector3_1.Vector3(0, 0, 5);
KeyboardInputData.target = new Vector3_1.Vector3(0, 0, 0);
KeyboardInputData.scaling = 1;
KeyboardInputData.rotationDirection = new Vector3_1.Vector3(0, 0, 0);
KeyboardInputData.rotationAngle = 0;
;


/***/ }),

/***/ "./src/scripts/io/input/mesh/ObjLoader.ts":
/*!************************************************!*\
  !*** ./src/scripts/io/input/mesh/ObjLoader.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Mesh_1 = __webpack_require__(/*! ../../../geometry/Mesh */ "./src/scripts/geometry/Mesh.ts");
const Vector3_1 = __webpack_require__(/*! ../../../math/Vector3 */ "./src/scripts/math/Vector3.ts");
const Triangle_1 = __webpack_require__(/*! ../../../geometry/Triangle */ "./src/scripts/geometry/Triangle.ts");
const Color_1 = __webpack_require__(/*! ../../output/screen/Color */ "./src/scripts/io/output/screen/Color.ts");
class ObjLoader {
    constructor() {
        this.vertices = [];
        this.normals = [];
        this.faces = [];
    }
    loadMesh(meshAsText) {
        const fileLines = meshAsText.split(/\r?\n/);
        for (const line of fileLines) {
            const lineSegments = line.split(/\s+/);
            const lineHeader = lineSegments[0];
            const lineData = lineSegments.slice(1, lineSegments.length);
            if (lineHeader === "v") {
                this.parseVertex(lineData);
            }
            else if (lineHeader === "vn") {
                this.parseNormal(lineData);
            }
            else if (lineHeader === "f") {
                this.parseFace(lineData);
            }
        }
        return new Mesh_1.Mesh(this.faces);
    }
    parseVertex(values) {
        const vertex = new Vector3_1.Vector3(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]));
        this.vertices.push(vertex);
    }
    parseNormal(values) {
        const normal = new Vector3_1.Vector3(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]));
        this.normals.push(normal.getNormalized());
    }
    parseFace(values) {
        const faceVertexIndices = [];
        const faceTextureIndices = [];
        const faceNormalIndices = [];
        for (const vertexInfo of values) {
            const splitVertexInfo = vertexInfo.split(/\//);
            faceVertexIndices.push(parseInt(splitVertexInfo[0]));
            if (splitVertexInfo.length == 2) {
                if (splitVertexInfo[1] != "") {
                    faceTextureIndices.push(parseInt(splitVertexInfo[1]));
                }
            }
            else if (splitVertexInfo.length == 3) {
                if (splitVertexInfo[1] != "") {
                    faceTextureIndices.push(parseInt(splitVertexInfo[1]));
                }
                if (splitVertexInfo[2] != "") {
                    faceNormalIndices.push(parseInt(splitVertexInfo[2]));
                }
            }
        }
        const red = new Color_1.Color(255, 0, 0);
        const green = new Color_1.Color(0, 255, 0);
        const blue = new Color_1.Color(0, 0, 255);
        const face = new Triangle_1.Triangle(this.vertices[(faceVertexIndices[0] - 1)], this.vertices[(faceVertexIndices[1] - 1)], this.vertices[(faceVertexIndices[2] - 1)], red, green, blue);
        this.faces.push(face);
    }
}
exports.ObjLoader = ObjLoader;


/***/ }),

/***/ "./src/scripts/io/output/screen/Color.ts":
/*!***********************************************!*\
  !*** ./src/scripts/io/output/screen/Color.ts ***!
  \***********************************************/
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

/***/ "./src/scripts/io/output/screen/ScreenBuffer.ts":
/*!******************************************************!*\
  !*** ./src/scripts/io/output/screen/ScreenBuffer.ts ***!
  \******************************************************/
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

/***/ "./src/scripts/io/output/screen/ScreenHandler.ts":
/*!*******************************************************!*\
  !*** ./src/scripts/io/output/screen/ScreenHandler.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = __webpack_require__(/*! ./Settings */ "./src/scripts/io/output/screen/Settings.ts");
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
    clearScreen() {
        this._canvasCtx.clearRect(0, 0, Settings_1.Settings.screenWidth, Settings_1.Settings.screenHeight);
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

/***/ "./src/scripts/io/output/screen/Settings.ts":
/*!**************************************************!*\
  !*** ./src/scripts/io/output/screen/Settings.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(/*! ./Color */ "./src/scripts/io/output/screen/Color.ts");
class Settings {
}
exports.Settings = Settings;
Settings.clearColor = new Color_1.Color(0, 0, 0, 50);


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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvQ2FtZXJhL0NhbWVyYS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9SYXN0ZXJpemVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L01lc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L1RyaWFuZ2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL2lucHV0L2ZpbGUvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZEJpbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9tZXNoL09iakxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL0NvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuQnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL1NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvTWF0cml4NHg0LnRzIiwid2VicGFjazovLy8uL3Ny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SyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM1QyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUU5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FB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LENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDcEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxPQUFPLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sZUFBZSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ3JDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFFTyxZQUFZLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUUsT0FBTyxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQztJ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LElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuSCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuSCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuSCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuSCxPQUFPLElBQUksaUJBQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdB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LElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBNUVELDBCQTRFQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtNYXRyaXg0eDR9IGZyb20gXCIuLi9tYXRoL01hdHJpeDR4NFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4uL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb2plY3Rpb246IE1hdHJpeDR4NCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlldzogTWF0cml4NHg0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgcHJpdmF0ZSBwcm9qZWN0aW9uVmlldzogTWF0cml4NHg0O1xyXG5cclxuICAgIHNldExvb2tBdChwb3NpdGlvbjogVmVjdG9yMywgdGFyZ2V0OiBWZWN0b3IzLCB1cERpcmVjdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNhbWVyYURpcmVjdGlvbiA9IHRhcmdldC5zdWJzdHJhY3QocG9zaXRpb24pLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICB1cERpcmVjdGlvbiA9IHVwRGlyZWN0aW9uLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzID0gY2FtZXJhRGlyZWN0aW9uLmNyb3NzKHVwRGlyZWN0aW9uKTtcclxuICAgICAgICBjb25zdCB1ID0gcy5jcm9zcyhjYW1lcmFEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3MueCwgcy55LCBzLnosIC1wb3NpdGlvbi54XSk7XHJcbiAgICAgICAgdGhpcy52aWV3LmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFt1LngsIHUueSwgdS56LCAtcG9zaXRpb24ueV0pO1xyXG4gICAgICAgIHRoaXMudmlldy5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbLWNhbWVyYURpcmVjdGlvbi54LCAtY2FtZXJhRGlyZWN0aW9uLnksIC1jYW1lcmFEaXJlY3Rpb24ueiwgLXBvc2l0aW9uLnpdKTtcclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3Rpb25WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVyc3BlY3RpdmUoZm92WTogbnVtYmVyLCBhc3BlY3Q6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvdlkgKj0gTWF0aC5QSSAvIDM2MDtcclxuICAgICAgICBjb25zdCBmID0gTWF0aC5jb3MoZm92WSkgLyBNYXRoLnNpbihmb3ZZKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtmL2FzcGVjdCwgMCwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgZiwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgKGZhciArIG5lYXIpIC8gKG5lYXIgLSBmYXIpLCAoMiAqIGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpXSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAtMSwgMF0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvamVjdGlvblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9qZWN0KHRyaWFuZ2xlOiBUcmlhbmdsZSk6IFRyaWFuZ2xlIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uVmlld1dvcmxkID0gdGhpcy5wcm9qZWN0aW9uVmlldy5tdWx0aXBseSh0cmlhbmdsZS50cmFuc2Zvcm0ub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICAgICAgY29uc3QgbmV3QSA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYSk7XHJcbiAgICAgICAgY29uc3QgbmV3QiA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYik7XHJcbiAgICAgICAgY29uc3QgbmV3QyA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmlhbmdsZShuZXdBLCBuZXdCLCBuZXdDLCB0cmlhbmdsZS5hQ29sb3IsIHRyaWFuZ2xlLmJDb2xvciwgdHJpYW5nbGUuY0NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb2plY3Rpb25WaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvblZpZXcgPSB0aGlzLnByb2plY3Rpb24ubXVsdGlwbHkodGhpcy52aWV3KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7U2NyZWVuQnVmZmVyfSBmcm9tIFwiLi9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkJ1ZmZlclwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9pby9vdXRwdXQvc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7Q2FtZXJhfSBmcm9tIFwiLi9DYW1lcmEvQ2FtZXJhXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRJbnB1dERhdGF9IGZyb20gXCIuL2lvL2lucHV0L2tleWJvYXJkL0tleWJvYXJkSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7RHJhd2FibGVPYmplY3R9IGZyb20gXCIuL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFzdGVyaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FtZXJhOiBDYW1lcmE7XHJcbiAgICBwcml2YXRlIGxhc3RDYWxsZWRUaW1lOiBET01IaWdoUmVzVGltZVN0YW1wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldFNjcmVlbjogU2NyZWVuSGFuZGxlciwgZHJhd2FibGVPYmplY3RzOiBEcmF3YWJsZU9iamVjdFtdLCBjYW1lcmE6IENhbWVyYSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuID0gdGFyZ2V0U2NyZWVuO1xyXG4gICAgICAgIGxldCBhY2N1bXVsYXRlZFRyaWFuZ2xlczogVHJpYW5nbGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgZHJhd2FibGVPYmplY3Qgb2YgZHJhd2FibGVPYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGFjY3VtdWxhdGVkVHJpYW5nbGVzID0gYWNjdW11bGF0ZWRUcmlhbmdsZXMuY29uY2F0KGRyYXdhYmxlT2JqZWN0LnRvVHJpYW5nbGVzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyaWFuZ2xlcyA9IGFjY3VtdWxhdGVkVHJpYW5nbGVzO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0c1RvUmVuZGVyID0gW107XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuc2V0TG9va0F0KEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdCwgS2V5Ym9hcmRJbnB1dERhdGEudGFyZ2V0LCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBvYmplY3Qgb2YgdGhpcy50cmlhbmdsZXMpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlhbmdsZU9iamVjdCA9IG9iamVjdCBhcyBUcmlhbmdsZTtcclxuICAgICAgICAgICAgICAgIG9iamVjdHNUb1JlbmRlci5wdXNoKHRoaXMuY2FtZXJhLnByb2plY3QodHJpYW5nbGVPYmplY3QpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICAgICAgb2JqZWN0LnRyYW5zZm9ybS5zY2FsZShuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nLCBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nLCBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbi5nZXRNYWduaXR1ZGUoKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudHJhbnNmb3JtLnJvdGF0ZShLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25BbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uY2xlYXJTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLnJlbmRlcihvYmplY3RzVG9SZW5kZXIpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldEZwc0Rpc3BsYXkodGhpcy5jYWxjdWxhdGVGcHMoKSk7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5sYXN0Q2FsbGVkVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDYWxsZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbHRhOiBudW1iZXIgPSAocGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RDYWxsZWRUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKDEgLyBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIodHJpYW5nbGVzOiBUcmlhbmdsZVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuQnVmZmVyID0gbmV3IFNjcmVlbkJ1ZmZlcih0aGlzLnRhcmdldFNjcmVlbi53aWR0aCwgdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBkZXB0aEJ1ZmZlcjogbnVtYmVyW10gPSBuZXcgQXJyYXkodGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKiB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpLmZpbGwoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0ID0gMCwgdHJpYW5nbGVzTGVuZ3RoID0gdHJpYW5nbGVzLmxlbmd0aDsgdCA8IHRyaWFuZ2xlc0xlbmd0aDsgKyt0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUcmlhbmdsZSA9IHRyaWFuZ2xlc1t0XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGN1cnJlbnRUcmlhbmdsZS5taW5YOyB4IDw9IGN1cnJlbnRUcmlhbmdsZS5tYXhYOyArK3gpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBjdXJyZW50VHJpYW5nbGUubWluWTsgeSA8PSBjdXJyZW50VHJpYW5nbGUubWF4WTsgKyt5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmlhbmdsZS5pc0luKHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbWJkYUNvcmRzOiBWZWN0b3IzID0gY3VycmVudFRyaWFuZ2xlLnRvTGFtYmRhQ29vcmRpbmF0ZXMoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCBjdXJyZW50VHJpYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJJbmRleCA9IHRoaXMuY2FsY3VsYXRlQnVmZmVySW5kZXgoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IGRlcHRoQnVmZmVyW2J1ZmZlckluZGV4IC8gNF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2J1ZmZlckluZGV4IC8gNF0gPSBkZXB0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihidWZmZXJJbmRleCwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgY3VycmVudFRyaWFuZ2xlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldFBpeGVsc0Zyb21CdWZmZXIoc2NyZWVuQnVmZmVyLmJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCdWZmZXJJbmRleChzY3JlZW5YOiBudW1iZXIsIHNjcmVlblk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHNjcmVlblkgKiB0aGlzLnRhcmdldFNjcmVlbi53aWR0aCArIHNjcmVlblgpICogNCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hLnogKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYi56ICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmMuejtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogQ29sb3Ige1xyXG4gICAgICAgIGNvbnN0IHJlZEludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuciArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuciArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IucjtcclxuICAgICAgICBjb25zdCBncmVlbkludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuZyArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuZyArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuZztcclxuICAgICAgICBjb25zdCBibHVlSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5iICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5iICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5iO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkSW50ZXJwb2xhdGVkLCBncmVlbkludGVycG9sYXRlZCwgYmx1ZUludGVycG9sYXRlZCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gXCIuL1RyYW5zZm9ybVwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9UcmlhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlT2JqZWN0IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RyYW5zZm9ybTogVHJhbnNmb3JtO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW47XHJcbiAgICBhYnN0cmFjdCB0b1RyaWFuZ2xlcygpOiBUcmlhbmdsZVtdXHJcblxyXG4gICAgZ2V0IHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0RyYXdhYmxlT2JqZWN0fSBmcm9tIFwiLi9EcmF3YWJsZU9iamVjdFwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9UcmlhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc2ggZXh0ZW5kcyBEcmF3YWJsZU9iamVjdHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmlhbmdsZXM6IFRyaWFuZ2xlW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW4oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmlhbmdsZS5pc0luKHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9UcmlhbmdsZXMoKTogVHJpYW5nbGVbXSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICB0cmlhbmdsZS50cmFuc2Zvcm0ub2JqZWN0VG9Xb3JsZCA9IHRoaXMudHJhbnNmb3JtLm9iamVjdFRvV29ybGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyaWFuZ2xlcztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge01hdHJpeDR4NH0gZnJvbSBcIi4uL21hdGgvTWF0cml4NHg0XCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XHJcblxyXG4gICAgb2JqZWN0VG9Xb3JsZDogTWF0cml4NHg0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IE1hdHJpeDR4NC5jcmVhdGVJZGVudGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCB0cmFuc2xhdGlvbi54XSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIHRyYW5zbGF0aW9uLnldKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgdHJhbnNsYXRpb24uel0pO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gdHJhbnNsYXRpb25NYXRyaXgubXVsdGlwbHkodGhpcy5vYmplY3RUb1dvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZShzY2FsaW5nOiBWZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGluZ01hdHJpeCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtzY2FsaW5nLngsIDAsIDAsIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCBzY2FsaW5nLnksIDAsIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCBzY2FsaW5nLnosIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gc2NhbGluZ01hdHJpeC5tdWx0aXBseSh0aGlzLm9iamVjdFRvV29ybGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZShyb3RhdGlvbkRpcmVjdGlvbjogVmVjdG9yMywgYW5nbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICByb3RhdGlvbkRpcmVjdGlvbiA9IHJvdGF0aW9uRGlyZWN0aW9uLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCB4ID0gcm90YXRpb25EaXJlY3Rpb24ueDtcclxuICAgICAgICBjb25zdCB5ID0gcm90YXRpb25EaXJlY3Rpb24ueTtcclxuICAgICAgICBjb25zdCB6ID0gcm90YXRpb25EaXJlY3Rpb24uejtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVswXSA9IHggKiB4ICogKDEgLSBjb3MpICsgY29zO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMV0gPSB4ICogeSAqICgxIC0gY29zKSAtIHogKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVsyXSA9IHggKiB6ICogKDEgLSBjb3MpICsgeSAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVswXSA9IHkgKiB4ICogKDEgLSBjb3MpICsgeiAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzFdID0geSAqIHkgKiAoMSAtIGNvcykgKyBjb3M7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVsyXSA9IHkgKiB6ICogKDEgLSBjb3MpIC0geCAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVswXSA9IHggKiB6ICogKDEgLSBjb3MpIC0geSAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzFdID0geSAqIHogKiAoMSAtIGNvcykgKyB4ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bMl0gPSB6ICogeiAqICgxIC0gY29zKSArIGNvcztcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVswXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVsxXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVsyXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVszXSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IHJvdGF0aW9uTWF0cml4Lm11bHRpcGx5KHRoaXMub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uL2lvL291dHB1dC9zY3JlZW4vQ29sb3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4uL2lvL291dHB1dC9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vRHJhd2FibGVPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlhbmdsZSBleHRlbmRzIERyYXdhYmxlT2JqZWN0IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2M6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYUNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jQ29sb3I6IENvbG9yO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeENBOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUNBOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWluWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWF4WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWluWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWF4WTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNBVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNCVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNDVG9wTGVmdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzLCBjOiBWZWN0b3IzLCBhQ29sb3I6IENvbG9yLCBiQ29sb3I6IENvbG9yLCBjQ29sb3I6IENvbG9yKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9jID0gYztcclxuICAgICAgICB0aGlzLl9hQ29sb3IgPSBhQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fYkNvbG9yID0gYkNvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NDb2xvciA9IGNDb2xvcjtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLnJvdW5kKCh0aGlzLmEueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjUpO1xyXG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5yb3VuZCgodGhpcy5iLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41KTtcclxuICAgICAgICBjb25zdCB4MyA9IE1hdGgucm91bmQoKHRoaXMuYy54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNSk7XHJcbiAgICAgICAgY29uc3QgeTEgPSBNYXRoLnJvdW5kKE1hdGguYWJzKCh0aGlzLmEueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KSk7XHJcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLnJvdW5kKE1hdGguYWJzKCh0aGlzLmIueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KSk7XHJcbiAgICAgICAgY29uc3QgeTMgPSBNYXRoLnJvdW5kKE1hdGguYWJzKCh0aGlzLmMueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NyZWVuQSA9IG5ldyBWZWN0b3IzKHgxLCB5MSk7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5CID0gbmV3IFZlY3RvcjMoeDIsIHkyKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkMgPSBuZXcgVmVjdG9yMyh4MywgeTMpO1xyXG5cclxuICAgICAgICB0aGlzLl9taW5YID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLngsIHRoaXMuc2NyZWVuQi54LCB0aGlzLnNjcmVlbkMueCk7XHJcbiAgICAgICAgdGhpcy5fbWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMuX21pblkgPSBNYXRoLm1pbih0aGlzLnNjcmVlbkEueSwgdGhpcy5zY3JlZW5CLnksIHRoaXMuc2NyZWVuQy55KTtcclxuICAgICAgICB0aGlzLl9tYXhZID0gTWF0aC5tYXgodGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHhBQiA9IHRoaXMuc2NyZWVuQS54IC0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgdGhpcy5keEJDID0gdGhpcy5zY3JlZW5CLnggLSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICB0aGlzLmR4Q0EgPSB0aGlzLnNjcmVlbkMueCAtIHRoaXMuc2NyZWVuQS54O1xyXG5cclxuICAgICAgICB0aGlzLmR5QUIgPSB0aGlzLnNjcmVlbkEueSAtIHRoaXMuc2NyZWVuQi55O1xyXG4gICAgICAgIHRoaXMuZHlCQyA9IHRoaXMuc2NyZWVuQi55IC0gdGhpcy5zY3JlZW5DLnk7XHJcbiAgICAgICAgdGhpcy5keUNBID0gdGhpcy5zY3JlZW5DLnkgLSB0aGlzLnNjcmVlbkEueTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0FUb3BMZWZ0ID0gdGhpcy5keUFCIDwgMCB8fCAodGhpcy5keUFCID09PSAwICYmIHRoaXMuZHhBQiA+IDApO1xyXG4gICAgICAgIHRoaXMuaXNCVG9wTGVmdCA9IHRoaXMuZHlCQyA8IDAgfHwgKHRoaXMuZHlCQyA9PT0gMCAmJiB0aGlzLmR4QkMgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQ1RvcExlZnQgPSB0aGlzLmR5Q0EgPCAwIHx8ICh0aGlzLmR5Q0EgPT09IDAgJiYgdGhpcy5keENBID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9UcmlhbmdsZXMoKTogVHJpYW5nbGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzXTtcclxuICAgIH1cclxuXHJcbiAgICB0b0xhbWJkYUNvb3JkaW5hdGVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhQSA9ICh0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSArIC10aGlzLmR4QkMgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSkgL1xyXG4gICAgICAgICAgICAodGhpcy5keUJDICogLXRoaXMuZHhDQSArIC10aGlzLmR4QkMgKiAtdGhpcy5keUNBKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQiA9ICh0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSArIC10aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSkgL1xyXG4gICAgICAgICAgICAodGhpcy5keUNBICogdGhpcy5keEJDICsgLXRoaXMuZHhDQSAqIHRoaXMuZHlCQyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUMgPSAxIC0gbGFtYmRhQSAtIGxhbWJkYUI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKGxhbWJkYUEsIGxhbWJkYUIsIGxhbWJkYUMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW4oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0luVHJpYW5nbGUoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0luQm91bmRpbmdCb3goeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4geCA8PSB0aGlzLl9tYXhYICYmIHggPj0gdGhpcy5fbWluWCAmJlxyXG4gICAgICAgICAgICB5IDw9IHRoaXMuX21heFkgJiYgeSA+PSB0aGlzLl9taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNJblRyaWFuZ2xlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNBQk9rID0gKHRoaXMuaXNBVG9wTGVmdCAmJiB0aGlzLmlzQlRvcExlZnQpID9cclxuICAgICAgICAgICAgdGhpcy5keEFCICogKHkgLSB0aGlzLnNjcmVlbkEueSkgLSB0aGlzLmR5QUIgKiAoeCAtIHRoaXMuc2NyZWVuQS54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keEFCICogKHkgLSB0aGlzLnNjcmVlbkEueSkgLSB0aGlzLmR5QUIgKiAoeCAtIHRoaXMuc2NyZWVuQS54KSA+IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQkNPayA9ICh0aGlzLmlzQlRvcExlZnQgJiYgdGhpcy5pc0NUb3BMZWZ0KSA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPiAwO1xyXG5cclxuICAgICAgICBjb25zdCBpc0NBT2sgPSAodGhpcy5pc0NUb3BMZWZ0ICYmIHRoaXMuaXNBVG9wTGVmdCkgP1xyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID4gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQUJPayAmJiBpc0JDT2sgJiYgaXNDQU9rO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY0NvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY0NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5YKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4WDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1Jhc3Rlcml6ZXJ9IGZyb20gXCIuL1Jhc3Rlcml6ZXJcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0tleWJvYXJkQmluZGVyfSBmcm9tIFwiLi9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZEJpbmRlclwiO1xyXG5pbXBvcnQge0NhbWVyYX0gZnJvbSBcIi4vQ2FtZXJhL0NhbWVyYVwiO1xyXG5pbXBvcnQge0tleWJvYXJkSW5wdXREYXRhfSBmcm9tIFwiLi9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YVwiO1xyXG5pbXBvcnQge0ZpbGVMb2FkZXJ9IGZyb20gXCIuL2lvL2lucHV0L2ZpbGUvRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQge09iakxvYWRlcn0gZnJvbSBcIi4vaW8vaW5wdXQvbWVzaC9PYmpMb2FkZXJcIjtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JlZW5DYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdCB0YXJnZXRTY3JlZW4gPSBuZXcgU2NyZWVuSGFuZGxlcihjYW52YXMpO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgS2V5Ym9hcmRCaW5kZXIucmVnaXN0ZXJLZXlCaW5kaW5ncygpO1xyXG5cclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuICAgIGNhbWVyYS5zZXRMb29rQXQoS2V5Ym9hcmRJbnB1dERhdGEubG9va0F0LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQsIG5ldyBWZWN0b3IzKDAsIDEsIDApKTtcclxuICAgIGNhbWVyYS5zZXRQZXJzcGVjdGl2ZSg0NSwgMTYvOSwgMC4xLCAxMDApO1xyXG5cclxuICAgIGNvbnN0IG9ialRleHQgPSBGaWxlTG9hZGVyLmxvYWRGaWxlKFwicmVzb3VyY2VzL21vZGVscy90ZWFwb3Qub2JqXCIpO1xyXG4gICAgY29uc3QgbWVzaExvYWRlciA9IG5ldyBPYmpMb2FkZXIoKTtcclxuICAgIGNvbnN0IG9iak1lc2ggPSBtZXNoTG9hZGVyLmxvYWRNZXNoKG9ialRleHQpO1xyXG5cclxuICAgIG9iak1lc2gudHJhbnNmb3JtLnNjYWxlKG5ldyBWZWN0b3IzKDAuNCwgMC40LCAwLjQpKTtcclxuXHJcbiAgICBjb25zdCByYXN0ZXJpemVyOiBSYXN0ZXJpemVyID0gbmV3IFJhc3Rlcml6ZXIodGFyZ2V0U2NyZWVuLCBbb2JqTWVzaF0sIGNhbWVyYSk7XHJcbiAgICByYXN0ZXJpemVyLnVwZGF0ZSgpO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0aWFsaXplKTtcclxuXHJcbiIsImV4cG9ydCBjbGFzcyBGaWxlTG9hZGVyIHtcclxuXHJcbiAgICBzdGF0aWMgbG9hZEZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBodHRwUmVxdWVzdC5vcGVuKFwiR0VUXCIsIGZpbGVQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgaHR0cFJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIGlmIChodHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7S2V5Ym9hcmRJbnB1dERhdGF9IGZyb20gXCIuL0tleWJvYXJkSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uLy4uLy4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkQmluZGVyIHtcclxuICAgIHN0YXRpYyByZWdpc3RlcktleUJpbmRpbmdzKCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2EnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5sb29rQXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5sb29rQXQueCAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC55LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS50YXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS50YXJnZXQueCAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2QnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5sb29rQXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5sb29rQXQueCArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC55LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS50YXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS50YXJnZXQueCArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICd3Jykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEubG9va0F0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubG9va0F0LngsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC55LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueiAtIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEudGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEudGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueiAtIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdzJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEubG9va0F0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubG9va0F0LngsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC55LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEudGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEudGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnKycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC54LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueSArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC54LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueSArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC54LCBLZXlib2FyZElucHV0RGF0YS5sb29rQXQueSAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmxvb2tBdC56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC54LCBLZXlib2FyZElucHV0RGF0YS50YXJnZXQueSAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLnRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnbicpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uRGlyZWN0aW9uID0gbmV3IFZlY3RvcjMoMCwgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkFuZ2xlIC09IDAuMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnbScpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uRGlyZWN0aW9uID0gbmV3IFZlY3RvcjMoMCwgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkFuZ2xlICs9IDAuMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaicpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnNjYWxpbmcgLT0gMC4wMDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2snKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nICs9IDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dERhdGEge1xyXG4gICAgc3RhdGljIGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIDUpO1xyXG4gICAgc3RhdGljIHRhcmdldCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG5cclxuICAgIHN0YXRpYyBzY2FsaW5nID0gMTtcclxuXHJcbiAgICBzdGF0aWMgcm90YXRpb25EaXJlY3Rpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIHN0YXRpYyByb3RhdGlvbkFuZ2xlID0gMDtcclxufTsiLCJpbXBvcnQge01lc2hMb2FkZXJ9IGZyb20gXCIuL01lc2hMb2FkZXJcIjtcclxuaW1wb3J0IHtNZXNofSBmcm9tIFwiLi4vLi4vLi4vZ2VvbWV0cnkvTWVzaFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4uLy4uLy4uL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi8uLi9vdXRwdXQvc2NyZWVuL0NvbG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqTG9hZGVyIGltcGxlbWVudHMgTWVzaExvYWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2ZXJ0aWNlczogVmVjdG9yM1tdID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5vcm1hbHM6IFZlY3RvcjNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmYWNlczogVHJpYW5nbGVbXSA9IFtdO1xyXG5cclxuICAgIGxvYWRNZXNoKG1lc2hBc1RleHQ6IHN0cmluZyk6IE1lc2gge1xyXG4gICAgICAgIGNvbnN0IGZpbGVMaW5lcyA9IG1lc2hBc1RleHQuc3BsaXQoL1xccj9cXG4vKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgZmlsZUxpbmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVTZWdtZW50cyA9IGxpbmUuc3BsaXQoL1xccysvKTtcclxuICAgICAgICAgICAgY29uc3QgbGluZUhlYWRlciA9IGxpbmVTZWdtZW50c1swXTtcclxuICAgICAgICAgICAgY29uc3QgbGluZURhdGEgPSBsaW5lU2VnbWVudHMuc2xpY2UoMSwgbGluZVNlZ21lbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmIChsaW5lSGVhZGVyID09PSBcInZcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZVZlcnRleChsaW5lRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZUhlYWRlciA9PT0gXCJ2blwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlTm9ybWFsKGxpbmVEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lSGVhZGVyID09PSBcImZcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUZhY2UobGluZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTWVzaCh0aGlzLmZhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZVZlcnRleCh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4ID0gbmV3IFZlY3RvcjMocGFyc2VGbG9hdCh2YWx1ZXNbMF0pLCBwYXJzZUZsb2F0KHZhbHVlc1sxXSksIHBhcnNlRmxvYXQodmFsdWVzWzJdKSk7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHZlcnRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VOb3JtYWwodmFsdWVzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IG5ldyBWZWN0b3IzKHBhcnNlRmxvYXQodmFsdWVzWzBdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMV0pLCBwYXJzZUZsb2F0KHZhbHVlc1syXSkpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscy5wdXNoKG5vcm1hbC5nZXROb3JtYWxpemVkKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlRmFjZSh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmFjZVZlcnRleEluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgY29uc3QgZmFjZVRleHR1cmVJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGZhY2VOb3JtYWxJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHZlcnRleEluZm8gb2YgdmFsdWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0VmVydGV4SW5mbyA9IHZlcnRleEluZm8uc3BsaXQoL1xcLy8pO1xyXG4gICAgICAgICAgICBmYWNlVmVydGV4SW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1swXSkpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3BsaXRWZXJ0ZXhJbmZvLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvWzFdICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlVGV4dHVyZUluZGljZXMucHVzaChwYXJzZUludChzcGxpdFZlcnRleEluZm9bMV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHNwbGl0VmVydGV4SW5mby5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0VmVydGV4SW5mb1sxXSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZVRleHR1cmVJbmRpY2VzLnB1c2gocGFyc2VJbnQoc3BsaXRWZXJ0ZXhJbmZvWzFdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvWzJdICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsSW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1syXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZWQ6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMCwgMCk7XHJcbiAgICAgICAgY29uc3QgZ3JlZW46IENvbG9yID0gbmV3IENvbG9yKDAsIDI1NSwgMCk7XHJcbiAgICAgICAgY29uc3QgYmx1ZTogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMjU1KTtcclxuICAgICAgICBjb25zdCBmYWNlID0gbmV3IFRyaWFuZ2xlKHRoaXMudmVydGljZXNbKGZhY2VWZXJ0ZXhJbmRpY2VzWzBdIC0gMSldLCB0aGlzLnZlcnRpY2VzWyhmYWNlVmVydGV4SW5kaWNlc1sxXSAtIDEpXSwgdGhpcy52ZXJ0aWNlc1soZmFjZVZlcnRleEluZGljZXNbMl0gLSAxKV0sIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG4gICAgICAgIHRoaXMuZmFjZXMucHVzaChmYWNlKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb2xvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYSA9IDI1NSkge1xyXG4gICAgICAgIHRoaXMuX3IgPSByO1xyXG4gICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkJ1ZmZlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY3JlZW5XaWR0aDogbnVtYmVyLCBzY3JlZW5IZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBVaW50OENsYW1wZWRBcnJheShzY3JlZW5XaWR0aCAqIHNjcmVlbkhlaWdodCAqIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKGluZGV4OiBudW1iZXIsIGNvbG9yOiBDb2xvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleF0gPSBjb2xvci5yO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDFdID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAyXSA9IGNvbG9yLmI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgM10gPSBjb2xvci5hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBidWZmZXIoKTogVWludDhDbGFtcGVkQXJyYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9TZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkhhbmRsZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhbnZhc0N0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2hlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBpeGVsc0Zyb21CdWZmZXIoY29sb3JCdWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGNvbG9yQnVmZmVyLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclNjcmVlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguY2xlYXJSZWN0KDAsIDAsIFNldHRpbmdzLnNjcmVlbldpZHRoLCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZwc0Rpc3BsYXkoZnBzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDhhMzAwXCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxUZXh0KFwiRlBTOiBcIiArIGZwcywgMTAsIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuICAgIHN0YXRpYyBzY3JlZW5XaWR0aDogbnVtYmVyO1xyXG4gICAgc3RhdGljIHNjcmVlbkhlaWdodDogbnVtYmVyO1xyXG4gICAgc3RhdGljIGNsZWFyQ29sb3I6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDUwKTtcclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeDR4NCB7XHJcblxyXG4gICAgcmVhZG9ubHkgZGF0YTogW0Zsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheV07XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXNJZGVudGl0eSA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYoYXNJZGVudGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMV0pXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoNCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KDQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVJZGVudGl0eSgpOiBNYXRyaXg0eDQge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NHg0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG90aGVyOiBNYXRyaXg0eDQpOiBNYXRyaXg0eDRcclxuICAgIG11bHRpcGx5KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICBjb25zdCB3ID0gMTtcclxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMF1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0eSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVsxXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR6ID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzJdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHcgPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbM11bM10gKiB3O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModHggLyB0dywgdHkgLyB0dywgdHogLyB0dyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVswXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzFdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMl0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVszXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVswXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzFdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMl0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVszXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVswXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzFdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMl0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVszXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVswXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzFdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMl0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVszXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yMyB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcclxuICAgICAgICB0aGlzLl94ID0geDtcclxuICAgICAgICB0aGlzLl95ID0geTtcclxuICAgICAgICB0aGlzLl96ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmV0d2VlblBvaW50cyhwMTogVmVjdG9yMywgcDI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCB4ID0gcDEuX3ggLSBwMi5feDtcclxuICAgICAgICBjb25zdCB5ID0gcDEuX3kgLSBwMi5feTtcclxuICAgICAgICBjb25zdCB6ID0gcDEuX3ogLSBwMi5fejtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCwgeSwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWFnbml0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3opO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vcm1hbGl6ZWQoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuZ2V0TWFnbml0dWRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdChvdGhlcjogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiBvdGhlci5feCArIHRoaXMuX3kgKiBvdGhlci5feSArIHRoaXMuX3ogKiBvdGhlci5fejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyhvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygodGhpcy5feSAqIG90aGVyLl96KSAtICh0aGlzLl96ICogb3RoZXIuX3kpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feiAqIG90aGVyLl94KSAtICh0aGlzLl94ICogb3RoZXIuX3opLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feCAqIG90aGVyLl95KSAtICh0aGlzLl95ICogb3RoZXIuX3gpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCArIG90aGVyLl94LCB0aGlzLl95ICsgb3RoZXIuX3ksIHRoaXMuX3ogKyBvdGhlci5feilcclxuICAgIH1cclxuXHJcbiAgICBzdWJzdHJhY3Qob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAtIG90aGVyLl94LCB0aGlzLl95IC0gb3RoZXIuX3ksIHRoaXMuX3ogLSBvdGhlci5feilcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLl94LCB0aGlzLl95ICogb3RoZXIuX3ksIHRoaXMuX3ogKiBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLCB0aGlzLl95ICogb3RoZXIsIHRoaXMuX3ogKiBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGl2aWRlKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlci5feCwgdGhpcy5feSAvIG90aGVyLl95LCB0aGlzLl96IC8gb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlciwgdGhpcy5feSAvIG90aGVyLCB0aGlzLl96IC8gb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96O1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==