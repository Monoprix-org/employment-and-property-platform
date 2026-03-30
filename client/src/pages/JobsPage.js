import { useEffect, useMemo, useState } from "react";
import JobCard from "../components/JobCard";

function JobsPage({ token, user }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [applyJobId, setApplyJobId] = useState(null);
  const [application, setApplication] = useState({
    phone: "",
    resume: null,
    cover_letter: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) &&
        job.location?.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }, [jobs, search, locationFilter]);

  const submitApplication = async (e, jobId) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("phone", application.phone);
      formData.append("cover_letter", application.cover_letter);

      if (application.resume) {
        formData.append("resume", application.resume);
      }

      const res = await fetch(`http://localhost:5000/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Application failed");
      }

      alert(data.message || "Application submitted successfully");
      setApplyJobId(null);
      setApplication({
        phone: "",
        resume: null,
        cover_letter: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Application failed");
    }
  };

  return (
    <div style={pageWrapStyle}>
      <div style={heroCardStyle}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={heroBadgeStyle}>Recruitment Portal</div>
          <h1 style={heroTitleStyle}>Discover future-ready job opportunities</h1>
          <p style={heroDescStyle}>
            Search roles, explore opportunities, and connect with employers through a
            cleaner, smarter recruitment experience.
          </p>
        </div>

        <div style={heroStatsGridStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{jobs.length}</div>
            <div style={statLabelStyle}>Open Jobs</div>
          </div>

          <div style={statCardStyle}>
            <div style={statNumberStyle}>{filteredJobs.length}</div>
            <div style={statLabelStyle}>Filtered Results</div>
          </div>

          <div style={statCardStyle}>
            <div style={statNumberStyle}>{user.role === "worker" ? "Worker" : "Employer"}</div>
            <div style={statLabelStyle}>Current Mode</div>
          </div>
        </div>
      </div>

      <div style={searchCardStyle}>
        <div style={searchGridStyle}>
          <input
            placeholder="Search by job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={techInputStyle}
          />

          <input
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={techInputStyle}
          />
        </div>
      </div>

      {loading ? (
        <div style={emptyCardStyle}>Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div style={emptyCardStyle}>No jobs found.</div>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id}>
            <JobCard job={job} user={user} onApplyClick={setApplyJobId} />

            {applyJobId === job.id && user.role === "worker" && (
              <form onSubmit={(e) => submitApplication(e, job.id)} style={applyFormStyle}>
                <div style={formGlowStyle} />

                <h3 style={formTitleStyle}>Apply for {job.title}</h3>

                <input
                  placeholder="Phone"
                  value={application.phone}
                  onChange={(e) =>
                    setApplication({ ...application, phone: e.target.value })
                  }
                  style={techInputStyle}
                />

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setApplication({
                      ...application,
                      resume: e.target.files?.[0] || null
                    })
                  }
                  style={techInputStyle}
                />

                <textarea
                  placeholder="Cover letter"
                  value={application.cover_letter}
                  onChange={(e) =>
                    setApplication({
                      ...application,
                      cover_letter: e.target.value
                    })
                  }
                  rows="5"
                  style={{ ...techInputStyle, resize: "vertical", minHeight: "130px" }}
                />

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button type="submit" style={mainButtonStyle}>
                    Submit Application
                  </button>

                  <button
                    type="button"
                    onClick={() => setApplyJobId(null)}
                    style={secondaryButtonStyle}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const pageWrapStyle = {
  maxWidth: "1200px",
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
  width: "240px",
  height: "240px",
  borderRadius: "50%",
  background: "rgba(34,211,238,0.15)",
  filter: "blur(70px)",
  top: "-80px",
  right: "5%"
};

const heroGlowTwo = {
  position: "absolute",
  width: "220px",
  height: "220px",
  borderRadius: "50%",
  background: "rgba(139,92,246,0.18)",
  filter: "blur(80px)",
  bottom: "-90px",
  left: "-40px"
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

const heroStatsGridStyle = {
  marginTop: "24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
  position: "relative",
  zIndex: 2
};

const statCardStyle = {
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const statNumberStyle = {
  color: "#fff",
  fontSize: "28px",
  fontWeight: "800"
};

const statLabelStyle = {
  marginTop: "6px",
  color: "rgba(255,255,255,0.68)",
  fontSize: "13px"
};

const searchCardStyle = {
  borderRadius: "24px",
  padding: "20px",
  marginBottom: "22px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
};

const searchGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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

const applyFormStyle = {
  position: "relative",
  overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "22px",
  padding: "24px",
  marginBottom: "22px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 16px 34px rgba(0,0,0,0.22)",
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const formGlowStyle = {
  position: "absolute",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "rgba(79,70,229,0.18)",
  filter: "blur(70px)",
  right: "-40px",
  top: "-50px"
};

const formTitleStyle = {
  marginTop: 0,
  marginBottom: "4px",
  color: "#fff",
  position: "relative",
  zIndex: 2
};

const emptyCardStyle = {
  borderRadius: "22px",
  padding: "28px",
  color: "rgba(255,255,255,0.8)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
};

const mainButtonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "800",
  boxShadow: "0 14px 26px rgba(79,70,229,0.26)"
};

const secondaryButtonStyle = {
  padding: "12px 18px",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "700"
};

export default JobsPage;