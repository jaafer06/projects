import * as math from "mathjs";
import { Path, Point } from "paper";

export class Vector2D {
    public readonly asArray: [number, number];
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

    draw(color: string = "green") {
        const d = new Path.Circle(new Point(this.asArray), 10);
        d.fillColor = color;
        return d;
    }

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

    public intersect(other: HyperPlane): [number, number] | undefined {
        if(this.a.isMultiple(other.a)) {
            return undefined
        };

        const y = (other.beta - other.a.x * this.beta/this.a.x) / (other.a.y - other.a.x*this.a.y/this.a.x);
        const x = (this.beta - y*this.a.y)/this.a.x
        return [x, y];
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

function isInConvexHullRaw(hyperplanes: HyperPlane[], x: number, y: number) {
    for (let h of hyperplanes) {
        if(!(x * h.a.x + y * h.a.y <= h.beta + 0.05)) {
            return false;
        };
    }
    return true;
}

function arrangeClockWise(hyperplanes: HyperPlane[]) {
    return hyperplanes.sort((h1, h2) => h1.angle < h2.angle? 1 :-1);
}

//returns direction if hyperplane is active and not redundant, undefined otherwise
function isSupporingHyperPlane(hyperplane: HyperPlane, hyperplanes: HyperPlane[], xp: number, yp: number): [number, number] | undefined {

    const x = -hyperplane.a.y;
    const y = hyperplane.a.x; 

    const xx = -x;
    const yy = -y;
    // new Vector2D(x+xp, y+yp).draw("blue");
    // new Vector2D(xx+xp, yy+yp).draw("blue");
    // new Vector2D(xp, yp).draw("yellow");
    
    if(isInConvexHullRaw(hyperplanes, x+ xp, y +yp)) {
        return [x, y];
    } else if(isInConvexHullRaw(hyperplanes, xx +xp, yy + yp)) {
        return [xx ,yy];
    }
    return undefined;
}


// returns hit, direction, none redundant active hyperplane, undefined otherwise
export function findFeasibleVertex(hyperplanes: HyperPlane[]): [number, number, number, number, HyperPlane] {

    for(let i =0; i<hyperplanes.length-1; ++i) {
        for(let j=i+1; j<hyperplanes.length; ++j) {
            const hit = hyperplanes[i].intersect(hyperplanes[j]);

            if(hit && isInConvexHullRaw(hyperplanes, ...hit)) {
                const direction = isSupporingHyperPlane(hyperplanes[i], hyperplanes, ...hit);
                if(direction) {
                    return [hit[0], hit[1], direction[0], direction[1], hyperplanes[i]];
                }
            }
        }
    }    
    throw "impossible";
}

export function findDirection(hyperplanes: HyperPlane[], hyperplane: HyperPlane, xp: number, yp: number) {
    const x = -hyperplane.a.y*10;
    const y = hyperplane.a.x*10;
    const xx = -x;
    const yy = -y;
    if(isInConvexHullRaw(hyperplanes, x+ xp, y +yp)) {
        return [x, y];
    } else if(isInConvexHullRaw(hyperplanes, xx +xp, yy + yp)) {
        return [xx ,yy];
    }
    return undefined;
}

// return: next point, next direction, actievHyperplane
export function computeNexPoint(hyperplanes: HyperPlane[], startingHyperPlane: HyperPlane, x: number, y: number, xd: number, yd: number) {
    let minDistance: number = Number.MAX_SAFE_INTEGER;
    
    let result: [number, number, number, number, HyperPlane] | undefined;
    
    for(let h of hyperplanes) {
        if(h !== startingHyperPlane) {
            const aTransposeDirection = h.a.dotRaw(xd, yd);
            
            if(aTransposeDirection == 0) {
                continue;
            }

            const k = (h.beta-h.a.dotRaw(x, y)) / aTransposeDirection;
            
            if(k>=0.0005 && k < minDistance) {
                const xNext = xd*k + x;
                const yNext = yd*k + y;                
                const newDirection = isSupporingHyperPlane(h, hyperplanes, xNext, yNext);                
                if(newDirection) {
                    result = [xNext, yNext, newDirection[0], newDirection[1], h];
                }
            }
        }
    }
    
    return result;
}

function drawPointAndDirection(x: number, y: number, xd: number, yd: number) {
    new Vector2D(x+xd*10, y+yd*10).draw("blue");
    new Vector2D(x, y).draw("yellow");

}
export function convexHull(hyperplanes: HyperPlane[], path: Path, color: string = "black") {
    hyperplanes = arrangeClockWise(hyperplanes);
    let [x, y, xd, yd, h] = findFeasibleVertex(hyperplanes);
    const startingHyperplane = h;
    path.removeSegments();
    do {
        path.add(new Point(x, y));
        path.strokeColor = color;
        path.strokeWidth = 2;
        const result = computeNexPoint(hyperplanes, h, x, y, xd, yd);
        if(result) {
            [x, y, xd, yd, h] = result;
        } else {
            console.log("unexpected");
            return;
        }
      
    } while(startingHyperplane!= h);
    path.closed = true;
    
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
    return new HyperPlane(x,y, beta, false);
}