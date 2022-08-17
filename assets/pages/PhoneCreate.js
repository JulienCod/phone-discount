import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { joiResolver } from '@hookform/resolvers/joi';


export default function PhoneCreate() {

  const handleSave = (phone, image) => {
    
    const formData = new FormData();
    formData.append('imageName', image);
    formData.append('brand', phone.brand);
    formData.append('description', phone.description);
    formData.append('model', phone.model);
    formData.append('color', phone.color);
    formData.append('storage', phone.storage);
    formData.append('stock', phone.stock);
    formData.append('price', phone.price);
    formData.append('promotion', phone.promotion);
    formData.append('is_active', phone.is_active);
    axios.post('/api/phone', formData)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Téléphone créé avec succès!',
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
        setIsSaving(false);
      });
  };
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = event => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview)
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: joiResolver(?Schema)
  });
  const onSubmit = data => {
    let image = data.imageName[0]
    let phone = {
      brand: data.brand,
      model: data.model,
      color: data.color,
      description: data.description,
      storage: data.storage,
      stock: data.stock,
      price: data.price,
      promotion: data.promotion,
      is_active: data.is_active,
    }
    handleSave(phone, image)
  }

  return (
    <article className="container">
      <Link className="btn__home" to="/">
        Voir tous les téléphones
      </Link>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Ajouter un téléphone</h2>
        <div className="input__field">
          <input
            type="text"
            placeholder="Marque"
            {...register("brand")} />
          <span className="input__error">{errors.brand?.message}</span>
        </div>
        <div className="input__field">
          <input
            type="text"
            placeholder="Modèle"
            {...register("model")} />
          <span className="input__error">{errors.model?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="text"
            placeholder="Couleur"
            {...register("color")} />
          <span className="input__error">{errors.color?.message}</span>
        </div>
        <div className="input__field">
          <input
            type="text"
            placeholder="Description"
            {...register("description")} />
          <span className="input__error">{errors.description?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="number"
            placeholder="Capacité de stockage"
            {...register("storage")}
          />
          <span className="input__error">{errors.storage?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="number"
            placeholder="Stock"
            {...register("stock")}
          />
          <span className="input__error">{errors.stock?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="number"
            placeholder="Prix"
            {...register("price")}
          />
          <span className="input__error">{errors.price?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="number"
            placeholder="Pourcentage de promotion"
            {...register("promotion")}
          />
          <span className="input__error">{errors.promotion?.message}</span>
        </div>

        <div className="input__field">
          <input
            type="checkbox"
            placeholder="Pourcentage de promotion"
            {...register("is_active")}
          />
          <span className="input__error">{errors.is_active?.message}</span>
        </div>

        <div className="input__field">
          <div className="">
            <input
              className=""
              type="file"
              name='imageName'
              id='imageName'
              placeholder="image"
              {...register("imageName")}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor='imageName'>Sélectionner une image</label>
          </div>
          {file && <img src={preview} alt={file.name} />}
        </div>
        <div>
          <button>Enregistrer</button>
        </div>
      </form>
    </article>
  );
}
