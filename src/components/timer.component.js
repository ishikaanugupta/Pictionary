import React, { Component } from 'react';
import './styles.css';

export default class Timer extends Component {
    componentDidMount() {
        this.props.timer();
    }

    render() {
        const { seconds } = this.props
        return (
            <div className = "badge badge-light p-2 timer">
                00:{ seconds < 10 ? `0${ seconds }` : seconds }
            </div>
        );
    }
}