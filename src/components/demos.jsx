import * as React from 'react';

const canvasStyle = {
    width: "100vw",
    height: "90vh",
    marginTop: "5.4vh"
};

export default  function CanvasDisplay(props) {

    const canvasRef = React.useRef(null)
    //const contextRef = React.useRef(null)
    const [context, setContext] = React.useState(null);

    React.useEffect( () =>{
        //let count = 0
        //let stroke = 0
        //let index = 0

        if(canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');
            if(renderCtx) {
                setContext(renderCtx);
                console.log("Updated context")
            }
        }

        if(context) {
            context.scale(2,2)
            context.lineCap = "round"
            context.strokeStyle = "black"
            context.lineWidth = 5

            props.sketchArray.forEach(stroke => {
                let index = 0
                console.log(stroke[0].length)
                while(index !== (stroke[0].length - 2)){
                    context.beginPath()
                    context.moveTo(stroke[0][index], stroke[1][index])
                    context.lineTo(stroke[0][index + 1], stroke[1][index + 1])
                    context.closePath()
                    index +=1
                }
            });
        }


        //const interval = setInterval( () => {
        //    if (context) {
        //        count += 1
        //            //console.log(count);
        //            if(stroke !== (props.sketchArray.length - 1)){
        //                if(index !== (props.sketchArray[stroke][0].length - 1)){
        //                    //if(count === props.sketchArray[stroke][2][index]){
        //                        console.log(count)
        //                        //console.log("HERE", stroke, index, props.sketchArray[stroke][0][index])
        //                        //console.log(props.sketchArray[stroke][0][index], props.sketchArray[stroke][1][index])      
        //                        //console.log(props.sketchArray[stroke][0][index + 1], props.sketchArray[stroke][1][index + 1])
        //                        context.fillStyle = "#0000";
        //                        context.fillRect(200,200, 500,500);
        //                        //context.moveTo(props.sketchArray[stroke][0][index], props.sketchArray[stroke][1][index]);
        //                        //context.lineTo(props.sketchArray[stroke][0][index + 1], props.sketchArray[stroke][1][index + 1]);
        //                        //context.stroke()
        //                        index += 1
        //                    //}
        //                } else {
        //                    index = 0
        //                    stroke += 1
        //                    
        //                    console.log("Interval cleared!")
        //                }
        //            }
        //    }
        //}, 1)

        return () => {
            //clearInterval(interval)
            console.log('CANVAS UNMOUNTING!');
        }
    }, [context, props.sketchArray]);

    return(
        <div>
            {
                !props.display && 
                <canvas id = "canvas" ref = {canvasRef} resize="true" style = {canvasStyle} />
            }
        </div> 
    );
}