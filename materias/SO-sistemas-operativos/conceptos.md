# SO — Sistemas Operativos

- **Nivel**: Nivel 2
- **Área de conocimiento**: Sistemas de computación
- **Fuente canónica**: OSTEP 'Operating Systems: Three Easy Pieces' (Arpaci-Dusseau)

## Objetivo de la materia

Entender cómo el SO administra procesos, memoria y almacenamiento — clave para sistemas eficientes en hardware limitado.

## Temas centrales y objetivos de aprendizaje

### 1. Virtualización de CPU

**Conceptos que lo integran**: procesos, API de procesos, cambio de contexto, políticas de scheduling.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Explicar (Entender) cómo el SO crea la ilusión de muchas CPUs con una sola.
- Comparar (Analizar) políticas de scheduling (FIFO, SJF, round robin, MLFQ) y sus trade-offs.
- Trazar (Analizar) el ciclo de vida de un proceso con sus estados.

### 2. Virtualización de memoria

**Conceptos que lo integran**: espacios de direcciones, paginación, TLB, memoria virtual y swap.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Explicar (Entender) la traducción de direcciones virtuales a físicas.
- Analizar (Analizar) el efecto de la localidad en el rendimiento (TLB hits/misses).
- Relacionar (Aplicar) la presión de memoria con el comportamiento observable de una máquina lenta.

### 3. Concurrencia

**Conceptos que lo integran**: threads, locks, variables de condición, semáforos, condiciones de carrera, deadlock.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Detectar (Analizar) condiciones de carrera en código concurrente.
- Aplicar (Aplicar) locks y variables de condición para sincronizar threads.
- Diagnosticar (Evaluar) un deadlock y proponer cómo evitarlo.

### 4. Persistencia

**Conceptos que lo integran**: dispositivos de I/O, discos y SSDs, sistemas de archivos, journaling, crash consistency.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Describir (Entender) cómo un sistema de archivos organiza los datos en disco.
- Explicar (Entender) cómo el journaling protege ante cortes de energía — directamente relevante a sistemas offline-first.
- Analizar (Analizar) el costo de operaciones de I/O vs. operaciones en memoria.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
