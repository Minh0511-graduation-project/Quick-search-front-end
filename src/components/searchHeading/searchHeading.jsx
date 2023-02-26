import "./searchHeading.css"
import {Col, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import LogoAndName from "../logoAndName/logoAndName";
import {useNavigate} from "react-router-dom";

const SearchHeading = () => {
    const handleSearch = (value) => {
        console.log(value);
    }
    const navigate = useNavigate();
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
                    <Search
                        size="large"
                        placeholder="Bạn muốn tìm gì?"
                        enterButton="Tìm kiếm"
                        allowClear
                        prefix={<SearchOutlined/>}
                        className={"search-bar"}
                        onSearch={handleSearch}
                    />
                </Col>
            </Row>
        </Layout>
    );
};

export default SearchHeading;