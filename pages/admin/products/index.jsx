/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import axios from "@utils/axios";
import AdminLayout from "@components/admin/Layout";
import { useQuery } from "react-query";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps({ req }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}

const NatsRequest = () => {
  return {
    request: async (subject) => {
      const result = await axios.post(subject);

      return result?.data;
    },
  };
};

const natsRequest = NatsRequest();

export default function AdminProduct() {
  const { data: products = [] } = useQuery(["products"], async () => {
    const result = await natsRequest.request("api/api.admin.product.getList");
    return result?.items || [];
  });

  return (
    <AdminLayout current="product">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Home
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link href={"/admin/products/new_product"}>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              New product
            </button>
          </Link>
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Sản phẩm</span>
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Giá
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last updated
            </th>
            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div
                    className={classNames(
                      product.bgColorClass,
                      "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <img
                    className="max-w-none h-12 w-12 ring-2 ring-white"
                    src={product.image}
                    alt={product.title}
                  />
                  <Link href={`/admin/products/${product._id}`}>
                    <a className="truncate hover:text-gray-600">
                      <span>
                        {product.title}{" "}
                        <span className="text-gray-500 font-normal">
                          in {product.title}
                        </span>
                      </span>
                    </a>
                  </Link>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {product?.price}đ
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {product?.createdAt}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
