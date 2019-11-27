import { Point, Path, Rectangle, Size, Color, Segment } from 'paper'
import * as math from './math';
import { Trapezoid } from './shapes/trapezoid';
import { Rectangle as Rect } from './shapes/rectangle';
import { Shape } from './shapes/shape';
import { Vector3D } from './math';

type FourVectors = [Vector3D, Vector3D, Vector3D, Vector3D];

export class Camera {
    public horizonDistanceScaling: number;
    private projectionMatrix: math.Matrix3D;
    private shapes: Shape[];
    constructor() {
        this.horizonDistanceScaling = 50;
        this.projectionMatrix = math.identity();
        this.shapes = [];
    }

    public update(position: Point) {
        this.updateProjectionMatrix(position);
        for (let shape of this.shapes) {
            this.project(shape);
        }
    }

    public addShape(shape: Shape) {
        this.shapes.push(shape);
    }

    private updateProjectionMatrix(position: Point) {

        let t = position.rotate(90);
        const referencePoint1 = math.toHomogeneousCoordinates(t.normalize(50).add(position));
        const referencePoint2 =  math.toHomogeneousCoordinates(t.normalize(-50).add(position));
        const visibleHorizon = math.toHomogeneousCoordinates(position.multiply(-1.5).normalize(200));
        const invisibleHorizon = math.clone(referencePoint1);
        invisibleHorizon[2] = 0;
        visibleHorizon[2] = 0;
        
        const from: FourVectors = [referencePoint1, referencePoint2, visibleHorizon, invisibleHorizon];
        const to: FourVectors = [referencePoint1, referencePoint2, math.cloneAndSet(visibleHorizon, 2, 1), invisibleHorizon];


        this.computeProjectionMatrix(from, to);
        
    }

    private project(shape: Shape){
        shape.projectedPoints = shape.originalPoints.map(p => math.augmentAndMultiply(this.projectionMatrix, p));
    }

    private computeProjectionMatrix(from: FourVectors, to: FourVectors) {
        const [A, B, C, D] = from;
        const [Ap, Bp, Cp, Dp] = to;
        let M2: math.Matrix3D = math.transpose([A, B, C]);
        const factors2: math.Vector3D = math.solve(M2, D);
        M2 = math.multiplyMatrixColumnsBy(factors2, M2);
        M2 = math.inverse(M2);

        let M1: math.Matrix3D = math.transpose([Ap, Bp, Cp]);
        const factors1: math.Vector3D = math.solve(M1, Dp);
        M1 = math.multiplyMatrixColumnsBy(factors1, M1);
        this.projectionMatrix = math.multiplyMatrices(M1, M2);
    }

   
}
