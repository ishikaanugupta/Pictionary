import React from 'react';

export default function ChoicesDraw(props) {
        
    const fetchThree = () => {
        let threeOptions = []
        while(threeOptions.length < 3){
            let num = Math.floor(Math.random() * (props.choices.length))
            if (threeOptions.includes(props.choices[num]) === false) {
                threeOptions.push(props.choices[num])
            }
        }
        return threeOptions
    }
        return (
            <div className="d-flex justify-content-center">
                {
                    fetchThree().map(option => 
                    <button key = {option} value = {option} 
                            className= "btn btn-outline-primary btn-lg m-2 text-capitalize"
                            onClick={ e => props.getSelected(e)}>
                        {option}
                    </button>)
                }
            </div>
        );
    }