import { HashRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import AddProperty from "./pages/AddProperty";
import Home from "./pages/Home";

const App = () => {
    return (
        <HashRouter>
            <TopNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-property" element={<AddProperty />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
