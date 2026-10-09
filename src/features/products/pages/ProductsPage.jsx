import { useState, useMemo, useCallback } from "react";

import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Drawer,
  Button,
  Pagination,
  Paper,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";

import { FaFilter } from "react-icons/fa";
import { Close } from "@mui/icons-material";

import Navbar from "../../../components/Navbar";
import SearchBar from "../../../components/SearchBar";

import ProductCard from "../../products/components/ProductCard";
import Filters from "../../products/components/ProductFilter";

import useProducts from "../../../features/products/hooks/useProducts";

const Products = () => {
  const [filters, setFilters] = useState({
    categoryId: "",
    search: "",
  });

  const [page, setPage] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);

  const size = 10;

  const queryParams = useMemo(
    () => ({
      categoryId: filters.categoryId || null,
      search: filters.search.trim() || null,
      page,
      size,
    }),
    [filters.categoryId, filters.search, page],
  );

  const { products = [], totalPages = 0, loading } = useProducts(queryParams);

  const handleCategoryChange = useCallback((categoryId) => {
    setPage(0);

    setFilters((prev) => ({
      ...prev,
      categoryId,
    }));
  }, []);

  const handleSearch = useCallback((search) => {
    setPage(0);

    setFilters((prev) => ({
      ...prev,
      search,
    }));
  }, []);

  const handlePageChange = (_, value) => {
    setPage(value - 1);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const filterContent = (
    <Box sx={{ p: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight={700}>
          Filters
        </Typography>

        <IconButton
          onClick={handleCloseFilter}
          aria-label="Close filters"
          size="small"
        >
          <Close />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Filters
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />
    </Box>
  );

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#f5f6f8",
          minHeight: "100vh",
          py: { xs: 2, sm: 3 },
          overflowX: "clip",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 1.5, sm: 3 },
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* PAGE HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.15rem", sm: "1.75rem" },
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              All Products
            </Typography>

            <Button
              variant="outlined"
              startIcon={<FaFilter />}
              onClick={() => setOpenFilter(true)}
              aria-label="Open product filters"
              sx={{
                display: { xs: "inline-flex", md: "none" },
                minWidth: 0,
                minHeight: 36,
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                fontSize: "0.8rem",
                textTransform: "none",
                flexShrink: 0,
              }}
            >
              Filters
            </Button>
          </Box>

          {/* SEARCH */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: 480 },
              mb: { xs: 2, sm: 3 },
            }}
          >
            <SearchBar onSearch={handleSearch} />
          </Box>

          {/* MAIN LAYOUT */}
          <Stack direction="row" alignItems="flex-start" spacing={{ md: 3 }}>
            {/* DESKTOP FILTER SIDEBAR */}
            <Paper
              elevation={0}
              sx={{
                display: { xs: "none", md: "block" },
                width: 250,
                flexShrink: 0,
                p: 2,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Filters
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Filters
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
              />
            </Paper>

            {/* PRODUCTS SECTION */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "40vh",
                  }}
                >
                  <CircularProgress aria-label="Loading products" />
                </Box>
              ) : products.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 5 },
                    textAlign: "center",
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    No products found
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Try another search term or select a different category.
                  </Typography>
                </Paper>
              ) : (
                <>
                  {/* RESPONSIVE PRODUCT GRID */}

                  {/* RESPONSIVE PRODUCT GRID */}
                  <Grid
                    container
                    columns={12}
                    columnSpacing={{ xs: 1.5, sm: 2, md: 2.5 }}
                    rowSpacing={{ xs: 1.5, sm: 2.5 }}
                    alignItems="stretch"
                    sx={{
                      width: "100%",
                      m: 0,
                    }}
                  >
                    {products.map((product) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={4}
                        lg={3}
                        key={product.id}
                        sx={{
                          minWidth: 0,
                          display: "flex",
                        }}
                      >
                        <ProductCard productData={product} />
                      </Grid>
                    ))}
                  </Grid>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        overflowX: "auto",
                        py: 3,
                        mt: 1,
                      }}
                    >
                      <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handlePageChange}
                        color="primary"
                        size="medium"
                        siblingCount={0}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: {
            width: { xs: "85vw", sm: 320 },
            maxWidth: 360,
          },
        }}
      >
        {filterContent}
      </Drawer>
    </>
  );
};

export default Products;
