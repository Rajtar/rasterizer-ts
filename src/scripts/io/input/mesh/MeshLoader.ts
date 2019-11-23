import {Mesh} from "../../../geometry/Mesh";

export interface MeshLoader {
    loadMesh(meshAsText: string): Mesh;
}