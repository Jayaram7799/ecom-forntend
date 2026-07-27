import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categoryData = [
    {
      id: 1,
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
      category: "Fashion",
    },
    {
      id: 2,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800",
      category: "Jewelry",
    },
    {
      id: 4,
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      category: "Men",
    },
  ];

  return (
    <Box py={8}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" align="center" mb={1}>
          Shop By Category
        </Typography>

        <Typography align="center" color="text.secondary" mb={5}>
          Explore our popular collections
        </Typography>

        <Grid container spacing={4}>
          {categoryData.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardActionArea
                  onClick={() =>
                    navigate(`/products?category=${item.category}`)
                  }
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt={item.name}
                  />

                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {item.name}
                    </Typography>

                    <Typography color="primary">Explore →</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategorySection;
