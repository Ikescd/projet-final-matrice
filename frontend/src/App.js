import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ProductDetails from './Views/Products/ProductDetails';
import Products from './Views/Products/Products';
import Layout from './Components/Layout';
import Categories from './Views/Categories/Categories';
import CategoryDetails from './Views/Categories/CategoryDetails';
import TopSection from './Views/TopSection';

import Cart from './Views/Cart/Cart';
import { Box } from '@mui/material';
import Login from './Views/User/Login';
import SignUp from './Views/User/SignUp';
import UserProvider from './Context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/passwordReset' element={<NotFound />} />

            <Route path='/profile' element={<NotFound />} />

            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/categories/:id' element={<CategoryDetails />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/to-order' element={<NotFound />} />
            <Route path='/orders' element={<NotFound />} />
            <Route path='/orders/:id' element={<NotFound />} />

            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}


const NotFound = () => {
  return <>Page not found !</>;
};

const Homepage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', margin: 'auto' }}>
      <TopSection />
      <Categories />
      <Products />
    </Box>
  );
};

export default App;
