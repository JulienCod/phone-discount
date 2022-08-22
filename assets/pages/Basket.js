import React, { useEffect, useState, useContext } from 'react';
import basketApi from '../services/basketApi'
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Loader from '../components/loader/loader';
import Button from '../components/button/Button';
import '../styles/basket.css';
import { RiDeleteBin2Fill } from 'react-icons/Ri';


export default function Basket() {
    const [phoneList, setPhoneList] = useState([]);
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const [deleteArticle, setDeleteArticle] = useState(false);



    useEffect(() => {
        setDeleteArticle(false)
        fetchPhoneList();
        setStorage(basketApi.getPanier());
        calcTotalPrice(priceCurrent);
    }, [deleteArticle]);

    const calcTotalPrice = (priceCurrent) => {
        let total = 0;
        for (let index = 0; index < priceCurrent.length; index++) {
            total += priceCurrent[index]
        }
        if (total > 0) {
            return total;
        }
    }
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
    let priceCurrent = [];

    const handleChange = (event) => {
        let name = event.target.name;
        let id = parseInt(name.split('quantity')[1]);
        let panier = basketApi.getPanier();
        let foundProduct = panier.find(panier => panier.phoneId == id);
        foundProduct.quantity = parseInt(event.target.value)
        basketApi.savePanier(panier);
        window.location.reload();
    }

    const calcTotalQuantity = (storage) => {
        let total = 0;
        if (storage) {
            for (let index = 0; index < storage.length; index++) {
                total += parseInt(storage[index].quantity)
            }
            return total;
        }
    }

    const validation = async () => {
        if (isAuthenticated) {
            console.log("vrai")
        } else {
            await Swal.fire({
                title: 'Veuillez vous connecter pour finaliser votre commande',
                timer: 3000,
            });
            window.location.href = '/account'
        }
    }

    const deleteItem = async (id) => {
        Swal.fire({
            title: 'êtes-vous sûr?',
            text: "Cette article va être supprimé du panier !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimé!'
        }).then((result) => {
            if (result.isConfirmed) {
                //récupération du local storage
                let panier = basketApi.getPanier();

                //Création d'un nouveau tableau avec tous les éléments qui ont un identifiant différent de celui passé en paramètre
                panier = panier.filter((element) => element.phoneId != id);

                // mise à jour du localstorage
                localStorage.setItem("panier", JSON.stringify(panier));

                //rechargement de la page
                window.location.reload();
                Swal.fire(
                    'Article supprimé!',
                    'Votre article a bien été supprimé.',
                    'success'
                )
            }
        })
    }

    return (
        <article>
            <div>
                <h2>Panier</h2>
            </div>
            {loading ?
                <Loader />
                :
                <div>
                    <form className='form__basket' onSubmit={handleSubmit(onSubmit)}>
                        {phoneList.map((phone) => {
                            for (const storagePhone of storage) {
                                if (phone.id == storagePhone.phoneId) {
                                    let quantityCurrent = storagePhone.quantity
                                    if (phone.promotion === 0) {
                                        priceCurrent.push(quantityCurrent * phone.price);
                                    } else {
                                        priceCurrent.push(quantityCurrent * newPrice(phone.price, phone.promotion));
                                    }
                                    return (
                                        <div key={phone.id} className="phone__basket">
                                            <div className="item__img">
                                                <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="image téléphone" />
                                            </div>
                                            <div className="item__desc">
                                                <div>
                                                    <h3 className="item__title">
                                                        {phone.brand} - {phone.model} - {phone.storage}Go - {phone.color}
                                                    </h3>
                                                </div>
                                                <div className="item__choice">
                                                    <div>
                                                        <label htmlFor={`quantity${phone.id}`}>Quantitée :
                                                            <select
                                                                {...register(`quantity${phone.id}`)}
                                                                id={`quantity${phone.id}`}
                                                                onChange={handleChange}
                                                                value={quantityCurrent}
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <RiDeleteBin2Fill onClick={() => { deleteItem(phone.id) }} id={parseInt(phone.id)} className='icon__delete' />
                                                    </div>
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
                                                            <span>
                                                                {newPrice(phone.price, phone.promotion)} €
                                                            </span>
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })}
                        <div>
                            Total quantitée: {calcTotalQuantity(storage)}
                            <div>
                                Total {calcTotalPrice(priceCurrent)} €
                            </div>
                        </div>
                        <div>
                            <Button onClick={validation}>Je passe ma commande</Button>
                        </div>
                    </form>
                </div>
            }
        </article>
    )
}