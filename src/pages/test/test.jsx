import {Image, Input, Space} from "antd";
import Layout, {Content} from "antd/es/layout/layout";
import "./test.css";
import logo from "../../assets/logo.png";
import {SearchOutlined} from "@ant-design/icons";

const {Search} = Input;

const Test = () => {
    const handleSearch = (value) => {
        console.log(value);
    }
    return (
        <Layout className={"Home"}>
            <Content className="content1">
                <Space className={"logo"}>
                    <Image
                        className={"logo-image"}
                        src={logo} width={300} height={300}/>
                </Space>
            </Content>
            <Content className="content2">
                <Space className={"app-name"}>
                    SHOP SEARCH SYSTEM
                </Space>
            </Content>
            <Content className="content3">
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
            </Content>
        </Layout>
    );
};

export default Test;