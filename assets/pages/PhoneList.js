import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PhoneList.css';
import AuthAPI from '../services/authApi';
import AuthContext from '../context/AuthContext';



export default function PhoneList() {
    const [phoneList, setPhoneList] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            let user = AuthAPI.rolesCurrentUser();
            if (user === "ROLE_ADMIN") {
                setAdmin(true);
            }else{
                setAdmin(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchPhoneList();
    }, []);

    const fetchPhoneList = () => {
        axios('/api/phone')
            .then(function (response) {
                setPhoneList(response.data);
            })
            .catch(function (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue',
                    showConfirmButton: false,
                    timer: 1500,
                  });
            });
    }

    const newPrice = (price, percent) => {
        const newPrice = Math.round(price - (price * (percent / 100)));
        return newPrice
    }

    return (
        <div className="container">
            <div>
                <h2 className="title__h2">
                    Liste des téléphones
                </h2>
            </div>
            {admin &&
            <div className="">
                <Link className="" to="/create">
                    Créer un nouveau téléphone
                </Link>
            </div>
            }
            <div className="list__phone">
                {phoneList.map((phone, key) => {
                    return (
                        <div className="item" key={key}>
                            <Link className="" to={`/show/${phone.id}`}>
                                <div className="item__img">
                                    <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="image téléphone" />
                                </div>
                            </Link>
                            <div className='item__content'>
                                <h3 className="item__title">
                                    <span>
                                        {phone.brand}
                                    </span>
                                    -
                                    <span>
                                        {phone.model}
                                    </span>
                                    -
                                    <span>
                                        {phone.storage}Go
                                    </span>
                                    -
                                    <span>
                                        {phone.color}
                                    </span>
                                </h3>
                                <p className="item__description">{phone.description}</p>
                                <div>
                                    <p className="item__price">
                                        {phone.promotion > 0 ?
                                            <>
                                                <span className='item__promo--percent'>
                                                    -{phone.promotion}%
                                                </span>

                                                <span className='item__price--old'>
                                                    {phone.price} €
                                                </span>
                                                <span className='item__price--new'>
                                                    {newPrice(phone.price, phone.promotion)} €
                                                </span>
                                            </>
                                            :
                                            <span className='item__price--new'>
                                                {newPrice(phone.price, phone.promotion)} €
                                            </span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
