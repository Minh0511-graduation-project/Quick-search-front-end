import axios from 'axios';
require("dotenv").config()

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
console.log(REACT_APP_API_URL)

class ShopeeService {
    listSuggestions() {
            return axios.get(`${REACT_APP_API_URL}/shopee/suggestion?keyword=a`, {
                withCredentials: true,
            }).then(
            function (response) {
                return response;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

// eslint-disable-next-line
export default new ShopeeService();