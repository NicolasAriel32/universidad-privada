// Capa de acceso a datos: mapea (materia, code) <-> lesson_id y persiste progreso.
import { supabase } from "./supabaseClient";

// Trae todas las lecciones y arma los mapas de ida y vuelta.
// key = `${materiaCode}/${lessonCode}`  (ej: "PRG1/L03")
export async function fetchLessonMaps() {
  const { data, error } = await supabase
    .from("lessons")
    .select("id, code, subjects(code)");
  if (error) throw error;
  const keyToId = {};
  const idToKey = {};
  for (const row of data) {
    const scode = row.subjects?.code;
    if (!scode) continue;
    const key = `${scode}/${row.code}`;
    keyToId[key] = row.id;
    idToKey[row.id] = { materia: scode, code: row.code };
  }
  return { keyToId, idToKey };
}

// Carga el progreso completado del usuario y lo agrupa por materia (Set de codes).
export async function loadCompleted(idToKey) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, estado")
    .eq("estado", "completada");
  if (error) throw error;
  const byMateria = {};
  for (const row of data) {
    const k = idToKey[row.lesson_id];
    if (!k) continue;
    (byMateria[k.materia] ||= new Set()).add(k.code);
  }
  return byMateria;
}

// Marca una lección como completada: progreso + evento + ítem de repaso espaciado.
export async function markLessonCompleted({ userId, lessonId, lessonCode, extra = {} }) {
  const now = new Date().toISOString();

  const { error: e1 } = await supabase.from("lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      estado: "completada",
      intentos: extra.intentos ?? 1,
      quiz_primer_intento: extra.quizPrimerIntento ?? null,
      hint_level_max: extra.hintMax ?? 0,
      dominio: extra.dominio ?? null,
      completada_at: now,
    },
    { onConflict: "user_id,lesson_id" }
  );
  if (e1) throw e1;

  // Programa el primer repaso (mañana). Si ya existía, no lo pisa.
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const { error: e2 } = await supabase.from("review_items").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      factor: 2.5,
      intervalo_dias: 1,
      proximo_repaso: tomorrow,
      repasos_ok: 0,
    },
    { onConflict: "user_id,lesson_id", ignoreDuplicates: true }
  );
  if (e2) throw e2;

  // Evento (para analítica / racha). No bloquea si falla.
  await supabase.from("events").insert({
    user_id: userId,
    tipo: "leccion_completada",
    lesson_code: lessonCode,
    payload: extra ?? {},
  });
}

// Sesión de estudio: abre una fila al entrar, la cierra al salir.
export async function startStudySession(userId) {
  const { data, error } = await supabase
    .from("study_sessions")
    .insert({ user_id: userId })
    .select("id")
    .single();
  if (error) return null;
  return data.id;
}

export async function endStudySession(sessionId, minutosActivos) {
  if (!sessionId) return;
  await supabase
    .from("study_sessions")
    .update({ fin: new Date().toISOString(), minutos_activos: minutosActivos })
    .eq("id", sessionId);
}
