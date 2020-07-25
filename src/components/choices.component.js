import React from 'react';
import './styles.css'

export default function Choices(props){
        return (
            <div className="d-flex justify-content-center fixAtBottom">
                {
                    props.choices.map(option => 
                    <button key = {option} value = {option} 
                            className= "btn btn-outline-primary btn-lg m-2 text-capitalize"
                            onClick={ e => props.getSelected(e)}>
                        {option}
                    </button>)
                }
            </div>
        );
}