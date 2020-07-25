import React, { Component } from 'react';
import './styles.css';
 
export default class CanvasDisplay extends Component {
    constructor(props){
        super(props)
        this.canvasRef = React.createRef()
    }
 

    displaySketch = () => {
        const max = this.rescaleArray();
        if(this.canvasRef.current !== null){
            const ctx = this.canvasRef.current.getContext('2d');
            ctx.lineCap = "round"
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            let index = 0 
            let stroke = 0
            const ticktock = setInterval( () => {
                if(this.props.playState){
                    if(stroke < this.props.sketchArray.length){
                        let line = this.props.sketchArray[stroke];
                        if(index !== (line[0].length)){
                            const x1 = 250 * line[0][index]/max[0];
                            const x2 = 250 * line[0][index + 1]/max[0];
                            const y1 = 100 * line[1][index]/max[1];
                            const y2 = 100 * line[1][index + 1]/max[1];
                            ctx.beginPath();
                            ctx.moveTo( x1, y1);
                            ctx.lineTo( x2, y2);
                            ctx.stroke();
                            index +=1
                        } else {
                            index = 0;
                            stroke += 1;
                        }
                    } else {
                        clearInterval(ticktock);
                    }
                }
            }, 35)
        }
    }

    rescaleArray = () => {
        let maxX = 0
        let maxY = 0
        this.props.sketchArray.forEach(stroke => {
            let x = Math.max.apply(Math, stroke[0])
            let y = Math.max.apply(Math, stroke[1])
            if(x > maxX) { 
                maxX = x 
            }
            if(y > maxY) { 
                maxY = y 
            }
        });
        return [maxX, maxY]
    }

    componentDidMount(){
        this.displaySketch();
    }

    render() {
        return(
            <div className="p-5 d-flex justify-content-center align-items-center fullScreen">
                {
                    <canvas id = "canvas" className = "myCanvas" ref = {this.canvasRef} resize="true" />
                }
            </div>
        );
    }
}