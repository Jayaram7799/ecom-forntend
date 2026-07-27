import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

import Button from "../../../components/Button";
import CartContext from "../../../context/CartContext";

const ProductCard = ({ productData }) => {
  const { id, name, imageUrl, rating, price } = productData;

  const { addCartItem } = useContext(CartContext);

  return (
    <Card
      sx={{
        height: 420, // fixed height
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
      }}
    >
      <Link
        to={`/products/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          loading="lazy"
          sx={{
            height: 220,
            width: "100%",
            objectFit: "contain",
            backgroundColor: "#f8f8f8",
            p: 1,
          }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              minHeight: 48, // reserve space
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              ₹{price}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "#1e88e5",
                color: "#fff",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                minWidth: 55,
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {rating}
              </Typography>

              <FaStar size={12} />
            </Box>
          </Box>
        </CardContent>
      </Link>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          type="button"
          text="Add to Cart"
          fullWidth
          onClick={() => addCartItem(productData)}
        />
      </Box>
    </Card>
  );
};

export default memo(ProductCard);
