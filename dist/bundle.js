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

/***/ "./src/scripts/Rasterizer.ts":
/*!***********************************!*\
  !*** ./src/scripts/Rasterizer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ScreenBuffer_1 = __webpack_require__(/*! ./io/output/screen/ScreenBuffer */ "./src/scripts/io/output/screen/ScreenBuffer.ts");
const Color_1 = __webpack_require__(/*! ./camera/Color */ "./src/scripts/camera/Color.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const KeyboardInputData_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
class Rasterizer {
    constructor(targetScreen, drawableObjects, lights, camera) {
        this.targetScreen = targetScreen;
        let accumulatedTriangles = [];
        for (const drawableObject of drawableObjects) {
            accumulatedTriangles = accumulatedTriangles.concat(drawableObject.toTriangles());
        }
        this.triangles = accumulatedTriangles;
        this.lights = lights;
        this.camera = camera;
    }
    update() {
        const trianglesToRender = [];
        this.camera.setLookAt(KeyboardInputData_1.KeyboardInputData.cameraPosition, KeyboardInputData_1.KeyboardInputData.cameraTarget, new Vector3_1.Vector3(0, 1, 0));
        for (const triangle of this.triangles) {
            const projectedTriangle = this.camera.project(triangle);
            let enlightenedTriangle = projectedTriangle;
            for (const light of this.lights) {
                enlightenedTriangle = light.enlighten(enlightenedTriangle);
            }
            trianglesToRender.push(enlightenedTriangle);
            /***************************/
            triangle.transform.scale(new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.scaling, KeyboardInputData_1.KeyboardInputData.scaling, KeyboardInputData_1.KeyboardInputData.scaling));
            if (KeyboardInputData_1.KeyboardInputData.rotationDirection.getMagnitude() != 0) {
                triangle.transform.rotate(KeyboardInputData_1.KeyboardInputData.rotationDirection, KeyboardInputData_1.KeyboardInputData.rotationAngle);
            }
            /***************************/
        }
        this.lights[0].position = KeyboardInputData_1.KeyboardInputData.lightPosition;
        this.targetScreen.clearScreen();
        this.render(trianglesToRender);
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

/***/ "./src/scripts/camera/Camera.ts":
/*!**************************************!*\
  !*** ./src/scripts/camera/Camera.ts ***!
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
        const newANormal = projectionViewWorld.multiply(triangle.aNormal);
        const newBNormal = projectionViewWorld.multiply(triangle.bNormal);
        const newCNormal = projectionViewWorld.multiply(triangle.cNormal);
        return new Triangle_1.Triangle(newA, newB, newC, newANormal, newBNormal, newCNormal, triangle.aColor, triangle.bColor, triangle.cColor);
    }
    updateProjectionView() {
        this.projectionView = this.projection.multiply(this.view);
    }
}
exports.Camera = Camera;


/***/ }),

/***/ "./src/scripts/camera/Color.ts":
/*!*************************************!*\
  !*** ./src/scripts/camera/Color.ts ***!
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
Color.RED = new Color(255, 0, 0);
Color.GREEN = new Color(0, 255, 0);
Color.BLUE = new Color(0, 0, 255);


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
const Color_1 = __webpack_require__(/*! ../camera/Color */ "./src/scripts/camera/Color.ts");
const Settings_1 = __webpack_require__(/*! ../io/output/screen/Settings */ "./src/scripts/io/output/screen/Settings.ts");
const DrawableObject_1 = __webpack_require__(/*! ./DrawableObject */ "./src/scripts/geometry/DrawableObject.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "./src/scripts/math/MathUtils.ts");
class Triangle extends DrawableObject_1.DrawableObject {
    constructor(a, b, c, aNormal, bNormal, cNormal, aColor = Color_1.Color.RED, bColor = Color_1.Color.GREEN, cColor = Color_1.Color.BLUE) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._aNormal = aNormal;
        this._bNormal = bNormal;
        this._cNormal = cNormal;
        this._aColor = aColor;
        this._bColor = bColor;
        this._cColor = cColor;
        const x1 = Math.round((this.a.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const x2 = Math.round((this.b.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const x3 = Math.round((this.c.x + 1) * Settings_1.Settings.screenWidth * 0.5);
        const y1 = Math.round(Math.abs((this.a.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        const y2 = Math.round(Math.abs((this.b.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        const y3 = Math.round(Math.abs((this.c.y + 1) * Settings_1.Settings.screenHeight * 0.5 - Settings_1.Settings.screenHeight));
        const clippedX1 = MathUtils_1.MathUtils.clampFromZero(x1, Settings_1.Settings.screenWidth);
        const clippedY1 = MathUtils_1.MathUtils.clampFromZero(y1, Settings_1.Settings.screenHeight);
        const clippedX2 = MathUtils_1.MathUtils.clampFromZero(x2, Settings_1.Settings.screenWidth);
        const clippedY2 = MathUtils_1.MathUtils.clampFromZero(y2, Settings_1.Settings.screenHeight);
        const clippedX3 = MathUtils_1.MathUtils.clampFromZero(x3, Settings_1.Settings.screenWidth);
        const clippedY3 = MathUtils_1.MathUtils.clampFromZero(y3, Settings_1.Settings.screenHeight);
        this.screenA = new Vector3_1.Vector3(clippedX1, clippedY1);
        this.screenB = new Vector3_1.Vector3(clippedX2, clippedY2);
        this.screenC = new Vector3_1.Vector3(clippedX3, clippedY3);
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
        this.isABTopLeft = this.dyAB < 0 || (this.dyAB === 0 && this.dxAB > 0);
        this.isBCTopLeft = this.dyBC < 0 || (this.dyBC === 0 && this.dxBC > 0);
        this.isCATopLeft = this.dyCA < 0 || (this.dyCA === 0 && this.dxCA > 0);
    }
    withColors(newAColor, newBColor, newCColor) {
        return new Triangle(this.a, this.b, this.c, this.aNormal, this.bNormal, this.cNormal, newAColor, newBColor, newCColor);
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
        let isABOk;
        this.isABTopLeft ?
            isABOk = this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) >= 0 :
            isABOk = this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0;
        let isBCOk;
        this.isBCTopLeft ?
            isBCOk = this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) >= 0 :
            isBCOk = this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0;
        let isCAOk;
        this.isCATopLeft ?
            isCAOk = this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) >= 0 :
            isCAOk = this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;
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
    get aNormal() {
        return this._aNormal;
    }
    get bNormal() {
        return this._bNormal;
    }
    get cNormal() {
        return this._cNormal;
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
const Camera_1 = __webpack_require__(/*! ./camera/Camera */ "./src/scripts/camera/Camera.ts");
const KeyboardInputData_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
const FileLoader_1 = __webpack_require__(/*! ./io/input/file/FileLoader */ "./src/scripts/io/input/file/FileLoader.ts");
const ObjLoader_1 = __webpack_require__(/*! ./io/input/mesh/ObjLoader */ "./src/scripts/io/input/mesh/ObjLoader.ts");
const Color_1 = __webpack_require__(/*! ./camera/Color */ "./src/scripts/camera/Color.ts");
const PointLight_1 = __webpack_require__(/*! ./light/PointLight */ "./src/scripts/light/PointLight.ts");
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    KeyboardBinder_1.KeyboardBinder.registerKeyBindings();
    const camera = new Camera_1.Camera();
    camera.setLookAt(KeyboardInputData_1.KeyboardInputData.cameraPosition, KeyboardInputData_1.KeyboardInputData.cameraTarget, new Vector3_1.Vector3(0, 1, 0));
    camera.setPerspective(45, 16 / 9, 0.1, 100);
    const objText = FileLoader_1.FileLoader.loadFile("resources/models/monkey.obj");
    const meshLoader = new ObjLoader_1.ObjLoader();
    const objMesh = meshLoader.loadMesh(objText);
    // objMesh.transform.scale(new Vector3(0.25, 0.25, 0.25));
    // objMesh.transform.translate(new Vector3(0, 0, -10));
    // objMesh.transform.translate(new Vector3(-0.5, -0.5, 0));
    const ambientLightColor = new Color_1.Color(0, 0, 0);
    const diffuseLightColor = new Color_1.Color(0.3, 0.3, 0.3);
    const specularLightColor = new Color_1.Color(0.2, 0.2, 0.2);
    const light = new PointLight_1.PointLight(KeyboardInputData_1.KeyboardInputData.lightPosition, ambientLightColor, diffuseLightColor, specularLightColor, 20);
    const light2 = new PointLight_1.PointLight(new Vector3_1.Vector3(-3, 0, 3), ambientLightColor, diffuseLightColor, new Color_1.Color(0.2, 0.2, 0.2), 20);
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [objMesh], [light], camera);
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
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x - 0.01, KeyboardInputData_1.KeyboardInputData.cameraPosition.y, KeyboardInputData_1.KeyboardInputData.cameraPosition.z);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x - 0.01, KeyboardInputData_1.KeyboardInputData.cameraTarget.y, KeyboardInputData_1.KeyboardInputData.cameraTarget.z);
                return;
            }
            if (event.key === 'd') {
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x + 0.01, KeyboardInputData_1.KeyboardInputData.cameraPosition.y, KeyboardInputData_1.KeyboardInputData.cameraPosition.z);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x + 0.01, KeyboardInputData_1.KeyboardInputData.cameraTarget.y, KeyboardInputData_1.KeyboardInputData.cameraTarget.z);
                return;
            }
            if (event.key === 'w') {
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x, KeyboardInputData_1.KeyboardInputData.cameraPosition.y, KeyboardInputData_1.KeyboardInputData.cameraPosition.z - 0.01);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x, KeyboardInputData_1.KeyboardInputData.cameraTarget.y, KeyboardInputData_1.KeyboardInputData.cameraTarget.z - 0.01);
                return;
            }
            if (event.key === 's') {
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x, KeyboardInputData_1.KeyboardInputData.cameraPosition.y, KeyboardInputData_1.KeyboardInputData.cameraPosition.z + 0.01);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x, KeyboardInputData_1.KeyboardInputData.cameraTarget.y, KeyboardInputData_1.KeyboardInputData.cameraTarget.z + 0.01);
                return;
            }
            if (event.key === '+') {
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x, KeyboardInputData_1.KeyboardInputData.cameraPosition.y + 0.01, KeyboardInputData_1.KeyboardInputData.cameraPosition.z);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x, KeyboardInputData_1.KeyboardInputData.cameraTarget.y + 0.01, KeyboardInputData_1.KeyboardInputData.cameraTarget.z);
                return;
            }
            if (event.key === '-') {
                KeyboardInputData_1.KeyboardInputData.cameraPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraPosition.x, KeyboardInputData_1.KeyboardInputData.cameraPosition.y - 0.01, KeyboardInputData_1.KeyboardInputData.cameraPosition.z);
                KeyboardInputData_1.KeyboardInputData.cameraTarget = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.cameraTarget.x, KeyboardInputData_1.KeyboardInputData.cameraTarget.y - 0.01, KeyboardInputData_1.KeyboardInputData.cameraTarget.z);
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
            if (event.key === 'o') {
                KeyboardInputData_1.KeyboardInputData.scaling -= 0.001;
                return;
            }
            if (event.key === 'p') {
                KeyboardInputData_1.KeyboardInputData.scaling += 0.001;
                return;
            }
            if (event.key === 'u') {
                KeyboardInputData_1.KeyboardInputData.lightPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lightPosition.x, KeyboardInputData_1.KeyboardInputData.lightPosition.y + 0.1, KeyboardInputData_1.KeyboardInputData.lightPosition.z);
                return;
            }
            if (event.key === 'j') {
                KeyboardInputData_1.KeyboardInputData.lightPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lightPosition.x, KeyboardInputData_1.KeyboardInputData.lightPosition.y - 0.1, KeyboardInputData_1.KeyboardInputData.lightPosition.z);
                return;
            }
            if (event.key === 'k') {
                KeyboardInputData_1.KeyboardInputData.lightPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lightPosition.x + 0.1, KeyboardInputData_1.KeyboardInputData.lightPosition.y, KeyboardInputData_1.KeyboardInputData.lightPosition.z);
                return;
            }
            if (event.key === 'h') {
                KeyboardInputData_1.KeyboardInputData.lightPosition = new Vector3_1.Vector3(KeyboardInputData_1.KeyboardInputData.lightPosition.x - 0.1, KeyboardInputData_1.KeyboardInputData.lightPosition.y, KeyboardInputData_1.KeyboardInputData.lightPosition.z);
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
KeyboardInputData.cameraPosition = new Vector3_1.Vector3(0, 0, 5);
KeyboardInputData.cameraTarget = new Vector3_1.Vector3(0, 0, 0);
KeyboardInputData.scaling = 1;
KeyboardInputData.rotationDirection = new Vector3_1.Vector3(0, 0, 0);
KeyboardInputData.rotationAngle = 0;
KeyboardInputData.lightPosition = new Vector3_1.Vector3(3, 0, 3);


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
const Color_1 = __webpack_require__(/*! ../../../camera/Color */ "./src/scripts/camera/Color.ts");
class ObjLoader {
    constructor() {
        this.vertices = [];
        this.normals = [];
        this.faces = [];
    }
    loadMesh(meshAsText) {
        this.reset();
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
        const white = new Color_1.Color(255, 255, 255);
        const face = new Triangle_1.Triangle(this.vertices[(faceVertexIndices[0] - 1)], this.vertices[(faceVertexIndices[1] - 1)], this.vertices[(faceVertexIndices[2] - 1)], this.normals[(faceNormalIndices[0] - 1)], this.normals[(faceNormalIndices[1] - 1)], this.normals[(faceNormalIndices[2] - 1)], Color_1.Color.GREEN, Color_1.Color.GREEN, Color_1.Color.GREEN);
        this.faces.push(face);
    }
    reset() {
        this.vertices = [];
        this.normals = [];
        this.faces = [];
    }
}
exports.ObjLoader = ObjLoader;


/***/ }),

/***/ "./src/scripts/io/output/screen/ScreenBuffer.ts":
/*!******************************************************!*\
  !*** ./src/scripts/io/output/screen/ScreenBuffer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = __webpack_require__(/*! ./Settings */ "./src/scripts/io/output/screen/Settings.ts");
class ScreenBuffer {
    constructor(screenWidth, screenHeight) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
        for (let i = 0, bufferLength = this._buffer.length; i < bufferLength; i += 4) {
            this._buffer[i] = Settings_1.Settings.clearColor.r;
            this._buffer[i + 1] = Settings_1.Settings.clearColor.g;
            this._buffer[i + 2] = Settings_1.Settings.clearColor.b;
            this._buffer[i + 3] = Settings_1.Settings.clearColor.a;
        }
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
const Color_1 = __webpack_require__(/*! ../../../camera/Color */ "./src/scripts/camera/Color.ts");
class Settings {
}
exports.Settings = Settings;
Settings.clearColor = new Color_1.Color(0, 0, 0, 50);


/***/ }),

/***/ "./src/scripts/light/Light.ts":
/*!************************************!*\
  !*** ./src/scripts/light/Light.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Light {
    constructor(position, ambient, diffuse, specular, shininess) {
        this._position = position;
        this._ambient = ambient;
        this._diffuse = diffuse;
        this._specular = specular;
        this._shininess = shininess;
    }
    enlighten(triangle) {
        const newAColor = this.calculateVertexColor(triangle.a, triangle.aColor, triangle.aNormal);
        const newBColor = this.calculateVertexColor(triangle.b, triangle.bColor, triangle.bNormal);
        const newCColor = this.calculateVertexColor(triangle.c, triangle.cColor, triangle.cNormal);
        return triangle.withColors(newAColor, newBColor, newCColor);
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    get ambient() {
        return this._ambient;
    }
    get diffuse() {
        return this._diffuse;
    }
    get specular() {
        return this._specular;
    }
    get shininess() {
        return this._shininess;
    }
}
exports.Light = Light;


/***/ }),

/***/ "./src/scripts/light/PointLight.ts":
/*!*****************************************!*\
  !*** ./src/scripts/light/PointLight.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Light_1 = __webpack_require__(/*! ./Light */ "./src/scripts/light/Light.ts");
const Color_1 = __webpack_require__(/*! ../camera/Color */ "./src/scripts/camera/Color.ts");
class PointLight extends Light_1.Light {
    constructor(position, ambient, diffuse, specular, shininess) {
        super(position, ambient, diffuse, specular, shininess);
    }
    calculateVertexColor(vertex, vertexColor, normal) {
        const N = normal.getNormalized();
        let V = vertex.multiply(-1);
        const L = this.position.substract(V).getNormalized();
        V = V.getNormalized();
        const R = L.getReflectedBy(N);
        const iD = L.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);
        const rChannel = vertexColor.r * (this.ambient.r + (iD * this.diffuse.r) + (iS * this.specular.r));
        const gChannel = vertexColor.g * (this.ambient.g + (iD * this.diffuse.g) + (iS * this.specular.g));
        const bChannel = vertexColor.b * (this.ambient.b + (iD * this.diffuse.b) + (iS * this.specular.b));
        return new Color_1.Color(rChannel, gChannel, bChannel);
    }
}
exports.PointLight = PointLight;


/***/ }),

/***/ "./src/scripts/math/MathUtils.ts":
/*!***************************************!*\
  !*** ./src/scripts/math/MathUtils.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MathUtils {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    static clampFromZero(value, max) {
        return this.clamp(value, 0, max);
    }
}
exports.MathUtils = MathUtils;


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
    getReflectedBy(normal) {
        const n = normal.getNormalized();
        return this.substract(n.multiply(2 * this.dot(n)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jYW1lcmEvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NhbWVyYS9Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9EcmF3YWJsZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9NZXNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L1RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9UcmlhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9maWxlL0ZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRCaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRJbnB1dERhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vaW5wdXQvbWVzaC9PYmpMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5CdWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL291dHB1dC9zY3JlZW4vU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbGlnaHQvTGlnaHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbGlnaHQvUG9pbnRMaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tYXRoL01hdGhVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tYXRoL01hdHJpeDR4NC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tYXRoL1ZlY3RvcjMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLG9JQUE2RDtBQUM3RCwyRkFBcUM7QUFDckMsNkZBQXVDO0FBRXZDLHFKQUF3RTtBQUl4RSxNQUFhLFVBQVU7SUFRbkIsWUFBWSxZQUEyQixFQUFFLGVBQWlDLEVBQUUsTUFBZSxFQUFFLE1BQWM7UUFDdkcsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxvQkFBb0IsR0FBZSxFQUFFLENBQUM7UUFDMUMsS0FBSyxNQUFNLGNBQWMsSUFBSSxlQUFlLEVBQUU7WUFDMUMsb0JBQW9C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Y0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNKO0FBekRELDhCQXlEQzs7Ozs7Ozs7Ozs7Ozs7O0FDNURELDhGQUF3QztBQUN4Qyw0RkFBc0M7QUFDdEMseUhBQXNEO0FBQ3RELGlIQUFnRDtBQUNoRCxvR0FBNEM7QUFFNUMsTUFBYSxRQUFTLFNBQVEsK0JBQWM7SUFrQ3hDLFlBQVksQ0FBVSxFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLE9BQWdCLEVBQUUsTUFBTSxHQUFHLGFBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLGFBQUssQ0FBQyxJQUFJO1FBQy9KLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLG1CQUFRLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNuRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbkUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN0RyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3RHLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLG1CQUFRLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFdEcsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsTUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FB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LE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNaLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE9BQU8sSUFBSSxpQkFBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNILE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssT0FBTyxNQUFNLENBQUM7U0FDakI7SUFDTCxDQUFDO0NBRUo7QUExREQsOEJBMERDOzs7Ozs7Ozs7Ozs7Ozs7QUM1REQsTUFBYSxPQUFPO0lBTWhCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFXLEVBQUUsRUFBVztRQUN6QyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWU7UUFDMUIsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBYztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFDM0MsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUMzQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWM7UUFDZCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYztRQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFJRCxRQUFRLENBQUMsS0FBVTtRQUNmLElBQUksS0FBSyxZQUFZLE9BQU8sRUFBRTtZQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUlELE1BQU0sQ0FBQyxLQUFVO1FBQ2IsSUFBSSxLQUFLLFlBQVksT0FBTyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakY7YUFBTTtZQUNILE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFqRkQsMEJBaUZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge1NjcmVlbkJ1ZmZlcn0gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5CdWZmZXJcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vY2FtZXJhL0NvbG9yXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7Q2FtZXJhfSBmcm9tIFwiLi9jYW1lcmEvQ2FtZXJhXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRJbnB1dERhdGF9IGZyb20gXCIuL2lvL2lucHV0L2tleWJvYXJkL0tleWJvYXJkSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7RHJhd2FibGVPYmplY3R9IGZyb20gXCIuL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0XCI7XHJcbmltcG9ydCB7TGlnaHR9IGZyb20gXCIuL2xpZ2h0L0xpZ2h0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFzdGVyaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlnaHRzOiBMaWdodFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYW1lcmE6IENhbWVyYTtcclxuICAgIHByaXZhdGUgbGFzdENhbGxlZFRpbWU6IERPTUhpZ2hSZXNUaW1lU3RhbXA7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyLCBkcmF3YWJsZU9iamVjdHM6IERyYXdhYmxlT2JqZWN0W10sIGxpZ2h0czogTGlnaHRbXSwgY2FtZXJhOiBDYW1lcmEpIHtcclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbiA9IHRhcmdldFNjcmVlbjtcclxuICAgICAgICBsZXQgYWNjdW11bGF0ZWRUcmlhbmdsZXM6IFRyaWFuZ2xlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGRyYXdhYmxlT2JqZWN0IG9mIGRyYXdhYmxlT2JqZWN0cykge1xyXG4gICAgICAgICAgICBhY2N1bXVsYXRlZFRyaWFuZ2xlcyA9IGFjY3VtdWxhdGVkVHJpYW5nbGVzLmNvbmNhdChkcmF3YWJsZU9iamVjdC50b1RyaWFuZ2xlcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSBhY2N1bXVsYXRlZFRyaWFuZ2xlcztcclxuICAgICAgICB0aGlzLmxpZ2h0cyA9IGxpZ2h0cztcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRyaWFuZ2xlc1RvUmVuZGVyID0gW107XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuc2V0TG9va0F0KEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQsIG5ldyBWZWN0b3IzKDAsIDEsIDApKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RlZFRyaWFuZ2xlID0gdGhpcy5jYW1lcmEucHJvamVjdCh0cmlhbmdsZSk7XHJcbiAgICAgICAgICAgIGxldCBlbmxpZ2h0ZW5lZFRyaWFuZ2xlID0gcHJvamVjdGVkVHJpYW5nbGU7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlnaHQgb2YgdGhpcy5saWdodHMpIHtcclxuICAgICAgICAgICAgICAgIGVubGlnaHRlbmVkVHJpYW5nbGUgPSBsaWdodC5lbmxpZ2h0ZW4oZW5saWdodGVuZWRUcmlhbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJpYW5nbGVzVG9SZW5kZXIucHVzaChlbmxpZ2h0ZW5lZFRyaWFuZ2xlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICB0cmlhbmdsZS50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZywgS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZywgS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZykpO1xyXG4gICAgICAgICAgICBpZiAoS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24uZ2V0TWFnbml0dWRlKCkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5nbGUudHJhbnNmb3JtLnJvdGF0ZShLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25BbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlnaHRzWzBdLnBvc2l0aW9uID0gS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uY2xlYXJTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLnJlbmRlcih0cmlhbmdsZXNUb1JlbmRlcik7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0RnBzRGlzcGxheSh0aGlzLmNhbGN1bGF0ZUZwcygpKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlRnBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxhc3RDYWxsZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVsdGE6IG51bWJlciA9IChwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMubGFzdENhbGxlZFRpbWUpIC8gMTAwMDtcclxuICAgICAgICB0aGlzLmxhc3RDYWxsZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoMSAvIGRlbHRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlcih0cmlhbmdsZXM6IFRyaWFuZ2xlW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY3JlZW5CdWZmZXIgPSBuZXcgU2NyZWVuQnVmZmVyKHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoLCB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGRlcHRoQnVmZmVyOiBudW1iZXJbXSA9IG5ldyBBcnJheSh0aGlzLnRhcmdldFNjcmVlbi53aWR0aCAqIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCkuZmlsbChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHQgPSAwLCB0cmlhbmdsZXNMZW5ndGggPSB0cmlhbmdsZXMubGVuZ3RoOyB0IDwgdHJpYW5nbGVzTGVuZ3RoOyArK3QpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRyaWFuZ2xlID0gdHJpYW5nbGVzW3RdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gY3VycmVudFRyaWFuZ2xlLm1pblg7IHggPD0gY3VycmVudFRyaWFuZ2xlLm1heFg7ICsreCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IGN1cnJlbnRUcmlhbmdsZS5taW5ZOyB5IDw9IGN1cnJlbnRUcmlhbmdsZS5tYXhZOyArK3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyaWFuZ2xlLmlzSW4oeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFtYmRhQ29yZHM6IFZlY3RvcjMgPSBjdXJyZW50VHJpYW5nbGUudG9MYW1iZGFDb29yZGluYXRlcyh4LCB5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGg6IG51bWJlciA9IFJhc3Rlcml6ZXIuY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHMsIGN1cnJlbnRUcmlhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckluZGV4ID0gdGhpcy5jYWxjdWxhdGVCdWZmZXJJbmRleCh4LCB5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZGVwdGhCdWZmZXJbYnVmZmVySW5kZXggLyA0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGhCdWZmZXJbYnVmZmVySW5kZXggLyA0XSA9IGRlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuQnVmZmVyLnNldENvbG9yKGJ1ZmZlckluZGV4LCBSYXN0ZXJpemVyLmNhbGN1bGF0ZUludGVycG9sYXRlZENvbG9yKGxhbWJkYUNvcmRzLCBjdXJyZW50VHJpYW5nbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0UGl4ZWxzRnJvbUJ1ZmZlcihzY3JlZW5CdWZmZXIuYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJ1ZmZlckluZGV4KHNjcmVlblg6IG51bWJlciwgc2NyZWVuWTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoc2NyZWVuWSAqIHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICsgc2NyZWVuWCkgKiA0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVEZXB0aChsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmEueiArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iLnogKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuYy56O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZUludGVycG9sYXRlZENvbG9yKGxhbWJkYUNvcmRzOiBWZWN0b3IzLCB0cmlhbmdsZTogVHJpYW5nbGUpOiBDb2xvciB7XHJcbiAgICAgICAgY29uc3QgcmVkSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5yICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5yICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5yO1xyXG4gICAgICAgIGNvbnN0IGdyZWVuSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5nICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5nICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5nO1xyXG4gICAgICAgIGNvbnN0IGJsdWVJbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLmIgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLmIgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLmI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihyZWRJbnRlcnBvbGF0ZWQsIGdyZWVuSW50ZXJwb2xhdGVkLCBibHVlSW50ZXJwb2xhdGVkKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge01hdHJpeDR4NH0gZnJvbSBcIi4uL21hdGgvTWF0cml4NHg0XCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi4vZ2VvbWV0cnkvVHJpYW5nbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcHJvamVjdGlvbjogTWF0cml4NHg0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3OiBNYXRyaXg0eDQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICBwcml2YXRlIHByb2plY3Rpb25WaWV3OiBNYXRyaXg0eDQ7XHJcblxyXG4gICAgc2V0TG9va0F0KHBvc2l0aW9uOiBWZWN0b3IzLCB0YXJnZXQ6IFZlY3RvcjMsIHVwRGlyZWN0aW9uOiBWZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2FtZXJhRGlyZWN0aW9uID0gdGFyZ2V0LnN1YnN0cmFjdChwb3NpdGlvbikuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIHVwRGlyZWN0aW9uID0gdXBEaXJlY3Rpb24uZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBjYW1lcmFEaXJlY3Rpb24uY3Jvc3ModXBEaXJlY3Rpb24pO1xyXG4gICAgICAgIGNvbnN0IHUgPSBzLmNyb3NzKGNhbWVyYURpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5kYXRhWzBdID0gbmV3IEZsb2F0MzJBcnJheShbcy54LCBzLnksIHMueiwgLXBvc2l0aW9uLnhdKTtcclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3UueCwgdS55LCB1LnosIC1wb3NpdGlvbi55XSk7XHJcbiAgICAgICAgdGhpcy52aWV3LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFstY2FtZXJhRGlyZWN0aW9uLngsIC1jYW1lcmFEaXJlY3Rpb24ueSwgLWNhbWVyYURpcmVjdGlvbi56LCAtcG9zaXRpb24uel0pO1xyXG4gICAgICAgIHRoaXMudmlldy5kYXRhWzNdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMV0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvamVjdGlvblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJzcGVjdGl2ZShmb3ZZOiBudW1iZXIsIGFzcGVjdDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm92WSAqPSBNYXRoLlBJIC8gMzYwO1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLmNvcyhmb3ZZKSAvIE1hdGguc2luKGZvdlkpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2plY3Rpb24uZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW2YvYXNwZWN0LCAwLCAwLCAwXSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCBmLCAwLCAwXSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAoZmFyICsgbmVhcikgLyAobmVhciAtIGZhciksICgyICogZmFyICogbmVhcikgLyAobmVhciAtIGZhcildKTtcclxuICAgICAgICB0aGlzLnByb2plY3Rpb24uZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIC0xLCAwXSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0aW9uVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2plY3QodHJpYW5nbGU6IFRyaWFuZ2xlKTogVHJpYW5nbGUge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb25WaWV3V29ybGQgPSB0aGlzLnByb2plY3Rpb25WaWV3Lm11bHRpcGx5KHRyaWFuZ2xlLnRyYW5zZm9ybS5vYmplY3RUb1dvcmxkKTtcclxuICAgICAgICBjb25zdCBuZXdBID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5hKTtcclxuICAgICAgICBjb25zdCBuZXdCID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5iKTtcclxuICAgICAgICBjb25zdCBuZXdDID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5jKTtcclxuICAgICAgICBjb25zdCBuZXdBTm9ybWFsID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5hTm9ybWFsKTtcclxuICAgICAgICBjb25zdCBuZXdCTm9ybWFsID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5iTm9ybWFsKTtcclxuICAgICAgICBjb25zdCBuZXdDTm9ybWFsID0gcHJvamVjdGlvblZpZXdXb3JsZC5tdWx0aXBseSh0cmlhbmdsZS5jTm9ybWFsKTtcclxuICAgICAgICByZXR1cm4gbmV3IFRyaWFuZ2xlKG5ld0EsIG5ld0IsIG5ld0MsIG5ld0FOb3JtYWwsIG5ld0JOb3JtYWwsIG5ld0NOb3JtYWwsIHRyaWFuZ2xlLmFDb2xvciwgdHJpYW5nbGUuYkNvbG9yLCB0cmlhbmdsZS5jQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvamVjdGlvblZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uVmlldyA9IHRoaXMucHJvamVjdGlvbi5tdWx0aXBseSh0aGlzLnZpZXcpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENvbG9yIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSRUQgPSBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR1JFRU4gPSBuZXcgQ29sb3IoMCwgMjU1LCAwKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQkxVRSA9IG5ldyBDb2xvcigwLCAwLCAyNTUpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGEgPSAyNTUpIHtcclxuICAgICAgICB0aGlzLl9yID0gcjtcclxuICAgICAgICB0aGlzLl9nID0gZztcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gXCIuL1RyYW5zZm9ybVwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9UcmlhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlT2JqZWN0IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RyYW5zZm9ybTogVHJhbnNmb3JtO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW47XHJcbiAgICBhYnN0cmFjdCB0b1RyaWFuZ2xlcygpOiBUcmlhbmdsZVtdXHJcblxyXG4gICAgZ2V0IHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0RyYXdhYmxlT2JqZWN0fSBmcm9tIFwiLi9EcmF3YWJsZU9iamVjdFwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9UcmlhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc2ggZXh0ZW5kcyBEcmF3YWJsZU9iamVjdHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmlhbmdsZXM6IFRyaWFuZ2xlW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW4oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmlhbmdsZS5pc0luKHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9UcmlhbmdsZXMoKTogVHJpYW5nbGVbXSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICB0cmlhbmdsZS50cmFuc2Zvcm0ub2JqZWN0VG9Xb3JsZCA9IHRoaXMudHJhbnNmb3JtLm9iamVjdFRvV29ybGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyaWFuZ2xlcztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge01hdHJpeDR4NH0gZnJvbSBcIi4uL21hdGgvTWF0cml4NHg0XCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XHJcblxyXG4gICAgb2JqZWN0VG9Xb3JsZDogTWF0cml4NHg0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IE1hdHJpeDR4NC5jcmVhdGVJZGVudGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCB0cmFuc2xhdGlvbi54XSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIHRyYW5zbGF0aW9uLnldKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgdHJhbnNsYXRpb24uel0pO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gdHJhbnNsYXRpb25NYXRyaXgubXVsdGlwbHkodGhpcy5vYmplY3RUb1dvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZShzY2FsaW5nOiBWZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGluZ01hdHJpeCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtzY2FsaW5nLngsIDAsIDAsIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCBzY2FsaW5nLnksIDAsIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCBzY2FsaW5nLnosIDBdKTtcclxuICAgICAgICBzY2FsaW5nTWF0cml4LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gc2NhbGluZ01hdHJpeC5tdWx0aXBseSh0aGlzLm9iamVjdFRvV29ybGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZShyb3RhdGlvbkRpcmVjdGlvbjogVmVjdG9yMywgYW5nbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICByb3RhdGlvbkRpcmVjdGlvbiA9IHJvdGF0aW9uRGlyZWN0aW9uLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCB4ID0gcm90YXRpb25EaXJlY3Rpb24ueDtcclxuICAgICAgICBjb25zdCB5ID0gcm90YXRpb25EaXJlY3Rpb24ueTtcclxuICAgICAgICBjb25zdCB6ID0gcm90YXRpb25EaXJlY3Rpb24uejtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVswXSA9IHggKiB4ICogKDEgLSBjb3MpICsgY29zO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMV0gPSB4ICogeSAqICgxIC0gY29zKSAtIHogKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVsyXSA9IHggKiB6ICogKDEgLSBjb3MpICsgeSAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVswXSA9IHkgKiB4ICogKDEgLSBjb3MpICsgeiAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzFdID0geSAqIHkgKiAoMSAtIGNvcykgKyBjb3M7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVsyXSA9IHkgKiB6ICogKDEgLSBjb3MpIC0geCAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVswXSA9IHggKiB6ICogKDEgLSBjb3MpIC0geSAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzFdID0geSAqIHogKiAoMSAtIGNvcykgKyB4ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bMl0gPSB6ICogeiAqICgxIC0gY29zKSArIGNvcztcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzNdID0gMDtcclxuXHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVswXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVsxXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVsyXSA9IDA7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVszXVszXSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IHJvdGF0aW9uTWF0cml4Lm11bHRpcGx5KHRoaXMub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uL2NhbWVyYS9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi4vaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0RyYXdhYmxlT2JqZWN0fSBmcm9tIFwiLi9EcmF3YWJsZU9iamVjdFwiO1xyXG5pbXBvcnQge01hdGhVdGlsc30gZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBEcmF3YWJsZU9iamVjdCB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2I6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FOb3JtYWw6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iTm9ybWFsOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY05vcm1hbDogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hQ29sb3I6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYkNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NDb2xvcjogQ29sb3I7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5BOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5COiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5DOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeEJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4Q0E6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5Q0E6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9taW5YOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXhYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9taW5ZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXhZOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0FCVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNCQ1RvcExlZnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQ0FUb3BMZWZ0OiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMsIGM6IFZlY3RvcjMsIGFOb3JtYWw6IFZlY3RvcjMsIGJOb3JtYWw6IFZlY3RvcjMsIGNOb3JtYWw6IFZlY3RvcjMsIGFDb2xvciA9IENvbG9yLlJFRCwgYkNvbG9yID0gQ29sb3IuR1JFRU4sIGNDb2xvciA9IENvbG9yLkJMVUUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2MgPSBjO1xyXG4gICAgICAgIHRoaXMuX2FOb3JtYWwgPSBhTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2JOb3JtYWwgPSBiTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2NOb3JtYWwgPSBjTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2FDb2xvciA9IGFDb2xvcjtcclxuICAgICAgICB0aGlzLl9iQ29sb3IgPSBiQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fY0NvbG9yID0gY0NvbG9yO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9IE1hdGgucm91bmQoKHRoaXMuYS54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNSk7XHJcbiAgICAgICAgY29uc3QgeDIgPSBNYXRoLnJvdW5kKCh0aGlzLmIueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjUpO1xyXG4gICAgICAgIGNvbnN0IHgzID0gTWF0aC5yb3VuZCgodGhpcy5jLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41KTtcclxuICAgICAgICBjb25zdCB5MSA9IE1hdGgucm91bmQoTWF0aC5hYnMoKHRoaXMuYS55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpKTtcclxuICAgICAgICBjb25zdCB5MiA9IE1hdGgucm91bmQoTWF0aC5hYnMoKHRoaXMuYi55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpKTtcclxuICAgICAgICBjb25zdCB5MyA9IE1hdGgucm91bmQoTWF0aC5hYnMoKHRoaXMuYy55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFgxID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeDEsIFNldHRpbmdzLnNjcmVlbldpZHRoKTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWTEgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh5MSwgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWDIgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh4MiwgU2V0dGluZ3Muc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRZMiA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHkyLCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRYMyA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHgzLCBTZXR0aW5ncy5zY3JlZW5XaWR0aCk7XHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFkzID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeTMsIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NyZWVuQSA9IG5ldyBWZWN0b3IzKGNsaXBwZWRYMSwgY2xpcHBlZFkxKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkIgPSBuZXcgVmVjdG9yMyhjbGlwcGVkWDIsIGNsaXBwZWRZMik7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5DID0gbmV3IFZlY3RvcjMoY2xpcHBlZFgzLCBjbGlwcGVkWTMpO1xyXG5cclxuICAgICAgICB0aGlzLl9taW5YID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLngsIHRoaXMuc2NyZWVuQi54LCB0aGlzLnNjcmVlbkMueCk7XHJcbiAgICAgICAgdGhpcy5fbWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMuX21pblkgPSBNYXRoLm1pbih0aGlzLnNjcmVlbkEueSwgdGhpcy5zY3JlZW5CLnksIHRoaXMuc2NyZWVuQy55KTtcclxuICAgICAgICB0aGlzLl9tYXhZID0gTWF0aC5tYXgodGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHhBQiA9IHRoaXMuc2NyZWVuQS54IC0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgdGhpcy5keEJDID0gdGhpcy5zY3JlZW5CLnggLSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICB0aGlzLmR4Q0EgPSB0aGlzLnNjcmVlbkMueCAtIHRoaXMuc2NyZWVuQS54O1xyXG5cclxuICAgICAgICB0aGlzLmR5QUIgPSB0aGlzLnNjcmVlbkEueSAtIHRoaXMuc2NyZWVuQi55O1xyXG4gICAgICAgIHRoaXMuZHlCQyA9IHRoaXMuc2NyZWVuQi55IC0gdGhpcy5zY3JlZW5DLnk7XHJcbiAgICAgICAgdGhpcy5keUNBID0gdGhpcy5zY3JlZW5DLnkgLSB0aGlzLnNjcmVlbkEueTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0FCVG9wTGVmdCA9IHRoaXMuZHlBQiA8IDAgfHwgKHRoaXMuZHlBQiA9PT0gMCAmJiB0aGlzLmR4QUIgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQkNUb3BMZWZ0ID0gdGhpcy5keUJDIDwgMCB8fCAodGhpcy5keUJDID09PSAwICYmIHRoaXMuZHhCQyA+IDApO1xyXG4gICAgICAgIHRoaXMuaXNDQVRvcExlZnQgPSB0aGlzLmR5Q0EgPCAwIHx8ICh0aGlzLmR5Q0EgPT09IDAgJiYgdGhpcy5keENBID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aENvbG9ycyhuZXdBQ29sb3I6IENvbG9yLCBuZXdCQ29sb3I6IENvbG9yLCBuZXdDQ29sb3I6IENvbG9yKTogVHJpYW5nbGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJpYW5nbGUodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5hTm9ybWFsLCB0aGlzLmJOb3JtYWwsIHRoaXMuY05vcm1hbCwgbmV3QUNvbG9yLCBuZXdCQ29sb3IsIG5ld0NDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdG9UcmlhbmdsZXMoKTogVHJpYW5nbGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzXTtcclxuICAgIH1cclxuXHJcbiAgICB0b0xhbWJkYUNvb3JkaW5hdGVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhQSA9ICh0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSArIC10aGlzLmR4QkMgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSkgL1xyXG4gICAgICAgICAgICAodGhpcy5keUJDICogLXRoaXMuZHhDQSArIC10aGlzLmR4QkMgKiAtdGhpcy5keUNBKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQiA9ICh0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSArIC10aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSkgL1xyXG4gICAgICAgICAgICAodGhpcy5keUNBICogdGhpcy5keEJDICsgLXRoaXMuZHhDQSAqIHRoaXMuZHlCQyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUMgPSAxIC0gbGFtYmRhQSAtIGxhbWJkYUI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKGxhbWJkYUEsIGxhbWJkYUIsIGxhbWJkYUMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW4oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNBQk9rOiBib29sZWFuO1xyXG4gICAgICAgIHRoaXMuaXNBQlRvcExlZnQgP1xyXG4gICAgICAgICAgICBpc0FCT2sgPSB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID49IDAgOlxyXG4gICAgICAgICAgICBpc0FCT2sgPSB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID4gMDtcclxuXHJcblxyXG4gICAgICAgIGxldCBpc0JDT2s6IGJvb2xlYW47XHJcbiAgICAgICAgdGhpcy5pc0JDVG9wTGVmdCA/XHJcbiAgICAgICAgICAgIGlzQkNPayA9IHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIGlzQkNPayA9IHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPiAwO1xyXG5cclxuICAgICAgICBsZXQgaXNDQU9rOiBib29sZWFuO1xyXG4gICAgICAgIHRoaXMuaXNDQVRvcExlZnQgP1xyXG4gICAgICAgICAgICBpc0NBT2sgPSB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID49IDAgOlxyXG4gICAgICAgICAgICBpc0NBT2sgPSB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID4gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQUJPayAmJiBpc0JDT2sgJiYgaXNDQU9rO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhTm9ybWFsKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hTm9ybWFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiTm9ybWFsKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iTm9ybWFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjTm9ybWFsKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jTm9ybWFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY0NvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY0NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5YKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4WDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1Jhc3Rlcml6ZXJ9IGZyb20gXCIuL1Jhc3Rlcml6ZXJcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0tleWJvYXJkQmluZGVyfSBmcm9tIFwiLi9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZEJpbmRlclwiO1xyXG5pbXBvcnQge0NhbWVyYX0gZnJvbSBcIi4vY2FtZXJhL0NhbWVyYVwiO1xyXG5pbXBvcnQge0tleWJvYXJkSW5wdXREYXRhfSBmcm9tIFwiLi9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YVwiO1xyXG5pbXBvcnQge0ZpbGVMb2FkZXJ9IGZyb20gXCIuL2lvL2lucHV0L2ZpbGUvRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQge09iakxvYWRlcn0gZnJvbSBcIi4vaW8vaW5wdXQvbWVzaC9PYmpMb2FkZXJcIjtcclxuaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0fSBmcm9tIFwiLi9saWdodC9EaXJlY3Rpb25hbExpZ2h0XCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL2NhbWVyYS9Db2xvclwiO1xyXG5pbXBvcnQge1BvaW50TGlnaHR9IGZyb20gXCIuL2xpZ2h0L1BvaW50TGlnaHRcIjtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JlZW5DYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdCB0YXJnZXRTY3JlZW4gPSBuZXcgU2NyZWVuSGFuZGxlcihjYW52YXMpO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgS2V5Ym9hcmRCaW5kZXIucmVnaXN0ZXJLZXlCaW5kaW5ncygpO1xyXG5cclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuICAgIGNhbWVyYS5zZXRMb29rQXQoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24sIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xyXG4gICAgY2FtZXJhLnNldFBlcnNwZWN0aXZlKDQ1LCAxNi85LCAwLjEsIDEwMCk7XHJcblxyXG4gICAgY29uc3Qgb2JqVGV4dCA9IEZpbGVMb2FkZXIubG9hZEZpbGUoXCJyZXNvdXJjZXMvbW9kZWxzL21vbmtleS5vYmpcIik7XHJcbiAgICBjb25zdCBtZXNoTG9hZGVyID0gbmV3IE9iakxvYWRlcigpO1xyXG4gICAgY29uc3Qgb2JqTWVzaCA9IG1lc2hMb2FkZXIubG9hZE1lc2gob2JqVGV4dCk7XHJcblxyXG4gICAgLy8gb2JqTWVzaC50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoMC4yNSwgMC4yNSwgMC4yNSkpO1xyXG4gICAgLy8gb2JqTWVzaC50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBWZWN0b3IzKDAsIDAsIC0xMCkpO1xyXG4gICAgLy8gb2JqTWVzaC50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBWZWN0b3IzKC0wLjUsIC0wLjUsIDApKTtcclxuXHJcbiAgICBjb25zdCBhbWJpZW50TGlnaHRDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwKTtcclxuICAgIGNvbnN0IGRpZmZ1c2VMaWdodENvbG9yID0gbmV3IENvbG9yKDAuMywgMC4zLCAwLjMpO1xyXG4gICAgY29uc3Qgc3BlY3VsYXJMaWdodENvbG9yID0gbmV3IENvbG9yKDAuMiwgMC4yLCAwLjIpO1xyXG5cclxuICAgIGNvbnN0IGxpZ2h0ID0gbmV3IFBvaW50TGlnaHQoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbiwgYW1iaWVudExpZ2h0Q29sb3IsIGRpZmZ1c2VMaWdodENvbG9yLCBzcGVjdWxhckxpZ2h0Q29sb3IsIDIwKTtcclxuICAgIGNvbnN0IGxpZ2h0MiA9IG5ldyBQb2ludExpZ2h0KCBuZXcgVmVjdG9yMygtMywgMCwgMyksIGFtYmllbnRMaWdodENvbG9yLCBkaWZmdXNlTGlnaHRDb2xvciwgbmV3IENvbG9yKDAuMiwgMC4yLCAwLjIpLCAyMCk7XHJcblxyXG4gICAgY29uc3QgcmFzdGVyaXplcjogUmFzdGVyaXplciA9IG5ldyBSYXN0ZXJpemVyKHRhcmdldFNjcmVlbiwgW29iak1lc2hdLCBbbGlnaHRdLCBjYW1lcmEpO1xyXG4gICAgcmFzdGVyaXplci51cGRhdGUoKTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdGlhbGl6ZSk7XHJcblxyXG4iLCJleHBvcnQgY2xhc3MgRmlsZUxvYWRlciB7XHJcblxyXG4gICAgc3RhdGljIGxvYWRGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgaHR0cFJlcXVlc3Qub3BlbihcIkdFVFwiLCBmaWxlUGF0aCwgZmFsc2UpO1xyXG4gICAgICAgIGh0dHBSZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBodHRwUmVxdWVzdC5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tleWJvYXJkSW5wdXREYXRhfSBmcm9tIFwiLi9LZXlib2FyZElucHV0RGF0YVwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEJpbmRlciB7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJLZXlCaW5kaW5ncygpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdhJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54IC0gMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2QnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnggKyAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54ICsgMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3cnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnKycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55ICsgMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICctJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55IC0gMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnkgLSAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICduJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24gPSBuZXcgVmVjdG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uQW5nbGUgLT0gMC4xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdtJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24gPSBuZXcgVmVjdG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uQW5nbGUgKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnbycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnNjYWxpbmcgLT0gMC4wMDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3AnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nICs9IDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAndScpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSArIDAuMSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaicpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSAtIDAuMSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2snKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi54ICsgMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi54IC0gMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dERhdGEge1xyXG4gICAgc3RhdGljIGNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgNSk7XHJcbiAgICBzdGF0aWMgY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcblxyXG4gICAgc3RhdGljIHNjYWxpbmcgPSAxO1xyXG5cclxuICAgIHN0YXRpYyByb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgc3RhdGljIHJvdGF0aW9uQW5nbGUgPSAwO1xyXG5cclxuICAgIHN0YXRpYyBsaWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMywgMCwgMyk7XHJcbn0iLCJpbXBvcnQge01lc2hMb2FkZXJ9IGZyb20gXCIuL01lc2hMb2FkZXJcIjtcclxuaW1wb3J0IHtNZXNofSBmcm9tIFwiLi4vLi4vLi4vZ2VvbWV0cnkvTWVzaFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4uLy4uLy4uL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi8uLi8uLi9jYW1lcmEvQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmpMb2FkZXIgaW1wbGVtZW50cyBNZXNoTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHZlcnRpY2VzOiBWZWN0b3IzW10gPSBbXTtcclxuICAgIHByaXZhdGUgbm9ybWFsczogVmVjdG9yM1tdID0gW107XHJcbiAgICBwcml2YXRlIGZhY2VzOiBUcmlhbmdsZVtdID0gW107XHJcblxyXG4gICAgbG9hZE1lc2gobWVzaEFzVGV4dDogc3RyaW5nKTogTWVzaCB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIGNvbnN0IGZpbGVMaW5lcyA9IG1lc2hBc1RleHQuc3BsaXQoL1xccj9cXG4vKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgZmlsZUxpbmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVTZWdtZW50cyA9IGxpbmUuc3BsaXQoL1xccysvKTtcclxuICAgICAgICAgICAgY29uc3QgbGluZUhlYWRlciA9IGxpbmVTZWdtZW50c1swXTtcclxuICAgICAgICAgICAgY29uc3QgbGluZURhdGEgPSBsaW5lU2VnbWVudHMuc2xpY2UoMSwgbGluZVNlZ21lbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmIChsaW5lSGVhZGVyID09PSBcInZcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZVZlcnRleChsaW5lRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZUhlYWRlciA9PT0gXCJ2blwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlTm9ybWFsKGxpbmVEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lSGVhZGVyID09PSBcImZcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUZhY2UobGluZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTWVzaCh0aGlzLmZhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlVmVydGV4KHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB2ZXJ0ZXggPSBuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHZhbHVlc1swXSksIHBhcnNlRmxvYXQodmFsdWVzWzFdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMl0pKTtcclxuICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2godmVydGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlTm9ybWFsKHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBub3JtYWwgPSBuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHZhbHVlc1swXSksIHBhcnNlRmxvYXQodmFsdWVzWzFdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMl0pKTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMucHVzaChub3JtYWwuZ2V0Tm9ybWFsaXplZCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlRmFjZSh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmFjZVZlcnRleEluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgY29uc3QgZmFjZVRleHR1cmVJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGZhY2VOb3JtYWxJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHZlcnRleEluZm8gb2YgdmFsdWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0VmVydGV4SW5mbyA9IHZlcnRleEluZm8uc3BsaXQoL1xcLy8pO1xyXG4gICAgICAgICAgICBmYWNlVmVydGV4SW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1swXSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNwbGl0VmVydGV4SW5mby5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0VmVydGV4SW5mb1sxXSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZVRleHR1cmVJbmRpY2VzLnB1c2gocGFyc2VJbnQoc3BsaXRWZXJ0ZXhJbmZvWzFdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BsaXRWZXJ0ZXhJbmZvLmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvWzFdICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlVGV4dHVyZUluZGljZXMucHVzaChwYXJzZUludChzcGxpdFZlcnRleEluZm9bMV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzcGxpdFZlcnRleEluZm9bMl0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2VOb3JtYWxJbmRpY2VzLnB1c2gocGFyc2VJbnQoc3BsaXRWZXJ0ZXhJbmZvWzJdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgd2hpdGUgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgY29uc3QgZmFjZSA9IG5ldyBUcmlhbmdsZSh0aGlzLnZlcnRpY2VzWyhmYWNlVmVydGV4SW5kaWNlc1swXSAtIDEpXSwgdGhpcy52ZXJ0aWNlc1soZmFjZVZlcnRleEluZGljZXNbMV0gLSAxKV0sIHRoaXMudmVydGljZXNbKGZhY2VWZXJ0ZXhJbmRpY2VzWzJdIC0gMSldLFxyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzBdIC0gMSldLCB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzFdIC0gMSldLCB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzJdIC0gMSldLFxyXG4gICAgICAgICAgICBDb2xvci5HUkVFTiwgQ29sb3IuR1JFRU4sIENvbG9yLkdSRUVOKTtcclxuICAgICAgICB0aGlzLmZhY2VzLnB1c2goZmFjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5ub3JtYWxzID0gW107XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFtdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL2NhbWVyYS9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9TZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkJ1ZmZlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY3JlZW5XaWR0aDogbnVtYmVyLCBzY3JlZW5IZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBVaW50OENsYW1wZWRBcnJheShzY3JlZW5XaWR0aCAqIHNjcmVlbkhlaWdodCAqIDQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBidWZmZXJMZW5ndGggPSB0aGlzLl9idWZmZXIubGVuZ3RoOyBpIDwgYnVmZmVyTGVuZ3RoOyBpKz00KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcltpXSA9IFNldHRpbmdzLmNsZWFyQ29sb3IucjtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyW2krMV0gPSBTZXR0aW5ncy5jbGVhckNvbG9yLmc7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcltpKzJdID0gU2V0dGluZ3MuY2xlYXJDb2xvci5iO1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXJbaSszXSA9IFNldHRpbmdzLmNsZWFyQ29sb3IuYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sb3IoaW5kZXg6IG51bWJlciwgY29sb3I6IENvbG9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4XSA9IGNvbG9yLnI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMV0gPSBjb2xvci5nO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDJdID0gY29sb3IuYjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAzXSA9IGNvbG9yLmE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJ1ZmZlcigpOiBVaW50OENsYW1wZWRBcnJheSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVuSGFuZGxlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2FudmFzQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGl4ZWxzRnJvbUJ1ZmZlcihjb2xvckJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoY29sb3JCdWZmZXIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2NyZWVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5jbGVhclJlY3QoMCwgMCwgU2V0dGluZ3Muc2NyZWVuV2lkdGgsIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RnBzRGlzcGxheShmcHM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiMwOGEzMDBcIjtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFRleHQoXCJGUFM6IFwiICsgZnBzLCAxMCwgMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi8uLi8uLi9jYW1lcmEvQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBzdGF0aWMgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHN0YXRpYyBzY3JlZW5IZWlnaHQ6IG51bWJlcjtcclxuICAgIHN0YXRpYyBjbGVhckNvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCA1MCk7XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4uL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi9jYW1lcmEvQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaWdodCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hbWJpZW50OiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RpZmZ1c2U6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3BlY3VsYXI6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2hpbmluZXNzOiBudW1iZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzLCBhbWJpZW50OiBDb2xvciwgZGlmZnVzZTogQ29sb3IsIHNwZWN1bGFyOiBDb2xvciwgc2hpbmluZXNzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuX2FtYmllbnQgPSBhbWJpZW50O1xyXG4gICAgICAgIHRoaXMuX2RpZmZ1c2UgPSBkaWZmdXNlO1xyXG4gICAgICAgIHRoaXMuX3NwZWN1bGFyID0gc3BlY3VsYXI7XHJcbiAgICAgICAgdGhpcy5fc2hpbmluZXNzID0gc2hpbmluZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGVubGlnaHRlbih0cmlhbmdsZTogVHJpYW5nbGUpOiBUcmlhbmdsZSB7XHJcbiAgICAgICAgY29uc3QgbmV3QUNvbG9yID0gdGhpcy5jYWxjdWxhdGVWZXJ0ZXhDb2xvcih0cmlhbmdsZS5hLCB0cmlhbmdsZS5hQ29sb3IsIHRyaWFuZ2xlLmFOb3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IG5ld0JDb2xvciA9IHRoaXMuY2FsY3VsYXRlVmVydGV4Q29sb3IodHJpYW5nbGUuYiwgdHJpYW5nbGUuYkNvbG9yLCB0cmlhbmdsZS5iTm9ybWFsKTtcclxuICAgICAgICBjb25zdCBuZXdDQ29sb3IgPSB0aGlzLmNhbGN1bGF0ZVZlcnRleENvbG9yKHRyaWFuZ2xlLmMsIHRyaWFuZ2xlLmNDb2xvciwgdHJpYW5nbGUuY05vcm1hbCk7XHJcbiAgICAgICAgcmV0dXJuIHRyaWFuZ2xlLndpdGhDb2xvcnMobmV3QUNvbG9yLCBuZXdCQ29sb3IsIG5ld0NDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgY2FsY3VsYXRlVmVydGV4Q29sb3IodmVydGV4OiBWZWN0b3IzLCB2ZXJ0ZXhDb2xvcjogQ29sb3IsIG5vcm1hbDogVmVjdG9yMyk6IENvbG9yO1xyXG5cclxuICAgIGdldCBwb3NpdGlvbigpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBWZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYW1iaWVudCgpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtYmllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpZmZ1c2UoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWZmdXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcGVjdWxhcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWN1bGFyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaGluaW5lc3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hpbmluZXNzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtMaWdodH0gZnJvbSBcIi4vTGlnaHRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi9jYW1lcmEvQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzLCBhbWJpZW50OiBDb2xvciwgZGlmZnVzZTogQ29sb3IsIHNwZWN1bGFyOiBDb2xvciwgc2hpbmluZXNzOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbiwgYW1iaWVudCwgZGlmZnVzZSwgc3BlY3VsYXIsIHNoaW5pbmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlVmVydGV4Q29sb3IodmVydGV4OiBWZWN0b3IzLCB2ZXJ0ZXhDb2xvcjogQ29sb3IsIG5vcm1hbDogVmVjdG9yMyk6IENvbG9yIHtcclxuICAgICAgICBjb25zdCBOID0gbm9ybWFsLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBsZXQgViA9IHZlcnRleC5tdWx0aXBseSgtMSk7XHJcbiAgICAgICAgY29uc3QgTCA9IHRoaXMucG9zaXRpb24uc3Vic3RyYWN0KFYpLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBWID0gVi5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgUiA9IEwuZ2V0UmVmbGVjdGVkQnkoTik7XHJcblxyXG4gICAgICAgIGNvbnN0IGlEID0gTC5kb3QoTik7XHJcbiAgICAgICAgY29uc3QgaVMgPSBNYXRoLnBvdyhSLmRvdChWKSwgdGhpcy5zaGluaW5lc3MpO1xyXG5cclxuICAgICAgICBjb25zdCByQ2hhbm5lbCA9IHZlcnRleENvbG9yLnIgKiAodGhpcy5hbWJpZW50LnIgKyAoaUQgKiB0aGlzLmRpZmZ1c2UucikgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLnIpKTtcclxuICAgICAgICBjb25zdCBnQ2hhbm5lbCA9IHZlcnRleENvbG9yLmcgKiAodGhpcy5hbWJpZW50LmcgKyAoaUQgKiB0aGlzLmRpZmZ1c2UuZykgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLmcpKTtcclxuICAgICAgICBjb25zdCBiQ2hhbm5lbCA9IHZlcnRleENvbG9yLmIgKiAodGhpcy5hbWJpZW50LmIgKyAoaUQgKiB0aGlzLmRpZmZ1c2UuYikgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLmIpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihyQ2hhbm5lbCwgZ0NoYW5uZWwsIGJDaGFubmVsKTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgTWF0aFV0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsYW1wRnJvbVplcm8odmFsdWU6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wKHZhbHVlLCAwLCBtYXgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4NHg0IHtcclxuXHJcbiAgICByZWFkb25seSBkYXRhOiBbRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5XTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihhc0lkZW50aXR5ID0gZmFsc2UpIHtcclxuICAgICAgICBpZihhc0lkZW50aXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwXSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCAwXSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwXSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtuZXcgRmxvYXQzMkFycmF5KDQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoNCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KDQpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUlkZW50aXR5KCk6IE1hdHJpeDR4NCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0eDQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IE1hdHJpeDR4NCk6IE1hdHJpeDR4NFxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogYW55IHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSAxO1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVswXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5ID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzFdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHogPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMl1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0dyA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVszXVszXSAqIHc7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0eCAvIHR3LCB0eSAvIHR3LCB0eiAvIHR3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzBdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMV0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVsyXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzNdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzBdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMV0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVsyXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzNdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzBdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMV0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVsyXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzNdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzBdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMV0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVsyXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzNdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3IzIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF95OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF96OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgICAgIHRoaXMuX3kgPSB5O1xyXG4gICAgICAgIHRoaXMuX3ogPSB6O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBiZXR3ZWVuUG9pbnRzKHAxOiBWZWN0b3IzLCBwMjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IHggPSBwMS5feCAtIHAyLl94O1xyXG4gICAgICAgIGNvbnN0IHkgPSBwMS5feSAtIHAyLl95O1xyXG4gICAgICAgIGNvbnN0IHogPSBwMS5feiAtIHAyLl96O1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh4LCB5LCB6KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYWduaXR1ZGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX3ggKiB0aGlzLl94ICsgdGhpcy5feSAqIHRoaXMuX3kgKyB0aGlzLl96ICogdGhpcy5feik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9ybWFsaXplZCgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5nZXRNYWduaXR1ZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVmbGVjdGVkQnkobm9ybWFsOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgbiA9IG5vcm1hbC5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyYWN0KG4ubXVsdGlwbHkoMiAqIHRoaXMuZG90KG4pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG90KG90aGVyOiBWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feCAqIG90aGVyLl94ICsgdGhpcy5feSAqIG90aGVyLl95ICsgdGhpcy5feiAqIG90aGVyLl96O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKCh0aGlzLl95ICogb3RoZXIuX3opIC0gKHRoaXMuX3ogKiBvdGhlci5feSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl96ICogb3RoZXIuX3gpIC0gKHRoaXMuX3ggKiBvdGhlci5feiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl94ICogb3RoZXIuX3kpIC0gKHRoaXMuX3kgKiBvdGhlci5feCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICsgb3RoZXIuX3gsIHRoaXMuX3kgKyBvdGhlci5feSwgdGhpcy5feiArIG90aGVyLl96KVxyXG4gICAgfVxyXG5cclxuICAgIHN1YnN0cmFjdChvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC0gb3RoZXIuX3gsIHRoaXMuX3kgLSBvdGhlci5feSwgdGhpcy5feiAtIG90aGVyLl96KVxyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IG51bWJlcik6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICogb3RoZXIuX3gsIHRoaXMuX3kgKiBvdGhlci5feSwgdGhpcy5feiAqIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICogb3RoZXIsIHRoaXMuX3kgKiBvdGhlciwgdGhpcy5feiAqIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXZpZGUob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IG51bWJlcik6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAvIG90aGVyLl94LCB0aGlzLl95IC8gb3RoZXIuX3ksIHRoaXMuX3ogLyBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAvIG90aGVyLCB0aGlzLl95IC8gb3RoZXIsIHRoaXMuX3ogLyBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl95O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB6KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9