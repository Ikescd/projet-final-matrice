import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

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
    p: 4,
  };

  const styleButton = {
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
        <Box sx={{ mx: 2, color: "#117A5D" }}>
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
                <Typography
                  sx={{ color: "#117A5D", fontFamily: "Time new roman" }}
                >
                  Retour à l'accueil
                </Typography>
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
              borderRadius: "5px",
              border: "1px solid #117A5D",
            }}
          />
        </Box>

        <Box sx={{ mx: 2, color: "#117A5D" }}>
          <Typography
            variant="h6"
            sx={{ my: 1, pt: 3, fontFamily: "Time new roman" }}
          >
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ my: 1, fontFamily: "Time new roman" }}>
            {(product.price / 100).toFixed(2)} €
          </Typography>

          <Typography
            sx={{ minWidth: 300, maxWidth: 500, fontFamily: "Time new roman" }}
          >
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
            sx={{
              my: 1,
              input: { color: "#117A5D", fontFamily: "Time new roman" },
              label: { color: "#117A5D", fontFamily: "Time new roman" },
              fieldset: { borderColor: "#117A5D" },
            }}
          />

          <Button sx={styleButton} type="submit" variant="contained">
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
              <Button sx={styleButton} variant="contained">
                Continuer mes achats
              </Button>
            </Link>

            <Link component={RouterLink} to={"/cart"} underline="none">
              <Button sx={styleButton} variant="contained">
                Voir mon panier
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
