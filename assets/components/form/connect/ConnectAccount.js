import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import AuthApi from '../../../services/authApi';
import AuthContext from '../../../context/AuthContext';
import '../../../styles/form.css';
import Button from '../../button/Button';
import { connectAccount } from '../../../services/formValidation';


export default function ConnectAccount() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const handleSave = async (user) => {
        try {
            await AuthApi.authenticate(user);
            setIsAuthenticated(true);
            await Swal.fire({
                icon: 'success',
                title: 'Vous êtes désormais connecté !',
                showConfirmButton: false,
                timer: 1500,
            });
            window.location.href = "/";
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
        resolver: joiResolver(connectAccount)
    });
    const onSubmit = data => {
        let user ={
            username: data.email,
            password: data.password,
        }
        handleSave(user);
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
                </label>
                    <span className="input__error">{errors.email?.message}</span>
            </div>

            <div className="input__field">
                <label htmlFor='password'>
                    <input
                        id='password'
                        type="password"
                        placeholder="Mot de passe"
                        {...register("password")}
                    />
                </label>
                    <span className="input__error">{errors.password?.message}</span>
            </div>

            <div className="form__btn">
                <Button>Se connecter</Button>
            </div>
        </form>
    )
}