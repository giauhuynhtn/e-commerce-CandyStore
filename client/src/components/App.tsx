import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Shopping from "pages/Shopping";
import ProductInfo from "pages/ProductInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shopping' element={<Shopping />} />
        <Route path='/:productId' element={<ProductInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
