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
const Color_1 = __webpack_require__(/*! ./light/Color */ "./src/scripts/light/Color.ts");
const Vector3_1 = __webpack_require__(/*! ./math/Vector3 */ "./src/scripts/math/Vector3.ts");
const KeyboardInputData_1 = __webpack_require__(/*! ./io/input/keyboard/KeyboardInputData */ "./src/scripts/io/input/keyboard/KeyboardInputData.ts");
const LightIntensity_1 = __webpack_require__(/*! ./light/LightIntensity */ "./src/scripts/light/LightIntensity.ts");
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
            trianglesToRender.push(this.enlightenTriangle(projectedTriangle));
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
    enlightenTriangle(triangle) {
        let aLightIntensity = new LightIntensity_1.LightIntensity();
        let bLightIntensity = new LightIntensity_1.LightIntensity();
        let cLightIntensity = new LightIntensity_1.LightIntensity();
        for (const light of this.lights) {
            aLightIntensity = aLightIntensity.add(light.calculateVertexLightIntensity(triangle.a, triangle.aNormal));
            bLightIntensity = bLightIntensity.add(light.calculateVertexLightIntensity(triangle.b, triangle.bNormal));
            cLightIntensity = cLightIntensity.add(light.calculateVertexLightIntensity(triangle.c, triangle.cNormal));
        }
        const newAColor = triangle.aColor.multiply(aLightIntensity);
        const newBColor = triangle.bColor.multiply(bLightIntensity);
        const newCColor = triangle.cColor.multiply(cLightIntensity);
        return triangle.withColors(newAColor, newBColor, newCColor);
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

/***/ "./src/scripts/geometry/NormalsCreator.ts":
/*!************************************************!*\
  !*** ./src/scripts/geometry/NormalsCreator.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __webpack_require__(/*! ../math/Vector3 */ "./src/scripts/math/Vector3.ts");
class NormalsCreator {
    static createNormals(triangle) {
        const ab = Vector3_1.Vector3.betweenPoints(triangle.a, triangle.b);
        const ac = Vector3_1.Vector3.betweenPoints(triangle.a, triangle.c);
        const triangleNormal = ab.cross(ac).getNormalized();
        return triangle.withNormals(triangleNormal, triangleNormal, triangleNormal);
    }
}
exports.NormalsCreator = NormalsCreator;


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
const Color_1 = __webpack_require__(/*! ../light/Color */ "./src/scripts/light/Color.ts");
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
        const x1 = this.toScreenX(this.a.x);
        const x2 = this.toScreenX(this.b.x);
        const x3 = this.toScreenX(this.c.x);
        const y1 = this.toScreenY(this.a.y);
        const y2 = this.toScreenY(this.b.y);
        const y3 = this.toScreenY(this.c.y);
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
    withNormals(newANormal, newBNormal, newCNormal) {
        return new Triangle(this.a, this.b, this.c, newANormal, newBNormal, newCNormal, this.aColor, this.bColor, this.cColor);
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
        const isABOk = this.isABTopLeft ?
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) >= 0 :
            this.dxAB * (y - this.screenA.y) - this.dyAB * (x - this.screenA.x) > 0;
        const isBCOk = this.isBCTopLeft ?
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) >= 0 :
            this.dxBC * (y - this.screenB.y) - this.dyBC * (x - this.screenB.x) > 0;
        const isCAOk = this.isCATopLeft ?
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) >= 0 :
            this.dxCA * (y - this.screenC.y) - this.dyCA * (x - this.screenC.x) > 0;
        return isABOk && isBCOk && isCAOk;
    }
    toScreenX(xToProject) {
        return Math.round((xToProject + 1) * Settings_1.Settings.screenWidth * 0.5);
    }
    toScreenY(yToProject) {
        return Math.round(Math.abs(MathUtils_1.MathUtils.clampFromZero((yToProject + 1) * Settings_1.Settings.screenHeight * 0.5, Settings_1.Settings.screenHeight) - Settings_1.Settings.screenHeight));
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
const PointLight_1 = __webpack_require__(/*! ./light/PointLight */ "./src/scripts/light/PointLight.ts");
const LightIntensity_1 = __webpack_require__(/*! ./light/LightIntensity */ "./src/scripts/light/LightIntensity.ts");
const DirectionalLight_1 = __webpack_require__(/*! ./light/DirectionalLight */ "./src/scripts/light/DirectionalLight.ts");
function constructMeshes() {
    const meshLoader = new ObjLoader_1.ObjLoader();
    const monkeyMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/monkey.obj"));
    monkeyMesh.transform.scale(new Vector3_1.Vector3(0.75, 0.75, 0.75));
    const cubeMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/cube.obj"));
    cubeMesh.transform.scale(new Vector3_1.Vector3(0.5, 0.5, 0.5));
    cubeMesh.transform.translate(new Vector3_1.Vector3(1.75, -1.25, -0.25));
    const octahedronMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/octahedron.obj"));
    octahedronMesh.transform.scale(new Vector3_1.Vector3(0.3, 0.3, 0.3));
    octahedronMesh.transform.translate(new Vector3_1.Vector3(-2, 1, 0));
    const dodecahedronMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/dodecahedron.obj"));
    dodecahedronMesh.transform.scale(new Vector3_1.Vector3(0.3, 0.3, 0.3));
    dodecahedronMesh.transform.translate(new Vector3_1.Vector3(-2, -1, 0));
    const tetrahedronMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/tetrahedron.obj"));
    tetrahedronMesh.transform.scale(new Vector3_1.Vector3(0.3, 0.3, 0.3));
    tetrahedronMesh.transform.translate(new Vector3_1.Vector3(2, 1, 0));
    const sphereMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/sphere.obj"));
    sphereMesh.transform.scale(new Vector3_1.Vector3(0.015, 0.015, 0.015));
    sphereMesh.transform.translate(new Vector3_1.Vector3(-2, 0, 0));
    const icosahedronMesh = meshLoader.loadMesh(FileLoader_1.FileLoader.loadFile("resources/models/icosahedron.obj"));
    icosahedronMesh.transform.scale(new Vector3_1.Vector3(0.5, 0.5, 0.5));
    icosahedronMesh.transform.translate(new Vector3_1.Vector3(2, 0, 0));
    return [monkeyMesh, cubeMesh, octahedronMesh, dodecahedronMesh, tetrahedronMesh, sphereMesh, icosahedronMesh];
}
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    KeyboardBinder_1.KeyboardBinder.registerKeyBindings();
    const camera = new Camera_1.Camera();
    camera.setLookAt(KeyboardInputData_1.KeyboardInputData.cameraPosition, KeyboardInputData_1.KeyboardInputData.cameraTarget, new Vector3_1.Vector3(0, 1, 0));
    camera.setPerspective(45, 16 / 9, 0.1, 100);
    const ambientLightColor = new LightIntensity_1.LightIntensity(0, 0, 0);
    const specularLightColor = new LightIntensity_1.LightIntensity(1, 0, 1);
    const light1 = new DirectionalLight_1.DirectionalLight(KeyboardInputData_1.KeyboardInputData.lightPosition, ambientLightColor, new LightIntensity_1.LightIntensity(1, 0, 0), specularLightColor, 20);
    const light2 = new DirectionalLight_1.DirectionalLight(new Vector3_1.Vector3(-3, 0, 1.5), ambientLightColor, new LightIntensity_1.LightIntensity(0, 0, 1), specularLightColor, 20);
    const light3 = new PointLight_1.PointLight(new Vector3_1.Vector3(0, 1, 2), ambientLightColor, new LightIntensity_1.LightIntensity(0.1, 0, 0.1), new LightIntensity_1.LightIntensity(0.05, 0.05, 0.05), 20);
    const lights = [light1, light2, light3];
    const drawableObjects = constructMeshes();
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, drawableObjects, lights, camera);
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
KeyboardInputData.lightPosition = new Vector3_1.Vector3(3, 0, 1.5);


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
const Color_1 = __webpack_require__(/*! ../../../light/Color */ "./src/scripts/light/Color.ts");
const NormalsCreator_1 = __webpack_require__(/*! ../../../geometry/NormalsCreator */ "./src/scripts/geometry/NormalsCreator.ts");
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
        let face = new Triangle_1.Triangle(this.vertices[(faceVertexIndices[0] - 1)], this.vertices[(faceVertexIndices[1] - 1)], this.vertices[(faceVertexIndices[2] - 1)], this.normals[(faceNormalIndices[0] - 1)], this.normals[(faceNormalIndices[1] - 1)], this.normals[(faceNormalIndices[2] - 1)], Color_1.Color.WHITE, Color_1.Color.WHITE, Color_1.Color.WHITE);
        if (face.aNormal == undefined || face.bNormal == undefined || face.cNormal == undefined) {
            face = NormalsCreator_1.NormalsCreator.createNormals(face);
        }
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
const Color_1 = __webpack_require__(/*! ../../../light/Color */ "./src/scripts/light/Color.ts");
class Settings {
}
exports.Settings = Settings;
Settings.clearColor = new Color_1.Color(0, 0, 0, 50);


/***/ }),

/***/ "./src/scripts/light/Color.ts":
/*!************************************!*\
  !*** ./src/scripts/light/Color.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }
    multiply(other) {
        return new Color(this.r * other.r, this.g * other.g, this.b * other.b);
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
Color.BLACK = new Color(0, 0, 0);
Color.WHITE = new Color(255, 255, 255);


/***/ }),

/***/ "./src/scripts/light/DirectionalLight.ts":
/*!***********************************************!*\
  !*** ./src/scripts/light/DirectionalLight.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Light_1 = __webpack_require__(/*! ./Light */ "./src/scripts/light/Light.ts");
const LightIntensity_1 = __webpack_require__(/*! ./LightIntensity */ "./src/scripts/light/LightIntensity.ts");
class DirectionalLight extends Light_1.Light {
    constructor(position, ambient, diffuse, specular, shininess) {
        super(position, ambient, diffuse, specular, shininess);
    }
    calculateVertexLightIntensity(vertex, normal) {
        const N = normal.getNormalized();
        const V = vertex.multiply(-1).getNormalized();
        const R = this.position.getReflectedBy(N).getNormalized();
        const iD = this.position.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);
        const rIntensity = (this.ambient.r + (iD / 2 * this.diffuse.r) + (iS * this.specular.r));
        const gIntensity = (this.ambient.g + (iD / 2 * this.diffuse.g) + (iS * this.specular.g));
        const bIntensity = (this.ambient.b + (iD / 2 * this.diffuse.b) + (iS * this.specular.b));
        return new LightIntensity_1.LightIntensity(rIntensity, gIntensity, bIntensity);
    }
}
exports.DirectionalLight = DirectionalLight;


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

/***/ "./src/scripts/light/LightIntensity.ts":
/*!*********************************************!*\
  !*** ./src/scripts/light/LightIntensity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LightIntensity {
    constructor(r = 0, g = 0, b = 0) {
        this._r = r;
        this._g = g;
        this._b = b;
    }
    add(other) {
        return new LightIntensity(this.r + other.r, this.g + other.g, this.b + other.b);
    }
    multiply(other) {
        if (other instanceof LightIntensity) {
            return new LightIntensity(this.r * other.r, this.g * other.g, this.b * other.b);
        }
        else {
            return new LightIntensity(this.r * other, this.g * other, this.b * other);
        }
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
}
exports.LightIntensity = LightIntensity;


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
const LightIntensity_1 = __webpack_require__(/*! ./LightIntensity */ "./src/scripts/light/LightIntensity.ts");
class PointLight extends Light_1.Light {
    constructor(position, ambient, diffuse, specular, shininess) {
        super(position, ambient, diffuse, specular, shininess);
    }
    calculateVertexLightIntensity(vertex, normal) {
        const N = normal.getNormalized();
        let V = vertex.multiply(-1);
        const L = this.position.substract(V).getNormalized();
        V = V.getNormalized();
        const R = L.getReflectedBy(N);
        const iD = L.dot(N);
        const iS = Math.pow(R.dot(V), this.shininess);
        const rIntensity = (this.ambient.r + (iD * this.diffuse.r) + (iS * this.specular.r));
        const gIntensity = (this.ambient.g + (iD * this.diffuse.g) + (iS * this.specular.g));
        const bIntensity = (this.ambient.b + (iD * this.diffuse.b) + (iS * this.specular.b));
        return new LightIntensity_1.LightIntensity(rIntensity, gIntensity, bIntensity);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jYW1lcmEvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L01lc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvTm9ybWFsc0NyZWF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L1RyaWFuZ2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL2lucHV0L2ZpbGUvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZEJpbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9tZXNoL09iakxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9EaXJlY3Rpb25hbExpZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2xpZ2h0L0xpZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2xpZ2h0L0xpZ2h0SW50ZW5zaXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2xpZ2h0L1BvaW50TGlnaHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWF0aC9NYXRoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWF0aC9NYXRyaXg0eDQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWF0aC9WZWN0b3IzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSxvSUFBNkQ7QUFDN0QseUZBQW9DO0FBQ3BDLDZGQUF1QztBQUV2QyxxSkFBd0U7QUFHeEUsb0hBQXNEO0FBRXRELE1BQWEs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QUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDSjtBQXpERCw4QkF5REM7Ozs7Ozs7Ozs7Ozs7OztBQzVERCw4RkFBd0M7QUFDeEMsMEZBQXFDO0FBQ3JDLHlIQUFzRDtBQUN0RCxpSEFBZ0Q7QUFDaEQsb0dBQTRDO0FBRTVDLE1BQWEsUUFBUyxTQUFRLCtCQUFjO0lBa0N4QyxZQUFZLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLE1BQU0sR0FBRyxhQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxhQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxhQUFLLENBQUMsSUFBSTtRQUMvSixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxVQUFVLENBQUMsU0FBZ0IsRUFBRSxTQUFnQixFQUFFLFNBQWdCO1FBQzNELE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFVBQW1CLEVBQUUsVUFBbUIsRUFBRSxVQUFtQjtRQUNyRSxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0gsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEMsT0FBTyxJQUFJLGlCQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FB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T0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBSUQsUUFBUSxDQUFDLEtBQVU7UUFDZixJQUFJLEtBQUssWUFBWSxpQkFBTyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNaLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILE9BQU8sSUFBSSxpQkFBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNILE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEssT0FBTyxNQUFNLENBQUM7U0FDakI7SUFDTCxDQUFDO0NBRUo7QUExREQsOEJBMERDOzs7Ozs7Ozs7Ozs7Ozs7QUM1REQsTUFBYSxPQUFPO0lBTWhCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lB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RSxDQUFDO1NBQ2pGO2FBQU07WUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUlELE1BQU0sQ0FBQyxLQUFVO1FBQ2IsSUFBSSxLQUFLLFlBQVksT0FBTyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakY7YUFBTTtZQUNILE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFqRkQsMEJBaUZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1NjcmVlbkhhbmRsZXJ9IGZyb20gXCIuL2lvL291dHB1dC9zY3JlZW4vU2NyZWVuSGFuZGxlclwiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge1NjcmVlbkJ1ZmZlcn0gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5CdWZmZXJcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4vbGlnaHQvQ29sb3JcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtDYW1lcmF9IGZyb20gXCIuL2NhbWVyYS9DYW1lcmFcIjtcclxuaW1wb3J0IHtLZXlib2FyZElucHV0RGF0YX0gZnJvbSBcIi4vaW8vaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRJbnB1dERhdGFcIjtcclxuaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vZ2VvbWV0cnkvRHJhd2FibGVPYmplY3RcIjtcclxuaW1wb3J0IHtMaWdodH0gZnJvbSBcIi4vbGlnaHQvTGlnaHRcIjtcclxuaW1wb3J0IHtMaWdodEludGVuc2l0eX0gZnJvbSBcIi4vbGlnaHQvTGlnaHRJbnRlbnNpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXN0ZXJpemVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhcmdldFNjcmVlbjogU2NyZWVuSGFuZGxlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHJpYW5nbGVzOiBUcmlhbmdsZVtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsaWdodHM6IExpZ2h0W107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhbWVyYTogQ2FtZXJhO1xyXG4gICAgcHJpdmF0ZSBsYXN0Q2FsbGVkVGltZTogRE9NSGlnaFJlc1RpbWVTdGFtcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXRTY3JlZW46IFNjcmVlbkhhbmRsZXIsIGRyYXdhYmxlT2JqZWN0czogRHJhd2FibGVPYmplY3RbXSwgbGlnaHRzOiBMaWdodFtdLCBjYW1lcmE6IENhbWVyYSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuID0gdGFyZ2V0U2NyZWVuO1xyXG4gICAgICAgIGxldCBhY2N1bXVsYXRlZFRyaWFuZ2xlczogVHJpYW5nbGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgZHJhd2FibGVPYmplY3Qgb2YgZHJhd2FibGVPYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGFjY3VtdWxhdGVkVHJpYW5nbGVzID0gYWNjdW11bGF0ZWRUcmlhbmdsZXMuY29uY2F0KGRyYXdhYmxlT2JqZWN0LnRvVHJpYW5nbGVzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyaWFuZ2xlcyA9IGFjY3VtdWxhdGVkVHJpYW5nbGVzO1xyXG4gICAgICAgIHRoaXMubGlnaHRzID0gbGlnaHRzO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdHJpYW5nbGVzVG9SZW5kZXIgPSBbXTtcclxuICAgICAgICB0aGlzLmNhbWVyYS5zZXRMb29rQXQoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24sIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdHJpYW5nbGUgb2YgdGhpcy50cmlhbmdsZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdGVkVHJpYW5nbGUgPSB0aGlzLmNhbWVyYS5wcm9qZWN0KHRyaWFuZ2xlKTtcclxuICAgICAgICAgICAgdHJpYW5nbGVzVG9SZW5kZXIucHVzaCh0aGlzLmVubGlnaHRlblRyaWFuZ2xlKHByb2plY3RlZFRyaWFuZ2xlKSk7XHJcblxyXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICB0cmlhbmdsZS50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZywgS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZywgS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZykpO1xyXG4gICAgICAgICAgICBpZiAoS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24uZ2V0TWFnbml0dWRlKCkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdHJpYW5nbGUudHJhbnNmb3JtLnJvdGF0ZShLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25BbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlnaHRzWzBdLnBvc2l0aW9uID0gS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uY2xlYXJTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLnJlbmRlcih0cmlhbmdsZXNUb1JlbmRlcik7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4uc2V0RnBzRGlzcGxheSh0aGlzLmNhbGN1bGF0ZUZwcygpKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5saWdodGVuVHJpYW5nbGUodHJpYW5nbGU6IFRyaWFuZ2xlKTogVHJpYW5nbGUge1xyXG4gICAgICAgIGxldCBhTGlnaHRJbnRlbnNpdHkgPSBuZXcgTGlnaHRJbnRlbnNpdHkoKTtcclxuICAgICAgICBsZXQgYkxpZ2h0SW50ZW5zaXR5ID0gbmV3IExpZ2h0SW50ZW5zaXR5KCk7XHJcbiAgICAgICAgbGV0IGNMaWdodEludGVuc2l0eSA9IG5ldyBMaWdodEludGVuc2l0eSgpO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGlnaHQgb2YgdGhpcy5saWdodHMpIHtcclxuICAgICAgICAgICAgYUxpZ2h0SW50ZW5zaXR5ID0gYUxpZ2h0SW50ZW5zaXR5LmFkZChsaWdodC5jYWxjdWxhdGVWZXJ0ZXhMaWdodEludGVuc2l0eSh0cmlhbmdsZS5hLCB0cmlhbmdsZS5hTm9ybWFsKSk7XHJcbiAgICAgICAgICAgIGJMaWdodEludGVuc2l0eSA9IGJMaWdodEludGVuc2l0eS5hZGQobGlnaHQuY2FsY3VsYXRlVmVydGV4TGlnaHRJbnRlbnNpdHkodHJpYW5nbGUuYiwgdHJpYW5nbGUuYk5vcm1hbCkpO1xyXG4gICAgICAgICAgICBjTGlnaHRJbnRlbnNpdHkgPSBjTGlnaHRJbnRlbnNpdHkuYWRkKGxpZ2h0LmNhbGN1bGF0ZVZlcnRleExpZ2h0SW50ZW5zaXR5KHRyaWFuZ2xlLmMsIHRyaWFuZ2xlLmNOb3JtYWwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3QUNvbG9yID0gdHJpYW5nbGUuYUNvbG9yLm11bHRpcGx5KGFMaWdodEludGVuc2l0eSk7XHJcbiAgICAgICAgY29uc3QgbmV3QkNvbG9yID0gdHJpYW5nbGUuYkNvbG9yLm11bHRpcGx5KGJMaWdodEludGVuc2l0eSk7XHJcbiAgICAgICAgY29uc3QgbmV3Q0NvbG9yID0gdHJpYW5nbGUuY0NvbG9yLm11bHRpcGx5KGNMaWdodEludGVuc2l0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRyaWFuZ2xlLndpdGhDb2xvcnMobmV3QUNvbG9yLCBuZXdCQ29sb3IsIG5ld0NDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMubGFzdENhbGxlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWx0YTogbnVtYmVyID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdENhbGxlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgxIC8gZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKHRyaWFuZ2xlczogVHJpYW5nbGVbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbkJ1ZmZlciA9IG5ldyBTY3JlZW5CdWZmZXIodGhpcy50YXJnZXRTY3JlZW4ud2lkdGgsIHRoaXMudGFyZ2V0U2NyZWVuLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgZGVwdGhCdWZmZXI6IG51bWJlcltdID0gbmV3IEFycmF5KHRoaXMudGFyZ2V0U2NyZWVuLndpZHRoICogdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KS5maWxsKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdCA9IDAsIHRyaWFuZ2xlc0xlbmd0aCA9IHRyaWFuZ2xlcy5sZW5ndGg7IHQgPCB0cmlhbmdsZXNMZW5ndGg7ICsrdCkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VHJpYW5nbGUgPSB0cmlhbmdsZXNbdF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBjdXJyZW50VHJpYW5nbGUubWluWDsgeCA8PSBjdXJyZW50VHJpYW5nbGUubWF4WDsgKyt4KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gY3VycmVudFRyaWFuZ2xlLm1pblk7IHkgPD0gY3VycmVudFRyaWFuZ2xlLm1heFk7ICsreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJpYW5nbGUuaXNJbih4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYW1iZGFDb3JkczogVmVjdG9yMyA9IGN1cnJlbnRUcmlhbmdsZS50b0xhbWJkYUNvb3JkaW5hdGVzKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aDogbnVtYmVyID0gUmFzdGVyaXplci5jYWxjdWxhdGVEZXB0aChsYW1iZGFDb3JkcywgY3VycmVudFRyaWFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVmZmVySW5kZXggPSB0aGlzLmNhbGN1bGF0ZUJ1ZmZlckluZGV4KHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCBkZXB0aEJ1ZmZlcltidWZmZXJJbmRleCAvIDRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aEJ1ZmZlcltidWZmZXJJbmRleCAvIDRdID0gZGVwdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5CdWZmZXIuc2V0Q29sb3IoYnVmZmVySW5kZXgsIFJhc3Rlcml6ZXIuY2FsY3VsYXRlSW50ZXJwb2xhdGVkQ29sb3IobGFtYmRhQ29yZHMsIGN1cnJlbnRUcmlhbmdsZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5zZXRQaXhlbHNGcm9tQnVmZmVyKHNjcmVlbkJ1ZmZlci5idWZmZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQnVmZmVySW5kZXgoc2NyZWVuWDogbnVtYmVyLCBzY3JlZW5ZOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChzY3JlZW5ZICogdGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKyBzY3JlZW5YKSAqIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzOiBWZWN0b3IzLCB0cmlhbmdsZTogVHJpYW5nbGUpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYS56ICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmIueiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jLno7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlSW50ZXJwb2xhdGVkQ29sb3IobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IENvbG9yIHtcclxuICAgICAgICBjb25zdCByZWRJbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLnIgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLnIgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLnI7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5JbnRlcnBvbGF0ZWQgPSBsYW1iZGFDb3Jkcy54ICogdHJpYW5nbGUuYUNvbG9yLmcgKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYkNvbG9yLmcgKyBsYW1iZGFDb3Jkcy56ICogdHJpYW5nbGUuY0NvbG9yLmc7XHJcbiAgICAgICAgY29uc3QgYmx1ZUludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuYiArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuYiArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuYjtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHJlZEludGVycG9sYXRlZCwgZ3JlZW5JbnRlcnBvbGF0ZWQsIGJsdWVJbnRlcnBvbGF0ZWQpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7TWF0cml4NHg0fSBmcm9tIFwiLi4vbWF0aC9NYXRyaXg0eDRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9qZWN0aW9uOiBNYXRyaXg0eDQgPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXc6IE1hdHJpeDR4NCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgIHByaXZhdGUgcHJvamVjdGlvblZpZXc6IE1hdHJpeDR4NDtcclxuXHJcbiAgICBzZXRMb29rQXQocG9zaXRpb246IFZlY3RvcjMsIHRhcmdldDogVmVjdG9yMywgdXBEaXJlY3Rpb246IFZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYW1lcmFEaXJlY3Rpb24gPSB0YXJnZXQuc3Vic3RyYWN0KHBvc2l0aW9uKS5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgdXBEaXJlY3Rpb24gPSB1cERpcmVjdGlvbi5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcyA9IGNhbWVyYURpcmVjdGlvbi5jcm9zcyh1cERpcmVjdGlvbik7XHJcbiAgICAgICAgY29uc3QgdSA9IHMuY3Jvc3MoY2FtZXJhRGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy52aWV3LmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtzLngsIHMueSwgcy56LCAtcG9zaXRpb24ueF0pO1xyXG4gICAgICAgIHRoaXMudmlldy5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbdS54LCB1LnksIHUueiwgLXBvc2l0aW9uLnldKTtcclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWy1jYW1lcmFEaXJlY3Rpb24ueCwgLWNhbWVyYURpcmVjdGlvbi55LCAtY2FtZXJhRGlyZWN0aW9uLnosIC1wb3NpdGlvbi56XSk7XHJcbiAgICAgICAgdGhpcy52aWV3LmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0aW9uVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBlcnNwZWN0aXZlKGZvdlk6IG51bWJlciwgYXNwZWN0OiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3ZZICo9IE1hdGguUEkgLyAzNjA7XHJcbiAgICAgICAgY29uc3QgZiA9IE1hdGguY29zKGZvdlkpIC8gTWF0aC5zaW4oZm92WSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzBdID0gbmV3IEZsb2F0MzJBcnJheShbZi9hc3BlY3QsIDAsIDAsIDBdKTtcclxuICAgICAgICB0aGlzLnByb2plY3Rpb24uZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIGYsIDAsIDBdKTtcclxuICAgICAgICB0aGlzLnByb2plY3Rpb24uZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIChmYXIgKyBuZWFyKSAvIChuZWFyIC0gZmFyKSwgKDIgKiBmYXIgKiBuZWFyKSAvIChuZWFyIC0gZmFyKV0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzNdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgLTEsIDBdKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3Rpb25WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvamVjdCh0cmlhbmdsZTogVHJpYW5nbGUpOiBUcmlhbmdsZSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvblZpZXdXb3JsZCA9IHRoaXMucHJvamVjdGlvblZpZXcubXVsdGlwbHkodHJpYW5nbGUudHJhbnNmb3JtLm9iamVjdFRvV29ybGQpO1xyXG4gICAgICAgIGNvbnN0IG5ld0EgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIGNvbnN0IG5ld0IgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmIpO1xyXG4gICAgICAgIGNvbnN0IG5ld0MgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmMpO1xyXG4gICAgICAgIGNvbnN0IG5ld0FOb3JtYWwgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmFOb3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IG5ld0JOb3JtYWwgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmJOb3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IG5ld0NOb3JtYWwgPSBwcm9qZWN0aW9uVmlld1dvcmxkLm11bHRpcGx5KHRyaWFuZ2xlLmNOb3JtYWwpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJpYW5nbGUobmV3QSwgbmV3QiwgbmV3QywgbmV3QU5vcm1hbCwgbmV3Qk5vcm1hbCwgbmV3Q05vcm1hbCwgdHJpYW5nbGUuYUNvbG9yLCB0cmlhbmdsZS5iQ29sb3IsIHRyaWFuZ2xlLmNDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9qZWN0aW9uVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb2plY3Rpb25WaWV3ID0gdGhpcy5wcm9qZWN0aW9uLm11bHRpcGx5KHRoaXMudmlldyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1RyYW5zZm9ybX0gZnJvbSBcIi4vVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL1RyaWFuZ2xlXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRHJhd2FibGVPYmplY3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdHJhbnNmb3JtOiBUcmFuc2Zvcm07XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBpc0luKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbjtcclxuICAgIGFic3RyYWN0IHRvVHJpYW5nbGVzKCk6IFRyaWFuZ2xlW11cclxuXHJcbiAgICBnZXQgdHJhbnNmb3JtKCk6IFRyYW5zZm9ybSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybTtcclxuICAgIH1cclxufSIsImltcG9ydCB7RHJhd2FibGVPYmplY3R9IGZyb20gXCIuL0RyYXdhYmxlT2JqZWN0XCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL1RyaWFuZ2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzaCBleHRlbmRzIERyYXdhYmxlT2JqZWN0e1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHJpYW5nbGVzOiBUcmlhbmdsZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyaWFuZ2xlczogVHJpYW5nbGVbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgdHJpYW5nbGUgb2YgdGhpcy50cmlhbmdsZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRyaWFuZ2xlLmlzSW4oeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0b1RyaWFuZ2xlcygpOiBUcmlhbmdsZVtdIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHRyaWFuZ2xlIG9mIHRoaXMudHJpYW5nbGVzKSB7XHJcbiAgICAgICAgICAgIHRyaWFuZ2xlLnRyYW5zZm9ybS5vYmplY3RUb1dvcmxkID0gdGhpcy50cmFuc2Zvcm0ub2JqZWN0VG9Xb3JsZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpYW5nbGVzO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vcm1hbHNDcmVhdG9yIHtcclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlTm9ybWFscyh0cmlhbmdsZTogVHJpYW5nbGUpOiBUcmlhbmdsZSB7XHJcbiAgICAgICAgY29uc3QgYWIgPSBWZWN0b3IzLmJldHdlZW5Qb2ludHModHJpYW5nbGUuYSwgdHJpYW5nbGUuYik7XHJcbiAgICAgICAgY29uc3QgYWMgPSBWZWN0b3IzLmJldHdlZW5Qb2ludHModHJpYW5nbGUuYSwgdHJpYW5nbGUuYyk7XHJcbiAgICAgICAgY29uc3QgdHJpYW5nbGVOb3JtYWwgPSBhYi5jcm9zcyhhYykuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIHJldHVybiB0cmlhbmdsZS53aXRoTm9ybWFscyh0cmlhbmdsZU5vcm1hbCwgdHJpYW5nbGVOb3JtYWwsIHRyaWFuZ2xlTm9ybWFsKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWF0cml4NHg0fSBmcm9tIFwiLi4vbWF0aC9NYXRyaXg0eDRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtIHtcclxuXHJcbiAgICBvYmplY3RUb1dvcmxkOiBNYXRyaXg0eDQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gTWF0cml4NHg0LmNyZWF0ZUlkZW50aXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBWZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25NYXRyaXggPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIHRyYW5zbGF0aW9uLnhdKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgdHJhbnNsYXRpb24ueV0pO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbMl0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCB0cmFuc2xhdGlvbi56XSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICB0aGlzLm9iamVjdFRvV29ybGQgPSB0cmFuc2xhdGlvbk1hdHJpeC5tdWx0aXBseSh0aGlzLm9iamVjdFRvV29ybGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlKHNjYWxpbmc6IFZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY2FsaW5nTWF0cml4ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3NjYWxpbmcueCwgMCwgMCwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVsxXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIHNjYWxpbmcueSwgMCwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIHNjYWxpbmcueiwgMF0pO1xyXG4gICAgICAgIHNjYWxpbmdNYXRyaXguZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICB0aGlzLm9iamVjdFRvV29ybGQgPSBzY2FsaW5nTWF0cml4Lm11bHRpcGx5KHRoaXMub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlKHJvdGF0aW9uRGlyZWN0aW9uOiBWZWN0b3IzLCBhbmdsZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgICAgIHJvdGF0aW9uRGlyZWN0aW9uID0gcm90YXRpb25EaXJlY3Rpb24uZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IHggPSByb3RhdGlvbkRpcmVjdGlvbi54O1xyXG4gICAgICAgIGNvbnN0IHkgPSByb3RhdGlvbkRpcmVjdGlvbi55O1xyXG4gICAgICAgIGNvbnN0IHogPSByb3RhdGlvbkRpcmVjdGlvbi56O1xyXG5cclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzBdID0geCAqIHggKiAoMSAtIGNvcykgKyBjb3M7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVsxXSA9IHggKiB5ICogKDEgLSBjb3MpIC0geiAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzJdID0geCAqIHogKiAoMSAtIGNvcykgKyB5ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bM10gPSAwO1xyXG5cclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzBdID0geSAqIHggKiAoMSAtIGNvcykgKyB6ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bMV0gPSB5ICogeSAqICgxIC0gY29zKSArIGNvcztcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzFdWzJdID0geSAqIHogKiAoMSAtIGNvcykgLSB4ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bM10gPSAwO1xyXG5cclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzBdID0geCAqIHogKiAoMSAtIGNvcykgLSB5ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bMV0gPSB5ICogeiAqICgxIC0gY29zKSArIHggKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVsyXSA9IHogKiB6ICogKDEgLSBjb3MpICsgY29zO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bM10gPSAwO1xyXG5cclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzNdWzBdID0gMDtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzNdWzFdID0gMDtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzNdWzJdID0gMDtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzNdWzNdID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RUb1dvcmxkID0gcm90YXRpb25NYXRyaXgubXVsdGlwbHkodGhpcy5vYmplY3RUb1dvcmxkKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vbGlnaHQvQ29sb3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4uL2lvL291dHB1dC9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vRHJhd2FibGVPYmplY3RcIjtcclxuaW1wb3J0IHtNYXRoVXRpbHN9IGZyb20gXCIuLi9tYXRoL01hdGhVdGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgRHJhd2FibGVPYmplY3Qge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2E6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hTm9ybWFsOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYk5vcm1hbDogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NOb3JtYWw6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYUNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JDb2xvcjogQ29sb3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jQ29sb3I6IENvbG9yO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NyZWVuQzogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeENBOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5QUI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlCQzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUNBOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWluWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWF4WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWluWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWF4WTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNBQlRvcExlZnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQkNUb3BMZWZ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0NBVG9wTGVmdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzLCBjOiBWZWN0b3IzLCBhTm9ybWFsOiBWZWN0b3IzLCBiTm9ybWFsOiBWZWN0b3IzLCBjTm9ybWFsOiBWZWN0b3IzLCBhQ29sb3IgPSBDb2xvci5SRUQsIGJDb2xvciA9IENvbG9yLkdSRUVOLCBjQ29sb3IgPSBDb2xvci5CTFVFKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICB0aGlzLl9jID0gYztcclxuICAgICAgICB0aGlzLl9hTm9ybWFsID0gYU5vcm1hbDtcclxuICAgICAgICB0aGlzLl9iTm9ybWFsID0gYk5vcm1hbDtcclxuICAgICAgICB0aGlzLl9jTm9ybWFsID0gY05vcm1hbDtcclxuICAgICAgICB0aGlzLl9hQ29sb3IgPSBhQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fYkNvbG9yID0gYkNvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NDb2xvciA9IGNDb2xvcjtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSB0aGlzLnRvU2NyZWVuWCh0aGlzLmEueCk7XHJcbiAgICAgICAgY29uc3QgeDIgPSB0aGlzLnRvU2NyZWVuWCh0aGlzLmIueCk7XHJcbiAgICAgICAgY29uc3QgeDMgPSB0aGlzLnRvU2NyZWVuWCh0aGlzLmMueCk7XHJcbiAgICAgICAgY29uc3QgeTEgPSB0aGlzLnRvU2NyZWVuWSh0aGlzLmEueSk7XHJcbiAgICAgICAgY29uc3QgeTIgPSB0aGlzLnRvU2NyZWVuWSh0aGlzLmIueSk7XHJcbiAgICAgICAgY29uc3QgeTMgPSB0aGlzLnRvU2NyZWVuWSh0aGlzLmMueSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRYMSA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHgxLCBTZXR0aW5ncy5zY3JlZW5XaWR0aCk7XHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFkxID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeTEsIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFgyID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeDIsIFNldHRpbmdzLnNjcmVlbldpZHRoKTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWTIgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh5MiwgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWDMgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh4MywgU2V0dGluZ3Muc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRZMyA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHkzLCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnNjcmVlbkEgPSBuZXcgVmVjdG9yMyhjbGlwcGVkWDEsIGNsaXBwZWRZMSk7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5CID0gbmV3IFZlY3RvcjMoY2xpcHBlZFgyLCBjbGlwcGVkWTIpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQyA9IG5ldyBWZWN0b3IzKGNsaXBwZWRYMywgY2xpcHBlZFkzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWluWCA9IE1hdGgubWluKHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMuX21heFggPSBNYXRoLm1heCh0aGlzLnNjcmVlbkEueCwgdGhpcy5zY3JlZW5CLngsIHRoaXMuc2NyZWVuQy54KTtcclxuICAgICAgICB0aGlzLl9taW5ZID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcbiAgICAgICAgdGhpcy5fbWF4WSA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS55LCB0aGlzLnNjcmVlbkIueSwgdGhpcy5zY3JlZW5DLnkpO1xyXG5cclxuICAgICAgICB0aGlzLmR4QUIgPSB0aGlzLnNjcmVlbkEueCAtIHRoaXMuc2NyZWVuQi54O1xyXG4gICAgICAgIHRoaXMuZHhCQyA9IHRoaXMuc2NyZWVuQi54IC0gdGhpcy5zY3JlZW5DLng7XHJcbiAgICAgICAgdGhpcy5keENBID0gdGhpcy5zY3JlZW5DLnggLSB0aGlzLnNjcmVlbkEueDtcclxuXHJcbiAgICAgICAgdGhpcy5keUFCID0gdGhpcy5zY3JlZW5BLnkgLSB0aGlzLnNjcmVlbkIueTtcclxuICAgICAgICB0aGlzLmR5QkMgPSB0aGlzLnNjcmVlbkIueSAtIHRoaXMuc2NyZWVuQy55O1xyXG4gICAgICAgIHRoaXMuZHlDQSA9IHRoaXMuc2NyZWVuQy55IC0gdGhpcy5zY3JlZW5BLnk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNBQlRvcExlZnQgPSB0aGlzLmR5QUIgPCAwIHx8ICh0aGlzLmR5QUIgPT09IDAgJiYgdGhpcy5keEFCID4gMCk7XHJcbiAgICAgICAgdGhpcy5pc0JDVG9wTGVmdCA9IHRoaXMuZHlCQyA8IDAgfHwgKHRoaXMuZHlCQyA9PT0gMCAmJiB0aGlzLmR4QkMgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQ0FUb3BMZWZ0ID0gdGhpcy5keUNBIDwgMCB8fCAodGhpcy5keUNBID09PSAwICYmIHRoaXMuZHhDQSA+IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhDb2xvcnMobmV3QUNvbG9yOiBDb2xvciwgbmV3QkNvbG9yOiBDb2xvciwgbmV3Q0NvbG9yOiBDb2xvcik6IFRyaWFuZ2xlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyaWFuZ2xlKHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIHRoaXMuYU5vcm1hbCwgdGhpcy5iTm9ybWFsLCB0aGlzLmNOb3JtYWwsIG5ld0FDb2xvciwgbmV3QkNvbG9yLCBuZXdDQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhOb3JtYWxzKG5ld0FOb3JtYWw6IFZlY3RvcjMsIG5ld0JOb3JtYWw6IFZlY3RvcjMsIG5ld0NOb3JtYWw6IFZlY3RvcjMpOiBUcmlhbmdsZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmlhbmdsZSh0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCBuZXdBTm9ybWFsLCBuZXdCTm9ybWFsLCBuZXdDTm9ybWFsLCB0aGlzLmFDb2xvciwgdGhpcy5iQ29sb3IsIHRoaXMuY0NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1RyaWFuZ2xlcygpOiBUcmlhbmdsZVtdIHtcclxuICAgICAgICByZXR1cm4gW3RoaXNdO1xyXG4gICAgfVxyXG5cclxuICAgIHRvTGFtYmRhQ29vcmRpbmF0ZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCBsYW1iZGFBID0gKHRoaXMuZHlCQyAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5QkMgKiAtdGhpcy5keENBICsgLXRoaXMuZHhCQyAqIC10aGlzLmR5Q0EpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFCID0gKHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpICsgLXRoaXMuZHhDQSAqICh5IC0gdGhpcy5zY3JlZW5DLnkpKSAvXHJcbiAgICAgICAgICAgICh0aGlzLmR5Q0EgKiB0aGlzLmR4QkMgKyAtdGhpcy5keENBICogdGhpcy5keUJDKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFtYmRhQyA9IDEgLSBsYW1iZGFBIC0gbGFtYmRhQjtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMobGFtYmRhQSwgbGFtYmRhQiwgbGFtYmRhQyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbih4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGlzQUJPayA9IHRoaXMuaXNBQlRvcExlZnQgP1xyXG4gICAgICAgICAgICB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4QUIgKiAoeSAtIHRoaXMuc2NyZWVuQS55KSAtIHRoaXMuZHlBQiAqICh4IC0gdGhpcy5zY3JlZW5BLngpID4gMDtcclxuXHJcbiAgICAgICAgY29uc3QgaXNCQ09rID0gdGhpcy5pc0JDVG9wTGVmdCA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhCQyAqICh5IC0gdGhpcy5zY3JlZW5CLnkpIC0gdGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkIueCkgPiAwO1xyXG5cclxuICAgICAgICBjb25zdCBpc0NBT2sgPSB0aGlzLmlzQ0FUb3BMZWZ0ID9cclxuICAgICAgICAgICAgdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkgLSB0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkgLSB0aGlzLmR5Q0EgKiAoeCAtIHRoaXMuc2NyZWVuQy54KSA+IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0FCT2sgJiYgaXNCQ09rICYmIGlzQ0FPaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvU2NyZWVuWCh4VG9Qcm9qZWN0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCh4VG9Qcm9qZWN0ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5XaWR0aCAqIDAuNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b1NjcmVlblkoeVRvUHJvamVjdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLmFicyhNYXRoVXRpbHMuY2xhbXBGcm9tWmVybygoeVRvUHJvamVjdCArIDEpICogU2V0dGluZ3Muc2NyZWVuSGVpZ2h0ICogMC41LCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpIC0gU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGEoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGIoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGMoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFOb3JtYWwoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FOb3JtYWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJOb3JtYWwoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JOb3JtYWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNOb3JtYWwoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NOb3JtYWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYkNvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYkNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pblgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4WCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhYO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5ZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4WTtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7UmFzdGVyaXplcn0gZnJvbSBcIi4vUmFzdGVyaXplclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9pby9vdXRwdXQvc2NyZWVuL1NldHRpbmdzXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRCaW5kZXJ9IGZyb20gXCIuL2lvL2lucHV0L2tleWJvYXJkL0tleWJvYXJkQmluZGVyXCI7XHJcbmltcG9ydCB7Q2FtZXJhfSBmcm9tIFwiLi9jYW1lcmEvQ2FtZXJhXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRJbnB1dERhdGF9IGZyb20gXCIuL2lvL2lucHV0L2tleWJvYXJkL0tleWJvYXJkSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7RmlsZUxvYWRlcn0gZnJvbSBcIi4vaW8vaW5wdXQvZmlsZS9GaWxlTG9hZGVyXCI7XHJcbmltcG9ydCB7T2JqTG9hZGVyfSBmcm9tIFwiLi9pby9pbnB1dC9tZXNoL09iakxvYWRlclwiO1xyXG5pbXBvcnQge1BvaW50TGlnaHR9IGZyb20gXCIuL2xpZ2h0L1BvaW50TGlnaHRcIjtcclxuaW1wb3J0IHtMaWdodEludGVuc2l0eX0gZnJvbSBcIi4vbGlnaHQvTGlnaHRJbnRlbnNpdHlcIjtcclxuaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0fSBmcm9tIFwiLi9saWdodC9EaXJlY3Rpb25hbExpZ2h0XCI7XHJcbmltcG9ydCB7RHJhd2FibGVPYmplY3R9IGZyb20gXCIuL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0XCI7XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RNZXNoZXMoKTogRHJhd2FibGVPYmplY3RbXSB7XHJcbiAgICBjb25zdCBtZXNoTG9hZGVyID0gbmV3IE9iakxvYWRlcigpO1xyXG5cclxuICAgIGNvbnN0IG1vbmtleU1lc2ggPSBtZXNoTG9hZGVyLmxvYWRNZXNoKEZpbGVMb2FkZXIubG9hZEZpbGUoXCJyZXNvdXJjZXMvbW9kZWxzL21vbmtleS5vYmpcIikpO1xyXG4gICAgbW9ua2V5TWVzaC50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoMC43NSwgMC43NSwgMC43NSkpO1xyXG5cclxuICAgIGNvbnN0IGN1YmVNZXNoID0gbWVzaExvYWRlci5sb2FkTWVzaChGaWxlTG9hZGVyLmxvYWRGaWxlKFwicmVzb3VyY2VzL21vZGVscy9jdWJlLm9ialwiKSk7XHJcbiAgICBjdWJlTWVzaC50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoMC41LCAwLjUsIDAuNSkpO1xyXG4gICAgY3ViZU1lc2gudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgVmVjdG9yMygxLjc1LCAtMS4yNSwgLTAuMjUpKTtcclxuXHJcbiAgICBjb25zdCBvY3RhaGVkcm9uTWVzaCA9IG1lc2hMb2FkZXIubG9hZE1lc2goRmlsZUxvYWRlci5sb2FkRmlsZShcInJlc291cmNlcy9tb2RlbHMvb2N0YWhlZHJvbi5vYmpcIikpO1xyXG4gICAgb2N0YWhlZHJvbk1lc2gudHJhbnNmb3JtLnNjYWxlKG5ldyBWZWN0b3IzKDAuMywgMC4zLCAwLjMpKTtcclxuICAgIG9jdGFoZWRyb25NZXNoLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IFZlY3RvcjMoLTIsIDEsIDApKTtcclxuXHJcbiAgICBjb25zdCBkb2RlY2FoZWRyb25NZXNoID0gbWVzaExvYWRlci5sb2FkTWVzaChGaWxlTG9hZGVyLmxvYWRGaWxlKFwicmVzb3VyY2VzL21vZGVscy9kb2RlY2FoZWRyb24ub2JqXCIpKTtcclxuICAgIGRvZGVjYWhlZHJvbk1lc2gudHJhbnNmb3JtLnNjYWxlKG5ldyBWZWN0b3IzKDAuMywgMC4zLCAwLjMpKTtcclxuICAgIGRvZGVjYWhlZHJvbk1lc2gudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgVmVjdG9yMygtMiwgLTEsIDApKTtcclxuXHJcbiAgICBjb25zdCB0ZXRyYWhlZHJvbk1lc2ggPSBtZXNoTG9hZGVyLmxvYWRNZXNoKEZpbGVMb2FkZXIubG9hZEZpbGUoXCJyZXNvdXJjZXMvbW9kZWxzL3RldHJhaGVkcm9uLm9ialwiKSk7XHJcbiAgICB0ZXRyYWhlZHJvbk1lc2gudHJhbnNmb3JtLnNjYWxlKG5ldyBWZWN0b3IzKDAuMywgMC4zLCAwLjMpKTtcclxuICAgIHRldHJhaGVkcm9uTWVzaC50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBWZWN0b3IzKDIsIDEsIDApKTtcclxuXHJcbiAgICBjb25zdCBzcGhlcmVNZXNoID0gbWVzaExvYWRlci5sb2FkTWVzaChGaWxlTG9hZGVyLmxvYWRGaWxlKFwicmVzb3VyY2VzL21vZGVscy9zcGhlcmUub2JqXCIpKTtcclxuICAgIHNwaGVyZU1lc2gudHJhbnNmb3JtLnNjYWxlKG5ldyBWZWN0b3IzKDAuMDE1LCAwLjAxNSwgMC4wMTUpKTtcclxuICAgIHNwaGVyZU1lc2gudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgVmVjdG9yMygtMiwgMCwgMCkpO1xyXG5cclxuICAgIGNvbnN0IGljb3NhaGVkcm9uTWVzaCA9IG1lc2hMb2FkZXIubG9hZE1lc2goRmlsZUxvYWRlci5sb2FkRmlsZShcInJlc291cmNlcy9tb2RlbHMvaWNvc2FoZWRyb24ub2JqXCIpKTtcclxuICAgIGljb3NhaGVkcm9uTWVzaC50cmFuc2Zvcm0uc2NhbGUobmV3IFZlY3RvcjMoMC41LCAwLjUsIDAuNSkpO1xyXG4gICAgaWNvc2FoZWRyb25NZXNoLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IFZlY3RvcjMoMiwgMCwgMCkpO1xyXG4gICAgcmV0dXJuIFttb25rZXlNZXNoLCBjdWJlTWVzaCwgb2N0YWhlZHJvbk1lc2gsIGRvZGVjYWhlZHJvbk1lc2gsIHRldHJhaGVkcm9uTWVzaCwgc3BoZXJlTWVzaCwgaWNvc2FoZWRyb25NZXNoXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcmVlbkNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0IHRhcmdldFNjcmVlbiA9IG5ldyBTY3JlZW5IYW5kbGVyKGNhbnZhcyk7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5XaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIFNldHRpbmdzLnNjcmVlbkhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBLZXlib2FyZEJpbmRlci5yZWdpc3RlcktleUJpbmRpbmdzKCk7XHJcblxyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG4gICAgY2FtZXJhLnNldExvb2tBdChLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XHJcbiAgICBjYW1lcmEuc2V0UGVyc3BlY3RpdmUoNDUsIDE2LzksIDAuMSwgMTAwKTtcclxuXHJcbiAgICBjb25zdCBhbWJpZW50TGlnaHRDb2xvciA9IG5ldyBMaWdodEludGVuc2l0eSgwLCAwLCAwKTtcclxuICAgIGNvbnN0IHNwZWN1bGFyTGlnaHRDb2xvciA9IG5ldyBMaWdodEludGVuc2l0eSgxLCAwLCAxKTtcclxuICAgIGNvbnN0IGxpZ2h0MSA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24sIGFtYmllbnRMaWdodENvbG9yLCBuZXcgTGlnaHRJbnRlbnNpdHkoMSwgMCwgMCksIHNwZWN1bGFyTGlnaHRDb2xvciwgMjApO1xyXG4gICAgY29uc3QgbGlnaHQyID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoIG5ldyBWZWN0b3IzKC0zLCAwLCAxLjUpLCBhbWJpZW50TGlnaHRDb2xvciwgbmV3IExpZ2h0SW50ZW5zaXR5KDAsIDAsIDEpLCBzcGVjdWxhckxpZ2h0Q29sb3IsIDIwKTtcclxuICAgIGNvbnN0IGxpZ2h0MyA9IG5ldyBQb2ludExpZ2h0KCBuZXcgVmVjdG9yMygwLCAxLCAyKSwgYW1iaWVudExpZ2h0Q29sb3IsIG5ldyBMaWdodEludGVuc2l0eSgwLjEsIDAsIDAuMSksIG5ldyBMaWdodEludGVuc2l0eSgwLjA1LCAwLjA1LCAwLjA1KSwgMjApO1xyXG5cclxuICAgIGNvbnN0IGxpZ2h0cyA9IFtsaWdodDEsIGxpZ2h0MiwgbGlnaHQzXTtcclxuICAgIGNvbnN0IGRyYXdhYmxlT2JqZWN0cyA9IGNvbnN0cnVjdE1lc2hlcygpO1xyXG4gICAgY29uc3QgcmFzdGVyaXplcjogUmFzdGVyaXplciA9IG5ldyBSYXN0ZXJpemVyKHRhcmdldFNjcmVlbiwgZHJhd2FibGVPYmplY3RzLCBsaWdodHMsIGNhbWVyYSk7XHJcbiAgICByYXN0ZXJpemVyLnVwZGF0ZSgpO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0aWFsaXplKTtcclxuXHJcbiIsImV4cG9ydCBjbGFzcyBGaWxlTG9hZGVyIHtcclxuXHJcbiAgICBzdGF0aWMgbG9hZEZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBodHRwUmVxdWVzdC5vcGVuKFwiR0VUXCIsIGZpbGVQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgaHR0cFJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIGlmIChodHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7S2V5Ym9hcmRJbnB1dERhdGF9IGZyb20gXCIuL0tleWJvYXJkSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uLy4uLy4uL21hdGgvVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkQmluZGVyIHtcclxuICAgIHN0YXRpYyByZWdpc3RlcktleUJpbmRpbmdzKCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2EnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnggLSAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54IC0gMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnZCcpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnggKyAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAndycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueiAtIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueiAtIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdzJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi56ICsgMC4wMSk7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC56ICsgMC4wMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICcrJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55ICsgMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnkgKyAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnkgLSAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueSAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ24nKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25BbmdsZSAtPSAwLjE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ20nKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25BbmdsZSArPSAwLjE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdvJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuc2NhbGluZyAtPSAwLjAwMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncCcpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnNjYWxpbmcgKz0gMC4wMDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICd1Jykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi55ICsgMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdqJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi55IC0gMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnggKyAwLjEsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaCcpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnggLSAwLjEsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZElucHV0RGF0YSB7XHJcbiAgICBzdGF0aWMgY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCA1KTtcclxuICAgIHN0YXRpYyBjYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMygwLCAwLCAwKTtcclxuXHJcbiAgICBzdGF0aWMgc2NhbGluZyA9IDE7XHJcblxyXG4gICAgc3RhdGljIHJvdGF0aW9uRGlyZWN0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICBzdGF0aWMgcm90YXRpb25BbmdsZSA9IDA7XHJcblxyXG4gICAgc3RhdGljIGxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMygzLCAwLCAxLjUpO1xyXG59IiwiaW1wb3J0IHtNZXNoTG9hZGVyfSBmcm9tIFwiLi9NZXNoTG9hZGVyXCI7XHJcbmltcG9ydCB7TWVzaH0gZnJvbSBcIi4uLy4uLy4uL2dlb21ldHJ5L01lc2hcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuLi8uLi8uLi9nZW9tZXRyeS9UcmlhbmdsZVwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vLi4vLi4vbGlnaHQvQ29sb3JcIjtcclxuaW1wb3J0IHtOb3JtYWxzQ3JlYXRvcn0gZnJvbSBcIi4uLy4uLy4uL2dlb21ldHJ5L05vcm1hbHNDcmVhdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqTG9hZGVyIGltcGxlbWVudHMgTWVzaExvYWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSB2ZXJ0aWNlczogVmVjdG9yM1tdID0gW107XHJcbiAgICBwcml2YXRlIG5vcm1hbHM6IFZlY3RvcjNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBmYWNlczogVHJpYW5nbGVbXSA9IFtdO1xyXG5cclxuICAgIGxvYWRNZXNoKG1lc2hBc1RleHQ6IHN0cmluZyk6IE1lc2gge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICBjb25zdCBmaWxlTGluZXMgPSBtZXNoQXNUZXh0LnNwbGl0KC9cXHI/XFxuLyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGZpbGVMaW5lcykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lU2VnbWVudHMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVIZWFkZXIgPSBsaW5lU2VnbWVudHNbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEYXRhID0gbGluZVNlZ21lbnRzLnNsaWNlKDEsIGxpbmVTZWdtZW50cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAobGluZUhlYWRlciA9PT0gXCJ2XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VWZXJ0ZXgobGluZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmVIZWFkZXIgPT09IFwidm5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZU5vcm1hbChsaW5lRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZUhlYWRlciA9PT0gXCJmXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VGYWNlKGxpbmVEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE1lc2godGhpcy5mYWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZVZlcnRleCh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4ID0gbmV3IFZlY3RvcjMocGFyc2VGbG9hdCh2YWx1ZXNbMF0pLCBwYXJzZUZsb2F0KHZhbHVlc1sxXSksIHBhcnNlRmxvYXQodmFsdWVzWzJdKSk7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHZlcnRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZU5vcm1hbCh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMocGFyc2VGbG9hdCh2YWx1ZXNbMF0pLCBwYXJzZUZsb2F0KHZhbHVlc1sxXSksIHBhcnNlRmxvYXQodmFsdWVzWzJdKSk7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxzLnB1c2gobm9ybWFsLmdldE5vcm1hbGl6ZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUZhY2UodmFsdWVzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZhY2VWZXJ0ZXhJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGZhY2VUZXh0dXJlSW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBjb25zdCBmYWNlTm9ybWFsSW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJ0ZXhJbmZvIG9mIHZhbHVlcykge1xyXG4gICAgICAgICAgICBjb25zdCBzcGxpdFZlcnRleEluZm8gPSB2ZXJ0ZXhJbmZvLnNwbGl0KC9cXC8vKTtcclxuICAgICAgICAgICAgZmFjZVZlcnRleEluZGljZXMucHVzaChwYXJzZUludChzcGxpdFZlcnRleEluZm9bMF0pKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzcGxpdFZlcnRleEluZm8ubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcGxpdFZlcnRleEluZm9bMV0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2VUZXh0dXJlSW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1sxXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwbGl0VmVydGV4SW5mby5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0VmVydGV4SW5mb1sxXSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZVRleHR1cmVJbmRpY2VzLnB1c2gocGFyc2VJbnQoc3BsaXRWZXJ0ZXhJbmZvWzFdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvWzJdICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsSW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1syXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmYWNlID0gbmV3IFRyaWFuZ2xlKHRoaXMudmVydGljZXNbKGZhY2VWZXJ0ZXhJbmRpY2VzWzBdIC0gMSldLCB0aGlzLnZlcnRpY2VzWyhmYWNlVmVydGV4SW5kaWNlc1sxXSAtIDEpXSwgdGhpcy52ZXJ0aWNlc1soZmFjZVZlcnRleEluZGljZXNbMl0gLSAxKV0sXHJcbiAgICAgICAgICAgIHRoaXMubm9ybWFsc1soZmFjZU5vcm1hbEluZGljZXNbMF0gLSAxKV0sIHRoaXMubm9ybWFsc1soZmFjZU5vcm1hbEluZGljZXNbMV0gLSAxKV0sIHRoaXMubm9ybWFsc1soZmFjZU5vcm1hbEluZGljZXNbMl0gLSAxKV0sXHJcbiAgICAgICAgICAgIENvbG9yLldISVRFLCBDb2xvci5XSElURSwgQ29sb3IuV0hJVEUpO1xyXG5cclxuICAgICAgICBpZihmYWNlLmFOb3JtYWwgPT0gdW5kZWZpbmVkIHx8IGZhY2UuYk5vcm1hbCA9PSB1bmRlZmluZWQgfHwgZmFjZS5jTm9ybWFsID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmYWNlID0gTm9ybWFsc0NyZWF0b3IuY3JlYXRlTm9ybWFscyhmYWNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmFjZXMucHVzaChmYWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMgPSBbXTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gW107XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vLi4vLi4vbGlnaHQvQ29sb3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vU2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW5CdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogVWludDhDbGFtcGVkQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NyZWVuV2lkdGg6IG51bWJlciwgc2NyZWVuSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2NyZWVuV2lkdGggKiBzY3JlZW5IZWlnaHQgKiA0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYnVmZmVyTGVuZ3RoID0gdGhpcy5fYnVmZmVyLmxlbmd0aDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSs9NCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXJbaV0gPSBTZXR0aW5ncy5jbGVhckNvbG9yLnI7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcltpKzFdID0gU2V0dGluZ3MuY2xlYXJDb2xvci5nO1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXJbaSsyXSA9IFNldHRpbmdzLmNsZWFyQ29sb3IuYjtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyW2krM10gPSBTZXR0aW5ncy5jbGVhckNvbG9yLmE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKGluZGV4OiBudW1iZXIsIGNvbG9yOiBDb2xvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleF0gPSBjb2xvci5yO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDFdID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAyXSA9IGNvbG9yLmI7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgM10gPSBjb2xvci5hO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBidWZmZXIoKTogVWludDhDbGFtcGVkQXJyYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi9TZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbkhhbmRsZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhbnZhc0N0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2hlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBpeGVsc0Zyb21CdWZmZXIoY29sb3JCdWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGNvbG9yQnVmZmVyLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclNjcmVlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguY2xlYXJSZWN0KDAsIDAsIFNldHRpbmdzLnNjcmVlbldpZHRoLCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZwc0Rpc3BsYXkoZnBzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDhhMzAwXCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxUZXh0KFwiRlBTOiBcIiArIGZwcywgMTAsIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbG9yfSBmcm9tIFwiLi4vLi4vLi4vbGlnaHQvQ29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBzdGF0aWMgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHN0YXRpYyBzY3JlZW5IZWlnaHQ6IG51bWJlcjtcclxuICAgIHN0YXRpYyBjbGVhckNvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCA1MCk7XHJcbn0iLCJpbXBvcnQge0xpZ2h0SW50ZW5zaXR5fSBmcm9tIFwiLi9MaWdodEludGVuc2l0eVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbG9yIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSRUQgPSBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR1JFRU4gPSBuZXcgQ29sb3IoMCwgMjU1LCAwKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQkxVRSA9IG5ldyBDb2xvcigwLCAwLCAyNTUpO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCTEFDSyA9IG5ldyBDb2xvcigwLCAwLCAwKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgV0hJVEUgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IociA9IDAsIGcgPSAwLCBiID0gMCwgYSA9IDI1NSkge1xyXG4gICAgICAgIHRoaXMuX3IgPSByO1xyXG4gICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG90aGVyOiBMaWdodEludGVuc2l0eSk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMuciAqIG90aGVyLnIsIHRoaXMuZyAqIG90aGVyLmcsIHRoaXMuYiAqIG90aGVyLmIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0xpZ2h0fSBmcm9tIFwiLi9MaWdodFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtMaWdodEludGVuc2l0eX0gZnJvbSBcIi4vTGlnaHRJbnRlbnNpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzLCBhbWJpZW50OiBMaWdodEludGVuc2l0eSwgZGlmZnVzZTogTGlnaHRJbnRlbnNpdHksIHNwZWN1bGFyOiBMaWdodEludGVuc2l0eSwgc2hpbmluZXNzOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbiwgYW1iaWVudCwgZGlmZnVzZSwgc3BlY3VsYXIsIHNoaW5pbmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlVmVydGV4TGlnaHRJbnRlbnNpdHkodmVydGV4OiBWZWN0b3IzLCBub3JtYWw6IFZlY3RvcjMpOiBMaWdodEludGVuc2l0eSB7XHJcbiAgICAgICAgY29uc3QgTiA9IG5vcm1hbC5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgViA9IHZlcnRleC5tdWx0aXBseSgtMSkuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IFIgPSB0aGlzLnBvc2l0aW9uLmdldFJlZmxlY3RlZEJ5KE4pLmdldE5vcm1hbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaUQgPSB0aGlzLnBvc2l0aW9uLmRvdChOKTtcclxuICAgICAgICBjb25zdCBpUyA9IE1hdGgucG93KFIuZG90KFYpLCB0aGlzLnNoaW5pbmVzcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJJbnRlbnNpdHkgPSAodGhpcy5hbWJpZW50LnIgKyAoaUQgLyAyICogdGhpcy5kaWZmdXNlLnIpICsgKGlTICogdGhpcy5zcGVjdWxhci5yKSk7XHJcbiAgICAgICAgY29uc3QgZ0ludGVuc2l0eSA9ICh0aGlzLmFtYmllbnQuZyArIChpRCAvIDIgKiB0aGlzLmRpZmZ1c2UuZykgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLmcpKTtcclxuICAgICAgICBjb25zdCBiSW50ZW5zaXR5ID0gKHRoaXMuYW1iaWVudC5iICsgKGlEIC8gMiAqIHRoaXMuZGlmZnVzZS5iKSArIChpUyAqIHRoaXMuc3BlY3VsYXIuYikpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IExpZ2h0SW50ZW5zaXR5KHJJbnRlbnNpdHksIGdJbnRlbnNpdHksIGJJbnRlbnNpdHkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7TGlnaHRJbnRlbnNpdHl9IGZyb20gXCIuL0xpZ2h0SW50ZW5zaXR5XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGlnaHQge1xyXG5cclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYW1iaWVudDogTGlnaHRJbnRlbnNpdHk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kaWZmdXNlOiBMaWdodEludGVuc2l0eTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NwZWN1bGFyOiBMaWdodEludGVuc2l0eTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NoaW5pbmVzczogbnVtYmVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yMywgYW1iaWVudDogTGlnaHRJbnRlbnNpdHksIGRpZmZ1c2U6IExpZ2h0SW50ZW5zaXR5LCBzcGVjdWxhcjogTGlnaHRJbnRlbnNpdHksIHNoaW5pbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLl9hbWJpZW50ID0gYW1iaWVudDtcclxuICAgICAgICB0aGlzLl9kaWZmdXNlID0gZGlmZnVzZTtcclxuICAgICAgICB0aGlzLl9zcGVjdWxhciA9IHNwZWN1bGFyO1xyXG4gICAgICAgIHRoaXMuX3NoaW5pbmVzcyA9IHNoaW5pbmVzcztcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBjYWxjdWxhdGVWZXJ0ZXhMaWdodEludGVuc2l0eSh2ZXJ0ZXg6IFZlY3RvcjMsIG5vcm1hbDogVmVjdG9yMyk6IExpZ2h0SW50ZW5zaXR5O1xyXG5cclxuICAgIGdldCBwb3NpdGlvbigpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBWZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYW1iaWVudCgpOiBMaWdodEludGVuc2l0eSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtYmllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpZmZ1c2UoKTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWZmdXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcGVjdWxhcigpOiBMaWdodEludGVuc2l0eSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWN1bGFyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaGluaW5lc3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hpbmluZXNzO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIExpZ2h0SW50ZW5zaXR5IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IociA9IDAsIGcgPSAwLCBiID0gMCkge1xyXG4gICAgICAgIHRoaXMuX3IgPSByO1xyXG4gICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChvdGhlcjogTGlnaHRJbnRlbnNpdHkpOiBMaWdodEludGVuc2l0eSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaWdodEludGVuc2l0eSh0aGlzLnIgKyBvdGhlci5yLCB0aGlzLmcgKyBvdGhlci5nLCB0aGlzLmIgKyBvdGhlci5iKTtcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogTGlnaHRJbnRlbnNpdHkpOiBMaWdodEludGVuc2l0eVxyXG4gICAgbXVsdGlwbHkob3RoZXI6IG51bWJlcik6IExpZ2h0SW50ZW5zaXR5XHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIExpZ2h0SW50ZW5zaXR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlnaHRJbnRlbnNpdHkodGhpcy5yICogb3RoZXIuciwgdGhpcy5nICogb3RoZXIuZywgdGhpcy5iICogb3RoZXIuYik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaWdodEludGVuc2l0eSh0aGlzLnIgKiBvdGhlciwgdGhpcy5nICogb3RoZXIsIHRoaXMuYiAqIG90aGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0xpZ2h0fSBmcm9tIFwiLi9MaWdodFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtMaWdodEludGVuc2l0eX0gZnJvbSBcIi4vTGlnaHRJbnRlbnNpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzLCBhbWJpZW50OiBMaWdodEludGVuc2l0eSwgZGlmZnVzZTogTGlnaHRJbnRlbnNpdHksIHNwZWN1bGFyOiBMaWdodEludGVuc2l0eSwgc2hpbmluZXNzOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbiwgYW1iaWVudCwgZGlmZnVzZSwgc3BlY3VsYXIsIHNoaW5pbmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlVmVydGV4TGlnaHRJbnRlbnNpdHkodmVydGV4OiBWZWN0b3IzLCBub3JtYWw6IFZlY3RvcjMpOiBMaWdodEludGVuc2l0eSB7XHJcbiAgICAgICAgY29uc3QgTiA9IG5vcm1hbC5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgbGV0IFYgPSB2ZXJ0ZXgubXVsdGlwbHkoLTEpO1xyXG4gICAgICAgIGNvbnN0IEwgPSB0aGlzLnBvc2l0aW9uLnN1YnN0cmFjdChWKS5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgViA9IFYuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IFIgPSBMLmdldFJlZmxlY3RlZEJ5KE4pO1xyXG5cclxuICAgICAgICBjb25zdCBpRCA9IEwuZG90KE4pO1xyXG4gICAgICAgIGNvbnN0IGlTID0gTWF0aC5wb3coUi5kb3QoViksIHRoaXMuc2hpbmluZXNzKTtcclxuXHJcbiAgICAgICAgY29uc3QgckludGVuc2l0eSA9ICh0aGlzLmFtYmllbnQuciArIChpRCAqIHRoaXMuZGlmZnVzZS5yKSArIChpUyAqIHRoaXMuc3BlY3VsYXIucikpO1xyXG4gICAgICAgIGNvbnN0IGdJbnRlbnNpdHkgPSAodGhpcy5hbWJpZW50LmcgKyAoaUQgKiB0aGlzLmRpZmZ1c2UuZykgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLmcpKTtcclxuICAgICAgICBjb25zdCBiSW50ZW5zaXR5ID0gKHRoaXMuYW1iaWVudC5iICsgKGlEICogdGhpcy5kaWZmdXNlLmIpICsgKGlTICogdGhpcy5zcGVjdWxhci5iKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTGlnaHRJbnRlbnNpdHkockludGVuc2l0eSwgZ0ludGVuc2l0eSwgYkludGVuc2l0eSk7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIE1hdGhVdGlscyB7XHJcblxyXG4gICAgc3RhdGljIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGFtcEZyb21aZXJvKHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcCh2YWx1ZSwgMCwgbWF4KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vVmVjdG9yM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeDR4NCB7XHJcblxyXG4gICAgcmVhZG9ubHkgZGF0YTogW0Zsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheV07XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXNJZGVudGl0eSA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYoYXNJZGVudGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMV0pXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoNCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KDQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVJZGVudGl0eSgpOiBNYXRyaXg0eDQge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NHg0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG90aGVyOiBNYXRyaXg0eDQpOiBNYXRyaXg0eDRcclxuICAgIG11bHRpcGx5KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICBjb25zdCB3ID0gMTtcclxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMF1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0eSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVsxXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR6ID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzJdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHcgPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbM11bM10gKiB3O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModHggLyB0dywgdHkgLyB0dywgdHogLyB0dyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVswXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzFdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMl0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVszXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVswXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzFdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMl0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVszXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVswXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzFdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMl0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVszXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVswXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMF0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzBdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVswXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMF07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzFdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVsxXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMV0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzFdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVsxXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMl0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzJdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVsyXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMl0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzJdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVszXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bM10gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzNdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVszXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bM107XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yMyB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcclxuICAgICAgICB0aGlzLl94ID0geDtcclxuICAgICAgICB0aGlzLl95ID0geTtcclxuICAgICAgICB0aGlzLl96ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmV0d2VlblBvaW50cyhwMTogVmVjdG9yMywgcDI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCB4ID0gcDEuX3ggLSBwMi5feDtcclxuICAgICAgICBjb25zdCB5ID0gcDEuX3kgLSBwMi5feTtcclxuICAgICAgICBjb25zdCB6ID0gcDEuX3ogLSBwMi5fejtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCwgeSwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWFnbml0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3opO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vcm1hbGl6ZWQoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuZ2V0TWFnbml0dWRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlZmxlY3RlZEJ5KG5vcm1hbDogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IG4gPSBub3JtYWwuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnN0cmFjdChuLm11bHRpcGx5KDIgKiB0aGlzLmRvdChuKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdChvdGhlcjogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiBvdGhlci5feCArIHRoaXMuX3kgKiBvdGhlci5feSArIHRoaXMuX3ogKiBvdGhlci5fejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyhvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygodGhpcy5feSAqIG90aGVyLl96KSAtICh0aGlzLl96ICogb3RoZXIuX3kpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feiAqIG90aGVyLl94KSAtICh0aGlzLl94ICogb3RoZXIuX3opLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5feCAqIG90aGVyLl95KSAtICh0aGlzLl95ICogb3RoZXIuX3gpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCArIG90aGVyLl94LCB0aGlzLl95ICsgb3RoZXIuX3ksIHRoaXMuX3ogKyBvdGhlci5feilcclxuICAgIH1cclxuXHJcbiAgICBzdWJzdHJhY3Qob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAtIG90aGVyLl94LCB0aGlzLl95IC0gb3RoZXIuX3ksIHRoaXMuX3ogLSBvdGhlci5feilcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogYW55KTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgVmVjdG9yMykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLl94LCB0aGlzLl95ICogb3RoZXIuX3ksIHRoaXMuX3ogKiBvdGhlci5feSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjModGhpcy5feCAqIG90aGVyLCB0aGlzLl95ICogb3RoZXIsIHRoaXMuX3ogKiBvdGhlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGl2aWRlKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBudW1iZXIpOiBWZWN0b3IzXHJcbiAgICBkaXZpZGUob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlci5feCwgdGhpcy5feSAvIG90aGVyLl95LCB0aGlzLl96IC8gb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLyBvdGhlciwgdGhpcy5feSAvIG90aGVyLCB0aGlzLl96IC8gb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96O1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==