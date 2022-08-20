import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import AuthApi from '../../../services/authApi';
import AuthContext from '../../../context/AuthContext';

export default function ConnectAccount() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const handleSave = async (user) => {
        try {
            await AuthApi.authenticate(user);
            setIsAuthenticated(true);
            Swal.fire({
                icon: 'success',
                title: 'Vous êtes désormais connecté !',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Une erreur est survenue',
                showConfirmButton: false,
                timer: 1500,
            });
        }
        // axios.post('/api/login', user)
        //     .then(function (response) {
        //         window.sessionStorage.setItem("token", response.data.token);
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Vous êtes désormais connecté !',
        //             showConfirmButton: false,
        //             timer: 1500,
        //         });
        //     })
        //     .catch(function (error) {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Une erreur est survenue',
        //             showConfirmButton: false,
        //             timer: 1500,
        //         });
        //     });
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(?Schema)
    });
    const onSubmit = data => {
        let user = {
            username: data.email,
            password: data.password,
        }
        handleSave(user)
    }
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Créer un compte</h2>

            <div className="input__field">
                <input
                    type="email"
                    placeholder="Adresse email"
                    {...register("email")} />
                <span className="input__error">{errors.email?.message}</span>
            </div>

            <div className="input__field">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    {...register("password")} />
                <span className="input__error">{errors.password?.message}</span>
            </div>

            <div>
                <button>Se connecter</button>
            </div>
        </form>
    )
}