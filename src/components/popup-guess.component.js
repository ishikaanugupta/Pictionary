import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import './styles.css';
import UIfx from 'uifx';
import ButtonClick from './sounds/Button_Click.mp3';
import Win from './sounds/Ta_Da.mp3';
import Lose from './sounds/Sad_Trombone.mp3';

const buttonClick = new UIfx(
    ButtonClick,
    {
        volume: 1
    }
)

const win = new UIfx(
    Win,
    {
        volume: 0.7
    }
)

const lose = new UIfx(
    Lose,
    {
        volume: 0.7
    }
)

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

export default function PopupGuess(props) {

    const onPop = () => {
        props.correctGuess
            ? win.play()
            : lose.play()
    }

    const buttonClicked = () => {
        buttonClick.play()
    }

    return(
        <Popup open = {props.popupDisplay} onOpen = {onPop}
        contentStyle = { popupStyle }
            repositionOnResize = { true }
            closeOnDocumentClick = {false}>
            <div className = "jumbotron p-3 text-center popupSize">
            {
                props.score === 0 && props.correctGuess
                ? <div>
                    <h1 className = "h2"> Start Playing!</h1>
                    <img className = "gif" width = {200} src = {require('./icons/startPlaying.gif')} alt="X"/>
                    <br/>
                    <button className="btn btn-primary btn-lg" 
                            to="/guess" 
                            onClick = { props.updatePopupDisplay }>READY!</button>
                </div>
                : <div>
                    {
                        props.correctGuess
                        ? <div>
                            <p>WOOHOO! CORRECT GUESS!</p>
                            <img className = "gif" width = {200} src = {require('./icons/correctGuess.gif')} alt="X"/>
                            <p>CURRENT SCORE: {props.score}</p>
                            <button className="btn btn-primary btn-lg" 
                                to="/guess" 
                                    onClick = { props.updatePopupDisplay }>READY!</button>
                        </div>        
                        : <div>
                            <p>SHUCKS! WRONG GUESS!</p>
                            <p>It was a {props.answer}!</p>
                            <img className = "gif" width = {200} src = {require('./icons/replay.gif')} alt="X"/>
                            <p>FINAL SCORE: {props.score}</p>
                            <Link className="btn btn-primary btn-lg" to="/" onClick= {buttonClicked} role="button" >REPLAY!</Link>
                        </div> 
                    }
                </div>
            }
            </div>
        </Popup>
    );
}