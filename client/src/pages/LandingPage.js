import React from "react";

function LandingPage({ onLoginClick, onRegisterClick }) {
  return (
    <div style={pageStyle}>
      <div style={bgGlowOne} />
      <div style={bgGlowTwo} />

      <div style={navStyle}>
        <div style={brandWrapStyle}>
          <div style={logoBoxStyle}>M</div>
          <div>
            <div style={brandTitleStyle}>MONOPRIX CONSULTING AUSTRALIA</div>
            <div style={brandSubStyle}>PTY LTD</div>
          </div>
        </div>

        <div style={navButtonGroupStyle}>
          <button style={ghostButtonStyle} onClick={onLoginClick}>
            Login
          </button>
          <button style={primaryButtonStyle} onClick={onRegisterClick}>
            Register
          </button>
        </div>
      </div>

      <div style={heroSectionStyle}>
        <div style={heroLeftStyle}>
          <div style={badgeStyle}>Digital Platform • Recruitment • Property Marketplace</div>

          <h1 style={heroTitleStyle}>
            Professional Services,
            <br />
            Digital Solutions,
            <br />
            Smarter Local Connections
          </h1>

          <p style={heroDescStyle}>
            Monoprix Consulting Australia Pty Ltd connects people, businesses,
            jobs, homes, and local opportunities through one modern platform.
          </p>

          <div style={ctaWrapStyle}>
            <button style={primaryButtonLargeStyle} onClick={onRegisterClick}>
              Get Started
            </button>
            <button style={secondaryButtonLargeStyle} onClick={onLoginClick}>
              Sign In
            </button>
          </div>

          <div style={heroStatsWrapStyle}>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>2-in-1</div>
              <div style={statLabelStyle}>Recruitment + Property</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>Local</div>
              <div style={statLabelStyle}>Darwin-focused platform</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>Smart</div>
              <div style={statLabelStyle}>Modern digital workflow</div>
            </div>
          </div>
        </div>

        <div style={heroRightStyle}>
          <div style={infoCardStyle}>
            <h3 style={cardTitleStyle}>Company Information</h3>

            <div style={infoListStyle}>
              <div><strong>Company:</strong> MONOPRIX CONSULTING AUSTRALIA PTY LTD</div>
              <div><strong>Address:</strong> 17 Pelican Cres Wulagi, NT 0810</div>
              <div><strong>Phone:</strong> +61 400 065 142</div>
              <div><strong>Website:</strong> www.monoprixconsulting.com</div>
              <div><strong>ABN:</strong> 52 620 004 757</div>
            </div>
          </div>

          <div style={infoCardStyle}>
            <h3 style={cardTitleStyle}>Core Services</h3>
            <ul style={serviceListStyle}>
              <li>Professional Services & Labour Supply</li>
              <li>Innovation via Digital Solutions</li>
              <li>Sustainable Hardware Supply</li>
              <li>Development & Platform Solutions</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionBadgeStyle}>Platform Modules</div>
          <h2 style={sectionTitleStyle}>One platform, two core ecosystems</h2>
          <p style={sectionDescStyle}>
            Serve job seekers, employers, customers, and property owners in one unified digital experience.
          </p>
        </div>

        <div style={featureGridStyle}>
          <div style={featureCardStyle}>
            <div style={featureIconStyle}>💼</div>
            <h3 style={featureTitleStyle}>Recruitment Portal</h3>
            <p style={featureTextStyle}>
              Employers can post jobs and manage applicants. Workers can browse
              roles, apply quickly, and track opportunities in one place.
            </p>
          </div>

          <div style={featureCardStyle}>
            <div style={featureIconStyle}>🏠</div>
            <h3 style={featureTitleStyle}>Property Marketplace</h3>
            <p style={featureTextStyle}>
              Property owners can post rental or sale listings. Customers can
              browse homes, save favorites, and publish wanted ads.
            </p>
          </div>

          <div style={featureCardStyle}>
            <div style={featureIconStyle}>⚡</div>
            <h3 style={featureTitleStyle}>Fast Digital Workflow</h3>
            <p style={featureTextStyle}>
              Clean dashboards, modern UI, inquiries, favorites, and smart role-based
              access for a more efficient experience.
            </p>
          </div>
        </div>
      </div>

      <div style={finalCtaSectionStyle}>
        <div style={finalCtaCardStyle}>
          <h2 style={finalTitleStyle}>Ready to explore the platform?</h2>
          <p style={finalDescStyle}>
            Create an account to access recruitment services, property listings,
            and local marketplace features.
          </p>

          <div style={ctaWrapStyle}>
            <button style={primaryButtonLargeStyle} onClick={onRegisterClick}>
              Create Account
            </button>
            <button style={secondaryButtonLargeStyle} onClick={onLoginClick}>
              Login
            </button>
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
    "radial-gradient(circle at top left, rgba(34,211,238,0.12), transparent 25%), radial-gradient(circle at top right, rgba(139,92,246,0.18), transparent 24%), linear-gradient(135deg, #0b1020 0%, #111827 45%, #0f172a 100%)",
  color: "#ffffff",
  fontFamily: "Arial, sans-serif",
  padding: "24px"
};

const bgGlowOne = {
  position: "absolute",
  width: "360px",
  height: "360px",
  borderRadius: "50%",
  background: "rgba(34,211,238,0.16)",
  filter: "blur(80px)",
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
  filter: "blur(100px)",
  bottom: "-120px",
  right: "-120px",
  pointerEvents: "none"
};

const navStyle = {
  maxWidth: "1280px",
  margin: "0 auto 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  padding: "14px 18px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
  position: "relative",
  zIndex: 1
};

const brandWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

const logoBoxStyle = {
  width: "52px",
  height: "52px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "24px",
  color: "#fff",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  boxShadow: "0 12px 28px rgba(79,70,229,0.35)"
};

const brandTitleStyle = {
  fontSize: "16px",
  fontWeight: "800",
  letterSpacing: "0.4px"
};

const brandSubStyle = {
  fontSize: "14px",
  opacity: 0.8,
  letterSpacing: "0.4px"
};

const navButtonGroupStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap"
};

const heroSectionStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.35fr 0.95fr",
  gap: "24px",
  alignItems: "stretch",
  position: "relative",
  zIndex: 1
};

const heroLeftStyle = {
  padding: "42px",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 48px rgba(0,0,0,0.24)"
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(34,211,238,0.12)",
  border: "1px solid rgba(34,211,238,0.22)",
  color: "#9ae6f2",
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "18px"
};

const heroTitleStyle = {
  margin: 0,
  fontSize: "56px",
  lineHeight: 1.05,
  fontWeight: "800",
  letterSpacing: "-1px"
};

const heroDescStyle = {
  marginTop: "20px",
  maxWidth: "760px",
  color: "rgba(255,255,255,0.78)",
  fontSize: "18px",
  lineHeight: 1.75
};

const ctaWrapStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "28px"
};

const heroStatsWrapStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "14px",
  marginTop: "30px"
};

const statCardStyle = {
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const statNumberStyle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#ffffff"
};

const statLabelStyle = {
  marginTop: "8px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "14px"
};

const heroRightStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const infoCardStyle = {
  padding: "28px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 48px rgba(0,0,0,0.24)"
};

const cardTitleStyle = {
  marginTop: 0,
  marginBottom: "18px",
  fontSize: "24px",
  fontWeight: "800"
};

const infoListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  color: "rgba(255,255,255,0.82)",
  lineHeight: 1.7
};

const serviceListStyle = {
  margin: 0,
  paddingLeft: "20px",
  color: "rgba(255,255,255,0.82)",
  lineHeight: 2
};

const sectionStyle = {
  maxWidth: "1280px",
  margin: "32px auto 0",
  position: "relative",
  zIndex: 1
};

const sectionHeaderStyle = {
  textAlign: "center",
  marginBottom: "22px"
};

const sectionBadgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(139,92,246,0.12)",
  border: "1px solid rgba(139,92,246,0.22)",
  color: "#d8b4fe",
  fontSize: "13px",
  fontWeight: "700"
};

const sectionTitleStyle = {
  marginTop: "18px",
  marginBottom: "10px",
  fontSize: "38px",
  fontWeight: "800"
};

const sectionDescStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.72)",
  fontSize: "17px"
};

const featureGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "20px"
};

const featureCardStyle = {
  padding: "28px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 48px rgba(0,0,0,0.22)"
};

const featureIconStyle = {
  fontSize: "34px",
  marginBottom: "12px"
};

const featureTitleStyle = {
  marginTop: 0,
  marginBottom: "12px",
  fontSize: "24px",
  fontWeight: "800"
};

const featureTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.8
};

const finalCtaSectionStyle = {
  maxWidth: "1280px",
  margin: "32px auto 0",
  paddingBottom: "30px",
  position: "relative",
  zIndex: 1
};

const finalCtaCardStyle = {
  padding: "38px",
  borderRadius: "28px",
  textAlign: "center",
  background: "linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.16) 50%, rgba(6,182,212,0.14) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 48px rgba(0,0,0,0.24)"
};

const finalTitleStyle = {
  marginTop: 0,
  marginBottom: "12px",
  fontSize: "36px",
  fontWeight: "800"
};

const finalDescStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.75)",
  fontSize: "17px",
  lineHeight: 1.8
};

const primaryButtonStyle = {
  padding: "11px 18px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  fontWeight: "700",
  color: "#fff",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  boxShadow: "0 12px 28px rgba(79,70,229,0.35)"
};

const ghostButtonStyle = {
  padding: "11px 18px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.14)",
  cursor: "pointer",
  fontWeight: "700",
  color: "#fff",
  background: "rgba(255,255,255,0.06)"
};

const primaryButtonLargeStyle = {
  padding: "14px 24px",
  borderRadius: "16px",
  border: "none",
  cursor: "pointer",
  fontWeight: "800",
  fontSize: "16px",
  color: "#fff",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  boxShadow: "0 16px 36px rgba(79,70,229,0.35)"
};

const secondaryButtonLargeStyle = {
  padding: "14px 24px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.14)",
  cursor: "pointer",
  fontWeight: "800",
  fontSize: "16px",
  color: "#fff",
  background: "rgba(255,255,255,0.06)"
};

export default LandingPage;