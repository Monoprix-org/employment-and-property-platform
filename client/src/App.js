import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MarketplaceHome from "./pages/MarketplaceHome";
import MarketplaceDashboard from "./pages/MarketplaceDashboard";
import PostListing from "./pages/PostListing";
import ListingDetail from "./pages/ListingDetail";
import FavoritesPage from "./pages/FavoritesPage";

function normalizeRole(role) {
  return (role || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/-/g, "_")
    .replace(/\s+/g, "_");
}

function App() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState("landing"); // landing | login | register
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState("jobs");
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && savedToken.length > 10) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        const fixedRole = normalizeRole(data.role);

        const fixedUser = {
          ...data,
          role: fixedRole
        };

        setCurrentUser(fixedUser);
        setLoading(false);
        setErrorMessage("");

        if (["customer", "property_owner"].includes(fixedRole)) {
          setPage("marketplace-home");
        } else {
          setPage("jobs");
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        setToken("");
        setCurrentUser(null);
        setAuthView("landing");
        setLoading(false);
        setErrorMessage("Session expired. Please login again.");
      });
  }, [token]);

  const handleLogin = (newToken) => {
    if (!newToken) return;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCurrentUser(null);
    setAuthView("landing");
    setPage("jobs");
    setSelectedListingId(null);
  };

  const openListingDetail = (listingId) => {
    setSelectedListingId(listingId);
    setPage("listing-detail");
  };

  const isMarketplaceUser =
    currentUser &&
    ["customer", "property_owner"].includes(normalizeRole(currentUser.role));

  if (loading) {
    return (
      <div style={loadingPageStyle}>
        <div style={loadingCardStyle}>Loading user info...</div>
      </div>
    );
  }

  if (!token || !currentUser) {
    return (
      <div>
        {errorMessage && (
          <div style={topErrorWrapStyle}>
            <div style={topErrorStyle}>{errorMessage}</div>
          </div>
        )}

        {authView === "landing" && (
          <LandingPage
            onLoginClick={() => setAuthView("login")}
            onRegisterClick={() => setAuthView("register")}
          />
        )}

        {authView === "login" && (
          <div>
            <div style={topBackWrapStyle}>
              <button
                onClick={() => setAuthView("landing")}
                style={backButtonStyle}
              >
                ← Back to Home
              </button>
            </div>
            <Login onLogin={handleLogin} />
          </div>
        )}

        {authView === "register" && (
          <div>
            <div style={topBackWrapStyle}>
              <button
                onClick={() => setAuthView("landing")}
                style={backButtonStyle}
              >
                ← Back to Home
              </button>
            </div>
            <Register onRegistered={() => setAuthView("login")} />
          </div>
        )}

        {authView !== "landing" && (
          <div style={switchWrapStyle}>
            {authView === "login" ? (
              <p style={switchTextStyle}>
                Don&apos;t have an account?
                <button
                  onClick={() => setAuthView("register")}
                  style={switchButtonStyle}
                >
                  Register
                </button>
              </p>
            ) : (
              <p style={switchTextStyle}>
                Already have an account?
                <button
                  onClick={() => setAuthView("login")}
                  style={switchButtonStyle}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (isMarketplaceUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 20%), radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 22%), linear-gradient(135deg, #0b1020 0%, #111827 45%, #0f172a 100%)",
          fontFamily: "Arial, sans-serif"
        }}
      >
        {page === "marketplace-home" && (
          <MarketplaceHome
            token={token}
            user={currentUser}
            setPage={setPage}
            onViewListing={openListingDetail}
            onLogout={handleLogout}
          />
        )}

        {page === "marketplace-dashboard" && (
          <MarketplaceDashboard
            token={token}
            user={currentUser}
            setPage={setPage}
            onViewListing={openListingDetail}
            onLogout={handleLogout}
          />
        )}

        {page === "post-listing" && (
          <PostListing
            token={token}
            user={currentUser}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}

        {page === "listing-detail" && (
          <ListingDetail
            token={token}
            user={currentUser}
            listingId={selectedListingId}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}

        {page === "favorites" && (
          <FavoritesPage
            token={token}
            user={currentUser}
            setPage={setPage}
            onViewListing={openListingDetail}
            onLogout={handleLogout}
          />
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 20%), radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 22%), linear-gradient(135deg, #0b1020 0%, #111827 45%, #0f172a 100%)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <Navbar user={currentUser} onLogout={handleLogout} setPage={setPage} />
      {page === "jobs" && <JobsPage token={token} user={currentUser} />}
      {page === "dashboard" && <Dashboard token={token} user={currentUser} />}
    </div>
  );
}

const loadingPageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 20%), radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 22%), linear-gradient(135deg, #0b1020 0%, #111827 45%, #0f172a 100%)"
};

const loadingCardStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "18px 24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)"
};

const topErrorWrapStyle = {
  position: "fixed",
  top: "16px",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  zIndex: 60
};

const topErrorStyle = {
  background: "rgba(255, 77, 79, 0.16)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "10px 16px",
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  backdropFilter: "blur(10px)"
};

const topBackWrapStyle = {
  position: "fixed",
  top: "18px",
  left: "18px",
  zIndex: 55
};

const backButtonStyle = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  backdropFilter: "blur(10px)"
};

const switchWrapStyle = {
  textAlign: "center",
  marginTop: "18px",
  marginBottom: "28px",
  fontSize: "16px"
};

const switchTextStyle = {
  color: "#ddd"
};

const switchButtonStyle = {
  marginLeft: "8px",
  border: "none",
  background: "transparent",
  color: "#8f94fb",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
};

export default App;