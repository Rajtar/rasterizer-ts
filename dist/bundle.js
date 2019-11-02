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
                if (triangle.isInTriangle(screenX, screenY)) {
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
        this._screenA = new Vector3_1.Vector3(x1, y1);
        this._screenB = new Vector3_1.Vector3(x2, y2);
        this._screenC = new Vector3_1.Vector3(x3, y3);
    }
    toLambdaCoordinates(x, y) {
        const x1 = this.screenA.x;
        const x2 = this.screenB.x;
        const x3 = this.screenC.x;
        const y1 = this.screenA.y;
        const y2 = this.screenB.y;
        const y3 = this.screenC.y;
        const lambdaA = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) /
            ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
        const lambdaB = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) /
            ((y3 - y1) * (x2 - x3) + (x1 - x3) * (y2 - y3));
        const lambdaC = 1 - lambdaA - lambdaB;
        return new Vector3_1.Vector3(lambdaA, lambdaB, lambdaC);
    }
    isInTriangle(x, y) {
        const x1 = this.screenA.x;
        const x2 = this.screenB.x;
        const x3 = this.screenC.x;
        const y1 = this.screenA.y;
        const y2 = this.screenB.y;
        const y3 = this.screenC.y;
        return (x1 - x2) * (y - y1) - (y1 - y2) * (x - x1) > 0 &&
            (x2 - x3) * (y - y2) - (y2 - y3) * (x - x2) > 0 &&
            (x3 - x1) * (y - y3) - (y3 - y1) * (x - x3) > 0;
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
    get screenA() {
        return this._screenA;
    }
    get screenB() {
        return this._screenB;
    }
    get screenC() {
        return this._screenC;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9UcmlhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9WZWN0b3IzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zY3JlZW4vU2NyZWVuQnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TY3JlZW5IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVy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QU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXRDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFlBQVksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUM3QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxD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LENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQWM7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQzNDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFDM0MsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFjO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWM7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBSUQs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QUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVc7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUE3QkQsc0NBNkJDOzs7Ozs7Ozs7Ozs7Ozs7QUM3QkQsb0ZBQThCO0FBRTlCLE1BQWEsUUFBUTs7QUFBckIsNEJBSUM7QUFEVSxtQkFBVSxHQUFVLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7U2NyZWVuQnVmZmVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuQnVmZmVyXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL2dlb21ldHJ5L1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vc2NyZWVuL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFzdGVyaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyaWFuZ2xlczogVHJpYW5nbGVbXTtcclxuICAgIHByaXZhdGUgbGFzdENhbGxlZFRpbWU6IERPTUhpZ2hSZXNUaW1lU3RhbXA7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldFNjcmVlbjogU2NyZWVuSGFuZGxlciwgdHJpYW5nbGU6IFRyaWFuZ2xlW10pIHtcclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbiA9IHRhcmdldFNjcmVlbjtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXVuY2hSZW5kZXJMb29wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0RnBzRGlzcGxheSh0aGlzLmNhbGN1bGF0ZUZwcygpKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubGF1bmNoUmVuZGVyTG9vcC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5sYXN0Q2FsbGVkVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDYWxsZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbHRhOiBudW1iZXIgPSAocGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RDYWxsZWRUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKDEgLyBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuQnVmZmVyID0gbmV3IFNjcmVlbkJ1ZmZlcih0aGlzLnRhcmdldFNjcmVlbi53aWR0aCwgdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBkZXB0aEJ1ZmZlcjogbnVtYmVyW10gPSBuZXcgQXJyYXkodGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKiB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpLmZpbGwoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmVlbkJ1ZmZlci5nZXRMZW5ndGgoKTsgaSArPSA0KSB7XHJcbiAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihpLCBTZXR0aW5ncy5jbGVhckNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlblggPSB0aGlzLmNhbGN1bGF0ZVNjcmVlblgoaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlblkgPSB0aGlzLmNhbGN1bGF0ZVNjcmVlblkoaSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpYW5nbGUuaXNJblRyaWFuZ2xlKHNjcmVlblgsIHNjcmVlblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFtYmRhQ29yZHM6IFZlY3RvcjMgPSB0cmlhbmdsZS50b0xhbWJkYUNvb3JkaW5hdGVzKHNjcmVlblgsIHNjcmVlblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCB0cmlhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZGVwdGhCdWZmZXJbaSAvIDRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2kgLyA0XSA9IGRlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoaSwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgdHJpYW5nbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0UGl4ZWxzRnJvbUJ1ZmZlcihzY3JlZW5CdWZmZXIuYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVNjcmVlblkoaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoaSAvIDQpIC8gdGhpcy50YXJnZXRTY3JlZW4ud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlU2NyZWVuWChpOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoaSAvIDQpICUgdGhpcy50YXJnZXRTY3JlZW4ud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hLnogKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYi56ICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmMuejtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogQ29sb3Ige1xyXG4gICAgICAgIGNvbnN0IHJlZEludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuciArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuciArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IucjtcclxuICAgICAgICBjb25zdCBncmVlbkludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuZyArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuZyArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuZztcclxuICAgICAgICBjb25zdCBibHVlSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5iICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5iICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5iO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkSW50ZXJwb2xhdGVkLCBncmVlbkludGVycG9sYXRlZCwgYmx1ZUludGVycG9sYXRlZCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9WZWN0b3IzXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi9zY3JlZW4vQ29sb3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4uL3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2E6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zY3JlZW5BOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2NyZWVuQjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NjcmVlbkM6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYUNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jQ29sb3I6IENvbG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMsIGM6IFZlY3RvcjMsIGFDb2xvcjogQ29sb3IsIGJDb2xvcjogQ29sb3IsIGNDb2xvcjogQ29sb3IpIHtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9jID0gYztcclxuICAgICAgICB0aGlzLl9hQ29sb3IgPSBhQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fYkNvbG9yID0gYkNvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NDb2xvciA9IGNDb2xvcjtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSAodGhpcy5hLnggKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41O1xyXG4gICAgICAgIGNvbnN0IHgyID0gKHRoaXMuYi54ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB4MyA9ICh0aGlzLmMueCArIDEpICogU2V0dGluZ3Muc2NyZWVuV2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeTEgPSBNYXRoLmFicygodGhpcy5hLnkgKyAxKSAqIFNldHRpbmdzLnNjcmVlbkhlaWdodCAqIDAuNSAtIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLmFicygodGhpcy5iLnkgKyAxKSAqIFNldHRpbmdzLnNjcmVlbkhlaWdodCAqIDAuNSAtIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgeTMgPSBNYXRoLmFicygodGhpcy5jLnkgKyAxKSAqIFNldHRpbmdzLnNjcmVlbkhlaWdodCAqIDAuNSAtIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NjcmVlbkEgPSBuZXcgVmVjdG9yMyh4MSwgeTEpO1xyXG4gICAgICAgIHRoaXMuX3NjcmVlbkIgPSBuZXcgVmVjdG9yMyh4MiwgeTIpO1xyXG4gICAgICAgIHRoaXMuX3NjcmVlbkMgPSBuZXcgVmVjdG9yMyh4MywgeTMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvTGFtYmRhQ29vcmRpbmF0ZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCB4MSA9IHRoaXMuc2NyZWVuQS54O1xyXG4gICAgICAgIGNvbnN0IHgyID0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgY29uc3QgeDMgPSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICBjb25zdCB5MSA9IHRoaXMuc2NyZWVuQS55O1xyXG4gICAgICAgIGNvbnN0IHkyID0gdGhpcy5zY3JlZW5CLnk7XHJcbiAgICAgICAgY29uc3QgeTMgPSB0aGlzLnNjcmVlbkMueTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQSA9ICgoeTIgLSB5MykgKiAoeCAtIHgzKSArICh4MyAtIHgyKSAqICh5IC0geTMpKSAvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgoeTIgLSB5MykgKiAoeDEgLSB4MykgKyAoeDMgLSB4MikgKiAoeTEgLSB5MykpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFCID0gKCh5MyAtIHkxKSAqICh4IC0geDMpICsgKHgxIC0geDMpICogKHkgLSB5MykpIC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh5MyAtIHkxKSAqICh4MiAtIHgzKSArICh4MSAtIHgzKSAqICh5MiAtIHkzKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUMgPSAxIC0gbGFtYmRhQSAtIGxhbWJkYUI7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyhsYW1iZGFBLCBsYW1iZGFCLCBsYW1iZGFDKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0luVHJpYW5nbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB4MSA9IHRoaXMuc2NyZWVuQS54O1xyXG4gICAgICAgIGNvbnN0IHgyID0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgY29uc3QgeDMgPSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICBjb25zdCB5MSA9IHRoaXMuc2NyZWVuQS55O1xyXG4gICAgICAgIGNvbnN0IHkyID0gdGhpcy5zY3JlZW5CLnk7XHJcbiAgICAgICAgY29uc3QgeTMgPSB0aGlzLnNjcmVlbkMueTtcclxuICAgICAgICByZXR1cm4gKHgxIC0geDIpICogKHkgLSB5MSkgLSAoeTEgLSB5MikgKiAoeCAtIHgxKSA+IDAgJiZcclxuICAgICAgICAgICAgKHgyIC0geDMpICogKHkgLSB5MikgLSAoeTIgLSB5MykgKiAoeCAtIHgyKSA+IDAgJiZcclxuICAgICAgICAgICAgKHgzIC0geDEpICogKHkgLSB5MykgLSAoeTMgLSB5MSkgKiAoeCAtIHgzKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGEoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGMoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcmVlbkEoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmVlbkE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcmVlbkIoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmVlbkI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjcmVlbkMoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmVlbkM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYkNvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYkNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jQ29sb3I7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yMyB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcclxuICAgICAgICB0aGlzLl94ID0geDtcclxuICAgICAgICB0aGlzLl95ID0geTtcclxuICAgICAgICB0aGlzLl96ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmV0d2VlblBvaW50cyhwMTogVmVjdG9yMywgcDI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCB4ID0gcDEuX3ggLSBwMi5feDtcclxuICAgICAgICBjb25zdCB5ID0gcDEuX3kgLSBwMi5feTtcclxuICAgICAgICBjb25zdCB6ID0gcDEuX3ogLSBwMi5fejtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCwgeSwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWFnbml0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3opO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vcm1hbGl6ZWQoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuZ2V0TWFnbml0dWRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdChvdGhlcjogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiBvdGhlci5feCArIHRoaXMuX3kgKiBvdGhlci5feSArIHRoaXMuX3ogKiBvdGhlci5fejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyhvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygodGhpcy5feSAqIG90aGVyLl96KSAtICh0aGlzLl96ICogb3RoZXIuX3kpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feiAqIG90aGVyLl94KSAtICh0aGlzLl94ICogb3RoZXIuX3opLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feCAqIG90aGVyLl95KSAtICh0aGlzLl95ICogb3RoZXIuX3gpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCArIG90aGVyLl94LCB0aGlzLl95ICsgb3RoZXIuX3ksIHRoaXMuX3ogKyBvdGhlci5feSlcclxuICAgIH1cclxuXHJcbiAgICBzdWJzdHJhY3Qob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAtIG90aGVyLl94LCB0aGlzLl95IC0gb3RoZXIuX3ksIHRoaXMuX3ogLSBvdGhlci5feSlcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLl94LCB0aGlzLl95ICogb3RoZXIuX3ksIHRoaXMuX3ogKiBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLCB0aGlzLl95ICogb3RoZXIsIHRoaXMuX3ogKiBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGl2aWRlKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlci5feCwgdGhpcy5feSAvIG90aGVyLl95LCB0aGlzLl96IC8gb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlciwgdGhpcy5feSAvIG90aGVyLCB0aGlzLl96IC8gb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY3JlZW5IYW5kbGVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1Jhc3Rlcml6ZXJ9IGZyb20gXCIuL1Jhc3Rlcml6ZXJcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9nZW9tZXRyeS9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuL3NjcmVlbi9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9zY3JlZW4vU2V0dGluZ3NcIjtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JlZW5DYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdCB0YXJnZXRTY3JlZW4gPSBuZXcgU2NyZWVuSGFuZGxlcihjYW52YXMpO1xyXG4gICAgU2V0dGluZ3Muc2NyZWVuV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IHJlZDogQ29sb3IgPSBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcclxuICAgIGNvbnN0IGdyZWVuOiBDb2xvciA9IG5ldyBDb2xvcigwLCAyNTUsIDApO1xyXG4gICAgY29uc3QgYmx1ZTogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMjU1KTtcclxuXHJcbiAgICBjb25zdCBhMTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNzUsIDAsIDAuNSk7XHJcbiAgICBjb25zdCBiMTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNzUsIDAuNSwgMC41KTtcclxuICAgIGNvbnN0IGMxOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoLTAuNSwgMC42LCAwLjUpO1xyXG4gICAgY29uc3QgdHJpYW5nbGUxOiBUcmlhbmdsZSA9IG5ldyBUcmlhbmdsZShhMSwgYjEsIGMxLCByZWQsIGdyZWVuLCBibHVlKTtcclxuXHJcbiAgICBjb25zdCBhMjogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNSwgMCwgMC44NSk7XHJcbiAgICBjb25zdCBiMjogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNSwgMC41LCAwLjMpO1xyXG4gICAgY29uc3QgYzI6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC4yNSwgMCwgMC44NSk7XHJcbiAgICBjb25zdCB0cmlhbmdsZTI6IFRyaWFuZ2xlID0gbmV3IFRyaWFuZ2xlKGEyLCBiMiwgYzIsIGJsdWUsIGdyZWVuLCByZWQpO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZXI6IFJhc3Rlcml6ZXIgPSBuZXcgUmFzdGVyaXplcih0YXJnZXRTY3JlZW4sIFt0cmlhbmdsZTEsIHRyaWFuZ2xlMl0pO1xyXG4gICAgcmFzdGVyaXplci5sYXVuY2hSZW5kZXJMb29wKCk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRpYWxpemUpOyIsImV4cG9ydCBjbGFzcyBDb2xvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYSA9IDI1NSkge1xyXG4gICAgICAgIHRoaXMuX3IgPSByO1xyXG4gICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkJ1ZmZlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY3JlZW5XaWR0aDogbnVtYmVyLCBzY3JlZW5IZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBVaW50OENsYW1wZWRBcnJheShzY3JlZW5XaWR0aCAqIHNjcmVlbkhlaWdodCAqIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKGluZGV4OiBudW1iZXIsIGNvbG9yOiBDb2xvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleF0gPSBjb2xvci5yO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDFdID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAyXSA9IGNvbG9yLmI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgM10gPSBjb2xvci5hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBidWZmZXIoKTogVWludDhDbGFtcGVkQXJyYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgU2NyZWVuSGFuZGxlciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2FudmFzQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGl4ZWxzRnJvbUJ1ZmZlcihjb2xvckJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoY29sb3JCdWZmZXIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZwc0Rpc3BsYXkoZnBzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDhhMzAwXCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxUZXh0KFwiRlBTOiBcIiArIGZwcywgMTAsIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9Db2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuICAgIHN0YXRpYyBzY3JlZW5XaWR0aDogbnVtYmVyO1xyXG4gICAgc3RhdGljIHNjcmVlbkhlaWdodDogbnVtYmVyO1xyXG4gICAgc3RhdGljIGNsZWFyQ29sb3I6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDUwKTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=