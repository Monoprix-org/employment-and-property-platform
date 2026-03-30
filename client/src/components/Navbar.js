function Navbar({ user, onLogout, setPage }) {
  return (
    <div style={navOuterStyle}>
      <div style={glowLeftStyle} />
      <div style={glowRightStyle} />

      <div style={navInnerStyle}>
        <div style={brandWrapStyle}>
          <div style={logoStyle}>M</div>

          <div>
            <div style={brandTitleStyle}>MONOPRIX JOB NETWORK</div>
            <div style={brandSubStyle}>Recruitment Dashboard</div>
          </div>
        </div>

        <div style={navRightStyle}>
          <div style={navTabsStyle}>
            <button onClick={() => setPage("jobs")} style={tabButtonStyle}>
              Jobs
            </button>

            <button onClick={() => setPage("dashboard")} style={tabButtonStyle}>
              Dashboard
            </button>
          </div>

          <div style={userChipStyle}>
            <div style={userAvatarStyle}>
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={userNameStyle}>{user?.name || "User"}</div>
              <div style={userRoleStyle}>{user?.role || "role"}</div>
            </div>
          </div>

          <button onClick={onLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const navOuterStyle = {
  position: "sticky",
  top: 0,
  zIndex: 40,
  width: "100%",
  padding: "18px 20px 0",
  boxSizing: "border-box"
};

const navInnerStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  padding: "14px 18px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
  position: "relative",
  overflow: "hidden"
};

const glowLeftStyle = {
  position: "absolute",
  top: "-10px",
  left: "6%",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "rgba(34,211,238,0.18)",
  filter: "blur(70px)",
  pointerEvents: "none"
};

const glowRightStyle = {
  position: "absolute",
  top: "-10px",
  right: "8%",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "rgba(139,92,246,0.18)",
  filter: "blur(80px)",
  pointerEvents: "none"
};

const brandWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  position: "relative",
  zIndex: 2
};

const logoStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "22px",
  color: "#fff",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  boxShadow: "0 12px 28px rgba(79,70,229,0.35)"
};

const brandTitleStyle = {
  color: "#fff",
  fontWeight: "800",
  fontSize: "16px",
  letterSpacing: "0.4px"
};

const brandSubStyle = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "13px",
  marginTop: "4px"
};

const navRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  position: "relative",
  zIndex: 2
};

const navTabsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap"
};

const tabButtonStyle = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 18px rgba(0,0,0,0.18)"
};

const userChipStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const userAvatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "800"
};

const userNameStyle = {
  color: "#fff",
  fontWeight: "700",
  fontSize: "14px"
};

const userRoleStyle = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "12px",
  textTransform: "capitalize"
};

const logoutButtonStyle = {
  border: "none",
  background: "linear-gradient(135deg, #fb7185 0%, #ff6b6b 100%)",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(251,113,133,0.28)"
};

export default Navbar;