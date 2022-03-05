/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import axios from "../../utils/axios";
import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout";
import useTranslation from "../../locales/useTranslation";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const [cart, getCart] = useCart();

  return (
    <Layout {...{ cart }}>
      {cart.items?.length ? (
        <CartComponent {...{ cart, getCart }} />
      ) : (
        <NoneItems />
      )}
    </Layout>
  );
}

function NoneItems() {
  const { t } = useTranslation();

  return (
    <div
      className={styles.cart}
      style={{ textAlign: "center", padding: "10rem" }}
    >
      <p>{t("label.emptyCart")}</p>
      <Link className="btn btn-primary btn-sm" href="/">
        {t("label.toHome")}
      </Link>
    </div>
  );
}

function CartComponent({ cart, getCart }) {
  const { t } = useTranslation();

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
              <p>Price: {item.price}đ</p>
            </div>
          </div>
        </td>
        <td>{item.price}đ</td>
        <td>
          <div className={styles.quantityControl}>
            <ButtonChangeQuantity
              type="decrease"
              item={item}
              getCart={getCart}
            />
            <input
              type="text"
              defaultValue={item.quantity}
              className={styles.itemQuantity}
            />
            <ButtonChangeQuantity
              type="increase"
              item={item}
              getCart={getCart}
            />
          </div>
        </td>
        <td style={{ textAlign: "right" }}>${item.amount}</td>
        <td>
          <ButtonRemoveItem {...{ item, getCart }} />
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.cart}>
      <ToastContainer />
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>{t("label.product")}</th>
            <th>{t("label.price")}</th>
            <th>{t("label.quantity")}</th>
            <th style={{ textAlign: "right" }}>{t("label.total")}</th>
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
              <td>{t("label.total")}</td>
              <td>${cart.total_price}</td>
            </tr>
          </tbody>
        </table>

        <Link href="/checkout">
          <a className={styles.checkout}>{t("label.processCheckout")}</a>
        </Link>
      </div>
    </div>
  );
}

function ButtonChangeQuantity({ item, type, getCart }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (type === "decrease" && item.quantity <= 1) {
      return;
    }

    setLoading(true);
    await axios.post(`api/cart/update/${item.productId}`, {
      quantity: type === "decrease" ? -1 : 1,
    });
    setLoading(false);

    getCart();
  };

  return (
    <button type="button" className={styles.quantityButton} onClick={onClick}>
      {loading ? (
        <i className={`fa fa-spinner fa-spin`} />
      ) : (
        <>{type === "decrease" ? "-" : "+"}</>
      )}
    </button>
  );
}

function ButtonRemoveItem({ item, getCart }) {
  const [loading, setLoading] = useState(false);

  const onRemove = async () => {
    setLoading(true);
    await axios.post(`api/cart/remove/${item.productId}`);
    setLoading(false);
    getCart();
  };

  return (
    <a className="btn" style={{ cursor: "pointer" }} onClick={onRemove}>
      {loading ? <i className={`fa fa-spinner fa-spin`} /> : <>remove</>}
    </a>
  );
}
