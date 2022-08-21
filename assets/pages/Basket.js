import React, { useEffect, useState, useContext } from 'react';
import basketApi from '../services/basketApi'
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Loader from '../components/loader/loader';



export default function Basket() {
    const [phoneList, setPhoneList] = useState([]);
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        setStorage(basketApi.getPanier());
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

    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(?Schema)
    });
    const onSubmit = data => {
        let order = {
            phoneId: data.phoneId,
            quantity: data.quantity,
        }
        basketApi.addPanier(order)
    }
    const newPrice = (price, percent) => {
        const newPrice = Math.round(price - (price * (percent / 100)));
        return newPrice
    }

    return (
        <article>
            <div>
                <h2>Panier</h2>
            </div>
            {loading?
            <Loader/>
            :
            <div>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    {phoneList.map((phone, key) => {
                        for (const storagePhone of storage) {
                            if (phone.id == storagePhone.phoneId) {
                                let quantityCurrent = storagePhone.quantity
                                console.log(storagePhone.quantity);
                                return (
                                    <div key={key}>
                                        <div className="item__img">
                                            <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="image téléphone" />
                                        </div>
                                        <div>
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
                                        </div>
                                        <div>
                                            <label htmlFor={`quantity+${key}`}>Quantitée :
                                                <select
                                                    {...register(`quantity+${key}`)}
                                                    id={`quantity+${key}`}>
                                                    <option value={quantityCurrent}>{quantityCurrent}</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </label>
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
                                    </div>
                                )
                            }
                        }
                    })}
                </form>
                <div>
                    Total quantitée: 10
                    <div>
                        Total 1254 €
                    </div>
                </div>
                <div>
                    <button>Je passe ma commande</button>
                </div>
            </div>
            }
        </article>
    )
}