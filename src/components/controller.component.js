import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const imgStyle = {
    margin: '0px 10px'
};

export default class Controller extends Component {
    render() {
        return (
            <div>
                <button className = "btn btn-outline-light btn-sm" style = { imgStyle } onClick = { this.props.changePlayState }>
                        { this.props.playState === true 
                            ? <img src = {require('./icons/pause.png')} width = "30" height = "30" className ="d-inline-block align-top" alt ="X" /> 
                            : <img src = {require('./icons/play.png')} width = "30" height = "30" className ="d-inline-block align-top" alt ="X" />
                        }
                </button>
                <Link className = "btn btn-outline-light btn-sm" style = { imgStyle } to = "/" role = "button">
                    <img src = {require('./icons/close.png')} 
                        width = "30" height = "30" className ="d-inline-block align-top" alt ="X" />
                </Link>
            </div>
        );
    }
}