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
function initialize() {
    const canvas = document.getElementById("screenCanvas");
    const targetScreen = new ScreenHandler_1.ScreenHandler(canvas);
    Settings_1.Settings.screenWidth = canvas.width;
    Settings_1.Settings.screenHeight = canvas.height;
    KeyboardBinder_1.KeyboardBinder.registerKeyBindings();
    const camera = new Camera_1.Camera();
    camera.setLookAt(KeyboardInputData_1.KeyboardInputData.cameraPosition, KeyboardInputData_1.KeyboardInputData.cameraTarget, new Vector3_1.Vector3(0, 1, 0));
    camera.setPerspective(45, 16 / 9, 0.1, 100);
    const objText = FileLoader_1.FileLoader.loadFile("resources/models/dodecahedron.obj");
    const meshLoader = new ObjLoader_1.ObjLoader();
    const objMesh = meshLoader.loadMesh(objText);
    // objMesh.transform.scale(new Vector3(0.5, 0.5, 0.5));
    // objMesh.transform.translate(new Vector3(0, 0, -10));
    // objMesh.transform.translate(new Vector3(-0.5, -0.5, 0));
    const ambientLightColor = new LightIntensity_1.LightIntensity(0, 0, 0);
    const specularLightColor = new LightIntensity_1.LightIntensity(1, 0, 1);
    const light = new PointLight_1.PointLight(KeyboardInputData_1.KeyboardInputData.lightPosition, ambientLightColor, new LightIntensity_1.LightIntensity(1, 0, 0), specularLightColor, 20);
    const light2 = new PointLight_1.PointLight(new Vector3_1.Vector3(-3, 0, 1.5), ambientLightColor, new LightIntensity_1.LightIntensity(0, 0, 1), specularLightColor, 20);
    const rasterizer = new Rasterizer_1.Rasterizer(targetScreen, [objMesh], [light, light2], camera);
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
        const white = new Color_1.Color(255, 255, 255);
        let face = new Triangle_1.Triangle(this.vertices[(faceVertexIndices[0] - 1)], this.vertices[(faceVertexIndices[1] - 1)], this.vertices[(faceVertexIndices[2] - 1)], this.normals[(faceNormalIndices[0] - 1)], this.normals[(faceNormalIndices[1] - 1)], this.normals[(faceNormalIndices[2] - 1)], white, white, white);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jYW1lcmEvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L0RyYXdhYmxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L01lc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvTm9ybWFsc0NyZWF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2VvbWV0cnkvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dlb21ldHJ5L1RyaWFuZ2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2lvL2lucHV0L2ZpbGUvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZEJpbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9pbnB1dC9tZXNoL09iakxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9Db2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9MaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9MaWdodEludGVuc2l0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWdodC9Qb2ludExpZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvTWF0aFV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvTWF0cml4NHg0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hdGgvVmVjdG9yMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRkEsb0lBQTZEO0FBQzdELHlGQUFvQztBQUNwQyw2RkFBdUM7QUFFdkMscUpBQXdFO0FBR3hFLG9IQUFzRDtBQUV0RCxNQUFhLFVBQVU7SUFRbkIsWUFBWSxZQUEyQixFQUFFLGVBQWlDLEVBQUUsTUFBZSxFQUFFLE1BQWM7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QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsY0FB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UyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsVUFBVSxDQUFDLFNBQWdCLEVBQUUsU0FBZ0IsRUFBRSxTQUFnQjtRQUMzRCxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxVQUFtQixFQUFFLFVBQW1CLEVBQUUsVUFBbUI7UUFDckUsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNwQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsSUFB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkgsT0FBTyxJQUFJLGlCQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxD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QUMsS0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFjO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUMzQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQzNDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBYztRQUNkLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbEYsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFjO1FBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbEYsQ0FBQztJQUlELFFBQVEsQ0FBQyxLQUFVO1FBQ2YsSUFBSSxLQUFLLFlBQVksT0FBTyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakY7YUFBTTtZQUNILE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBSUQsTUFBTSxDQUFDLEtBQVU7UUFDYixJQUFJLEtBQUssWUFBWSxPQUFPLEVBQUU7WUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNqRjthQUFNO1lBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztTQUN4RTtJQUNMLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQWpGRCwwQkFpRkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0cy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7U2NyZWVuSGFuZGxlcn0gZnJvbSBcIi4vaW8vb3V0cHV0L3NjcmVlbi9TY3JlZW5IYW5kbGVyXCI7XHJcbmltcG9ydCB7VHJpYW5nbGV9IGZyb20gXCIuL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcbmltcG9ydCB7U2NyZWVuQnVmZmVyfSBmcm9tIFwiLi9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkJ1ZmZlclwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiLi9saWdodC9Db2xvclwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge0NhbWVyYX0gZnJvbSBcIi4vY2FtZXJhL0NhbWVyYVwiO1xyXG5pbXBvcnQge0tleWJvYXJkSW5wdXREYXRhfSBmcm9tIFwiLi9pby9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0RGF0YVwiO1xyXG5pbXBvcnQge0RyYXdhYmxlT2JqZWN0fSBmcm9tIFwiLi9nZW9tZXRyeS9EcmF3YWJsZU9iamVjdFwiO1xyXG5pbXBvcnQge0xpZ2h0fSBmcm9tIFwiLi9saWdodC9MaWdodFwiO1xyXG5pbXBvcnQge0xpZ2h0SW50ZW5zaXR5fSBmcm9tIFwiLi9saWdodC9MaWdodEludGVuc2l0eVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGFyZ2V0U2NyZWVuOiBTY3JlZW5IYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxpZ2h0czogTGlnaHRbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FtZXJhOiBDYW1lcmE7XHJcbiAgICBwcml2YXRlIGxhc3RDYWxsZWRUaW1lOiBET01IaWdoUmVzVGltZVN0YW1wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldFNjcmVlbjogU2NyZWVuSGFuZGxlciwgZHJhd2FibGVPYmplY3RzOiBEcmF3YWJsZU9iamVjdFtdLCBsaWdodHM6IExpZ2h0W10sIGNhbWVyYTogQ2FtZXJhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTY3JlZW4gPSB0YXJnZXRTY3JlZW47XHJcbiAgICAgICAgbGV0IGFjY3VtdWxhdGVkVHJpYW5nbGVzOiBUcmlhbmdsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBkcmF3YWJsZU9iamVjdCBvZiBkcmF3YWJsZU9iamVjdHMpIHtcclxuICAgICAgICAgICAgYWNjdW11bGF0ZWRUcmlhbmdsZXMgPSBhY2N1bXVsYXRlZFRyaWFuZ2xlcy5jb25jYXQoZHJhd2FibGVPYmplY3QudG9UcmlhbmdsZXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gYWNjdW11bGF0ZWRUcmlhbmdsZXM7XHJcbiAgICAgICAgdGhpcy5saWdodHMgPSBsaWdodHM7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmlhbmdsZXNUb1JlbmRlciA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnNldExvb2tBdChLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XHJcbiAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ZWRUcmlhbmdsZSA9IHRoaXMuY2FtZXJhLnByb2plY3QodHJpYW5nbGUpO1xyXG4gICAgICAgICAgICB0cmlhbmdsZXNUb1JlbmRlci5wdXNoKHRoaXMuZW5saWdodGVuVHJpYW5nbGUocHJvamVjdGVkVHJpYW5nbGUpKTtcclxuXHJcbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICAgICAgIHRyaWFuZ2xlLnRyYW5zZm9ybS5zY2FsZShuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nLCBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nLCBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkRpcmVjdGlvbi5nZXRNYWduaXR1ZGUoKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmdsZS50cmFuc2Zvcm0ucm90YXRlKEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uRGlyZWN0aW9uLCBLZXlib2FyZElucHV0RGF0YS5yb3RhdGlvbkFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saWdodHNbMF0ucG9zaXRpb24gPSBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5jbGVhclNjcmVlbigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRyaWFuZ2xlc1RvUmVuZGVyKTtcclxuICAgICAgICB0aGlzLnRhcmdldFNjcmVlbi5zZXRGcHNEaXNwbGF5KHRoaXMuY2FsY3VsYXRlRnBzKCkpO1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmxpZ2h0ZW5UcmlhbmdsZSh0cmlhbmdsZTogVHJpYW5nbGUpOiBUcmlhbmdsZSB7XHJcbiAgICAgICAgbGV0IGFMaWdodEludGVuc2l0eSA9IG5ldyBMaWdodEludGVuc2l0eSgpO1xyXG4gICAgICAgIGxldCBiTGlnaHRJbnRlbnNpdHkgPSBuZXcgTGlnaHRJbnRlbnNpdHkoKTtcclxuICAgICAgICBsZXQgY0xpZ2h0SW50ZW5zaXR5ID0gbmV3IExpZ2h0SW50ZW5zaXR5KCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBsaWdodCBvZiB0aGlzLmxpZ2h0cykge1xyXG4gICAgICAgICAgICBhTGlnaHRJbnRlbnNpdHkgPSBhTGlnaHRJbnRlbnNpdHkuYWRkKGxpZ2h0LmNhbGN1bGF0ZVZlcnRleExpZ2h0SW50ZW5zaXR5KHRyaWFuZ2xlLmEsIHRyaWFuZ2xlLmFOb3JtYWwpKTtcclxuICAgICAgICAgICAgYkxpZ2h0SW50ZW5zaXR5ID0gYkxpZ2h0SW50ZW5zaXR5LmFkZChsaWdodC5jYWxjdWxhdGVWZXJ0ZXhMaWdodEludGVuc2l0eSh0cmlhbmdsZS5iLCB0cmlhbmdsZS5iTm9ybWFsKSk7XHJcbiAgICAgICAgICAgIGNMaWdodEludGVuc2l0eSA9IGNMaWdodEludGVuc2l0eS5hZGQobGlnaHQuY2FsY3VsYXRlVmVydGV4TGlnaHRJbnRlbnNpdHkodHJpYW5nbGUuYywgdHJpYW5nbGUuY05vcm1hbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdBQ29sb3IgPSB0cmlhbmdsZS5hQ29sb3IubXVsdGlwbHkoYUxpZ2h0SW50ZW5zaXR5KTtcclxuICAgICAgICBjb25zdCBuZXdCQ29sb3IgPSB0cmlhbmdsZS5iQ29sb3IubXVsdGlwbHkoYkxpZ2h0SW50ZW5zaXR5KTtcclxuICAgICAgICBjb25zdCBuZXdDQ29sb3IgPSB0cmlhbmdsZS5jQ29sb3IubXVsdGlwbHkoY0xpZ2h0SW50ZW5zaXR5KTtcclxuICAgICAgICByZXR1cm4gdHJpYW5nbGUud2l0aENvbG9ycyhuZXdBQ29sb3IsIG5ld0JDb2xvciwgbmV3Q0NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5sYXN0Q2FsbGVkVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDYWxsZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbHRhOiBudW1iZXIgPSAocGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RDYWxsZWRUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2FsbGVkVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKDEgLyBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIodHJpYW5nbGVzOiBUcmlhbmdsZVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuQnVmZmVyID0gbmV3IFNjcmVlbkJ1ZmZlcih0aGlzLnRhcmdldFNjcmVlbi53aWR0aCwgdGhpcy50YXJnZXRTY3JlZW4uaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBkZXB0aEJ1ZmZlcjogbnVtYmVyW10gPSBuZXcgQXJyYXkodGhpcy50YXJnZXRTY3JlZW4ud2lkdGggKiB0aGlzLnRhcmdldFNjcmVlbi5oZWlnaHQpLmZpbGwoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0ID0gMCwgdHJpYW5nbGVzTGVuZ3RoID0gdHJpYW5nbGVzLmxlbmd0aDsgdCA8IHRyaWFuZ2xlc0xlbmd0aDsgKyt0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUcmlhbmdsZSA9IHRyaWFuZ2xlc1t0XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGN1cnJlbnRUcmlhbmdsZS5taW5YOyB4IDw9IGN1cnJlbnRUcmlhbmdsZS5tYXhYOyArK3gpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBjdXJyZW50VHJpYW5nbGUubWluWTsgeSA8PSBjdXJyZW50VHJpYW5nbGUubWF4WTsgKyt5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmlhbmdsZS5pc0luKHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbWJkYUNvcmRzOiBWZWN0b3IzID0gY3VycmVudFRyaWFuZ2xlLnRvTGFtYmRhQ29vcmRpbmF0ZXMoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoOiBudW1iZXIgPSBSYXN0ZXJpemVyLmNhbGN1bGF0ZURlcHRoKGxhbWJkYUNvcmRzLCBjdXJyZW50VHJpYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJJbmRleCA9IHRoaXMuY2FsY3VsYXRlQnVmZmVySW5kZXgoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IGRlcHRoQnVmZmVyW2J1ZmZlckluZGV4IC8gNF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoQnVmZmVyW2J1ZmZlckluZGV4IC8gNF0gPSBkZXB0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbkJ1ZmZlci5zZXRDb2xvcihidWZmZXJJbmRleCwgUmFzdGVyaXplci5jYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkcywgY3VycmVudFRyaWFuZ2xlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGFyZ2V0U2NyZWVuLnNldFBpeGVsc0Zyb21CdWZmZXIoc2NyZWVuQnVmZmVyLmJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCdWZmZXJJbmRleChzY3JlZW5YOiBudW1iZXIsIHNjcmVlblk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHNjcmVlblkgKiB0aGlzLnRhcmdldFNjcmVlbi53aWR0aCArIHNjcmVlblgpICogNCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlRGVwdGgobGFtYmRhQ29yZHM6IFZlY3RvcjMsIHRyaWFuZ2xlOiBUcmlhbmdsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hLnogKyBsYW1iZGFDb3Jkcy55ICogdHJpYW5nbGUuYi56ICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmMuejtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVJbnRlcnBvbGF0ZWRDb2xvcihsYW1iZGFDb3JkczogVmVjdG9yMywgdHJpYW5nbGU6IFRyaWFuZ2xlKTogQ29sb3Ige1xyXG4gICAgICAgIGNvbnN0IHJlZEludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuciArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuciArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IucjtcclxuICAgICAgICBjb25zdCBncmVlbkludGVycG9sYXRlZCA9IGxhbWJkYUNvcmRzLnggKiB0cmlhbmdsZS5hQ29sb3IuZyArIGxhbWJkYUNvcmRzLnkgKiB0cmlhbmdsZS5iQ29sb3IuZyArIGxhbWJkYUNvcmRzLnogKiB0cmlhbmdsZS5jQ29sb3IuZztcclxuICAgICAgICBjb25zdCBibHVlSW50ZXJwb2xhdGVkID0gbGFtYmRhQ29yZHMueCAqIHRyaWFuZ2xlLmFDb2xvci5iICsgbGFtYmRhQ29yZHMueSAqIHRyaWFuZ2xlLmJDb2xvci5iICsgbGFtYmRhQ29yZHMueiAqIHRyaWFuZ2xlLmNDb2xvci5iO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkSW50ZXJwb2xhdGVkLCBncmVlbkludGVycG9sYXRlZCwgYmx1ZUludGVycG9sYXRlZCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtNYXRyaXg0eDR9IGZyb20gXCIuLi9tYXRoL01hdHJpeDR4NFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4uL2dlb21ldHJ5L1RyaWFuZ2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb2plY3Rpb246IE1hdHJpeDR4NCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlldzogTWF0cml4NHg0ID0gbmV3IE1hdHJpeDR4NCgpO1xyXG4gICAgcHJpdmF0ZSBwcm9qZWN0aW9uVmlldzogTWF0cml4NHg0O1xyXG5cclxuICAgIHNldExvb2tBdChwb3NpdGlvbjogVmVjdG9yMywgdGFyZ2V0OiBWZWN0b3IzLCB1cERpcmVjdGlvbjogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNhbWVyYURpcmVjdGlvbiA9IHRhcmdldC5zdWJzdHJhY3QocG9zaXRpb24pLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICB1cERpcmVjdGlvbiA9IHVwRGlyZWN0aW9uLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzID0gY2FtZXJhRGlyZWN0aW9uLmNyb3NzKHVwRGlyZWN0aW9uKTtcclxuICAgICAgICBjb25zdCB1ID0gcy5jcm9zcyhjYW1lcmFEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVswXSA9IG5ldyBGbG9hdDMyQXJyYXkoW3MueCwgcy55LCBzLnosIC1wb3NpdGlvbi54XSk7XHJcbiAgICAgICAgdGhpcy52aWV3LmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFt1LngsIHUueSwgdS56LCAtcG9zaXRpb24ueV0pO1xyXG4gICAgICAgIHRoaXMudmlldy5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbLWNhbWVyYURpcmVjdGlvbi54LCAtY2FtZXJhRGlyZWN0aW9uLnksIC1jYW1lcmFEaXJlY3Rpb24ueiwgLXBvc2l0aW9uLnpdKTtcclxuICAgICAgICB0aGlzLnZpZXcuZGF0YVszXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3Rpb25WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVyc3BlY3RpdmUoZm92WTogbnVtYmVyLCBhc3BlY3Q6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvdlkgKj0gTWF0aC5QSSAvIDM2MDtcclxuICAgICAgICBjb25zdCBmID0gTWF0aC5jb3MoZm92WSkgLyBNYXRoLnNpbihmb3ZZKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbMF0gPSBuZXcgRmxvYXQzMkFycmF5KFtmL2FzcGVjdCwgMCwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgZiwgMCwgMF0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbi5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgKGZhciArIG5lYXIpIC8gKG5lYXIgLSBmYXIpLCAoMiAqIGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpXSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLmRhdGFbM10gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAtMSwgMF0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvamVjdGlvblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9qZWN0KHRyaWFuZ2xlOiBUcmlhbmdsZSk6IFRyaWFuZ2xlIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uVmlld1dvcmxkID0gdGhpcy5wcm9qZWN0aW9uVmlldy5tdWx0aXBseSh0cmlhbmdsZS50cmFuc2Zvcm0ub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICAgICAgY29uc3QgbmV3QSA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYSk7XHJcbiAgICAgICAgY29uc3QgbmV3QiA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYik7XHJcbiAgICAgICAgY29uc3QgbmV3QyA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYyk7XHJcbiAgICAgICAgY29uc3QgbmV3QU5vcm1hbCA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYU5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgbmV3Qk5vcm1hbCA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuYk5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgbmV3Q05vcm1hbCA9IHByb2plY3Rpb25WaWV3V29ybGQubXVsdGlwbHkodHJpYW5nbGUuY05vcm1hbCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmlhbmdsZShuZXdBLCBuZXdCLCBuZXdDLCBuZXdBTm9ybWFsLCBuZXdCTm9ybWFsLCBuZXdDTm9ybWFsLCB0cmlhbmdsZS5hQ29sb3IsIHRyaWFuZ2xlLmJDb2xvciwgdHJpYW5nbGUuY0NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb2plY3Rpb25WaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvblZpZXcgPSB0aGlzLnByb2plY3Rpb24ubXVsdGlwbHkodGhpcy52aWV3KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7VHJhbnNmb3JtfSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vVHJpYW5nbGVcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEcmF3YWJsZU9iamVjdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90cmFuc2Zvcm06IFRyYW5zZm9ybTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGlzSW4oeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuO1xyXG4gICAgYWJzdHJhY3QgdG9UcmlhbmdsZXMoKTogVHJpYW5nbGVbXVxyXG5cclxuICAgIGdldCB0cmFuc2Zvcm0oKTogVHJhbnNmb3JtIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtEcmF3YWJsZU9iamVjdH0gZnJvbSBcIi4vRHJhd2FibGVPYmplY3RcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vVHJpYW5nbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNoIGV4dGVuZHMgRHJhd2FibGVPYmplY3R7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmlhbmdsZXM6IFRyaWFuZ2xlW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJpYW5nbGVzOiBUcmlhbmdsZVtdKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcclxuICAgIH1cclxuXHJcbiAgICBpc0luKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0cmlhbmdsZSBvZiB0aGlzLnRyaWFuZ2xlcykge1xyXG4gICAgICAgICAgICBpZiAodHJpYW5nbGUuaXNJbih4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRvVHJpYW5nbGVzKCk6IFRyaWFuZ2xlW10ge1xyXG4gICAgICAgIGZvciAoY29uc3QgdHJpYW5nbGUgb2YgdGhpcy50cmlhbmdsZXMpIHtcclxuICAgICAgICAgICAgdHJpYW5nbGUudHJhbnNmb3JtLm9iamVjdFRvV29ybGQgPSB0aGlzLnRyYW5zZm9ybS5vYmplY3RUb1dvcmxkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50cmlhbmdsZXM7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vVHJpYW5nbGVcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm9ybWFsc0NyZWF0b3Ige1xyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVOb3JtYWxzKHRyaWFuZ2xlOiBUcmlhbmdsZSk6IFRyaWFuZ2xlIHtcclxuICAgICAgICBjb25zdCBhYiA9IFZlY3RvcjMuYmV0d2VlblBvaW50cyh0cmlhbmdsZS5hLCB0cmlhbmdsZS5iKTtcclxuICAgICAgICBjb25zdCBhYyA9IFZlY3RvcjMuYmV0d2VlblBvaW50cyh0cmlhbmdsZS5hLCB0cmlhbmdsZS5jKTtcclxuICAgICAgICBjb25zdCB0cmlhbmdsZU5vcm1hbCA9IGFiLmNyb3NzKGFjKS5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRyaWFuZ2xlLndpdGhOb3JtYWxzKHRyaWFuZ2xlTm9ybWFsLCB0cmlhbmdsZU5vcm1hbCwgdHJpYW5nbGVOb3JtYWwpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtNYXRyaXg0eDR9IGZyb20gXCIuLi9tYXRoL01hdHJpeDR4NFwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xyXG5cclxuICAgIG9iamVjdFRvV29ybGQ6IE1hdHJpeDR4NDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9iamVjdFRvV29ybGQgPSBNYXRyaXg0eDQuY3JlYXRlSWRlbnRpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGUodHJhbnNsYXRpb246IFZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbk1hdHJpeCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzBdID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgdHJhbnNsYXRpb24ueF0pO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uTWF0cml4LmRhdGFbMV0gPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCB0cmFuc2xhdGlvbi55XSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25NYXRyaXguZGF0YVsyXSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIHRyYW5zbGF0aW9uLnpdKTtcclxuICAgICAgICB0cmFuc2xhdGlvbk1hdHJpeC5kYXRhWzNdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMV0pO1xyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IHRyYW5zbGF0aW9uTWF0cml4Lm11bHRpcGx5KHRoaXMub2JqZWN0VG9Xb3JsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUoc2NhbGluZzogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjYWxpbmdNYXRyaXggPSBuZXcgTWF0cml4NHg0KCk7XHJcbiAgICAgICAgc2NhbGluZ01hdHJpeC5kYXRhWzBdID0gbmV3IEZsb2F0MzJBcnJheShbc2NhbGluZy54LCAwLCAwLCAwXSk7XHJcbiAgICAgICAgc2NhbGluZ01hdHJpeC5kYXRhWzFdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgc2NhbGluZy55LCAwLCAwXSk7XHJcbiAgICAgICAgc2NhbGluZ01hdHJpeC5kYXRhWzJdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgc2NhbGluZy56LCAwXSk7XHJcbiAgICAgICAgc2NhbGluZ01hdHJpeC5kYXRhWzNdID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMV0pO1xyXG4gICAgICAgIHRoaXMub2JqZWN0VG9Xb3JsZCA9IHNjYWxpbmdNYXRyaXgubXVsdGlwbHkodGhpcy5vYmplY3RUb1dvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGUocm90YXRpb25EaXJlY3Rpb246IFZlY3RvcjMsIGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhbmdsZSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgcm90YXRpb25EaXJlY3Rpb24gPSByb3RhdGlvbkRpcmVjdGlvbi5nZXROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgeCA9IHJvdGF0aW9uRGlyZWN0aW9uLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHJvdGF0aW9uRGlyZWN0aW9uLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IHJvdGF0aW9uRGlyZWN0aW9uLno7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMF0gPSB4ICogeCAqICgxIC0gY29zKSArIGNvcztcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzBdWzFdID0geCAqIHkgKiAoMSAtIGNvcykgLSB6ICogc2luO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMF1bMl0gPSB4ICogeiAqICgxIC0gY29zKSArIHkgKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVswXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bMF0gPSB5ICogeCAqICgxIC0gY29zKSArIHogKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVsxXSA9IHkgKiB5ICogKDEgLSBjb3MpICsgY29zO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMV1bMl0gPSB5ICogeiAqICgxIC0gY29zKSAtIHggKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsxXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbMl1bMF0gPSB4ICogeiAqICgxIC0gY29zKSAtIHkgKiBzaW47XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVsxXSA9IHkgKiB6ICogKDEgLSBjb3MpICsgeCAqIHNpbjtcclxuICAgICAgICByb3RhdGlvbk1hdHJpeC5kYXRhWzJdWzJdID0geiAqIHogKiAoMSAtIGNvcykgKyBjb3M7XHJcbiAgICAgICAgcm90YXRpb25NYXRyaXguZGF0YVsyXVszXSA9IDA7XHJcblxyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMF0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMV0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bMl0gPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uTWF0cml4LmRhdGFbM11bM10gPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdFRvV29ybGQgPSByb3RhdGlvbk1hdHJpeC5tdWx0aXBseSh0aGlzLm9iamVjdFRvV29ybGQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCIuLi9saWdodC9Db2xvclwiO1xyXG5pbXBvcnQge1NldHRpbmdzfSBmcm9tIFwiLi4vaW8vb3V0cHV0L3NjcmVlbi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0RyYXdhYmxlT2JqZWN0fSBmcm9tIFwiLi9EcmF3YWJsZU9iamVjdFwiO1xyXG5pbXBvcnQge01hdGhVdGlsc30gZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBEcmF3YWJsZU9iamVjdCB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2I6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FOb3JtYWw6IFZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9iTm9ybWFsOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY05vcm1hbDogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hQ29sb3I6IENvbG9yO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYkNvbG9yOiBDb2xvcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NDb2xvcjogQ29sb3I7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5BOiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5COiBWZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JlZW5DOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHhBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeEJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR4Q0E6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHlBQjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkeUJDOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGR5Q0E6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9taW5YOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXhYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9taW5ZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXhZOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpc0FCVG9wTGVmdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNCQ1RvcExlZnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzQ0FUb3BMZWZ0OiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMsIGM6IFZlY3RvcjMsIGFOb3JtYWw6IFZlY3RvcjMsIGJOb3JtYWw6IFZlY3RvcjMsIGNOb3JtYWw6IFZlY3RvcjMsIGFDb2xvciA9IENvbG9yLlJFRCwgYkNvbG9yID0gQ29sb3IuR1JFRU4sIGNDb2xvciA9IENvbG9yLkJMVUUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2EgPSBhO1xyXG4gICAgICAgIHRoaXMuX2IgPSBiO1xyXG4gICAgICAgIHRoaXMuX2MgPSBjO1xyXG4gICAgICAgIHRoaXMuX2FOb3JtYWwgPSBhTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2JOb3JtYWwgPSBiTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2NOb3JtYWwgPSBjTm9ybWFsO1xyXG4gICAgICAgIHRoaXMuX2FDb2xvciA9IGFDb2xvcjtcclxuICAgICAgICB0aGlzLl9iQ29sb3IgPSBiQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fY0NvbG9yID0gY0NvbG9yO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9IHRoaXMudG9TY3JlZW5YKHRoaXMuYS54KTtcclxuICAgICAgICBjb25zdCB4MiA9IHRoaXMudG9TY3JlZW5YKHRoaXMuYi54KTtcclxuICAgICAgICBjb25zdCB4MyA9IHRoaXMudG9TY3JlZW5YKHRoaXMuYy54KTtcclxuICAgICAgICBjb25zdCB5MSA9IHRoaXMudG9TY3JlZW5ZKHRoaXMuYS55KTtcclxuICAgICAgICBjb25zdCB5MiA9IHRoaXMudG9TY3JlZW5ZKHRoaXMuYi55KTtcclxuICAgICAgICBjb25zdCB5MyA9IHRoaXMudG9TY3JlZW5ZKHRoaXMuYy55KTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFgxID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeDEsIFNldHRpbmdzLnNjcmVlbldpZHRoKTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWTEgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh5MSwgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBjbGlwcGVkWDIgPSBNYXRoVXRpbHMuY2xhbXBGcm9tWmVybyh4MiwgU2V0dGluZ3Muc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRZMiA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHkyLCBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGNsaXBwZWRYMyA9IE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKHgzLCBTZXR0aW5ncy5zY3JlZW5XaWR0aCk7XHJcbiAgICAgICAgY29uc3QgY2xpcHBlZFkzID0gTWF0aFV0aWxzLmNsYW1wRnJvbVplcm8oeTMsIFNldHRpbmdzLnNjcmVlbkhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NyZWVuQSA9IG5ldyBWZWN0b3IzKGNsaXBwZWRYMSwgY2xpcHBlZFkxKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkIgPSBuZXcgVmVjdG9yMyhjbGlwcGVkWDIsIGNsaXBwZWRZMik7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5DID0gbmV3IFZlY3RvcjMoY2xpcHBlZFgzLCBjbGlwcGVkWTMpO1xyXG5cclxuICAgICAgICB0aGlzLl9taW5YID0gTWF0aC5taW4odGhpcy5zY3JlZW5BLngsIHRoaXMuc2NyZWVuQi54LCB0aGlzLnNjcmVlbkMueCk7XHJcbiAgICAgICAgdGhpcy5fbWF4WCA9IE1hdGgubWF4KHRoaXMuc2NyZWVuQS54LCB0aGlzLnNjcmVlbkIueCwgdGhpcy5zY3JlZW5DLngpO1xyXG4gICAgICAgIHRoaXMuX21pblkgPSBNYXRoLm1pbih0aGlzLnNjcmVlbkEueSwgdGhpcy5zY3JlZW5CLnksIHRoaXMuc2NyZWVuQy55KTtcclxuICAgICAgICB0aGlzLl9tYXhZID0gTWF0aC5tYXgodGhpcy5zY3JlZW5BLnksIHRoaXMuc2NyZWVuQi55LCB0aGlzLnNjcmVlbkMueSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHhBQiA9IHRoaXMuc2NyZWVuQS54IC0gdGhpcy5zY3JlZW5CLng7XHJcbiAgICAgICAgdGhpcy5keEJDID0gdGhpcy5zY3JlZW5CLnggLSB0aGlzLnNjcmVlbkMueDtcclxuICAgICAgICB0aGlzLmR4Q0EgPSB0aGlzLnNjcmVlbkMueCAtIHRoaXMuc2NyZWVuQS54O1xyXG5cclxuICAgICAgICB0aGlzLmR5QUIgPSB0aGlzLnNjcmVlbkEueSAtIHRoaXMuc2NyZWVuQi55O1xyXG4gICAgICAgIHRoaXMuZHlCQyA9IHRoaXMuc2NyZWVuQi55IC0gdGhpcy5zY3JlZW5DLnk7XHJcbiAgICAgICAgdGhpcy5keUNBID0gdGhpcy5zY3JlZW5DLnkgLSB0aGlzLnNjcmVlbkEueTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0FCVG9wTGVmdCA9IHRoaXMuZHlBQiA8IDAgfHwgKHRoaXMuZHlBQiA9PT0gMCAmJiB0aGlzLmR4QUIgPiAwKTtcclxuICAgICAgICB0aGlzLmlzQkNUb3BMZWZ0ID0gdGhpcy5keUJDIDwgMCB8fCAodGhpcy5keUJDID09PSAwICYmIHRoaXMuZHhCQyA+IDApO1xyXG4gICAgICAgIHRoaXMuaXNDQVRvcExlZnQgPSB0aGlzLmR5Q0EgPCAwIHx8ICh0aGlzLmR5Q0EgPT09IDAgJiYgdGhpcy5keENBID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aENvbG9ycyhuZXdBQ29sb3I6IENvbG9yLCBuZXdCQ29sb3I6IENvbG9yLCBuZXdDQ29sb3I6IENvbG9yKTogVHJpYW5nbGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJpYW5nbGUodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5hTm9ybWFsLCB0aGlzLmJOb3JtYWwsIHRoaXMuY05vcm1hbCwgbmV3QUNvbG9yLCBuZXdCQ29sb3IsIG5ld0NDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE5vcm1hbHMobmV3QU5vcm1hbDogVmVjdG9yMywgbmV3Qk5vcm1hbDogVmVjdG9yMywgbmV3Q05vcm1hbDogVmVjdG9yMyk6IFRyaWFuZ2xlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyaWFuZ2xlKHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIG5ld0FOb3JtYWwsIG5ld0JOb3JtYWwsIG5ld0NOb3JtYWwsIHRoaXMuYUNvbG9yLCB0aGlzLmJDb2xvciwgdGhpcy5jQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvVHJpYW5nbGVzKCk6IFRyaWFuZ2xlW10ge1xyXG4gICAgICAgIHJldHVybiBbdGhpc107XHJcbiAgICB9XHJcblxyXG4gICAgdG9MYW1iZGFDb29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYUEgPSAodGhpcy5keUJDICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlCQyAqIC10aGlzLmR4Q0EgKyAtdGhpcy5keEJDICogLXRoaXMuZHlDQSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhbWJkYUIgPSAodGhpcy5keUNBICogKHggLSB0aGlzLnNjcmVlbkMueCkgKyAtdGhpcy5keENBICogKHkgLSB0aGlzLnNjcmVlbkMueSkpIC9cclxuICAgICAgICAgICAgKHRoaXMuZHlDQSAqIHRoaXMuZHhCQyArIC10aGlzLmR4Q0EgKiB0aGlzLmR5QkMpO1xyXG5cclxuICAgICAgICBjb25zdCBsYW1iZGFDID0gMSAtIGxhbWJkYUEgLSBsYW1iZGFCO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyhsYW1iZGFBLCBsYW1iZGFCLCBsYW1iZGFDKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0luKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNBQk9rID0gdGhpcy5pc0FCVG9wTGVmdCA/XHJcbiAgICAgICAgICAgIHRoaXMuZHhBQiAqICh5IC0gdGhpcy5zY3JlZW5BLnkpIC0gdGhpcy5keUFCICogKHggLSB0aGlzLnNjcmVlbkEueCkgPj0gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuZHhBQiAqICh5IC0gdGhpcy5zY3JlZW5BLnkpIC0gdGhpcy5keUFCICogKHggLSB0aGlzLnNjcmVlbkEueCkgPiAwO1xyXG5cclxuICAgICAgICBjb25zdCBpc0JDT2sgPSB0aGlzLmlzQkNUb3BMZWZ0ID9cclxuICAgICAgICAgICAgdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkIueSkgLSB0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQi54KSA+PSAwIDpcclxuICAgICAgICAgICAgdGhpcy5keEJDICogKHkgLSB0aGlzLnNjcmVlbkIueSkgLSB0aGlzLmR5QkMgKiAoeCAtIHRoaXMuc2NyZWVuQi54KSA+IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQ0FPayA9IHRoaXMuaXNDQVRvcExlZnQgP1xyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID49IDAgOlxyXG4gICAgICAgICAgICB0aGlzLmR4Q0EgKiAoeSAtIHRoaXMuc2NyZWVuQy55KSAtIHRoaXMuZHlDQSAqICh4IC0gdGhpcy5zY3JlZW5DLngpID4gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQUJPayAmJiBpc0JDT2sgJiYgaXNDQU9rO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9TY3JlZW5YKHhUb1Byb2plY3Q6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHhUb1Byb2plY3QgKyAxKSAqIFNldHRpbmdzLnNjcmVlbldpZHRoICogMC41KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvU2NyZWVuWSh5VG9Qcm9qZWN0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGguYWJzKE1hdGhVdGlscy5jbGFtcEZyb21aZXJvKCh5VG9Qcm9qZWN0ICsgMSkgKiBTZXR0aW5ncy5zY3JlZW5IZWlnaHQgKiAwLjUsIFNldHRpbmdzLnNjcmVlbkhlaWdodCkgLSBTZXR0aW5ncy5zY3JlZW5IZWlnaHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYSgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYygpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYU5vcm1hbCgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYU5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYk5vcm1hbCgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYk5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY05vcm1hbCgpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY05vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYUNvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiQ29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNDb2xvcigpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5YO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhYKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pblkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4WSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY3JlZW5IYW5kbGVyfSBmcm9tIFwiLi9pby9vdXRwdXQvc2NyZWVuL1NjcmVlbkhhbmRsZXJcIjtcclxuaW1wb3J0IHtSYXN0ZXJpemVyfSBmcm9tIFwiLi9SYXN0ZXJpemVyXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL2lvL291dHB1dC9zY3JlZW4vU2V0dGluZ3NcIjtcclxuaW1wb3J0IHtLZXlib2FyZEJpbmRlcn0gZnJvbSBcIi4vaW8vaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRCaW5kZXJcIjtcclxuaW1wb3J0IHtDYW1lcmF9IGZyb20gXCIuL2NhbWVyYS9DYW1lcmFcIjtcclxuaW1wb3J0IHtLZXlib2FyZElucHV0RGF0YX0gZnJvbSBcIi4vaW8vaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRJbnB1dERhdGFcIjtcclxuaW1wb3J0IHtGaWxlTG9hZGVyfSBmcm9tIFwiLi9pby9pbnB1dC9maWxlL0ZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHtPYmpMb2FkZXJ9IGZyb20gXCIuL2lvL2lucHV0L21lc2gvT2JqTG9hZGVyXCI7XHJcbmltcG9ydCB7UG9pbnRMaWdodH0gZnJvbSBcIi4vbGlnaHQvUG9pbnRMaWdodFwiO1xyXG5pbXBvcnQge0xpZ2h0SW50ZW5zaXR5fSBmcm9tIFwiLi9saWdodC9MaWdodEludGVuc2l0eVwiO1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcmVlbkNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0IHRhcmdldFNjcmVlbiA9IG5ldyBTY3JlZW5IYW5kbGVyKGNhbnZhcyk7XHJcbiAgICBTZXR0aW5ncy5zY3JlZW5XaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIFNldHRpbmdzLnNjcmVlbkhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBLZXlib2FyZEJpbmRlci5yZWdpc3RlcktleUJpbmRpbmdzKCk7XHJcblxyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG4gICAgY2FtZXJhLnNldExvb2tBdChLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XHJcbiAgICBjYW1lcmEuc2V0UGVyc3BlY3RpdmUoNDUsIDE2LzksIDAuMSwgMTAwKTtcclxuXHJcbiAgICBjb25zdCBvYmpUZXh0ID0gRmlsZUxvYWRlci5sb2FkRmlsZShcInJlc291cmNlcy9tb2RlbHMvZG9kZWNhaGVkcm9uLm9ialwiKTtcclxuICAgIGNvbnN0IG1lc2hMb2FkZXIgPSBuZXcgT2JqTG9hZGVyKCk7XHJcbiAgICBjb25zdCBvYmpNZXNoID0gbWVzaExvYWRlci5sb2FkTWVzaChvYmpUZXh0KTtcclxuXHJcbiAgICAvLyBvYmpNZXNoLnRyYW5zZm9ybS5zY2FsZShuZXcgVmVjdG9yMygwLjUsIDAuNSwgMC41KSk7XHJcbiAgICAvLyBvYmpNZXNoLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IFZlY3RvcjMoMCwgMCwgLTEwKSk7XHJcbiAgICAvLyBvYmpNZXNoLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IFZlY3RvcjMoLTAuNSwgLTAuNSwgMCkpO1xyXG5cclxuICAgIGNvbnN0IGFtYmllbnRMaWdodENvbG9yID0gbmV3IExpZ2h0SW50ZW5zaXR5KDAsIDAsIDApO1xyXG4gICAgY29uc3Qgc3BlY3VsYXJMaWdodENvbG9yID0gbmV3IExpZ2h0SW50ZW5zaXR5KDEsIDAsIDEpO1xyXG5cclxuICAgIGNvbnN0IGxpZ2h0ID0gbmV3IFBvaW50TGlnaHQoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbiwgYW1iaWVudExpZ2h0Q29sb3IsIG5ldyBMaWdodEludGVuc2l0eSgxLCAwLCAwKSwgc3BlY3VsYXJMaWdodENvbG9yLCAyMCk7XHJcbiAgICBjb25zdCBsaWdodDIgPSBuZXcgUG9pbnRMaWdodCggbmV3IFZlY3RvcjMoLTMsIDAsIDEuNSksIGFtYmllbnRMaWdodENvbG9yLCBuZXcgTGlnaHRJbnRlbnNpdHkoMCwgMCwgMSksIHNwZWN1bGFyTGlnaHRDb2xvciwgMjApO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZXI6IFJhc3Rlcml6ZXIgPSBuZXcgUmFzdGVyaXplcih0YXJnZXRTY3JlZW4sIFtvYmpNZXNoXSwgW2xpZ2h0LCBsaWdodDJdLCBjYW1lcmEpO1xyXG4gICAgcmFzdGVyaXplci51cGRhdGUoKTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdGlhbGl6ZSk7XHJcblxyXG4iLCJleHBvcnQgY2xhc3MgRmlsZUxvYWRlciB7XHJcblxyXG4gICAgc3RhdGljIGxvYWRGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgaHR0cFJlcXVlc3Qub3BlbihcIkdFVFwiLCBmaWxlUGF0aCwgZmFsc2UpO1xyXG4gICAgICAgIGh0dHBSZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBodHRwUmVxdWVzdC5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tleWJvYXJkSW5wdXREYXRhfSBmcm9tIFwiLi9LZXlib2FyZElucHV0RGF0YVwiO1xyXG5pbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEJpbmRlciB7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJLZXlCaW5kaW5ncygpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdhJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54IC0gMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCAtIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2QnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnggKyAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54ICsgMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3cnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldCA9IG5ldyBWZWN0b3IzKEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnogLSAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueiArIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnKycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueSArIDAuMDEsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LngsIEtleWJvYXJkSW5wdXREYXRhLmNhbWVyYVRhcmdldC55ICsgMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICctJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi54LCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFQb3NpdGlvbi55IC0gMC4wMSwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhUG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQgPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueCwgS2V5Ym9hcmRJbnB1dERhdGEuY2FtZXJhVGFyZ2V0LnkgLSAwLjAxLCBLZXlib2FyZElucHV0RGF0YS5jYW1lcmFUYXJnZXQueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICduJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24gPSBuZXcgVmVjdG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uQW5nbGUgLT0gMC4xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdtJykge1xyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRJbnB1dERhdGEucm90YXRpb25EaXJlY3Rpb24gPSBuZXcgVmVjdG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnJvdGF0aW9uQW5nbGUgKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnbycpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLnNjYWxpbmcgLT0gMC4wMDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3AnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5zY2FsaW5nICs9IDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAndScpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSArIDAuMSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnaicpIHtcclxuICAgICAgICAgICAgICAgIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24gPSBuZXcgVmVjdG9yMyhLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLngsIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueSAtIDAuMSwgS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2snKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi54ICsgMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoS2V5Ym9hcmRJbnB1dERhdGEubGlnaHRQb3NpdGlvbi54IC0gMC4xLCBLZXlib2FyZElucHV0RGF0YS5saWdodFBvc2l0aW9uLnksIEtleWJvYXJkSW5wdXREYXRhLmxpZ2h0UG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC9WZWN0b3IzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dERhdGEge1xyXG4gICAgc3RhdGljIGNhbWVyYVBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgNSk7XHJcbiAgICBzdGF0aWMgY2FtZXJhVGFyZ2V0ID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcblxyXG4gICAgc3RhdGljIHNjYWxpbmcgPSAxO1xyXG5cclxuICAgIHN0YXRpYyByb3RhdGlvbkRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgc3RhdGljIHJvdGF0aW9uQW5nbGUgPSAwO1xyXG5cclxuICAgIHN0YXRpYyBsaWdodFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMywgMCwgMS41KTtcclxufSIsImltcG9ydCB7TWVzaExvYWRlcn0gZnJvbSBcIi4vTWVzaExvYWRlclwiO1xyXG5pbXBvcnQge01lc2h9IGZyb20gXCIuLi8uLi8uLi9nZW9tZXRyeS9NZXNoXCI7XHJcbmltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uLy4uLy4uL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge1RyaWFuZ2xlfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbWV0cnkvVHJpYW5nbGVcIjtcclxuaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL2xpZ2h0L0NvbG9yXCI7XHJcbmltcG9ydCB7Tm9ybWFsc0NyZWF0b3J9IGZyb20gXCIuLi8uLi8uLi9nZW9tZXRyeS9Ob3JtYWxzQ3JlYXRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iakxvYWRlciBpbXBsZW1lbnRzIE1lc2hMb2FkZXIge1xyXG5cclxuICAgIHByaXZhdGUgdmVydGljZXM6IFZlY3RvcjNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBub3JtYWxzOiBWZWN0b3IzW10gPSBbXTtcclxuICAgIHByaXZhdGUgZmFjZXM6IFRyaWFuZ2xlW10gPSBbXTtcclxuXHJcbiAgICBsb2FkTWVzaChtZXNoQXNUZXh0OiBzdHJpbmcpOiBNZXNoIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgY29uc3QgZmlsZUxpbmVzID0gbWVzaEFzVGV4dC5zcGxpdCgvXFxyP1xcbi8pO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBmaWxlTGluZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluZVNlZ21lbnRzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lSGVhZGVyID0gbGluZVNlZ21lbnRzWzBdO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGF0YSA9IGxpbmVTZWdtZW50cy5zbGljZSgxLCBsaW5lU2VnbWVudHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGxpbmVIZWFkZXIgPT09IFwidlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmVydGV4KGxpbmVEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lSGVhZGVyID09PSBcInZuXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VOb3JtYWwobGluZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmVIZWFkZXIgPT09IFwiZlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRmFjZShsaW5lRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNoKHRoaXMuZmFjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VWZXJ0ZXgodmFsdWVzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHZlcnRleCA9IG5ldyBWZWN0b3IzKHBhcnNlRmxvYXQodmFsdWVzWzBdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMV0pLCBwYXJzZUZsb2F0KHZhbHVlc1syXSkpO1xyXG4gICAgICAgIHRoaXMudmVydGljZXMucHVzaCh2ZXJ0ZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VOb3JtYWwodmFsdWVzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IG5ldyBWZWN0b3IzKHBhcnNlRmxvYXQodmFsdWVzWzBdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMV0pLCBwYXJzZUZsb2F0KHZhbHVlc1syXSkpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscy5wdXNoKG5vcm1hbC5nZXROb3JtYWxpemVkKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VGYWNlKHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmYWNlVmVydGV4SW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBjb25zdCBmYWNlVGV4dHVyZUluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgY29uc3QgZmFjZU5vcm1hbEluZGljZXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdmVydGV4SW5mbyBvZiB2YWx1ZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BsaXRWZXJ0ZXhJbmZvID0gdmVydGV4SW5mby5zcGxpdCgvXFwvLyk7XHJcbiAgICAgICAgICAgIGZhY2VWZXJ0ZXhJbmRpY2VzLnB1c2gocGFyc2VJbnQoc3BsaXRWZXJ0ZXhJbmZvWzBdKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRWZXJ0ZXhJbmZvWzFdICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlVGV4dHVyZUluZGljZXMucHVzaChwYXJzZUludChzcGxpdFZlcnRleEluZm9bMV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzcGxpdFZlcnRleEluZm8ubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcGxpdFZlcnRleEluZm9bMV0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2VUZXh0dXJlSW5kaWNlcy5wdXNoKHBhcnNlSW50KHNwbGl0VmVydGV4SW5mb1sxXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0VmVydGV4SW5mb1syXSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZU5vcm1hbEluZGljZXMucHVzaChwYXJzZUludChzcGxpdFZlcnRleEluZm9bMl0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB3aGl0ZSA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICBsZXQgZmFjZSA9IG5ldyBUcmlhbmdsZSh0aGlzLnZlcnRpY2VzWyhmYWNlVmVydGV4SW5kaWNlc1swXSAtIDEpXSwgdGhpcy52ZXJ0aWNlc1soZmFjZVZlcnRleEluZGljZXNbMV0gLSAxKV0sIHRoaXMudmVydGljZXNbKGZhY2VWZXJ0ZXhJbmRpY2VzWzJdIC0gMSldLFxyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzBdIC0gMSldLCB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzFdIC0gMSldLCB0aGlzLm5vcm1hbHNbKGZhY2VOb3JtYWxJbmRpY2VzWzJdIC0gMSldLFxyXG4gICAgICAgICAgICB3aGl0ZSwgd2hpdGUsIHdoaXRlKTtcclxuXHJcbiAgICAgICAgaWYoZmFjZS5hTm9ybWFsID09IHVuZGVmaW5lZCB8fCBmYWNlLmJOb3JtYWwgPT0gdW5kZWZpbmVkIHx8IGZhY2UuY05vcm1hbCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZmFjZSA9IE5vcm1hbHNDcmVhdG9yLmNyZWF0ZU5vcm1hbHMoZmFjZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZhY2VzLnB1c2goZmFjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5ub3JtYWxzID0gW107XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFtdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL2xpZ2h0L0NvbG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVuQnVmZmVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IFVpbnQ4Q2xhbXBlZEFycmF5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjcmVlbldpZHRoOiBudW1iZXIsIHNjcmVlbkhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHNjcmVlbldpZHRoICogc2NyZWVuSGVpZ2h0ICogNCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGJ1ZmZlckxlbmd0aCA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7IGkgPCBidWZmZXJMZW5ndGg7IGkrPTQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyW2ldID0gU2V0dGluZ3MuY2xlYXJDb2xvci5yO1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXJbaSsxXSA9IFNldHRpbmdzLmNsZWFyQ29sb3IuZztcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyW2krMl0gPSBTZXR0aW5ncy5jbGVhckNvbG9yLmI7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlcltpKzNdID0gU2V0dGluZ3MuY2xlYXJDb2xvci5hO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihpbmRleDogbnVtYmVyLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXhdID0gY29sb3IucjtcclxuICAgICAgICB0aGlzLl9idWZmZXJbaW5kZXggKyAxXSA9IGNvbG9yLmc7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyW2luZGV4ICsgMl0gPSBjb2xvci5iO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcltpbmRleCArIDNdID0gY29sb3IuYTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYnVmZmVyKCk6IFVpbnQ4Q2xhbXBlZEFycmF5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTZXR0aW5nc30gZnJvbSBcIi4vU2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JlZW5IYW5kbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYW52YXNDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3dpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9oZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQaXhlbHNGcm9tQnVmZmVyKGNvbG9yQnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShjb2xvckJ1ZmZlciwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTY3JlZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmNsZWFyUmVjdCgwLCAwLCBTZXR0aW5ncy5zY3JlZW5XaWR0aCwgU2V0dGluZ3Muc2NyZWVuSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGcHNEaXNwbGF5KGZwczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzA4YTMwMFwiO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0N0eC5maWxsVGV4dChcIkZQUzogXCIgKyBmcHMsIDEwLCAyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcn0gZnJvbSBcIi4uLy4uLy4uL2xpZ2h0L0NvbG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xyXG4gICAgc3RhdGljIHNjcmVlbldpZHRoOiBudW1iZXI7XHJcbiAgICBzdGF0aWMgc2NyZWVuSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBzdGF0aWMgY2xlYXJDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgNTApO1xyXG59IiwiaW1wb3J0IHtMaWdodEludGVuc2l0eX0gZnJvbSBcIi4vTGlnaHRJbnRlbnNpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb2xvciB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVEID0gbmV3IENvbG9yKDI1NSwgMCwgMCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdSRUVOID0gbmV3IENvbG9yKDAsIDI1NSwgMCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJMVUUgPSBuZXcgQ29sb3IoMCwgMCwgMjU1KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyID0gMCwgZyA9IDAsIGIgPSAwLCBhID0gMjU1KSB7XHJcbiAgICAgICAgdGhpcy5fciA9IHI7XHJcbiAgICAgICAgdGhpcy5fZyA9IGc7XHJcbiAgICAgICAgdGhpcy5fYiA9IGI7XHJcbiAgICAgICAgdGhpcy5fYSA9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IExpZ2h0SW50ZW5zaXR5KTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IodGhpcy5yICogb3RoZXIuciwgdGhpcy5nICogb3RoZXIuZywgdGhpcy5iICogb3RoZXIuYik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYTtcclxuICAgIH1cclxufSIsImltcG9ydCB7VmVjdG9yM30gZnJvbSBcIi4uL21hdGgvVmVjdG9yM1wiO1xyXG5pbXBvcnQge0xpZ2h0SW50ZW5zaXR5fSBmcm9tIFwiLi9MaWdodEludGVuc2l0eVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpZ2h0IHtcclxuXHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yMztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FtYmllbnQ6IExpZ2h0SW50ZW5zaXR5O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGlmZnVzZTogTGlnaHRJbnRlbnNpdHk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zcGVjdWxhcjogTGlnaHRJbnRlbnNpdHk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zaGluaW5lc3M6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvcjMsIGFtYmllbnQ6IExpZ2h0SW50ZW5zaXR5LCBkaWZmdXNlOiBMaWdodEludGVuc2l0eSwgc3BlY3VsYXI6IExpZ2h0SW50ZW5zaXR5LCBzaGluaW5lc3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5fYW1iaWVudCA9IGFtYmllbnQ7XHJcbiAgICAgICAgdGhpcy5fZGlmZnVzZSA9IGRpZmZ1c2U7XHJcbiAgICAgICAgdGhpcy5fc3BlY3VsYXIgPSBzcGVjdWxhcjtcclxuICAgICAgICB0aGlzLl9zaGluaW5lc3MgPSBzaGluaW5lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgY2FsY3VsYXRlVmVydGV4TGlnaHRJbnRlbnNpdHkodmVydGV4OiBWZWN0b3IzLCBub3JtYWw6IFZlY3RvcjMpOiBMaWdodEludGVuc2l0eTtcclxuXHJcbiAgICBnZXQgcG9zaXRpb24oKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwb3NpdGlvbih2YWx1ZTogVmVjdG9yMykge1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFtYmllbnQoKTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbWJpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkaWZmdXNlKCk6IExpZ2h0SW50ZW5zaXR5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlmZnVzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3BlY3VsYXIoKTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVjdWxhcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2hpbmluZXNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoaW5pbmVzcztcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBMaWdodEludGVuc2l0eSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHIgPSAwLCBnID0gMCwgYiA9IDApIHtcclxuICAgICAgICB0aGlzLl9yID0gcjtcclxuICAgICAgICB0aGlzLl9nID0gZztcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IExpZ2h0SW50ZW5zaXR5KTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGlnaHRJbnRlbnNpdHkodGhpcy5yICsgb3RoZXIuciwgdGhpcy5nICsgb3RoZXIuZywgdGhpcy5iICsgb3RoZXIuYik7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IExpZ2h0SW50ZW5zaXR5KTogTGlnaHRJbnRlbnNpdHlcclxuICAgIG11bHRpcGx5KG90aGVyOiBudW1iZXIpOiBMaWdodEludGVuc2l0eVxyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IExpZ2h0SW50ZW5zaXR5IHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBMaWdodEludGVuc2l0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpZ2h0SW50ZW5zaXR5KHRoaXMuciAqIG90aGVyLnIsIHRoaXMuZyAqIG90aGVyLmcsIHRoaXMuYiAqIG90aGVyLmIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlnaHRJbnRlbnNpdHkodGhpcy5yICogb3RoZXIsIHRoaXMuZyAqIG90aGVyLCB0aGlzLmIgKiBvdGhlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCByKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtMaWdodH0gZnJvbSBcIi4vTGlnaHRcIjtcclxuaW1wb3J0IHtWZWN0b3IzfSBmcm9tIFwiLi4vbWF0aC9WZWN0b3IzXCI7XHJcbmltcG9ydCB7TGlnaHRJbnRlbnNpdHl9IGZyb20gXCIuL0xpZ2h0SW50ZW5zaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRMaWdodCBleHRlbmRzIExpZ2h0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yMywgYW1iaWVudDogTGlnaHRJbnRlbnNpdHksIGRpZmZ1c2U6IExpZ2h0SW50ZW5zaXR5LCBzcGVjdWxhcjogTGlnaHRJbnRlbnNpdHksIHNoaW5pbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24sIGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBzaGluaW5lc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZVZlcnRleExpZ2h0SW50ZW5zaXR5KHZlcnRleDogVmVjdG9yMywgbm9ybWFsOiBWZWN0b3IzKTogTGlnaHRJbnRlbnNpdHkge1xyXG4gICAgICAgIGNvbnN0IE4gPSBub3JtYWwuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGxldCBWID0gdmVydGV4Lm11bHRpcGx5KC0xKTtcclxuICAgICAgICBjb25zdCBMID0gdGhpcy5wb3NpdGlvbi5zdWJzdHJhY3QoVikuZ2V0Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIFYgPSBWLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBSID0gTC5nZXRSZWZsZWN0ZWRCeShOKTtcclxuXHJcbiAgICAgICAgY29uc3QgaUQgPSBMLmRvdChOKTtcclxuICAgICAgICBjb25zdCBpUyA9IE1hdGgucG93KFIuZG90KFYpLCB0aGlzLnNoaW5pbmVzcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJJbnRlbnNpdHkgPSAodGhpcy5hbWJpZW50LnIgKyAoaUQgKiB0aGlzLmRpZmZ1c2UucikgKyAoaVMgKiB0aGlzLnNwZWN1bGFyLnIpKTtcclxuICAgICAgICBjb25zdCBnSW50ZW5zaXR5ID0gKHRoaXMuYW1iaWVudC5nICsgKGlEICogdGhpcy5kaWZmdXNlLmcpICsgKGlTICogdGhpcy5zcGVjdWxhci5nKSk7XHJcbiAgICAgICAgY29uc3QgYkludGVuc2l0eSA9ICh0aGlzLmFtYmllbnQuYiArIChpRCAqIHRoaXMuZGlmZnVzZS5iKSArIChpUyAqIHRoaXMuc3BlY3VsYXIuYikpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IExpZ2h0SW50ZW5zaXR5KHJJbnRlbnNpdHksIGdJbnRlbnNpdHksIGJJbnRlbnNpdHkpO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBNYXRoVXRpbHMge1xyXG5cclxuICAgIHN0YXRpYyBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xhbXBGcm9tWmVybyh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhbXAodmFsdWUsIDAsIG1heCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gXCIuL1ZlY3RvcjNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXg0eDQge1xyXG5cclxuICAgIHJlYWRvbmx5IGRhdGE6IFtGbG9hdDMyQXJyYXksIEZsb2F0MzJBcnJheSwgRmxvYXQzMkFycmF5LCBGbG9hdDMyQXJyYXldO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFzSWRlbnRpdHkgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmKGFzSWRlbnRpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW25ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDFdKV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW25ldyBGbG9hdDMyQXJyYXkoNCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KDQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSg0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoNCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlSWRlbnRpdHkoKTogTWF0cml4NHg0IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDR4NCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShvdGhlcjogTWF0cml4NHg0KTogTWF0cml4NHg0XHJcbiAgICBtdWx0aXBseShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIG11bHRpcGx5KG90aGVyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgY29uc3QgdyA9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzBdWzNdICogdztcclxuICAgICAgICAgICAgY29uc3QgdHkgPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci54ICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIueSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLnogKyB0aGlzLmRhdGFbMV1bM10gKiB3O1xyXG4gICAgICAgICAgICBjb25zdCB0eiA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLnggKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci55ICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIueiArIHRoaXMuZGF0YVsyXVszXSAqIHc7XHJcbiAgICAgICAgICAgIGNvbnN0IHR3ID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIueCArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLnkgKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci56ICsgdGhpcy5kYXRhWzNdWzNdICogdztcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHR4IC8gdHcsIHR5IC8gdHcsIHR6IC8gdHcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXRyaXg0eDQoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bMF0gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVswXVsxXSA9IHRoaXMuZGF0YVswXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMF1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzBdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVswXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzBdWzJdID0gdGhpcy5kYXRhWzBdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVswXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMF1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzBdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMF1bM10gPSB0aGlzLmRhdGFbMF1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzBdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVswXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMF1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bMF0gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsxXVsxXSA9IHRoaXMuZGF0YVsxXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMV1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzFdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVsxXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzFdWzJdID0gdGhpcy5kYXRhWzFdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVsxXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMV1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzFdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMV1bM10gPSB0aGlzLmRhdGFbMV1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzFdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVsxXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMV1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bMF0gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVsyXVsxXSA9IHRoaXMuZGF0YVsyXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbMl1bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzJdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVsyXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzJdWzJdID0gdGhpcy5kYXRhWzJdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVsyXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbMl1bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzJdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbMl1bM10gPSB0aGlzLmRhdGFbMl1bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzJdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVsyXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbMl1bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bMF0gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzBdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVswXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bMF0gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzBdO1xyXG4gICAgICAgICAgICByZXN1bHQuZGF0YVszXVsxXSA9IHRoaXMuZGF0YVszXVswXSAqIG90aGVyLmRhdGFbMF1bMV0gKyB0aGlzLmRhdGFbM11bMV0gKiBvdGhlci5kYXRhWzFdWzFdICsgdGhpcy5kYXRhWzNdWzJdICogb3RoZXIuZGF0YVsyXVsxXSArIHRoaXMuZGF0YVszXVszXSAqIG90aGVyLmRhdGFbM11bMV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhWzNdWzJdID0gdGhpcy5kYXRhWzNdWzBdICogb3RoZXIuZGF0YVswXVsyXSArIHRoaXMuZGF0YVszXVsxXSAqIG90aGVyLmRhdGFbMV1bMl0gKyB0aGlzLmRhdGFbM11bMl0gKiBvdGhlci5kYXRhWzJdWzJdICsgdGhpcy5kYXRhWzNdWzNdICogb3RoZXIuZGF0YVszXVsyXTtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGFbM11bM10gPSB0aGlzLmRhdGFbM11bMF0gKiBvdGhlci5kYXRhWzBdWzNdICsgdGhpcy5kYXRhWzNdWzFdICogb3RoZXIuZGF0YVsxXVszXSArIHRoaXMuZGF0YVszXVsyXSAqIG90aGVyLmRhdGFbMl1bM10gKyB0aGlzLmRhdGFbM11bM10gKiBvdGhlci5kYXRhWzNdWzNdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIFZlY3RvcjMge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3k6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3o6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwKSB7XHJcbiAgICAgICAgdGhpcy5feCA9IHg7XHJcbiAgICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgICAgdGhpcy5feiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJldHdlZW5Qb2ludHMocDE6IFZlY3RvcjMsIHAyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxLl94IC0gcDIuX3g7XHJcbiAgICAgICAgY29uc3QgeSA9IHAxLl95IC0gcDIuX3k7XHJcbiAgICAgICAgY29uc3QgeiA9IHAxLl96IC0gcDIuX3o7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3JtYWxpemVkKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLmdldE1hZ25pdHVkZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWZsZWN0ZWRCeShub3JtYWw6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICBjb25zdCBuID0gbm9ybWFsLmdldE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJzdHJhY3Qobi5tdWx0aXBseSgyICogdGhpcy5kb3QobikpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qob3RoZXI6IFZlY3RvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94ICogb3RoZXIuX3ggKyB0aGlzLl95ICogb3RoZXIuX3kgKyB0aGlzLl96ICogb3RoZXIuX3o7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Mob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoKHRoaXMuX3kgKiBvdGhlci5feikgLSAodGhpcy5feiAqIG90aGVyLl95KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ogKiBvdGhlci5feCkgLSAodGhpcy5feCAqIG90aGVyLl96KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3ggKiBvdGhlci5feSkgLSAodGhpcy5feSAqIG90aGVyLl94KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKyBvdGhlci5feCwgdGhpcy5feSArIG90aGVyLl95LCB0aGlzLl96ICsgb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgc3Vic3RyYWN0KG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggLSBvdGhlci5feCwgdGhpcy5feSAtIG90aGVyLl95LCB0aGlzLl96IC0gb3RoZXIuX3opXHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzXHJcbiAgICBtdWx0aXBseShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgbXVsdGlwbHkob3RoZXI6IGFueSk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlci5feCwgdGhpcy5feSAqIG90aGVyLl95LCB0aGlzLl96ICogb3RoZXIuX3kpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMuX3ggKiBvdGhlciwgdGhpcy5feSAqIG90aGVyLCB0aGlzLl96ICogb3RoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpdmlkZShvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjNcclxuICAgIGRpdmlkZShvdGhlcjogbnVtYmVyKTogVmVjdG9yM1xyXG4gICAgZGl2aWRlKG90aGVyOiBhbnkpOiBWZWN0b3IzIHtcclxuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIuX3gsIHRoaXMuX3kgLyBvdGhlci5feSwgdGhpcy5feiAvIG90aGVyLl95KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLl94IC8gb3RoZXIsIHRoaXMuX3kgLyBvdGhlciwgdGhpcy5feiAvIG90aGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHooKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fejtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=