import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import logoWithText from "../Assets/logoWithText.png";

import { Box, Link, Typography } from "@mui/material";

const TopSection = () => {
  const [topProduct, setTopProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        Math.floor(Math.random() * data.length);

        setTopProduct(data[Math.floor(Math.random() * data.length)]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#ECF0C6",
          margin: "10px",
          padding: "30px",
          borderRadius: "10px",
          minWidth: "55%",
        }}
      >
        <img src={logoWithText} style={{ height: 150 }} />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.2em",
            color: "#117A5D",
            fontFamily: "Time new roman",
            mx: 2,
          }}
        >
          Bienvenue sur le site de <strong>Recycle-RAT</strong>,<br />
          le paRATdis des écolos à petits budgets !
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "10px",
          maxHeight: "400px",
        }}
      >
        <Link
          component={RouterLink}
          to={`/products/${topProduct.id}`}
          underline="none"
        >
          <img
            src={topProduct.picture}
            style={{
                            height: "200px",
              width: "auto",
              border: "1px solid #117A5D",
              borderRadius: 5,
              objectFit:"cover"
            }}
          />
          <Typography
            sx={{
              fontSize: "1em",
              color: "#117A5D",
              fontFamily: "Time new roman",
            }}
          >
            <strong>{topProduct.name}</strong>
          </Typography>
          <Typography sx={{ color: "#117A5D", fontFamily: "Time new roman" }}>
            {(topProduct.price / 100).toFixed(2)} €
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default TopSection;
