import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Link from "@mui/material/Link";

export default function Products() {
  const { products } = require("../../Helpers/FakeData.js");
  // const [products, setProducts] = useState([]);

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
          <Card sx={{ margin: 2, maxWidth: 345 }} key={product.product_id}>
            <Link
              component={RouterLink}
              to={`/products/${product.product_id}`}
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
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}
