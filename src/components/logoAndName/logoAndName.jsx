import "./logoAndName.css"
import {Col, Image, Layout, Row} from "antd";
import logo from "../../assets/logo.png";

const LogoAndName = () => {
    return(
        <Layout className={"logo-and-name"}>
            <Row>
                <Col span={6} className={"logo-heading"}>
                    <Image className={"logo"} src={logo} width={70} height={70} />
                </Col>
                <Col span={18} className={"app-name"}>
                    Trendy Search
                </Col>
            </Row>
        </Layout>
    );
};

export default LogoAndName;