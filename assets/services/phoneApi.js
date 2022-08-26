import axios from "axios";


function create(phone) {
    return axios.post('/api/phone', phone);
}

export default {
    create,
};
