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
              Shop By Category
              <span className="glyphicon glyphicon-chevron-down pull-right" />
            </a>
            <ul
              className="dropdown-menu mega-dropdown-menu row"
              aria-labelledby="dropdownMenuLink"
            >
              <li className="col-sm-3">
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
                          src="http://placehold.it/254x100/3498db/f5f5f5/&text=New+Collection"
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
              <li className="col-sm-3">
                <ul>
                  <li className="dropdown-header">Scanners</li>
                  <li>
                    <a href="#">Police, Fire &amp; EMS</a>
                  </li>
                  <li>
                    <a href="#">Digital Scanners</a>
                  </li>
                  <li>
                    <a href="#">Trunk Tracker Scanners</a>
                  </li>
                  <li>
                    <a href="#">Nascar Scanners</a>
                  </li>
                  <li>
                    <a href="#">Base/Mobile Scanners</a>
                  </li>
                  <li>
                    <a href="#">Portable/Handheld Scanners</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                  <li className="divider" />
                  <li className="dropdown-header">Two Way Radios</li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                </ul>
              </li>
              <li className="col-sm-3">
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
                  <li>
                    <a href="#">View All</a>
                  </li>
                  <li className="divider" />
                  <li className="dropdown-header">Radar Detectors</li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                </ul>
              </li>
              <li className="col-sm-3">
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
                      Info
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
