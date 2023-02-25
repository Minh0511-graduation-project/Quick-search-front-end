import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import Test from "./pages/test/test";
import SearchResults from "./pages/search results/search-results";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/search-results" element={<SearchResults/>}/>
        </Routes>
    );
}

export default App;
