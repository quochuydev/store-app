/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as _ from "lodash";
import axios from "axios";

import TicketCard from "./TicketCard";
import Pagination from "../../components/Pagination";
import Filter from "./Filter";
import LocationSearch from "./LocationSearch";

import Layout from "../../components/Layout";

const fetchTickets = async () => {
  try {
    const result = await axios.get(`${process.env.SERVER_URL}/api/tickets`);
    return result?.data?.items;
  } catch (error) {
    return [
      {
        name: "Nhà xe Minh Quốc",
        volume: 12,
      },
      {
        name: "Nhà xe Minh Quốc",
        volume: 12,
      },
    ];
  }
};

export async function getServerSideProps({ query }) {
  const tickets = await fetchTickets();

  return {
    props: {
      tickets,
    },
  };
}

export default function Tickets({ tickets }) {
  return (
    <Layout>
      <TicketsComponent {...{ tickets }} />
    </Layout>
  );
}

function TicketsComponent({ tickets }) {
  const router = useRouter();
  const [query, setQuery] = useState({});

  const pushQuery = (_query) => {
    const queryString = Object.keys(_query)
      .map((e) => `${e}=${_query[e]}`)
      .join("&");
    router.push(`/tickets?${queryString}`);
  };

  const firstUpdate = React.useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      return (firstUpdate.current = false);
    }

    pushQuery(query);
  }, [query]);

  useEffect(() => {
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
            {tickets.map((ticket, i) => (
              <TicketCard key={i} {...{ ticket }} />
            ))}

            <div className="text-center mt-4 mt-sm-5">
              <Pagination {...{}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
