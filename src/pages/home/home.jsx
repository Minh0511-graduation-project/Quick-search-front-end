import {AutoComplete, Image, Input, Space} from "antd";
import Layout from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import "./home.css";
import {SearchOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ShopeeService from "../../services/shopee.service";

const {Search} = Input;

const Home = () => {
    const [inputValue, setInputValue] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async value => {
        const response = await ShopeeService.listSuggestionsByKeyword(value);
        setSuggestions(response);
    };

    const goToSearchResults = (value) => {
        localStorage.setItem("searchValue", value);
        navigate(`/search-results/${value}`)
    }
    return (
        <Layout
            className={"Home"}>
            <Space className={"logo-home"}>
                <Image
                    className={"logo-image"}
                    src={logo} width={300} height={300}/>
            </Space>
            <Space className={"app-name-home"}>
                SHOP SEARCH SYSTEM
            </Space>
            <Space className={"search-bar-home"}>
                <AutoComplete
                    className={"search-input"}
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
                        className={"search-input"}
                        onSearch={goToSearchResults}
                    />
                </AutoComplete>
            </Space>
        </Layout>
    );
};

export default Home;