import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function SignUp({ onSignUp, switchToLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUp(email);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("An account with this email already exists.");
      else setError("Could not create account. Please try again.");
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
        <h2 style={s.title}>Create your account</h2>
        <p style={s.sub}>Join thousands of C++ learners today</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <label style={s.label}>Email</label>
          <input className="input-field" type="email" placeholder="you@email.com"
            value={email} required onChange={e => setEmail(e.target.value)} style={{ marginBottom: "16px" }} />

          <label style={s.label}>Password</label>
          <input className="input-field" type="password" placeholder="Min. 6 characters"
            value={password} required onChange={e => setPassword(e.target.value)} style={{ marginBottom: "16px" }} />

          <label style={s.label}>Confirm Password</label>
          <input className="input-field" type="password" placeholder="Re-enter password"
            value={confirm} required onChange={e => setConfirm(e.target.value)} style={{ marginBottom: "8px" }} />

          {error && <p style={s.error}>{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}
            style={{ width: "100%", marginTop: "20px", padding: "14px", fontSize: "15px" }}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "22px", fontSize: "14px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <span style={{ color: "#818cf8", cursor: "pointer", fontWeight: 600 }} onClick={switchToLogin}>
            Sign In
          </span>
        </p>
        <button className="btn" onClick={onBack}
          style={{ width: "100%", marginTop: "10px", background: "none", color: "var(--text-muted)", fontSize: "14px" }}>
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
    position: "fixed", top: "-150px", left: "-150px", width: "480px", height: "480px",
    borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-150px", right: "-150px", width: "420px", height: "420px",
    borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)", pointerEvents: "none",
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
  error: { color: "var(--danger)", fontSize: "13px", textAlign: "center", padding: "10px", background: "rgba(239,68,68,0.08)", borderRadius: "8px" },
};
