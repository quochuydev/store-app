/* eslint-disable @next/next/no-img-element */
import config from "../utils/config";

export default function Home({ setting }) {
  return (
    <section className="home" id="home">
      <div className="image">
        <img src={setting.banner.image} alt="" />
      </div>
      <div className="content">
        <span>{setting.banner.title}</span>
        <h3>{setting.banner.description}</h3>
        <a href={setting.banner.url} className="btn">
          get started
        </a>
      </div>
    </section>
  );
}
