import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import CartContext from "./context/CartContext";

import {
  getCartApi,
  addToCartApi,
  incrementCartItemApi,
  decrementCartItemApi,
  removeCartItemApi,
  clearCartApi,
  removePurchasedItemsApi,
} from "./features/cart/services/cartService";

function App() {
  const [cartList, setCartList] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCartState = (cart) => {
    setCartList(cart?.items || []);
    setTotalItems(cart?.totalItems || 0);
    setTotalPrice(cart?.totalPrice || 0);
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      updateCartState({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
      return;
    }

    try {
      const res = await getCartApi();

      updateCartState(res.data.data);
    } catch (err) {
      console.error(err);

      updateCartState({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addCartItem = async (product) => {
    try {
      const res = await addToCartApi(product.id, 1);

      updateCartState(res.data.data);

      toast.success(res.data.message, {
        autoClose: 500,
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to add item");
    }
  };

  const incrementCartItemQuantity = async (productId) => {
    try {
      const res = await incrementCartItemApi(productId);

      updateCartState(res.data.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to increase quantity");
    }
  };

  const decrementCartItemQuantity = async (productId) => {
    try {
      const res = await decrementCartItemApi(productId);

      updateCartState(res.data.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to decrease quantity");
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);

      updateCartState(res.data.data);

      toast.success(res.data.message, {
        autoClose: 500,
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to remove item");
    }
  };

  const removeAllCartItems = async () => {
    try {
      const res = await clearCartApi();

      updateCartState({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });

      toast.success(res.data.message, {
        autoClose: 500,
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to clear cart");
    }
  };

  const toggleCartSelection = (productId) => {
    setSelectedCartItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const clearSelectedCartItems = () => {
    setSelectedCartItems([]);
  };

  const removePurchasedItems = async (productIds) => {
    try {
      const res = await removePurchasedItemsApi(productIds);

      updateCartState(res.data.data);

      clearSelectedCartItems();
    } catch (err) {
      console.error(err);

      toast.error("Failed to update cart");
    }
  };

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          totalItems,
          totalPrice,
          addCartItem,
          removeCartItem,
          removeAllCartItems,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          refreshCart: fetchCart,
          selectedCartItems,
          toggleCartSelection,
          clearSelectedCartItems,
          removePurchasedItems,
        }}
      >
        <AppRoutes />
        <ToastContainer position="top-right" />
      </CartContext.Provider>{" "}
    </BrowserRouter>
  );
}

export default App;
