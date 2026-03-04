import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function HomePage({ userEmail, onLogout, onStartCoding, unlockedLevels }) {
  const handleLogout = async () => {
    await signOut(auth).catch(console.error);
    onLogout();
  };

  const completedCount = Math.max(0, (unlockedLevels?.length || 1) - 1);
  const pct = Math.round((completedCount / 50) * 100);

  const quickActions = [
    { icon: "⚡", label: "Continue Coding", desc: "Pick up where you left off", primary: true, onClick: onStartCoding },
    { icon: "📊", label: "My Progress", desc: `${completedCount} of 50 levels done`, primary: false, onClick: onStartCoding },
  ];

  return (
    <div style={s.root}>
      <div style={s.blob1} /><div style={s.blob2} />

      {/* Top Nav */}
      <header style={s.nav}>
        <span style={s.logo}>⊛ CodeTusker</span>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={s.avatar}>{userEmail?.[0]?.toUpperCase() || "?"}</div>
          <button className="btn btn-danger" onClick={handleLogout} style={{ padding: "8px 16px", fontSize: "13px" }}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={s.main}>
        {/* Welcome */}
        <div style={s.welcomeRow} className="fadeUp">
          <div>
            <p style={s.greet}>Welcome back 👋</p>
            <h1 style={s.welcomeTitle}>{userEmail?.split("@")[0]}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "6px" }}>{userEmail}</p>
          </div>
          <div className="badge badge-accent" style={{ alignSelf: "flex-start", padding: "8px 16px", fontSize: "12px" }}>
            🏆 Level {completedCount + 1} Player
          </div>
        </div>

        {/* Progress card */}
        <div style={s.progressCard} className="glass fadeUp">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px" }}>Overall Progress</span>
            <span style={{ color: "#818cf8", fontWeight: 700, fontSize: "15px" }}>{pct}%</span>
          </div>
          <div style={s.progressTrack}>
            <div style={{ ...s.progressFill, width: `${pct}%` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
            <span>✅ {completedCount} completed</span>
            <span>🔒 {50 - completedCount} remaining</span>
          </div>
        </div>

        {/* Stats grid */}
        <div style={s.statsGrid}>
          {[
            { label: "Levels Done", value: completedCount, icon: "🎯", color: "#6366f1" },
            { label: "Levels Locked", value: 50 - completedCount - 1, icon: "🔒", color: "#f59e0b" },
            { label: "Next Up", value: `Level ${completedCount + 1}`, icon: "⚡", color: "#22d3ee" },
            { label: "Total Levels", value: 50, icon: "🏆", color: "#10b981" },
          ].map(stat => (
            <div key={stat.label} style={{ ...s.statCard, borderColor: `${stat.color}30` }} className="glass"
              onMouseEnter={e => e.currentTarget.style.borderColor = stat.color + "80"}
              onMouseLeave={e => e.currentTarget.style.borderColor = stat.color + "30"}>
              <span style={{ fontSize: "28px" }}>{stat.icon}</span>
              <div style={{ fontSize: "24px", fontWeight: 800, color: stat.color, marginTop: "8px" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={s.actionsGrid}>
          {quickActions.map(a => (
            <button key={a.label} onClick={a.onClick}
              className={a.primary ? "btn btn-primary" : "btn btn-secondary"}
              style={s.actionBtn}>
              <span style={{ fontSize: "24px" }}>{a.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "15px" }}>{a.label}</div>
                <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "2px" }}>{a.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "var(--bg-base)", position: "relative", overflow: "hidden" },
  blob1: { position: "fixed", top: "-200px", right: "-200px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" },
  blob2: { position: "fixed", bottom: "-150px", left: "-150px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)", pointerEvents: "none" },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 36px", background: "rgba(10,13,20,0.85)", backdropFilter: "blur(16px)",
    borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100,
  },
  logo: { fontSize: "18px", fontWeight: 800, background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: "15px", color: "#fff",
  },
  main: { maxWidth: "860px", margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 },
  welcomeRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" },
  greet: { fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" },
  welcomeTitle: { fontSize: "34px", fontWeight: 900, color: "var(--text-primary)" },
  progressCard: { borderRadius: "16px", padding: "24px", marginBottom: "28px" },
  progressTrack: { height: "8px", borderRadius: "99px", background: "var(--border-light)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "99px", background: "linear-gradient(90deg, #6366f1, #22d3ee)", transition: "width 0.8s ease" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "28px" },
  statCard: { padding: "22px 16px", borderRadius: "14px", textAlign: "center", border: "1px solid", transition: "border-color 0.25s ease", cursor: "default" },
  actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" },
  actionBtn: { padding: "22px 24px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px", textAlign: "left", fontSize: "15px", border: "1px solid var(--border-light)" },
};
