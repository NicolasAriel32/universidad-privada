# ML — Machine Learning

- **Nivel**: Nivel 3
- **Área de conocimiento**: Inteligencia Artificial y Machine Learning
- **Fuente canónica**: Andrew Ng 'Machine Learning Specialization' (deeplearning.ai) + Stanford CS229

## Objetivo de la materia

Entrenar, evaluar y diagnosticar modelos de aprendizaje supervisado y no supervisado.

## Temas centrales y objetivos de aprendizaje

### 1. Regresión

**Conceptos que lo integran**: regresión lineal, función de costo, descenso de gradiente, features y escalado, regresión polinómica.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Implementar (Aplicar) regresión lineal con descenso de gradiente desde cero.
- Explicar (Entender) qué minimiza la función de costo y cómo el gradiente la recorre.
- Diagnosticar (Analizar) problemas de convergencia (learning rate, escalado).

### 2. Clasificación

**Conceptos que lo integran**: regresión logística, frontera de decisión, sobreajuste, regularización, métricas (precisión/recall/F1).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Entrenar (Aplicar) un clasificador y evaluar con las métricas correctas según el problema.
- Diagnosticar (Analizar) sesgo vs. varianza y decidir el remedio (más datos, más features, regularizar).
- Justificar (Evaluar) el umbral de decisión según el costo de cada tipo de error.

### 3. Aprendizaje no supervisado

**Conceptos que lo integran**: clustering (k-means), reducción de dimensionalidad (PCA), detección de anomalías, sistemas de recomendación (introducción).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Aplicar (Aplicar) k-means y elegir k con criterio.
- Aplicar (Aplicar) PCA y explicar qué conserva y qué pierde — acá conecta con ALG (autovalores/SVD).
- Diseñar (Crear) un detector de anomalías simple para un caso real.

### 4. Práctica de ML

**Conceptos que lo integran**: división train/validation/test, validación cruzada, pipelines, fuga de datos, error analysis.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Armar (Crear) un pipeline completo de ML de datos crudos a modelo evaluado.
- Detectar (Analizar) fuga de datos en un pipeline defectuoso.
- Evaluar (Evaluar) honestamente un modelo evitando contaminar el test set.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
