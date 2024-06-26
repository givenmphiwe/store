import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductPage';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckoutPage';
import FinalCheckOut from './pages/FinalCheckOutPage';

const App = () => {
  return (
    <Router>
    
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/productSelected/:id" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/FinalCheckOut" element={<FinalCheckOut/>}/>
          {/* Add additional routes for other pages as needed */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
     
    </Router>
  );
};

export default App;
