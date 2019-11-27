import { Point } from 'paper';
export declare class Trapezoid {
    private path;
    constructor(height: number, base1Length: number, base2Length: number);
    remove(): void;
    rotate(angle: number, center?: Point | undefined): void;
    position: Point;
    readonly points: [Point, Point, Point, Point];
}
