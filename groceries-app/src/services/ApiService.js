// /src/services/ApiService.js
import axios from 'axios';

const BASE_URL = ' https://dummyjson.com'; // Replace with your API base URL

const ApiService = {
    get: async (endpoint, params = {}) => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ApiService;
