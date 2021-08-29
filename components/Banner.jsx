/* eslint-disable @next/next/no-img-element */
import config from "../utils/config";

export default function Section() {
  return (
    <section className="banner-container">
      <div className="banner">
        <img src={config.content1.image} alt={config.content1.title} />
        <div className="content">
          <h3>{config.content1.title}</h3>
          <p>{config.content1.description}</p>
          <a href={config.content1.url} className="btn">
            check out
          </a>
        </div>
      </div>
      <div className="banner">
        <img src={config.content2.image} alt={config.content2.title} />
        <div className="content">
          <h3>{config.content2.title}</h3>
          <p>{config.content2.description}</p>
          <a href={config.content2.url} className="btn">
            check out
          </a>
        </div>
      </div>
    </section>
  );
}
