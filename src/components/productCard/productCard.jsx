import {Card, Layout} from "antd";
import "./productCard.css";
import Meta from "antd/es/card/Meta";

const productCard = (props) => {
    return(
        <Layout className={"product-card"}>
            <Card
                hoverable
                bordered={true}
                style={{ width: 240 }}
                cover={<img alt="example" src={props.imageUrl} />}
            >
                <Meta title={props.name} description={props.price} />
            </Card>
        </Layout>
    );
};

export default productCard;