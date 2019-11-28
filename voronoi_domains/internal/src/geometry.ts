import * as math from "mathjs";
import { Path, Point } from "paper";

export class Vector2D {
    public readonly asArray: [number, number];
    constructor(x: number, y: number) {
        this.asArray = [x, y]
    }

    isMultiple(other: Vector2D): boolean {
        return (this.x/other.x == this.y/other.y);
    }

    dot(other: Vector2D) {
        return this.asArray[0] * other.asArray[0] + this.asArray[1] * other.asArray[1];
    }

    get x() {
        return this.asArray[0];
    }

    get y() {
        return this.asArray[1];
    }

    multiply(scalar: number) {
        this.asArray[0] *= scalar;
        this.asArray[1] *= scalar;  
    }

    add(other: Vector2D) {
        this.asArray[0] += other.x;
        this.asArray[1] += other.y;  
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

}

export class HyperPlane {
    public readonly a: Vector2D;
    public readonly beta: number;
    public readonly angle: number;
    constructor(x: number, y: number, beta: number) {
        const length = Math.sqrt(x*x+y*y);
        const xx = x/length;
        const yy = y/length;        
        
        this.a = new Vector2D(xx, yy);
        this.beta = beta/length; 

        this.angle = Math.atan2(xx, yy);
    }

    public intersect(other: HyperPlane): Vector2D | undefined {
        if(this.a.isMultiple(other.a)) {
            return undefined
        };
        const result = (math.lusolve([other.a.asArray, this.a.asArray], [other.beta, this.beta]) as number[][]);
        // let c = new Path.Circle(new Point(result[0][0], result[1][0]), 3);
        // c.fillColor = "yellow";

        return new Vector2D(result[0][0], result[1][0]);
    }
    
    isInside(point: Vector2D) {
        // console.log(point.dot(this.a), this.beta);
        
        return point.dot(this.a) <= this.beta+0.0005;
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

export class Ray {
    from: Vector2D;
    direction: Vector2D;

    constructor(x: number, y: number, xd: number, yd: number) {
        this.from = new Vector2D(x, y);
        this.direction= new Vector2D(xd, yd);
    }
}

export function isInConvexHull(hyperplanes: HyperPlane[], point: Vector2D) {
    for(let h of hyperplanes) {
        if (!h.isInside(point)) return false;
    }
    return true;
}

function arrangeClockWise(hyperplanes: HyperPlane[]) {
    return hyperplanes.sort((h1, h2) => h1.angle < h2.angle? 1 :-1);
}

export function findFeasibleVertex(hyperplanes: HyperPlane[]) {
    if(hyperplanes.length <3) {
        return {h: hyperplanes[0], index: 0};
    }
    for(let i =1; i<hyperplanes.length-1; ++i) {
        const hit = hyperplanes[i].intersect(hyperplanes[i-1]);
        if(hit && isInConvexHull(hyperplanes, hit)) {
            return {h: hyperplanes[i], index:i};
        }

        const hit2 = hyperplanes[i].intersect(hyperplanes[i+1]);
        if(hit2 && isInConvexHull(hyperplanes, hit2)) {
            return {h: hyperplanes[i], index: i};
        }
    
    }
    console.log(hyperplanes);
    
    throw "impossible";
}

export function convexHull(hyperplanes: HyperPlane[]) {
    let convexRegion = [];
    hyperplanes = arrangeClockWise(hyperplanes);
    
    const result = findFeasibleVertex(hyperplanes);
    
    let currentIndex = result.index;
    let currentHyperPlaneForward = result.h;
    while (currentIndex < hyperplanes.length-1) {
        const r = currentHyperPlaneForward.intersect(hyperplanes[currentIndex+1]);
        // console.log("forward" , r, isInConvexHull(hyperplanes, r as Vector2D));
       
        if(r && isInConvexHull(hyperplanes, r)) {
            convexRegion.push(r);
            currentHyperPlaneForward = hyperplanes[currentIndex+1];
        }
        ++currentIndex;
    };
    

    currentIndex = result.index;
    let currentHyperPlaneBackward = result.h;
    while (currentIndex > 0) {
        const r = currentHyperPlaneBackward.intersect(hyperplanes[currentIndex-1]);
        // console.log("backward" , r, isInConvexHull(hyperplanes, r as Vector2D));
        
        if(r && isInConvexHull(hyperplanes, r)) {
            convexRegion.unshift(r);
            currentHyperPlaneBackward = hyperplanes[currentIndex-1];
        }
        --currentIndex;
    };

    const last = currentHyperPlaneBackward.intersect(currentHyperPlaneForward);
    if(last) {
        convexRegion.unshift(last);
    }
    return convexRegion;
}

export function computeVoronoiDomains(points: Vector2D[]) {
    let result: Array<Array<HyperPlane>> = Array.from({length: points.length}, () => ([]))
    
    for(let i=0;i<points.length; ++i) {
        for(let j=0;j<points.length; ++j) {
            if(j !== i) {
                result[i].push(seperationHyperPlane(points[i], points[j]));                
            }
        }
    }
    return result;
}

function seperationHyperPlane(p1: Vector2D, p2: Vector2D) {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    const beta = ((p2.x + p1.x)/2) * x + ((p2.y + p1.y)/2) * y;
    return new HyperPlane(x,y, beta);
}