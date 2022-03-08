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

  const blogs = [];

  return {
    props: { blogs },
  };
}

export default function AdminBlogs({ blogs }) {
  const [isOpen, setIsOpen] = useState(false);

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

  // useEffect(() => {
  //   formik.setValues({
  //   });
  // }, []);

  const initialState = {
    entityMap: {
      0: {
        type: "IMAGE",
        mutability: "IMMUTABLE",
        data: {
          src: "/images/canada-landscape-small.jpg",
        },
      },
    },
    blocks: [
      {
        key: "9gm3s",
        text: "You can have images in your text field which are draggable. Hover over the image press down your mouse button and drag it to another position inside the editor.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "ov7r",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: "e23a8",
        text: "You can checkout the alignment tool plugin documentation to see how to build a compatible block plugin …",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };

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

          <Editor
            initValue={formik.values.description}
            onData={(description) => formik.setValues({ description })}
          />

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
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          >
            New blog
          </button>
        </div>
      </div>

      <Table columns={[]} rows={[]} />
    </AdminLayout>
  );
}
