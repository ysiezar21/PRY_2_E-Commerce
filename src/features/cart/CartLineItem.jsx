import { useCart } from './CartContext';
import { getLineSubtotal } from './cartCalculations';
import { formatCRC } from './formatCurrency';

export default function CartLineItem({ item }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <li className="cart-line">
      {item.image ? (
        <img src={item.image} alt={item.name} className="cart-line__image" />
      ) : (
        <div className="cart-line__image cart-line__image--placeholder">Sin imagen</div>
      )}

      <div className="cart-line__info">
        <p className="cart-line__name">{item.name}</p>
        <p className="cart-line__unit-price">{formatCRC(item.price)} c/u</p>
      </div>

      <div className="cart-line__quantity">
        <button
          type="button"
          className="qty-btn"
          onClick={() => decrement(item.id)}
          disabled={item.quantity <= 1}
          aria-label={`Disminuir cantidad de ${item.name}`}
        >
          −
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          className="qty-btn"
          onClick={() => increment(item.id)}
          disabled={item.quantity >= item.stock}
          aria-label={`Aumentar cantidad de ${item.name}`}
        >
          +
        </button>
      </div>

      <p className="cart-line__subtotal">{formatCRC(getLineSubtotal(item))}</p>

      <button
        type="button"
        className="cart-line__remove"
        onClick={() => removeItem(item.id)}
        aria-label={`Eliminar ${item.name} del carrito`}
      >
        Eliminar
      </button>
    </li>
  );
}