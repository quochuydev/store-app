/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import AdminLayout from "@components/admin/Layout";
import axios from "@utils/axios";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@components/Editor").then((mod) => mod.default),
  { ssr: false }
);

export async function getServerSideProps({ req, query }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const result = await axios.get(`api/blogs/${query.id}`);

  return {
    props: {
      blog: result?.data || {},
    },
  };
}

export default function AdminEditBlog({ blog }) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().trim().required(),
        description: yup.string().trim().required(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
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

  useEffect(() => {
    formik.setValues({
      ...blog,
    });
  }, []);

  return (
    <AdminLayout current="blog">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Blogs
          </h1>
        </div>
      </div>

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
                    formik.errors?.title ? "border-red-300" : "border-gray-300"
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
              initValue={formik.values.description}
              onData={(value) => formik.setFieldValue("description", value)}
            />
          ),
          [formik.values.description]
        )}

        <div className="mt-5 sm:mt-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Create
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
