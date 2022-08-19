import React from 'react'
import Header from '../header/Header'

export default function Layout(props) {
    return (
        <div>
            <Header/>
            {props.children}
        </div>
    )
}
