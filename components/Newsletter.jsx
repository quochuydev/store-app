import { useState } from "react";
import { toast } from "react-toastify";
import axios from "@utils/axios";
import useTranslation from "../locales/useTranslation";

export default function Newsletter() {
  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const onClick = async () => {
    if (!phoneNumber || phoneNumber === "") {
      return toast.error("Invalid phone number");
    }

    await axios.post(`api/subscribe`, { phoneNumber });
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
