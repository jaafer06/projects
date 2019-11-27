import * as paper from 'paper';
import { Camera } from './camera';
import * as math from './math';
import { Rectangle } from './shapes/rectangle';
import { Line } from './shapes/line';
import { Shape } from './shapes/shape';

window.onload = function() {

    paper.setup("myCanvas");
    paper.view.center = new paper.Point(0, 0);

    let camera = new Camera();
    createGird(10, 10, 0, 20);
    paper.view.onMouseMove = (event: paper.MouseEvent) => {
        camera.update(event.point);
    }
    
    function createGird(width: number, height: number, spacing: number, rectSideLength: number) {
        for (let i = -Math.floor(width/2); i<Math.round(width/2); ++i) {
            for (let j = -Math.floor(height/2); j<Math.round(height/2); ++j) {
                const r = new Rectangle(new paper.Point(i*rectSideLength+i*spacing, j*rectSideLength+j*spacing), new paper.Size(rectSideLength, rectSideLength));
                camera.addShape(r);
            }  
        }
    }

}

