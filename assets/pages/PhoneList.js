import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PhoneList.css';
import AuthAPI from '../services/authApi';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import Loader from '../components/loader/loader';
import CardPhone from '../components/cardPhone/CardPhone';

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

    return (
        <article>
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
                        <div >
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

                    <CardPhone data={phoneList}/>
                </>
            }
        </article>
    )
}
