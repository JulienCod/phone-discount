import React from 'react';
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function CreateAccount() {

    const handleSave = (user) => {

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('lastname', user.lastname);
        formData.append('firstname', user.firstname);
        formData.append('address', user.address);
        formData.append('postal_code', user.postal_code);
        formData.append('rgpd', user.rgpd);
        axios.post('/api/user', formData)
            .then(function (response) {
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
            email: data.email,
            password: data.password,
            lastname: data.lastname,
            firstname: data.firstname,
            address: data.address,
            postal_code: data.postal_code,
            rgpd: data.rgpd,
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

            <div className="input__field">
                <input
                    type="text"
                    placeholder="Nom"
                    {...register("firstname")} />
                <span className="input__error">{errors.firstname?.message}</span>
            </div>

            <div className="input__field">
                <input
                    type="text"
                    placeholder="Prénom"
                    {...register("lastname")} />
                <span className="input__error">{errors.lastname?.message}</span>
            </div>

            <div className="input__field">
                <input
                    type="text"
                    placeholder="Adresse postale"
                    {...register("address")}
                />
                <span className="input__error">{errors.address?.message}</span>
            </div>

            <div className="input__field">
                <input
                    type="number"
                    placeholder="Code postal"
                    {...register("postal_code")}
                />
                <span className="input__error">{errors.postal_code?.message}</span>
            </div>

            <div className="input__field">
                <input
                    type="checkbox"
                    placeholder="RGPD"
                    {...register("rgpd")}
                />
                <span className="input__error">{errors.rgpd?.message}</span>
            </div>

            <div>
                <button>Créer un compte</button>
            </div>
        </form>
    )
}
