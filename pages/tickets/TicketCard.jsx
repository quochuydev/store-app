/* eslint-disable @next/next/no-img-element */

const styles = {
  phone: {
    background: "#00f",
    color: "#fff",
    padding: "5px 10px",
    textAlign: "center",
    display: "block",
    width: 200,
    fontSize: 20,
    cursor: "pointer",
  },
};

export default function TicketCard({ ticket }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 col-lg-3">
          <img
            src="images/car.png"
            className="img-fluid rounded-start"
            alt={ticket.name}
            style={{ padding: 15 }}
          />
        </div>

        <div className="col-md-8 col-lg-5">
          <div className="card-body">
            <h3 className="card-title fw-bold">
              {ticket.name}{" "}
              <span style={{ fontSize: 14 }}>
                (Tải trọng {ticket.volume} tấn)
              </span>
            </h3>

            <table className="fromto">
              <tbody>
                <tr>
                  <td style={{ width: 100 }}>
                    {/* <b>{new Date(ticket.start).toISOString()}</b> */}
                    <b>6:00</b>
                  </td>
                  <td>
                    <b>VP Long and</b>
                    <br />
                    <small>110 Hùng Vương, Long An</small>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: 100 }}>
                    <b>6:00</b>
                  </td>
                  <td>
                    <b>VP Long and</b>
                    <br />
                    <small>110 Hùng Vương, Long An</small>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <a style={styles.phone}>Gọi: 0382986838</a>
          </div>
        </div>

        <div className="col-md-12 col-lg-4">
          <div style={{ margin: 15, padding: 15, border: "1px solid black" }}>
            <p>Dưới 100kg: 3k/kg</p>
            <p>100 - 300kg: 2.5k/kg</p>
            <p>trên 500kg: 2.5/kg</p>
            <p>Xe container lạnh, có bốc hàng tại nhà, giao hàng tận nhà</p>
          </div>
        </div>
      </div>
    </div>
  );
}
