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
const Vector3_1 = __webpack_require__(/*! ../geometry/Vector3 */ "./src/scripts/geometry/Vector3.ts");
class CameraSettings {
}
exports.CameraSettings = CameraSettings;
CameraSettings.lookAt = new Vector3_1.Vector3(0, 0, 5);
CameraSettings.target = new Vector3_1.Vector3(0, 0, 0);


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
const Vector3_1 = __webpack_require__(/*! ../geometry/Vector3 */ "./src/scripts/geometry/Vector3.ts");
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
const Vector3_1 = __webpack_require__(/*! ./geometry/Vector3 */ "./src/scripts/geometry/Vector3.ts");
const Settings_1 = __webpack_require__(/*! ./screen/Settings */ "./src/scripts/screen/Settings.ts");
const VertexProcessor_1 = __webpack_require__(/*! ./geometry/VertexProcessor */ "./src/scripts/geometry/VertexProcessor.ts");
const CameraSettings_1 = __webpack_require__(/*! ./Camera/CameraSettings */ "./src/scripts/Camera/CameraSettings.ts");
class Rasterizer {
    constructor(targetScreen, triangle) {
        this.targetScreen = targetScreen;
        this.triangles = triangle;
    }
    update() {
        const trianglesToRender = [];
        const vp = new VertexProcessor_1.VertexProcessor();
        vp.setLookAt(CameraSettings_1.CameraSettings.lookAt, CameraSettings_1.CameraSettings.target, new Vector3_1.Vector3(0, 1, 0));
        vp.setPerspective(45, 1, 0.1, 100);
        for (const triangle of this.triangles) {
            trianglesToRender.push(new Triangle_1.Triangle(vp.transform(triangle.a), vp.transform(triangle.b), vp.transform(triangle.c), triangle.aColor, triangle.bColor, triangle.cColor));
        }
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
    render(trianglesToRender) {
        const screenBuffer = new ScreenBuffer_1.ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        const depthBuffer = new Array(this.targetScreen.width * this.targetScreen.height).fill(Number.MAX_SAFE_INTEGER);
        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, Settings_1.Settings.clearColor);
            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);
            for (const triangle of trianglesToRender) {
                if (triangle.isInBoundingBox(screenX, screenY) &&
                    triangle.isInTriangle(screenX, screenY)) {
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

/***/ "./src/scripts/geometry/Matrix4x4.ts":
/*!*******************************************!*\
  !*** ./src/scripts/geometry/Matrix4x4.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ./Vector3 */ "./src/scripts/geometry/Vector3.ts");
class Matrix4x4 {
    constructor() {
        this.data = [new Float32Array(4),
            new Float32Array(4),
            new Float32Array(4),
            new Float32Array(4)];
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

/***/ "./src/scripts/geometry/Triangle.ts":
/*!******************************************!*\
  !*** ./src/scripts/geometry/Triangle.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ./Vector3 */ "./src/scripts/geometry/Vector3.ts");
const Settings_1 = __webpack_require__(/*! ../screen/Settings */ "./src/scripts/screen/Settings.ts");
class Triangle {
    constructor(a, b, c, aColor, bColor, cColor) {
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

/***/ "./src/scripts/geometry/Vector3.ts":
/*!*****************************************!*\
  !*** ./src/scripts/geometry/Vector3.ts ***!
  \*****************************************/
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

/***/ "./src/scripts/geometry/VertexProcessor.ts":
/*!*************************************************!*\
  !*** ./src/scripts/geometry/VertexProcessor.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Matrix4x4_1 = __webpack_require__(/*! ./Matrix4x4 */ "./src/scripts/geometry/Matrix4x4.ts");
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
    setPerspective(fovY, aspect, near, far) {
        fovY *= Math.PI / 360;
        const f = Math.cos(fovY) / Math.sin(fovY);
        // column
        // this.viewToProjection.data[0] = new Float32Array([f/aspect, 0, 0, 0]);
        // this.viewToProjection.data[1] = new Float32Array([0, f, 0, 0]);
        // this.viewToProjection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), -1]);
        // this.viewToProjection.data[3] = new Float32Array([0, 0, (2 * far * near) / (near - far), 0]);
        // row
        this.viewToProjection.data[0] = new Float32Array([f / aspect, 0, 0, 0]);
        this.viewToProjection.data[1] = new Float32Array([0, f, 0, 0]);
        this.viewToProjection.data[2] = new Float32Array([0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)]);
        this.viewToProjection.data[3] = new Float32Array([0, 0, -1, 0]);
        this.VP = this.viewToProjection.multiply(this.worldToView);
    }
    transform(vertex) {
        return this.VP.multiply(vertex);
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
const Vector3_1 = __webpack_require__(/*! ./geometry/Vector3 */ "./src/scripts/geometry/Vector3.ts");
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
    const a1 = new Vector3_1.Vector3(0.75, 0, 0.5);
    const b1 = new Vector3_1.Vector3(0.75, 0.5, 0.5);
    const c1 = new Vector3_1.Vector3(-0.5, 0.6, 0.5);
    const triangle1 = new Triangle_1.Triangle(a1, b1, c1, red, green, blue);
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [triangle1]);
    rasterizer.update();
}
document.addEventListener("DOMContentLoaded", initialize);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvQ2FtZXJhL0NhbWVyYVNldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL0lucHV0L0tleWJvYXJkSW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9NYXRyaXg0eDQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJpYW5nbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9WZXJ0ZXhQcm9jZXNzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL0NvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TY3JlZW5CdWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL1NjcmVlbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL1NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFD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SUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsT0FBTyxJQUFJLGlCQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxPQUFPLE1BQU0sQ0FBQztTQUNqQjtJQUNMLENBQUM7Q0FFSjtBQS9DRCw4QkErQ0M7Ozs7Ozs7Ozs7Ozs7OztBQ2pERCw0RkFBa0M7QUFFbEMscUdBQTRDO0FBRTVDLE1BQWEsUUFBUTtJQThCakIsWUFBWSxDQUFVLEVBQUUsQ0FBVSxFQUFFLENBQVUsRUFBRSxNQUFhLEVBQUUsTUFBYSxFQUFFLE1BQWE7UUFDdkYsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLG1CQUFRLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEMsT0FBTyxJQUFJLGlCQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsWUFBWSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLE9BQU8sTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNoQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUNuQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUExSEQsNEJBMEhDOzs7Ozs7Ozs7Ozs7Ozs7QUM5SEQsTUFBYSxPQUFPO0lBTWhCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFXLEVBQUUsRUFBVztRQUN6QyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBYztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFDM0MsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUMzQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWM7UUFDZCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYztRQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFJRCxRQUFRLENBQUMsS0FBVTtRQUNmLElBQUksS0FBSyxZQUFZLE9BQU8sRUFBRTtZQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUlELE1BQU0sQ0FBQyxLQUFVO1FBQ2IsSUFBSSxLQUFLLFlBQVksT0FBTyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakY7YUFBTTtZQUNILE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUE1RUQsMEJBNEVDOzs7Ozs7Ozs7Ozs7Ozs7QUM1RUQsa0dBQXNDO0FBR3RDLE1BQWEsZUFBZTtJQUE1QjtRQUNxQixxQkFBZ0IsR0FBYyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUM5QyxnQkFBVyxHQUFjLElBQUkscUJBQVMsRUFBRSxDQUFDO0lBMEM5RCxDQUFDO0lBdkNHLFNBQVMsQ0FBQyxRQUFpQixFQUFFLE1BQWUsRUFBRSxXQUFvQjtRQUM5RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25FLFdBQVcsR0FBRyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLFNBQVM7UUFDVCxrRkFBa0Y7UUFDbEYsa0ZBQWtGO1FBQ2xGLGtGQUFrRjtRQUNsRiwyRkFBMkY7UUFFM0YsTUFBTTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVksRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLEdBQVc7UUFDbEUsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxTQUFTO1FBQ1QseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSw2RkFBNkY7UUFDN0YsZ0dBQWdHO1FBRWhHLE1BQU07UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2SCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBNUNELDBDQTRDQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0NELG1IQUFxRDtBQUNyRCw0RkFBd0M7QUFDeEMscUdBQTJDO0FBQzNDLHdHQUE2QztBQUM3QywyRkFBcUM7QUFDckMsb0dBQTJDO0FBQzNDLGlIQUFvRDtBQUVwRCxTQUFTLFVBQVU7SUFDZixNQUFNLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7SUFDL0YsTUFBTSxZQUFZLEdBQUcsSUFBSSw2QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLG1CQUFRLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDcEMsbUJBQVEsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN0Qyw2QkFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFcEMsTUFBTSxHQUFHLEdBQVUsSUFBSSxhQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxNQUFNLEtBQUssR0FBVSxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sSUFBSSxHQUFVLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFekMsTUFBTSxFQUFFLEdBQVksSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUMsTUFBTSxFQUFFLEdBQVksSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEQsTUFBTSxFQUFFLEdBQVksSUFBSSxpQkFBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLFNBQVMsR0FBYSxJQUFJLG1CQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV2RSxNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6RSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNUIxRCxNQUFhLEtBQUs7SUFNZCxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQUMsR0FBRyxHQUFHO1FBQ2hELElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBNUJELHNCQTRCQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJELE1BQWEsWUFBWTtJQUlyQixZQUFZLFdBQW1CLEVBQUUsWUFBb0I7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYSxFQUFFLEtBQVk7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBdEJELG9DQXNCQzs7Ozs7Ozs7Ozs7Ozs7O0FDeEJELE1BQWEsYUFBYTtJQU10QixZQUFZLE1BQXlCO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUE4QjtRQUM5QyxNQUFNLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVc7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUE3QkQsc0NBNkJDOzs7Ozs7Ozs7Ozs7Ozs7QUM3QkQsb0ZBQThCO0FBRTlCLE1BQWEsUUFBUTs7QUFBckIsNEJBSUM7QUFEVSxtQkFBVSxHQUFVLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9nZW9tZXRyeS9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhU2V0dGluZ3Mge1xyXG4gICAgc3RhdGljIGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIDUpO1xyXG4gICAgc3RhdGljIHRhcmdldCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG59IiwiaW1wb3J0IHtDYW1lcmFTZXR0aW5nc30gZnJvbSBcIi4uL0NhbWVyYS9DYW1lcmFTZXR0aW5nc1wiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9nZW9tZXRyeS9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dCB7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJLZXlCaW5kaW5ncygpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdhJykge1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MubG9va0F0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MubG9va0F0LnggLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnopO1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnggLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdkJykge1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MubG9va0F0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MubG9va0F0LnggKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnopO1xyXG4gICAgICAgICAgICAgICAgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0ID0gbmV3IFZlY3RvcjMoQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnggKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAndycpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLmxvb2tBdCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLmxvb2tBdC54LCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnRhcmdldCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLnRhcmdldC54LCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncycpIHtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLmxvb2tBdCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLmxvb2tBdC54LCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueSwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnogKyAwLjAxKTtcclxuICAgICAgICAgICAgICAgIENhbWVyYVNldHRpbmdzLnRhcmdldCA9IG5ldyBWZWN0b3IzKENhbWVyYVNldHRpbmdzLnRhcmdldC54LCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueSwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnogKyAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJysnKSB7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5sb29rQXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy5sb29rQXQueCwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnkgKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy50YXJnZXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy50YXJnZXQueCwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnkgKyAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy5sb29rQXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy5sb29rQXQueCwgQ2FtZXJhU2V0dGluZ3MubG9va0F0LnkgLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy5sb29rQXQueik7XHJcbiAgICAgICAgICAgICAgICBDYW1lcmFTZXR0aW5ncy50YXJnZXQgPSBuZXcgVmVjdG9yMyhDYW1lcmFTZXR0aW5ncy50YXJnZXQueCwgQ2FtZXJhU2V0dGluZ3MudGFyZ2V0LnkgLSAwLjAxLCBDYW1lcmFTZXR0aW5ncy50YXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7U2NyZWVuQnVmZmVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuQnVmZmVyXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL2dlb21ldHJ5L1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vc2NyZWVuL1NldHRpbmdzXCI7XHJcbmltcG9ydCB7VmVydGV4UHJvY2Vzc29yfSBmcm9tIFwiLi9nZW9tZXRyeS9WZXJ0ZXhQcm9jZXNzb3JcIjtcclxuaW1wb3J0IHtDYW1lcmFTZXR0aW5nc30gZnJvbSBcIi4vQ2FtZXJhL0NhbWVyYVNldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFzdGVyaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuICAgIHByaXZhdGUgbGFzdENhbGxlZFRpbWU6IERPTUhpZ2hSZXNUaW1lU3RhbXA7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyLCB0cmlhbmdsZTogVHJpYW5nbGVbXSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuID0gdGFyZ2V0U2NyZWVuO1xyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmlhbmdsZXNUb1JlbmRlciA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHZwID0gbmV3IFZlcnRleFByb2Nlc3NvcigpO1xyXG4gICAgICAgIHZwLnNldExvb2tBdChDYW1lcmFTZXR0aW5ncy5sb29rQXQsIENhbWVyYVNldHRpbmdzLnRhcmdldCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHZwLnNldFBlcnNwZWN0aXZlKDQ1LCAxLCAwLjEsIDEwMCk7XHJcbiAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICB0cmlhbmdsZXNUb1JlbmRlci5wdXNoKG5ldyBUcmlhbmdsZSh2cC50cmFuc2Zvcm0odHJpYW5nbGUuYSksIHZwLnRyYW5zZm9ybSh0cmlhbmdsZS5iKSwgdnAudHJhbnNmb3JtKHRyaWFuZ2xlLmMpLCB0cmlhbmdsZS5hQ29sb3IsIHRyaWFuZ2xlLmJDb2xvciwgdHJpYW5nbGUuY0NvbG9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyKHRyaWFuZ2xlc1RvUmVuZGVyKTtcclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5zZXRGcHNEaXNwbGF5KHRoaXMuY2FsY3VsYXRlRnBzKCkpO1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMubGFzdENhbGxlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWx0YTogbnVtYmVyID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgxIC8gZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKHRyaWFuZ2xlc1RvUmVuZGVyOiBUcmlhbmdsZVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuQnVmZmVyID0gbmV3IFNjcmVlbkJ1ZmZlcih0aGlzLnRhcmdldFNjcmVlbi53aWR0aCwgdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBkZXB0aEJ1ZmZlcjogbnVtYmVyW10gPSBuZXcgQXJyYXkodGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKiB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpLmZpbGwoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmVlbkJ1ZmZlci5nZXRMZW5ndGgoKTsgaSArPSA0KSB7XHJcbiAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihpLCBTZXR0aW5ncy5jbGVhckNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlblggPSB0aGlzLmNhbGN1bGF0ZVNjcmVlblgoaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlblkgPSB0aGlzLmNhbGN1bGF0ZVNjcmVlblkoaSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRyaWFuZ2xlc1RvUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpYW5nbGUuaXNJbkJvdW5kaW5nQm94KHNjcmVlblgsIHNjcmVlblkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUuaXNJblRyaWFuZ2xlKHNjcmVlblgsIHNjcmVlblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFtYmRhQ29yZHM6IFZlY3RvcjMgPSB0cmlhbmdsZS50b0xhbWJkYUNvb3JkaW5hdGVzKHNjcmVlblgsIHNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCB0cmlhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZGVwdGhCdWZmZXJbaSAvIDRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2kgLyA0XSA9IGRlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgdHJpYW5nbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0UGl4ZWxzRnJvbUJ1ZmZlcihzY3JlZW5CdWZmZXIuYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVNjcmVlblkoaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoaSAvIDQpIC8gdGhpcy50YXJnZXRTY3JlZW4ud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlU2NyZWVuWChpOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoaSAvIDQpICUgdGhpcy50YXJnZXRTY3JlZW4ud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hLnogKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYi56ICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmMuejtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogQ29sb3Ige1xyXG4gICAgICAgIGNvbnN0IHJlZEludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuciArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuciArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IucjtcclxuICAgICAgICBjb25zdCBncmVlbkludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuZyArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuZyArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuZztcclxuICAgICAgICBjb25zdCBibHVlSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5iICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5iICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5iO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkSW50ZXJwb2xhdGVkLCBncmVlbkludGVycG9sYXRlZCwgYmx1ZUludGVycG9sYXRlZCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4NHg0IHtcclxuXHJcbiAgICByZWFkb25seSBkYXRhOiBbRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5XTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBbbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KV07XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IE1hdHJpeDR4NCk6IE1hdHJpeDR4NFxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogYW55IHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSAxO1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVswXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5ID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzFdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHogPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMl1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0dyA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVszXVszXSAqIHc7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0eCAvIHR3LCB0eSAvIHR3LCB0eiAvIHR3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzBdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMV0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVsyXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzNdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzBdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMV0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVsyXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzNdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzBdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMV0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVsyXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzNdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzBdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVswXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMF0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzBdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVswXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMV0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzFdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVsxXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMV0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzFdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVsyXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMl0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzJdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVsyXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzNdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVszXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bM10gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzNdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVszXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vVmVjdG9yM1wiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlhbmdsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2I6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iQ29sb3I6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY0NvbG9yOiBDb2xvcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjcmVlbkE6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjcmVlbkI6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjcmVlbkM6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeEFCOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4QkM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhDQTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUFCOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5QkM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlDQTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWluWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYXhYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1pblk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWF4WTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNBVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNCVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNDVG9wTGVmdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzLCBjOiBWZWN0b3IzLCBhQ29sb3I6IENvbG9yLCBiQ29sb3I6IENvbG9yLCBjQ29sb3I6IENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5fYSA9IGE7XHJcbiAgICAgICAgdGhpcy5fYiA9IGI7XHJcbiAgICAgICAgdGhpcy5fYyA9IGM7XHJcbiAgICAgICAgdGhpcy5fYUNvbG9yID0gYUNvbG9yO1xyXG4gICAgICAgIHRoaXMuX2JDb2xvciA9IGJDb2xvcjtcclxuICAgICAgICB0aGlzLl9jQ29sb3IgPSBjQ29sb3I7XHJcblxyXG4gICAgICAgIGNvbnN0IHgxID0gKHRoaXMuYS54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB4MiA9ICh0aGlzLmIueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeDMgPSAodGhpcy5jLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41O1xyXG4gICAgICAgIGNvbnN0IHkxID0gTWF0aC5hYnMoKHRoaXMuYS55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IHkyID0gTWF0aC5hYnMoKHRoaXMuYi55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IHkzID0gTWF0aC5hYnMoKHRoaXMuYy55ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnNjcmVlbkEgPSBuZXcgVmVjdG9yMyh4MSwgeTEpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQiA9IG5ldyBWZWN0b3IzKHgyLCB5Mik7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5DID0gbmV3IFZlY3RvcjMoeDMsIHkzKTtcclxuXHJcbiAgICAgICAgdGhpcy5taW5YID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLngsIHRoaXMuc2NyZWVuQi54LCB0aGlzLnNjcmVlbkMueCk7XHJcbiAgICAgICAgdGhpcy5tYXhYID0gTWF0aC5tYXgodGhpcy5zY3JlZW5BLngsIHRoaXMuc2NyZWVuQi54LCB0aGlzLnNjcmVlbkMueCk7XHJcbiAgICAgICAgdGhpcy5taW5ZID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcbiAgICAgICAgdGhpcy5tYXhZID0gTWF0aC5tYXgodGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHhBQiA9IHRoaXMuc2NyZWVuQS54IC0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgdGhpcy5keEJDID0gdGhpcy5zY3JlZW5CLnggLSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICB0aGlzLmR4Q0EgPSB0aGlzLnNjcmVlbkMueCAtIHRoaXMuc2NyZWVuQS54O1xyXG5cclxuICAgICAgICB0aGlzLmR5QUIgPSB0aGlzLnNjcmVlbkEueSAtIHRoaXMuc2NyZWVuQi55O1xyXG4gICAgICAgIHRoaXMuZHlCQyA9IHRoaXMuc2NyZWVuQi55IC0gdGhpcy5zY3JlZW5DLnk7XHJcbiAgICAgICAgdGhpcy5keUNBID0gdGhpcy5zY3JlZW5DLnkgLSB0aGlzLnNjcmVlbkEueTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0FUb3BMZWZ0ID0gdGhpcy5keUFCIDwgMCB8fCAodGhpcy5keUFCID09PSAwICYmIHRoaXMuZHhBQiA+IDApO1xyXG4gICAgICAgIHRoaXMuaXNCVG9wTGVmdCA9IHRoaXMuZHlCQyA8IDAgfHwgKHRoaXMuZHlCQyA9PT0gMCAmJiB0aGlzLmR4QkMgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQ1RvcExlZnQgPSB0aGlzLmR5Q0EgPCAwIHx8ICh0aGlzLmR5Q0EgPT09IDAgJiYgdGhpcy5keENBID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9MYW1iZGFDb29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYUEgPSAodGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlCQyAqIC10aGlzLmR4Q0EgKyAtdGhpcy5keEJDICogLXRoaXMuZHlDQSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUIgPSAodGhpcy5keUNBICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlDQSAqIHRoaXMuZHhCQyArIC10aGlzLmR4Q0EgKiB0aGlzLmR5QkMpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFDID0gMSAtIGxhbWJkYUEgLSBsYW1iZGFCO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyhsYW1iZGFBLCBsYW1iZGFCLCBsYW1iZGFDKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0luVHJpYW5nbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBpc0FCT2sgPSAodGhpcy5pc0FUb3BMZWZ0ICYmIHRoaXMuaXNCVG9wTGVmdCkgP1xyXG4gICAgICAgICAgICB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID4gMDtcclxuXHJcbiAgICAgICAgY29uc3QgaXNCQ09rID0gKHRoaXMuaXNCVG9wTGVmdCAmJiB0aGlzLmlzQ1RvcExlZnQpID9cclxuICAgICAgICAgICAgdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkIueSkgLSB0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQi54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkIueSkgLSB0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQi54KSA+IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQ0FPayA9ICh0aGlzLmlzQ1RvcExlZnQgJiYgdGhpcy5pc0FUb3BMZWZ0KSA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhDQSAqICh5IC0gdGhpcy5zY3JlZW5DLnkpIC0gdGhpcy5keUNBICogKHggLSB0aGlzLnNjcmVlbkMueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhDQSAqICh5IC0gdGhpcy5zY3JlZW5DLnkpIC0gdGhpcy5keUNBICogKHggLSB0aGlzLnNjcmVlbkMueCkgPiAwO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNBQk9rICYmIGlzQkNPayAmJiBpc0NBT2s7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbkJvdW5kaW5nQm94KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHggPD0gdGhpcy5tYXhYICYmIHggPj0gdGhpcy5taW5YICYmXHJcbiAgICAgICAgICAgIHkgPD0gdGhpcy5tYXhZICYmIHkgPj0gdGhpcy5taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY0NvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY0NvbG9yO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZlY3RvcjMge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3o6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwKSB7XHJcbiAgICAgICAgdGhpcy5feCA9IHg7XHJcbiAgICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgICAgdGhpcy5feiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJldHdlZW5Qb2ludHMocDE6IFZlY3RvcjMsIHAyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxLl94IC0gcDIuX3g7XHJcbiAgICAgICAgY29uc3QgeSA9IHAxLl95IC0gcDIuX3k7XHJcbiAgICAgICAgY29uc3QgeiA9IHAxLl96IC0gcDIuX3o7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3JtYWxpemVkKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLmdldE1hZ25pdHVkZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qob3RoZXI6IFZlY3RvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94ICogb3RoZXIuX3ggKyB0aGlzLl95ICogb3RoZXIuX3kgKyB0aGlzLl96ICogb3RoZXIuX3o7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Mob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoKHRoaXMuX3kgKiBvdGhlci5feikgLSAodGhpcy5feiAqIG90aGVyLl95KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ogKiBvdGhlci5feCkgLSAodGhpcy5feCAqIG90aGVyLl96KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ggKiBvdGhlci5feSkgLSAodGhpcy5feSAqIG90aGVyLl94KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKyBvdGhlci5feCwgdGhpcy5feSArIG90aGVyLl95LCB0aGlzLl96ICsgb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgc3Vic3RyYWN0KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLSBvdGhlci5feCwgdGhpcy5feSAtIG90aGVyLl95LCB0aGlzLl96IC0gb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlci5feCwgdGhpcy5feSAqIG90aGVyLl95LCB0aGlzLl96ICogb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlciwgdGhpcy5feSAqIG90aGVyLCB0aGlzLl96ICogb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpdmlkZShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIuX3gsIHRoaXMuX3kgLyBvdGhlci5feSwgdGhpcy5feiAvIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIsIHRoaXMuX3kgLyBvdGhlciwgdGhpcy5feiAvIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHooKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fejtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWF0cml4NHg0fSBmcm9tIFwiLi9NYXRyaXg0eDRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVydGV4UHJvY2Vzc29yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld1RvUHJvamVjdGlvbjogTWF0cml4NHg0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB3b3JsZFRvVmlldzogTWF0cml4NHg0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgcHJpdmF0ZSBWUDogTWF0cml4NHg0O1xyXG5cclxuICAgIHNldExvb2tBdChwb3NpdGlvbjogVmVjdG9yMywgdGFyZ2V0OiBWZWN0b3IzLCB1cERpcmVjdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNhbWVyYURpcmVjdGlvbiA9IHRhcmdldC5zdWJzdHJhY3QocG9zaXRpb24pLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICB1cERpcmVjdGlvbiA9IHVwRGlyZWN0aW9uLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzID0gY2FtZXJhRGlyZWN0aW9uLmNyb3NzKHVwRGlyZWN0aW9uKTtcclxuICAgICAgICBjb25zdCB1ID0gcy5jcm9zcyhjYW1lcmFEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBjb2x1bW5cclxuICAgICAgICAvLyB0aGlzLndvcmxkVG9WaWV3LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtzLngsIHUueCwgLWNhbWVyYURpcmVjdGlvbi54LCAwXSk7XHJcbiAgICAgICAgLy8gdGhpcy53b3JsZFRvVmlldy5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbcy55LCB1LnksIC1jYW1lcmFEaXJlY3Rpb24ueSwgMF0pO1xyXG4gICAgICAgIC8vIHRoaXMud29ybGRUb1ZpZXcuZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3MueiwgdS56LCAtY2FtZXJhRGlyZWN0aW9uLnosIDBdKTtcclxuICAgICAgICAvLyB0aGlzLndvcmxkVG9WaWV3LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFstcG9zaXRpb24ueCwgLXBvc2l0aW9uLnksIC1wb3NpdGlvbi56LCAxXSk7XHJcblxyXG4gICAgICAgIC8vIHJvd1xyXG4gICAgICAgIHRoaXMud29ybGRUb1ZpZXcuZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3MueCwgcy55LCBzLnosIC1wb3NpdGlvbi54XSk7XHJcbiAgICAgICAgdGhpcy53b3JsZFRvVmlldy5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbdS54LCB1LnksIHUueiwgLXBvc2l0aW9uLnldKTtcclxuICAgICAgICB0aGlzLndvcmxkVG9WaWV3LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFstY2FtZXJhRGlyZWN0aW9uLngsIC1jYW1lcmFEaXJlY3Rpb24ueSwgLWNhbWVyYURpcmVjdGlvbi56LCAtcG9zaXRpb24uel0pO1xyXG4gICAgICAgIHRoaXMud29ybGRUb1ZpZXcuZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJzcGVjdGl2ZShmb3ZZOiBudW1iZXIsIGFzcGVjdDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm92WSAqPSBNYXRoLlBJIC8gMzYwO1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLmNvcyhmb3ZZKSAvIE1hdGguc2luKGZvdlkpO1xyXG4gICAgICAgIC8vIGNvbHVtblxyXG4gICAgICAgIC8vIHRoaXMudmlld1RvUHJvamVjdGlvbi5kYXRhWzBdID0gbmV3IEZsb2F0MzJBcnJheShbZi9hc3BlY3QsIDAsIDAsIDBdKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdUb1Byb2plY3Rpb24uZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIGYsIDAsIDBdKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdUb1Byb2plY3Rpb24uZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIChmYXIgKyBuZWFyKSAvIChuZWFyIC0gZmFyKSwgLTFdKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdUb1Byb2plY3Rpb24uZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsICgyICogZmFyICogbmVhcikgLyAobmVhciAtIGZhciksIDBdKTtcclxuXHJcbiAgICAgICAgLy8gcm93XHJcbiAgICAgICAgdGhpcy52aWV3VG9Qcm9qZWN0aW9uLmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtmL2FzcGVjdCwgMCwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMudmlld1RvUHJvamVjdGlvbi5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgZiwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMudmlld1RvUHJvamVjdGlvbi5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgKGZhciArIG5lYXIpIC8gKG5lYXIgLSBmYXIpLCAoMiAqIGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpXSk7XHJcbiAgICAgICAgdGhpcy52aWV3VG9Qcm9qZWN0aW9uLmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAtMSwgMF0pO1xyXG4gICAgICAgIHRoaXMuVlAgPSB0aGlzLnZpZXdUb1Byb2plY3Rpb24ubXVsdGlwbHkodGhpcy53b3JsZFRvVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHZlcnRleDogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlZQLm11bHRpcGx5KHZlcnRleCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7UmFzdGVyaXplcn0gZnJvbSBcIi4vUmFzdGVyaXplclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL2dlb21ldHJ5L1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vZ2VvbWV0cnkvVHJpYW5nbGVcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0tleWJvYXJkSW5wdXR9IGZyb20gXCIuL0lucHV0L0tleWJvYXJkSW5wdXRcIjtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JlZW5DYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdCB0YXJnZXRTY3JlZW4gPSBuZXcgU2NyZWVuSGFuZGxlcihjYW52YXMpO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgS2V5Ym9hcmRJbnB1dC5yZWdpc3RlcktleUJpbmRpbmdzKCk7XHJcblxyXG4gICAgY29uc3QgcmVkOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDAsIDApO1xyXG4gICAgY29uc3QgZ3JlZW46IENvbG9yID0gbmV3IENvbG9yKDAsIDI1NSwgMCk7XHJcbiAgICBjb25zdCBibHVlOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAyNTUpO1xyXG5cclxuICAgIGNvbnN0IGExOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC43NSwgMCwgMC41KTtcclxuICAgIGNvbnN0IGIxOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC43NSwgMC41LCAwLjUpO1xyXG4gICAgY29uc3QgYzE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC41LCAwLjYsIDAuNSk7XHJcbiAgICBjb25zdCB0cmlhbmdsZTE6IFRyaWFuZ2xlID0gbmV3IFRyaWFuZ2xlKGExLCBiMSwgYzEsIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZXI6IFJhc3Rlcml6ZXIgPSBuZXcgUmFzdGVyaXplcih0YXJnZXRTY3JlZW4sIFt0cmlhbmdsZTFdKTtcclxuICAgIHJhc3Rlcml6ZXIudXBkYXRlKCk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRpYWxpemUpO1xyXG5cclxuIiwiZXhwb3J0IGNsYXNzIENvbG9yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3I6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2c6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2I6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2E6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhID0gMjU1KSB7XHJcbiAgICAgICAgdGhpcy5fciA9IHI7XHJcbiAgICAgICAgdGhpcy5fZyA9IGc7XHJcbiAgICAgICAgdGhpcy5fYiA9IGI7XHJcbiAgICAgICAgdGhpcy5fYSA9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29sb3J9IGZyb20gXCIuL0NvbG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVuQnVmZmVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjcmVlbldpZHRoOiBudW1iZXIsIHNjcmVlbkhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHNjcmVlbldpZHRoICogc2NyZWVuSGVpZ2h0ICogNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sb3IoaW5kZXg6IG51bWJlciwgY29sb3I6IENvbG9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4XSA9IGNvbG9yLnI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMV0gPSBjb2xvci5nO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDJdID0gY29sb3IuYjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAzXSA9IGNvbG9yLmE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJ1ZmZlcigpOiBVaW50OENsYW1wZWRBcnJheSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTY3JlZW5IYW5kbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYW52YXNDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3dpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9oZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQaXhlbHNGcm9tQnVmZmVyKGNvbG9yQnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShjb2xvckJ1ZmZlciwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RnBzRGlzcGxheShmcHM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiMwOGEzMDBcIjtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFRleHQoXCJGUFM6IFwiICsgZnBzLCAxMCwgMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29sb3J9IGZyb20gXCIuL0NvbG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xyXG4gICAgc3RhdGljIHNjcmVlbldpZHRoOiBudW1iZXI7XHJcbiAgICBzdGF0aWMgc2NyZWVuSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBzdGF0aWMgY2xlYXJDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgNTApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==