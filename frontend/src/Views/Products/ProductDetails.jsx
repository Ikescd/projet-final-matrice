import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Modal from "@mui/material/Modal";

export default function ProductDetails() {
  const { products } = require("../../Helpers/FakeData.js");

  const { id } = useParams();
  const product = products[id - 1];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 150,
    bgcolor: "#fff",
    border: "1px solid #117A5D",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // boxShadow: 24,
    p: 4,
  };

  const styleModalButton = {
    m: 1,
    bgcolor: "#117A5D",
    ":hover": {
      bgcolor: "#fff",
      color: "#117A5D",
      border: "1px solid #117A5D",
    },
  };

  function addProductToCart(event) {
    event.preventDefault();
    handleOpen();
    console.log(event.target.quantityNumber.value);
    //TODO : gérer l'ajout au panier
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={(event) => {
          addProductToCart(event);
        }}
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ mx: 2 }}>
          <Link
            component={RouterLink}
            to={"/"}
            underline="none"
            color="text.primary"
          >
            <Grid container direction="row" alignItems="center">
              <Grid sx={{ mr: 2 }}>
                <ArrowCircleLeftIcon />
              </Grid>
              <Grid>
                <Typography>Retour à l'accueil</Typography>
              </Grid>
            </Grid>
          </Link>

          <img
            src={product.picture}
            alt={product.name}
            style={{
              height: "auto",
              width: "340px",
              marginRight: "5px",
            }}
          />
        </Box>

        <Box sx={{ mx: 2 }}>
          <Typography variant="h6" sx={{ my: 1, pt: 3 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ my: 1 }}>
            {(product.price / 100).toFixed(2)} €
          </Typography>

          <Typography sx={{ minWidth: 300, maxWidth: 500 }}>
            {product.description}
          </Typography>
          <TextField
            id="quantityNumber"
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

          <Button type="submit" variant="contained" sx={{ my: 1, mx: 3 }}>
            Ajouter au panier
          </Button>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Bien joué!
            </Typography>
            <Typography id="modal-modal-description">
              {product.name} ajouté au panier
            </Typography>
          </Box>
          <Box>
            <Link component={RouterLink} to={"/products"} underline="none">
              <Button sx={styleModalButton} variant="contained">
                Continuer mes achats
              </Button>
            </Link>

            <Link component={RouterLink} to={"/cart"} underline="none">
              <Button sx={styleModalButton} variant="contained">
                Voir mon panier
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
