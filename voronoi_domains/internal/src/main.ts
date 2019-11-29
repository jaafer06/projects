import * as paper from "paper";
import * as geo from "./geometry";
import { Point, Path } from "paper";
import { disconnect } from "cluster";

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

function createLineAndHyperPlane(p: Point, pp: Point) {
    hyperplanes.push(getHyperplane(p, pp, 1));
}

let hyperplanes: geo.HyperPlane[] = [];
let points: geo.Vector2D[] = [];
let paths: Path[] = [];
window.onload = function() {
    
    paper.setup("myCanvas");
    paper.view.center = new Point(0, 0);
    new Path.Circle(paper.view.center, 5).fillColor = "red";
    const rect = paper.view.bounds;

    hyperplanes.push(getHyperplane(rect.topRight, rect.topLeft));
    hyperplanes.push(getHyperplane(rect.topRight, rect.bottomRight));
    hyperplanes.push(getHyperplane(rect.bottomRight, rect.bottomLeft));
    hyperplanes.push(getHyperplane(rect.bottomLeft, rect.topLeft));
    // hyperplanes.push(new geo.HyperPlane(-0.8472419207998548, 0.5312072360570519, -99.95437422769716, true));
    // hyperplanes.push(new geo.HyperPlane(0.7880243737245634, -0.6156440419723151, 149.94626286277708, true));
    // hyperplanes.push(new geo.HyperPlane(-0.36476124982311886, -0.9311010850748034, 164.63211041358716, true));
    // hyperplanes.push(new geo.HyperPlane(0.7979045642041152, -0.6027837974118424, 191.71312197222193, true));

    paper.view.zoom = 1.0035;


    paper.view.onClick = (event: paper.MouseEvent) => {
       
        if(event.modifiers.alt) {
            if(paths.length != points.length) {
                paths.forEach(p => p.remove());
                paths = Array.from({length: points.length}, () => (new Path()));
            }

            const hyss = geo.computeVoronoiDomains(points);
            for(let i =0; i< hyss.length; ++i) {
                geo.convexHull(hyss[i].concat(...hyperplanes), paths[i] , "black");
            }
            return;
        };
        
        if(event.modifiers.shift) {
            
            return;
        }
        
        points.push(new geo.Vector2D(event.point.x, event.point.y, true));
        
    }

    paper.view.onMouseDrag = (event: paper.MouseEvent) => {
        
    }

}