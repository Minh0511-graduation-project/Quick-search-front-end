import {Col, Layout, Row, Typography} from "antd";
import "./wordSearchCount.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import TikiService from "../../services/tiki.service";
import Sidebar from "../../components/sidebar/sidebar";
import ShopeeService from "../../services/shopee.service";
import LazadaService from "../../services/lazada.service";
import {Bar} from '@ant-design/plots';

const WordSearchCount = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [tikiKeywordCount, setTikiKeywordCount] = useState();
    const [shopeeKeywordCount, setShopeeKeywordCount] = useState();
    const [lazadaKeywordCount, setLazadaKeywordCount] = useState();
    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const keyword = localStorage.getItem("searchValue").toLowerCase();

    const getTikiKeywordCount = () => {
        TikiService.getTikiKeywordCount(keyword).then((response) => {
            if (response != null) {
                console.log(response[0])
                setTikiKeywordCount(response[0].count)
            } else {
                setTikiKeywordCount(0)
            }
        })
    }

    const getShopeeKeywordCount = () => {
        ShopeeService.getShopeeKeywordCount(keyword).then((response) => {
            if (response != null) {
                console.log(response[0])
                setShopeeKeywordCount(response[0].count)
            } else {
                setShopeeKeywordCount(0)
            }
        })
    }

    const getLazadaKeywordCount = () => {
        LazadaService.getLazadaKeywordCount(keyword).then((response) => {
            if (response != null) {
                console.log(response[0])
                setLazadaKeywordCount(response[0].count)
            } else {
                setLazadaKeywordCount(0)
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTikiKeywordCount();
            await getShopeeKeywordCount();
            await getLazadaKeywordCount();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage]);

    console.log(tikiKeywordCount)
    console.log(shopeeKeywordCount)
    console.log(lazadaKeywordCount)


    const data = [
        {
            platform: 'Tiki',
            value: tikiKeywordCount,
        },
        {
            platform: 'Shopee',
            value: shopeeKeywordCount,
        },
        {
            platform: 'Lazada',
            value: lazadaKeywordCount,
        },
    ];

    const config = {
        data,
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
                            <Col span={9}>
                                <Typography
                                    style={{
                                        fontSize: 30
                                    }}
                                >
                                    Thống kê số lượt tìm kiếm cho từ khóa:
                                </Typography>
                            </Col>
                            <Col span={15}
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

export default WordSearchCount;