import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductInfo from "pages/ProductInfo";
import ProductsDashboard from "pages/ProductsDashboard";
import Login from "pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/product/:productId' element={<ProductInfo />} />
        <Route path='/products/dashboard' element={<ProductsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
