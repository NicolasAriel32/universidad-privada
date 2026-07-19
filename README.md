# Universidad Privada — Diseño de la carrera Ing. en IA

> **Para retomar el proyecto**: leé primero `ESTADO-DEL-PROYECTO.md` en la raíz — tiene el estado actual, qué está hecho y qué falta.

Estructura de diseño curricular de la carrera, construida con el método de las universidades
modernas y con la regla no negociable **"no inventar teoría"** aplicada en dos capas:
el **contenido** (sale de MIT/Harvard/Stanford/etc.) y la **estructura** (sale de CS2023 + OSSU
+ pedagogía de diseño hacia atrás).

## Estructura
```
00-CARRERA/           → perfil de egresado, áreas de conocimiento, mapa de la carrera
materias/<CODE>-.../  → conceptos.md (temas centrales + objetivos de aprendizaje Bloom)
fuentes/              → índice maestro + fuente canónica por materia (con validación OSSU/CS2023)
```

## Cómo se usó el método
1. **Perfil de egresado primero** (UdeSA) → define qué debe *saber hacer* el graduado.
2. **Perfil → áreas de conocimiento**, validadas contra CS2023 (competencias) y OSSU (cursos).
3. **Áreas → materias**, ordenadas por prerrequisitos (secuencia OSSU).
4. **Por materia → temas centrales → objetivos de aprendizaje** con taxonomía de Bloom.
5. **Alineación constructiva**: cada objetivo se evalúa con el quiz/ejercicio de su lección.
6. **Recién ahí se escribe la teoría**, siempre desde la fuente canónica.

## Próximo paso sugerido
Expandir los objetivos por tema (hoy completos en Nivel 0) al resto de las materias, y
arrancar el documento "FUENTES POR LECCIÓN" de MDIS (MIT 6.042J), como el que ya existe para PRG1.
