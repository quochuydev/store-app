/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";

import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout";

export default function Cart() {
  const [cart, fetchCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <CartComponent {...{ cart, fetchCart }} />
    </Layout>
  );
}

function CartComponent({ cart, fetchCart }) {
  const CartItem = ({ item }) => {
    return (
      <tr>
        <td>
          <div className={styles.cartInfo}>
            <img src={item.image} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <span>Price: ${item.price}</span>
              <br />
              <a
                onClick={async () => {
                  await axios.post(
                    `${process.env.SERVER_URL}/api/cart/remove/${item.productId}`
                  );
                  fetchCart();
                  alert("success");
                }}
              >
                remove
              </a>
            </div>
          </div>
        </td>
        <td>
          <div className={styles.qtyClick}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={async () => {
                if (item.quantity <= 1) {
                  return;
                }
                await axios.post(`${process.env.SERVER_URL}/api/cart/update`, {
                  line_item: { productId: item.productId, quantity: -1 },
                  note: "test",
                });
                fetchCart();
              }}
            >
              -
            </button>
            <input
              type="text"
              defaultValue={item.quantity}
              className={styles.itemQuantity}
            />
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={async () => {
                await axios.post(`${process.env.SERVER_URL}/api/cart/update`, {
                  line_item: { productId: item.productId, quantity: 1 },
                  note: "test",
                });
                fetchCart();
              }}
            >
              +
            </button>
          </div>
        </td>
        <td>${item.amount}</td>
      </tr>
    );
  };

  return (
    <div className={styles.cart}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {cart.items.map((e, i) => (
            <CartItem key={i} item={e} cart={cart} />
          ))}
        </tbody>
      </table>

      <div className={styles.totalPrice}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Item count</td>
              <td>{cart.item_count}</td>
            </tr>
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

        <a href="#" className={styles.checkout}>
          Proceed To Checkout
        </a>
      </div>
    </div>
  );
}
