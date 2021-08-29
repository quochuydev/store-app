/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./style.module.css";
import Layout from "../../components/Layout";
import Thankyou from "../../components/Thankyou";
import useCart from "../../hooks/useCart";

const toDecimal = (price: any, fixedCount = 2) => {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: fixedCount,
    maximumFractionDigits: fixedCount,
  });
};

export default function Order() {
  const { id, thankyou } = useRouter().query;
  console.log(useRouter().query);

  const [cart] = useCart();

  const [data, setData] = useState<any>({
    amount: 0,
    line_items: [],
  });

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: `${process.env.SERVER_URL}/api/orders/${id}`,
      })
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <Layout {...{ cart }}>
      {thankyou === "true" && <Thankyou />}
      <ItemsComponent {...{ data }} />
    </Layout>
  );
}

function ItemsComponent({ data }: any) {
  const CartItem = ({ item }: any) => {
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
          {data.line_items.map((e: any, i: number) => (
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
