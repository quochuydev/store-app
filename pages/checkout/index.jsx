/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import PromoCodeInput from "../../components/Checkout/PromoCodeInput";
import BillingAddress from "../../components/Checkout/BillingAddress";
import Payment from "../../components/Checkout/Payment";
import Items from "../../components/Checkout/Items";

export default function Checkout() {
  const [cart, fetchCart] = useCart();

  return (
    <div className={styles.container}>
      <main>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <Items />
            <PromoCodeInput />
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation was-validated" noValidate>
              <BillingAddress />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="my-4" />
              <Payment />
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
