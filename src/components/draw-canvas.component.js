import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Timer from './timer.component';
import Scoreboard from './scoreboard.component';
import Navbar from './navbar.component';
import PopupDraw from './popup-draw.component';
import Popup from 'reactjs-popup';
import axios from 'axios';
import jimp from 'jimp';
import Speech from 'speak-tts';
import './styles.css';
import UIfx from 'uifx';
import Tick from './sounds/Tick.mp3';
import Metronome from './sounds/Metronome.mp3';
import ButtonClick from './sounds/Button_Click.mp3';

const buttonClicked = new UIfx(
    ButtonClick,
    {
        volume: 1
    }
)

const metro = new UIfx(
    Metronome,
    {
        volume: 1
    }
)

const tick = new UIfx(
    Tick,
    {
        volume: 1
    }
)

const canvasStyle = {
    borderColor: 'aliceblue',
    borderStyle: 'inset',
    width: '700px',
    height: "500px",
    margin: 'auto'
};

const popupStyle = {
    width: 'max-content',
    padding: '20px',
    backgroundColor: 'aliceblue',
    color: '#0275d8',
    borderColor: 'aliceblue',
    borderRadius: '10px',
    borderWidth: '1px'
}

const speech = new Speech()

let intID = ''

export default class DrawCanvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            popupDisplay: true,
            choices: ['airplane', 'apple', 'bird', 'face', 'fish', 'flower', 'house', 'star', 'train', 'tree'],
            playerChoice: "",
            seconds: 20,
            score: 0,
            playState: false,
            modelGuess: "",
            displayController: true,
            correctGuess: true
        }
        this.myCanvas = React.createRef();
    }

    convertURIToImageData = (URI) => {
        return new Promise(function(resolve, reject) {
            if (URI == null) return reject();
            var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
            image.addEventListener('load', function() {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(context.getImageData(0, 0, canvas.width, canvas.height));
            }, false);
            image.src = URI;
        });
    }

    getAnswer = () => {
        const sketch = this.myCanvas.current.canvasContainer.children[1].toDataURL()
        this.convertURIToImageData(sketch)
            .then(sketchData => {
                jimp.read(sketchData, (err, sketchConvert) => {
                    if (err) throw err;
                    sketchConvert
                        .resize(28, 28)
                        .getBase64(jimp.AUTO, (err, sketch28RGBA) => {
                            this.convertURIToImageData(sketch28RGBA)
                                .then(sketch28RGBAdata => {
                                    let data = Object.values(sketch28RGBAdata['data']).map( value => value)
                                    let inputToModel = []
                                    for(let i = 2; i < 3136; i+=4){
                                        inputToModel.push(data[i]/255)
                                    }
                                    axios.post('http://localhost:5000/draw/', inputToModel)
                                        .then( (modelPrediction) => {
                                            this.setState({
                                                modelGuess: modelPrediction.data
                                            }, () => {
                                                speech.speak({ text: 'A ' + this.state.modelGuess, })
                                                if(this.state.seconds === 0 || this.state.modelGuess === this.state.playerChoice) {
                                                    speech.speak({text: 'A ' + this.state.modelGuess, })
                                                        this.increaseScore();                                                                                                                                              
                                                } 
                                            })
                                        })
                                })
                        })
                })                 
            })
    }
    
    timer = () => {
        intID = setInterval( () => {
            const { seconds, playState } = this.state
            if(playState){
                if (seconds === 0) {
                    clearInterval(intID)
                    this.getAnswer();
                } else if([5,10,15].includes(seconds)){
                    tick.play()
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }), () => {
                        this.getAnswer();
                    })
                } else {
                    if(seconds === 3) metro.play()
                    else if(seconds > 3) tick.play()
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
            }
        }, 1000);
    }

    changePlayState = () => {
        this.setState(prevState => ({
            playState: !prevState.playState
          }));
    }

    getSelected = e => {
        buttonClicked.play()
        this.myCanvas.current.clear();
        this.setState({
            playerChoice: e.target.value,
            seconds: 20,
            popupDisplay: false,
            playState: true,
        }, () => {
            speech.speak({text: "Draw a " + this.state.playerChoice})
        });
    }

    increaseScore = () => {
        const {playerChoice, modelGuess} = this.state
        if(playerChoice === modelGuess){
            this.setState({
                score: this.state.score + 1,
                playerChoice: "",
                modelGuess: ""
            }, () => {
                this.setState({
                    popupDisplay: true,
                    playState: false,
                    seconds: 20
                })
            });
        } else {
            this.setState({
                correctGuess: false
            }, () => {
                this.setState({
                    popupDisplay: true,
                    playState: false,
                    seconds: 20
                })
            });
        }
    }

    clearCanvas = () => {
        this.myCanvas.current.clear();
    }

    updatePopupDisplay = () => {
        buttonClicked.play()
        this.setState( prevState => ({
            popupDisplay: !prevState.popupDisplay,
            playState: true,
        }));
    } 

    componentWillUnmount() {
        clearInterval(intID);
    }

    render() {
        return (
            <div>
                <Navbar changePlayState = {this.changePlayState} 
                        playState = {this.state.playState} 
                        displayController = {this.state.displayController} 
                        popupDisplay = { this.state.popupDisplay }
                />
                <PopupDraw popupDisplay = {this.state.popupDisplay} 
                    correctGuess = {this.state.correctGuess} 
                            choices = {this.state.choices}
                                score = {this.state.score}
                                getSelected = {this.getSelected}
                            />
                <Popup open = {!this.state.playState && !this.state.popupDisplay}
                    contentStyle = { popupStyle }
                    closeOnDocumentClick = {false}>
                    <h1 className = "align-center text-center">GAME PAUSED</h1>
                </Popup>
                <div className="p-5 d-flex justify-content-center align-items-center" style = {{width: '100vw', height: '100vh'}}>
                    <CanvasDraw resize = "false" 
                        lazyRadius = {0}
                        brushRadius = {2}
                        brushColor = {"rgb(0,0,255)"}
                        hideGrid = {true}
                        style = {canvasStyle}
                        ref = { this.myCanvas}
                        />
                </div>
                <div className = "fixAtBottom">
                    <p className = "text-center align-center">
                        {
                            this.state.modelGuess !== "" && [14,9,4].includes(this.state.seconds)
                            ? this.state.modelGuess
                            : `. . .`
                        }
                    </p>
                </div>
                <button className = "btn btn-outline-primary btn-md eraser" onClick = {this.clearCanvas}>
                    <img src = {require("./icons/eraser.png")} width = "40" height = "40"  alt ="X"/>
                </button>
                <Timer timer = {this.timer} seconds = {this.state.seconds} />
                <Scoreboard score = {this.state.score}/>
            </div>
        );
    }
}