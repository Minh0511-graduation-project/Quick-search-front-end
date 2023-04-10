import {Layout, Table} from "antd";
import "./tikiTopSearch.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar/sidebar";
import tikiService from "../../services/tiki.service";

const TikiTopSearch = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [keywordData, setKeywordData] = useState();

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const getTikiTopSearchByCategory = () => {
        tikiService.getTikiTopSearchByCategory().then((response) => {
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
    }, [refreshPage]);

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
                    <Layout className={"search-results-stat"}>
                        <Table
                            columns={columns}
                            dataSource={keywordData}
                            style={{
                                paddingLeft: 100,
                                paddingRight: 200
                            }}
                        />
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default TikiTopSearch;