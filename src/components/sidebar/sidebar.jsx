import {useLocation, useNavigate} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import "./sidebar.css"

const Sidebar = () => {
    const navigate = useNavigate()
    let value = localStorage.getItem("searchValue")
    const location = useLocation()
    const link1 = `/search-results/${encodeURIComponent(value)}/shop-products`
    const link2 = `/search-results/${encodeURIComponent(value)}/keyword-search-statistic`

    return(
        <Sider width={330}
               style={{
                    background: "#4285F4",
               }}
        >
            <Menu
                mode={"inline"} theme={"dark"}
                selectedKeys={[location.pathname]}>
                <Menu.Item
                    className={"menu-item"}
                    key={link1}
                    onClick={() => navigate(`/search-results/${value}/shop-products`)}
                >
                    Sản phẩm
                </Menu.Item>
                <Menu.Item
                    className={"menu-item"}
                    key={link2}
                    onClick={() => navigate(`/search-results/${value}/keyword-search-statistic`)}
                >
                    Lượt tìm kiếm
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar;