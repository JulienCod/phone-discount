import React from 'react';
import '../../styles/btn.css'

export default function Button(props) {
    return (
        <button 
        className='btn'
        onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
