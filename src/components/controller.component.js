import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import UIfx from 'uifx';
import ButtonClick from './sounds/Button_Click.mp3';

const buttonClicked = new UIfx(
    ButtonClick,
    {
        volume: 1
    }
)

export default function Controller(props) {

    const clickSound = () => {
        buttonClicked.play();
    }

    return (
        <div>
            <button className = "btn btn-outline-light btn-sm controller"  onClick = { props.changePlayState } disabled = {props.popupDisplay}>
                    { props.playState === true 
                        ? <img src = {require('./icons/pause.png')} width = "30" height = "30" className ="d-inline-block align-top" alt ="X" /> 
                        : <img src = {require('./icons/play.png')} width = "30" height = "30" className ="d-inline-block align-top" alt ="X" />
                    }
            </button>
            <Link className = "btn btn-outline-light btn-sm controller"  onClick={clickSound} to = "/" role = "button">
                <img src = {require('./icons/close.png')} 
                    width = "30" height = "30" className ="d-inline-block align-top" alt ="X" />
            </Link>
        </div>
    );
}