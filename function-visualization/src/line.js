import paper, { Point, Segment } from "paper"


class Line extends paper.Path {

 
    constructor(from, to, stepSize) {
        super();
        this.strokeColor = "black";
        let direction = to.subtract(from).normalize(stepSize);
        let length = to.subtract(from).length;
        let steps = Math.floor(length/stepSize);
        let current = from;
        for(let i=0; i<steps; ++i)  {
            this.add(current);
            current.x = current.x + direction.x;
            current.y = current.y + direction.y;
        }
        this.add(to);
        this.stepVectors = new Array(this.segments.length);
        this.stepsCount = 0;
    }

    applyFunction(f_x, f_y, center, unitSize, animationDuration, fps) {
        
        this.stepsCount = Math.floor((animationDuration/1000)*fps);
        for(let i in this.segments) {
            let current = this.segments[i];

            let x = current.point.x;
            let y = current.point.y;
            let start = current.point.clone();
            let to_x = f_x((x-center.x)/unitSize, (y-center.y)/unitSize)*unitSize + center.x;
            let to_y = -f_y((x-center.x)/unitSize, -(y-center.y)/unitSize)*unitSize + center.y;
            let target = new Point(to_x, to_y);

            let distance = target.subtract(start).length;
            let stepSize = (distance/this.stepsCount);
            let stepVector = target.subtract(start).normalize(stepSize);
            this.stepVectors[i] = stepVector;

            // let currentStep = 0;
            // let timer = setInterval(()=> {
                
            //     current.point = current.point.add(stepVector);
            //     ++currentStep;
                
            //     if(currentStep === steps) {
            //         clearInterval(timer);
            //         current.point = target;
            //     }
                
            // }, stepDuration);

            // current.point.x = to_x;
            // current.point.y = to_y;
        }

       
   
    }

    moveToTarget() {
        
        if(this.stepsCount==0) {
            return true;
        }
        for(let i in this.segments) {
            const current = this.segments[i];
            
            current.point.x = current.point.x + this.stepVectors[i].x;
            current.point.y = current.point.y + this.stepVectors[i].y;
        }
        --this.stepsCount;

        return true;
    }

}

export default Line;