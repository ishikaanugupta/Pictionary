import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import Timer from './timer.component';
import Scoreboard from './scoreboard.component';
import Navbar from './navbar.component';
import PopupDraw from './popup-draw.component';
import Popup from 'reactjs-popup';

const canvasStyle = {
    width: "100vw",
    height: "90vh",
    marginTop: "5.4vh"
};

export default class DrawCanvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            popupDisplay: true,
            choices: ['Balloon', 'Car', 'Bear'],
            playerChoice: "",
            seconds: 20,
            score: 0,
            playState: false,
            modelGuess: "Car",
            displayController: true,
            correctGuess: true
        }
        this.myCanvas = React.createRef();
    }

    timer = () => {
        setInterval( () => {
            const { seconds, playState } = this.state
            if(playState){
                if (seconds === 0) {
                    clearInterval(this.myInterval)
                    this.setState({
                        popupDisplay: true,
                        playState: false,
                        seconds: 20
                    }, () => {
                        this.increaseScore()
                        this.myCanvas.current.clear()
                    })
                } else {
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
        console.log(e.target.value)
        this.setState({
            playerChoice: e.target.value,
            seconds: 20,
            popupDisplay: false,
            playState: true,
        });
    }

    increaseScore = () => {
        const {playerChoice, modelGuess} = this.state
        console.log(playerChoice, modelGuess)
        if(playerChoice === modelGuess){
            console.log('+1')
            this.setState({
                score: this.state.score + 1,
                playerChoice: "",
                modelGuess: ""

            });
        } else {
            console.log("WRONG!")
            this.setState({
                correctGuess: false
            });
        }
    }

    componentDidMount() {
        console.log(this.myCanvas.current)
    }

    updatePopupDisplay = () => {
        this.setState( prevState => ({
            popupDisplay: !prevState.popupDisplay,
            playState: true,
        }));
    } 

    render() {
        return (
            <div>
                <Navbar changePlayState = {this.changePlayState} 
                        playState = {this.state.playState} 
                        displayController = {this.state.displayController} />
                <PopupDraw popupDisplay = {this.state.popupDisplay} 
                    correctGuess = {this.state.correctGuess} 
                            choices = {this.state.choices}
                                score = {this.state.score}
                                getSelected = {this.getSelected}
                            />
                <Popup open = {!this.state.playState && !this.state.popupDisplay}
                    closeOnDocumentClick = {false}>
                    <h1>GAME PAUSED</h1>
                </Popup>
                <CanvasDraw resize = "true" 
                        lazyRadius = {0}
                        brushRadius = {2}
                        brushColor = {"#000000"}
                        hideGrid = {true}
                        style = {canvasStyle}
                        ref = { this.myCanvas}
                        />
                <Timer timer = {this.timer} seconds = {this.state.seconds} />
                <Scoreboard score = {this.state.score}/>
            </div>
        );
    }
}