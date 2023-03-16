import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import SearchResults from "./pages/searchResults/searchResults";
require("dotenv").config()

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search-results" element={<SearchResults/>}/>
        </Routes>
    );
}

export default App;
