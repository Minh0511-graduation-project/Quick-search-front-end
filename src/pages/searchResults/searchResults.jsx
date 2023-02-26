import {Layout, Space} from "antd";
import "./searchResults.css";
import SearchHeading from "../../components/searchHeading/searchHeading";
import ProductCard from "../../components/productCard/productCard";

const SearchResults = () => {
    const products = [
        {image_url: "bit.ly/3KAnCcx", name: "Tai nghe 1", price: "100000đ"},
        {image_url: "bit.ly/3KAnCcx", name: "Tai nghe 2", price: "200000đ"},
        {image_url: "bit.ly/3KAnCcx", name: "Tai nghe 3", price: "300000đ"},
        {image_url: "bit.ly/3KAnCcx", name: "Tai nghe 4", price: "400000đ"},
        {image_url: "bit.ly/3KAnCcx", name: "Tai nghe 5", price: "500000đ"},
    ]
    return (
        <Layout className={"search-results"}>
            <SearchHeading/>
            <Space>
                {products?.map((product) => (
                    <ProductCard
                        imageUrl={product.image_url}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </Space>
        </Layout>
    );
};

export default SearchResults;