import {Card, Layout, Space} from "antd";
import "./productCard.css";

const productCard = (props) => {
    const handleCardClick = () => {
        window.open(props.productUrl, '_blank');
    };

    return(
        <Layout className={"product-card"}>
            <Card
                hoverable
                bordered={true}
                style={{
                    width: 240,
                }}
                cover={<img alt="example" src={props.imageUrl} />}
                onClick={handleCardClick}
            >
                <Space
                    className={"product-card-name"}
                >
                    {props.name}
                </Space>
                <Space
                    className={"product-card-price"}
                >
                    {props.price}
                </Space>
            </Card>
        </Layout>
    );
};

export default productCard;