import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductInfo from "pages/ProductInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:productId' element={<ProductInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
