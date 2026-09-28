import { useReducer, useMemo, useCallback, useEffect } from 'react';
import { CartContext } from './CartContext';
import { cartReducer, CART_ACTIONS } from './cartReducer';
import { loadCart, saveCart } from './cartStorage';

export default function CartProvider({ children }) {
  // undefined = sin estado inicial directo; loadCart lo calcula una sola vez al montar
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Cada cambio en el carrito se guarda en localStorage
  useEffect(() => {
    saveCart(state);
  }, [state]);

  const addItem = useCallback(
    (product) =>
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] ?? null,
        },
      }),
    []
  );
  const increment = useCallback((id) => dispatch({ type: CART_ACTIONS.INCREMENT, payload: id }), []);
  const decrement = useCallback((id) => dispatch({ type: CART_ACTIONS.DECREMENT, payload: id }), []);
  const removeItem = useCallback((id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id }), []);
  const clearCart = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR_CART }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({ items: state.items, totalItems, addItem, increment, decrement, removeItem, clearCart }),
    [state.items, totalItems, addItem, increment, decrement, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}