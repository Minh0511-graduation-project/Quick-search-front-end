import {Col, Collapse, Layout, Row, Space, Typography} from "antd";
import "./searchResults.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import ProductCard from "../../components/productCard/productCard";
import {useEffect, useState} from "react";
import ShopeeService from "../../services/shopee.service";
import TikiService from "../../services/tiki.service";
import LazadaService from "../../services/lazada.service";
import imagePlaceHolder from "../../assets/No-Image-Placeholder.svg.png";
import styled from 'styled-components';
import TikiLogo from '../../assets/Tiki_logo.png';
import LazadaLogo from '../../assets/Lazada_logo.png';
import ShopeeLogo from '../../assets/Shopee_logo.jpg';
import Sidebar from "../../components/sidebar/sidebar";

const SearchResults = () => {
    const [tikiProducts, setTikiProducts] = useState();
    const [tikiArrLen, setTikiArrLen] = useState();
    const [shopeeProducts, setShopeeProducts] = useState();
    const [shopeeArrLen, setShopeeArrLen] = useState();
    const [lazadaProducts, setLazadaProducts] = useState();
    const [lazadaArrLen, setLazadaArrLen] = useState();
    const [refreshPage, setRefreshPage] = useState(false);

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };
    const searchTerm = localStorage.getItem("searchValue").toLowerCase();

    const getTikiProducts = () => {
        TikiService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                if (listProducts.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                } else {
                    for (let i = 0; i < listProducts.length; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                }
            }
            setTikiArrLen(productArr.length);
            setTikiProducts(productArr);
        })
    }

    const getShopeeProducts = () => {
        ShopeeService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                if (listProducts.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                } else {
                    for (let i = 0; i < listProducts.length; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                }
            }
            setShopeeArrLen(productArr.length)
            setShopeeProducts(productArr);
        })
    }

    const getLazadaProducts = () => {
        LazadaService.listProductsBySearchTerm(searchTerm).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                if (listProducts.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                } else {
                    for (let i = 0; i < listProducts.length; i++) {
                        if (listProducts[i].imageUrl == null || listProducts[i].imageUrl === undefined) {
                            listProducts[i].imageUrl = imagePlaceHolder;
                        }
                        productArr.push(listProducts[i]);
                    }
                }
            }
            setLazadaArrLen(productArr.length)
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

    const StyledCollapse = styled(Collapse.Panel)`
      &&& {
        border: none;
        border-radius: 15px;
        background-color: #4285F4;
        box-shadow: none;
      }

      .ant-collapse-content {
        background: rgb(220, 229, 251);
      }
    `;

    console.log(shopeeProducts)
    console.log(lazadaProducts)
    console.log(tikiProducts)

    return (
        <Layout className={"search-results"}>
            <SearchHeading
                handleRefresh={handleRefresh}
            />
            <Layout className={"search-results-side"}>
                <Sidebar />
                {tikiArrLen !== 0 || lazadaArrLen !== 0 || shopeeArrLen !== 0 ? (
                    <Layout className={"search-results-content"}>
                        <Space className={"tiki"}>
                            <Collapse
                                defaultActiveKey={['1']}
                            >
                                <StyledCollapse
                                    header={
                                        <Row>
                                            <Col span={1}>
                                                <img
                                                    src={TikiLogo}
                                                    alt="tiki-logo"
                                                    className={"brand-logo"}
                                                />
                                            </Col>
                                            <Col span={5}
                                                 className={"panel-heading"}
                                            >
                                                Tiki
                                            </Col>
                                        </Row>
                                    }
                                    className={"tiki-panel"}
                                    key={tikiArrLen > 0 ? "1" : "0"}
                                >
                                    <Row gutter={30}
                                         style={{
                                             display: "flex",
                                             justifyContent: "center",
                                         }}
                                    >
                                        {tikiProducts?.map((product, index) => (
                                            <Col span={4.8} key={product.id}>
                                                <ProductCard
                                                    imageUrl={product.imageUrl}
                                                    name={product.name}
                                                    price={product.price}
                                                    productUrl={product.productUrl}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </StyledCollapse>
                            </Collapse>
                        </Space>
                        <Space className={"shopee"}>
                            <Collapse defaultActiveKey={['1']}>
                                <StyledCollapse
                                    header={
                                        <Row>
                                            <Col span={1}>
                                                <img
                                                    src={ShopeeLogo}
                                                    alt="shopee-logo"
                                                    className={"brand-logo"}
                                                />
                                            </Col>
                                            <Col span={5}
                                                 className={"panel-heading"}
                                            >
                                                Shopee
                                            </Col>
                                        </Row>
                                    }
                                    className={"shopee-panel"}
                                    key={shopeeArrLen > 0 ? "1" : "0"}
                                >
                                    <Row gutter={30}
                                         style={{
                                             display: "flex",
                                             justifyContent: "center",
                                         }}
                                    >
                                        {shopeeProducts?.map((product, index) => (
                                            <Col span={4.8} key={product.id}>
                                                <ProductCard
                                                    imageUrl={product.imageUrl}
                                                    name={product.name}
                                                    price={product.price}
                                                    productUrl={product.productUrl}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </StyledCollapse>
                            </Collapse>
                        </Space>
                        <Space className={"lazada"}>
                            <Collapse defaultActiveKey={['1']}>
                                <StyledCollapse
                                    header={
                                        <Row>
                                            <Col span={1}>
                                                <img
                                                    src={LazadaLogo}
                                                    alt="lazada-logo"
                                                    className={"brand-logo"}
                                                />
                                            </Col>
                                            <Col span={5}
                                                 className={"panel-heading"}
                                            >
                                                Lazada
                                            </Col>
                                        </Row>
                                    }
                                    className={"lazada-panel"}
                                    key={lazadaArrLen > 0 ? "1" : "0"}
                                >
                                    <Row gutter={30}
                                         style={{
                                             display: "flex",
                                             justifyContent: "center",
                                         }}
                                    >
                                        {lazadaProducts?.map((product, index) => (
                                            <Col span={4.8} key={product.id}>
                                                <ProductCard
                                                    imageUrl={product.imageUrl}
                                                    name={product.name}
                                                    price={product.price}
                                                    productUrl={product.productUrl}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </StyledCollapse>
                            </Collapse>
                        </Space>
                    </Layout>
                ) : (
                    <Layout className={"search-results-content"}>
                        <Layout className={"search-results-stat"}>
                            <Typography
                                style={{
                                    fontSize: 30
                                }}
                            >
                                Sản phẩm {searchTerm} không phải là sản phẩm thịnh hành
                            </Typography>
                        </Layout>
                    </Layout>
                )}
            </Layout>
        </Layout>
    );
};

export default SearchResults;