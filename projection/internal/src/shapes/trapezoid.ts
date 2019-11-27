import { Path, Point, Color, Rectangle } from 'paper'

export class Trapezoid {
    private path: Path;
    
    constructor(height: number, base1Length: number, base2Length: number) {
        this.path = new Path();
        // this.path.remove();

        this.path.add(new Point(-base1Length/2, 0));
        this.path.add(new Point(-base2Length/2, -height));
        
        this.path.add(new Point(base2Length/2, -height));
        this.path.add(new Point(base1Length/2, 0));

        this.path.fillColor = new Color("red");
        this.path.position = new Point(0, 0);

    }

    public remove() {
        this.path.remove();
    }

    public rotate(angle: number, center: Point|undefined = undefined) {
        this.path.rotate(angle, center);
    }

    set position(point: Point) {
        this.path.position = point;        
    }

    get points(): [Point, Point, Point, Point] {
        return this.path.segments.map(s=>s.point) as [Point, Point, Point, Point];
    }
}