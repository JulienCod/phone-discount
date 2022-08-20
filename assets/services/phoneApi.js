import axios from "axios";

// async function find(id) {
//         axios.get('/api/phone/' + id)
//         .then (response => {
//             return response.data[0]; 
//         });
// }

function create(phone) {
    return axios.post('/api/phone', phone);
}

export default {
    create,
};
