import * as paper from "paper";
import * as geo from "./geometry";
import { Point, Path } from "paper";
import { disconnect } from "cluster";

const rayLength: number = 600;

function newLineFromPoint(p: Point, pp: Point) {

    let l = new Path.Line(p.multiply(50), pp.multiply(50));
    l.strokeWidth = 3;
    l.strokeColor = "black";
}

function newLine(x: number, y: number, xx: number = 0, yy: number = 0) {
    newLineFromPoint(new Point(x, y), new Point(xx, yy));
}

function getHyperplane(p1: Point, p2: Point, direction: -1|1) {
    let x = -(p1.y - p2.y);
    let y = (p1.x - p2.x);
    if(p1.x*x+p1.y*y<0) {
        x = -x;
        y = -y;
    }
    x *= direction;
    y *= direction;
    
    let r = new geo.HyperPlane(x, y, (x*p1.x + y*p1.y))    
    newLine(...r.a.asArray);
    return r;
}

let hyperplanes: geo.HyperPlane[] = [];

function createLineAndHyperPlane(p: Point, pp: Point) {
    let l = new Path.Line(p, pp);
    hyperplanes.push(getHyperplane(p, pp, 1));
    l.strokeWidth = 3;
    l.strokeColor = "black";
}



window.onload = function() {
    
    paper.setup("myCanvas");
    paper.view.center = new Point(0, 0);
    let c = new Path.Circle(paper.view.center, 5);
    c.fillColor = "red";
    let firstClick = true;
    let downPoint: Point;
    createLineAndHyperPlane(new Point(-133, -104), new Point(177, -67));
    createLineAndHyperPlane(new Point(124, -143), new Point(82, 145));
    createLineAndHyperPlane(new Point(-178, 114), new Point(144, 122));
    createLineAndHyperPlane(new Point(-114, 182), new Point(-102, -143));
    createLineAndHyperPlane(new Point(50, -136), new Point(135, 2));

    paper.view.onClick = (event: paper.MouseEvent) => {
        let direction: -1|1 = event.modifiers.control? -1: 1;
        if(event.modifiers.alt) {
            let convexRegion = geo.convexHull(hyperplanes);
            
            for(let p of convexRegion) {
                let c = new Path.Circle(new Point(p.x, p.y), 5);
                c.fillColor = "blue";
            }
            return;
        };
        
        if(event.modifiers.shift) {
            // console.log(geo.isInConvexHull(hyperplanes, new geo.Vector2D(event.point.x, event.point.y)));
            
            return;
        }
        
        if(firstClick) {
            downPoint = event.point;
            firstClick = !firstClick;
            return;
        } else {
            firstClick = !firstClick;
            let l = new Path.Line(downPoint, event.point);
            console.log(downPoint, event.point);
            
            hyperplanes.push(getHyperplane(downPoint, event.point, direction));
            l.strokeWidth = 3;
            l.strokeColor = "black";
        }
    }
    
}