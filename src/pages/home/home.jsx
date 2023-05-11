import {AutoComplete, Image, Input, Space} from "antd";
import Layout from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import "./home.css";
import {SearchOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ShopeeService from "../../services/shopee.service";
import TikiService from "../../services/tiki.service";
import RecommendSearch from "../../components/recommendSearchKeyword/recommendSearch";

const removeDuplicates = require('../../support/helper')

const {Search} = Input;

const Home = () => {
    const [inputValue, setInputValue] = useState();
    const [shopeeSuggestion, setShopeeSuggestion] = useState([]);
    const [tikiSuggestion, setTikiSuggestion] = useState([]);
    const navigate = useNavigate();

    const renderTitle = (title) => (
        <span
            style={{
                fontSize: 20,
            }}
        >
            {title}
        </span>
    );
    const renderItem = (title, index) => {
        const key = `${title}-${index}`;
        return {
            value: title,
            label: (
                <div
                    key={key}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {title}
                </div>
            ),
        };
    };

    const handleSearch = async value => {
        const newValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let response = [];
        let shopeeSuggestionResponse = []
        let tikiSuggestionResponse = []
        const shopeeResponse = await ShopeeService.listSuggestionsByKeyword(newValue);
        shopeeSuggestionResponse.push(...shopeeResponse)
        response.push(...shopeeResponse)

        const tikiResponse = await TikiService.listSuggestionsByKeyword(newValue);
        tikiSuggestionResponse.push(...tikiResponse)
        response.push(...tikiResponse)

        response = removeDuplicates(response);
        setShopeeSuggestion(shopeeSuggestionResponse)
        setTikiSuggestion(tikiSuggestionResponse)
    };

    const filteredArray = shopeeSuggestion.filter((item) => {
        return !tikiSuggestion.some((secondItem) => secondItem.value === item.value);
    });

    const options = [
        {
            label: renderTitle('Tiki'),
            options: tikiSuggestion.map((title, index) =>
                renderItem(title.value, index)
            ),
        },
        {
            label: renderTitle('Shopee'),
            options: filteredArray.map((title, index) =>
                renderItem(title.value, index)
            ),
        },
    ];

    const goToSearchResults = (value) => {
        if (value === undefined || value === "") {
            // do nothing
        } else {
            localStorage.setItem("searchValue", value);
            navigate(`/search-results/${value}/shop-products`)
        }
    }

    return (
        <Layout
            className={"Home"}>
            <Space className={"logo-home"}>
                <Image
                    className={"logo-image"}
                    src={logo} width={300} height={300} preview={false}/>
            </Space>
            <Space className={"app-name-home"}>
                TRENDY SEARCH
            </Space>
            <Space className={"search-bar-home"}>
                <AutoComplete
                    className={"search-input"}
                    options={options}
                    onSearch={handleSearch}
                    onSelect={goToSearchResults}
                    value={inputValue}
                    onChange={setInputValue}
                >
                    <Search
                        size="large"
                        placeholder="Bạn muốn tìm gì?"
                        enterButton="Tìm kiếm"
                        prefix={<SearchOutlined/>}
                        className={"search-input"}
                        allowClear={true}
                        onSearch={goToSearchResults}
                    />
                </AutoComplete>
            </Space>
            <Layout>
                <RecommendSearch/>
            </Layout>
        </Layout>
    );
};

export default Home;