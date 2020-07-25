import React, { Component } from 'react';
import Controller from './controller.component';
//import { Link } from 'react-router-dom';


const navStyle = {
    background: '#FF6700'
};

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayController: props.displayController,
        }
    }

    render() {
        return (
                <nav className ="navbar navbar-light fixed-top" style={navStyle}>
                    <img src={require(".\\icons\\logo.png")} width="50" height="50" className ="align-top" alt ="X" />
                    {this.state.displayController && <Controller changePlayState = {this.props.changePlayState} playState = {this.props.playState}/>}
                </nav>   
        );
    }
}