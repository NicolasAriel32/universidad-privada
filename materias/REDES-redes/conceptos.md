# REDES — Redes de Computadoras

- **Nivel**: Nivel 2
- **Área de conocimiento**: Sistemas de computación
- **Fuente canónica**: Kurose & Ross 'Computer Networking: A Top-Down Approach' (UMass)

## Objetivo de la materia

Comprender cómo viajan los datos por Internet, de la aplicación al enlace físico.

## Temas centrales y objetivos de aprendizaje

### 1. Capa de aplicación

**Conceptos que lo integran**: modelo cliente-servidor, HTTP, DNS, correo, sockets (introducción).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Describir (Entender) el viaje completo de una request HTTP, de la URL a la respuesta.
- Analizar (Analizar) tráfico real de aplicación con Wireshark.
- Escribir (Aplicar) un cliente simple con sockets.

### 2. Capa de transporte

**Conceptos que lo integran**: multiplexación, UDP, TCP, control de congestión, confiabilidad.

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Distinguir (Analizar) TCP de UDP y elegir cuál usar según la aplicación.
- Explicar (Entender) cómo TCP logra confiabilidad sobre un canal no confiable.
- Relacionar (Aplicar) el control de congestión con la velocidad percibida en una conexión.

### 3. Capa de red

**Conceptos que lo integran**: direccionamiento IP, subredes, NAT, ruteo (panorama de algoritmos).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Calcular (Aplicar) subredes y máscaras.
- Explicar (Entender) cómo NAT permite que muchas máquinas compartan una IP pública.
- Trazar (Analizar) la ruta de un paquete entre dos hosts.

### 4. Enlace y seguridad de red

**Conceptos que lo integran**: Ethernet, ARP, WiFi (panorama), amenazas comunes, TLS (introducción).

**Objetivos de aprendizaje** (nivel Bloom entre paréntesis):
- Describir (Entender) cómo se resuelven direcciones dentro de una red local.
- Identificar (Analizar) riesgos básicos de una red abierta.
- Explicar (Entender) qué protege TLS y qué no.

---
_Objetivos redactados con taxonomía de Bloom revisada (Recordar → Entender → Aplicar → Analizar → Evaluar → Crear) y alineación constructiva: cada objetivo debe poder evaluarse con el quiz o el ejercicio de la lección correspondiente._
