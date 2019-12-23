import * as math from "mathjs";
import { Path, Point, Color } from "paper";

export class Vector2D {
    public asArray: [number, number];
    constructor(x: number, y: number, draw: boolean = false) {
        this.asArray = [x, y]
        if(draw) {
            this.draw();
        }
    }

    isMultiple(other: Vector2D): boolean {
        return (this.x/other.x == this.y/other.y);
    }

    dot(other: Vector2D) {
        return this.asArray[0] * other.asArray[0] + this.asArray[1] * other.asArray[1];
    }

    dotRaw(x: number, y: number) {
        return this.asArray[0] * x + this.asArray[1] * y;
    }

    get x() {
        return this.asArray[0];
    }

    get y() {
        return this.asArray[1];
    }

    multiply(scalar: number): Vector2D {
        return new Vector2D(this.asArray[0] * scalar, this.asArray[1] * scalar);
    }

    add(v: number|Vector2D): Vector2D {
        if(v instanceof Vector2D) {
            return new Vector2D(this.asArray[0] + v.asArray[0], this.asArray[1] + v.asArray[1]);
        }
        return new Vector2D(this.asArray[0] + v, this.asArray[1] + v);
    }

    minus(v :Vector2D) {
        return new Vector2D(this.asArray[0] - v.x, this.asArray[1] - v.y);
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

    draw(color: string = "blue") {
        const d = new Path.Circle(new Point(this.asArray), 5);
        d.fillColor = color;
    }

    getPerpendicular(norm: number=1): Vector2D {
        const x = this.y;
        const y = -this.x;
        return new Vector2D(x, y)
    }

    length(): number {
        return length(this.x, this.y);
    }
}

export function solve(matrix: number[][], vector: number []): number[] | undefined {
    try {
        const result = (math.lusolve(matrix, vector) as number[][]).map(v => v[0]) ;
        return result;
    } catch(e) {
        return undefined;
    }
}

export function multiplyMV(matrix: number[][], vector: number[]) {
    math.multiply(matrix, vector) as number[];
}

export function multiplyMs(matrix: number[][], scalar: number): number[][] {
    return math.multiply(matrix, scalar) as number[][];
}

export function multiplyMM(matrix1: number[][], matrix2: number[][]) {
    return math.multiply(matrix1, matrix2) as number[][];
}

export function transpose(matrix: number[][]): number[][] {
    return math.transpose(matrix) as number[][];
}

export function length(x: number, y: number) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function lengthSquared(x: number, y: number) {
    return (Math.pow(x, 2) + Math.pow(y, 2));
}

export class HyperPlane {
    public readonly a: Vector2D;
    public readonly beta: number;
    public readonly angle: number;
    constructor(x: number, y: number, beta: number, draw: boolean = false) {
        const length = Math.sqrt(x*x+y*y);
        const xx = x/length;
        const yy = y/length;        
        
        this.a = new Vector2D(xx, yy);
        this.beta = beta/length; 

        this.angle = Math.atan2(xx, yy);
        if (draw) {
            this.draw();
        }
    }

    public intersect(other: HyperPlane): Vector2D | undefined {
        if(this.a.isMultiple(other.a)) {
            return undefined
        };

        const y = (other.beta - other.a.x * this.beta/this.a.x) / (other.a.y - other.a.x*this.a.y/this.a.x);
        const x = (this.beta - y*this.a.y)/this.a.x
        return new Vector2D(x, y);
    }
    
    isInside(point: Vector2D) {        
        return point.dot(this.a) <= this.beta+0.00005;
    }

    public draw() {
        const firstPoint = this.a.clone();
        firstPoint.multiply(this.beta);
        const v1: Vector2D = new Vector2D(-firstPoint.y, firstPoint.x );
        const v2: Vector2D = new Vector2D(firstPoint.y, -firstPoint.x );
        v2.multiply(100);
        v1.multiply(100);
        v1.add(firstPoint);
        v2.add(firstPoint);
        const [x,y, xx, yy] = [...v1.asArray, ...v2.asArray];
        const l = new Path.Line(new Point(v1.asArray), new Point(v2.asArray));
        l.strokeWidth = 3;
        l.strokeColor = "black";
        const direction = new Path.Line(new Point(firstPoint.asArray), new Point(firstPoint.asArray).add(new Point(this.a.asArray).normalize(60)));
        direction.strokeWidth = 3;
        direction.strokeColor = "black";
        return l;
    }

}

export class Line {
    from: Vector2D;
    to: Vector2D;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.from = new Vector2D(x1, y1);
        this.to = new Vector2D(x2, y2);
    }
}

class Circle {
    public readonly radius: number;
    public readonly center: Vector2D;

    constructor(radius: number, center: Vector2D) {
        this.radius = radius;
        this.center = center;
    }

    public draw(color: string|Color = new Color(0, 0.5)) {
        const c = new Path.Circle(new Point(this.center.x, this.center.y), this.radius);
        c.fillColor = color;
    }

    public isInside(point: Vector2D) {
        return point.minus(this.center).length() <= this.radius - 0.0005;
    }
}



export function smallestCircumsphere(points: Vector2D[]): Circle | undefined {
    
    const a0 = points[0];
    const b = new Array(points.length-1);
    const A = new Array<[number, number]>(points.length-1);

    for(let i=0; i<b.length; ++i) {
        const m = points[i+1].minus(a0);
        A[i] = [m.x, m.y];
        b[i] = lengthSquared(m.x, m.y)/2;
    }

    const AT = transpose(A);
    const lambdas = solve(multiplyMM(A, AT), b);
    if (lambdas) {
        const lambda0 =  1-lambdas.reduce((a, c) => a+c, 0);        
        let center: [number, number] = [lambda0*a0.x, lambda0*a0.y];
        for(let i=1; i<points.length; ++i) {
            center[0] += lambdas[i-1]*points[i].x;
            center[1] += lambdas[i-1]*points[i].y;
        }
        const c = new Vector2D(center[0], center[1]);
        const r = c.minus(a0).length();
        return new Circle(r, c);
    }
    return undefined;
}