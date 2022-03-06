/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const productList = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export default function ProductList({ products = [] }) {
  return (
    <div className="bg-white">
      <div className="mx-auto p-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          LATEST PRODUCTS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/products/${product._id}`}>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
              </Link>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-gray-700">
                    <Link href={`/products/${product._id}`}>
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}đ
                  {/* <span style={{
                      textDecoration:'line-through'
                    }}>{product.price}đ
                    </span> */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
