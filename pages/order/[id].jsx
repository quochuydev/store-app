/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useMemo } from "react";
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
    if (!id) {
      return;
    }

    axios({
      method: "get",
      url: `${process.env.SERVER_URL}/api/orders/${id}`,
    }).then(function (response) {
      setData(response.data);
    });
  }, [id]);

  return (
    <Layout {...{ cart }}>
      <section className="mt-5">
        {thankyou === "true" && <Thankyou />}
        {useMemo(
          () => (
            <CustomerInfo {...{ data }} />
          ),
          [data]
        )}
        <ItemsComponent {...{ data }} />
      </section>
    </Layout>
  );
}

function CustomerInfo({ data }) {
  const [paymentNote, setPaymentNote] = useState(null);
  console.log(data);

  useEffect(() => {
    if (data.payment) {
      setPaymentNote(data.payment?.note);
    }
  }, [data]);

  return (
    <div className="container g-3">
      <div className="row">
        <div className="col-md-6">
          <b>Billing address</b>
          <div>{data.customer?.firstName}</div>
          <div>{data.customer?.phoneNumber}</div>
          <div>{data.customer?.email}</div>
          <div>{data.customer?.address}</div>
        </div>
        <div className="col-md-6">
          <b>Payment</b>
          <div>
            {data.payment?.type === "cod"
              ? "Cash On Delivery (COD)"
              : "Bank tranfer"}
          </div>
          {data.payment?.type !== "cod" && !paymentNote && (
            <>
              <hr />
              <p style={{ color: "#69ae14" }}>
                <b>Gửi bằng chứng thanh toán (${data.amount})</b>
              </p>
              <input
                type="file"
                onChange={async (event) => {
                  try {
                    const file = event.target?.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append("files", file);

                    const result = await axios({
                      method: "post",
                      url: process.env.SERVER_URL + "/api/files",
                      headers: { "Content-Type": "multipart/form-data" },
                      data: bodyFormData,
                    });

                    const note = result?.data?.url;
                    await axios.post(
                      `${process.env.SERVER_URL}/api/orders/${data._id}/payment-info`,
                      { note }
                    );

                    setPaymentNote(note);
                  } catch (error) {
                    //
                  }
                }}
              />
            </>
          )}
        </div>
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
