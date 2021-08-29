/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./style.module.css";
import Layout from "../../components/Layout";
import Thankyou from "../../components/Thankyou";
import useCart from "../../hooks/useCart";

export default function Order() {
  const { id, thankyou } = useRouter().query;

  const [cart] = useCart();

  const [data, setData] = useState({
    amount: 0,
    line_items: [],
  });

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: `${process.env.SERVER_URL}/api/orders/${id}`,
      }).then(function (response) {
        setData(response.data);
      });
    }
  }, [id]);

  return (
    <Layout {...{ cart }}>
      {thankyou === "true" && <Thankyou />}
      <CustomerInfo {...{ data }} />
      <ItemsComponent {...{ data }} />
    </Layout>
  );
}

function CustomerInfo({ data }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <b>Billing address</b>
        <div>{data.customer?.firstName}</div>
        <div>{data.customer?.phoneNumber}</div>
        <div>{data.customer?.email}</div>
        <div>{data.customer?.address}</div>
      </div>
      <div className="col-md-6">
        <b>Payment</b>
        <div>Cash On Delivery (COD)</div>
      </div>
    </div>
  );
}

function ItemsComponent({ data }) {
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
            </div>
          </div>
        </td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
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
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {data.line_items.map((e, i) => (
            <CartItem key={i} item={e} />
          ))}
        </tbody>
      </table>

      <div className={styles.totalPrice}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Total</td>
              <td>${data.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
