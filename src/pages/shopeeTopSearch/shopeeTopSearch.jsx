import {Layout, Table} from "antd";
import "./shopeeTopSearch.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar/sidebar";
import shopeeService from "../../services/shopee.service";

const ShopeeTopSearch = () => {
    const [refreshPage, setRefreshPage] = useState(false);
    const [keywordData, setKeywordData] = useState();

    const handleRefresh = () => {
        setRefreshPage((current) => !current);
    };

    const getShopeeTopSearch = () => {
        shopeeService.getShopeeTopSearch().then((response) => {
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
                            <div className={"tiki-top-search"}>
                                Top 10 từ khóa được tìm kiếm nhiều nhất shopee
                            </div>
                        </Layout>
                        <Layout className={"tiki-top-search-table"}>
                            <Table
                                columns={columns}
                                dataSource={keywordData}
                            />
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default ShopeeTopSearch;