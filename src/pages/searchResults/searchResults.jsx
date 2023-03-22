import {Col, Collapse, Layout, Row, Space} from "antd";
import "./searchResults.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import ProductCard from "../../components/productCard/productCard";
import {useEffect, useState} from "react";
import ShopeeService from "../../services/shopee.service";
import TikiService from "../../services/tiki.service";
import LazadaService from "../../services/lazada.service";

const {Panel} = Collapse;

const SearchResults = () => {
    const [tikiProducts, setTikiProducts] = useState();
    const [shopeeProducts, setShopeeProducts] = useState();
    const [lazadaProducts, setLazadaProducts] = useState();
    const [refreshPage, setRefreshPage] = useState(false);
    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };
    const searchTerm = localStorage.getItem("searchValue").toLowerCase();

    const getTikiProducts = () => {
        TikiService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                for (let i = 0; i < 5; i++) {
                    productArr.push(listProducts[i]);
                }
            }
            setTikiProducts(productArr);
        })
    }

    const getShopeeProducts = () => {
        ShopeeService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                for (let i = 0; i < 5; i++) {
                    productArr.push(listProducts[i]);
                }
            }
            setShopeeProducts(productArr);
        })
    }

    const getLazadaProducts = () => {
        LazadaService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                for (let i = 0; i < 5; i++) {
                    productArr.push(listProducts[i]);
                }
            }
            setLazadaProducts(productArr);
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTikiProducts();
            await getShopeeProducts();
            await getLazadaProducts();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage]);
    return (
        <Layout className={"search-results"}>
            <SearchHeading handleRefresh={handleRefresh}/>
            <Space className={"tiki"}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Tiki"
                           className={"tiki-panel"}
                           key={"1"}
                    >
                        <Row gutter={30}>
                            {tikiProducts?.map((product, index) => (
                                <Col span={4.8} key={index}>
                                    <ProductCard
                                        imageUrl={product.imageUrl}
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
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Shopee"
                           className={"shopee-panel"}
                           key={"1"}
                    >
                        <Row gutter={30}>
                            {shopeeProducts?.map((product, index) => (
                                <Col span={4.8} key={index}>
                                    <ProductCard
                                        imageUrl={product.imageUrl}
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
                <Collapse defaultActiveKey={['1']}>
                    <Panel
                        header="Lazada"
                        className={"lazada-panel"}
                        key={"1"}
                    >
                        <Row gutter={30}>
                            {lazadaProducts?.map((product, index) => (
                                <Col span={4.8} key={index}>
                                    <ProductCard
                                        imageUrl={product.imageUrl}
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