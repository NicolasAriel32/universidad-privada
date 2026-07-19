# ESTADO DEL PROYECTO — Universidad Privada (Ing. en IA)
_Última actualización: julio 2026. Leé esto primero para retomar el proyecto._

## Qué es este proyecto
Una plataforma personal de autoestudio tipo "universidad privada" que replica una
carrera de **Ingeniería en Inteligencia Artificial** con material universitario
abierto (MIT, Harvard, Princeton, Stanford, 3Blue1Brown). Cada materia se enseña
en lecciones atómicas estilo W3Schools, con teoría + ejemplo corrible + quiz +
ejercicio autocalificado (código Python que se ejecuta en el navegador con Pyodide),
más un tutor IA en modo socrático.

## Los 4 no negociables que gobiernan todo
1. **No inventar teoría**: toda lección cita su fuente exacta (video/clase/capítulo).
   El contenido se reescribe desde la fuente, no de memoria.
2. La estructura de la carrera sale de estándares reales (CS2023 de ACM/IEEE + OSSU),
   no de intuición.
3. Ejercicios **computables y verificados**: cada uno se ejecuta con tests antes de
   entrar. Nada se da por bueno sin correr.
4. Objetivos de aprendizaje con **taxonomía de Bloom** y alineación constructiva
   (el objetivo se evalúa con el quiz/ejercicio de su lección).

## Estructura de carpetas
```
universidad-privada-carrera/
├── ESTADO-DEL-PROYECTO.md      ← este archivo
├── README.md                   ← diseño curricular y método
├── 00-CARRERA/                 ← perfil de egresado, áreas de conocimiento, mapa
├── materias/<CODE>-<slug>/
│   ├── conceptos.md            ← temas centrales + objetivos de aprendizaje (Bloom)
│   └── fuentes-por-leccion.md  ← (solo materias con contenido) mapeo lección→clase
├── fuentes/                    ← índice maestro + fuente canónica por materia
└── app/
    ├── universidad-privada-prototipo.jsx   ← LA APP (React, funcional)
    └── bloques-contenido/                  ← contenido JS por materia (para regenerar)
```

## Estado del contenido (lo concreto)

### App (`app/universidad-privada-prototipo.jsx`) — v0.4, FUNCIONAL
- Es un componente React de una sola pieza. Corre pegándolo en un entorno React
  (usa Pyodide vía CDN para ejecutar el Python del alumno, y la API de Anthropic
  para el tutor).
- **4 materias con contenido navegable**, 76 lecciones en total:
  - **NIVEL 0**: PRG1 Programación I (17), MDIS Matemática Discreta (25), ALG Álgebra Lineal (17)
  - **NIVEL 1**: PRG2 Estructuras de Datos (17)
- El árbol agrupa por nivel automáticamente (campo `nivel` en `MATERIAS_CONFIG`).
- Progreso independiente por materia; desbloqueo secuencial (aprobar una lección
  abre la siguiente). El progreso vive en memoria (NO persiste al recargar — ver
  "Qué falta").
- Todo validado: las 76 lecciones compilan y sus ejemplos + tests se ejecutan sin error.

### Documentos de diseño (todas las 23 materias)
- Perfil de egresado (basado en UdeSA), 9 áreas de conocimiento, mapa por niveles.
- **conceptos.md con objetivos de aprendizaje por tema (Bloom) en las 23 materias.**
- fuentes/ con la fuente canónica de cada materia, validada contra OSSU/CS2023.

### Documentos "fuentes por lección" (mapeo lección→clase verificado)
Solo las materias con contenido escrito o en cola inmediata:
- **PRG1** (MIT 6.100L + CS50P) — contenido hecho
- **MDIS** (MIT 6.042J) — contenido hecho
- **ALG** (MIT 18.06SC + 3Blue1Brown) — contenido hecho
- **PRG2** (Princeton Algorithms Part I) — contenido hecho

## Qué falta (la hoja de ruta)

### Contenido de materias (orden acordado del Nivel 1)
Siguen, con el mismo método (fuentes-por-leccion → 17 lecciones → doble validación → bloque JSX):
1. **PROB** Probabilidad y Estadística — Harvard Stat 110 (engancha con MDIS M19-M24)
2. **AMAT** Análisis Matemático — MIT 18.01x (ejercicios: derivada/integral numérica)
3. **FINF** Fundamentos de Informática — Nand2Tetris (ejercicios: cada chip como función Python desde NAND)
Después seguiría el Nivel 2 (ALGO, BDATOS, SO, REDES, IIA) y Nivel 3 (ML, DL, NLP, CV, RL, ROB).

### Mejoras de la app (independientes del contenido)
- **Persistencia**: hoy el progreso se pierde al recargar. Meter Supabase (tabla de
  progreso por materia/lección) es el paso que desbloquea los repasos espaciados.
- **Backend del tutor**: el `fetch` a la API de Anthropic funciona en el sandbox de
  desarrollo; en un deploy real (Vercel) necesita una serverless function que guarde
  la API key del lado del servidor.
- **Repasos espaciados**: una vez que hay persistencia, agregar el scheduler y ampliar
  el pool de preguntas de quiz por lección.

## Cómo agregar una materia nueva a la app (referencia rápida)
1. Escribir las lecciones como datos y validarlas ejecutando ejemplos + tests.
2. Generar el bloque JS (mismo formato que los de `app/bloques-contenido/`).
3. Pegar el bloque en `MATERIAS_CONTENIDO` y su config en `MATERIAS_CONFIG`
   (con su `nivel`). El árbol ya agrupa por nivel solo — no hay que tocar el TreePanel.
4. Si la materia estaba como placeholder en `OTHER_TREE`, quitarla de ahí.
5. Compilar para verificar y ejecutar los tests del contenido serializado.

## Método de trabajo que se venía usando (para replicar calidad)
- Verificar el temario oficial contra la fuente (OCW/Coursera) ANTES de mapear.
- Escribir el contenido como datos Python (no directo en JSX) para poder ejecutarlo.
- **Doble revisión antes de cerrar**: (1) ejecutar ejemplos + ejercicios contra
  solución, leer cada respuesta de quiz; (2) reejecutar el contenido ya serializado
  en el JSX para descartar corrupción, y compilar con esbuild.
