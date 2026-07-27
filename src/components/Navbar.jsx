import { useContext, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ContainerBox from "./ContainerBox";

import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppLink from "./AppLink";
import CartContext from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { cartList } = useContext(CartContext);
  const cartCount = cartList.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAnchorEl(null);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDrawer(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 0, md: 6 },

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1f5f3a",
        color: "#fff",
      }}
    >
      <ContainerBox
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        {/* 📱 Mobile Menu */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
          onClick={() => setOpenDrawer(true)}
        >
          <FaBars />
        </IconButton>

        {/* Logo */}
        <Typography variant="h6" fontWeight="bold">
          CCollection
        </Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          <AppLink to="/" sx={{ color: "#fff" }}>
            Home
          </AppLink>
          <AppLink to="/products" sx={{ color: "#fff" }}>
            Products
          </AppLink>
          <AppLink to="/about" sx={{ color: "#fff" }}>
            About
          </AppLink>
          <AppLink to="/contact" sx={{ color: "#fff" }}>
            Contact
          </AppLink>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/*  Cart */}
          <AppLink to="/cart">
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={cartCount} color="error">
                <FaShoppingCart />
              </Badge>
            </IconButton>
          </AppLink>

          {/*  User */}
          {token && (
            <>
              <IconButton
                sx={{ color: "#fff" }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <FaUser />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    setAnchorEl(null);
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>

        {/* 📱 Drawer */}
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              <ListItemButton onClick={() => handleNavigate("/")}>
                <ListItemText primary="Home" />
              </ListItemButton>

              <ListItemButton onClick={() => handleNavigate("/products")}>
                <ListItemText primary="Products" />
              </ListItemButton>

              <ListItemButton onClick={() => handleNavigate("/about")}>
                <ListItemText primary="About" />
              </ListItemButton>

              <ListItemButton onClick={() => handleNavigate("/contact")}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </ContainerBox>
    </Box>
  );
};

export default Navbar;
