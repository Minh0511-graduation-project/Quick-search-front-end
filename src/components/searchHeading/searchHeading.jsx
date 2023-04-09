import "./searchHeading.css"
import {Affix, AutoComplete, Col, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import LogoAndName from "../logoAndName/logoAndName";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import ShopeeService from "../../services/shopee.service";
import TikiService from "../../services/tiki.service";

const removeDuplicates = require('../../support/helper')

const SearchHeading = (props) => {
    const [inputValue, setInputValue] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = async value => {
        const newValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let response = [];
        const shopeeResponse = await ShopeeService.listSuggestionsByKeyword(newValue);
        response.push(...shopeeResponse)
        const tikiResponse = await TikiService.listSuggestionsByKeyword(newValue);
        response.push(...tikiResponse)
        response = removeDuplicates(response);
        setSuggestions(response);
    };


    const goToNewSearch = (value) => {
        if (value === undefined || value === "") {
            // do nothing
        } else {
            props.handleRefresh();
            localStorage.setItem("searchValue", value);
            navigate(`/search-results/${value}/shop-products`)
        }
    }

    return (
        <Affix
            offsetTop={0}
        >
            <Layout
                className={"search-heading"}
            >
                <Row>
                    <Col span={6}
                         onClick={() => navigate("/")}
                         style={{cursor: "pointer"}}
                    >
                        <LogoAndName/>
                    </Col>
                    <Col span={18}>
                        <AutoComplete
                            style={{
                                width: "50vw",
                            }}
                            autoClearSearchValue={true}
                            options={suggestions}
                            onSearch={handleSearch}
                            onSelect={goToNewSearch}
                            value={inputValue}
                            onChange={setInputValue}
                        >
                            <Search
                                size="large"
                                placeholder="Bạn muốn tìm gì?"
                                enterButton="Tìm kiếm"
                                prefix={<SearchOutlined/>}
                                className={"search-bar"}
                                onSearch={goToNewSearch}
                                allowClear={true}
                                onBlur={() => searchInputRef.current?.blur()}

                            />
                        </AutoComplete>
                    </Col>
                </Row>
            </Layout>
        </Affix>
    );
};

export default SearchHeading;