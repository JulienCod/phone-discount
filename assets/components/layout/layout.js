import React from 'react'
import Header from '../header/Header'

export default function Layout(props) {
    return (
        <>
            <Header/>
            <main className="main">
                {props.children}
            </main>
        </>
    )
}
