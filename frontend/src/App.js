import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ProductDetails from './Views/Products/ProductDetails';
import Products from './Views/Products/Products';
import Layout from './Components/Layout';
import Categories from './Views/Categories/Categories';
import CategoryDetails from './Views/Categories/CategoryDetails';

import Cart from './Views/Cart/Cart';
import { Typography } from '@mui/material';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<Homepage />} />

					<Route path='/login' element={<UnderConstruction />} />
					<Route path='/signup' element={<UnderConstruction />} />
					<Route path='/passwordReset' element={<UnderConstruction />} />

					<Route path='/profile' element={<UnderConstruction />} />

					<Route path='/products' element={<Products />} />
					<Route path='/products/:id' element={<ProductDetails />} />
					<Route path='/categories/:id' element={<CategoryDetails />} />

					<Route path='/cart' element={<Cart />} />
					<Route path='/to-order' element={<UnderConstruction />} />
					<Route path='/orders' element={<UnderConstruction />} />
					<Route path='/orders/:id' element={<UnderConstruction />} />

					<Route path='/404' element={<NotFound />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>
			</Layout>
		</Router>
	);
}

const UnderConstruction = () => {
	return (
		<>
			<p>Site en construction, revenez plus tard.</p>
			<a href='/'>Retour à l'accueil</a>
		</>
	);
};

const NotFound = () => {
	return <>Page not found !</>;
};

const Homepage = () => {
	return (
		<>
			<Typography sx={{ textAlign: 'center', fontSize: '1.2em' }}>
				Bienvenue sur le site de <strong>Recycle-RAT</strong>,<br />
				le paRATdis des écolos à petits budgets !
			</Typography>

			<Categories />
			<Products />
		</>
	);
};

export default App;
