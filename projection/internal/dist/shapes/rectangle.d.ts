import { Size, Point } from 'paper';
import { Shape } from './shape';
export declare class Rectangle implements Shape {
    private rect;
    private projectedRect;
    constructor(position: Point, size: Size, color?: string);
    readonly originalPoints: Point[];
    projectedPoints: Point[];
    position: Point;
}
