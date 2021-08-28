export default function Items() {
  return (
    <div>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 className="my-0">Product name</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">$12</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 className="my-0">Second product</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">$8</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 className="my-0">Third item</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">$5</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Promo code</h6>
            <small>EXAMPLECODE</small>
          </div>
          <span className="text-success">−$5</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>$20</strong>
        </li>
      </ul>
    </div>
  );
}
