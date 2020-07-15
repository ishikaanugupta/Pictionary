import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import ChoicesDraw from './choices-draw.component';
import { Link } from 'react-router-dom';

export default class PopupDraw extends Component {

    onClose = () => {
        console.log("POPCLOSE")
    } 

    render() {
        return(
            <Popup open = {this.props.popupDisplay}
                closeOnDocumentClick = { false}
                    repositionOnResize = { true }
                    onClose = {this.onClose}>
                <div className = "jumbotron">
                {
                    this.props.score === 0
                    ? <div>
                        <p>Start Playing!</p>
                        <h1>Choose one to draw</h1>
                        <ChoicesDraw getSelected = {this.props.getSelected} choices = {this.props.choices} 
                        />
                    </div>
                    : <div>
                    {
                        this.props.correctGuess
                        ? <div>
                            <p>WOOHOO! CORRECT GUESS!</p>
                            <p>CURRENT SCORE: {this.props.score}</p>
                            <ChoicesDraw getSelected = {this.props.getSelected} choices = {this.props.choices} 
                            />
                        </div>
                        : <div>
                            <p>SHUCKS! WRONG GUESS!</p>
                            <p>FINAL SCORE: {this.props.score}</p>
                            <Link to = '/' className = 'btn btn-primary btn-lg' role = 'button'>Replay</Link>
                        </div>
                    } 
                    </div>
                }
                </div>
            </Popup>
        ); 
    }
}