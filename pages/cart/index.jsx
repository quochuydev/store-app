import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";

export default function ProductDetailOne() {
  const [cart] = useCart();
  const [products] = useProduct({});

  return (
    <div className={[styles.container, styles.cart]}>
      <p>{cart.item_count}</p>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>

          {cart.items.map((e, i) => (
            <tr key={i}>
              <td>
                <div className={styles.cartInfo}>
                  <img src={e.image} alt={e.title} />
                  <div>
                    <p>{e.title}</p>
                    <span>Price: ${e.price}</span>
                    <br />
                    <a href="#">remove</a>
                  </div>
                </div>
              </td>
              <td>
                <input type="number" value={e.quantity} min={1} />
              </td>
              <td>${e.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totalPrice}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${cart.total_price}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>${cart.total_price}</td>
            </tr>
          </tbody>
        </table>
        <a href="#" className={[styles.checkout, styles.btn]}>
          Proceed To Checkout
        </a>
      </div>
    </div>
  );
}
