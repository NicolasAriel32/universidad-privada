# BDATOS — Bases de Datos

- **Nivel**: Nivel 2
- **Área de conocimiento**: Datos
- **Fuente canónica**: Stanford 'Databases' (Jennifer Widom)

## Objetivo de la materia

Modelar, consultar y razonar sobre datos estructurados con el modelo relacional y SQL.

## Temas centrales y objetivos de aprendizaje

### 1. Modelo relacional y diseño

**Conceptos que lo integran**: relaciones, claves, álgebra relacional, dependencias funcionales, normalización (hasta 3FN/BCNF).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Diseñar (Crear) un esquema relacional normalizado a partir de requisitos.
- Detectar (Analizar) anomalías de diseño (redundancia, actualización) en un esquema dado.
- Expresar (Aplicar) consultas en álgebra relacional como base formal de SQL.

### 2. SQL

**Conceptos que lo integran**: SELECT/WHERE, joins, agregaciones y GROUP BY, subconsultas, vistas, índices (introducción).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Escribir (Aplicar) consultas SQL con joins múltiples y agregaciones.
- Optimizar (Evaluar) una consulta lenta razonando sobre índices.
- Traducir (Aplicar) una pregunta de negocio a la consulta SQL que la responde.

### 3. Transacciones e integridad

**Conceptos que lo integran**: transacciones, propiedades ACID, restricciones, triggers (introducción), concurrencia (panorama).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Explicar (Entender) qué garantiza cada propiedad ACID con ejemplos de fallas.
- Aplicar (Aplicar) restricciones de integridad a un esquema.
- Analizar (Analizar) qué pasa cuando dos transacciones concurrentes tocan los mismos datos.

### 4. Datos semiestructurados

**Conceptos que lo integran**: JSON, XML, consultas sobre semiestructurado, relacional vs. NoSQL (criterios).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Consultar (Aplicar) datos JSON almacenados en una base relacional.
- Comparar (Analizar) relacional vs. semiestructurado según el caso de uso.
- Justificar (Evaluar) la elección de modelo de datos para un sistema concreto.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
