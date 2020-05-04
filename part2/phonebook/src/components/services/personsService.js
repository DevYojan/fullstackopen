import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(baseURL).then((response) => response.data);
};

const create = (person) => {
	return axios.post(baseURL, person).then((response) => response.data);
};

const remove = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

const update = (id, data) => {
	return axios.put(`${baseURL}/${id}`, data).then((response) => response.data);
};

export default { getAll, create, remove, update };
