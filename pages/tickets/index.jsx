/* eslint-disable @next/next/no-img-element */
import TicketCard from "./TicketCard";
import Pagination from "./Pagination";
import Filter from "./Filter";
import LocationSearch from "./LocationSearch";

import Layout from "../../components/Layout";

export default function Tickets() {
  return (
    <Layout>
      <TicketsComponent />
    </Layout>
  );
}

function TicketsComponent() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <LocationSearch />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <Filter />
          </div>
          <div className="col-lg-9">
            <div className="mb-4">
              <TicketCard />
            </div>

            <div className="text-center mt-4 mt-sm-5">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
