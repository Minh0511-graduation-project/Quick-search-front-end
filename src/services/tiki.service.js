import axios from 'axios';
require("dotenv").config()

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class TikiService {
    listSuggestionsByKeyword(keyword) {
        const suggestionVal = (str) => ({
            value: str,
        });
        return axios.get(`${REACT_APP_API_URL}/tiki/suggestion?keyword=${keyword}`, {
            withCredentials: true,
        }).then(
            function (response) {
                let data = response.data.data.data;
                const suggestionsArr = [];
                if (data != null) {
                    for (let i = 0;i < 5;i++) {
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

    getTikiKeywordCount(keyword) {
        return axios.get(`${REACT_APP_API_URL}/suggestionCount?keyword=${keyword}&site=tiki`, {
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

    getTikiTopSearch() {
        return axios.get(`${REACT_APP_API_URL}/tiki/topSearch`).then(
            function (response) {
                return response.data.data.keywords;
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

// eslint-disable-next-line
export default new TikiService();