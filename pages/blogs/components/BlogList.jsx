/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function ProductList({ blogs = [] }) {
  return (
    <div className="bg-white">
      <div className="mx-auto p-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          LATEST blogs
        </h2>

        <div className="mt-6">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <div>
                <p>{blog.title}</p>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.body,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
