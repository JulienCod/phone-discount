import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PhoneShow.css';

export default function PhoneShow() {
    const [id, setId] = useState(useParams().id);
    const [phone, setPhone] = useState({ brand: '', color: '', description: '', model: '', price: 0, promotion: 0, stock: 0, storage: 0, imageName:'' });

    useEffect(() => {
        axios.get(`/api/phone/${id}`)
            .then(function (response) {
                console.log(response);
                setPhone(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const newPrice = (price, percent) => {
        const newPrice = Math.round(price - (price * (percent / 100)));
        return newPrice
    }

    const addPanier = (event) => {
        event.preventDefault();
        console.log(phone);
    }

    return (
        <div className="container">
            <Link className="btn__home" to="/">
                Voir tous les téléphones
            </Link>
            <h2 className="title__h2">Fiche détaillée du téléphone</h2>
            <div className="product-card">
                <div className="product-header">
                    <h3>{phone.brand} - {phone.model} - {phone.storage}Go - {phone.color} </h3>
                </div>
                <div className="product-body">
                    <b className="text-muted">Description:</b>
                    <p>{phone.description}</p>
                    <div className="product-img">
                        <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="Image du téléphone" />
                    </div>
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
                    <form className='form'>
                        <div>
                            <select id="quantity-choice">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div>
                            <button onClick={addPanier}>Ajouter au panier</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
