import { HyperPlane, multiplyMV } from "./geometry";
import { Vector } from "./vector";
import { Shape } from "./shape";

export class Camera {
    private viewPlane: HyperPlane;
    // public readonly focalLength: number;
    private position: Vector;
    private xAxis: Vector;
    private yAxis: Vector;
    private projectionCenter: Vector;
    public lightSource: Vector;
    constructor() {
        this.viewPlane = new HyperPlane(new Vector([1, 0, 0]), 100);
        this.xAxis = new Vector([0, 1, 0]);
        this.yAxis = new Vector([0, 0, 1]);
        this.position = new Vector([-2000, 0, 0]);
        this.projectionCenter = new Vector([100, 0, 0]);

        this.lightSource = this.viewPlane.a;
    }

    public rotate(angle: number, axis: "x" | "y" | "z" = "z") {
        const rotationMatricies =  {
            z: [
                [Math.cos(angle), -Math.sin(angle), 0],
                [Math.sin(angle), Math.cos(angle), 0],
                [0, 0, 1]
            ],

            x: [
                [1, 0, 0],
                [0, Math.cos(angle), -Math.sin(angle)],
                [0, Math.sin(angle),Math.cos(angle)],
            ],

            y: [
                [Math.cos(angle), 0, Math.sin(angle)],
                [0, 1, 0],
                [-Math.sin(angle), 0, Math.cos(angle)],
            ]
        }

        let newPointOnPlane = this.viewPlane.a.multiply(this.viewPlane.beta).subtract(this.position);
        newPointOnPlane = new Vector(multiplyMV(rotationMatricies[axis], [...newPointOnPlane.coordinates])).add(this.position);


        const a = multiplyMV(rotationMatricies[axis], [...this.viewPlane.a.coordinates]);
        this.viewPlane = new HyperPlane(new Vector(a), newPointOnPlane.dot(new Vector(a)));

        this.projectionCenter.inplaceSubtract(this.position);
        this.projectionCenter = new Vector(multiplyMV(rotationMatricies[axis], [...this.projectionCenter.coordinates]));
        this.projectionCenter.inplaceAdd(this.position);

        this.xAxis = new Vector(multiplyMV(rotationMatricies[axis], [...this.xAxis.coordinates]));
        this.yAxis = new Vector(multiplyMV(rotationMatricies[axis], [...this.yAxis.coordinates]));
        
    }

    public project(points: Vector[]) {
        const result = [];
        for(const point of points) {
            const translationVectorCoefficient = this.viewPlane.a.dot(this.position.subtract(point));
            if (translationVectorCoefficient === 0) {
                const p = point.subtract(this.projectionCenter);
                const x = this.xAxis.dot(p);
                const y = this.yAxis.dot(p);
                result.push(new Vector([x, y]));
                continue;
            }

            const k = (this.viewPlane.beta - this.viewPlane.a.dot(point)) / translationVectorCoefficient;
            const proejctedPoint = point.add(this.position.subtract(point).multiply(k));
            // console.log(proejctedPoint.dot(this.viewPlane.a));
            const p = proejctedPoint.subtract(this.projectionCenter);
            const x = this.xAxis.dot(p);
            const y = this.yAxis.dot(p);

            result.push(new Vector([x, y]));
        }
        return result;
    }

    public render(shape: Shape, canvas: CanvasRenderingContext2D) {
        canvas.strokeStyle = "black";
        canvas.fillStyle = "grey";
        const lineOfSight = shape.polygons.map(polygon => polygon.center.subtract(this.position));
        const dotProducts = shape.polygons.map((polygon, index) => polygon.normal.dot(lineOfSight[index]));
        const visiablePolygons = shape.polygons;
            
        // const visiableTriangles = shape.triangles;        
        visiablePolygons.sort((t1, t2) => t1.center.subtract(this.position).lengthSquared > t2.center.subtract(this.position).lengthSquared ? -1 : 1);

        let maxDot = 0;
        let minDot = Number.MAX_SAFE_INTEGER;
        const light = visiablePolygons.map(polygon => {
            const dot = polygon.center.subtract(this.projectionCenter).dot(this.viewPlane.a)
            maxDot = maxDot > dot ? maxDot : dot;
            minDot = minDot > dot && dot >0 ? dot : minDot;
            return dot;
        }).map(lightValue => 255 - ((lightValue - minDot) / (maxDot - minDot) * 255));        
        let projectedPoints = visiablePolygons.map(polygon => this.project(polygon.points));
        // console.log(light);
        
        // for (const polygons of projectedPoints) {
        //     canvas.beginPath();

        //     canvas.moveTo(polygons[0].coordinates[0],polygons[0].coordinates[1]);
        //     canvas.lineTo(polygons[1].coordinates[0],polygons[1].coordinates[1]);
        //     canvas.lineTo(polygons[2].coordinates[0],polygons[2].coordinates[1]);
        //     canvas.closePath();
        //     canvas.stroke();
        //     canvas.fill();

        // }

        let index = 0;
        for (const polygon of projectedPoints) {
            canvas.beginPath();
            canvas.moveTo(polygon[0].coordinates[0], polygon[0].coordinates[1]);
            canvas.fillStyle = "rgb("+light[index]+","+light[index]+","+light[index]+")";
            canvas.strokeStyle = "rgb("+light[index]+","+light[index]+","+light[index]+")";

            ++index;
            polygon.shift();
            for (const point of polygon) {
                canvas.lineTo(point.coordinates[0], point.coordinates[1]);
            }
            canvas.closePath();
            canvas.stroke();
            canvas.fill();
        }
    }

    public translate(translationVector: Vector) {
        this.projectionCenter = this.projectionCenter.add(translationVector);
        this.position = this.position.add(translationVector);
        this.viewPlane = new HyperPlane(this.viewPlane.a, this.viewPlane.beta + this.viewPlane.a.dot(translationVector));
    }

    public move(direction: "forward" | "backward" | "up" | "down" | "left" | "right", magnitude: number = 1) {
        let directionVector = this.viewPlane.a.normalize();
        if (direction === "backward") {
            directionVector = directionVector.multiply(-1 * magnitude)
        } else if(direction === "forward"){
            directionVector = directionVector.multiply(magnitude)
        } else if (direction === "up") {
            directionVector = new Vector([0, 0, -1 * magnitude]);
        } else if (direction === "down") {
            directionVector = new Vector([0, 0, 1 * magnitude]);
        } else if (direction === "left") {
            directionVector = this.xAxis.normalize(magnitude);
        } else if (direction === "right") {
            directionVector = this.xAxis.normalize(-magnitude);
        } 
        this.projectionCenter = this.projectionCenter.add(directionVector);
        this.position = this.position.add(directionVector);
        this.viewPlane = new HyperPlane(this.viewPlane.a, this.viewPlane.beta + this.viewPlane.a.dot(directionVector));
    };
}