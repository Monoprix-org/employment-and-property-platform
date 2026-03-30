import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import InquiryCard from "../components/InquiryCard";
import EmptyState from "../components/EmptyState";

function MarketplaceDashboard({ token, user, setPage, onViewListing, onLogout }) {
  const [myListings, setMyListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = user.role === "property_owner";

  const fetchData = async () => {
    try {
      setLoading(true);

      const [listingRes, favoriteRes, inquiryRes] = await Promise.all([
        fetch("http://localhost:5000/listings/mine", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`http://localhost:5000/inquiries/${isOwner ? "received" : "sent"}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const listingData = await listingRes.json();
      const favoriteData = await favoriteRes.json();
      const inquiryData = await inquiryRes.json();

      setMyListings(Array.isArray(listingData) ? listingData : []);
      setFavorites(Array.isArray(favoriteData) ? favoriteData : []);
      setInquiries(Array.isArray(inquiryData) ? inquiryData : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteListing = async (listingId) => {
    const confirmed = window.confirm("Delete this listing?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete listing");
      }

      alert(data.message || "Listing deleted");
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete listing");
    }
  };

  const updateStatus = async (listingId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/listings/${listingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status");
    }
  };

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
        throw new Error(data.message || "Failed to remove favorite");
      }

      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to remove favorite");
    }
  };

  if (loading) {
    return (
      <div style={pageWrapStyle}>
        <div style={glassCardStyle}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>
            {isOwner ? "Property Owner Control Center" : "Customer Intelligence Panel"}
          </div>
          <h1 style={heroTitleStyle}>
            {isOwner ? "Manage listings and monitor inquiries" : "Track favorites, inquiries, and wanted ads"}
          </h1>
          <p style={heroDescStyle}>
            Use this dashboard to control your marketplace activity with a cleaner,
            futuristic workflow.
          </p>
        </div>

        <div style={heroActionsStyle}>
          <button style={ghostButtonStyle} onClick={() => setPage("marketplace-home")}>
            Home
          </button>

          <button style={mainButtonStyle} onClick={() => setPage("post-listing")}>
            {isOwner ? "Post Property" : "Post Wanted Ad"}
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
          <div style={statNumberStyle}>{myListings.length}</div>
          <div style={statLabelStyle}>{isOwner ? "My Listings" : "My Wanted Ads"}</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>{inquiries.length}</div>
          <div style={statLabelStyle}>{isOwner ? "Received Inquiries" : "Sent Inquiries"}</div>
        </div>

        <div style={statCardStyle}>
          <div style={statNumberStyle}>{favorites.length}</div>
          <div style={statLabelStyle}>Saved Favorites</div>
        </div>
      </div>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>{isOwner ? "My Listings" : "My Wanted Ads"}</h2>

        {myListings.length === 0 ? (
          <EmptyState
            title="No listings yet"
            description="Create your first listing to start using the marketplace."
            actionText={isOwner ? "Post Property" : "Post Wanted Ad"}
            onAction={() => setPage("post-listing")}
          />
        ) : (
          <div style={gridStyle}>
            {myListings.map((listing) => (
              <div key={listing.id}>
                <ListingCard
                  listing={listing}
                  onView={onViewListing}
                />

                <div style={manageCardStyle}>
                  <div style={manageTitleStyle}>Manage Listing</div>

                  <div style={manageActionsStyle}>
                    <select
                      value={listing.status}
                      onChange={(e) => updateStatus(listing.id, e.target.value)}
                      style={selectStyle}
                    >
                      <option value="active">active</option>
                      <option value="pending">pending</option>
                      <option value="rented">rented</option>
                      <option value="sold">sold</option>
                      <option value="closed">closed</option>
                    </select>

                    <button
                      onClick={() => deleteListing(listing.id)}
                      style={dangerButtonStyle}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          {isOwner ? "Received Inquiries" : "Sent Inquiries"}
        </h2>

        {inquiries.length === 0 ? (
          <EmptyState
            title="No inquiries yet"
            description="Inquiry activity will appear here once users start interacting with listings."
          />
        ) : (
          inquiries.map((item) => (
            <InquiryCard key={item.id} item={item} isOwner={isOwner} />
          ))
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Favorites</h2>

        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites saved"
            description="Save listings you like and they will appear here."
          />
        ) : (
          <div style={gridStyle}>
            {favorites.map((fav) => (
              <div key={fav.favorite_id || fav.id}>
                <ListingCard
                  listing={fav}
                  onView={onViewListing}
                />

                <div style={manageCardStyle}>
                  <div style={manageTitleStyle}>Saved Listing</div>

                  <div style={manageActionsStyle}>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      style={ghostButtonStyle}
                    >
                      Remove Favorite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
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

const sectionStyle = {
  marginBottom: "30px"
};

const sectionTitleStyle = {
  marginBottom: "16px",
  color: "#fff",
  fontSize: "24px",
  fontWeight: "800"
};

const gridStyle = {
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

const selectStyle = {
  padding: "11px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  outline: "none",
  fontSize: "14px",
  background: "rgba(255,255,255,0.06)",
  color: "#fff"
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

export default MarketplaceDashboard;