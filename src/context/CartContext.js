import { createContext } from "react";

const CartContext = createContext({
  cartList: [],
  selectedCartItems: [],

  totalPrice: 0,
  totalItems: 0,

  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},

  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},

  toggleCartSelection: () => {},

  // NEW
  clearSelectedCartItems: () => {},

  // NEW
  removePurchasedItems: () => {},
});

export default CartContext;
