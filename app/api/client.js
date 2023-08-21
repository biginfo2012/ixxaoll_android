const axios = require('axios').default;

//http://192.168.50.65:5001/ => dev
//http://192.168.50.63:5001/ => ixallDemo
//http://192.168.60.85:5001/ => liptic
//global.BASE_URL = 'http://192.168.2.228:5000/'
global.BASE_URL = 'http://192.168.50.65:5001/';
global.DOMAIN = 'IXXALL'
//global.BASE_URL = 'http://192.168.0.2:5000/';

const apiClient = axios.create({
  baseURL: global.BASE_URL,
  timeout: 5000
})

export default apiClient;