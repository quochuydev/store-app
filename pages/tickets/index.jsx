/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as _ from "lodash";

import TicketCard from "./TicketCard";
import Pagination from "./Pagination";
import Filter from "./Filter";
import LocationSearch from "./LocationSearch";

import Layout from "../../components/Layout";

export async function getServerSideProps({ query }) {
  return {
    props: {
      ticket: {
        name: "Nhà xe Minh Quốc",
        volume: 12,
      },
    },
  };
}

export default function Tickets({ ticket }) {
  return (
    <Layout>
      <TicketsComponent {...{ ticket }} />
    </Layout>
  );
}

function TicketsComponent({ ticket }) {
  const router = useRouter();
  const [query, setQuery] = useState({});

  const firstUpdate = React.useRef(true);
  useEffect(() => {
    const pushQuery = () => {
      const queryString = Object.keys(query)
        .map((e) => `${e}=${query[e]}`)
        .join("&");
      router.push(`/tickets?${queryString}`);
    };

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log(query);
    pushQuery();
  }, [query]);

  useEffect(() => {
    console.log(router.query, query);
    const newQuery = {};

    if (router.query?.shipping) {
      newQuery.shipping = router.query?.shipping.split(",");
    }

    if (router.query?.time) {
      newQuery.time = router.query?.time.split(",");
    }

    setQuery((q) => ({ ...q, ...newQuery }));
  }, []);

  const handleChange = (name, value, checked) => {
    if (checked) {
      const values = query[name] ? [...query[name], value] : [value];
      setQuery({ ...query, [name]: _.uniq(values) });
    } else {
      const values = [...query[name]].filter(
        (e) => String(e) !== String(value)
      );
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
            <Filter {...{ query, handleChange }} />
          </div>
          <div className="col-lg-9">
            <div className="mb-4">
              <TicketCard {...{ ticket }} />
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
