import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.component';
import './styles.css';
import UIfx from 'uifx';
import buttonClick from './sounds/Button_Click.mp3';

const buttonClicked = new UIfx(
    buttonClick,
    {
        volume: 1
    }
)

export default class GameOption extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayController: false
        }
    }

    clickSound = () => {
        buttonClicked.play();
    }

    render() {
        return (
            <div className = "gameData" >
                <Navbar displayController = {this.state.displayController} />
                <div className="jumbotron text-center mt-0 " style = {{backgroundColor: "#fcfce9"}} >
                    <h1 className="display-1 font-weight-bold">Welcome to Pictionary!</h1>
                    <p className="lead font-weight-bold">A doodle drawing and guessing game.</p>
                    <hr className="my-4" />
                    <div className = "d-flex justify-content-around"> 
                        <div className = "option">
                            <p className = "lead font-weight-bold">For enthusiastic artistes!</p>
                            <p className = "lead">Here's your chance to showcase your drawing skills!</p>
                            <Link className="btn btn-primary btn-lg" to="/draw" onClick={this.clickSound} role="button">Draw</Link>
                        </div>
                        <div>
                            <img src = {require("./icons/draw.gif")} width = "200" alt = "X"/>
                        </div>
                        <div className = "option">
                            <p className = "lead font-weight-bold">For know-it-alls!</p>
                            <p className = "lead">Here's your chance at guessing it right!</p>
                            <Link className="btn btn-primary btn-lg" to="/guess" onClick={this.clickSound} role="button">Guess</Link>
                        </div>
                    </div>
                </div>
                <footer className ="navbar fixed-bottom navbar-light d-flex justify-content-end text-monospace" style = {{backgroundColor: '#fcfce9'}}>
                        <p className = "badge badge-dark p-2 m-2" >
                            Created using Google's QuickDraw Dataset
                        </p>
                        <p className = "badge badge-dark p-1 m-2" >
                            Sound Effects by Mike Koenig, Joe Lamb, DeepFrozenApps   <span className = "badge badge-light p-2">SRC:
                                <a href = "http://soundbible.com/" target = "_blank" rel= "noopener noreferrer" >SoundBible</a>
                            </span> 
                        </p>
                </footer>
            </div>
        );
    }
}
