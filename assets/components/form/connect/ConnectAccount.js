import React from 'react';
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function ConnectAccount() {
    const handleSave = (user) => {
        axios.post('/api/login', user)
            .then(function (response) {
                window.sessionStorage.setItem("token",response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Utilisateur créé avec succès!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur s\'est produite',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
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
