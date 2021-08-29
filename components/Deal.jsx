import config from "../utils/config";

export default function Deal() {
  return (
    <section className="deal" id="deal">
      <div className="content">
        <h3 className="title">{config.deal.title}</h3>
        <p>{config.deal.description}</p>
        <div className="count-down">
          <div className="box">
            <h3 id="day">00</h3>
            <span>day</span>
          </div>
          <div className="box">
            <h3 id="hour">00</h3>
            <span>hour</span>
          </div>
          <div className="box">
            <h3 id="minute">00</h3>
            <span>minute</span>
          </div>
          <div className="box">
            <h3 id="second">00</h3>
            <span>second</span>
          </div>
        </div>
        <a href={config.deal.url} className="btn">
          check the deal
        </a>
      </div>
    </section>
  );
}
