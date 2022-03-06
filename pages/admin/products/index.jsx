/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { ClockIcon, HomeIcon, ViewListIcon } from "@heroicons/react/outline";
import Link from "next/link";
import axios from "@utils/axios";
import AdminLayout from "@components/admin/Layout";

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

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("api.admin.product.getList").then((result) => {
      const newProducts = result?.data || [];
      setProducts(newProducts);
    });
  }, []);

  return (
    <AdminLayout>
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
                  <a href="#" className="truncate hover:text-gray-600">
                    <span>
                      {product.title}{" "}
                      <span className="text-gray-500 font-normal">
                        in {product.title}
                      </span>
                    </span>
                  </a>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {product?.price}đ
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {product?.createdAt}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
