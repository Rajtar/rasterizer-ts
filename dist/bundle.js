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
class Rasterizer {
    constructor(targetScreen, triangle) {
        this.targetScreen = targetScreen;
        this.triangles = triangle;
    }
    launchRenderLoop() {
        this.render();
        this.targetScreen.setFpsDisplay(this.calculateFps());
        window.requestAnimationFrame(this.launchRenderLoop.bind(this));
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
            const screenX = this.calculateScreenX(i);
            const screenY = this.calculateScreenY(i);
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
        return this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0 &&
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0 &&
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;
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
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [triangle1, triangle2]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9UcmlhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9WZWN0b3IzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2NyZWVuQnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TY3JlZW5IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVy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QUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEMsT0FBTyxJQUFJLGlCQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsWUFBWSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxP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LElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBN0JELHNDQTZCQzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JELG9GQUE4QjtBQUU5QixNQUFhLFFBQVE7O0FBQXJCLDRCQUlDO0FBRFUsbUJBQVUsR0FBVSxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtTY3JlZW5IYW5kbGVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge1NjcmVlbkJ1ZmZlcn0gZnJvbSBcIi4vc2NyZWVuL1NjcmVlbkJ1ZmZlclwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9zY3JlZW4vQ29sb3JcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9nZW9tZXRyeS9WZWN0b3IzXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XHJcbiAgICBwcml2YXRlIGxhc3RDYWxsZWRUaW1lOiBET01IaWdoUmVzVGltZVN0YW1wO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXIsIHRyaWFuZ2xlOiBUcmlhbmdsZVtdKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4gPSB0YXJnZXRTY3JlZW47XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGF1bmNoUmVuZGVyTG9vcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldEZwc0Rpc3BsYXkodGhpcy5jYWxjdWxhdGVGcHMoKSk7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxhdW5jaFJlbmRlckxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMubGFzdENhbGxlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWx0YTogbnVtYmVyID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgxIC8gZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbkJ1ZmZlciA9IG5ldyBTY3JlZW5CdWZmZXIodGhpcy50YXJnZXRTY3JlZW4ud2lkdGgsIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgZGVwdGhCdWZmZXI6IG51bWJlcltdID0gbmV3IEFycmF5KHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICogdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KS5maWxsKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JlZW5CdWZmZXIuZ2V0TGVuZ3RoKCk7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgU2V0dGluZ3MuY2xlYXJDb2xvcik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5YID0gdGhpcy5jYWxjdWxhdGVTY3JlZW5YKGkpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5ZID0gdGhpcy5jYWxjdWxhdGVTY3JlZW5ZKGkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWFuZ2xlLmlzSW5Cb3VuZGluZ0JveChzY3JlZW5YLCBzY3JlZW5ZKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmlzSW5UcmlhbmdsZShzY3JlZW5YLCBzY3JlZW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbWJkYUNvcmRzOiBWZWN0b3IzID0gdHJpYW5nbGUudG9MYW1iZGFDb29yZGluYXRlcyhzY3JlZW5YLCBzY3JlZW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aDogbnVtYmVyID0gUmFzdGVyaXplci5jYWxjdWxhdGVEZXB0aChsYW1iZGFDb3JkcywgdHJpYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IGRlcHRoQnVmZmVyW2kgLyA0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aEJ1ZmZlcltpIC8gNF0gPSBkZXB0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuQnVmZmVyLnNldENvbG9yKGksIFJhc3Rlcml6ZXIuY2FsY3VsYXRlSW50ZXJwb2xhdGVkQ29sb3IobGFtYmRhQ29yZHMsIHRyaWFuZ2xlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldFBpeGVsc0Zyb21CdWZmZXIoc2NyZWVuQnVmZmVyLmJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVTY3JlZW5ZKGk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGkgLyA0KSAvIHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVNjcmVlblgoaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKGkgLyA0KSAlIHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzOiBWZWN0b3IzLCB0cmlhbmdsZTogVHJpYW5nbGUpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYS56ICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmIueiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jLno7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlSW50ZXJwb2xhdGVkQ29sb3IobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IENvbG9yIHtcclxuICAgICAgICBjb25zdCByZWRJbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLnIgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLnIgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLnI7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5JbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLmcgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLmcgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLmc7XHJcbiAgICAgICAgY29uc3QgYmx1ZUludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuYiArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuYiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuYjtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHJlZEludGVycG9sYXRlZCwgZ3JlZW5JbnRlcnBvbGF0ZWQsIGJsdWVJbnRlcnBvbGF0ZWQpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vVmVjdG9yM1wiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vc2NyZWVuL0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlhbmdsZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2M6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYUNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jQ29sb3I6IENvbG9yO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeENBOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUNBOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtaW5YOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1heFg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWluWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYXhZOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgYjogVmVjdG9yMywgYzogVmVjdG9yMywgYUNvbG9yOiBDb2xvciwgYkNvbG9yOiBDb2xvciwgY0NvbG9yOiBDb2xvcikge1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2MgPSBjO1xyXG4gICAgICAgIHRoaXMuX2FDb2xvciA9IGFDb2xvcjtcclxuICAgICAgICB0aGlzLl9iQ29sb3IgPSBiQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fY0NvbG9yID0gY0NvbG9yO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9ICh0aGlzLmEueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeDIgPSAodGhpcy5iLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41O1xyXG4gICAgICAgIGNvbnN0IHgzID0gKHRoaXMuYy54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB5MSA9IE1hdGguYWJzKCh0aGlzLmEueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MiA9IE1hdGguYWJzKCh0aGlzLmIueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCB5MyA9IE1hdGguYWJzKCh0aGlzLmMueSArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41IC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5BID0gbmV3IFZlY3RvcjMoeDEsIHkxKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkIgPSBuZXcgVmVjdG9yMyh4MiwgeTIpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQyA9IG5ldyBWZWN0b3IzKHgzLCB5Myk7XHJcblxyXG4gICAgICAgIHRoaXMubWluWCA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG5cclxuICAgICAgICB0aGlzLmR4QUIgPSB0aGlzLnNjcmVlbkEueCAtIHRoaXMuc2NyZWVuQi54O1xyXG4gICAgICAgIHRoaXMuZHhCQyA9IHRoaXMuc2NyZWVuQi54IC0gdGhpcy5zY3JlZW5DLng7XHJcbiAgICAgICAgdGhpcy5keENBID0gdGhpcy5zY3JlZW5DLnggLSB0aGlzLnNjcmVlbkEueDtcclxuXHJcbiAgICAgICAgdGhpcy5keUFCID0gdGhpcy5zY3JlZW5BLnkgLSB0aGlzLnNjcmVlbkIueTtcclxuICAgICAgICB0aGlzLmR5QkMgPSB0aGlzLnNjcmVlbkIueSAtIHRoaXMuc2NyZWVuQy55O1xyXG4gICAgICAgIHRoaXMuZHlDQSA9IHRoaXMuc2NyZWVuQy55IC0gdGhpcy5zY3JlZW5BLnk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9MYW1iZGFDb29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYUEgPSAodGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlCQyAqIC10aGlzLmR4Q0EgKyAtdGhpcy5keEJDICogLXRoaXMuZHlDQSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUIgPSAodGhpcy5keUNBICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlDQSAqIHRoaXMuZHhCQyArIC10aGlzLmR4Q0EgKiB0aGlzLmR5QkMpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFDID0gMSAtIGxhbWJkYUEgLSBsYW1iZGFCO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyhsYW1iZGFBLCBsYW1iZGFCLCBsYW1iZGFDKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0luVHJpYW5nbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5keEFCICogKHkgLSB0aGlzLnNjcmVlbkEueSkgLSB0aGlzLmR5QUIgKiAoeCAtIHRoaXMuc2NyZWVuQS54KSA+IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkIueSkgLSB0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQi54KSA+IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkgLSB0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbkJvdW5kaW5nQm94KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHggPD0gdGhpcy5tYXhYICYmIHggPj0gdGhpcy5taW5YICYmXHJcbiAgICAgICAgICAgIHkgPD0gdGhpcy5tYXhZICYmIHkgPj0gdGhpcy5taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY0NvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY0NvbG9yO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZlY3RvcjMge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3o6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwKSB7XHJcbiAgICAgICAgdGhpcy5feCA9IHg7XHJcbiAgICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgICAgdGhpcy5feiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJldHdlZW5Qb2ludHMocDE6IFZlY3RvcjMsIHAyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxLl94IC0gcDIuX3g7XHJcbiAgICAgICAgY29uc3QgeSA9IHAxLl95IC0gcDIuX3k7XHJcbiAgICAgICAgY29uc3QgeiA9IHAxLl96IC0gcDIuX3o7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3JtYWxpemVkKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLmdldE1hZ25pdHVkZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qob3RoZXI6IFZlY3RvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94ICogb3RoZXIuX3ggKyB0aGlzLl95ICogb3RoZXIuX3kgKyB0aGlzLl96ICogb3RoZXIuX3o7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Mob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoKHRoaXMuX3kgKiBvdGhlci5feikgLSAodGhpcy5feiAqIG90aGVyLl95KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ogKiBvdGhlci5feCkgLSAodGhpcy5feCAqIG90aGVyLl96KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ggKiBvdGhlci5feSkgLSAodGhpcy5feSAqIG90aGVyLl94KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKyBvdGhlci5feCwgdGhpcy5feSArIG90aGVyLl95LCB0aGlzLl96ICsgb3RoZXIuX3kpXHJcbiAgICB9XHJcblxyXG4gICAgc3Vic3RyYWN0KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLSBvdGhlci5feCwgdGhpcy5feSAtIG90aGVyLl95LCB0aGlzLl96IC0gb3RoZXIuX3kpXHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlci5feCwgdGhpcy5feSAqIG90aGVyLl95LCB0aGlzLl96ICogb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlciwgdGhpcy5feSAqIG90aGVyLCB0aGlzLl96ICogb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpdmlkZShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIuX3gsIHRoaXMuX3kgLyBvdGhlci5feSwgdGhpcy5feiAvIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIsIHRoaXMuX3kgLyBvdGhlciwgdGhpcy5feiAvIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHooKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fejtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vc2NyZWVuL1NjcmVlbkhhbmRsZXJcIjtcclxuaW1wb3J0IHtSYXN0ZXJpemVyfSBmcm9tIFwiLi9SYXN0ZXJpemVyXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vZ2VvbWV0cnkvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9zY3JlZW4vQ29sb3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vc2NyZWVuL1NldHRpbmdzXCI7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NyZWVuQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3QgdGFyZ2V0U2NyZWVuID0gbmV3IFNjcmVlbkhhbmRsZXIoY2FudmFzKTtcclxuICAgIFNldHRpbmdzLnNjcmVlbldpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICBjb25zdCByZWQ6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMCwgMCk7XHJcbiAgICBjb25zdCBncmVlbjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMjU1LCAwKTtcclxuICAgIGNvbnN0IGJsdWU6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDI1NSk7XHJcblxyXG4gICAgY29uc3QgYTE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjc1LCAwLCAwLjUpO1xyXG4gICAgY29uc3QgYjE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjc1LCAwLjUsIDAuNSk7XHJcbiAgICBjb25zdCBjMTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKC0wLjUsIDAuNiwgMC41KTtcclxuICAgIGNvbnN0IHRyaWFuZ2xlMTogVHJpYW5nbGUgPSBuZXcgVHJpYW5nbGUoYTEsIGIxLCBjMSwgcmVkLCBncmVlbiwgYmx1ZSk7XHJcblxyXG4gICAgY29uc3QgYTI6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjUsIDAsIDAuODUpO1xyXG4gICAgY29uc3QgYjI6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjUsIDAuNSwgMC4zKTtcclxuICAgIGNvbnN0IGMyOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoLTAuMjUsIDAsIDAuODUpO1xyXG4gICAgY29uc3QgdHJpYW5nbGUyOiBUcmlhbmdsZSA9IG5ldyBUcmlhbmdsZShhMiwgYjIsIGMyLCBibHVlLCBncmVlbiwgcmVkKTtcclxuXHJcbiAgICBjb25zdCByYXN0ZXJpemVyOiBSYXN0ZXJpemVyID0gbmV3IFJhc3Rlcml6ZXIodGFyZ2V0U2NyZWVuLCBbdHJpYW5nbGUxLCB0cmlhbmdsZTJdKTtcclxuICAgIHJhc3Rlcml6ZXIubGF1bmNoUmVuZGVyTG9vcCgpO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0aWFsaXplKTsiLCJleHBvcnQgY2xhc3MgQ29sb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGEgPSAyNTUpIHtcclxuICAgICAgICB0aGlzLl9yID0gcjtcclxuICAgICAgICB0aGlzLl9nID0gZztcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW5CdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogVWludDhDbGFtcGVkQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NyZWVuV2lkdGg6IG51bWJlciwgc2NyZWVuSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2NyZWVuV2lkdGggKiBzY3JlZW5IZWlnaHQgKiA0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihpbmRleDogbnVtYmVyLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXhdID0gY29sb3IucjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAxXSA9IGNvbG9yLmc7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMl0gPSBjb2xvci5iO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDNdID0gY29sb3IuYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYnVmZmVyKCk6IFVpbnQ4Q2xhbXBlZEFycmF5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNjcmVlbkhhbmRsZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhbnZhc0N0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2hlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBpeGVsc0Zyb21CdWZmZXIoY29sb3JCdWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGNvbG9yQnVmZmVyLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGcHNEaXNwbGF5KGZwczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzA4YTMwMFwiO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5maWxsVGV4dChcIkZQUzogXCIgKyBmcHMsIDEwLCAyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBzdGF0aWMgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHN0YXRpYyBzY3JlZW5IZWlnaHQ6IG51bWJlcjtcclxuICAgIHN0YXRpYyBjbGVhckNvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCA1MCk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9