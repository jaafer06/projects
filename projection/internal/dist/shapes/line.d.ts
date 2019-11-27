import { Point } from 'paper';
import { Shape } from './shape';
export declare class Line implements Shape {
    private line;
    private projectedLine;
    constructor(from: Point, to: Point, strokeWidth?: number, color?: string);
    readonly originalPoints: Point[];
    projectedPoints: Point[];
    position: Point;
}
