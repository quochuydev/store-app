import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useTranslation from "../locales/useTranslation";
import config from "../utils/config";

export default function Newsletter() {
  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const onClick = async () => {
    if (!phoneNumber || phoneNumber === "") {
      return toast.error("Invalid phone number");
    }

    await axios.post(`${config.server}/api/subscribe`, { phoneNumber });
    toast("Success");
  };

  return (
    <section className="newsletter">
      <h3>{t("label.subscribe")}</h3>
      <div>
        <input
          className="box"
          type="text"
          placeholder={t("label.inputPhone")}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target?.value)}
        />
        <button type="submit" className="btn" onClick={onClick}>
          Subscribe
        </button>
      </div>
    </section>
  );
}
