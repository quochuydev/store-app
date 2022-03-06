import useTranslation from "@locales/useTranslation";

export default function Items(props: any) {
  const { t } = useTranslation();

  const { cart } = props;

  return (
    <div>
      <ul className="list-group mb-3">
        {cart.items.map((item: any, i: number) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between lh-sm"
          >
            <div>
              <small className="text-muted">{item.title}</small>
              <h6 className="my-0">
                ${item.price} x {item.quantity}
              </h6>
            </div>
            <span className="text-muted">${item.amount}</span>
          </li>
        ))}
        {/* <PromoCode /> */}
        <li className="list-group-item d-flex justify-content-between">
          <span>{t("label.total")}</span>
          <strong>${cart.total_price}</strong>
        </li>
      </ul>
    </div>
  );
}

function PromoCode() {
  return (
    <li className="list-group-item d-flex justify-content-between bg-light">
      <div className="text-success">
        <h6 className="my-0">Promo code</h6>
        <small>EXAMPLECODE</small>
      </div>
      <span className="text-success">−$5</span>
    </li>
  );
}
