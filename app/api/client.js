const axios = require('axios').default;

//http://192.168.50.65:5001/ => dev
//http://192.168.50.63:5001/ => ixallDemo
//http://192.168.60.85:5001/ => liptic

const apiClient = axios.create({
  baseURL: 'http://192.168.2.228:5000/',
  timeout: 5000
})

export default apiClient;