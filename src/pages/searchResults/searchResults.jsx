import {Col, Collapse, Layout, Row, Space} from "antd";
import "./searchResults.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import ProductCard from "../../components/productCard/productCard";
import placeHolderImg from "../../assets/earbud.jpg";

const {Panel} = Collapse;

const SearchResults = () => {
    const products = [
        {image_url: placeHolderImg, name: "Tai nghe 1", price: "100000đ"},
        {image_url: placeHolderImg, name: "Tai nghe 2", price: "200000đ"},
        {image_url: placeHolderImg, name: "Tai nghe 3", price: "300000đ"},
        {image_url: placeHolderImg, name: "Tai nghe 4", price: "400000đ"},
        {image_url: placeHolderImg, name: "Tai nghe 5", price: "500000đ"},
    ]
    return (
        <Layout className={"search-results"}>
            <SearchHeading/>
            <Space className={"tiki"}>
                <Collapse>
                    <Panel header="Tiki"
                           className={"tiki-panel"}>
                        >
                        <Row gutter={30}>
                            {products?.map((product) => (
                                <Col span={4.8}>
                                    <ProductCard
                                        imageUrl={product.image_url}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Panel>
                </Collapse>
            </Space>
            <Space className={"shopee"}>
                <Collapse>
                    <Panel header="Shopee"
                           className={"shopee-panel"}
                    >
                        <Row gutter={30}>
                            {products?.map((product) => (
                                <Col span={4.8}>
                                    <ProductCard
                                        imageUrl={product.image_url}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Panel>
                </Collapse>
            </Space>
            <Space className={"lazada"}>
                <Collapse>
                    <Panel
                        header="Lazada"
                        className={"lazada-panel"}
                    >
                        <Row gutter={30}>
                            {products?.map((product) => (
                                <Col span={4.8}>
                                    <ProductCard
                                        imageUrl={product.image_url}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Panel>
                </Collapse>
            </Space>
        </Layout>
    );
};

export default SearchResults;