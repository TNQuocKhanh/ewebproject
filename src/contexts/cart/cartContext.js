import React, { createContext, useReducer } from "react";
import cartReducer from "./cartReducer";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const cartInit = JSON.parse(localStorage.getItem("myCart")) || [];
  const cartRecentInit = JSON.parse(localStorage.getItem("myRecentCart")) || [];

  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: cartInit,
    cartRecent: cartRecentInit,
  });

  const addItem = (product) => {
    return dispatch({
      type: "ADD_TO_CART",
      product: product,
    });
  };

  const removeItem = (productId) => {
    return dispatch({
      type: "REMOVE_FROM_CART",
      productId: productId,
    });
  };

  const incrementItem = (productId) => {
    return dispatch({
      type: "INCREMENT_ITEM",
      productId: productId,
    });
  };

  const decrementItem = (productId) => {
    return dispatch({
      type: "DECREMENT_ITEM",
      productId: productId,
    });
  };

  const addToRecentProduct = (productId) => {
    return dispatch({
      type: "ADD_RECENT",
      productId: productId,
    });
  };

  const values = {
    ...cartState,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    addToRecentProduct,
  };
  localStorage.setItem("myCart", JSON.stringify(values.cart));
  localStorage.setItem("myRecentCart", JSON.stringify(values.cartRecent));
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
