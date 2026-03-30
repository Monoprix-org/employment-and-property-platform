const typeLabelMap = {
  rent_out: "For Rent",
  sell_out: "For Sale",
  rent_wanted: "Wanted Rent",
  buy_wanted: "Wanted Buy"
};

const propertyTypeLabelMap = {
  apartment: "Apartment",
  house: "House",
  room: "Room",
  studio: "Studio",
  townhouse: "Townhouse",
  land: "Land",
  commercial: "Commercial",
  other: "Other"
};

function ListingCard({ listing, onView, onSave }) {
  return (
    <div style={cardStyle}>
      <div style={glowStyle} />

      <div style={imageStyle}>
        <div style={typeBadgeStyle}>
          {typeLabelMap[listing.listing_type] || "Listing"}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <h3 style={titleStyle}>{listing.title}</h3>

        <div style={priceStyle}>
          {listing.price
            ? `$${Number(listing.price).toLocaleString()}`
            : "Price on request"}
        </div>

        <div style={metaRowStyle}>
          {[listing.suburb, listing.city, listing.state]
            .filter(Boolean)
            .join(", ") || "Location not provided"}
        </div>

        <div style={chipWrapStyle}>
          <span style={chipStyle}>
            {propertyTypeLabelMap[listing.property_type] || "Property"}
          </span>
          <span style={chipStyle}>{listing.bedrooms ?? "-"} bed</span>
          <span style={chipStyle}>{listing.bathrooms ?? "-"} bath</span>
          <span style={chipStyle}>{listing.car_spaces ?? "-"} car</span>
        </div>

        <p style={descStyle}>
          {listing.description?.length > 120
            ? `${listing.description.slice(0, 120)}...`
            : listing.description}
        </p>

        <div style={actionsStyle}>
          <button onClick={() => onView(listing.id)} style={mainButtonStyle}>
            View Details
          </button>

          {onSave && (
            <button onClick={() => onSave(listing.id)} style={ghostButtonStyle}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  position: "relative",
  overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "18px",
  boxShadow: "0 18px 38px rgba(0,0,0,0.22)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  color: "#fff"
};

const glowStyle = {
  position: "absolute",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "rgba(79,70,229,0.18)",
  filter: "blur(70px)",
  top: "-50px",
  right: "-40px",
  pointerEvents: "none"
};

const imageStyle = {
  height: "180px",
  borderRadius: "18px",
  marginBottom: "16px",
  background:
    "linear-gradient(135deg, rgba(79,70,229,0.22) 0%, rgba(124,58,237,0.18) 55%, rgba(6,182,212,0.16) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "14px",
  boxSizing: "border-box",
  position: "relative",
  zIndex: 2
};

const typeBadgeStyle = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  fontWeight: "800",
  fontSize: "12px",
  letterSpacing: "0.4px",
  textTransform: "uppercase"
};

const titleStyle = {
  marginTop: 0,
  marginBottom: "10px",
  fontSize: "24px",
  fontWeight: "800",
  lineHeight: 1.2
};

const priceStyle = {
  marginBottom: "10px",
  color: "#8be9f7",
  fontWeight: "800",
  fontSize: "22px"
};

const metaRowStyle = {
  color: "rgba(255,255,255,0.72)",
  marginBottom: "12px",
  lineHeight: 1.6
};

const chipWrapStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "14px"
};

const chipStyle = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "700"
};

const descStyle = {
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.75,
  minHeight: "58px",
  marginBottom: "16px"
};

const actionsStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const mainButtonStyle = {
  padding: "11px 16px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "800",
  boxShadow: "0 14px 26px rgba(79,70,229,0.26)"
};

const ghostButtonStyle = {
  padding: "11px 16px",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "700"
};

export default ListingCard;