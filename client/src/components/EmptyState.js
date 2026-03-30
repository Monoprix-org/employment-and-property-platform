function EmptyState({ title = "No data found", description = "", actionText = "", onAction }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "28px",
        textAlign: "center",
        border: "1px solid #edf0f6",
        boxShadow: "0 8px 22px rgba(0,0,0,0.06)"
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          margin: "0 auto 16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #eef1ff 0%, #dfe5ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4e54c8",
          fontWeight: "700",
          fontSize: "22px"
        }}
      >
        •••
      </div>

      <h3 style={{ marginTop: 0, marginBottom: "10px", color: "#222" }}>
        {title}
      </h3>

      {description ? (
        <p style={{ margin: 0, color: "#666", lineHeight: 1.6 }}>{description}</p>
      ) : null}

      {actionText && onAction ? (
        <button
          onClick={onAction}
          style={{
            marginTop: "18px",
            padding: "11px 16px",
            border: "none",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;