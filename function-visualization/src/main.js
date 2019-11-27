import paper, { Path, Point, Rectangle, Tool, Size, view, ToolEvent } from 'paper';
import Line from "./line"

window.onload = function() {
    
    paper.setup("myCanvas");
    run();
}


function run() {
    paper.view.autoUpdate = false;

    var unit = 30;
    var fps = 60;
    let precision = 1;

    let center = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
    let current = center.clone();

    let iterations = Math.max((paper.view.viewSize.width/2)/unit, (paper.view.viewSize.height/2)/unit);
    let width = paper.view.viewSize.width;
    let height = paper.view.viewSize.height;

    iterations = Math.round(iterations) + 1;
    var lines = [];
    
    let x_axis = new Line(new Point(0, height/2), new Point(width, height/2), precision);
    let y_axis = new Line(new Point(width/2, 0), new Point(width/2, height), precision);
    lines.push(x_axis);
    lines.push(y_axis);
    
    for(let i=1; i<iterations; ++i) {

        let positiveVerticalFrom = new Point(center.x + i*unit, 0);
        let positiveVerticalTo = new Point(center.x + i*unit, height);

        let negativeVerticalFrom = new Point(center.x - i*unit, 0);
        let negativeVerticalTo = new Point(center.x - i*unit, height);

        lines.push(new Line(positiveVerticalFrom, positiveVerticalTo, precision));
        lines.push(new Line(negativeVerticalFrom, negativeVerticalTo, precision));


        let positiveHorizontalFrom = new Point(0, center.y+i*unit);
        let positiveHorizontalTo = new Point(width, center.y+i*unit);

        let negativeHorizontalFrom = new Point(0, center.y-i*unit);
        let negativeHorizontalTo = new Point(width, center.y-i*unit);

        lines.push(new Line(positiveHorizontalFrom, positiveHorizontalTo, precision));
        lines.push(new Line(negativeHorizontalFrom, negativeHorizontalTo, precision));

    }

    paper.view.update();
    paper.view.onClick = () => {
        
        let center = paper.view.center;
        let f_x = (x,y) => {
            let angle = Math.atan2(y, x);
            return x;
        };
    
        let f_y = (x,y) => {
            let angle = Math.atan2(y, x);
            return y*y*Math.sin(y);
        }

        for(let i in lines) {

            lines[i].applyFunction(f_x, f_y, center, unit, 5000, fps);

        }

        let timer = setInterval(()=> {

            let change = false;
            for(let i in lines) {
                let c = lines[i].moveToTarget();
                change = change || c;
            }
            if(!change) {
                clearInterval(timer);
            }
            paper.view.update();

        }, 1000/fps);

    }

   
    
}

function cosCone() {
    let f_x = (x,y) => {
        return x*y*Math.cos(x);
    };

    let f_y = (x,y) => {
        return y*x;
    }
    return [f_x, f_y];
}

function interesting1() {
    let f_x = (x,y) => {
        return x+y*y;
    };

    let f_y = (x,y) => {
        return y*x;
    }
    return [f_x, f_y];
}

function interesting2() {
    let f_x = (x,y) => {
        return y;
    };

    let f_y = (x,y) => {
        return x*x+y*y;
    }
    return [f_x, f_y];

}

function interesting3() {

    let f_x = (x,y) => {
        return x*Math.log(y*y);
    };

    let f_y = (x,y) => {
        return y*x;
    }

}

function almostCircle() {
    let f_x = (x,y) => {
        let angle = Math.atan2(y, x);
        return Math.sin(angle)*x*x;
    };

    let f_y = (x,y) => {
        let angle = Math.atan2(y, x);
        return x*x*Math.cos(angle);
    }
}
