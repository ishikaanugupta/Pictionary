import React, { Component } from 'react';
import Timer from './timer.component';
import Scoreboard from './scoreboard.component';
import Choices from './choices.component';
import Navbar from './navbar.component';
import PopupGuess from './popup-guess.component';
import Popup from 'reactjs-popup';
import axios from 'axios';
import CanvasDisplay from './canvas-display.component';
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

const popupStyle = {
    width: 'max-content',
    padding: '20px',
    backgroundColor: 'aliceblue',
    color: '#0275d8',
    borderColor: 'aliceblue',
    borderRadius: '10px',
    borderWidth: '1px'
}

let intID = ''

export default class GuessCanvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            popupDisplay: true,
            playState: false,
            seconds: 20,
            score: 0,
            choices: [],
            answer: '',
            sketchArray: [],
            playerGuess: "",
            displayController: true,
            correctGuess: true
        }
    }

    timer = () => {
        intID = setInterval( () => {
            const { seconds, playState } = this.state
            if(playState){
                if (seconds === 0) {
                    clearInterval(this.myInterval)
                    this.setState(() => ({
                        popupDisplay: true,
                        playState: false,
                        seconds: 20
                    }), () => {
                        this.increaseScore()
                    });
                } else {
                    if(seconds === 3) { 
                        metro.play()
                    } else if(seconds > 3) {
                        tick.play();
                    }
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
            }
        }, 1000);
    }

    changePlayState = () => {
        buttonClicked.play()
        this.setState(prevState => ({
            playState: !prevState.playState
          }));
    }

    getSelected = e => {
        buttonClicked.play()
        this.setState({
            playerGuess: e.target.value,
            seconds: 20,
            playState: false,
        }, () => {
            this.increaseScore()
        });
    }

    updatePopupDisplay = () => {
        buttonClicked.play()
        axios.get('http://localhost:5000/guess/fetchOptions')
            .then(res => {
                this.setState({
                    choices: res.data[0],
                    answer: res.data[1]
                }, () => {
                    axios.get('http://localhost:5000/guess/fetch/' + this.state.answer)
                        .then(res => {
                            this.setState({
                                sketchArray: res.data
                            }, () => {
                                this.setState( prevState => ({
                                    popupDisplay: !prevState.popupDisplay,
                                    playState: true,
                                    seconds: 20
                                }));
                            })
                        })
                })
            })
    }   

    increaseScore = () => {
        const {playerGuess, answer} = this.state
        if(playerGuess === answer){
            this.setState({
                score: this.state.score + 1,
                playerGuess: "",
                popupDisplay: true
            });
        } else {
            this.setState({
                correctGuess: false,
                popupDisplay: true
            });
        }
    }

    componentWillUnmount() {
        clearInterval(intID);
    }

    render() {
        return (
            <div>
                <PopupGuess updatePopupDisplay = {this.updatePopupDisplay} 
                    score = {this.state.score} correctGuess = {this.state.correctGuess}
                        answer = {this.state.answer}
                        popupDisplay = {this.state.popupDisplay}/>
                <Navbar changePlayState = {this.changePlayState} 
                        playState = {this.state.playState} popupDisplay = {this.state.popupDisplay}
                        displayController = {this.state.displayController} />
                <Popup open = {!this.state.playState && !this.state.popupDisplay}
                    contentStyle = { popupStyle}
                    closeOnDocumentClick = {false}>
                    <h1 className = "align-center text-center">GAME PAUSED</h1>
                </Popup>
                {
                    !this.state.popupDisplay &&
                    <CanvasDisplay display = {this.state.popupDisplay} 
                        playState = {this.state.playState}  
                            sketchArray = {this.state.sketchArray}/>
                }
                <Timer timer = {this.timer} seconds = {this.state.seconds} />
                <Scoreboard score = {this.state.score} />
                <Choices getSelected = {this.getSelected} choices = {this.state.choices} />
            </div>
        );
    }
}
