import React, { Component } from 'react';
import Timer from './timer.component';
import Scoreboard from './scoreboard.component';
import Choices from './choices.component';
import Navbar from './navbar.component';
import PopupGuess from './popup-guess.component';
import Popup from 'reactjs-popup';
import axios from 'axios';
import CanvasDisplay from './canvas-display.component';

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
        setInterval( () => {
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
            playerGuess: e.target.value,
            seconds: 20,
            popupDisplay: true,
            playState: false,
        }, () => {
            this.increaseScore()
        });
    }

    updatePopupDisplay = () => {
        this.setState( prevState => ({
            popupDisplay: !prevState.popupDisplay,
            playState: true,
            seconds: 20
        }));
        axios.get('http://localhost:5000/guess/fetchOptions')
            .then(res => {
                this.setState({
                    choices: res.data[0],
                    answer: res.data[1]
                }, () => {
                    console.log(this.state.answer)
                    axios.get('http://localhost:5000/guess/fetch/' + this.state.answer)
                        .then(res => {
                            this.setState({
                                sketchArray: res.data
                            })
                        })
                })
            })
    }     

    increaseScore = () => {
        const {playerGuess, answer} = this.state
        console.log(playerGuess, answer)
        if(playerGuess === answer){
            console.log('+1')
            this.setState({
                score: this.state.score + 1,
                playerGuess: ""
            });
        } else {
            console.log("WRONG!")
            this.setState({
                correctGuess: false
            });
        }
    }

    render() {
        return (
            <div>
                <PopupGuess updatePopupDisplay = {this.updatePopupDisplay} 
                    score = {this.state.score} correctGuess = {this.state.correctGuess}
                        popupDisplay = {this.state.popupDisplay}/>
                <Navbar changePlayState = {this.changePlayState} 
                        playState = {this.state.playState} 
                        displayController = {this.state.displayController} />
                <Popup open = {!this.state.playState && !this.state.popupDisplay}
                    closeOnDocumentClick = {false}>
                    <h1>GAME PAUSED</h1>
                </Popup>
                <CanvasDisplay display = {this.state.popupDisplay} 
                        playState = {this.state.playState}  
                            sketchArray = {this.state.sketchArray}/>
                <Timer timer = {this.timer} seconds = {this.state.seconds} />
                <Scoreboard score = {this.state.score} />
                <Choices getSelected = {this.getSelected} choices = {this.state.choices} />
            </div>
        );
    }
}
