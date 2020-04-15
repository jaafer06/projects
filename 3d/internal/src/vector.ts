// type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' |  'unshift'
// export type Vector<L extends number, TObj = [number, ...Array<number>]> =
//   Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
//   & {
//     readonly length: L 
//     [ I : number ] : number
//     [Symbol.iterator]: () => IterableIterator<number>
//   }

// export function add<d extends number>(v1: Vector<d>, v2: Vector<d>): Vector<d> {
//     let result = [];
//     Float32Array
// }

// export type Vector = Float32Array & { new: Float32ArrayConstructor };
import * as math from "mathjs";

export class Vector {
    
    public readonly coordinates: Float32Array;
    constructor(coordinates: number[] | Float32Array) {
        if (coordinates instanceof Array) {
            this.coordinates = new Float32Array(coordinates);
        } else {
            this.coordinates = coordinates;
        }
    }

    crossProduction(other: Vector) {
        const x = this.coordinates[1] * other.coordinates[2] -  this.coordinates[2] * other.coordinates[1];
        const y = this.coordinates[2] * other.coordinates[0] -  this.coordinates[0] * other.coordinates[2];
        const z = this.coordinates[0] * other.coordinates[1] -  this.coordinates[1] * other.coordinates[0];        
        return new Vector([x, y, z]);
    }

    add(other: Vector) {
        return new Vector(this.coordinates.map((value, index) => value + other.coordinates[index]));
    }

    addNumber(n: number) {
        return new Vector(this.coordinates.map((value, index) => value + n));
    }

    inplaceAdd(other: Vector) {
        this.coordinates.forEach((value, index) => this.coordinates[index] = value + other.coordinates[index] );
    }

    subtract(other: Vector) {
        return new Vector(this.coordinates.map((value, index) => value - other.coordinates[index]));
    }

    inplaceSubtract(other: Vector) {
        this.coordinates.forEach((value, index) => this.coordinates[index] = value - other.coordinates[index] );
    }
    
    multiply(by: number) {
        return new Vector(this.coordinates.map(value => value * by));
    }

    inplaceMultiply(by: number) {
        this.coordinates.forEach((value, index) => this.coordinates[index] = value * by );
    }

    divide(by: number) {
        return new Vector(this.coordinates.map(value => value / by));
    }

    dot(other: Vector) {
       return this.coordinates.reduce((acc, current, index) => acc + current*other.coordinates[index], 0);
    }

    normalize(n: number = 1) {
        return this.divide(this.length / n);
    }

    toString() {
        return this.coordinates.reduce((acc, current) => acc + current + ", ", "[")+"]"
    }
    
    get lengthSquared(): number {
        return this.coordinates.reduce((acc, current) => acc + current**2, 0);
    }
    
    get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

}