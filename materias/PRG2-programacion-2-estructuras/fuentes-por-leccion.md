# FUENTES POR LECCIÓN — PRG2 Programación II / Estructuras de Datos
Versión 1.0 · Julio 2026 · Cumplimiento del no negociable #4: toda teoría con fuente

## 1. Las fuentes canónicas de la materia

| # | Fuente | Qué aporta | Acceso |
|---|--------|-----------|--------|
| F1 | **Princeton "Algorithms, Part I"** (Robert Sedgewick & Kevin Wayne, Coursera) — coursera.org/learn/algorithms-part1 | Columna vertebral: 6 semanas de video, slides, quizzes de práctica y programming assignments con autograder | Gratis (todos los materiales) |
| F2 | **"Algorithms, 4th Edition"** (Sedgewick & Wayne) + booksite algs4.cs.princeton.edu | Libro del curso; cada semana mapea a secciones exactas. El booksite tiene el código y demos visuales | Booksite gratis; libro pago (opcional) |
| F3 | **Interview Questions** del propio curso (opcionales) | Inspiración para variantes de repaso y ejercicios de nivel entrevista | Gratis |
| F4 | Soluciones de referencia de los assignments (repos comunitarios en GitHub, p.ej. MeghaJakhotia, vanJker) | Verificación de nivel de exigencia | Gratis |

Nota de licencia: los materiales del curso son de acceso libre en Coursera.
El libro es de Sedgewick & Wayne (uso educativo con atribución).

**Nota de LENGUAJE (crítica para esta materia):** el curso de Princeton usa
**Java**; nuestros ejercicios son en **Python**. Esto NO viola "no inventar
teoría": la teoría de estructuras de datos (union-find, análisis de costo,
pilas/colas, ordenamientos, BST, hashing) es idéntica en cualquier lenguaje y
sale de las clases y del libro de Sedgewick. Solo se adapta la *mecánica de
implementación* a Python, igual que en PRG1 se adaptaban los ejemplos de MIT al
contexto industrial. La regla es: el CONCEPTO y el análisis de costo salen de la
fuente; la sintaxis de implementación es Python (listas, dicts, clases).

## 2. Método de extracción por lección

1. **Video de la semana correspondiente de Sedgewick** → explicación conceptual
   para `theory` (qué es la estructura y su costo).
2. **Sección del libro (Algorithms 4th) + demo del booksite** → el `example`,
   traducido a Python y ambientado en el contexto de la app (stock, pedidos,
   turnos), computable en Pyodide.
3. **Quiz de práctica de la semana** → inspiración para el `quiz` (drill corto:
   trazar la ejecución, predecir el costo).
4. **Programming assignment de la semana** → base del `exercise` calificado,
   reducido a una función Python verificable con assert.
5. **Interview questions** → variantes de repaso.
6. **Booksite** → consulta puntual de código y análisis.

## 3. Temario oficial de referencia (Princeton Algorithms Part I, verificado)

Numeración de semanas verificada contra Coursera + mapeo a capítulos del libro
(referencia: repos de self-learning que citan libro y semana).

Semana 1: Course Introduction · Union-Find (§1.5) · Analysis of Algorithms (§1.4)
Semana 2: Stacks and Queues (§1.3) · Elementary Sorts (§2.1)
Semana 3: Mergesort (§2.2) · Quicksort (§2.3)
Semana 4: Priority Queues / Heaps (§2.4) · Elementary Symbol Tables + BST (§3.1-3.2)
Semana 5: Balanced Search Trees (§3.3) · Geometric applications of BST (§3.4 contexto)
Semana 6: Hash Tables (§3.4) · Symbol Table Applications (§3.5)

## 4. Mapeo lección → fuente exacta

Una lección nuestra ≠ una semana de MIT/Princeton: partimos en lecciones
atómicas. Se prioriza lo que sirve al perfil (estructuras que el alumno usará en
software real y en el pipeline de datos de ML).

| Lección nuestra | Princeton Part I | Libro (Algorithms 4e) | Refuerzo |
|---|---|---|---|
| **P01** Análisis de costo y notación O | Week 1: Analysis of Algorithms | §1.4 | Puente desde MDIS M15 (asintótica) |
| **P02** Union-Find (conectividad dinámica) | Week 1: Union-Find | §1.5 | Assignment: Percolation |
| **P03** Pilas (stacks) | Week 2: Stacks and Queues | §1.3 | — |
| **P04** Colas (queues) | Week 2: Stacks and Queues | §1.3 | Assignment: Deques and Randomized Queues |
| **P05** Listas enlazadas | Week 2: Stacks and Queues (implementación con linked list) | §1.3 | — |
| **P06** Ordenamientos elementales (selection, insertion) | Week 2: Elementary Sorts | §2.1 | Quiz: trazar la ejecución |
| **P07** Mergesort | Week 3: Mergesort | §2.2 | Puente desde MDIS M16 (recurrencias) |
| **P08** Quicksort | Week 3: Quicksort | §2.3 | — |
| **P09** Colas de prioridad y heaps | Week 4: Priority Queues | §2.4 | Assignment (heap) |
| **P10** Heapsort | Week 4: Priority Queues (heapsort) | §2.4 | — |
| **P11** Tablas de símbolos y búsqueda binaria | Week 4: Elementary Symbol Tables | §3.1 | — |
| **P12** Árboles binarios de búsqueda (BST) | Week 4: BSTs | §3.2 | Puente desde MDIS M12 (árboles) |
| **P13** Árboles balanceados (panorama: rojo-negro) | Week 5: Balanced Search Trees | §3.3 | — |
| **P14** Tablas hash | Week 6: Hash Tables | §3.4 | — |
| **P15** Aplicaciones de tablas de símbolos | Week 6: Symbol Table Applications | §3.5 | — |
| **P16** Elegir la estructura adecuada (síntesis) | Síntesis de todo el curso | Cap. 1-3 | Interview questions |
| **P17** Proyecto integrador | Programming assignments (nivel de exigencia) | — | — |

## 5. Reglas de calidad al preparar cada lección

1. **Nunca redactar teoría de memoria**: partir del video/slide o de la sección
   del libro. El análisis de costo (O(...)) de cada estructura DEBE salir de la
   fuente, no estimarse.
2. **Teoría en cualquier lenguaje, código en Python**: el concepto sale de
   Sedgewick (Java); la implementación es Python idiomático (listas, dicts,
   clases). Nunca traducir Java literal: reescribir en Python.
3. **Todo ejercicio reporta o usa el costo**: en esta materia el costo (tiempo/
   memoria) es parte del contenido, no un adorno. Cuando aplique, el quiz
   pregunta el costo y el ejercicio lo respeta.
4. **Ejercicios computables sin librerías pesadas**: estructuras implementadas a
   mano (no usar `collections.deque` cuando el punto es implementar la cola).
   Pyodide corre todo; el objetivo es que el alumno construya la estructura.
5. **Los programming assignments marcan el nivel del integrador** (P17): debe
   exigir combinar 2-3 estructuras en un caso realista.
6. **Conexiones explícitas hacia atrás y adelante**: P01 retoma la asintótica de
   MDIS M15; P07 retoma recurrencias de MDIS M16; P12 retoma árboles de MDIS M12.
   Y hacia adelante: estas estructuras son la base de ALGO (Nivel 2).
7. **Atribución**: campo `fuente` + link ("¿Querés la clase completa? →
   Princeton Algorithms Part I, Week X / booksite §Y").

## 6. Cola de trabajo derivada

- [ ] Escribir el contenido de las 17 lecciones P01-P17 (teoría + ejemplo + quiz
      + ejercicio computable) y validarlo ejecutando cada uno, como en MDIS/ALG.
- [ ] Extraer los quizzes de práctica de las 6 semanas → pool de quiz para repasos.
- [ ] Mapear los programming assignments → variantes del integrador P17.
- [ ] Al insertar en el JSX: agregar PRG2 a MATERIAS_CONTENIDO y MATERIAS_CONFIG
      (order P01..P17, nivel "NIVEL 1"), y agregar el nivel "NIVEL 1" al árbol si
      todavía no está como sección interactiva.
