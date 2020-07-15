import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.component';

const optionStyle = {
    width: "50%",
    float: "left"
};

const bgStyle = {
    backgroundColor: "#FF6700"
};

export default class GameOption extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayController: false
        }
    }
    render() {
        return (
            <div>
                <Navbar displayController = {this.state.displayController} />
                <div className="jumbotron text-center mt-0">
                    <h1 className="display-1">Welcome to Pictionary!</h1>
                    <p className="lead">A doodle drawing and guessing game.</p>
                    <hr className="my-4" />
                    <div>
                        <div style = {optionStyle}>
                            <p className = "lead font-weight-bold">For enthusiastic artistes!</p>
                            <p className = "lead">Here's your chance to showcase your drawing skills!</p>
                            <Link className="btn btn-primary btn-lg" to="/draw" role="button" style = {bgStyle}>Draw</Link>
                        </div>
                        <div style = {optionStyle}>
                            <p className = "lead font-weight-bold">For know-it-alls!</p>
                            <p className = "lead">Here's your chance at guessing it right!</p>
                            <Link className="btn btn-primary btn-lg" to="/guess" role="button" style = {bgStyle}>Guess</Link>
                        </div>
                    </div>
                    <img src = {require("./icons/draw.gif")} width = "120" alt = "X"/>
                </div>
            </div>
        );
    }
}