import React from "react";

const levels = [
  { id: 1, title: "Hello World", status: "done" },
  { id: 2, title: "Variables & Data Types", status: "unlocked" },
  { id: 3, title: "If-Else Conditions", status: "locked" },
  { id: 4, title: "Loops", status: "locked" },
  { id: 5, title: "Functions", status: "locked" },
  // Add more levels here up to Level 50
];

function Roadmap({ onBack }) {
  const getStatusIcon = (status) => {
    if (status === "done") return "✅";
    if (status === "unlocked") return "🔓";
    return "🔒";
  };

  const handleClick = (level) => {
    if (level.status === "locked") return;
    alert(`➡️ Opening Level ${level.id}: ${level.title}`);
    // 🔜 Later, navigate to Level page
  };

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", fontSize: "28px" }}>🗺️ C++ Roadmap</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {levels.map((level) => (
          <div
            key={level.id}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: 10,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: level.status === "locked" ? "not-allowed" : "pointer",
              opacity: level.status === "locked" ? 0.6 : 1,
            }}
            onClick={() => handleClick(level)}
          >
            <h3>Level {level.id}</h3>
            <p>{level.title}</p>
            <p style={{ fontSize: "24px" }}>{getStatusIcon(level.status)}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 30px",
            borderRadius: 6,
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
}

export default Roadmap;
