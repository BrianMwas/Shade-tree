import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8500/api/v1/`,
    withCredentials: true,
    timeout: 1000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:8080'
    }
  });
}
