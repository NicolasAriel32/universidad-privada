import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth.jsx";
import StudyApp from "./LessonApp.jsx";

// Gate de autenticación: sin sesión muestra el login; con sesión, la app.
export default function App() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center", background: "#101418",
        color: "#8b98a5", fontFamily: "ui-monospace, monospace", fontSize: 13 }}>
        Cargando…
      </div>
    );
  }

  if (!session) return <Auth />;
  return <StudyApp session={session} />;
}
