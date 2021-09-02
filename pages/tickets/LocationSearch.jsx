import place from "./vietnam-places";

export default function LocationSearch() {
  return (
    <>
      <div className="mt-5" />
      <h1>Vé xe khách</h1>

      <div className="widget border-0">
        <div className="input-group mb-3">
          <select className="form-select" aria-label="Default select example">
            {place.cities.map((e, i) => (
              <option key={i} value="1">
                {e.name}
              </option>
            ))}
          </select>

          <span className="input-group-text">
            <i className="fas fa-exchange-alt"></i>
          </span>

          <select className="form-select" aria-label="Default select example">
            {place.cities.map((e, i) => (
              <option key={i} value="1">
                {e.name}
              </option>
            ))}
          </select>
          <button className="btn btn-primary m-0">Tìm chuyến</button>
        </div>
      </div>
    </>
  );
}
