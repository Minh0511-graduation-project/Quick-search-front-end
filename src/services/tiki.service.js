import axios from 'axios';
require("dotenv").config()

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class TikiService {
    listSuggestionsByKeyword(keyword) {
        return axios.get(`${REACT_APP_API_URL}/tiki/suggestion?keyword=${keyword}`, {
            withCredentials: true,
        }).then(
            function (response) {
                return response.data.data.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    listProductsBySearchTerm(searchTerm) {
        return axios.get(`${REACT_APP_API_URL}/tiki/product?searchTerm=${searchTerm}`, {
            withCredentials: true,
        }).then(
            function (response) {
                return response.data.data.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

// eslint-disable-next-line
export default new TikiService();