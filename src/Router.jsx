import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Payment from './Pages/Payment/Payment';
import Cart from './Pages/Cart/Cart';
import SignUp from './Pages/Auth/SignUp/SignUp';
import SignIn from './Pages/Auth/SignIn/SignIn';
import Orders from './Pages/Orders/Orders';
import Landing from './Pages/Landing/Landing';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/auth" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />}/>
        
        </Routes> 
    </Router>
  )
}

export default Routing
