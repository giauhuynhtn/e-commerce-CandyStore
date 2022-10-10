import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductInfo from "pages/ProductInfo";
import ProductsDashboard from "pages/ProductsDashboard";
import Login from "pages/Login";
import Checkout from "pages/Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/product/:productId' element={<ProductInfo />} />
        <Route path='/products/dashboard' element={<ProductsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
