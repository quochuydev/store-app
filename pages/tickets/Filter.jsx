function FilterBox({ value, filter, handleChange }) {
  const { type, name, options } = filter;

  return (
    <div className="widget">
      <div className="widget-title widget-collapse mt-2">
        <h4>
          <b>{name}</b>
        </h4>
      </div>
      <div className="collapse show" id="dateposted">
        <div className="widget-content">
          {options.map((option, i) => (
            <div key={i} className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input me-2"
                defaultChecked={value?.includes(String(option.value))}
                id={type + option.value}
                value={option.value}
                onClick={(e) =>
                  handleChange(type, e.target.value, e.target.checked)
                }
              />
              <label
                className="custom-control-label"
                htmlFor={type + option.value}
              >
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Filter({ query = {}, handleChange }) {
  const filters = [
    {
      type: "shipping",
      name: "Giao nhận",
      options: [
        { value: false, name: "Lấy hàng tại nhà xe" },
        { value: true, name: "Giao hàng tận nhà" },
      ],
    },
    {
      type: "time",
      name: "Giờ xe chạy",
      options: [
        { value: 3, name: "Mờ sáng (2h - 6h)" },
        { value: 4, name: "Sáng (7h - 12h)" },
        { value: 5, name: "Trưa, chiều (1h - 5h)" },
        { value: 6, name: "Buổi tối (6h - 12h)" },
        { value: 7, name: "Nửa đêm" },
      ],
    },
    {
      type: "fee",
      name: "Giá cước",
      options: [
        { value: "", name: "Dưới 3k 1kg" },
        { value: "", name: "3k - 20kg 1kg" },
        { value: "", name: "20k - 40k 1kg" },
      ],
    },
    {
      type: "carType",
      name: "Loại xe",
      options: [
        { value: "", name: "Xe lạnh" },
        { value: "", name: "Xe khách" },
        { value: "", name: "Xe tải" },
        { value: "", name: "Tàu thuyền" },
      ],
    },
    {
      type: "brand",
      name: "Nhà xe",
      options: [
        { value: "", name: "Minh Quốc" },
        { value: "", name: "Phương Trang" },
      ],
    },
  ];
  return (
    <div className="sidebar">
      {filters.map((filter, i) => (
        <FilterBox
          key={i}
          {...{ value: query[filter.type], filter, handleChange }}
        />
      ))}
    </div>
  );
}
