# FUENTES POR LECCIÓN — ALG Álgebra Lineal
Versión 1.0 · Julio 2026 · Cumplimiento del no negociable #4: toda teoría con fuente

## 1. Las fuentes canónicas de la materia

| # | Fuente | Qué aporta | Acceso |
|---|--------|-----------|--------|
| F1 | **MIT 18.06SC** "Linear Algebra" (Fall 2011, Gilbert Strang, formato OCW Scholar) — ocw.mit.edu | Columna vertebral: 35 videos de clase + 36 videos cortos de resolución de problemas hechos por los TAs, apuntes, problem sets con solución. **Diseñado explícitamente para estudiantes independientes** (por eso se elige la versión SC y no la 2010) | Gratis · CC BY-NC-SA |
| F2 | **3Blue1Brown** "Essence of Linear Algebra" (Grant Sanderson, YouTube) — 16 videos | Intuición geométrica de cada concepto (qué SIGNIFICA una matriz, un determinante, un autovector). Rol equivalente al de CS50P en PRG1: la segunda explicación que hace que cierre | Gratis |
| F3 | **"Introduction to Linear Algebra"** (Gilbert Strang) — el libro del curso | Texto de referencia; el propio 18.06SC lo sigue capítulo por capítulo | Pago (opcional; los apuntes de OCW alcanzan) |
| F4 | **Problem sets y exámenes con solución de 18.06SC** (OCW) | Base de ejercicios calificados y del integrador | Gratis |

Nota de licencia: MIT OCW es CC BY-NC-SA → adaptación CON atribución y SIN uso
comercial. Cada lección de la app cita su fuente en el campo `fuente`.

Nota de estrategia (crítica para esta materia): el álgebra lineal es la materia
más **visual** de Nivel 0. La regla de oro acá es: **el concepto se presenta con
3Blue1Brown (intuición) y se formaliza con Strang (mecánica)**. Si una lección no
cierra solo con texto, el `example` debe hacer visible el número (ej. imprimir la
matriz resultante, mostrar el vector transformado), porque en álgebra lineal ver
el resultado ES entender.

## 2. Método de extracción por lección

1. **Video de 3Blue1Brown del tema** → intuición geométrica para el primer párrafo
   de `theory` (qué significa, no cómo se calcula).
2. **Video de clase de 18.06SC de Strang** → la mecánica formal para el segundo
   párrafo de `theory`.
3. **Apuntes + ejemplos trabajados de esa sesión** → el `example`, ambientado en
   el contexto de la app (stock por sucursal como vectores, etc.), computable.
4. **Problem set de esa unidad** → el `exercise` calificado.
5. **Videos cortos de los TAs (resolución de problemas)** → inspiración para el
   `quiz` y para las variantes de repaso.
6. **Libro de Strang** → consulta puntual de definiciones exactas.

## 3. Temario oficial de referencia (18.06SC, verificado contra OCW)

**Unidad I — Ax = b y los cuatro subespacios**: Geometry of Linear Equations ·
Elimination with Matrices · Multiplication and Inverse Matrices · Factorization
A = LU · Transposes, Permutations, Vector Spaces · Column Space and Nullspace ·
Solving Ax = 0 (Pivot Variables, Special Solutions) · Solving Ax = b (Row Reduced
Form R) · Independence, Basis and Dimension · The Four Fundamental Subspaces ·
Matrix Spaces, Rank 1, Small World Graphs · Graphs, Networks, Incidence Matrices.

**Unidad II — Mínimos cuadrados, determinantes y autovalores**: Orthogonal Vectors
and Subspaces · Projections onto Subspaces · Projection Matrices and Least Squares ·
Orthogonal Matrices and Gram-Schmidt · Properties of Determinants · Determinant
Formulas and Cofactors · Cramer's Rule, Inverse Matrix and Volume · Eigenvalues and
Eigenvectors · Diagonalization and Powers of A · Differential Equations and exp(At) ·
Markov Matrices, Fourier Series.

**Unidad III — Matrices definidas positivas y aplicaciones**: Symmetric Matrices and
Positive Definiteness · Complex Matrices, FFT · Positive Definite Matrices and Minima ·
Similar Matrices and Jordan Form · Singular Value Decomposition · Linear Transformations
and their Matrices · Change of Basis, Image Compression · Left and Right Inverses,
Pseudoinverse.

## 4. Mapeo lección → fuente exacta

Una lección nuestra ≠ una sesión de MIT: partimos en lecciones atómicas y
seleccionamos lo relevante para el track de IA (el objetivo de la materia es
llegar a autovalores/SVD, que son la base de PCA en ML). Se marcan como
"(panorama)" los temas avanzados de Strang que se ven a nivel introductorio.

| Lección nuestra | 18.06SC (Strang) | 3Blue1Brown | Refuerzo |
|---|---|---|---|
| **A01** Vectores y combinaciones lineales | The Geometry of Linear Equations | Cap. 1-2 (Vectors; Linear combinations, span) | Strang cap. 1 |
| **A02** Producto matriz-vector y span | The Geometry of Linear Equations | Cap. 3 (Linear transformations and matrices) | — |
| **A03** Independencia lineal, base y dimensión | Independence, Basis and Dimension | Cap. 2 (span, independencia) | PS de Unidad I |
| **A04** Multiplicación de matrices como composición | Multiplication and Inverse Matrices | Cap. 4 (Matrix multiplication as composition) | Strang cap. 2 |
| **A05** Sistemas y eliminación de Gauss | Elimination with Matrices | Cap. 6-7 (inverse, column space intro) | Solving Ax = b |
| **A06** Matriz inversa | Multiplication and Inverse Matrices | Cap. 7 (Inverse matrices) | — |
| **A07** Espacio columna y espacio nulo | Column Space and Nullspace | Cap. 7-8 (Null space, column space) | The Four Fundamental Subspaces |
| **A08** Los cuatro subespacios fundamentales | The Four Fundamental Subspaces | Cap. 8 | Solving Ax = 0 |
| **A09** Producto interno, longitud y ortogonalidad | Orthogonal Vectors and Subspaces | Cap. 9 (Dot products and duality) | Strang cap. 1.2 |
| **A10** Proyecciones | Projections onto Subspaces | Cap. 9 | Projection Matrices and Least Squares |
| **A11** Mínimos cuadrados | Projection Matrices and Least Squares | — | PS de Unidad II (aplicación: ajuste de datos) |
| **A12** Determinante | Properties of Determinants + Determinant Formulas and Cofactors | Cap. 6 (The determinant) | Cramer's Rule, Inverse Matrix and Volume |
| **A13** Autovalores y autovectores | Eigenvalues and Eigenvectors | Cap. 14 (Eigenvectors and eigenvalues) | Diagonalization and Powers of A |
| **A14** Diagonalización | Diagonalization and Powers of A | Cap. 14 | — |
| **A15** Matrices simétricas y definidas positivas | Symmetric Matrices and Positive Definiteness | Cap. 14 (contexto) | Unidad III |
| **A16** SVD: descomposición en valores singulares | Singular Value Decomposition | Cap. 15-16 (Abstract vector spaces, contexto) | Change of Basis; conecta con PCA en ML |
| **A17** Proyecto integrador | Problem sets + exámenes de las 3 unidades (nivel de exigencia) | — | — |

## 5. Reglas de calidad al preparar cada lección

1. **Nunca redactar teoría de memoria**: partir del video/apuntes de la sesión
   fuente. Lo que no esté en la fuente, no entra.
2. **Intuición primero, mecánica después**: primer párrafo de `theory` desde
   3Blue1Brown (qué significa), segundo desde Strang (cómo se calcula). Es la
   pedagogía que hace de esta materia la más accesible si se enseña bien.
3. **El ejemplo debe hacer visible el número**: en álgebra lineal, imprimir la
   matriz/vector resultante ES la explicación. Nada de ejemplos que no muestren.
4. **Ejercicios computables sin NumPy**: el runner es Pyodide y NumPy pesa. Los
   ejercicios se resuelven con listas de listas y loops (producto punto, multiplicar
   matriz chica, transponer, verificar independencia con eliminación). Esto además
   OBLIGA al alumno a entender la mecánica en vez de llamar a `np.linalg`.
5. **Los problem sets marcan el nivel del integrador** (A17): debe exigir lo mismo
   que un examen de 18.06SC, resoluble a mano/código sin librerías.
6. **Norte de la materia = SVD/autovalores**: cada lección se elige por su aporte
   a llegar ahí, porque eso es lo que ML (PCA), CV y NLP van a necesitar. Los
   temas de Strang no alineados con IA (Jordan form, FFT, Fourier series) se
   omiten o quedan como mención.
7. **Atribución**: campo `fuente` + link ("¿Querés la clase completa? → MIT OCW
   18.06SC / 3Blue1Brown Cap. X").

## 6. Cola de trabajo derivada

- [ ] Escribir el contenido de las 17 lecciones A01-A17 (teoría + ejemplo + quiz +
      ejercicio computable) y validarlo ejecutando cada uno, como se hizo con MDIS.
- [ ] Extraer los problem sets de las 3 unidades de 18.06SC → ejercicios y A17.
- [ ] Mapear los 36 videos cortos de los TAs → pool de quiz para repasos espaciados.
- [ ] Al insertar en el JSX: agregar ALG a MATERIAS_CONTENIDO y a MATERIAS_CONFIG
      (order A01..A17, nivel "NIVEL 0"), y quitar ALG de los placeholders de OTHER_TREE.
