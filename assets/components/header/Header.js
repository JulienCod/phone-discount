import React, { useContext, useEffect, useState } from 'react';
import '../../styles/header.css';
import { RiAccountCircleLine, RiShoppingBasketLine } from 'react-icons/Ri'
import { BiArrowBack, BiLogOut } from 'react-icons/Bi'
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../services/authApi';
import AuthContext from '../../context/AuthContext';
import basketApi from '../../services/basketApi';
import Swal from 'sweetalert2';

export default function Header() {

    const [countBasket, setCountBasket] = useState();

    useEffect(() => {
        setCountBasket(basketApi.getPanier().length)
    }, []);

    const { isAuthenticated } = useContext(AuthContext);
    return (
        <header>
            <div className="container__header">
                <div>
                    <BiArrowBack title='retour' className="icons_header" onClick={() => {
                        window.history.back();
                    }} />
                </div>
                <div>
                    <Link title="page d'accueil" className='header__link' to='/'>
                        <h1 className='header__title'>Phone Discount</h1>
                    </Link>
                </div>
                <nav className="container__icons">
                    <div>
                        <Link title="compte utilisateur" className='header__link' to="/account">
                            <RiAccountCircleLine className="icons_header" />
                        </Link>
                    </div>
                    <div>
                        <Link title='panier' className='header__link' to="/basket">
                            <RiShoppingBasketLine className="icons_header" />
                            {countBasket > 0 &&
                                <div className='container__count'>
                                    <span className='count__basket'>{countBasket}</span>
                                </div>
                            }
                        </Link>
                    </div>
                    {isAuthenticated &&
                        <BiLogOut onClick={async () => {
                            authApi.logout();
                            await Swal.fire({
                                icon: 'success',
                                title: 'Vous êtes désormais déconnecté !',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            window.location.reload();
                        }} className="icons_header" />
                    }
                </nav>
            </div>
        </header>
    )
}
