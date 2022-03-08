/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@utils/axios";
import AdminLayout from "@components/admin/Layout";
import Table from "@components/Table";
import { toast } from "react-toastify";

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

export default function Example({ orders }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <AdminLayout>
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
              return <>{data.createdAt}</>;
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
                      await axios.put(`api/orders/${data._id}`, {
                        status: event.target.value,
                      });
                      toast("Updated successfully");
                    }}
                  >
                    <option>New</option>
                    <option>In-progress</option>
                    <option>Done</option>
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
