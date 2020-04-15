import * as geo from "./geometry";
import { Vector } from "./vector";

export class Cube {

    static readonly edges = [
        [[0, 0, 0], [1, 0, 0]],
        [[0, 0, 0], [0, 0, 1]],
        [[0, 0, 1], [1, 0, 1]],
        [[1, 0, 0], [1, 0, 1]],

        [[0, 1, 0], [1, 1, 0]],
        [[0, 1, 0], [0, 1, 1]],
        [[0, 1, 1], [1, 1, 1]],
        [[1, 1, 0], [1, 1, 1]],

        [[0, 0, 0], [0, 1, 0]],
        [[1, 0, 0], [1, 1, 0]],

        [[0, 0, 1], [0, 1, 1]],
        [[1, 0, 1], [1, 1, 1]],
    ]

    static rortate(angle: number) {
             
        // return Cube.edges.flat().map(value => geo.multiplyMV(rotationMatrixZ, value));
    }

    static transform(angle: number, translation: Vector) {
        const rotationMatrixZ = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]        

        const rotationMatrixX = [
            [1, 0, 0],
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
        ]        

        const rotationMatrixY = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [1, 0, 0],
            [Math.sin(angle), Math.cos(angle), 0],
        ]
        return Cube.edges.flat().map(value => new Vector(value).subtract(new Vector([0.5, 0.5, 0.5]))).map(value => geo.multiplyMV(rotationMatrixZ, [...value.coordinates])).map(value => new Vector(value).add(translation)) 
    }

}
export class Scene {

}