import {Button, Col, Layout, Row, Table, Typography} from "antd";
import "./shopeeTopSearch.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar/sidebar";
import shopeeService from "../../services/shopee.service";

const ShopeeTopSearch = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [keywordData, setKeywordData] = useState();
    const [topDisplay, setTopDisplay] = useState(10);
    const [selectedButton, setSelectedButton] = useState(10);

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const handleTopNumberChange = (value) => {
        setSelectedButton(value)
        setTopDisplay(value)
    }

    console.log(topDisplay)

    const getShopeeTopSearch = () => {
        shopeeService.getShopeeTopSearch(topDisplay).then((response) => {
            const newDataArray = []
            let i = 0
            for (const keywordData of response) {
                i++
                const newData = {
                    key: i,
                    keyword: keywordData.keyword,
                    total_search_volume: keywordData.count,
                }
                newDataArray.push(newData)
            }
            setKeywordData(newDataArray)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getShopeeTopSearch();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage, topDisplay]);

    const columns = [
        {
            title: 'Từ khóa',
            dataIndex: 'keyword',
        },
        {
            title: 'Lượt tìm kiếm',
            dataIndex: 'total_search_volume',
            sorter: {
                compare: (a, b) => a.total_search_volume - b.total_search_volume,
                multiple: 3,
            },
        },
    ];
    return (
        <Layout className={"search-results"}>
            <SearchHeading
                handleRefresh={handleRefresh}
            />
            <Layout className={"search-results-side"}>
                <Sidebar />
                <Layout className={"search-results-content"}>
                    <Layout>
                        <Layout className={"tiki-top-search-category"}>
                            <Row >
                                <Col span={9}>
                                    <Typography
                                        style={{
                                            fontSize: 22,
                                        }}
                                    >
                                        Top các từ khóa được tìm kiếm nhiều nhất shopee
                                    </Typography>
                                </Col>
                                <Col span={2}>
                                    <Button
                                        style={{
                                            width: "5.5vw",
                                            alignContent: "center",
                                        }}
                                        type={selectedButton === 10 ? "primary" : "default"}
                                        onClick={() => handleTopNumberChange(10)}
                                    >
                                        Top 10
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button
                                        style={{
                                            width: "5.5vw",
                                            alignContent: "center",
                                        }}
                                        type={selectedButton === 50 ? "primary" : "default"}
                                        onClick={() => handleTopNumberChange(50)}
                                    >
                                        Top 50
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button
                                        style={{
                                            width: "5.5vw",
                                            alignContent: "center",
                                        }}
                                        type={selectedButton === 100 ? "primary" : "default"}
                                        onClick={() => handleTopNumberChange(100)}
                                    >
                                        Top 100
                                    </Button>
                                </Col>
                            </Row>
                        </Layout>
                        <Layout className={"tiki-top-search-table"}>
                            <Table
                                style={{
                                    maxHeight: "75vh",
                                }}
                                columns={columns}
                                dataSource={keywordData}
                                sticky={true}
                            />
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default ShopeeTopSearch;