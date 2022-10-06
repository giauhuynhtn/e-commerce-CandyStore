import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";

type ProductObj = {
  product: Product;
};

function ProductCard({ product }: ProductObj) {
  let navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 280, height: 450 }}>
      <CardMedia
        component='img'
        height='260'
        image={product.img}
        alt={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          component='div'
          sx={{ fontSize: "12px", marginTop: "20px", height: 40 }}>
          {product.name}
        </Typography>
        <Typography
          component='div'
          sx={{ fontSize: "14px", marginTop: "20px" }}>
          {product.price} eur/pack
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            navigate(`/product/${product._id}/`);
          }}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
