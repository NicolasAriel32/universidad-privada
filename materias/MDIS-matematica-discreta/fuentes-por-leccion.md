# FUENTES POR LECCIÓN — MDIS Matemática Discreta
Versión 1.0 · Julio 2026 · Cumplimiento del no negociable #4: toda teoría con fuente

## 1. Las fuentes canónicas de la materia

| # | Fuente | Qué aporta | Acceso |
|---|--------|-----------|--------|
| F1 | **MIT 6.042J** "Mathematics for Computer Science" (Fall 2010, Tom Leighton & Marten van Dijk) — ocw.mit.edu | Columna vertebral: 25 clases con video, apuntes completos (PDF único de 3 MB en Readings), 12 problem sets, recitaciones y exámenes con solución | Gratis · CC BY-NC-SA |
| F2 | **"Mathematics for Computer Science"** (Lehman, Leighton, Meyer) — el libro oficial del curso, en la sección Readings de OCW | Texto de referencia; cubre temas que la versión Fall 2010 no dedica clase propia (conjuntos, funciones, lógica formal) | Gratis · PDF |
| F3 | **MITx 6.042J en Open Learning Library** (versión 2T2019) — openlearninglibrary.mit.edu | Segunda pasada con ejercicios autocorregibles (rol equivalente al de CS50P en PRG1) | Gratis |
| F4 | **Soluciones a problem sets** — spamegg1 (2015/2019) y frevib (2010) en GitHub; soluciones 2005 en OCW | Verificación de ejercicios calificados | Gratis |

Nota de licencia: MIT OCW es CC BY-NC-SA → se puede adaptar el material CON
atribución y SIN uso comercial. Cada lección de la app cita su fuente en el
campo `fuente`.

## 2. Método de extracción por lección

Idéntico al de PRG1:
1. **Video de la clase de 6.042J** (o su transcript) → sección `theory`,
   reescrita y comprimida a 2-3 párrafos.
2. **Apuntes completos (Complete Course Notes) + capítulo del libro** → el
   `example`, ambientado en el contexto industrial de la app (la matemática
   es la de MIT).
3. **Problemas de recitación de esa semana** → inspiración para el `quiz`
   (rol de los finger exercises de 6.100L: chequeo corto de una sola idea).
4. **Problem set correspondiente** → base del `exercise` calificado.
5. **MITx OLL 2019** → segunda pasada si el tema no cerró.
6. **Libro (Lehman-Leighton-Meyer)** → consulta puntual y temas sin clase
   propia (conjuntos, funciones, lógica formal).

## 3. Calendario oficial de referencia (Fall 2010, verificado contra OCW)

Lec 1 Introduction and proofs · Lec 2 Induction · Lec 3 Strong induction ·
Lec 4-5 Number theory I-II · Lec 6 Graph theory and coloring · Lec 7 Matching
problems · Lec 8 Graph theory II: minimum spanning trees · Lec 9 Communication
networks · Lec 10 Graph theory III · Lec 11 Relations, partial orders, and
scheduling · Lec 12 Sums · Lec 13 Sums and asymptotics · Lec 14 Divide and
conquer recurrences · Lec 15 Linear recurrences · Lec 16-17 Counting rules
I-II · Lec 18 Probability introduction · Lec 19 Conditional probability ·
Lec 20 Independence · Lec 21 Random variables · Lec 22-23 Expectation I-II ·
Lec 24 Large deviations · Lec 25 Random walks

## 4. Mapeo lección → fuente exacta

Una lección nuestra ≠ una clase de MIT: partimos las clases en lecciones
atómicas. Cuando un tema no tiene clase propia en Fall 2010, la fuente
principal es el capítulo del libro (marcado como "Libro cap. X" — el libro
es la fuente F2, no invención).

| Lección nuestra | MIT 6.042J | Refuerzo |
|---|---|---|
| **M01** Proposiciones y demostración directa | Lec 1: Introduction and proofs | Libro cap. 1 (What is a Proof?) |
| **M02** Lógica: conectivos y cuantificadores | Libro cap. 3 (Logical Formulas) — sin clase propia en F2010 | MITx OLL Unidad de lógica |
| **M03** Demostración por contradicción y contrapositiva | Lec 1 + Libro cap. 1 | Recitación 1 |
| **M04** Inducción | Lec 2: Induction | PS1; Libro cap. 5 |
| **M05** Inducción fuerte y buen orden | Lec 3: Strong induction | Libro cap. 5 |
| **M06** Conjuntos y funciones | Libro cap. 4 (Mathematical Data Types) — sin clase propia en F2010 | MITx OLL |
| **M07** Relaciones y órdenes parciales | Lec 11: Relations, partial orders, and scheduling | Libro cap. 9 |
| **M08** Divisibilidad y MCD (Euclides) | Lec 4: Number theory I | PS2; Libro cap. 8 |
| **M09** Aritmética modular y congruencias | Lec 5: Number theory II | Libro cap. 8 (aplicación: criptografía) |
| **M10** Grafos: definiciones y coloreo | Lec 6: Graph theory and coloring | PS3; Libro cap. 11 |
| **M11** Matching y grafos bipartitos | Lec 7: Matching problems | Libro cap. 11 |
| **M12** Árboles y árbol de expansión mínima | Lec 8: Graph theory II: minimum spanning trees | PS4 |
| **M13** Conectividad y recorridos | Lec 9: Communication networks + Lec 10: Graph theory III | PS5 |
| **M14** Sumas y series | Lec 12: Sums | PS6; Libro cap. 13 |
| **M15** Asintótica y notación O | Lec 13: Sums and asymptotics | Libro cap. 13 (puente directo a ALGO) |
| **M16** Recurrencias | Lec 14: Divide and conquer recurrences + Lec 15: Linear recurrences | PS7 |
| **M17** Conteo: reglas básicas y permutaciones | Lec 16: Counting rules I | PS8; Libro cap. 14 |
| **M18** Combinaciones, palomar e inclusión-exclusión | Lec 17: Counting rules II | Libro cap. 14-15 |
| **M19** Probabilidad: espacios muestrales | Lec 18: Probability introduction | PS9; Libro cap. 16 |
| **M20** Probabilidad condicional y Bayes | Lec 19: Conditional probability | PS10 |
| **M21** Independencia | Lec 20: Independence | Libro cap. 17 |
| **M22** Variables aleatorias | Lec 21: Random variables | PS11; Libro cap. 19 |
| **M23** Esperanza | Lec 22: Expectation I + Lec 23: Expectation II | PS12 |
| **M24** Desviaciones y paseos aleatorios (cierre) | Lec 24: Large deviations + Lec 25: Random walks | Libro cap. 20-21 |
| **M25** Proyecto integrador | Problem sets 6, 8 y 12 (nivel de exigencia) + exámenes con solución de OCW | — |

## 5. Reglas de calidad al preparar cada lección

1. **Nunca redactar teoría de memoria**: siempre partir de los apuntes
   completos (Complete Course Notes) o del capítulo del libro. Lo que no
   esté en la fuente, no entra.
2. **Las recitaciones son el estándar del quiz**: problemas cortos de una
   sola idea con respuesta verificable. Copiar el formato, no el texto.
3. **Los problem sets marcan el nivel de los ejercicios calificados** y el
   integrador M25 debe exigir lo mismo que un PS de mitad de curso.
4. **El orden pedagógico de F2010 se respeta** con una alteración
   deliberada: adelantamos "Conjuntos y funciones" (M06) y "Lógica formal"
   (M02) desde el libro, porque el libro mismo los presenta antes que
   grafos y son prerrequisito conceptual de relaciones y conteo.
5. **Los ejercicios calificados en la app son computables**: como el runner
   es Pyodide, cada ejercicio de MDIS se formula como función Python
   verificable (ej. implementar Euclides, contar combinaciones, simular una
   probabilidad) — la demostración en papel se practica en el quiz y se
   verifica contra las soluciones de F4.
6. **Atribución**: cada lección lleva su campo `fuente` y el link al
   material original ("¿Querés la clase completa? → MIT OCW 6.042J Lec X").

## 6. Cola de trabajo derivada

- [ ] Descargar el PDF de Complete Course Notes (3 MB, sección Readings de
      OCW) — base de la teoría de M01-M24.
- [ ] Descargar los 12 problem sets con solución → base de ejercicios
      calificados y del integrador M25.
- [ ] Extraer problemas de recitación de las semanas 1-13 → pool de quiz
      (necesario para repasos espaciados).
- [ ] Repetir este documento para ALG (MIT 18.06 + 3Blue1Brown) cuando
      toque escribir sus lecciones.
