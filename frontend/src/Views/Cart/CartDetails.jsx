import {
  Box as MUIBox,
  Button as MUIButton,
  TableCell as MUITCell,
  TableRow as MUITRow,
  Typography as MUITypo,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CartDetails(props) {
  const [product, setProduct] = useState();
  const { id, productCart, onUpdate, onRemove } = props;

  useEffect(() => {
    fetch('http://localhost:3000/api/products/' + id)
      .then((res) => res.json())
      .then((data) => setProduct(data[0]));
  }, []);

  return (
    product !== undefined && (
      <MUITRow>
        <MUITCell>
          <img src={product.picture} alt={product.name} style={{ width: 150 }} />
        </MUITCell>
        <MUITCell>
          <MUITypo>{product.name}</MUITypo>
          <MUITypo>Prix à l'unité : {(product.price / 100).toFixed(2)} €</MUITypo>
        </MUITCell>

        <MUITCell sx={{ textAlign: 'center' }}>
          <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
            <MUIButton
              variant='outlined'
              size='small'
              sx={{
                color: '#117A5D',
                borderColor: '#117A5D',
                ':hover': {
                  backgroundColor: '#117A5D',
                  color: 'white',
                },
              }}
              onClick={() => onUpdate(productCart.product_id, productCart.quantity + 1)}
              disabled={productCart.quantity >= product.quantityInStock}
            >
              +
            </MUIButton>
            <MUITypo sx={{ padding: '5px' }}>{productCart.quantity}</MUITypo>
            <MUIButton
              variant='outlined'
              size='small'
              sx={{
                color: '#117A5D',
                borderColor: '#117A5D',
                ':hover': {
                  backgroundColor: '#117A5D',
                  color: 'white',
                },
              }}
              onClick={() => onUpdate(productCart.product_id, productCart.quantity - 1)}
              disabled={productCart.quantity <= 1}
            >
              -
            </MUIButton>
          </MUIBox>
          <MUIButton onClick={() => onRemove(productCart.product_id)} sx={{ color: '#117A5D' }}>
            Supprimer
          </MUIButton>
        </MUITCell>

        <MUITCell sx={{ textAlign: 'right' }}>
          <MUITypo>{((product.price * productCart.quantity) / 100).toFixed(2)} €</MUITypo>
        </MUITCell>
      </MUITRow>
    )
  );
}
