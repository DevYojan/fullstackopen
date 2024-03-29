import axios from 'axios';
const baseUrl = '/api/users';

// const getUser = async (id) => {
//   const response = await axios.get()
// }

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
