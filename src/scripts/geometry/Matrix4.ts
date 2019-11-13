export class Matrix4 {

    readonly data: [Float32Array, Float32Array, Float32Array, Float32Array];

    constructor() {
        this.data = [new Float32Array(4),
            new Float32Array(4),
            new Float32Array(4),
            new Float32Array(4)];
    }
}