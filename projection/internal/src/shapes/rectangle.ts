import { Path, Size, Point, Color, Segment, project } from 'paper'
import { Shape } from './shape';

export class Rectangle implements Shape {
   
    private rect: Path.Rectangle;
    private projectedRect: Path.Rectangle;
    constructor(position: Point, size: Size, color: string = "black") {
        this.rect = new Path.Rectangle(position, size);
        this.rect.position = position;
        this.rect.strokeWidth = 1;
        this.rect.fillColor = new Color(color);
        this.rect.strokeColor = new Color("blue");
        this.rect.remove();
        this.projectedRect = this.rect.clone();
        this.projectedRect.addTo(project);
    }

    get originalPoints() {
        return this.rect.segments.map(s => s.point);
    };

    set projectedPoints(points: Point[]) {
        this.projectedRect.removeSegments();
        this.projectedRect.segments = points.map(p => new Segment(p));
    };

    set position(point: Point) {
        this.rect.position = point;
    }
}