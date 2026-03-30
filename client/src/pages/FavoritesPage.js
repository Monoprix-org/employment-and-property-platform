import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import EmptyState from "../components/EmptyState";

function FavoritesPage({ token, setPage, onViewListing, onLogout }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/favorites", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch favorites");
      }

      setFavorites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFavorite = async (listingId) => {
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

      fetchFavorites();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to remove favorite");
    }
  };

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>Favorites Vault</div>
          <h1 style={heroTitleStyle}>Your saved listings, ready anytime</h1>
          <p style={heroDescStyle}>
            Keep track of properties and wanted ads you care about in one clean,
            futuristic workspace.
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

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{favorites.length}</div>
          <div style={statLabelStyle}>Saved Listings</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>Favorites</div>
          <div style={statLabelStyle}>Current Section</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>Live</div>
          <div style={statLabelStyle}>Synced from Marketplace</div>
        </div>
      </div>

      {loading ? (
        <div style={glassCardStyle}>Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="No favorites saved"
          description="Listings you save will appear here for quick access later."
          actionText="Browse Marketplace"
          onAction={() => setPage("marketplace-home")}
        />
      ) : (
        <div style={gridStyle}>
          {favorites.map((fav) => (
            <div key={fav.favorite_id || `${fav.user_id}-${fav.listing_id}`}>
              <ListingCard
                listing={fav}
                onView={onViewListing}
              />

              <div style={manageCardStyle}>
                <div style={manageTitleStyle}>Saved Listing</div>

                <div style={manageActionsStyle}>
                  <button
                    style={mainButtonStyle}
                    onClick={() => onViewListing(fav.id || fav.listing_id)}
                  >
                    Open Listing
                  </button>

                  <button
                    style={ghostButtonStyle}
                    onClick={() => removeFavorite(fav.id || fav.listing_id)}
                  >
                    Remove Favorite
                  </button>
                </div>
              </div>
            </div>
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
  marginBottom: "24px"
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
  fontWeight: "800"
};

const statLabelStyle = {
  marginTop: "6px",
  color: "rgba(255,255,255,0.68)",
  fontSize: "13px"
};

const glassCardStyle = {
  borderRadius: "22px",
  padding: "28px",
  color: "rgba(255,255,255,0.8)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: "18px"
};

const manageCardStyle = {
  marginTop: "12px",
  borderRadius: "18px",
  padding: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 12px 26px rgba(0,0,0,0.16)",
  backdropFilter: "blur(12px)"
};

const manageTitleStyle = {
  color: "#fff",
  fontWeight: "800",
  marginBottom: "12px"
};

const manageActionsStyle = {
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

export default FavoritesPage;