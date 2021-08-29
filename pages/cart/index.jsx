/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";

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
              <ButtonRemoveItem {...{ item }} />
            </div>
          </div>
        </td>
        <td>
          <div className={styles.qtyClick}>
            <ButtonChangeQuantity
              type="decrease"
              item={item}
              fetchCart={fetchCart}
            />
            <input
              type="text"
              defaultValue={item.quantity}
              className={styles.itemQuantity}
            />
            <ButtonChangeQuantity
              type="increase"
              item={item}
              fetchCart={fetchCart}
            />
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

        <Link href="/checkout">
          <a className={styles.checkout}>Proceed To Checkout</a>
        </Link>
      </div>
    </div>
  );
}

function ButtonChangeQuantity({ item, type, fetchCart }) {
  const onClick = async () => {
    if (type === "decrease" && item.quantity <= 1) {
      return;
    }
    await axios.post(
      `${process.env.SERVER_URL}/api/cart/update/${item.productId}`,
      { quantity: type === "decrease" ? -1 : 1 }
    );
    fetchCart();
  };

  return (
    <button type="button" className={styles.qtyBtn} onClick={onClick}>
      {type === "decrease" ? "-" : "+"}
    </button>
  );
}

function ButtonRemoveItem({ item }) {
  const onRemove = async () => {
    await axios.post(
      `${process.env.SERVER_URL}/api/cart/remove/${item.productId}`
    );
    fetchCart();
    alert("success");
  };

  return <a onClick={onRemove}>remove</a>;
}
