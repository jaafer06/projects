import { Path, Size, Point, Color, Segment, project } from 'paper';
import { Shape } from './shape';

export class Line implements Shape {
   
    private line: Path.Line;
    private projectedLine: Path.Line;
    constructor(from: Point, to: Point, strokeWidth:number=3, color: string="blue") {
        this.line = new Path.Line(from, to);
        this.line.position = new Point(0, 0);
        this.line.strokeColor = new Color(color);
        this.line.strokeWidth = strokeWidth;
        this.line.remove();
        this.projectedLine = this.line.clone();
        this.projectedLine.addTo(project)
    }

    get originalPoints() {
        return this.line.segments.map(s => s.point);
    };

    set projectedPoints(points: Point[]) {
        this.projectedLine.removeSegments();
        this.projectedLine.segments = points.map(p => new Segment(p));
    };

    set position(point: Point) {
        this.line.position = point;
    }
}