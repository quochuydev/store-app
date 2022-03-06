import useTranslation from "@locales/useTranslation";

export default function BillingAddress(props: any) {
  const { t } = useTranslation();

  const { onData } = props;

  return (
    <div>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            {t("label.firstName")}
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Your name"
            required
            onChange={(e) => onData("firstName", e.target.value)}
          />
          <div className="invalid-feedback">{t("error.firstName")}</div>
        </div>
        {/* <LastnameComponent /> */}
        {/* <UsernameComponent /> */}
        <div className="col-12">
          <label htmlFor="phone" className="form-label">
            {t("label.phoneNumber")}
            <span className="text-muted"></span>
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="0382000638"
            required
            onChange={(e) => onData("phoneNumber", e.target.value)}
          />
          <div className="invalid-feedback">{t("error.phone")}</div>
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => onData("email", e.target.value)}
          />
          <div className="invalid-feedback">{t("error.email")}</div>
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            {t("label.address")}
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="1234 Main St - Ho Chi Minh City"
            required
            onChange={(e) => onData("address", e.target.value)}
          />
          <div className="invalid-feedback">{t("error.address")}</div>
        </div>
        {/* <PlaceComponent /> */}
      </div>
    </div>
  );
}

function LastnameComponent() {
  return (
    <div className="col-sm-6">
      <label htmlFor="lastName" className="form-label">
        Last name
      </label>
      <input type="text" className="form-control" id="lastName" required />
      <div className="invalid-feedback">Valid last name is required.</div>
    </div>
  );
}

function UsernameComponent() {
  return (
    <div className="col-12">
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <div className="input-group has-validation">
        <span className="input-group-text">@</span>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
          required
        />
        <div className="invalid-feedback">Your username is required.</div>
      </div>
    </div>
  );
}

function PlaceComponent() {
  return (
    <>
      <div className="col-md-5">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <select className="form-select" id="country" required>
          <option>Choose...</option>
          <option>United States</option>
        </select>
        <div className="invalid-feedback">Please select a valid country.</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <select className="form-select" id="state" required>
          <option>Choose...</option>
          <option>California</option>
        </select>
        <div className="invalid-feedback">Please provide a valid state.</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="zip" className="form-label">
          Zip
        </label>
        <input type="text" className="form-control" id="zip" required />
        <div className="invalid-feedback">Zip code required.</div>
      </div>
    </>
  );
}
