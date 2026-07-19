# ROB — Robótica

- **Nivel**: Nivel 3
- **Área de conocimiento**: Inteligencia Artificial y Machine Learning
- **Fuente canónica**: 'Modern Robotics' (Kevin Lynch, Northwestern) + MIT Underactuated Robotics

## Objetivo de la materia

Modelar el movimiento y el control de robots, conectando percepción, planificación y actuación.

## Temas centrales y objetivos de aprendizaje

### 1. Espacio de configuración y cinemática

**Conceptos que lo integran**: grados de libertad, espacio de configuración, cinemática directa, cinemática inversa.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Determinar (Aplicar) los grados de libertad de un mecanismo.
- Calcular (Aplicar) la posición del efector final dado el estado de las articulaciones (cinemática directa).
- Explicar (Entender) por qué la cinemática inversa puede tener múltiples soluciones o ninguna.

### 2. Dinámica y control

**Conceptos que lo integran**: dinámica de manipuladores (panorama), control por retroalimentación, PID, seguimiento de trayectorias.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Explicar (Entender) el lazo de control por retroalimentación con el ejemplo del PID.
- Ajustar (Aplicar) las ganancias de un PID simulado y analizar su respuesta.
- Analizar (Analizar) el efecto de perturbaciones sobre el seguimiento de una trayectoria.

### 3. Planificación y percepción

**Conceptos que lo integran**: planificación de movimiento, grafos de rutas y muestreo (RRT, panorama), sensores, lazo percepción-planificación-actuación.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Modelar (Aplicar) la planificación de movimiento como búsqueda — conecta con IIA.
- Describir (Entender) el lazo completo percepción-planificación-actuación.
- Integrar (Crear) un pipeline simple simulado que perciba, planifique y actúe.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
