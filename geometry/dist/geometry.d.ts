import { Path, Color } from "paper";
export declare class Vector2D {
    asArray: [number, number];
    circle: Path.Circle | undefined;
    constructor(x: number, y: number, draw?: boolean);
    isMultiple(other: Vector2D): boolean;
    dot(other: Vector2D): number;
    dotRaw(x: number, y: number): number;
    readonly x: number;
    readonly y: number;
    multiply(scalar: number): void;
    add(other: Vector2D): void;
    clone(): Vector2D;
    draw(color?: string): void;
}
export declare class HyperPlane {
    readonly a: Vector2D;
    readonly beta: number;
    readonly angle: number;
    constructor(x: number, y: number, beta: number, draw?: boolean);
    intersect(other: HyperPlane): [number, number] | undefined;
    isInside(point: Vector2D): boolean;
    draw(): Path.Line;
}
export declare class Line {
    from: Vector2D;
    to: Vector2D;
    constructor(x1: number, y1: number, x2: number, y2: number);
}
export declare class Ray {
    from: Vector2D;
    direction: Vector2D;
    constructor(x: number, y: number, xd: number, yd: number);
}
export declare function isInConvexHull(hyperplanes: HyperPlane[], point: Vector2D): boolean;
export declare function findFeasibleVertex(hyperplanes: HyperPlane[]): [number, number, number, number, HyperPlane];
export declare function findDirection(hyperplanes: HyperPlane[], hyperplane: HyperPlane, xp: number, yp: number): number[] | undefined;
export declare function computeNexPoint(hyperplanes: HyperPlane[], startingHyperPlane: HyperPlane, x: number, y: number, xd: number, yd: number): [number, number, number, number, HyperPlane] | undefined;
export declare function convexHull(hyperplanes: HyperPlane[], path: Path, color?: string | Color | null): void;
export declare function computeVoronoiDomains(points: Vector2D[], additionalHyperPlanes?: HyperPlane[]): HyperPlane[][];
