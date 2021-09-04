import useTranslation from "../locales/useTranslation";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="contact" id="contact">
      <h1 className="heading">
        {" "}
        <span>contact</span> us{" "}
      </h1>
      <form>
        <div className="inputBox">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
        </div>
        <div className="inputBox">
          <input type="number" placeholder="number" />
          <input type="text" placeholder="subject" />
        </div>
        <textarea placeholder="message" cols={30} rows={10} defaultValue={""} />
        <input type="submit" defaultValue="send message" className="btn" />
      </form>
    </section>
  );
}
