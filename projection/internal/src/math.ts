import { Point } from 'paper'
import * as math from 'mathjs'
export type Vector3D = [number, number, number];
export type Matrix3D = [Vector3D, Vector3D, Vector3D];

export function inverse(matrix: Matrix3D): Matrix3D {
    return math.inv(matrix) as Matrix3D;
}

export function transpose(matrix: Matrix3D): Matrix3D {
    return math.transpose(matrix) as Matrix3D;
}

export function multiply(target: Vector3D, scalar: number): Vector3D {
   return [target[0]*scalar, target[1]*scalar, target[2]*scalar];
}

export function multiplyMatrices(m1: Matrix3D, m2: Matrix3D): Matrix3D {
    return math.multiply(m1, m2) as Matrix3D;
}

export function multiplyMatrixColumnsBy(v: Vector3D, m: Matrix3D) {
    return math.multiply(math.diag(v), m) as Matrix3D;
}

export function augmentAndMultiply(matrix: Matrix3D, point: Point): Point {
    const augmented: Vector3D = [point.x, point.y, 1];
    const result = math.multiply(matrix, augmented) as Vector3D;
    return new Point(math.divide(result, result[2]));
}

export function identity(): Matrix3D {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

export function solve(matrix: Matrix3D, vector: Vector3D): Vector3D {
    return (math.lusolve(matrix, vector) as number[][]).map(v => v[0]) as Vector3D;
}

export function toInfinitePoint(vector: Vector3D): Vector3D {
    return [vector[0], vector[1], 0];
}

export function crossProduct(v1: Vector3D, v2: Vector3D) {
    return math.cross(v1, v2) as Vector3D;
}

export function toHomogeneousCoordinates(p: Point): Vector3D {
    return [p.x, p.y, 1];
}

export function toNormalCoordinates(v: Vector3D): Point {
    return new Point(v[0]/v[2], v[1]/v[2]);
}

export function clone(v: Vector3D): Vector3D {
    return v.map(n =>n) as Vector3D;
}

export function cloneAndSet(v:Vector3D, index: 0|1|2, value:number) {
    const result = clone(v);
    result[index] = value;
    return result;
}