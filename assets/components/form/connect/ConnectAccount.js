import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import AuthApi from '../../../services/authApi';
import AuthContext from '../../../context/AuthContext';

export default function ConnectAccount() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const handleSave = async () => {
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
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(?Schema)
    });
    const onSubmit = data => {
        setUser({
            username: data.email,
            password: data.password,
        })
        handleSave();
    }
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Se connecter</h2>

            <div className="input__field">
                <label htmlFor='email'>
                    <input
                        id='email'
                        type="email"
                        placeholder="Adresse email"
                        {...register("email")}
                    />
                    <span className="input__error">{errors.email?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='password'>
                    <input
                        id='password'
                        type="password"
                        placeholder="Mot de passe"
                        {...register("password")}
                    />
                    <span className="input__error">{errors.password?.message}</span>
                </label>
            </div>

            <div>
                <button>Se connecter</button>
            </div>
        </form>
    )
}