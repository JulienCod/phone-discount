import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import '../styles/PhoneShow.css';
import basketApi from '../services/basketApi';
import Loader from '../components/loader/Loader'

export default function PhoneShow() {
    const [id, setId] = useState(useParams().id);
    const [phone, setPhone] = useState({ brand: '', color: '', description: '', model: '', price: 0, promotion: 0, stock: 0, storage: 0, imageName: '' });
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/phone/${id}`)
            .then(function (response) {
                const data = response.data[0];
                setPhone(data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }, []);

    const newPrice = (price, percent) => {
        const newPrice = Math.round(price - (price * (percent / 100)));
        return newPrice
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(?Schema)
    });
    const onSubmit = async data => {
        let order = {
            phoneId: data.phoneId,
            quantity: data.quantity,
        }
        basketApi.addPanier(order);
        await Swal.fire({
            icon: 'success',
            title: 'Téléphone ajouté au panier!',
            showConfirmButton: false,
            timer: 1500,
        });
        window.location.reload();
    }

    return (
        <div className="container">
            <h2 className="title__h2">Fiche détaillée du téléphone</h2>
            {loading ?
                <Loader/>
                :
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
                        <form className='form' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    {...register("phoneId")}
                                    type='hidden'
                                    value={id}
                                />
                                <label htmlFor='quantity'>Quantitée :
                                    <select
                                        {...register("quantity")}
                                        id="quantity">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <button>Ajouter au panier</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}
