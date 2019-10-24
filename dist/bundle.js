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
var ScreenBuffer_1 = __webpack_require__(/*! ./screen/ScreenBuffer */ "./src/scripts/screen/ScreenBuffer.ts");
var Rasterizer = /** @class */ (function () {
    function Rasterizer(targetScreen, triangle) {
        this.targetScreen = targetScreen;
        this.triangles = triangle;
    }
    Rasterizer.prototype.launchRenderLoop = function () {
        this.render();
        window.requestAnimationFrame(this.launchRenderLoop.bind(this));
    };
    Rasterizer.prototype.calculateFps = function () {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
        }
        var delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        return Math.round(1 / delta);
    };
    Rasterizer.prototype.render = function () {
        var screenBuffer = new ScreenBuffer_1.ScreenBuffer(this.targetScreen.width, this.targetScreen.height);
        for (var i = 0; i < screenBuffer.getLength(); i += 4) {
            screenBuffer.setColor(i, 0, 0, 0, 50);
            var screenX_1 = (i / 4) % this.targetScreen.width;
            var screenY_1 = Math.floor((i / 4) / this.targetScreen.width);
            for (var _i = 0, _a = this.triangles; _i < _a.length; _i++) {
                var triangle = _a[_i];
                if (this.isInTriangle(screenX_1, screenY_1, triangle)) {
                    screenBuffer.setColor(i, 255, 0, 0);
                }
            }
        }
        this.targetScreen.setPixelsFromBuffer(screenBuffer.buffer);
        this.targetScreen.setFpsDisplay(this.calculateFps());
    };
    Rasterizer.prototype.isInTriangle = function (x, y, triangle) {
        var x1 = (triangle.a.x + 1) * this.targetScreen.width * 0.5;
        var x2 = (triangle.b.x + 1) * this.targetScreen.width * 0.5;
        var x3 = (triangle.c.x + 1) * this.targetScreen.width * 0.5;
        var y1 = Math.abs((triangle.a.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);
        var y2 = Math.abs((triangle.b.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);
        var y3 = Math.abs((triangle.c.y + 1) * this.targetScreen.height * 0.5 - this.targetScreen.height);
        return (x1 - x2) * (y - y1) - (y1 - y2) * (x - x1) > 0 &&
            (x2 - x3) * (y - y2) - (y2 - y3) * (x - x2) > 0 &&
            (x3 - x1) * (y - y3) - (y3 - y1) * (x - x3) > 0;
    };
    return Rasterizer;
}());
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
var Triangle = /** @class */ (function () {
    function Triangle(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
    }
    Object.defineProperty(Triangle.prototype, "a", {
        get: function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "b", {
        get: function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "c", {
        get: function () {
            return this._c;
        },
        enumerable: true,
        configurable: true
    });
    return Triangle;
}());
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
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Vector3.betweenPoints = function (p1, p2) {
        var x = p1._x - p2._x;
        var y = p1._y - p2._y;
        var z = p1._z - p2._z;
        return new Vector3(x, y, z);
    };
    Vector3.prototype.getMagnitude = function () {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    };
    Vector3.prototype.getNormalized = function () {
        return this.divide(this.getMagnitude());
    };
    Vector3.prototype.dot = function (other) {
        return this._x * other._x + this._y * other._y + this._z * other._z;
    };
    Vector3.prototype.cross = function (other) {
        return new Vector3((this._y * other._z) - (this._z * other._y), (this._z * other._x) - (this._x * other._z), (this._x * other._y) - (this._y * other._x));
    };
    Vector3.prototype.add = function (other) {
        return new Vector3(this._x + other._x, this._y + other._y, this._z + other._y);
    };
    Vector3.prototype.substract = function (other) {
        return new Vector3(this._x - other._x, this._y - other._y, this._z - other._y);
    };
    Vector3.prototype.multiply = function (other) {
        if (other instanceof Vector3) {
            return new Vector3(this._x * other._x, this._y * other._y, this._z * other._y);
        }
        else {
            return new Vector3(this._x * other, this._y * other, this._z * other);
        }
    };
    Vector3.prototype.divide = function (other) {
        if (other instanceof Vector3) {
            return new Vector3(this._x / other._x, this._y / other._y, this._z / other._y);
        }
        else {
            return new Vector3(this._x / other, this._y / other, this._z / other);
        }
    };
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () {
            return this._z;
        },
        enumerable: true,
        configurable: true
    });
    return Vector3;
}());
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
var ScreenHandler_1 = __webpack_require__(/*! ./screen/ScreenHandler */ "./src/scripts/screen/ScreenHandler.ts");
var Rasterizer_1 = __webpack_require__(/*! ./Rasterizer */ "./src/scripts/Rasterizer.ts");
var Vector3_1 = __webpack_require__(/*! ./geometry/Vector3 */ "./src/scripts/geometry/Vector3.ts");
var Triangle_1 = __webpack_require__(/*! ./geometry/Triangle */ "./src/scripts/geometry/Triangle.ts");
function initialize() {
    var canvas = document.getElementById("screenCanvas");
    var targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    var a1 = new Vector3_1.Vector3(0.75, 0);
    var b1 = new Vector3_1.Vector3(0.75, 0.5);
    var c1 = new Vector3_1.Vector3(-0.5, 0.6);
    var triangle1 = new Triangle_1.Triangle(a1, b1, c1);
    var a2 = new Vector3_1.Vector3(0.75, -0.7);
    var b2 = new Vector3_1.Vector3(0.75, -0.2);
    var c2 = new Vector3_1.Vector3(0, -0.7);
    var triangle2 = new Triangle_1.Triangle(a2, b2, c2);
    var rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [triangle1, triangle2]);
    rasterizer.launchRenderLoop();
}
document.addEventListener("DOMContentLoaded", initialize);


/***/ }),

/***/ "./src/scripts/screen/ScreenBuffer.ts":
/*!********************************************!*\
  !*** ./src/scripts/screen/ScreenBuffer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScreenBuffer = /** @class */ (function () {
    function ScreenBuffer(screenWidth, screenHeight) {
        this._buffer = new Uint8ClampedArray(screenWidth * screenHeight * 4);
    }
    ScreenBuffer.prototype.getLength = function () {
        return this._buffer.length;
    };
    ScreenBuffer.prototype.setColor = function (index, r, g, b, a) {
        if (a === void 0) { a = 255; }
        this._buffer[index] = r;
        this._buffer[index + 1] = g;
        this._buffer[index + 2] = b;
        this._buffer[index + 3] = a;
    };
    Object.defineProperty(ScreenBuffer.prototype, "buffer", {
        get: function () {
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    return ScreenBuffer;
}());
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
var ScreenHandler = /** @class */ (function () {
    function ScreenHandler(canvas) {
        this._canvasCtx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
    }
    ScreenHandler.prototype.setPixelsFromBuffer = function (colorBuffer) {
        var imageData = new ImageData(colorBuffer, this.width, this.height);
        this._canvasCtx.putImageData(imageData, 0, 0);
    };
    ScreenHandler.prototype.setFpsDisplay = function (fps) {
        this._canvasCtx.fillStyle = "#08a300";
        this._canvasCtx.fillText("FPS: " + fps, 10, 20);
    };
    Object.defineProperty(ScreenHandler.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScreenHandler.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    return ScreenHandler;
}());
exports.ScreenHandler = ScreenHandler;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9UcmlhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS9WZWN0b3IzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NjcmVlbi9TY3JlZW5CdWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2NyZWVuL1NjcmVlbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLDhHQUFtRDtBQUVuRDtJQU9JLG9CQUFZLFlBQTJCLEVBQUUsUUFBb0I7UUFDekQsSUFB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LFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BHLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEcsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2xELENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDL0MsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTCxpQkFBQztBQUFELENBQUM7QUE1RFksZ0NBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ0Z2QjtJQUtJLGtCQUFZLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUMxQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELHNCQUFJLHVCQUFDO2FBQUw7WUFDSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1QkFBQzthQUFMO1lBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUJBQUM7YUFBTDtZQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUNMLGVBQUM7QUFBRCxDQUFDO0FBdEJZLDRCQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNGckI7SUFNSSxpQkFBWSxDQUFLLEVBQUUsQ0FBSyxFQUFFLENBQUs7UUFBbkIseUJBQUs7UUFBRSx5QkFBSztRQUFFLHlCQUFLO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0scUJBQWEsR0FBcEIsVUFBcUIsRUFBVyxFQUFFLEVBQVc7UUFDekMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCw4QkFBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELCtCQUFhLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxLQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsdUJBQUssR0FBTCxVQUFNLEtBQWM7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQzNDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFDM0MsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxLQUFjO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQWM7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBSUQsMEJBQVEsR0FBUixVQUFTLEtBQVU7UUFDZixJQUFJLEtBQUssWUFBWSxPQUFPLEVBQUU7WUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNqRjthQUFNO1lBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztTQUN4RTtJQUNMLENBQUM7SUFJRCx3QkFBTSxHQUFOLFVBQU8sS0FBVTtRQUNiLElBQUksS0FBSyxZQUFZLE9BQU8sRUFBRTtZQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVELHNCQUFJLHNCQUFDO2FBQUw7WUFDSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzQkFBQzthQUFMO1lBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0JBQUM7YUFBTDtZQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUNMLGNBQUM7QUFBRCxDQUFDO0FBNUVZLDBCQUFPOzs7Ozs7Ozs7Ozs7Ozs7QUNBcEIsaUhBQXFEO0FBQ3JELDBGQUF3QztBQUN4QyxtR0FBMkM7QUFDM0Msc0dBQTZDO0FBRTdDLFNBQVMsVUFBVTtJQUNmLElBQU0sTUFBTSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztJQUMvRixJQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0MsSUFBTSxFQUFFLEdBQVksSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFNLEVBQUUsR0FBWSxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQU0sRUFBRSxHQUFZLElBQUksaUJBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxJQUFNLFNBQVMsR0FBYSxJQUFJLG1CQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVyRCxJQUFNLEVBQUUsR0FBWSxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBTSxFQUFFLEdBQVksSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLElBQU0sRUFBRSxHQUFZLElBQUksaUJBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxJQUFNLFNBQVMsR0FBYSxJQUFJLG1CQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVyRCxJQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdkIxRDtJQUlJLHNCQUFZLFdBQW1CLEVBQUUsWUFBb0I7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsS0FBYSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQU87UUFBUCwyQkFBTztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQUksZ0NBQU07YUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQztBQXRCWSxvQ0FBWTs7Ozs7Ozs7Ozs7Ozs7O0FDQXpCO0lBTUksdUJBQVksTUFBeUI7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVELDJDQUFtQixHQUFuQixVQUFvQixXQUE4QjtRQUM5QyxJQUFNLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQscUNBQWEsR0FBYixVQUFjLEdBQVc7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxzQkFBSSxnQ0FBSzthQUFUO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksaUNBQU07YUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNMLG9CQUFDO0FBQUQsQ0FBQztBQTdCWSxzQ0FBYSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtTY3JlZW5IYW5kbGVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge1NjcmVlbkJ1ZmZlcn0gZnJvbSBcIi4vc2NyZWVuL1NjcmVlbkJ1ZmZlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XHJcbiAgICBwcml2YXRlIGxhc3RDYWxsZWRUaW1lOiBET01IaWdoUmVzVGltZVN0YW1wO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXIsIHRyaWFuZ2xlOiBUcmlhbmdsZVtdKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4gPSB0YXJnZXRTY3JlZW47XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGF1bmNoUmVuZGVyTG9vcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sYXVuY2hSZW5kZXJMb29wLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlRnBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxhc3RDYWxsZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVsdGE6IG51bWJlciA9IChwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMubGFzdENhbGxlZFRpbWUpIC8gMTAwMDtcclxuICAgICAgICB0aGlzLmxhc3RDYWxsZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoMSAvIGRlbHRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY3JlZW5CdWZmZXIgPSBuZXcgU2NyZWVuQnVmZmVyKHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoLCB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmVlbkJ1ZmZlci5nZXRMZW5ndGgoKTsgaSArPSA0KSB7XHJcbiAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihpLCAwLCAwLCAwLCA1MCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5YID0gKGkgLyA0KSAlIHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JlZW5ZID0gTWF0aC5mbG9vcigoaSAvIDQpIC8gdGhpcy50YXJnZXRTY3JlZW4ud2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJblRyaWFuZ2xlKHNjcmVlblgsIHNjcmVlblksIHRyaWFuZ2xlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihpLCAyNTUsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5zZXRQaXhlbHNGcm9tQnVmZmVyKHNjcmVlbkJ1ZmZlci5idWZmZXIpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldEZwc0Rpc3BsYXkodGhpcy5jYWxjdWxhdGVGcHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0luVHJpYW5nbGUoeDogbnVtYmVyLCB5OiBudW1iZXIsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHgxID0gKHRyaWFuZ2xlLmEueCArIDEpICogdGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKiAwLjU7XHJcbiAgICAgICAgY29uc3QgeDIgPSAodHJpYW5nbGUuYi54ICsgMSkgKiB0aGlzLnRhcmdldFNjcmVlbi53aWR0aCAqIDAuNTtcclxuICAgICAgICBjb25zdCB4MyA9ICh0cmlhbmdsZS5jLnggKyAxKSAqIHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICogMC41O1xyXG5cclxuICAgICAgICBjb25zdCB5MSA9IE1hdGguYWJzKCh0cmlhbmdsZS5hLnkgKyAxKSAqIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCAqIDAuNSAtIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLmFicygodHJpYW5nbGUuYi55ICsgMSkgKiB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQgKiAwLjUgLSB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IHkzID0gTWF0aC5hYnMoKHRyaWFuZ2xlLmMueSArIDEpICogdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0ICogMC41IC0gdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICh4MSAtIHgyKSAqICh5IC0geTEpIC0gKHkxIC0geTIpICogKHggLSB4MSkgPiAwICYmXHJcbiAgICAgICAgICAgICh4MiAtIHgzKSAqICh5IC0geTIpIC0gKHkyIC0geTMpICogKHggLSB4MikgPiAwICYmXHJcbiAgICAgICAgICAgICh4MyAtIHgxKSAqICh5IC0geTMpIC0gKHkzIC0geTEpICogKHggLSB4MykgPiAwO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2E6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYzogVmVjdG9yMztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzLCBjOiBWZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy5fYSA9IGE7XHJcbiAgICAgICAgdGhpcy5fYiA9IGI7XHJcbiAgICAgICAgdGhpcy5fYyA9IGM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGEoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGMoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2M7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yMyB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcclxuICAgICAgICB0aGlzLl94ID0geDtcclxuICAgICAgICB0aGlzLl95ID0geTtcclxuICAgICAgICB0aGlzLl96ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmV0d2VlblBvaW50cyhwMTogVmVjdG9yMywgcDI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCB4ID0gcDEuX3ggLSBwMi5feDtcclxuICAgICAgICBjb25zdCB5ID0gcDEuX3kgLSBwMi5feTtcclxuICAgICAgICBjb25zdCB6ID0gcDEuX3ogLSBwMi5fejtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCwgeSwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWFnbml0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3opO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vcm1hbGl6ZWQoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuZ2V0TWFnbml0dWRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdChvdGhlcjogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiBvdGhlci5feCArIHRoaXMuX3kgKiBvdGhlci5feSArIHRoaXMuX3ogKiBvdGhlci5fejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyhvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygodGhpcy5feSAqIG90aGVyLl96KSAtICh0aGlzLl96ICogb3RoZXIuX3kpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feiAqIG90aGVyLl94KSAtICh0aGlzLl94ICogb3RoZXIuX3opLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feCAqIG90aGVyLl95KSAtICh0aGlzLl95ICogb3RoZXIuX3gpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCArIG90aGVyLl94LCB0aGlzLl95ICsgb3RoZXIuX3ksIHRoaXMuX3ogKyBvdGhlci5feSlcclxuICAgIH1cclxuXHJcbiAgICBzdWJzdHJhY3Qob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAtIG90aGVyLl94LCB0aGlzLl95IC0gb3RoZXIuX3ksIHRoaXMuX3ogLSBvdGhlci5feSlcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLl94LCB0aGlzLl95ICogb3RoZXIuX3ksIHRoaXMuX3ogKiBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLCB0aGlzLl95ICogb3RoZXIsIHRoaXMuX3ogKiBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGl2aWRlKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlci5feCwgdGhpcy5feSAvIG90aGVyLl95LCB0aGlzLl96IC8gb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlciwgdGhpcy5feSAvIG90aGVyLCB0aGlzLl96IC8gb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY3JlZW5IYW5kbGVyfSBmcm9tIFwiLi9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1Jhc3Rlcml6ZXJ9IGZyb20gXCIuL1Jhc3Rlcml6ZXJcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9nZW9tZXRyeS9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NyZWVuQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3QgdGFyZ2V0U2NyZWVuID0gbmV3IFNjcmVlbkhhbmRsZXIoY2FudmFzKTtcclxuXHJcbiAgICBjb25zdCBhMTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNzUsIDApO1xyXG4gICAgY29uc3QgYjE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjc1LCAwLjUpO1xyXG4gICAgY29uc3QgYzE6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygtMC41LCAwLjYpO1xyXG4gICAgY29uc3QgdHJpYW5nbGUxOiBUcmlhbmdsZSA9IG5ldyBUcmlhbmdsZShhMSwgYjEsIGMxKTtcclxuXHJcbiAgICBjb25zdCBhMjogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDAuNzUsIC0wLjcpO1xyXG4gICAgY29uc3QgYjI6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygwLjc1LCAtMC4yKTtcclxuICAgIGNvbnN0IGMyOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMCwgLTAuNyk7XHJcbiAgICBjb25zdCB0cmlhbmdsZTI6IFRyaWFuZ2xlID0gbmV3IFRyaWFuZ2xlKGEyLCBiMiwgYzIpO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZXI6IFJhc3Rlcml6ZXIgPSBuZXcgUmFzdGVyaXplcih0YXJnZXRTY3JlZW4sIFt0cmlhbmdsZTEsIHRyaWFuZ2xlMl0pO1xyXG4gICAgcmFzdGVyaXplci5sYXVuY2hSZW5kZXJMb29wKCk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRpYWxpemUpOyIsImV4cG9ydCBjbGFzcyBTY3JlZW5CdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogVWludDhDbGFtcGVkQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NyZWVuV2lkdGg6IG51bWJlciwgc2NyZWVuSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2NyZWVuV2lkdGggKiBzY3JlZW5IZWlnaHQgKiA0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihpbmRleDogbnVtYmVyLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhID0gMjU1KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4XSA9IHI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMV0gPSBnO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDJdID0gYjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAzXSA9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJ1ZmZlcigpOiBVaW50OENsYW1wZWRBcnJheSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTY3JlZW5IYW5kbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYW52YXNDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3dpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9oZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0UGl4ZWxzRnJvbUJ1ZmZlcihjb2xvckJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoY29sb3JCdWZmZXIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZwc0Rpc3BsYXkoZnBzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDhhMzAwXCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxUZXh0KFwiRlBTOiBcIiArIGZwcywgMTAsIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9