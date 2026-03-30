import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMsg("");

      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLogin(data.token);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Request failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={bgGlowOne} />
      <div style={bgGlowTwo} />

      <div style={layoutStyle}>
        <div style={leftPanelStyle}>
          <div style={badgeStyle}>Secure Access Portal</div>

          <h1 style={heroTitleStyle}>
            Welcome back to the
            <br />
            Monoprix platform
          </h1>

          <p style={heroDescStyle}>
            Sign in to access recruitment services, property listings,
            marketplace dashboards, and role-based tools through one modern
            digital ecosystem.
          </p>

          <div style={infoGridStyle}>
            <div style={infoCardStyle}>
              <div style={infoTitleStyle}>Recruitment</div>
              <div style={infoTextStyle}>
                Jobs, applicants, and employer workflows
              </div>
            </div>

            <div style={infoCardStyle}>
              <div style={infoTitleStyle}>Marketplace</div>
              <div style={infoTextStyle}>
                Listings, favorites, inquiries, and local property access
              </div>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={cardGlowStyle} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={cardHeaderStyle}>
              <div style={miniLogoStyle}>M</div>
              <div>
                <h2 style={titleStyle}>Sign In</h2>
                <p style={subtitleStyle}>
                  Access your account securely
                </p>
              </div>
            </div>

            {errorMsg && <div style={errorBoxStyle}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} style={formStyle}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={primaryButtonStyle}>
                Login
              </button>
            </form>

            <div style={footerNoteStyle}>
              Secure role-based access for workers, employers, customers, and property owners.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  background:
    "radial-gradient(circle at top left, rgba(34,211,238,0.10), transparent 25%), radial-gradient(circle at bottom right, rgba(139,92,246,0.16), transparent 25%), linear-gradient(135deg, #0b1020 0%, #111827 45%, #0f172a 100%)",
  fontFamily: "Arial, sans-serif",
  padding: "28px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const bgGlowOne = {
  position: "absolute",
  width: "340px",
  height: "340px",
  borderRadius: "50%",
  background: "rgba(34,211,238,0.14)",
  filter: "blur(90px)",
  top: "-80px",
  left: "-100px",
  pointerEvents: "none"
};

const bgGlowTwo = {
  position: "absolute",
  width: "420px",
  height: "420px",
  borderRadius: "50%",
  background: "rgba(139,92,246,0.16)",
  filter: "blur(110px)",
  bottom: "-140px",
  right: "-120px",
  pointerEvents: "none"
};

const layoutStyle = {
  width: "100%",
  maxWidth: "1260px",
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: "28px",
  alignItems: "stretch",
  position: "relative",
  zIndex: 1
};

const leftPanelStyle = {
  padding: "34px",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 20px 46px rgba(0,0,0,0.24)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(34,211,238,0.12)",
  border: "1px solid rgba(34,211,238,0.2)",
  color: "#9ae6f2",
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "18px",
  alignSelf: "flex-start"
};

const heroTitleStyle = {
  margin: 0,
  color: "#fff",
  fontSize: "52px",
  lineHeight: 1.04,
  fontWeight: "800",
  letterSpacing: "-1px"
};

const heroDescStyle = {
  marginTop: "18px",
  color: "rgba(255,255,255,0.76)",
  fontSize: "17px",
  lineHeight: 1.85,
  maxWidth: "650px"
};

const infoGridStyle = {
  marginTop: "24px",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px"
};

const infoCardStyle = {
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const infoTitleStyle = {
  color: "#fff",
  fontWeight: "800",
  marginBottom: "8px",
  fontSize: "16px"
};

const infoTextStyle = {
  color: "rgba(255,255,255,0.7)",
  lineHeight: 1.7,
  fontSize: "14px"
};

const cardStyle = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.26)",
  padding: "34px",
  display: "flex",
  alignItems: "center"
};

const cardGlowStyle = {
  position: "absolute",
  width: "220px",
  height: "220px",
  borderRadius: "50%",
  background: "rgba(79,70,229,0.18)",
  filter: "blur(80px)",
  top: "-50px",
  right: "-60px",
  pointerEvents: "none"
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "24px"
};

const miniLogoStyle = {
  width: "54px",
  height: "54px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "24px",
  color: "#fff",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  boxShadow: "0 14px 30px rgba(79,70,229,0.34)"
};

const titleStyle = {
  margin: 0,
  color: "#fff",
  fontSize: "30px",
  fontWeight: "800"
};

const subtitleStyle = {
  marginTop: "6px",
  marginBottom: 0,
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px"
};

const errorBoxStyle = {
  marginBottom: "18px",
  padding: "12px 14px",
  borderRadius: "14px",
  background: "rgba(255, 77, 79, 0.16)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(10px)",
  fontSize: "14px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px"
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#fff",
  fontWeight: "700",
  fontSize: "14px"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.12)",
  outline: "none",
  fontSize: "15px",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  backdropFilter: "blur(12px)"
};

const primaryButtonStyle = {
  marginTop: "6px",
  padding: "15px 18px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  color: "#fff",
  fontWeight: "800",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 16px 34px rgba(79,70,229,0.34)"
};

const footerNoteStyle = {
  marginTop: "18px",
  color: "rgba(255,255,255,0.62)",
  fontSize: "13px",
  lineHeight: 1.7
};

export default Login;