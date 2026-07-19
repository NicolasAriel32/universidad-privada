// Serverless function de Vercel: proxy al tutor de Anthropic.
// La API key vive SOLO en el server (env ANTHROPIC_API_KEY), nunca en el bundle.
// Ruta: POST /api/tutor  con body { system, messages }.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Falta ANTHROPIC_API_KEY en el servidor." });
    return;
  }

  try {
    const { system, messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages requerido" });
      return;
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5",
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || `HTTP ${r.status}` });
      return;
    }
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    res.status(200).json({ text: text || "No pude generar respuesta." });
  } catch (e) {
    res.status(500).json({ error: e.message || "Error interno" });
  }
}
