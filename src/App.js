import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import SearchResults from "./pages/searchResults/searchResults";
import WordSearchCount from "./pages/wordSearchCount/wordSearchCount";
import TikiTopSearch from "./pages/tikiTopSearch/tikiTopSearch";
require("dotenv").config()

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search-results">
                <Route path=":value">
                    <Route path="shop-products" element={<SearchResults/>} />
                    <Route path="keyword-search-statistic" element={<WordSearchCount />} />
                    <Route path="tiki-top-search" element={<TikiTopSearch />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
