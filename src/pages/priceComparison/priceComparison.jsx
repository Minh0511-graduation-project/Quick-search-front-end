import {Col, Layout, Row, Typography} from "antd";
import "./priceComparison.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import TikiService from "../../services/tiki.service";
import Sidebar from "../../components/sidebar/sidebar";
import ShopeeService from "../../services/shopee.service";
import {Bar} from '@ant-design/plots';

const PriceComparison = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [tikiPrice, setTikiPrice] = useState();
    const [shopeePrice, setShopeePrice] = useState();

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const keyword = localStorage.getItem("searchValue");

    const getTikiProducts = () => {
        TikiService.listProductsBySearchTerm(keyword).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                if (listProducts.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        productArr.push(listProducts[i].price);
                    }
                } else {
                    for (let i = 0; i < listProducts.length; i++) {
                        productArr.push(listProducts[i].price);
                    }
                }
            }
            let priceArr = []
            productArr.forEach(item => {
                let priceStatArr = item.split(/ - |\n/); // split the string by "-" or newline
                priceStatArr.forEach(price => {
                    let num = parseInt(price.replace('₫', '').replace(/\./g, ''));
                    if (!isNaN(num)) priceArr.push(num);
                });
            })
            let average = 0
            if (priceArr.length > 0) {
                const sum = priceArr.reduce((total, num) => total + num, 0);
                average = Math.ceil(sum / priceArr.length);
            }
            setTikiPrice(average);
        })
    }

    const getShopeeProducts = () => {
        ShopeeService.listProductsBySearchTerm(keyword).then((listProducts) => {
            const productArr = [];
            if (listProducts != null) {
                if (listProducts.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        productArr.push(listProducts[i].price);
                    }
                } else {
                    for (let i = 0; i < listProducts.length; i++) {
                        productArr.push(listProducts[i].price);
                    }
                }
            }
            let priceArr = []
            productArr.forEach(item => {
                let priceStatArr = item.split(/ - |\n/); // split the string by "-" or newline
                priceStatArr.forEach(price => {
                    let num = parseInt(price.replace('₫', '').replace(/\./g, ''));
                    if (!isNaN(num)) priceArr.push(num);
                });
            })
            let average = 0
            if (priceArr.length > 0) {
                const sum = priceArr.reduce((total, num) => total + num, 0);
                average = Math.ceil(sum / priceArr.length);
            }
            setShopeePrice(average);
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTikiProducts();
            await getShopeeProducts();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage]);

    const priceData = [
        {
            platform: 'Tiki',
            value: tikiPrice,
        },
        {
            platform: 'Shopee',
            value: shopeePrice,
        },
    ];

    const config = {
        data: priceData,
        xField: 'value',
        yField: 'platform',
        seriesField: 'platform',
        legend: {
            position: 'top-left',
            className: "bar-chart-legend"
        },
        xAxis: {
            label: {
                style: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
            },
        },
        yAxis: {
            label: {
                style: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
            },
        },
        color: (d) => {
            // Set color based on value
            if (d.platform === 'Shopee') {
                return '#EE4D2D';
            } else if (d.platform === 'Tiki') {
                return '#0b74e5';
            } else {
                return '#000083';
            }
        },
    };

    return (
        <Layout className={"search-results"}>
            <SearchHeading
                handleRefresh={handleRefresh}
            />
            <Layout className={"search-results-side"}>
                <Sidebar/>
                <Layout className={"search-results-content"}>
                    <Layout className={"search-results-stat"}>
                        <Row>
                            <Col span={12}>
                                <Typography
                                    style={{
                                        fontSize: 30
                                    }}
                                >
                                    So sánh giá bán trung bình các sản phẩm của từ khóa:
                                </Typography>
                            </Col>
                            <Col span={12}
                                 style={{
                                     display: "flex",
                                     justifyContent: "flex-start"
                                 }}
                            >
                                <Typography
                                    style={{
                                        fontSize: 30,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {keyword}
                                </Typography>
                            </Col>
                        </Row>
                    </Layout>
                    <Layout className={"search-results"}>
                        <Bar
                            style={{
                                paddingLeft: 100,
                                paddingRight: 100,
                            }}
                            {...config}
                        />
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default PriceComparison;