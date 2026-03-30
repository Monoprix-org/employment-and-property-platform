import { useEffect, useState } from "react";
import RoleHomeSwitcher from "../components/RoleHomeSwitcher";
import FilterBar from "../components/FilterBar";
import ListingCard from "../components/ListingCard";
import EmptyState from "../components/EmptyState";

function MarketplaceHome({ token, user, setPage, onViewListing, onLogout }) {
  const [filters, setFilters] = useState({
    listingType: user.role === "property_owner" ? "rent_out" : "rent_wanted",
    keyword: "",
    city: "",
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: ""
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchListings = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const params = new URLSearchParams();

      if (currentFilters.listingType) params.append("listingType", currentFilters.listingType);
      if (currentFilters.keyword) params.append("keyword", currentFilters.keyword);
      if (currentFilters.city) params.append("city", currentFilters.city);
      if (currentFilters.propertyType) params.append("propertyType", currentFilters.propertyType);
      if (currentFilters.bedrooms) params.append("bedrooms", currentFilters.bedrooms);
      if (currentFilters.minPrice) params.append("minPrice", currentFilters.minPrice);
      if (currentFilters.maxPrice) params.append("maxPrice", currentFilters.maxPrice);

      const res = await fetch(`http://localhost:5000/listings?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch listings");
      }

      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.listingType]);

  const toggleFavorite = async (listingId) => {
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

  const resetFilters = () => {
    const reset = {
      listingType: user.role === "property_owner" ? "rent_out" : "rent_wanted",
      keyword: "",
      city: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: ""
    };
    setFilters(reset);
    fetchListings(reset);
  };

  const heroTitle =
    user.role === "property_owner"
      ? "Property marketplace for modern local listings"
      : "Explore homes, wanted ads, and local opportunities";

  const heroDesc =
    user.role === "property_owner"
      ? "Publish rentals or sales, monitor activity, and manage your listings through a clean futuristic dashboard."
      : "Search property listings, save favorites, and connect with owners through a smarter local marketplace.";

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>Marketplace Hub</div>
          <h1 style={heroTitleStyle}>{heroTitle}</h1>
          <p style={heroDescStyle}>{heroDesc}</p>
        </div>

        <div style={heroActionsStyle}>
          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-dashboard")}>
            Dashboard
          </button>

          <button style={mainButtonStyle} onClick={() => setPage("post-listing")}>
            {user.role === "property_owner" ? "Post Property" : "Post Wanted Ad"}
          </button>

          <button style={ghostButtonStyle} onClick={() => setPage("favorites")}>
            Favorites
          </button>

          <button style={dangerButtonStyle} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{listings.length}</div>
          <div style={statLabelStyle}>Visible Listings</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>{filters.listingType.replace("_", " ")}</div>
          <div style={statLabelStyle}>Current Mode</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>{user.role === "property_owner" ? "Owner" : "Customer"}</div>
          <div style={statLabelStyle}>Logged-in Role</div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <RoleHomeSwitcher
          currentType={filters.listingType}
          onChangeType={(value) => setFilters({ ...filters, listingType: value })}
        />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={() => fetchListings(filters)}
          onReset={resetFilters}
        />
      </div>

      {errorMsg && <div style={errorBoxStyle}>{errorMsg}</div>}

      {loading ? (
        <div style={glassCardStyle}>Loading listings...</div>
      ) : listings.length === 0 ? (
        <EmptyState
          title="No listings found"
          description="Try changing the current category or update your filters to explore more results."
          actionText="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <div style={listingGridStyle}>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onView={onViewListing}
              onSave={toggleFavorite}
            />
          ))}
        </div>
      )}
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
  fontSize: "42px",
  lineHeight: 1.08,
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
  marginBottom: "22px"
};

const statCardStyle = {
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 16px 34px rgba(0,0,0,0.2)",
  color: "#fff",
  backdropFilter: "blur(16px)"
};

const statNumberStyle = {
  color: "#fff",
  fontSize: "24px",
  fontWeight: "800",
  textTransform: "capitalize"
};

const statLabelStyle = {
  marginTop: "6px",
  color: "rgba(255,255,255,0.68)",
  fontSize: "13px"
};

const sectionCardStyle = {
  borderRadius: "24px",
  padding: "22px",
  marginBottom: "22px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
};

const listingGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: "18px"
};

const glassCardStyle = {
  borderRadius: "22px",
  padding: "28px",
  color: "rgba(255,255,255,0.8)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
};

const errorBoxStyle = {
  marginBottom: "16px",
  background: "rgba(255, 77, 79, 0.16)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "12px 14px",
  borderRadius: "12px",
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

export default MarketplaceHome;