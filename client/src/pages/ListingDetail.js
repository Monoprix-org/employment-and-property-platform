import { useEffect, useState } from "react";

const typeLabelMap = {
  rent_out: "For Rent",
  sell_out: "For Sale",
  rent_wanted: "Wanted Rent",
  buy_wanted: "Wanted Buy"
};

function ListingDetail({ token, user, listingId, setPage, onLogout }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      if (!listingId) {
        setLoading(false);
        setErrorMsg("No listing selected.");
        return;
      }

      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(`http://localhost:5000/listings/${listingId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch listing");
        }

        setListing(data);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || "Failed to fetch listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleInquiry = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          listing_id: listingId,
          message,
          phone
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send inquiry");
      }

      alert(data.message || "Inquiry sent successfully");
      setMessage("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send inquiry");
    }
  };

  const toggleFavorite = async () => {
    try {
      const res = await fetch(`http://localhost:5000/favorites/${listingId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      alert(data.message || "Updated favorites");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update favorite");
    }
  };

  if (loading) {
    return (
      <div style={pageWrapStyle}>
        <div style={glassCardStyle}>Loading listing details...</div>
      </div>
    );
  }

  if (errorMsg || !listing) {
    return (
      <div style={pageWrapStyle}>
        <div style={glassCardStyle}>
          <p style={{ color: "#fff" }}>{errorMsg || "Listing not found."}</p>
          <button style={mainButtonStyle} onClick={() => setPage("marketplace-home")}>
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isOwnListing = Number(listing.user_id) === Number(user.id);

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>
            {typeLabelMap[listing.listing_type] || "Listing"}
          </div>
          <h1 style={heroTitleStyle}>{listing.title}</h1>
          <p style={heroDescStyle}>
            {[listing.address_line, listing.suburb, listing.city, listing.state, listing.postcode]
              .filter(Boolean)
              .join(", ") || "Location not provided"}
          </p>
        </div>

        <div style={heroActionsStyle}>
          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-home")}>
            Back to Home
          </button>

          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-dashboard")}>
            Dashboard
          </button>

          <button style={mainButtonStyle} onClick={toggleFavorite}>
            Save to Favorites
          </button>

          <button style={dangerButtonStyle} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={detailGridStyle}>
        <div>
          <div style={imageHeroStyle}>
            <div style={typeChipStyle}>
              {typeLabelMap[listing.listing_type] || "Listing"}
            </div>
          </div>

          <div style={glassCardStyle}>
            <div style={priceStyle}>
              {listing.price
                ? `$${Number(listing.price).toLocaleString()}`
                : "Price on request"}
            </div>

            <div style={chipWrapStyle}>
              <span style={chipStyle}>{listing.property_type || "Property"}</span>
              <span style={chipStyle}>{listing.bedrooms ?? "-"} bed</span>
              <span style={chipStyle}>{listing.bathrooms ?? "-"} bath</span>
              <span style={chipStyle}>{listing.car_spaces ?? "-"} car</span>
              <span style={chipStyle}>{listing.area_size ?? "-"} sqm</span>
              <span style={chipStyle}>{listing.status || "active"}</span>
            </div>

            <h3 style={sectionTitleStyle}>Description</h3>
            <p style={descriptionStyle}>{listing.description}</p>
          </div>
        </div>

        <div>
          <div style={glassCardStyle}>
            <h3 style={sectionTitleStyle}>Contact Information</h3>

            <div style={infoStackStyle}>
              <div><strong>Name:</strong> {listing.contact_name || listing.author_name || "Not provided"}</div>
              <div><strong>Phone:</strong> {listing.contact_phone || listing.author_phone || "Not provided"}</div>
              <div><strong>Posted by:</strong> {listing.author_name || "Unknown"}</div>
            </div>
          </div>

          {!isOwnListing && (
            <div style={glassCardStyle}>
              <h3 style={sectionTitleStyle}>Send Inquiry</h3>

              <form onSubmit={handleInquiry} style={formStyle}>
                <input
                  placeholder="Your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={techInputStyle}
                />

                <textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6"
                  required
                  style={{ ...techInputStyle, resize: "vertical", minHeight: "140px" }}
                />

                <button type="submit" style={mainButtonStyle}>
                  Send Inquiry
                </button>
              </form>
            </div>
          )}

          {isOwnListing && (
            <div style={glassCardStyle}>
              <h3 style={sectionTitleStyle}>Your Listing</h3>
              <p style={descriptionStyle}>
                This ad belongs to you. Manage status and details from your dashboard.
              </p>
              <button style={mainButtonStyle} onClick={() => setPage("marketplace-dashboard")}>
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const pageWrapStyle = {
  maxWidth: "1240px",
  margin: "26px auto 40px",
  padding: "0 20px"
};

const heroCardStyle = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "28px",
  padding: "34px",
  marginBottom: "22px",
  background:
    "linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.16) 45%, rgba(6,182,212,0.12) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 22px 50px rgba(0,0,0,0.24)"
};

const heroGlowOne = {
  position: "absolute",
  width: "260px",
  height: "260px",
  borderRadius: "50%",
  background: "rgba(34,211,238,0.16)",
  filter: "blur(80px)",
  top: "-90px",
  right: "6%"
};

const heroGlowTwo = {
  position: "absolute",
  width: "240px",
  height: "240px",
  borderRadius: "50%",
  background: "rgba(139,92,246,0.18)",
  filter: "blur(90px)",
  bottom: "-100px",
  left: "-50px"
};

const heroBadgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#c4b5fd",
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "16px"
};

const heroTitleStyle = {
  margin: 0,
  color: "#fff",
  fontSize: "40px",
  lineHeight: 1.1,
  fontWeight: "800",
  letterSpacing: "-0.6px"
};

const heroDescStyle = {
  marginTop: "14px",
  maxWidth: "760px",
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.8,
  fontSize: "16px"
};

const heroActionsStyle = {
  marginTop: "24px",
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  position: "relative",
  zIndex: 2
};

const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "1.65fr 1fr",
  gap: "20px",
  alignItems: "start"
};

const imageHeroStyle = {
  height: "340px",
  borderRadius: "24px",
  marginBottom: "18px",
  background:
    "linear-gradient(135deg, rgba(79,70,229,0.22) 0%, rgba(124,58,237,0.18) 55%, rgba(6,182,212,0.16) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "18px",
  boxSizing: "border-box",
  boxShadow: "0 18px 38px rgba(0,0,0,0.22)"
};

const typeChipStyle = {
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

const glassCardStyle = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 18px 38px rgba(0,0,0,0.22)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  marginBottom: "18px"
};

const priceStyle = {
  color: "#8be9f7",
  fontWeight: "800",
  fontSize: "28px",
  marginBottom: "14px"
};

const chipWrapStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "18px"
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

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#fff",
  fontSize: "22px",
  fontWeight: "800"
};

const descriptionStyle = {
  color: "rgba(255,255,255,0.76)",
  lineHeight: 1.8,
  margin: 0
};

const infoStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  color: "rgba(255,255,255,0.8)",
  lineHeight: 1.7
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const techInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  outline: "none",
  fontSize: "15px",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  backdropFilter: "blur(10px)"
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

const dangerButtonStyle = {
  padding: "11px 16px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #fb7185 0%, #ff6b6b 100%)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "700",
  boxShadow: "0 12px 22px rgba(251,113,133,0.22)"
};

export default ListingDetail;