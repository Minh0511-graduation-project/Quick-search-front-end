import {Image, Input, Space} from "antd";
import Layout from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import "./home.css";
import {SearchOutlined} from '@ant-design/icons';

const {Search} = Input;

const Home = () => {
    const handleSearch = (value) => {
        console.log(value);
    }
    return (
        <Layout
            className={"Home"}>
            <Space className={"logo"}>
                <Image
                    className={"logo-image"}
                    src={logo} width={300} height={300}/>
            </Space>
            <Space className={"app-name"}>
                SHOP SEARCH SYSTEM
            </Space>
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
        </Layout>
    );
};

export default Home;