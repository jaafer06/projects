import * as paper from "paper";
import * as geo from "./geometry";
import { Point, Path } from "paper";

const rayLength: number = 600;

function getHyperplane(p1: Point, p2: Point, direction: -1|1 = 1) {
    let x = -(p1.y - p2.y);
    let y = (p1.x - p2.x);
    if(p1.x*x+p1.y*y<0) {
        x = -x;
        y = -y;
    }
    
    let r = new geo.HyperPlane(x, y, (x*p1.x + y*p1.y))    
    r.draw();
    return r;
}



let points: geo.Vector2D[] = [];
let paths: Path[] = [];
let dragged: boolean = false;

window.onload = function() {
    
    paper.setup("myCanvas");
    paper.view.center = new Point(0, 0);
    const rect = paper.view.bounds;
    paper.view.zoom = 1.0035;
    // paper.view.zoom = 0.6;

    const width = rect.width;
    const height = rect.height;
  

    paper.view.onMouseUp = (event: paper.MouseEvent) => {
        if(dragged) {
            dragged = false;
            return;
        }
        if(event.modifiers.alt) {
            const circle =geo.smallestCircumsphere(points);
            console.log(circle);
            
            if (circle) {
                circle.draw();
                circle.center.draw();
            }
            return;
        };
        
        if(event.modifiers.shift) {
            
            return;
        }

        points.push(new geo.Vector2D(event.point.x, event.point.y, true));
        
    }

    paper.view.onMouseDrag = (event: paper.MouseEvent) => {
        dragged = true;
       

    }

}
