import React, { Component } from 'react';

const posStyle = {
    background: '#FF6700',
    position: "fixed",
    top: 180,
    right: 50,
    fontSize: '30px'
}

export default class Scoreboard extends Component {
    render() {
        return (
            <div className = "badge badge-light" style = { posStyle }>
            <p>SCORE: { this.props.score }</p>
            </div>
        );
    }
}