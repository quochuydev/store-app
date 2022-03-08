/* eslint-disable @next/next/no-img-element */

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableComponent({ columns = [], rows = [] }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-t border-gray-200">
          {columns.map((column, i) => (
            <th
              key={i}
              className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <span className="lg:pl-2">{column.name}</span>
            </th>
          ))}
          {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span className="lg:pl-2">Sản phẩm</span>
          </th>
          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Giá
          </th>
          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last updated
          </th>
          <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" /> */}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {rows.map((row) => (
          <tr key={row._id}>
            {columns.map((column, i) => (
              <td
                key={i}
                className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500"
              >
                {column.render ? column.render(row) : row[column.id]}
              </td>
            ))}
            {/* <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
              <div className="flex items-center space-x-3 lg:pl-2">
                <div
                  className={classNames(
                    row.bgColorClass,
                    "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                  )}
                  aria-hidden="true"
                />
                <a href="#" className="truncate hover:text-gray-600">
                  <span>
                    {row.title}{" "}
                    <span className="text-gray-500 font-normal">
                      in {row.title}
                    </span>
                  </span>
                </a>
              </div>
            </td>
            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
              {row?.price}đ
            </td>
            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
              {row?.createdAt}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
              <a
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => {}}
              >
                Edit
              </a>{" "}
              <a className="text-red-600 hover:text-red-900" onClick={() => {}}>
                Archive
              </a>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
