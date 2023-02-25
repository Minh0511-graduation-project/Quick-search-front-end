import {Layout, Space} from "antd";
import "./search-results.css";
import {SearchOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const SearchResults = () => {
    const handleSearch = (value) => {
        console.log(value);
    }
    return (
        <Layout className={"search-results"}>
            <Space className={"search-bar"}>
                <Search
                    size="large"
                    placeholder="Bạn muốn tìm gì?"
                    enterButton="Tìm kiếm"
                    allowClear
                    prefix={<SearchOutlined/>}
                    className={"search-input"}
                    onSearch={handleSearch}
                />
            </Space>
            <Space>
                <h1>Search Results</h1>
            </Space>
        </Layout>
    );
};

export default SearchResults;