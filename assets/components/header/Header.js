import React from 'react';
import '../../styles/header.css';
import { RiAccountCircleLine, RiShoppingBasketLine } from 'react-icons/Ri'
import { BiArrowBack } from 'react-icons/Bi'
import { Link } from 'react-router-dom';
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
                    <Link className='header__link' to='/'>
                        <h1 className='header__title'>Phone Discount</h1>
                    </Link>
                </div>
                <nav className="container__icons">
                    <div>
                        <Link className='header__link' to="/account">
                            <RiAccountCircleLine className="icons_header" />
                        </Link>
                    </div>
                    <div>
                        <Link className='header__link' to="/basket">
                            <RiShoppingBasketLine className="icons_header" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
