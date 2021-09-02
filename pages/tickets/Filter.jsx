function FilterBox({ filter }) {
  const { name, options } = filter;

  return (
    <div className="widget">
      <div className="widget-title widget-collapse mt-2">
        <h4>
          <b>{name}</b>
        </h4>
      </div>
      <div className="collapse show" id="dateposted">
        <div className="widget-content">
          {options.map((e, i) => (
            <div key={i} className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input me-2"
                id="dateposted1"
              />
              <label className="custom-control-label" htmlFor="dateposted1">
                {e.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Filter() {
  const filters = [
    {
      name: "Giao nhận",
      options: [
        { value: "", name: "Lấy hàng tận nhà" },
        { value: "", name: "Giao hàng tại nhà" },
      ],
    },
    {
      name: "Giờ xe chạy",
      options: [
        { value: "", name: "Mờ sáng (2h - 6h)" },
        { value: "", name: "Sáng (7h - 12h)" },
        { value: "", name: "Trưa, chiều (1h - 5h)" },
        { value: "", name: "Buổi tối (6h - 12h)" },
        { value: "", name: "Nửa đêm" },
      ],
    },
    {
      name: "Giá cước",
      options: [
        { value: "", name: "Dưới 3k 1kg" },
        { value: "", name: "3k - 20kg 1kg" },
        { value: "", name: "20k - 40k 1kg" },
      ],
    },
    {
      name: "Loại xe",
      options: [
        { value: "", name: "Xe lạnh" },
        { value: "", name: "Xe khách" },
        { value: "", name: "Xe tải" },
        { value: "", name: "Tàu thuyền" },
      ],
    },
    {
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
        <FilterBox key={i} {...{ filter }} />
      ))}
    </div>
  );
}
