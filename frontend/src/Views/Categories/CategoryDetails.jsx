import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  TablePagination,
  Typography,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function CategoryDetails() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState();

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/category/${params.id}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProductsByCategory(data);
      })
      .catch((err) => console.error(err));

    fetch(`http://localhost:3000/api/category/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryName(data[0].name);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyCategory = (
    <Typography
      variant="h5"
      sx={{
        fontFamily: "Time new roman",
        color: "#117A5D",
      }}
    >
      Il n’y a pas encore de produit disponible dans cette catégorie, revenez
      plus tard.
    </Typography>
  );

  const listOfProducts = productsByCategory.map((product) => (
    <Card sx={{ margin: 2, width: 345 }} key={product.id}>
      <Link
        component={RouterLink}
        to={`/products/${product.id}`}
        underline="none"
      >
        <CardMedia
          component="img"
          sx={{ height: "140px" }}
          image={product.picture}
        />
        <CardContent
          sx={{
            bgcolor: "#ECF0C6",
            minHeight: "95px",
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
  ));

  return (
    <>
      {categoryName === undefined &&
        <Typography sx={{ margin: "auto" }}>Cette catégorie n'existe pas, retournez à <RouterLink to="/">l'accueil</RouterLink> !</Typography>
      }
      {categoryName !== undefined && <Box>
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
              <Typography sx={{ color: "#117A5D", fontFamily: "Time new roman" }}>
                Retour à l'accueil
              </Typography>
            </Grid>
          </Grid>
        </Link>
        <Typography
          variant="h4"
          sx={{ color: "#117A5D", fontFamily: "Time new roman", margin: 2 }}
        >
          Nos {categoryName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {productsByCategory === false ? emptyCategory : listOfProducts}
        </Box>
        <TablePagination
          sx={{ mx: "auto" }}
          component="div"
          count={productsByCategory.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>}
    </>
  );
}
