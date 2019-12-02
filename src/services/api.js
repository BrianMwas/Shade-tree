import axios from 'axios'

export default (withCredentials, urlAdd) => {
  return axios.create({
    baseURL: `http://localhost:7001/api/v1/${urlAdd}`,
    withCredentials: withCredentials || false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}
