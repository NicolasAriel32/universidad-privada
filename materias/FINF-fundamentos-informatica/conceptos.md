# FINF — Fundamentos de Informática (Sistemas)

- **Nivel**: Nivel 1
- **Área de conocimiento**: Sistemas de computación
- **Fuente canónica**: Nand2Tetris 'The Elements of Computing Systems' (Nisan & Schocken)

## Objetivo de la materia

Entender cómo una computadora funciona de la compuerta lógica al sistema operativo, construyéndola por capas.

## Temas centrales y objetivos de aprendizaje

### 1. Lógica y hardware

**Conceptos que lo integran**: lógica booleana, compuertas (NAND, AND, OR, NOT), multiplexores, ALU, chips combinacionales.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Construir (Crear) compuertas complejas a partir de NAND en el simulador de hardware.
- Diseñar (Crear) una ALU básica que sume y opere lógicamente.
- Explicar (Entender) por qué toda la computación se reduce a lógica booleana.

### 2. Memoria y arquitectura

**Conceptos que lo integran**: flip-flops, registros, RAM, contador de programa, arquitectura von Neumann, CPU Hack.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Construir (Crear) memoria a partir de elementos secuenciales en el simulador.
- Explicar (Entender) el ciclo fetch-decode-execute de la CPU.
- Trazar (Analizar) la ejecución de un programa en código máquina paso a paso.

### 3. Lenguaje de máquina y assembly

**Conceptos que lo integran**: código máquina Hack, assembly, ensamblador, símbolos y etiquetas.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Escribir (Aplicar) programas simples en assembly Hack.
- Construir (Crear) un ensamblador que traduzca assembly a binario.
- Relacionar (Entender) cada instrucción assembly con lo que hace el hardware.

### 4. Software de sistema (introducción)

**Conceptos que lo integran**: máquina virtual, traducción VM → assembly, compilación (panorama), sistema operativo (panorama).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Trazar (Analizar) cómo un programa de alto nivel baja capa por capa hasta el hardware.
- Explicar (Entender) el rol de la VM como capa intermedia (analogía con Python/JVM).
- Ubicar (Entender) dónde entra el SO en la pila de abstracción.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
