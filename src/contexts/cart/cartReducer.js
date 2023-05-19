const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, amount: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.amount++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  const carts = state.cart.filter((it) => it.id !== productId)
  return {
    ...state,
    cart: state.cart.filter((it) => it.id !== productId),
  };
};

const increaseQuantity = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.amount++;
  if (updatedItem.amount <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const decreaseQuantity = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.amount--;
  if (updatedItem.amount <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addProductToCart(action.product, state);
    case "REMOVE_FROM_CART":
      return removeProductFromCart(action.productId, state);
    case "INCREMENT_ITEM":
      return increaseQuantity(action.productId, state);
    case "DECREMENT_ITEM":
      return decreaseQuantity(action.productId, state);
    default:
      return state;
  }
};

export default cartReducer;
