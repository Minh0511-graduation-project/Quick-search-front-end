import {Card, Layout} from "antd";
import "./productCard.css";
import Meta from "antd/es/card/Meta";

const productCard = (props) => {
    const handleCardClick = () => {
        window.open(props.productUrl, '_blank');
    };
    return(
        <Layout className={"product-card"}>
            <Card
                hoverable
                bordered={true}
                style={{ width: 240 }}
                cover={<img alt="example" src={props.imageUrl} />}
                onClick={handleCardClick}
            >
                <Meta title={props.name} description={props.price} />
            </Card>
        </Layout>
    );
};

export default productCard;