function ApplicantCard({ applicant }) {
  return (
    <div style={cardStyle}>
      <div style={glowStyle} />

      <div style={headerStyle}>
        <div>
          <div style={badgeStyle}>Applicant</div>
          <h3 style={nameStyle}>{applicant.name || "Unnamed Applicant"}</h3>
        </div>

        <div style={statusChipStyle}>
          {applicant.status || "applied"}
        </div>
      </div>

      <div style={infoGridStyle}>
        <div style={infoCardStyle}>
          <div style={infoLabelStyle}>Email</div>
          <div style={infoValueStyle}>{applicant.email || "N/A"}</div>
        </div>

        <div style={infoCardStyle}>
          <div style={infoLabelStyle}>Phone</div>
          <div style={infoValueStyle}>{applicant.phone || "N/A"}</div>
        </div>

        <div style={infoCardStyle}>
          <div style={infoLabelStyle}>Applied At</div>
          <div style={infoValueStyle}>
            {applicant.created_at
              ? new Date(applicant.created_at).toLocaleString()
              : "N/A"}
          </div>
        </div>
      </div>

      {applicant.cover_letter && (
        <div style={subCardStyle}>
          <div style={subTitleStyle}>Cover Letter</div>
          <p style={coverTextStyle}>{applicant.cover_letter}</p>
        </div>
      )}

      {applicant.resume_url && (
        <a
          href={`http://localhost:5000/uploads/${applicant.resume_url}`}
          target="_blank"
          rel="noreferrer"
          style={resumeButtonStyle}
        >
          Download Resume
        </a>
      )}
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
  marginBottom: "16px",
  color: "#fff"
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
  position: "relative",
  zIndex: 2,
  marginBottom: "16px"
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
  letterSpacing: "0.4px",
  textTransform: "uppercase",
  marginBottom: "10px"
};

const nameStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  color: "#fff"
};

const statusChipStyle = {
  padding: "9px 13px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, rgba(79,70,229,0.22) 0%, rgba(124,58,237,0.18) 55%, rgba(6,182,212,0.16) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontWeight: "800",
  fontSize: "14px",
  whiteSpace: "nowrap",
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

const infoLabelStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "12px",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.4px"
};

const infoValueStyle = {
  color: "#fff",
  fontWeight: "700",
  lineHeight: 1.5,
  wordBreak: "break-word"
};

const subCardStyle = {
  marginTop: "16px",
  padding: "16px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  position: "relative",
  zIndex: 2
};

const subTitleStyle = {
  color: "#fff",
  fontWeight: "800",
  marginBottom: "10px"
};

const coverTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.7
};

const resumeButtonStyle = {
  display: "inline-block",
  marginTop: "16px",
  padding: "11px 16px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#fff",
  fontWeight: "800",
  background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
  boxShadow: "0 12px 22px rgba(37,99,235,0.24)"
};

export default ApplicantCard;