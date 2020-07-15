import React, { Component } from 'react';

export default class ChoicesDraw extends Component {

    constructor(props){
        super(props)
        console.log(props.posStyle)

    }
    
    render() {
        return (
            <div className="d-flex justify-content-center">
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