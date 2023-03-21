import "./searchHeading.css"
import {AutoComplete, Col, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import LogoAndName from "../logoAndName/logoAndName";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ShopeeService from "../../services/shopee.service";

const SearchHeading = (props) => {
    const [inputValue, setInputValue] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const handleSearch = async value => {
        const response = await ShopeeService.listSuggestionsByKeyword(value);
        setSuggestions(response);
    };
    const goToNewSearch = (value) => {
        props.handleRefresh();
        localStorage.setItem("searchValue", value);
        navigate(`/search-results/${value}`)
    }

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
                        }}
                        options={suggestions}
                        onSearch={handleSearch}
                        value={inputValue}
                        onChange={setInputValue}
                    >
                        <Search
                            size="large"
                            placeholder="Bạn muốn tìm gì?"
                            enterButton="Tìm kiếm"
                            allowClear
                            prefix={<SearchOutlined/>}
                            className={"search-bar"}
                            onSearch={goToNewSearch}
                        />
                    </AutoComplete>
                </Col>
            </Row>
        </Layout>
    );
};

export default SearchHeading;