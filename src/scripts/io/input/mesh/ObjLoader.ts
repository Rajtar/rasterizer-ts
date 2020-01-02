import {MeshLoader} from "./MeshLoader";
import {Mesh} from "../../../geometry/Mesh";
import {Vector3} from "../../../math/Vector3";
import {Triangle} from "../../../geometry/Triangle";
import {Color} from "../../../light/Color";
import {NormalsCreator} from "../../../geometry/NormalsCreator";

export class ObjLoader implements MeshLoader {

    private vertices: Vector3[] = [];
    private normals: Vector3[] = [];
    private faces: Triangle[] = [];

    loadMesh(meshAsText: string): Mesh {
        this.reset();
        const fileLines = meshAsText.split(/\r?\n/);
        for (const line of fileLines) {
            const lineSegments = line.split(/\s+/);
            const lineHeader = lineSegments[0];
            const lineData = lineSegments.slice(1, lineSegments.length);
            if (lineHeader === "v") {
                this.parseVertex(lineData);
            } else if (lineHeader === "vn") {
                this.parseNormal(lineData);
            } else if (lineHeader === "f") {
                this.parseFace(lineData);
            }
        }
        return new Mesh(this.faces);
    }

    private parseVertex(values: string[]): void {
        const vertex = new Vector3(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]));
        this.vertices.push(vertex);
    }

    private parseNormal(values: string[]): void {
        const normal = new Vector3(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]));
        this.normals.push(normal.getNormalized());
    }

    private parseFace(values: string[]): void {
        const faceVertexIndices: number[] = [];
        const faceTextureIndices: number[] = [];
        const faceNormalIndices: number[] = [];

        for (const vertexInfo of values) {
            const splitVertexInfo = vertexInfo.split(/\//);
            faceVertexIndices.push(parseInt(splitVertexInfo[0]));

            if (splitVertexInfo.length == 2) {
                if (splitVertexInfo[1] != "") {
                    faceTextureIndices.push(parseInt(splitVertexInfo[1]));
                }
            } else if (splitVertexInfo.length == 3) {
                if (splitVertexInfo[1] != "") {
                    faceTextureIndices.push(parseInt(splitVertexInfo[1]));
                }
                if (splitVertexInfo[2] != "") {
                    faceNormalIndices.push(parseInt(splitVertexInfo[2]));
                }
            }
        }
        const white = new Color(255, 255, 255);
        let face = new Triangle(this.vertices[(faceVertexIndices[0] - 1)], this.vertices[(faceVertexIndices[1] - 1)], this.vertices[(faceVertexIndices[2] - 1)],
            this.normals[(faceNormalIndices[0] - 1)], this.normals[(faceNormalIndices[1] - 1)], this.normals[(faceNormalIndices[2] - 1)],
            white, white, white);

        if(face.aNormal == undefined || face.bNormal == undefined || face.cNormal == undefined) {
            face = NormalsCreator.createNormals(face);
        }

        this.faces.push(face);
    }

    private reset(): void {
        this.vertices = [];
        this.normals = [];
        this.faces = [];
    }
}