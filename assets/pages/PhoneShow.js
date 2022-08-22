import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import '../styles/PhoneShow.css';
import basketApi from '../services/basketApi';
import Loader from '../components/loader/Loader';
import Button from '../components/button/button';

export default function PhoneShow() {
    const [id, setId] = useState(useParams().id);
    const [phone, setPhone] = useState({ brand: '', color: '', description: '', model: '', price: 0, promotion: 0, stock: 0, storage: 0, imageName: '' });
    const [loading, setLoading] = useState(false);

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
        <div className="container__show">
            <h2>Fiche détaillée du téléphone</h2>
            {loading ?
                <Loader />
                :
                <div className="product__card">
                    <div className="product__body">
                        <div className="product__img">
                            <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="Image du téléphone" />
                        </div>
                        <div className="product__description">
                            <div>
                                <h3>{phone.brand} - {phone.model} - {phone.storage}Go - {phone.color} </h3>
                            </div>
                            <b >Description:</b>
                            <p>{phone.description}</p>
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
                                        <span >
                                            {newPrice(phone.price, phone.promotion)} €
                                        </span>
                                    }
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <Button>Ajouter au panier</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
