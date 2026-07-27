import { useState, useMemo } from "react";

import Navbar from "../../../components/Navbar";

import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Drawer,
  Button,
  Pagination,
} from "@mui/material";

import { FaFilter } from "react-icons/fa";

import ProductCard from "../../products/components/ProductCard";

import useProducts from "../../../features/products/hooks/useProducts";

import Filters from "../../products/components/ProductFilter";

import SearchBar from "../../../components/SearchBar";

const Products = () => {
  const [filters, setFilters] = useState({
    categoryId: "",
    search: "",
  });

  const [page, setPage] = useState(0);

  const [size] = useState(10);

  const [openFilter, setOpenFilter] = useState(false);

  // Memoized query params
  const queryParams = useMemo(() => {
    return {
      categoryId: filters.categoryId || null,

      search: filters.search || null,

      page,
      size,
    };
  }, [filters.categoryId, filters.search, page, size]);

  const { products, totalPages, loading } = useProducts(queryParams);

  // Category handler
  const handleCategoryChange = (categoryId) => {
    setPage(0);

    setFilters((prev) => ({
      ...prev,
      categoryId,
    }));
  };

  // Search handler
  const handleSearch = (search) => {
    setPage(0);

    setFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          py: 3,
        }}
      >
        <Box sx={{ mx: "auto", px: 2 }}>
          {/* TOP BAR */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h5">All Products</Typography>

            {/* SEARCH BAR */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 400,
              }}
            >
              <SearchBar onSearch={handleSearch} />
            </Box>

            {/* MOBILE FILTER BUTTON */}
            <Button
              startIcon={<FaFilter />}
              variant="outlined"
              onClick={() => setOpenFilter(true)}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              Filters
            </Button>
          </Box>

          {/* MAIN CONTENT */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            {/* SIDEBAR FILTERS */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },

                width: 300,
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            >
              <Filters
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
              />
            </Box>

            {/* PRODUCTS SECTION */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",

                    height: "60vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : products.length === 0 ? (
                <Typography align="center">No products found</Typography>
              ) : (
                <>
                  {/* PRODUCT GRID */}
                  <Grid container spacing={3}>
                    {products.map((product) => (
                      <Grid
                        item="true"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product.id}
                      >
                        <ProductCard productData={product} />
                      </Grid>
                    ))}
                  </Grid>

                  {/* PAGINATION */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      mt: 4,
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page + 1}
                      color="primary"
                      onChange={(e, value) => setPage(value - 1)}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        anchor="left"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <Box
          sx={{
            width: 280,
            p: 2,
          }}
        >
          <Filters
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default Products;
