import React, { useState, useEffect } from 'react';

function Cart() {
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart ? JSON.parse(localCart) : [];
	});
	const [productDetails, setProductDetails] = useState([]);
	let fetchedProduct = new Set();

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		const fetchProducts = async () => {
			for (const product of cart) {
				if (!fetchedProduct.has(product.productID)) {
					fetchedProduct.add(product.productID);
					const response = await fetch(`http://localhost:3000/api/products/${product.productID}`);
					const data = await response.json();
					setProductDetails((prevProducts) => [...prevProducts, data]);
				}
			}
		};
		fetchProducts();
	}, [cart]);

	const updateProduct = (product, updatedQuantity) => {
		setCart((prevCart) =>
			prevCart.map((prod) => {
				console.log(prod);
				if (prod.productID === product) {
					return { ...prod, quantity: updatedQuantity };
				}
				return prod;
			})
		);
	};

	const removeProduct = (product) => {
		setProductDetails((prevProducts) => prevProducts.filter((prod) => prod.id !== product));
		setCart(cart.filter((prod) => prod.product !== product));
	};

	return (
		<div>
			<h2>Panier</h2>
			{cart.map((el) => {
				console.log(cart);
				let productInCart = {};

				productDetails.map((productEL) => {
					if (productEL[0].id === el.productID) productInCart = productEL[0];
				});

				const total = el.quantity * productInCart.price;

				return (
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<img src={productInCart.picture} alt={productInCart.name} style={{ width: 150 }} />
						<div>
							<p>{productInCart.name}</p>
							<p>{(productInCart.price / 100).toFixed(2)} €</p>
						</div>
						<div style={{ display: 'flex' }}>
							<button onClick={() => updateProduct(productInCart.id, el.quantity + 1)}>+</button>
							<p>{el.quantity}</p>
							<button onClick={() => updateProduct(productInCart.id, el.quantity - 1)}>-</button>
						</div>
						<div>{(total / 100).toFixed(2)} €</div>
					</div>
				);
			})}
		</div>
	);
}

export default Cart;
