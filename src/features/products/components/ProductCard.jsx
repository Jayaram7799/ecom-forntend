import { memo, useContext } from "react";
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
        width: "100%",
        minWidth: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: { xs: "0 2px 5px rgba(0,0,0,0.06)", sm: 3 },
        },
      }}
    >
      <Link
        to={`/products/${id}`}
        aria-label={`View ${name}`}
        style={{
          color: "inherit",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          loading="lazy"
          sx={{
            display: "block",
            width: "100%",
            height: { xs: 120, sm: 175, md: 210 },
            objectFit: "contain",
            boxSizing: "border-box",
            p: { xs: 0.5, sm: 1 },
            bgcolor: "#f8f8f8",
          }}
        />

        <CardContent
          sx={{
            p: { xs: 1, sm: 1.75 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            "&:last-child": {
              pb: { xs: 1, sm: 1.75 },
            },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.9rem" },
              fontWeight: 600,
              lineHeight: 1.4,
              height: { xs: "2.8em", sm: "2.8em" },
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflowWrap: "anywhere",
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              pt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontWeight: 700,
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              ₹{Number(price).toLocaleString("en-IN")}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.3,
                px: 0.6,
                py: 0.4,
                flexShrink: 0,
                borderRadius: 1,
                bgcolor: "#1976d2",
                color: "#fff",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.75rem" },
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {rating}
              </Typography>

              <FaStar size={10} />
            </Box>
          </Box>
        </CardContent>
      </Link>

      <Box
        sx={{
          p: { xs: 1, sm: 1.5 },
          pt: 0,
          mt: "auto",
        }}
      >
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
