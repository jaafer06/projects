import { Vector } from "./vector";
import * as math from "mathjs";

export function solve(matrix: number[][], vector: number []): number[] | undefined {
    try {
        const result = (math.lusolve(matrix, vector) as number[][]).map(v => v[0]) ;
        return result;
    } catch(e) {
        return undefined;
    }
}

export function multiplyMV(matrix: number[][], vector: number[]) {    
    return math.multiply(vector, matrix);
}

export function multiplyMs(matrix: number[][], scalar: number): number[][] {
    return math.multiply(matrix, scalar) as number[][];
}

export function multiplyMM(matrix1: number[][], matrix2: number[][]) {
    return math.multiply(matrix1, matrix2);
}

export function transpose(matrix: number[][]): number[][] {
    return math.transpose(matrix);
}

export class HyperPlane {
    public readonly a: Vector;
    public readonly beta: number;

    constructor(a: Vector, beta: number) {
        this.a = a;
        this.beta = beta;

        const length = a.length;
        this.a = this.a.normalize();       
        this.beta = beta/length; 
    }

}

