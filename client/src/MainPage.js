import React, { useEffect, useState } from "react";

export default function MainPage({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const features = [
    { icon: "🎯", title: "50 Challenges", desc: "Carefully crafted C++ problems from beginner to advanced" },
    { icon: "🔓", title: "Progressive Unlock", desc: "Earn each level by solving the previous one" },
    { icon: "⚡", title: "Live Execution", desc: "Real-time code compilation and output in the browser" },
    { icon: "📈", title: "Track Progress", desc: "Your progress is saved per account, always ready" },
  ];

  return (
    <div style={s.root}>
      {/* Ambient blobs */}
      <div style={s.blob1} />
      <div style={s.blob2} />

      <nav style={s.nav}>
        <span style={s.navLogo}>⊛ CodeTusker</span>
        <button className="btn btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }} onClick={onStart}>
          Get Started →
        </button>
      </nav>

      <main style={{ ...s.hero, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <span className="badge badge-accent" style={{ marginBottom: "24px", display: "inline-block" }}>
          ✦ C++ Learning Platform
        </span>
        <h1 style={s.heroTitle}>
          Master C++ <br />
          <span className="gradient-text">One Challenge at a Time</span>
        </h1>
        <p style={s.heroSub}>
          Battle through 50 handcrafted challenges. Write code, run it live, and unlock each level as you progress.
          <br />Built for those who want to go from zero to legend.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
          <button
            className="btn btn-primary"
            style={{ fontSize: "17px", padding: "16px 36px", borderRadius: "16px" }}
            onClick={onStart}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
          >
            🚀 Start Your Journey
          </button>
          <a href="#features" className="btn btn-secondary" style={{ fontSize: "15px", padding: "16px 28px", borderRadius: "16px" }}>
            Learn More ↓
          </a>
        </div>

        {/* Stats row */}
        <div style={s.statRow}>
          {[["50", "Challenges"], ["5", "Difficulty Tiers"], ["C++", "Language"], ["∞", "Retries"]].map(([v, l]) => (
            <div key={l} style={s.statItem}>
              <span style={s.statVal}>{v}</span>
              <span style={s.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Features */}
      <section id="features" style={s.featuresSection}>
        <h2 style={s.sectionTitle}>Why CodeTusker?</h2>
        <div style={s.featureGrid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass"
              style={{ ...s.featureCard, animationDelay: `${i * 0.1}s` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={s.featureIcon}>{f.icon}</div>
              <h3 style={s.featureTitle}>{f.title}</h3>
              <p style={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div className="glass" style={s.ctaBox}>
          <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "12px" }}>
            Ready to <span className="gradient-text">level up?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "28px" }}>
            Join thousands of developers mastering C++ the fun way.
          </p>
          <button className="btn btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }} onClick={onStart}>
            Start for Free →
          </button>
        </div>
      </section>

      <footer style={s.footer}>
        <span>© 2025 CodeTusker · Built for learners, by learners</span>
      </footer>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh", background: "var(--bg-base)",
    fontFamily: "'Inter', sans-serif", overflowX: "hidden", position: "relative",
  },
  blob1: {
    position: "fixed", top: "-200px", left: "-200px",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "-150px", right: "-150px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 40px", position: "sticky", top: 0, zIndex: 100,
    background: "rgba(10,13,20,0.8)", backdropFilter: "blur(16px)",
    borderBottom: "1px solid var(--border)",
  },
  navLogo: {
    fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #818cf8, #22d3ee)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  hero: {
    textAlign: "center", padding: "80px 20px 60px", maxWidth: "780px",
    margin: "0 auto", position: "relative", zIndex: 1,
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900,
    lineHeight: 1.1, marginBottom: "24px", color: "var(--text-primary)",
  },
  heroSub: {
    fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.75,
    maxWidth: "580px", margin: "0 auto",
  },
  statRow: {
    display: "flex", justifyContent: "center", gap: "32px",
    marginTop: "56px", flexWrap: "wrap",
  },
  statItem: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "18px 28px", borderRadius: "16px",
    background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-light)",
  },
  statVal: { fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 },
  statLabel: { fontSize: "13px", color: "var(--text-muted)", marginTop: "6px", fontWeight: 500 },
  featuresSection: {
    padding: "80px 20px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1,
  },
  sectionTitle: {
    textAlign: "center", fontSize: "32px", fontWeight: 800,
    marginBottom: "40px", color: "var(--text-primary)",
  },
  featureGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "20px",
  },
  featureCard: {
    padding: "28px 22px", borderRadius: "16px",
    transition: "all 0.25s ease", cursor: "default",
  },
  featureIcon: { fontSize: "32px", marginBottom: "14px" },
  featureTitle: { fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" },
  featureDesc: { fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 },
  cta: { padding: "40px 20px 80px", textAlign: "center", position: "relative", zIndex: 1 },
  ctaBox: {
    maxWidth: "560px", margin: "0 auto", padding: "48px 36px", borderRadius: "20px",
  },
  footer: {
    textAlign: "center", padding: "24px", color: "var(--text-muted)", fontSize: "13px",
    borderTop: "1px solid var(--border)",
  },
};
