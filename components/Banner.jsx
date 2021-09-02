/* eslint-disable @next/next/no-img-element */
export default function Section({ setting }) {
  return (
    <section className="banner-container">
      {setting.contents?.map((content, i) => (
        <div key={i} className="banner">
          <img src={content.image} alt={content.title} />

          <div className="content">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <a href={content.url} className="btn">
              check out
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
