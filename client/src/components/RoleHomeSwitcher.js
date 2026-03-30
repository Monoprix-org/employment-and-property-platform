function RoleHomeSwitcher({ currentType, onChangeType }) {
  const items = [
    { value: "rent_out", label: "For Rent" },
    { value: "sell_out", label: "For Sale" },
    { value: "rent_wanted", label: "Wanted Rent" },
    { value: "buy_wanted", label: "Wanted Buy" }
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "18px"
      }}
    >
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChangeType(item.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "999px",
            border: "1px solid #d7dce5",
            background: currentType === item.value ? "#4e54c8" : "#fff",
            color: currentType === item.value ? "#fff" : "#333",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default RoleHomeSwitcher;