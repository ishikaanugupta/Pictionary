import React, { Component } from 'react';
import './styles.css';


export default class Scoreboard extends Component {
    render() {
        return (
            <div className = "badge badge-light board">
            <p className = "align-middle m-1" >SCORE: { this.props.score }</p>
            </div>
        );
    }
}