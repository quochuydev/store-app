import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../utils/config";

export default function Newsletter() {
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
      <h3>Subscribe us for latest updates</h3>
      <div>
        <input
          className="box"
          type="text"
          placeholder="enter your phone number"
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
