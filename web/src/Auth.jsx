import { useState } from "react";
import { supabase } from "./supabaseClient";

const T = {
  bg: "#101418", panel: "#171c22", line: "#2a323b", accent: "#e8a530",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
};

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password: pass });
        if (error) throw error;
        setMsg("Cuenta creada. Si pide confirmar el mail, revisá tu casilla. Después iniciá sesión.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        // onAuthStateChange en App.jsx se encarga del resto.
      }
    } catch (err) {
      setMsg(err.message || "Error de autenticación.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center", background: T.bg, fontFamily: T.sans }}>
      <form onSubmit={submit} style={{
        width: 340, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 12,
        padding: 28, display: "flex", flexDirection: "column", gap: 14,
      }}>
        <div style={{ fontFamily: T.mono, letterSpacing: 2.5, color: "#e8edf2", fontWeight: 700, fontSize: 15 }}>
          UNIVERSIDAD PRIVADA
        </div>
        <div style={{ color: "#8b98a5", fontSize: 13, marginTop: -6 }}>
          {mode === "login" ? "Iniciá sesión para retomar tu progreso." : "Creá tu cuenta para guardar tu progreso."}
        </div>
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          style={inp} autoComplete="email" />
        <input type="password" required placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)}
          style={inp} autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={6} />
        <button type="submit" disabled={busy} style={{
          padding: "10px 0", borderRadius: 7, border: "none", background: T.accent,
          color: "#14171c", fontFamily: T.mono, fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}>
          {busy ? "…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
        {msg && <div style={{ color: "#e8a530", fontSize: 12.5, lineHeight: 1.4 }}>{msg}</div>}
        <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMsg(null); }}
          style={{ background: "none", border: "none", color: "#8b98a5", fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}>
          {mode === "login" ? "¿No tenés cuenta? Registrate" : "¿Ya tenés cuenta? Iniciá sesión"}
        </button>
      </form>
    </div>
  );
}

const inp = {
  background: "#0c1013", border: "1px solid #2a323b", borderRadius: 7,
  padding: "10px 12px", color: "#e2e9ef", fontSize: 14, outline: "none",
};
