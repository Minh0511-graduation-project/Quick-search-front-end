import "./searchHeading.css"
import {AutoComplete, Col, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import LogoAndName from "../logoAndName/logoAndName";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import ShopeeService from "../../services/shopee.service";
import LazadaService from "../../services/lazada.service";
import TikiService from "../../services/tiki.service";

const removeDuplicates = require('../../support/helper')

const SearchHeading = (props) => {
    const [inputValue, setInputValue] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const handleSearch = async value => {
        let response = [];
        const shopeeResponse = await ShopeeService.listSuggestionsByKeyword(value);
        response.push(...shopeeResponse)
        const lazadaResponse = await LazadaService.listSuggestionsByKeyword(value);
        response.push(...lazadaResponse)
        const tikiResponse = await TikiService.listSuggestionsByKeyword(value);
        response.push(...tikiResponse)
        response = removeDuplicates(response);
        setSuggestions(response);
    };


    const goToNewSearch = (value) => {
        props.handleRefresh();
        localStorage.setItem("searchValue", value);
        navigate(`/search-results/${value}`)
        setInputValue("");
    }

    useEffect(() => {
        // Remove the focus from the search bar when the search results page loads
        searchRef.current.blur();
    }, []);

    return (
        <Layout className={"search-heading"}>
            <Row>
                <Col span={6}
                    onClick={() => navigate("/")}
                     style={{cursor: "pointer"}}
                >
                    <LogoAndName/>
                </Col>
                <Col span={15}>
                    <AutoComplete
                        style={{
                            width: "50vw",
                            height: "5vh",
                        }}
                        ref={searchRef}
                        options={suggestions}
                        onSearch={handleSearch}
                        value={inputValue}
                        onChange={setInputValue}
                        autoFocus={false}
                        defaultOpen={false}
                    >
                        <Search
                            size="large"
                            placeholder="Bạn muốn tìm gì?"
                            enterButton="Tìm kiếm"
                            prefix={<SearchOutlined/>}
                            className={"search-bar"}
                            onSearch={goToNewSearch}
                            autoFocus={false}
                        />
                    </AutoComplete>
                </Col>
            </Row>
        </Layout>
    );
};

export default SearchHeading;