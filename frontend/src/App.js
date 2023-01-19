import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ProductDetails from './Views/Products/ProductDetails';
import Products from './Views/Products/Products';

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

					<Route path='/cart' element={<UnderConstruction />} />
					<Route path='/orders' element={<UnderConstruction />} />
					<Route path='/orders/:id' element={<UnderConstruction />} />

					<Route path='/404' element={<NotFound />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>
			</Layout>
		</Router>
	);
}

const Layout = (props) => {
	return <div>{props.children}</div>;
};

const UnderConstruction = () => {
	return <>Site en construction, revenez plus tard.</>;
};

const NotFound = () => {
	return <>Page not found !</>;
};

const Homepage = () => {
	return <>Bienvenue sur le site de Recycle-RAT</>;
};
export default App;
