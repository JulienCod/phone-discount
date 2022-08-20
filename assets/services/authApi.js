import jwt_decode from "jwt-decode";
import axios from "axios";


/**
 * Déconnexion (suppression du token du sessionStorage et sur Axios)
 */
function logout() {
    window.sessionStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param {object} user
 */
function authenticate(user) {
    return axios
        .post('/api/login', user)
        .then(response => response.data.token)
        .then(token => {
            // Je stocke le token dans mon sessionStorage
            window.sessionStorage.setItem("token", token);
            // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
            setAxiosToken(token);
        });
}

/**
 * Récupère le roles du l'utilisateur connecté
 * @returns roles 
 */
function rolesCurrentUser() {
    // récupère le token présent dans le local de session
    let token = window.sessionStorage.getItem("token");
    // décode le token pour récupérer le roles de l'utilisateur connecté
    let roles = jwt_decode(token).roles[0]
    // return le roles
    return roles
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token Le token JWT
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
    // 1. Voir si on a un token ?
    const token = window.sessionStorage.getItem("token");
    // 2. Si le token est encore valide
    if (token) {
        const { exp: expiration } = jwt_decode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 */
function isAuthenticated() {
    // 1. Voir si on a un token ?
    const token = window.sessionStorage.getItem("token");
    // 2. Si le token est encore valide
    if (token) {

        const { exp: expiration } = jwt_decode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    rolesCurrentUser
};
