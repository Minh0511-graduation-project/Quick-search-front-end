import axios from 'axios';
const dotenv = require("dotenv")

dotenv.config()

const API_URL = process.env.API_URL;
console.log(API_URL)

class TikiService {
    listProducts(searchTerm) {
        return axios.get(`${API_URL}?searchTerm=${searchTerm}`).then(
            function (response) {
                return response.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    listSuggestions(keyword) {
            return axios.get(`${API_URL}/tiki/suggestion?keyword=${keyword}`).then(
            function (response) {
                return response.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new TikiService();