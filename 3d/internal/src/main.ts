import { Vector } from "./vector";
import { Cube } from "./scene";
import { Camera } from "./camera";
import * as obj from "./obj";
import { Shape } from "./shape";

let canvas: CanvasRenderingContext2D;
let angle = 0;
const camera = new Camera();
let frames = 0;
let downPosition: Vector | undefined;
let shapes: Shape[] = [];
window.addEventListener("keydown", (event: KeyboardEvent) => {
   
    const speed = 100;
    if(event.key === "ArrowUp") {
        camera.move("up", speed);
    } 
    if(event.key === "ArrowDown") {
        camera.move("down", speed);
    }
    if(event.key === "d") {
        camera.move("left", speed);
    }
    if(event.key === "q") {
        camera.move("right", speed);
    }
    if(event.key === "z") {
        camera.move("forward", speed);
    }
    if(event.key === "s") {
        camera.move("backward", speed);
    }
    
});

window.addEventListener("mousedown", (event) => downPosition = new Vector([event.clientX, event.clientY]));
window.addEventListener("mouseup", () => downPosition = undefined)
window.addEventListener("mousemove", (event) => {
    if (!downPosition) {
        return;
    } 
    const dvector = new Vector([event.clientX, event.clientY]).subtract(downPosition);
    downPosition = new Vector([event.clientX, event.clientY]);

    camera.rotate(dvector.coordinates[0]* 0.003, "z");
    camera.rotate(dvector.coordinates[1]* 0.003, "x");
})

window.onload = () => {
    const htmlCanvas = document.querySelector("canvas");
    const submitButton = document.querySelector("button");
    camera.translate(new Vector([-5000, -2050, -2000]));
    if (submitButton) {
        submitButton.onclick = () => {
            let shape = obj.parse(document.querySelector("textarea")?.value || "");
            shapes.push(shape);
            shape.scale(100);
            shape.translate(new Vector([400, 100, 100]));      
        };
    }
    
    if (!htmlCanvas) {
        throw new Error("canvas not found");
    }
    htmlCanvas.width = window.innerWidth * 3 / 4;
    htmlCanvas.height = window.innerHeight * 0.98;
    const c = htmlCanvas.getContext("2d");
    if(!c) {
        throw new Error("2d context not found");
    }

    canvas = c;
    if(canvas) {
        window.requestAnimationFrame(() => draw(0));
    }
};

function draw(angle: number = 0) {
    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvas.fill();
    // canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    angle = 0.1;
    for(const shape of shapes) {
        shape.rotate( [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]  )

        shape.rotate( 
            [
                [Math.cos(angle/3), 0, Math.sin(angle/3)],
                [0, 1, 0],
                [-Math.sin(angle/3), 0, Math.cos(angle/3)],
            ]
          )

        camera.render(shape, canvas);
    }

    window.requestAnimationFrame(() => draw(angle));

}

function ddraw(angle: number) {
    canvas.fillStyle = "red";
    canvas.strokeStyle = "black";
    

    // let cubePoints = Cube.edges.flat().map(cor => new Vector(cor).multiply(50).add(new Vector([50, 200, 100])));
    let cubePoints = Cube.transform(angle, new Vector([2.5, 2, 1.5])).map(cor => cor.multiply(50));

    let projectedPoints = camera.project(cubePoints);
    
    canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(let i=0; i< projectedPoints.length - 1; i+=2) {
        canvas.beginPath();
        canvas.arc(projectedPoints[i].coordinates[0], projectedPoints[i].coordinates[1], 5, 0, 2 * Math.PI, true);
        canvas.stroke();
        canvas.closePath();

        canvas.beginPath();
        canvas.arc(projectedPoints[i+1].coordinates[0], projectedPoints[i+1].coordinates[1], 5, 0, 2 * Math.PI, true);
        canvas.stroke();
        canvas.closePath();

        canvas.beginPath();
        canvas.moveTo(projectedPoints[i].coordinates[0], projectedPoints[i].coordinates[1]);
        canvas.lineTo(projectedPoints[i+1].coordinates[0], projectedPoints[i+1].coordinates[1]);
        canvas.stroke();
    }

    // canvas.beginPath();
    // canvas.arc(projectedPoints[projectedPoints.length-1].coordinates[1], projectedPoints[projectedPoints.length-1].coordinates[2], 5, 0, 2 * Math.PI, true);
    // canvas.stroke();
    window.requestAnimationFrame(() => draw(angle+0.05));
}
