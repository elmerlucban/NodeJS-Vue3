import api from './api';


const getAllUser = (params) => {
    return api.get('/user', { params }); 
};

const findUser = (id) => {
    return api.get(`/user/${id}`); 
};

const createUser = (data) => {
    return api.post('/user', data); 
};

const deleteUser = (id) => {
    return api.delete(`/user/${id}`); 
};

const updateUser = (id, data) => {
    return api.put(`/user/${id}`, data); 
};

const Users = {
    getAllUser,
    findUser,
    createUser,
    deleteUser,
    updateUser
}

export default Users;