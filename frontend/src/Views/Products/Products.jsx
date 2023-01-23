import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Link from "@mui/material/Link";

export default function Products() {
  // const { products } = require("../../Helpers/FakeData.js");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result);
      })
      .catch((err) => console.error(err));
  }, []);

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
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
              <CardMedia component="img" height="140" image={product.picture} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="text.primary"
                  component="div"
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.primary">
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
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
