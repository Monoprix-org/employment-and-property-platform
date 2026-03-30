import { useMemo, useState } from "react";

function PostListing({ token, user, setPage, onLogout }) {
  const listingTypeOptions = useMemo(() => {
    if (user.role === "property_owner") {
      return [
        { value: "rent_out", label: "For Rent" },
        { value: "sell_out", label: "For Sale" }
      ];
    }

    return [
      { value: "rent_wanted", label: "Wanted Rent" },
      { value: "buy_wanted", label: "Wanted Buy" }
    ];
  }, [user.role]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    listing_type: user.role === "property_owner" ? "rent_out" : "rent_wanted",
    property_type: "apartment",
    price: "",
    suburb: "",
    city: "",
    state: "",
    postcode: "",
    address_line: "",
    bedrooms: "",
    bathrooms: "",
    car_spaces: "",
    area_size: "",
    contact_name: user.name || "",
    contact_phone: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        car_spaces: form.car_spaces ? Number(form.car_spaces) : null,
        area_size: form.area_size ? Number(form.area_size) : null
      };

      const res = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create listing");
      }

      alert(data.message || "Listing created successfully");
      setPage("marketplace-dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>
            {user.role === "property_owner" ? "Publish Property Listing" : "Publish Wanted Ad"}
          </div>
          <h1 style={heroTitleStyle}>
            {user.role === "property_owner"
              ? "Launch a new property listing"
              : "Post what you're looking for"}
          </h1>
          <p style={heroDescStyle}>
            Create a clean, high-visibility listing with the details people need to respond quickly.
          </p>
        </div>

        <div style={heroActionsStyle}>
          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-home")}>
            Home
          </button>

          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-dashboard")}>
            Dashboard
          </button>

          <button style={dangerButtonStyle} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={formCardStyle}>
        <form onSubmit={handleSubmit} style={formGridStyle}>
          <div style={fullWidthStyle}>
            <label style={labelStyle}>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. 2-bedroom apartment in Darwin City"
              required
              style={techInputStyle}
            />
          </div>

          <div style={fullWidthStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write more details..."
              rows="6"
              required
              style={{ ...techInputStyle, resize: "vertical", minHeight: "140px" }}
            />
          </div>

          <div>
            <label style={labelStyle}>Listing Type</label>
            <select
              value={form.listing_type}
              onChange={(e) => setForm({ ...form, listing_type: e.target.value })}
              style={techInputStyle}
            >
              {listingTypeOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Property Type</label>
            <select
              value={form.property_type}
              onChange={(e) => setForm({ ...form, property_type: e.target.value })}
              style={techInputStyle}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="room">Room</option>
              <option value="studio">Studio</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Price</label>
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 450"
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Suburb</label>
            <input
              value={form.suburb}
              onChange={(e) => setForm({ ...form, suburb: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>State</label>
            <input
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Postcode</label>
            <input
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Address Line</label>
            <input
              value={form.address_line}
              onChange={(e) => setForm({ ...form, address_line: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Bedrooms</label>
            <input
              value={form.bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Bathrooms</label>
            <input
              value={form.bathrooms}
              onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Car Spaces</label>
            <input
              value={form.car_spaces}
              onChange={(e) => setForm({ ...form, car_spaces: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Area Size (sqm)</label>
            <input
              value={form.area_size}
              onChange={(e) => setForm({ ...form, area_size: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact Name</label>
            <input
              value={form.contact_name}
              onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact Phone</label>
            <input
              value={form.contact_phone}
              onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
              style={techInputStyle}
            />
          </div>

          <div style={fullWidthStyle}>
            <button type="submit" style={mainButtonStyle} disabled={submitting}>
              {submitting ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
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

const formCardStyle = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 18px 38px rgba(0,0,0,0.22)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)"
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
};

const fullWidthStyle = {
  gridColumn: "1 / -1"
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#fff",
  fontWeight: "700"
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
  padding: "13px 18px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "800",
  fontSize: "15px",
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

export default PostListing;