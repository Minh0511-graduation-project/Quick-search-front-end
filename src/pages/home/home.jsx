import {Button, DatePicker, Space, version} from "antd";

const Home = () => {
    console.log("home")
    return (
        <div className="Home">
            <h1>antd version: {version}</h1>
            <Space>
                <DatePicker />
                <Button type="primary">Primary Button</Button>
            </Space>
        </div>
    );
};

export default Home;