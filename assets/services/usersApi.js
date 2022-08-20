import axios from "axios";

function register(user) {
    return axios.post('/api/user', user);
}

export default {
    register
};