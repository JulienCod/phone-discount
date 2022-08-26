import Joi from 'joi';

const createAccount = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.empty": "L'adresse mail est obligatoire",
            "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
            "string.empty": "Le mot de passe est obligatoire",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
            "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
        }),
    lastname: Joi.string()
        .required()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
            "string.empty": "Le prénom est obligatoire",
            "string.min": "Le prénom doit contenir au minimum 3 caractères",
            "string.max": "Le prénom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base": "Le prénom ne doit pas contenir les caractères $ ou =",
        }),
    firstname: Joi.string()
        .required()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
            "string.empty": "Le nom est obligatoire",
            "string.min": "Le nom doit contenir au minimum 3 caractères",
            "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base": "Le nom ne doit pas contenir les caractères $ ou =",
        }),
    address: Joi.string()
        .required()
        .min(3)
        .max(100)
        .pattern(new RegExp('^[^$=]{3,100}$'))
        .messages({
            "string.empty": "L'adresse est obligatoire",
            "string.min": "L'adresse doit contenir au minimum 3 caractères",
            "string.max": "L'adresse ne doit pas contenir plus de 100 caractères",
            "string.pattern.base": "L'adresse ne doit pas contenir les caractères $ ou =",
        }),
    postal_code: Joi.number()
        .required()
        .min(3)
        .integer()
        .messages({
            "number.base": "Le code postal est obligatoire et il doit contenir que des chiffres",
            "number.min": "Le code postal  doit contenir au minimum 3 caractères",
            "number.integer": "Le code postal ne doit pas être un nombre à virgule",
            "number.pattern.base": "Le code postal  ne doit pas contenir les caractères $ ou =",
        }),
    rgpd: Joi.boolean()
        .required()
        .messages({
            "boolean.required": "Le rgpd est obligatoire"
        }),
})

const connectAccount = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.empty": "L'adresse mail est obligatoire",
            "string.email": "l'extension doit contenir un @ et un domaine avec minimum deux caractères",
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
            "string.empty": "Le mot de passe est obligatoire",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
            "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
        })
})
export { createAccount, connectAccount }