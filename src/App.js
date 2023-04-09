import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TopNavbar from "./components/TopNavbar";
import AddProperty from "./pages/AddProperty";

const App = () => {
    return (
      <BrowserRouter>
            <TopNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-property" element={<AddProperty />} />
            </Routes>
            </ BrowserRouter>
    );
};

export default App;
