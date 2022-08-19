import React from 'react';
import '../../styles/header.css';
import { RiAccountCircleLine, RiShoppingBasketLine } from 'react-icons/Ri'
import { BiArrowBack } from 'react-icons/Bi'
// import { Link } from 'react-router-dom';
export default function Header() {


    return (
        <header>
            <div className="container__header">
                <div>
                    <BiArrowBack className="icons_header" onClick={() => {
                        window.history.back();
                    }} />
                </div>
                <div>
                    <h1>Phone Discount</h1>
                </div>
                <div className="container__icons">
                    <div>
                        {/* <Link to="/account"> */}
                            <RiAccountCircleLine className="icons_header" />
                        {/* </Link> */}
                    </div>
                    <div>
                        <RiShoppingBasketLine className="icons_header" />
                    </div>
                </div>
            </div>
        </header>
    )
}
