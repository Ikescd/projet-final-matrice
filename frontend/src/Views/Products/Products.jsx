import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  TablePagination,
  Typography,
} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: "#117A5D", fontFamily: "Time new roman", margin: 2 }}
      >
        Nos produits
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Card sx={{ margin: 2, width: 345 }} key={product.id}>
            <Link
              component={RouterLink}
              to={`/products/${product.id}`}
              underline="none"
            >
              <CardMedia
                component="img"
                image={product.picture}
                sx={{ height: "140px" }}
              />
              <CardContent
                sx={{
                  bgcolor: "#ECF0C6",
                  minHeight: "135px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Time new roman",
                    color: "#117A5D",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Time new roman",
                    color: "#117A5D",
                  }}
                >
                  {(product.price / 100).toFixed(2)} €
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
      <TablePagination
        sx={{ mx: "auto" }}
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
