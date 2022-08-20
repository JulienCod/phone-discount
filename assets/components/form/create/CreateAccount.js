import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import usersApi from '../../../services/usersApi';

export default function CreateAccount() {

    const handleSave = async (user) => {

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('lastname', user.lastname);
        formData.append('firstname', user.firstname);
        formData.append('address', user.address);
        formData.append('postal_code', user.postal_code);
        formData.append('rgpd', user.rgpd);
        try {
            await usersApi.register(formData);
            Swal.fire({
                icon: 'success',
                title: 'Vous êtes désormais inscrit, vous pouvez vous connecter !',
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
                <label htmlFor='email'>
                    <input
                        id='email'
                        type="email"
                        placeholder="Adresse email"
                        {...register("email")} />
                    <span className="input__error">{errors.email?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='password'>
                    <input
                        id='password'
                        type="password"
                        placeholder="Mot de passe"
                        {...register("password")} />
                    <span className="input__error">{errors.password?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='firstname'>
                    <input
                        id='firstname'
                        type="text"
                        placeholder="Nom"
                        {...register("firstname")} />
                    <span className="input__error">{errors.firstname?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='lastname'>
                    <input
                        id='lastname'
                        type="text"
                        placeholder="Prénom"
                        {...register("lastname")} />
                    <span className="input__error">{errors.lastname?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='address'>
                    <input
                        id='address'
                        type="text"
                        placeholder="Adresse postale"
                        {...register("address")}
                    />
                    <span className="input__error">{errors.address?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='postal_code'>
                    <input
                        id='postal_code'
                        type="number"
                        placeholder="Code postal"
                        {...register("postal_code")}
                    />
                    <span className="input__error">{errors.postal_code?.message}</span>
                </label>
            </div>

            <div className="input__field">
                <label htmlFor='rgpd'>
                    RGPD :
                    <input
                        id='rgpd'
                        type="checkbox"
                        placeholder="RGPD"
                        {...register("rgpd")}
                    />
                    <span className="input__error">{errors.rgpd?.message}</span>
                </label>
            </div>

            <div>
                <button>Créer un compte</button>
            </div>
        </form>
    )
}
