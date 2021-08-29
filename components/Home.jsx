/* eslint-disable @next/next/no-img-element */
import config from "../utils/config";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="image">
        <img src={config.banner.image} alt="" />
      </div>
      <div className="content">
        <span>{config.banner.title}</span>
        <h3>{config.banner.description}</h3>
        <a href={config.banner.url} className="btn">
          get started
        </a>
      </div>
    </section>
  );
}
