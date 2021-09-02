/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as _ from "lodash";

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
  const router = useRouter();
  const [query, setQuery] = useState({});

  useEffect(() => {
    console.log(router.query);
    const newQuery = {};

    if (router.query.shipping) {
      newQuery.shipping = router.query.shipping.split(",");
    }

    if (router.query.time) {
      newQuery.time = router.query.time.split(",");
    }

    setQuery((query) => ({ ...query, ...newQuery }));
  }, [router.query]);

  const pushQuery = () => {
    const queryString = Object.keys(query)
      .map((e) => `${e}=${query[e]}`)
      .join("&");
    router.push(`/tickets?${queryString}`);
  };

  const handleChange = (name, value, checked) => {
    if (checked) {
      const values = query[name] ? [...query[name], value] : [value];
      setQuery({ ...query, [name]: _.uniq(values) });
    } else {
      const values = [...query[name]].filter((e) => e !== value);
      setQuery({ ...query, [name]: values });
    }
  };

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
            <button
              className="btn btn-primary mb-3"
              onClick={() => pushQuery()}
            >
              Apply filter
            </button>
            <Filter {...{ query, handleChange }} />
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
