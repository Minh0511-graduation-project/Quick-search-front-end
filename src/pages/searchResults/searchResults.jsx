import {Layout, Space} from "antd";
import "./searchResults.css";
import SearchHeading from "../../components/searchHeading/searchHeading";

const SearchResults = () => {
    return (
        <Layout className={"search-results"}>
            <SearchHeading/>
            <Space>
                <h1>Search results</h1>
            </Space>
        </Layout>
    );
};

export default SearchResults;