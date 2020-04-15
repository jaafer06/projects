import { Vector } from "./vector";
import { Shape, Polygon } from "./shape";

export function getCube() {
   
}

export function parse(data: string) {
    let lines = data.split("\n");
    const points: number[][] = [];
    const faces: number[][] = [];
    const normals: number[][] = [];
    const faceToNormal: number[] = [];

    for( const line of lines) {
        const lineStart: string | undefined  = (line.match(/^(\w)+/) || [])[0];
        
        if (lineStart === "v") {
           points.push((line.match(/(-?[0-9]+)\.?[0-9]*/g) || [""]).map(value => Number(value)));
        } else if (lineStart === "f") {
            // console.log(line.match(/([0-9]+)\//g)?.map(value => Number((value.match(/\d+/g) || [0])[0])));
            const face = line.match(/ ([0-9]+)\/?/g)?.map(value => Number((value.match(/\d+/g) || [0])[0])) || [0, 0, 0];
            faces.push(face);
            const matchResult = (line.match(/([0-9]+)\s*$/) || [""])[0];            
            faceToNormal.push(Number(matchResult));
        } else if (lineStart === "vn") {
            normals.push((line.match(/(-?[0-9]+)\.?[0-9]*/g) || [""]).map(value => Number(value)));            
        }
    }

    // const triangles = faces.map()
    console.log({ points, faces, normals, faceToNormal });
    const Polygons = faces.map(face => face.map(faceID => (points[faceID - 1])));
    let mesh = Polygons.map((vectors, index) => new Polygon(vectors));
    
    return new Shape(mesh);
    
}