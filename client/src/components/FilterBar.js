function FilterBar({ filters, setFilters, onSearch, onReset }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
        border: "1px solid #edf0f6",
        marginBottom: "22px"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px"
        }}
      >
        <input
          placeholder="Keyword"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="City / Suburb"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          style={inputStyle}
        />

        <select
          value={filters.propertyType}
          onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
          style={inputStyle}
        >
          <option value="">All property types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="room">Room</option>
          <option value="studio">Studio</option>
          <option value="townhouse">Townhouse</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
          <option value="other">Other</option>
        </select>

        <input
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={onSearch} style={mainButtonStyle}>
          Search
        </button>

        <button onClick={onReset} style={ghostButtonStyle}>
          Reset
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d7dce5",
  outline: "none",
  fontSize: "15px",
  background: "#fff"
};

const mainButtonStyle = {
  padding: "11px 16px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "700"
};

const ghostButtonStyle = {
  padding: "11px 16px",
  border: "1px solid #d7dce5",
  borderRadius: "12px",
  background: "#fff",
  color: "#333",
  cursor: "pointer",
  fontWeight: "700"
};

export default FilterBar;