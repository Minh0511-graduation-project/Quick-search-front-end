import axios from 'axios';
require("dotenv").config()

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class ShopeeService {
    listSuggestionsByKeyword(keyword) {
        const suggestionVal = (str) => ({
            value: str,
        });
            return axios.get(`${REACT_APP_API_URL}/shopee/suggestion?keyword=${keyword}`, {
              //  withCredentials: true,
            }).then(
            function (response) {
                let data = response.data.data.data;
                const suggestionsArr = [];
                if (data != null) {
                    for (let i = 0;i < data[0].suggestions.length;i++) {
                        suggestionsArr.push(suggestionVal(data[0].suggestions[i]));
                    }
                }
                return suggestionsArr;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    listProductsBySearchTerm(searchTerm) {
        return axios.get(`${REACT_APP_API_URL}/shopee/product?searchTerm=${searchTerm}`, {
          //  withCredentials: true,
        }).then(
            function (response) {
                return response.data.data.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    getShopeeKeywordCount(keyword) {
        return axios.get(`${REACT_APP_API_URL}/suggestionCount?keyword=${keyword}&site=shopee`, {
         //   withCredentials: true,
        }).then(
            function (response) {
                return response.data.data.data;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    getShopeeTopSearchSuggestion() {
        return axios.get(`${REACT_APP_API_URL}/shopee/topSearchSuggestion`).then(
            function (response) {
                return response.data.data.queries;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    getShopeeTopSearch(topDisplay) {
        return axios.get(`${REACT_APP_API_URL}/shopee/topSearch?topDisplay=${topDisplay}`).then(
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
export default new ShopeeService();