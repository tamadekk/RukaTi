const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "#f8fafc",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#64748b" }}>404</h1>
      <h2 style={{ fontSize: "2rem", color: "#334155" }}>Page Not Found</h2>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "0.375rem",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
