/* eslint-disable @next/next/no-img-element */
export default function MegaMenu() {
  return (
    <nav className="navbar navbar-default">
      <div className="navbar-collapse js-navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="dropdown mega-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownMenuLink"
            >
              Shop
              <span className="glyphicon glyphicon-chevron-down pull-right" />
            </a>
            <ul
              className="dropdown-menu mega-dropdown-menu row container"
              aria-labelledby="dropdownMenuLink"
            >
              <li className="col-sm-4">
                <ul>
                  <li className="dropdown-header">Hottest Products</li>
                  <div
                    id="myCarousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="item active">
                        <img
                          src={`https://ui-avatars.com/api/?name=${"New Collection"}&size=200`}
                          className="img-responsive"
                          alt="product 1"
                        />
                        <h4>
                          <small>Summer dress floral prints</small>
                        </h4>
                        <button className="btn btn-primary" type="button">
                          49,99 €
                        </button>{" "}
                        <button
                          href="#"
                          className="btn btn-default"
                          type="button"
                        >
                          <span className="glyphicon glyphicon-heart" /> Add to
                          Cart
                        </button>
                      </div>
                      {/* End Item */}
                    </div>
                    {/* End Carousel Inner */}
                  </div>
                  {/* /.carousel */}
                  <li className="divider" />
                </ul>
              </li>
              <li className="col-sm-4">
                <ul>
                  <li className="dropdown-header">Marine Radios</li>
                  <li>
                    <a href="#">VHF FIxed Mount</a>
                  </li>
                  <li>
                    <a href="#">VHF Handheld</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                  <li className="divider" />
                  <li className="dropdown-header">Video Surveillance</li>
                  <li>
                    <a href="#">Systems</a>
                  </li>
                  <li>
                    <a href="#">Baby Monitors</a>
                  </li>
                  <li>
                    <a href="#">Additional Cameras</a>
                  </li>
                </ul>
              </li>
              <li className="col-sm-4">
                <ul>
                  <li className="dropdown-header">Accessories</li>
                  <li>
                    <a href="#">For Scanners</a>
                  </li>
                  <li>
                    <a href="#">For CB Radios</a>
                  </li>
                  <li>
                    <a href="#">For Marine Radios</a>
                  </li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                  <li className="divider" />

                  <li className="dropdown-header">Newsletter</li>
                  <form className="form" role="form">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="email">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
