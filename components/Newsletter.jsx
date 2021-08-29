export default function Newsletter() {
  return (
    <section className="newsletter">
      <h3>Subscribe us for latest updates</h3>
      <div>
        <input
          className="box"
          type="text"
          placeholder="enter your phone number"
        />
        <input type="submit" defaultValue="subscribe" className="btn" />
      </div>
    </section>
  );
}
