import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

const bgStyle = {
    backgroundColor: "#FF6700"
};

const popupStyle = {
    width: "100%",
    margin: 0,
    borderRadius: '25px',
    border: 0,
    padding: 0,
    position: 'fixed',
    top: "30%",
    display: 'flex',
    alignContent: 'center',
    backgroundColor: 'transparent'
}

export default class PopupGuess extends Component {
    onClose = () => {
        console.log("CLOSED POPUP!")
    }

    render() {
        return(
            <Popup open = {this.props.popupDisplay} contentStyle = { popupStyle }
                repositionOnResize = { true }
                closeOnDocumentClick = {false}
                    onClose = {this.onClose}>
                <div className = "jumbotron p-3 text-center"
                        style = {{width: '350px', 
                                    margin: 'auto'}}>
                {
                    this.props.score === 0 && this.props.correctGuess
                    ? <div>
                        <h1 className = "h2"> Start Playing!</h1>
                        <img width = {200} src = {require('./icons/startPlaying.gif')} alt="X"/>
                        <br/>
                        <button className="btn btn-primary btn-lg" 
                                to="/guess" style = {bgStyle} 
                                onClick = { this.props.updatePopupDisplay }>READY!</button>
                    </div>
                    : <div>
                        {
                            this.props.correctGuess
                            ? <div>
                                <p>WOOHOO! CORRECT GUESS!</p>
                                <img width = {200} src = {require('./icons/correctGuess.gif')} alt="X"/>
                                <p>CURRENT SCORE: {this.props.score}</p>
                                <button className="btn btn-primary btn-lg" 
                                    to="/guess" style = {bgStyle} 
                                        onClick = { this.props.updatePopupDisplay }>READY!</button>
                            </div>        
                            : <div>
                                <p>SHUCKS! WRONG GUESS!</p>
                                <img width = {200} src = {require('./icons/replay.gif')} alt="X"/>
                                <p>FINAL SCORE: {this.props.score}</p>
                                <Link className="btn btn-primary btn-lg" to="/" role="button" style = {bgStyle} >REPLAY!</Link>
                            </div> 
                        }
                    </div>
                }
                </div>
            </Popup>
        );
    }
}