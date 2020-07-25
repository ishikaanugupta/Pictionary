import React, { Component } from 'react';

const posStyle = {
    background: '#FF6700',
    position: "fixed",
    top: 100,
    right: 50,
    fontSize: '30px'
}

export default class Timer extends Component {
    componentDidMount() {
        this.props.timer();
    }

    componentWillUnmount() {
        clearInterval(this.props.timer)
    }

    render() {
        const { seconds } = this.props
        return (
            <div className = "badge badge-light p-3" style = { posStyle }>
                00:{ seconds < 10 ? `0${ seconds }` : seconds }
            </div>
        );
    }
}