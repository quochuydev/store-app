/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";
import AdminLayout from "@components/admin/Layout";
import Modal from "@components/Modal";
import Table from "@components/Table";
import axios from "@utils/axios";
import { toast } from "react-toastify";
import Router from "next/router";

const Editor = dynamic(
  () => import("@components/Editor").then((mod) => mod.default),
  { ssr: false }
);

export async function getServerSideProps({ req }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const result = await axios.get(`api/blogs`);

  return {
    props: {
      blogs: result?.data?.items || [],
    },
  };
}

export default function AdminBlogs({ blogs }) {
  const [isOpen, setIsOpen] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().trim().required(),
        body: yup.string().trim().required(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: schema,
    onSubmit: async (data) => {
      console.log(data);

      try {
        await axios.post(`api/blogs`, data);
        toast("Success");
      } catch (error) {
        toast.error("Failed");
      }
    },
  });

  return (
    <AdminLayout current="blog">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          {JSON.stringify(formik.values)}
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              {useMemo(
                () => (
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values?.title}
                    className={`flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ${
                      formik.errors?.title
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                ),
                [formik.values?.title]
              )}
            </div>
          </div>

          {useMemo(
            () => (
              <Editor
                initValue={formik.values.body}
                onData={(value) => formik.setFieldValue("body", value)}
              />
            ),
            [formik.values.body]
          )}

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Blogs
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link href={"/admin/blogs/new_blog"}>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              New blog
            </button>
          </Link>
        </div>
      </div>

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
            id: "title",
            name: "title",
            render: function Column(data) {
              return <p>{data.title}</p>;
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
            id: "publish",
            name: "publish",
            render: function Column(data) {
              return (
                <>
                  <select
                    onChange={async (event) => {
                      await axios.put(`api/blogs/${data._id}`, {
                        status: event.target.value,
                      });

                      toast("Updated successfully");
                      Router.push("/admin/blogs");
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
          {
            id: "action",
            name: "",
            render: function Column(data) {
              return (
                <>
                  <Link href={`/admin/blogs/${data._id}`}>
                    <a className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </Link>{" "}
                  <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a>
                </>
              );
            },
          },
        ]}
        rows={blogs}
      />
    </AdminLayout>
  );
}
