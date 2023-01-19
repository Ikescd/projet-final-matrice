import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function ProductDetails() {
  const { products } = require("../../Helpers/FakeData.js");

  const { id } = useParams();

  const product = products[id - 1];

  return (
    <>
      <Link
        component={RouterLink}
        to={"/"}
        underline="none"
        color="text.primary"
        sx={{ margin: 2 }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid>
            <ArrowCircleLeftIcon />
          </Grid>
          <Grid>
            <Typography>Retour à l'accueil</Typography>
          </Grid>
        </Grid>
      </Link>
      <Box component="form" sx={{ mx: 2 }}>
        <img
          src={product.picture}
          alt={product.name}
          style={{
            height: "auto",
            width: "300px",
          }}
        />
        <Typography variant="h6" sx={{ my: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ my: 1 }}>
          {(product.price / 100).toFixed(2)} €
        </Typography>

        <Typography sx={{ minWidth: 300, maxWidth: 800 }}>
          {product.description}
        </Typography>
        <TextField
          id="quantity-number"
          label="Quantité"
          type="number"
          size="small"
          defaultValue="1"
          inputProps={{ min: 1, max: product.quantityInStock }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ my: 1 }}
        />
        <br />
        <Button
          variant="contained"
          sx={{ my: 1 }}
          onClick={() => {
            alert("Voir mon panier/ Finaliser mes achats");
          }}
        >
          Ajouter au panier
        </Button>
      </Box>
    </>
  );
}
