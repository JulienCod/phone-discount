import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PhoneList.css';
import AuthAPI from '../services/authApi';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import Loader from '../components/loader/loader';

export default function PhoneList() {
    const [phoneList, setPhoneList] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            let user = AuthAPI.rolesCurrentUser();
            if (user === "ROLE_ADMIN") {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchPhoneList();
    }, []);

    const fetchPhoneList = async () => {
        setLoading(true);
        await axios('/api/phone')
            .then(function (response) {
                setPhoneList(response.data);
                setLoading(false);
            })
            .catch(function (err) {
                setLoading(false);
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
        <article className="container">
            <div>
                <h2 className="title__h2">
                    Liste des téléphones
                </h2>
            </div>
            {loading ?
                <Loader />
                :
                <>
                    {admin &&
                        <div className="">
                            <Link className="" to="/create">
                                Créer un nouveau téléphone
                            </Link>
                        </div>
                    }
                    <div className='count__item'>
                        {phoneList.length <= 1 ?
                            `${phoneList.length} produit`
                            :
                            `${phoneList.length} produits`
                        }
                    </div>
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
                                            {phone.brand} - {phone.model} - {phone.storage} Go - {phone.color}
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
                </>
            }
        </article>
    )
}
