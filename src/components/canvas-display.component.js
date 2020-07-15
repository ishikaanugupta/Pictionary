import React, { Component } from 'react';

const canvasStyle = {
    width: "100vw",
    height: "70vh",
    marginTop: "10.5vh"
};

export default class CanvasDisplay extends Component {

    constructor(props){
        super(props)
        this.canvasRef = React.createRef()
    }

    displaySketch = () => {
        if(this.canvasRef.current !== null){
            const ctx = this.canvasRef.current.getContext('2d');
            ctx.width = window.innerWidth * 2;
            ctx.height = window.innerHeight * 2;
            console.log(window.innerWidth, window.innerHeight);
            ctx.style.width = `${window.innerWidth}px`;
            ctx.style.height = `${window.innerHeight}px`;
            ctx.scale(2,2)
            ctx.lineCap = "round"
            ctx.strokeStyle = "black"
            ctx.lineWidth = 0.5
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(800, 400);
            ctx.stroke();
            //this.props.sketchArray.forEach( stroke => {
            //    
            //})
        }
    }
    

    componentDidMount(){
        this.displaySketch();
    }

    render() {
        return(
            <canvas id = "canvas" ref = {this.canvasRef} resize="true" style = {canvasStyle} />
        );
    }
}