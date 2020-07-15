import React, { Component } from 'react';

let posStyle = { }

export default class Choices extends Component {

    constructor(props){
        super(props)
        console.log(props.posStyle)

    }
    incomingStyle = () => {
        if (this.props.posStyle !== undefined){
            posStyle = this.props.posStyle
        } else {
            posStyle = {
                position: "fixed",
                width: "100%",
                top: 560,
                fontSize: '30px'
            }
        }
    }

    componentDidMount() {
        this.incomingStyle()
    }

    render() {
        return (
            <div className="d-flex justify-content-center" style = {posStyle}>
                {
                    this.props.choices.map(option => 
                    <button key = {option} value = {option} 
                            className= "btn btn-outline-dark btn-lg m-2"
                            onClick={ e => this.props.getSelected(e)}>
                        {option}
                    </button>)
                }
            </div>
        );
    }
}