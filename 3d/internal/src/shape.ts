import { Vector } from "./vector";
import { multiplyMV } from "./geometry";

export class Polygon {
    public points: Array<Vector>;
    public normal: Vector;
    public center: Vector;
    constructor(data: Array<Array<number>>) {
        this.points = data.map(coordinates => new Vector(coordinates));
        this.normal = this.points[0].subtract(this.points[1]).crossProduction(this.points[0].subtract(this.points[2]));        
        const c = this.points.reduce((acc, current) => {acc.inplaceAdd(current); return acc}, new Vector([0, 0, 0]));
        this.center =  c.divide(data.length);
    }

    scale(factor: number) {
        this.points.forEach(point => point.inplaceMultiply(factor));
        this.center.inplaceMultiply(factor);
    }

    rotate(matrix: number[][], rotationCenter: Vector) {        
        this.points.forEach(point => point.inplaceSubtract(rotationCenter));
        this.points = this.points.map(vector => multiplyMV(matrix, [...vector.coordinates])).map(point => new Vector(point));
        this.points.forEach(vector => vector.inplaceAdd(rotationCenter));
        this.normal = new Vector( multiplyMV(matrix, [...this.normal.coordinates]));

        this.center.inplaceSubtract(rotationCenter);
        this.center = new Vector([...multiplyMV(matrix, [...this.center.coordinates])]);
        this.center.inplaceAdd(rotationCenter); 
    }

    translate(trasnlationVector: Vector) {
        this.points.forEach(vector => vector.inplaceAdd(trasnlationVector));
        this.center.inplaceAdd(trasnlationVector);
    }

};

export class Shape {
    public readonly type: string | undefined;
    public readonly polygons: Polygon[];
    public readonly center: Vector;
    constructor(polygons: Polygon[]) {
        this.polygons = polygons;
        this.center = polygons.reduce((acc, current) => acc.add(current.center), new Vector([0, 0, 0])).divide(polygons.length);        
    }

    scale(factor: number) {
        this.polygons.forEach(polygons => polygons.scale(factor));
        this.center.inplaceMultiply(factor);
    }

    rotate(matrix: number[][]) {
        this.polygons.forEach(polygons => polygons.rotate(matrix,  this.center));
    }

    translate(trasnlationVector: Vector) {
        this.polygons.forEach(polygons => polygons.translate(trasnlationVector));
        this.center.inplaceAdd(trasnlationVector);
    }
}