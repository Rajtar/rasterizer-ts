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
const ScreenBuffer_1 = __webpack_require__(/*! ./screen/ScreenBuffer */ "./src/scripts/screen/ScreenBuffer.ts");
const Color_1 = __webpack_require__(/*! ./screen/Color */ "./src/scripts/screen/Color.ts");
const Settings_1 = __webpack_require__(/*! ./screen/Settings */ "./src/scripts/screen/Settings.ts");
const Stopwatch_1 = __webpack_require__(/*! ./Stopwatch */ "./src/scripts/Stopwatch.ts");
class Rasterizer {
    constructor(targetScreen, triangle) {
        this.targetScreen = targetScreen;
        this.triangles = triangle;
    }
    launchRenderLoop() {
        Stopwatch_1.Stopwatch.start();
        this.render();
        Stopwatch_1.Stopwatch.stopAndLog("Rendering");
        Stopwatch_1.Stopwatch.start();
        this.targetScreen.setFpsDisplay(this.calculateFps());
        Stopwatch_1.Stopwatch.stopAndLog("Calculating FPS");
        // window.requestAnimationFrame(this.launchRenderLoop.bind(this));
    }
    calculateFps() {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
        }
        const delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        return Math.round(1 / delta);
    }
    render() {
        const screenBuffer = new ScreenBuffer_1.ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        const depthBuffer = new Array(this.targetScreen.width * this.targetScreen.height).fill(Number.MAX_SAFE_INTEGER);
        for (let i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, Settings_1.Settings.clearColor);
            Stopwatch_1.Stopwatch.start();
            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);
            Stopwatch_1.Stopwatch.stopAndLog("Calculating screen coordinates");
            for (const triangle of this.triangles) {
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
        Stopwatch_1.Stopwatch.start();
        const depth = lambdaCords.x * triangle.a.z + lambdaCords.y * triangle.b.z + lambdaCords.z * triangle.c.z;
        Stopwatch_1.Stopwatch.stopAndLog("Calculating depth");
        return depth;
    }
    static calculateInterpolatedColor(lambdaCords, triangle) {
        Stopwatch_1.Stopwatch.start();
        const redInterpolated = lambdaCords.x * triangle.aColor.r + lambdaCords.y * triangle.bColor.r + lambdaCords.z * triangle.cColor.r;
        const greenInterpolated = lambdaCords.x * triangle.aColor.g + lambdaCords.y * triangle.bColor.g + lambdaCords.z * triangle.cColor.g;
        const blueInterpolated = lambdaCords.x * triangle.aColor.b + lambdaCords.y * triangle.bColor.b + lambdaCords.z * triangle.cColor.b;
        const color = new Color_1.Color(redInterpolated, greenInterpolated, blueInterpolated);
        Stopwatch_1.Stopwatch.stopAndLog("Interpolating color");
        return color;
    }
}
exports.Rasterizer = Rasterizer;


/***/ }),

/***/ "./src/scripts/Stopwatch.ts":
/*!**********************************!*\
  !*** ./src/scripts/Stopwatch.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Stopwatch {
    static start() {
        Stopwatch.startTime = performance.now();
    }
    static stopAndLog(taskName) {
        console.log(taskName + " took: " + String(performance.now() - Stopwatch.startTime));
    }
}
exports.Stopwatch = Stopwatch;


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
        return new Vector3(this._x + other._x, this._y + other._y, this._z + other._y);
    }
    substract(other) {
        return new Vector3(this._x - other._x, this._y - other._y, this._z - other._y);
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
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    const red = new Color_1.Color(255, 0, 0);
    const green = new Color_1.Color(0, 255, 0);
    const blue = new Color_1.Color(0, 0, 255);
    const a1 = new Vector3_1.Vector3(0.75, 0, 0.5);
    const b1 = new Vector3_1.Vector3(0.75, 0.5, 0.5);
    const c1 = new Vector3_1.Vector3(-0.5, 0.6, 0.5);
    const triangle1 = new Triangle_1.Triangle(a1, b1, c1, red, green, blue);
    const a2 = new Vector3_1.Vector3(0.5, 0, 0.85);
    const b2 = new Vector3_1.Vector3(0.5, 0.5, 0.3);
    const c2 = new Vector3_1.Vector3(-0.25, 0, 0.85);
    const triangle2 = new Triangle_1.Triangle(a2, b2, c2, blue, green, red);
    const a3 = new Vector3_1.Vector3(-0.25, 0, 0.85);
    const b3 = new Vector3_1.Vector3(0.5, -0.5, 0.3);
    const c3 = new Vector3_1.Vector3(0.5, 0, 0.85);
    const triangle3 = new Triangle_1.Triangle(a3, b3, c3, blue, green, red);
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [triangle1, triangle2, triangle3]);
    rasterizer.launchRenderLoop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9TdG9wd2F0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJpYW5nbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL1NjcmVlbkJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2NyZWVuSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLGdIQUFtRDtBQUNuRCwyRkFBcUM7QUFFckMsb0dBQTJDO0FBQzNDLHlGQUFzQztBQUV0QyxNQUFhLFVBQVU7SUFPbkIsWUFBWSxZQUEyQixFQUFFLFFBQW9CO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFFTSxnQkFBZ0I7UUFDbkIscUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxxQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELHFCQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsa0VBQWtFO0lBQ3RFLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxLQUFLLEdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxNQUFNO1FBQ1YsTUFBTSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekYsTUFBTSxXQUFXLEdBQWEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFMUgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xELFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUMscUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLHFCQUFTLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFFdkQsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztvQkFDMUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ3pDLE1BQU0sV0FBVyxHQUFZLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzVFLE1BQU0sS0FBSyxHQUFXLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUM1QixXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDM0IsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUMxRjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsQ0FBUztRQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsQ0FBUztRQUM5QixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzdDLENBQUM7SUFFTyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQW9CLEVBQUUsUUFBa0I7UUFDbEUscUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RyxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxNQUFNLENBQUMsMEJBQTBCLENBQUMsV0FBb0IsRUFBRSxRQUFrQjtRQUM5RSxxQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xJLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEksTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuSSxNQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FFSjtBQW5GRCxnQ0FtRkM7Ozs7Ozs7Ozs7Ozs7OztBQzNGRCxNQUFhLFNBQVM7SUFJbEIsTUFBTSxDQUFDLEtBQUs7UUFDUixTQUFTLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFnQjtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0NBQ0o7QUFYRCw4QkFXQzs7Ozs7Ozs7Ozs7Ozs7O0FDWEQsNEZBQWtDO0FBRWxDLHFHQUE0QztBQUU1QyxNQUFhLFFBQVE7SUE4QmpCLFlBQVksQ0FBVSxFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsTUFBYSxFQUFFLE1BQWEsRUFBRSxNQUFhO1FBQ3ZGLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxtQkFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLG1CQUFRLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNwQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFlBQVksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUM3QixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxD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QUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxhQUFhLENBQUMsR0FBVztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQTdCRCxzQ0E2QkM7Ozs7Ozs7Ozs7Ozs7OztBQzdCRCxvRkFBOEI7QUFFOUIsTUFBYSxRQUFROztBQUFyQiw0QkFJQztBQURVLG1CQUFVLEdBQVUsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0cy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vc2NyZWVuL1NjcmVlbkhhbmRsZXJcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vZ2VvbWV0cnkvVHJpYW5nbGVcIjtcclxuaW1wb3J0IHtTY3JlZW5CdWZmZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5CdWZmZXJcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vZ2VvbWV0cnkvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtTdG9wd2F0Y2h9IGZyb20gXCIuL1N0b3B3YXRjaFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XHJcbiAgICBwcml2YXRlIGxhc3RDYWxsZWRUaW1lOiBET01IaWdoUmVzVGltZVN0YW1wO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXIsIHRyaWFuZ2xlOiBUcmlhbmdsZVtdKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4gPSB0YXJnZXRTY3JlZW47XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGF1bmNoUmVuZGVyTG9vcCgpOiB2b2lkIHtcclxuICAgICAgICBTdG9wd2F0Y2guc3RhcnQoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIFN0b3B3YXRjaC5zdG9wQW5kTG9nKFwiUmVuZGVyaW5nXCIpO1xyXG4gICAgICAgIFN0b3B3YXRjaC5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldEZwc0Rpc3BsYXkodGhpcy5jYWxjdWxhdGVGcHMoKSk7XHJcbiAgICAgICAgU3RvcHdhdGNoLnN0b3BBbmRMb2coXCJDYWxjdWxhdGluZyBGUFNcIik7XHJcbiAgICAgICAgLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaFJlbmRlckxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMubGFzdENhbGxlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWx0YTogbnVtYmVyID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgxIC8gZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbkJ1ZmZlciA9IG5ldyBTY3JlZW5CdWZmZXIodGhpcy50YXJnZXRTY3JlZW4ud2lkdGgsIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgZGVwdGhCdWZmZXI6IG51bWJlcltdID0gbmV3IEFycmF5KHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICogdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KS5maWxsKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JlZW5CdWZmZXIuZ2V0TGVuZ3RoKCk7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgU2V0dGluZ3MuY2xlYXJDb2xvcik7XHJcblxyXG4gICAgICAgICAgICBTdG9wd2F0Y2guc3RhcnQoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2NyZWVuWCA9IHRoaXMuY2FsY3VsYXRlU2NyZWVuWChpKTtcclxuICAgICAgICAgICAgY29uc3Qgc2NyZWVuWSA9IHRoaXMuY2FsY3VsYXRlU2NyZWVuWShpKTtcclxuICAgICAgICAgICAgU3RvcHdhdGNoLnN0b3BBbmRMb2coXCJDYWxjdWxhdGluZyBzY3JlZW4gY29vcmRpbmF0ZXNcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpYW5nbGUuaXNJbkJvdW5kaW5nQm94KHNjcmVlblgsIHNjcmVlblkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpYW5nbGUuaXNJblRyaWFuZ2xlKHNjcmVlblgsIHNjcmVlblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFtYmRhQ29yZHM6IFZlY3RvcjMgPSB0cmlhbmdsZS50b0xhbWJkYUNvb3JkaW5hdGVzKHNjcmVlblgsIHNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCB0cmlhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZGVwdGhCdWZmZXJbaSAvIDRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2kgLyA0XSA9IGRlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgdHJpYW5nbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0UGl4ZWxzRnJvbUJ1ZmZlcihzY3JlZW5CdWZmZXIuYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVNjcmVlblkoaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoaSAvIDQpIC8gdGhpcy50YXJnZXRTY3JlZW4ud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlU2NyZWVuWChpOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoaSAvIDQpICUgdGhpcy50YXJnZXRTY3JlZW4ud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgU3RvcHdhdGNoLnN0YXJ0KCk7XHJcbiAgICAgICAgY29uc3QgZGVwdGggPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYS56ICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmIueiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jLno7XHJcbiAgICAgICAgU3RvcHdhdGNoLnN0b3BBbmRMb2coXCJDYWxjdWxhdGluZyBkZXB0aFwiKTtcclxuICAgICAgICByZXR1cm4gZGVwdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlSW50ZXJwb2xhdGVkQ29sb3IobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IENvbG9yIHtcclxuICAgICAgICBTdG9wd2F0Y2guc3RhcnQoKTtcclxuICAgICAgICBjb25zdCByZWRJbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLnIgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLnIgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLnI7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5JbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLmcgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLmcgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLmc7XHJcbiAgICAgICAgY29uc3QgYmx1ZUludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuYiArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuYiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuYjtcclxuICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyZWRJbnRlcnBvbGF0ZWQsIGdyZWVuSW50ZXJwb2xhdGVkLCBibHVlSW50ZXJwb2xhdGVkKTtcclxuICAgICAgICBTdG9wd2F0Y2guc3RvcEFuZExvZyhcIkludGVycG9sYXRpbmcgY29sb3JcIik7XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBTdG9wd2F0Y2gge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHN0YXJ0VGltZTogbnVtYmVyO1xyXG5cclxuICAgIHN0YXRpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBTdG9wd2F0Y2guc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHN0b3BBbmRMb2codGFza05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tOYW1lICsgXCIgdG9vazogXCIgKyBTdHJpbmcocGVyZm9ybWFuY2Uubm93KCkgLSBTdG9wd2F0Y2guc3RhcnRUaW1lKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi4vc2NyZWVuL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJpYW5nbGUge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2E6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hQ29sb3I6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYkNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NDb2xvcjogQ29sb3I7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5BOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5COiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5DOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeEJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4Q0E6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5Q0E6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1pblg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWF4WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtaW5ZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1heFk6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQVRvcExlZnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQlRvcExlZnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQ1RvcExlZnQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgYjogVmVjdG9yMywgYzogVmVjdG9yMywgYUNvbG9yOiBDb2xvciwgYkNvbG9yOiBDb2xvciwgY0NvbG9yOiBDb2xvcikge1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2MgPSBjO1xyXG4gICAgICAgIHRoaXMuX2FDb2xvciA9IGFDb2xvcjtcclxuICAgICAgICB0aGlzLl9iQ29sb3IgPSBiQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fY0NvbG9yID0gY0NvbG9yO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9ICh0aGlzLmEueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeDIgPSAodGhpcy5iLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41O1xyXG4gICAgICAgIGNvbnN0IHgzID0gKHRoaXMuYy54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB5MSA9IE1hdGguYWJzKCh0aGlzLmEueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MiA9IE1hdGguYWJzKCh0aGlzLmIueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MyA9IE1hdGguYWJzKCh0aGlzLmMueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5BID0gbmV3IFZlY3RvcjMoeDEsIHkxKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkIgPSBuZXcgVmVjdG9yMyh4MiwgeTIpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQyA9IG5ldyBWZWN0b3IzKHgzLCB5Myk7XHJcblxyXG4gICAgICAgIHRoaXMubWluWCA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG5cclxuICAgICAgICB0aGlzLmR4QUIgPSB0aGlzLnNjcmVlbkEueCAtIHRoaXMuc2NyZWVuQi54O1xyXG4gICAgICAgIHRoaXMuZHhCQyA9IHRoaXMuc2NyZWVuQi54IC0gdGhpcy5zY3JlZW5DLng7XHJcbiAgICAgICAgdGhpcy5keENBID0gdGhpcy5zY3JlZW5DLnggLSB0aGlzLnNjcmVlbkEueDtcclxuXHJcbiAgICAgICAgdGhpcy5keUFCID0gdGhpcy5zY3JlZW5BLnkgLSB0aGlzLnNjcmVlbkIueTtcclxuICAgICAgICB0aGlzLmR5QkMgPSB0aGlzLnNjcmVlbkIueSAtIHRoaXMuc2NyZWVuQy55O1xyXG4gICAgICAgIHRoaXMuZHlDQSA9IHRoaXMuc2NyZWVuQy55IC0gdGhpcy5zY3JlZW5BLnk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNBVG9wTGVmdCA9IHRoaXMuZHlBQiA8IDAgfHwgKHRoaXMuZHlBQiA9PT0gMCAmJiB0aGlzLmR4QUIgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQlRvcExlZnQgPSB0aGlzLmR5QkMgPCAwIHx8ICh0aGlzLmR5QkMgPT09IDAgJiYgdGhpcy5keEJDID4gMCk7XHJcbiAgICAgICAgdGhpcy5pc0NUb3BMZWZ0ID0gdGhpcy5keUNBIDwgMCB8fCAodGhpcy5keUNBID09PSAwICYmIHRoaXMuZHhDQSA+IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvTGFtYmRhQ29vcmRpbmF0ZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCBsYW1iZGFBID0gKHRoaXMuZHlCQyAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5QkMgKiAtdGhpcy5keENBICsgLXRoaXMuZHhCQyAqIC10aGlzLmR5Q0EpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFCID0gKHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhDQSAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5Q0EgKiB0aGlzLmR4QkMgKyAtdGhpcy5keENBICogdGhpcy5keUJDKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQyA9IDEgLSBsYW1iZGFBIC0gbGFtYmRhQjtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMobGFtYmRhQSwgbGFtYmRhQiwgbGFtYmRhQyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJblRyaWFuZ2xlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNBQk9rID0gKHRoaXMuaXNBVG9wTGVmdCAmJiB0aGlzLmlzQlRvcExlZnQpID9cclxuICAgICAgICAgICAgdGhpcy5keEFCICogKHkgLSB0aGlzLnNjcmVlbkEueSkgLSB0aGlzLmR5QUIgKiAoeCAtIHRoaXMuc2NyZWVuQS54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keEFCICogKHkgLSB0aGlzLnNjcmVlbkEueSkgLSB0aGlzLmR5QUIgKiAoeCAtIHRoaXMuc2NyZWVuQS54KSA+IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQkNPayA9ICh0aGlzLmlzQlRvcExlZnQgJiYgdGhpcy5pc0NUb3BMZWZ0KSA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPiAwO1xyXG5cclxuICAgICAgICBjb25zdCBpc0NBT2sgPSAodGhpcy5pc0NUb3BMZWZ0ICYmIHRoaXMuaXNBVG9wTGVmdCkgP1xyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID4gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQUJPayAmJiBpc0JDT2sgJiYgaXNDQU9rO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW5Cb3VuZGluZ0JveCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB4IDw9IHRoaXMubWF4WCAmJiB4ID49IHRoaXMubWluWCAmJlxyXG4gICAgICAgICAgICB5IDw9IHRoaXMubWF4WSAmJiB5ID49IHRoaXMubWluWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYygpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYUNvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NDb2xvcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3IzIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF95OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF96OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgICAgIHRoaXMuX3kgPSB5O1xyXG4gICAgICAgIHRoaXMuX3ogPSB6O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBiZXR3ZWVuUG9pbnRzKHAxOiBWZWN0b3IzLCBwMjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IHggPSBwMS5feCAtIHAyLl94O1xyXG4gICAgICAgIGNvbnN0IHkgPSBwMS5feSAtIHAyLl95O1xyXG4gICAgICAgIGNvbnN0IHogPSBwMS5feiAtIHAyLl96O1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh4LCB5LCB6KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYWduaXR1ZGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX3ggKiB0aGlzLl94ICsgdGhpcy5feSAqIHRoaXMuX3kgKyB0aGlzLl96ICogdGhpcy5feik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9ybWFsaXplZCgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5nZXRNYWduaXR1ZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG90KG90aGVyOiBWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feCAqIG90aGVyLl94ICsgdGhpcy5feSAqIG90aGVyLl95ICsgdGhpcy5feiAqIG90aGVyLl96O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKCh0aGlzLl95ICogb3RoZXIuX3opIC0gKHRoaXMuX3ogKiBvdGhlci5feSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl96ICogb3RoZXIuX3gpIC0gKHRoaXMuX3ggKiBvdGhlci5feiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl94ICogb3RoZXIuX3kpIC0gKHRoaXMuX3kgKiBvdGhlci5feCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICsgb3RoZXIuX3gsIHRoaXMuX3kgKyBvdGhlci5feSwgdGhpcy5feiArIG90aGVyLl95KVxyXG4gICAgfVxyXG5cclxuICAgIHN1YnN0cmFjdChvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC0gb3RoZXIuX3gsIHRoaXMuX3kgLSBvdGhlci5feSwgdGhpcy5feiAtIG90aGVyLl95KVxyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IG51bWJlcik6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICogb3RoZXIuX3gsIHRoaXMuX3kgKiBvdGhlci5feSwgdGhpcy5feiAqIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94ICogb3RoZXIsIHRoaXMuX3kgKiBvdGhlciwgdGhpcy5feiAqIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXZpZGUob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IG51bWJlcik6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAvIG90aGVyLl94LCB0aGlzLl95IC8gb3RoZXIuX3ksIHRoaXMuX3ogLyBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAvIG90aGVyLCB0aGlzLl95IC8gb3RoZXIsIHRoaXMuX3ogLyBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl95O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB6KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7UmFzdGVyaXplcn0gZnJvbSBcIi4vUmFzdGVyaXplclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL2dlb21ldHJ5L1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vZ2VvbWV0cnkvVHJpYW5nbGVcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcmVlbkNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0IHRhcmdldFNjcmVlbiA9IG5ldyBTY3JlZW5IYW5kbGVyKGNhbnZhcyk7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5XaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIFNldHRpbmdzLnNjcmVlbkhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgcmVkOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDAsIDApO1xyXG4gICAgY29uc3QgZ3JlZW46IENvbG9yID0gbmV3IENvbG9yKDAsIDI1NSwgMCk7XHJcbiAgICBjb25zdCBibHVlOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAyNTUpO1xyXG5cclxuICAgIGNvbnN0IGExOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC43NSwgMCwgMC41KTtcclxuICAgIGNvbnN0IGIxOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC43NSwgMC41LCAwLjUpO1xyXG4gICAgY29uc3QgYzE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC41LCAwLjYsIDAuNSk7XHJcbiAgICBjb25zdCB0cmlhbmdsZTE6IFRyaWFuZ2xlID0gbmV3IFRyaWFuZ2xlKGExLCBiMSwgYzEsIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG5cclxuICAgIGNvbnN0IGEyOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC41LCAwLCAwLjg1KTtcclxuICAgIGNvbnN0IGIyOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC41LCAwLjUsIDAuMyk7XHJcbiAgICBjb25zdCBjMjogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKC0wLjI1LCAwLCAwLjg1KTtcclxuICAgIGNvbnN0IHRyaWFuZ2xlMjogVHJpYW5nbGUgPSBuZXcgVHJpYW5nbGUoYTIsIGIyLCBjMiwgYmx1ZSwgZ3JlZW4sIHJlZCk7XHJcblxyXG4gICAgY29uc3QgYTM6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC4yNSwgMCwgMC44NSk7XHJcbiAgICBjb25zdCBiMzogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNSwgLTAuNSwgMC4zKTtcclxuICAgIGNvbnN0IGMzOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMC41LCAwLCAwLjg1KTtcclxuICAgIGNvbnN0IHRyaWFuZ2xlMzogVHJpYW5nbGUgPSBuZXcgVHJpYW5nbGUoYTMsIGIzLCBjMywgYmx1ZSwgZ3JlZW4sIHJlZCk7XHJcblxyXG4gICAgY29uc3QgcmFzdGVyaXplcjogUmFzdGVyaXplciA9IG5ldyBSYXN0ZXJpemVyKHRhcmdldFNjcmVlbiwgW3RyaWFuZ2xlMSwgdHJpYW5nbGUyLCB0cmlhbmdsZTNdKTtcclxuICAgIHJhc3Rlcml6ZXIubGF1bmNoUmVuZGVyTG9vcCgpO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0aWFsaXplKTsiLCJleHBvcnQgY2xhc3MgQ29sb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGEgPSAyNTUpIHtcclxuICAgICAgICB0aGlzLl9yID0gcjtcclxuICAgICAgICB0aGlzLl9nID0gZztcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW5CdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogVWludDhDbGFtcGVkQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NyZWVuV2lkdGg6IG51bWJlciwgc2NyZWVuSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2NyZWVuV2lkdGggKiBzY3JlZW5IZWlnaHQgKiA0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihpbmRleDogbnVtYmVyLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXhdID0gY29sb3IucjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAxXSA9IGNvbG9yLmc7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMl0gPSBjb2xvci5iO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDNdID0gY29sb3IuYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYnVmZmVyKCk6IFVpbnQ4Q2xhbXBlZEFycmF5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNjcmVlbkhhbmRsZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhbnZhc0N0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2hlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBpeGVsc0Zyb21CdWZmZXIoY29sb3JCdWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGNvbG9yQnVmZmVyLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGcHNEaXNwbGF5KGZwczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzA4YTMwMFwiO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5maWxsVGV4dChcIkZQUzogXCIgKyBmcHMsIDEwLCAyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBzdGF0aWMgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHN0YXRpYyBzY3JlZW5IZWlnaHQ6IG51bWJlcjtcclxuICAgIHN0YXRpYyBjbGVhckNvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCA1MCk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9