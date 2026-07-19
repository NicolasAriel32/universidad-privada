# FUENTES POR LECCIÓN — PRG1 Programación I - IA
Versión 1.0 · Julio 2026 · Cumplimiento del no negociable #4: toda teoría con fuente

## 1. Las cuatro fuentes canónicas de la materia

| # | Fuente | Qué aporta | Acceso |
|---|---|---|---|
| F1 | **MIT 6.100L** "Introduction to CS and Programming Using Python" (Fall 2022, Dra. Ana Bell) — ocw.mit.edu | Columna vertebral: 26 clases con video, apuntes PDF, código de cada clase, finger exercises, problem sets con solución y recitaciones | Gratis, licencia CC BY-NC-SA |
| F2 | **Harvard CS50P** "Introduction to Programming with Python" — cs50.harvard.edu/python | Segunda explicación de cada tema (pedagogía más pausada) + problem sets autocorregibles | Gratis |
| F3 | **Python Tutorial oficial** — docs.python.org/es/3/tutorial (¡existe en castellano!) | Referencia de sintaxis exacta y comportamiento del lenguaje | Gratis |
| F4 | **Think Python 3e** (Allen Downey) — greenteapress.com/wp/think-python-3rd-edition | Libro de texto gratuito, capítulos cortos, para leer offline | Gratis, CC |

Nota de licencia: MIT OCW es CC BY-NC-SA → se puede adaptar el material a
tus lecciones CON atribución y SIN uso comercial. Como tu universidad es
personal y sin fines de lucro, estás dentro de la licencia. Cada lección
de la app ya cita su fuente en el campo `fuente`.

## 2. Método de extracción por lección (mejores prácticas)

Para preparar cada Lxx, el flujo es siempre el mismo:
1. **Video de la clase de 6.100L** (o su transcript, que OCW publica) → la
   explicación conceptual. De acá sale la sección `theory` de la lección,
   reescrita y comprimida a 2-3 párrafos.
2. **Lecture Notes (PDF) + Lecture Code de esa clase** → los ejemplos
   canónicos. De acá se adapta el campo `example` (nosotros lo ambientamos
   en tu contexto industrial, la mecánica es la de MIT).
3. **Finger exercises de la clase** → inspiración directa para el `quiz`
   (MIT los usa exactamente para eso: chequeo de comprensión inmediato).
4. **Problem set correspondiente + CS50P problem set** → base de los
   `exercise` calificados y de las variantes de repaso.
5. **CS50P de la semana equivalente** → segunda pasada si el tema no
   cerró (regla del tutor: "si no lo entendiste con MIT, miralo en CS50P").
6. **Python Tutorial (es) / Think Python** → consulta puntual de sintaxis.

## 3. Mapeo lección → fuente exacta

Numeración de clases verificada contra el índice oficial de OCW
(pages/material-by-lecture). CS50P por semanas (W0-W9).

| Lección nuestra | MIT 6.100L | CS50P | Refuerzo |
|---|---|---|---|
| **L01** Primer programa: print e intérprete | Lec 1: Introduction (qué es computar, objetos, tipos, IDEs) | W0: Functions, Variables | Think Python cap. 1; Tutorial §3 |
| **L02** Variables y tipos | Lec 1: Introduction (variables, bindings, types) | W0 | Think Python cap. 2 |
| **L03** Operadores y expresiones | Lec 1 (operaciones matemáticas) + finger exercises Lec 1 | W0 | Tutorial §3.1 (es) |
| **L04** Strings y f-strings | Lec 2: Strings, Input/Output, and Branching | W0 | Tutorial §7.1 (formateo) |
| **L05** Conversión de tipos e input | Lec 2 (Input/Output, casting) | W0 | Think Python cap. 5 |
| **L06** Condicionales if/elif/else | Lec 2 (Branching) | W1: Conditionals | Think Python cap. 5 |
| **L07** while | Lec 3: Iteration | W2: Loops | Think Python cap. 7 |
| **L08** for y range | Lec 3: Iteration + Lec 4: Loops over Strings, Guess-and-Check | W2 | Tutorial §4.2-4.3 |
| **L09** break, continue, anidados | Lec 4 (guess-and-check usa exactamente estos patrones) | W2 | Tutorial §4.4-4.5 |
| **L10** Listas | Lec 9: Lambda, Tuples, and Lists + Lec 10: Lists, Mutability | W2 (listas) | Think Python cap. 9 |
| **L11** Métodos de listas y slicing | Lec 10: Lists, Mutability + Lec 11: Aliasing, Cloning | W2 | Tutorial §5.1 |
| **L12** Diccionarios | Clase de Dictionaries de 6.100L (ver índice OCW, sigue a Lec 11) | W2 (dicts) | Think Python cap. 10; Tutorial §5.5 |
| **L13** Tuplas, sets, cuándo usar cada una | Lec 9 (tuples) + Tutorial §5.3-5.4 (sets: la fuente principal acá es la doc oficial) | W2 | Think Python cap. 11 |
| **L14** Funciones: definir y llamar | Lec 7: Decomposition, Abstraction, Functions | W0 (functions) | Think Python cap. 3 |
| **L15** Parámetros con defecto, retorno múltiple | Lec 8: Functions as Objects + Tutorial §4.9 (argumentos default/keyword) | W0 | — |
| **L16** Errores y try/except | Clase de Exceptions/Assertions de 6.100L + **CS50P W3: Exceptions (fuente principal: es la mejor explicación introductoria que existe del tema)** | W3 | Tutorial §8 |
| **L17** Proyecto integrador | Problem Sets 1-3 de 6.100L (estructura y nivel de exigencia) | Problem sets W0-W3 | — |

## 4. Reglas de calidad al preparar cada lección

1. **Nunca redactar teoría de memoria**: siempre partir del PDF de apuntes
   o transcript de la clase fuente. Lo que no esté en la fuente, no entra.
2. **Una lección nuestra ≠ una clase de MIT**: 6.100L mete varios temas
   por clase; nosotros los partimos en lecciones atómicas (estilo
   W3Schools). El mapeo de arriba indica de QUÉ clase sale cada pedazo.
3. **Los finger exercises son el estándar del quiz**: preguntas cortas,
   una sola idea, respuesta verificable. Copiar el formato, no el texto.
4. **Los problem sets marcan el nivel del integrador**: L17 debe exigir
   lo mismo que el PS3 de MIT, ni más ni menos.
5. **El orden pedagógico moderno se respeta**: variables → strings →
   branching → iteración → colecciones → funciones → excepciones es el
   orden tanto de 6.100L como de CS50P. Nuestra secuencia L01-L17 lo sigue
   con una sola alteración deliberada: funciones formales van al final
   (M4) pero se ANTICIPAN desde L06 con plantillas, práctica avalada por
   CS50P que enseña funciones desde la semana 0.
6. **Atribución**: cada lección lleva su campo `fuente` (ya implementado)
   y la app muestra el link al material original ("¿Querés la clase
   completa? → MIT OCW Lec X").

## 5. Cola de trabajo derivada

- [ ] Descargar los PDFs de Lecture Notes de las clases 1-12 de 6.100L
      (base para revisar/regenerar la teoría de L01-L13 con máxima fidelidad).
- [ ] Extraer los finger exercises de las clases 1-12 → ampliar el pool
      de quiz por lección (necesario para los repasos espaciados, que
      requieren preguntas nuevas en cada repaso).
- [ ] Mapear PS1-PS3 de 6.100L → variantes del proyecto integrador L17.
- [ ] Repetir este documento para MDIS (fuente: MIT 6.042J) y ALG
      (fuente: MIT 18.06 + 3Blue1Brown) cuando toque escribir sus lecciones.
