import Image from "next/image";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="image">
        <img src="images/home-img.png" alt="" />
      </div>
      <div className="content">
        <span>fresh and organic</span>
        <h3>your daily need products</h3>
        <a href="#" className="btn">
          get started
        </a>
      </div>
    </section>
  );
}
