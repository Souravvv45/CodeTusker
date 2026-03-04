import React, { useState } from "react";

const TIER_LABELS = {
  1: { label: "Beginner", color: "#10b981", range: [1, 10] },
  2: { label: "Easy", color: "#22d3ee", range: [11, 20] },
  3: { label: "Medium", color: "#f59e0b", range: [21, 30] },
  4: { label: "Hard", color: "#f97316", range: [31, 40] },
  5: { label: "Expert", color: "#ef4444", range: [41, 50] },
};

function getTier(level) {
  for (const [t, v] of Object.entries(TIER_LABELS)) {
    if (level >= v.range[0] && level <= v.range[1]) return { ...v, tier: t };
  }
  return TIER_LABELS[1];
}

export default function LevelPage({ onBack, unlockedLevels, onStartLevel }) {
  const [filter, setFilter] = useState("all");
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);
  const completedCount = Math.max(0, (unlockedLevels?.length || 1) - 1);

  const filtered = filter === "all" ? levels
    : filter === "unlocked" ? levels.filter(l => unlockedLevels.includes(l))
      : levels.filter(l => !unlockedLevels.includes(l));

  return (
    <div style={s.root}>
      <div style={s.blob1} /><div style={s.blob2} />

      {/* Header */}
      <header style={s.nav}>
        <button className="btn btn-secondary" onClick={onBack} style={{ padding: "8px 16px", fontSize: "13px" }}>
          ← Back
        </button>
        <span style={s.logo}>⊛ C++ Arena</span>
        <div className="badge badge-accent">{completedCount}/50 done</div>
      </header>

      <main style={s.main}>
        <div style={{ textAlign: "center", marginBottom: "36px" }} className="fadeUp">
          <h1 style={s.pageTitle}>🏆 Challenge Arena</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Solve each level to unlock the next. {50 - completedCount} challenges remaining.
          </p>

          {/* Progress bar */}
          <div style={s.progressWrap}>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${(completedCount / 50) * 100}%` }} />
            </div>
            <span style={{ color: "#818cf8", fontWeight: 700, fontSize: "14px" }}>
              {Math.round((completedCount / 50) * 100)}%
            </span>
          </div>

          {/* Tier legend */}
          <div style={s.tierLegend}>
            {Object.values(TIER_LABELS).map(t => (
              <span key={t.label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.color, display: "inline-block" }} />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={s.filterRow}>
          {["all", "unlocked", "locked"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}>
              {f === "all" ? "All Levels" : f === "unlocked" ? "✅ Unlocked" : "🔒 Locked"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={s.grid}>
          {filtered.map(level => {
            const isUnlocked = unlockedLevels.includes(level);
            const isDone = unlockedLevels.includes(level + 1) || (unlockedLevels.includes(level) && level < Math.max(...unlockedLevels));
            const tier = getTier(level);
            return (
              <div key={level}
                onClick={() => isUnlocked ? onStartLevel(level) : alert("🔒 Complete the previous level first!")}
                style={{
                  ...s.card,
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  opacity: isUnlocked ? 1 : 0.45,
                  borderColor: isUnlocked ? `${tier.color}40` : "var(--border)",
                  background: isUnlocked
                    ? `linear-gradient(145deg, var(--bg-card), rgba(${hexToRgb(tier.color)},0.06))`
                    : "var(--bg-surface)",
                  boxShadow: isUnlocked ? `0 4px 20px rgba(${hexToRgb(tier.color)},0.12)` : "none",
                }}
                onMouseEnter={e => { if (isUnlocked) { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.borderColor = tier.color + "90"; } }}
                onMouseLeave={e => { if (isUnlocked) { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = tier.color + "40"; } }}
              >
                {isDone && <span style={s.doneBadge}>✓</span>}
                <span style={{ ...s.levelNum, color: isUnlocked ? tier.color : "var(--text-muted)" }}>
                  {isUnlocked ? level : "🔒"}
                </span>
                <span style={{ fontSize: "10px", color: isUnlocked ? tier.color : "var(--text-muted)", fontWeight: 700, letterSpacing: "0.5px" }}>
                  {tier.label}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const s = {
  root: { minHeight: "100vh", background: "var(--bg-base)", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" },
  blob1: { position: "fixed", top: "-200px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" },
  blob2: { position: "fixed", bottom: "-150px", left: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "rgba(10,13,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: "17px", fontWeight: 800, background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  main: { maxWidth: "960px", margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 },
  pageTitle: { fontSize: "32px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "10px" },
  progressWrap: { display: "flex", alignItems: "center", gap: "12px", maxWidth: "480px", margin: "20px auto 0" },
  progressTrack: { flex: 1, height: "6px", borderRadius: "99px", background: "var(--border-light)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "99px", background: "linear-gradient(90deg, #6366f1, #22d3ee)", transition: "width 0.8s ease" },
  tierLegend: { display: "flex", gap: "16px", justifyContent: "center", marginTop: "18px", flexWrap: "wrap" },
  filterRow: { display: "flex", gap: "10px", marginBottom: "28px", justifyContent: "center", flexWrap: "wrap" },
  filterBtn: { padding: "8px 20px", borderRadius: "99px", border: "1px solid var(--border-light)", background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  filterActive: { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)", boxShadow: "0 4px 16px var(--accent-glow)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: "12px" },
  card: {
    borderRadius: "14px", padding: "16px 8px", textAlign: "center",
    border: "1px solid", transition: "all 0.22s ease", position: "relative",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
  },
  levelNum: { fontSize: "20px", fontWeight: 800, lineHeight: 1 },
  doneBadge: {
    position: "absolute", top: "6px", right: "8px", fontSize: "11px",
    color: "#10b981", fontWeight: 800,
  },
};
