import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ProductDetails from "./Views/Products/ProductDetails";
import Products from "./Views/Products/Products";
import Layout from "./Components/Layout";
import Categories from "./Views/Categories/Categories";
import CategoryDetails from "./Views/Categories/CategoryDetails";

import Cart from "./Views/Cart/Cart";
import { Typography } from "@mui/material";
import Login from "./Views/User/Login";
import SignUp from "./Views/User/SignUp";
import UserProvider from "./Context/UserContext";
import RequireAuth from "./Helpers/RequireAuth";

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <Routes>
            <Route 
			path="/" 
			element={
				<RequireAuth withAuth={false}>
				<Homepage />
				</RequireAuth>
				}></Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/passwordReset" element={<UnderConstruction />} />

            <Route path="/profile" element={<UnderConstruction />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/to-order" element={<UnderConstruction />} />
            <Route path="/orders" element={<UnderConstruction />} />
            <Route path="/orders/:id" element={<UnderConstruction />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}

const UnderConstruction = () => {
  return (
    <>
      <p>Site en construction, revenez plus tard.</p>
      <a href="/">Retour à l'accueil</a>
    </>
  );
};

const NotFound = () => {
  return <>Page not found !</>;
};

const Homepage = () => {
  return (
    <>
      <Typography sx={{ textAlign: "center", fontSize: "1.2em" }}>
        Bienvenue sur le site de <strong>Recycle-RAT</strong>,<br />
        le paRATdis des écolos à petits budgets !
      </Typography>

      <Categories />
      <Products />
    </>
  );
};

export default App;
