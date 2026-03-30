function InquiryCard({ item, isOwner = false }) {
  return (
    <div style={cardStyle}>
      <div style={glowStyle} />

      <div style={headerStyle}>
        <div>
          <div style={badgeStyle}>{isOwner ? "Received Inquiry" : "Sent Inquiry"}</div>
          <h3 style={titleStyle}>{item.title || "Listing"}</h3>
        </div>

        <div style={statusChipStyle}>
          {item.status || "new"}
        </div>
      </div>

      <div style={infoGridStyle}>
        {isOwner && (
          <div style={infoCardStyle}>
            <div style={labelStyle}>Sender</div>
            <div style={valueStyle}>
              {item.sender_name || item.sender_email || "Unknown"}
            </div>
          </div>
        )}

        {!isOwner && (
          <div style={infoCardStyle}>
            <div style={labelStyle}>Type</div>
            <div style={valueStyle}>{item.listing_type || "N/A"}</div>
          </div>
        )}

        <div style={infoCardStyle}>
          <div style={labelStyle}>Phone</div>
          <div style={valueStyle}>{item.phone || "N/A"}</div>
        </div>

        <div style={infoCardStyle}>
          <div style={labelStyle}>Created</div>
          <div style={valueStyle}>
            {item.created_at ? new Date(item.created_at).toLocaleString() : "N/A"}
          </div>
        </div>
      </div>

      <div style={messageCardStyle}>
        <div style={messageTitleStyle}>Message</div>
        <p style={messageTextStyle}>{item.message || "No message"}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  position: "relative",
  overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 16px 34px rgba(0,0,0,0.22)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  marginBottom: "16px"
};

const glowStyle = {
  position: "absolute",
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  background: "rgba(6,182,212,0.16)",
  filter: "blur(65px)",
  top: "-40px",
  right: "-30px",
  pointerEvents: "none"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  alignItems: "flex-start",
  flexWrap: "wrap",
  marginBottom: "16px",
  position: "relative",
  zIndex: 2
};

const badgeStyle = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: "999px",
  background: "rgba(124,58,237,0.14)",
  border: "1px solid rgba(124,58,237,0.2)",
  color: "#d8b4fe",
  fontSize: "12px",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  marginBottom: "10px"
};

const titleStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  color: "#fff"
};

const statusChipStyle = {
  padding: "9px 13px",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg, rgba(79,70,229,0.22) 0%, rgba(124,58,237,0.18) 55%, rgba(6,182,212,0.16) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontWeight: "800",
  fontSize: "14px",
  textTransform: "capitalize"
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  position: "relative",
  zIndex: 2
};

const infoCardStyle = {
  padding: "14px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const labelStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "12px",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.4px"
};

const valueStyle = {
  color: "#fff",
  fontWeight: "700",
  lineHeight: 1.5,
  wordBreak: "break-word"
};

const messageCardStyle = {
  marginTop: "16px",
  padding: "16px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  position: "relative",
  zIndex: 2
};

const messageTitleStyle = {
  color: "#fff",
  fontWeight: "800",
  marginBottom: "10px"
};

const messageTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.7
};

export default InquiryCard;