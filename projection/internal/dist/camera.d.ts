import { Point } from 'paper';
import { Shape } from './shapes/shape';
export declare class Camera {
    horizonDistanceScaling: number;
    private projectionMatrix;
    private shapes;
    constructor();
    update(position: Point): void;
    addShape(shape: Shape): void;
    private updateProjectionMatrix;
    private project;
    private computeProjectionMatrix;
}
