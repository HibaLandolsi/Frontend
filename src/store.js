import { createContext } from "react";

const CartContext = createContext({
    cart: [],
    addItemToCart(item) {},
    removeFromCart(item) {}
})

export default CartContext;