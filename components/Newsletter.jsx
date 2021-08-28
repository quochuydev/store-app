export default function Newsletter(){
    return <section className="newsletter">
    <h3>subscribe us for latest updates</h3>
    <form>
      <input className="box" type="email" placeholder="enter your email" />
      <input type="submit" defaultValue="subscribe" className="btn" />
    </form>
  </section>
}