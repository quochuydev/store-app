/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@utils/axios";
import AdminLayout from "@components/admin/Layout";
import Table from "@components/Table";
import { toast } from "react-toastify";
import Router from "next/router";

export async function getServerSideProps({ req }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const result = await axios.get(`api/orders`);

  return {
    props: {
      orders: result?.data?.items || [],
    },
  };
}

export default function Order({ orders }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <AdminLayout current="order">
      <Table
        columns={[
          {
            id: "id",
            name: "id",
            render: function Column(data) {
              return <button>button {data._id}</button>;
            },
          },
          {
            id: "lineItems",
            name: "Line items",
            render: function Column(data) {
              return (
                <>
                  {data.lineItems.map((lineItem, index) => (
                    <div key={index}>
                      <p>{lineItem.title}</p>
                      <p>{lineItem.price}</p>
                    </div>
                  ))}
                </>
              );
            },
          },
          {
            id: "createdAt",
            name: "Created at",
            render: function Column(data) {
              return <>{new Date(data.createdAt).toDateString()}</>;
            },
          },
          {
            id: "total",
            name: "total",
          },
          {
            id: "action",
            name: "",
            render: function Column(data) {
              return (
                <>
                  <a
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {}}
                  >
                    Edit
                  </a>{" "}
                  <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a>
                  <select
                    onChange={async (event) => {
                      console.log(event.target.value);

                      await axios.put(`api/orders/${data._id}`, {
                        status: event.target.value,
                      });

                      toast("Updated successfully");
                      Router.push("/admin/orders");
                    }}
                    value={data.status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"new"}>New</option>
                    <option value={"in-progress"}>In-progress</option>
                    <option value={"done"}>Done</option>
                  </select>
                </>
              );
            },
          },
        ]}
        rows={orders}
      />
    </AdminLayout>
  );
}
