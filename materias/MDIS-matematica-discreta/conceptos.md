# MDIS — Matemática Discreta

- **Nivel**: Nivel 0
- **Área de conocimiento**: Matemática para IA
- **Fuente canónica**: MIT 6.042J Mathematics for Computer Science

## Objetivo de la materia

Razonar formalmente sobre objetos discretos: demostrar afirmaciones, contar, modelar con grafos y calcular probabilidades discretas — la base matemática de algoritmos e IA.

## Temas centrales y objetivos de aprendizaje

### 1. Demostraciones y lógica

**Conceptos que lo integran**: proposiciones, conectivos lógicos, cuantificadores, implicación, demostración directa, contradicción, inducción, inducción fuerte.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Traducir (Aplicar) enunciados en lenguaje natural a lógica proposicional/de predicados.
- Construir (Crear) demostraciones por inducción y por contradicción.
- Evaluar (Evaluar) si un argumento dado es válido o contiene una falacia.

### 2. Conjuntos, funciones y relaciones

**Conceptos que lo integran**: conjuntos, funciones, relaciones, relaciones de equivalencia, órdenes parciales.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Distinguir (Entender) tipos de relaciones (equivalencia, orden parcial) con ejemplos.
- Aplicar (Aplicar) operaciones de conjuntos a problemas de conteo.
- Modelar (Aplicar) un problema de scheduling como orden parcial (como en Lec 11 de 6.042J).

### 3. Teoría de números

**Conceptos que lo integran**: divisibilidad, MCD / algoritmo de Euclides, aritmética modular, congruencias.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Ejecutar (Aplicar) el algoritmo de Euclides a mano y en código.
- Calcular (Aplicar) con aritmética modular.
- Explicar (Entender) el rol de la teoría de números en criptografía.

### 4. Grafos

**Conceptos que lo integran**: grafos y dígrafos, coloreo, matching, árboles, árbol de expansión mínima, conectividad.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Modelar (Aplicar) un problema real como grafo.
- Analizar (Analizar) propiedades de un grafo (conectividad, ciclos, bipartito).
- Aplicar (Aplicar) un algoritmo de árbol de expansión mínima a un caso concreto.

### 5. Sumas, asintótica y recurrencias

**Conceptos que lo integran**: sumas y series, notación O, crecimiento de funciones, recurrencias divide-y-vencerás, recurrencias lineales.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Calcular (Aplicar) sumas cerradas de series aritméticas y geométricas.
- Comparar (Analizar) el crecimiento de funciones con notación O — puente directo a ALGO.
- Resolver (Aplicar) recurrencias simples de divide y vencerás.

### 6. Conteo

**Conceptos que lo integran**: principios de conteo, permutaciones, combinaciones, principio del palomar, inclusión-exclusión.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Contar (Aplicar) configuraciones con permutaciones y combinaciones.
- Elegir (Analizar) la técnica de conteo adecuada para un problema dado.
- Aplicar (Aplicar) el principio del palomar a demostraciones de existencia.

### 7. Probabilidad discreta

**Conceptos que lo integran**: espacios muestrales, probabilidad condicional, Bayes, independencia, variables aleatorias, esperanza.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Calcular (Aplicar) probabilidades condicionales y esperanzas.
- Aplicar (Aplicar) el teorema de Bayes a un caso concreto.
- Modelar (Aplicar) incertidumbre discreta simulándola en código.

> **Nota de fidelidad a la fuente**: el tema 5 (Sumas, asintótica y recurrencias) se agregó en la revisión contra el calendario oficial de 6.042J Fall 2010 (Lec 12-15), que le dedica cuatro clases; no estaba en la primera versión de este documento. Conjuntos/funciones/lógica formal no tienen clase propia en F2010: su fuente es el libro del curso (ver fuentes-por-leccion.md).

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
