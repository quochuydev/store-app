/* eslint-disable @next/next/link-passhref */
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

function NoneItems() {
  return <div></div>;
}

function CartComponent({ cart, fetchCart }) {
  const CartItem = ({ item }) => {
    return (
      <tr>
        <td>
          <div className={styles.cartInfo}>
            <img src={item.image} alt={item.title} />
            <div>
              <Link href={`/products/${item.productId}`}>
                <p>{item.title}</p>
              </Link>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        </td>
        <td>${item.price}</td>
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
        <td style={{ textAlign: "right" }}>${item.amount}</td>
        <td>
          <ButtonRemoveItem {...{ item, fetchCart }} />
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.cart}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th style={{ textAlign: "right" }}>Total</th>
            <th></th>
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

function ButtonRemoveItem({ item, fetchCart }) {
  const onRemove = async () => {
    await axios.post(
      `${process.env.SERVER_URL}/api/cart/remove/${item.productId}`
    );
    fetchCart();
    alert("success");
  };

  return <a onClick={onRemove}>remove</a>;
}
