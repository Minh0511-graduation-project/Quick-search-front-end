import {Button, Col, Layout, Row, Select, Table, Typography} from "antd";
import "./tikiTopSearch.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar/sidebar";
import tikiService from "../../services/tiki.service";
import {categoryData} from "../../components/categorySelection/tikiTopSearchData";

const TikiTopSearch = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [keywordData, setKeywordData] = useState();
    const [category, setCategory] = useState();
    const [topDisplay, setTopDisplay] = useState(10);
    const [selectedButton, setSelectedButton] = useState(10);

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleTopNumberChange = (value) => {
        setSelectedButton(value)
        setTopDisplay(value)
    }

    const getTikiTopSearchByCategory = () => {
        tikiService.getTikiTopSearchByCategory(parseInt(category), topDisplay).then((response) => {
            const newDataArray = []
            let i = 0
            for (const keywordData of response) {
                i++
                const newData = {
                    key: i,
                    keyword: keywordData.keyword,
                    total_search_volume: keywordData.total_search_volume,
                    click_rate: (keywordData.click_rate * 100).toLocaleString('en-US', {minimumFractionDigits: 2}) + '%',
                    total_click: keywordData.total_clicks
                }
                newDataArray.push(newData)
            }
            setKeywordData(newDataArray)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTikiTopSearchByCategory();
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage, category, topDisplay]);

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
        {
            title: 'Số lần nhấp chuột',
            dataIndex: 'total_click',
            sorter: {
                compare: (a, b) => a.total_click - b.total_click,
                multiple: 2,
            },
        },
        {
            title: 'Tỉ lệ nhấp chuột',
            dataIndex: 'click_rate',
            sorter: {
                compare: (a, b) => a.click_rate - b.click_rate,
                multiple: 1,
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
                            <div>
                                <Row >
                                    <Col span={3}>
                                        <Typography
                                            style={{
                                                fontSize: 22,
                                            }}
                                        >
                                            Chọn danh mục
                                        </Typography>
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            placeholder="Chọn danh mục ngành hàng"
                                            style={{
                                                paddingLeft: 20,
                                                width: 300,
                                            }}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            onChange={handleCategoryChange}
                                            options={categoryData}
                                        />
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
                            </div>
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

export default TikiTopSearch;