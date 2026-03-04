import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login({ onLogin, onSignUp, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(email);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.root}>
      <div style={s.blob1} /><div style={s.blob2} />
      <div style={s.card} className="fadeUp">
        <div style={s.logoRow}>
          <span style={s.logo}>⊛</span>
          <span style={s.logoText}>CodeTusker</span>
        </div>
        <h2 style={s.title}>Welcome back</h2>
        <p style={s.sub}>Sign in to continue your C++ journey</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <label style={s.label}>Email</label>
          <input className="input-field" type="email" placeholder="you@email.com"
            value={email} required onChange={e => setEmail(e.target.value)} style={{ marginBottom: "16px" }} />

          <label style={s.label}>Password</label>
          <input className="input-field" type="password" placeholder="••••••••"
            value={password} required onChange={e => setPassword(e.target.value)} style={{ marginBottom: "8px" }} />

          {error && <p style={s.error}>{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}
            style={{ width: "100%", marginTop: "20px", padding: "14px", fontSize: "15px" }}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <div style={s.divider}><span>or</span></div>

        <button className="btn btn-secondary" onClick={onSignUp}
          style={{ width: "100%", marginBottom: "12px" }}>
          Create an Account
        </button>
        <button className="btn" onClick={onBack}
          style={{ width: "100%", background: "none", color: "var(--text-muted)", fontSize: "14px" }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "var(--bg-base)", padding: "20px", position: "relative", overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-180px", right: "-180px", width: "500px", height: "500px",
    borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-150px", left: "-150px", width: "450px", height: "450px",
    borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    width: "100%", maxWidth: "420px", background: "var(--bg-card)",
    border: "1px solid var(--border-light)", borderRadius: "24px",
    padding: "44px 36px", boxShadow: "var(--shadow-card)", position: "relative", zIndex: 1,
  },
  logoRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", justifyContent: "center" },
  logo: { fontSize: "22px", background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  logoText: { fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" },
  title: { fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", textAlign: "center", marginBottom: "8px" },
  sub: { fontSize: "14px", color: "var(--text-muted)", textAlign: "center", marginBottom: "32px" },
  form: { display: "flex", flexDirection: "column" },
  label: { fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" },
  error: { color: "var(--danger)", fontSize: "13px", textAlign: "center", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.08)", borderRadius: "8px" },
  divider: {
    textAlign: "center", margin: "24px 0", color: "var(--text-muted)", fontSize: "13px",
    position: "relative",
    // can't do ::before/after in inline, so just plain text
  },
};
