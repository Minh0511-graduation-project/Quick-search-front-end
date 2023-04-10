import "./recommendSearch.css"
import {Col, Row, Typography} from "antd";
import TikiService from "../../services/tiki.service";
import ShopeeService from "../../services/shopee.service";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const RecommendSearch = () => {
    const [tikiTopSearch, setTikiTopSearch] = useState([]);
    const [shopeeTopSearch, setShopeeTopSearch] = useState([]);
    const navigate = useNavigate();

    const getTikiTopSearch = () => {
        TikiService.getTikiTopSearch().then((response) => {
            console.log(response)
            const topSearches = []
            if (response.length <= 10) {
                for (let i = 0; i < response.length; i++) {
                    topSearches.push(response[i].keyword)
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    topSearches.push(response[i].keyword)
                }
            }
            setTikiTopSearch(topSearches)
        })
    }

    const getShopeeTopSearch = () => {
        ShopeeService.getShopeeTopSearch().then((response) => {
            const topSearches = []
            if (response.length <= 10) {
                for (let i = 0; i < response.length; i++) {
                    topSearches.push(response[i].text)
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    topSearches.push(response[i].text)
                }
            }
            setShopeeTopSearch(topSearches)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTikiTopSearch();
            await getShopeeTopSearch();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToSearchResults = (value) => {
        console.log(value)
        localStorage.setItem("searchValue", value);
        navigate(`/search-results/${value}/shop-products`)
    }

    return (
        <div className={"top-search-div"}>
            <Row>
                <Col span={3}>
                    <Typography
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        Top search Tiki:
                    </Typography>
                </Col>
                <Col span={21}>
                    {tikiTopSearch?.map((keyword, index) => (
                        <Typography
                            className={"top-search"}
                            onClick={() => goToSearchResults(keyword)}
                            style={{ cursor: "pointer" }}
                        >
                            {keyword}
                        </Typography>
                    ))}
                </Col>
            </Row>
            <Row
                style={{
                    paddingTop: 16,
                }}
            >
                <Col span={3}>
                    <Typography
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        Top search Shopee:
                    </Typography>
                </Col>
                <Col span={21}>
                    {shopeeTopSearch?.map((keyword, index) => (
                        <Typography
                            className={"top-search"}
                            onClick={() => goToSearchResults(keyword)}
                            style={{ cursor: "pointer" }}
                        >
                            {keyword}
                        </Typography>
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default RecommendSearch;