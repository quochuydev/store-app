export default function Deal(){
    return <section className="deal" id="deal">
    <div className="content">
      <h3 className="title">deal of the day</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam possimus voluptates commodi laudantium! Doloribus sint voluptatibus quaerat sequi suscipit nulla?</p>
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
      <a href="#" className="btn">check the deal</a>
    </div>
  </section>
}