import { useState, useRef, useEffect } from "react";

// ============================================================
// UNIVERSIDAD PRIVADA — Prototipo de pantalla de lección
// Estética: panel de planta industrial (LEDs de estado, tags de máquina)
// Stack destino: React + Supabase + Vercel | Editor: Pyodide (browser)
// Fuentes de contenido: ver documento "FUENTES POR LECCIÓN — PRG1"
// (MIT 6.100L, CS50P, Python Tutorial es, Think Python 3e)
// ============================================================

// ---------- Contenido de las 17 lecciones de PRG1 ----------
// Contenido por materia. Cada materia = { L o M -> lección }.
// PRG1 verificado (17 lecciones). MDIS verificado (25 lecciones, fuentes MIT 6.042J).
const MATERIAS_CONTENIDO = {
  PRG1: {
  L01: {
    code: "L01",
    materia: "Programación I - IA",
    title: "Qué es programar",
    fuente: "MIT 6.100L — Lecture 1: Introduction | CS50P W0",
    theory: [
      "Programar es escribirle instrucciones precisas a una computadora para que resuelva una tarea, paso a paso y sin ambigüedad. Un programa es una receta: la computadora ejecuta cada línea en el orden en que está escrita.",
      "Python es un lenguaje interpretado: no hace falta compilarlo, el intérprete lee y ejecuta cada línea al vuelo. Eso lo hace ideal para probar ideas rápido, como en este panel.",
    ],
    example: `# Tu primer programa
print("Turno mañana — línea 2 activa")
print("Operarios en planta:", 4)`,
    quiz: [
      { q: "¿Qué hace la función print()?", opts: ["Guarda un archivo", "Muestra texto en pantalla", "Borra una variable", "Ejecuta un test"], correct: 1 },
      { q: "Python es un lenguaje...", opts: ["Compilado únicamente", "Interpretado", "Solo para web", "Solo matemático"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función saludo(nombre) que devuelva el string \"Bienvenido a planta, {nombre}\".",
      starter: `def saludo(nombre):
    # tu código acá
    pass`,
      tests: `assert saludo("Marcos") == "Bienvenido a planta, Marcos", "Fallo con Marcos"
assert saludo("Ana") == "Bienvenido a planta, Ana", "Fallo con Ana"
print("TESTS_OK")`,
    },
  },

  L02: {
    code: "L02",
    materia: "Programación I - IA",
    title: "El intérprete de Python",
    fuente: "MIT 6.100L — Lecture 1: Introduction | CS50P W0",
    theory: [
      "El intérprete es el programa que lee tu código línea por línea y lo va ejecutando al instante — por eso podés probar una instrucción y ver el resultado enseguida, sin esperar una compilación.",
      "Cada línea que escribís es una instrucción. Si hay un error de sintaxis, el intérprete se detiene justo ahí y te avisa en qué línea está el problema.",
    ],
    example: `# El intérprete ejecuta línea por línea
print("Iniciando chequeo...")
print(2 + 2)
print("Chequeo terminado")`,
    quiz: [
      { q: "¿En qué orden ejecuta el intérprete las líneas de un programa?", opts: ["Al azar", "De arriba hacia abajo, en orden", "De abajo hacia arriba", "Todas a la vez"], correct: 1 },
      { q: "Si hay un error de sintaxis en la línea 5, ¿qué pasa con las líneas 1 a 4?", opts: ["No se ejecutan nunca", "Ya se ejecutaron antes de llegar al error", "Se ejecutan después del error", "Se ignoran"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función doble(numero) que devuelva el número multiplicado por 2.",
      starter: `def doble(numero):
    # tu código acá
    pass`,
      tests: `assert doble(4) == 8, "Fallo con 4"
assert doble(0) == 0, "Fallo con 0"
print("TESTS_OK")`,
    },
  },

  L03: {
    code: "L03",
    materia: "Programación I - IA",
    title: "Variables y tipos de datos",
    fuente: "MIT 6.100L — Lecture 1-2 (OpenCourseWare)",
    theory: [
      "Una variable es un nombre que apunta a un valor en memoria. En Python no declarás el tipo: el intérprete lo infiere del valor asignado.",
      "Los tipos básicos que vas a usar todo el tiempo: int (enteros), float (decimales), str (texto), bool (True/False). La función type() te dice el tipo de cualquier valor.",
    ],
    example: `# Registro de una prueba de estanqueidad
cabezal = 7            # int
presion = 2.45         # float (bar)
resultado = "APROBADO" # str
critico = False        # bool

print(type(presion))
print(f"Cabezal {cabezal}: {resultado} a {presion} bar")`,
    quiz: [
      { q: "¿Qué tipo infiere Python para: x = 240.0?", opts: ["int", "float", "str", "bool"], correct: 1 },
      { q: "¿Qué imprime print(type(\"7\"))?", opts: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error"], correct: 2 },
    ],
    exercise: {
      prompt: "Escribí una función registro(cabezal, presion) que devuelva el string \"M10-C{cabezal}: {presion} bar\". Ejemplo: registro(3, 2.5) → \"M10-C3: 2.5 bar\"",
      starter: `def registro(cabezal, presion):
    # tu código acá
    pass`,
      tests: `assert registro(3, 2.5) == "M10-C3: 2.5 bar", "Fallo con (3, 2.5)"
assert registro(12, 1.8) == "M10-C12: 1.8 bar", "Fallo con (12, 1.8)"
print("TESTS_OK")`,
    },
  },

  L04: {
    code: "L04",
    materia: "Programación I - IA",
    title: "Strings y f-strings",
    fuente: "MIT 6.100L — Lecture 2: Strings, I/O, Branching | CS50P W0 | Tutorial §7.1 (es)",
    theory: [
      "Un string (str) es una secuencia de caracteres entre comillas. Podés unir strings con + (concatenar), o insertar valores directamente con f-strings: f\"texto {variable}\" evalúa la variable adentro del texto sin que tengas que convertirla a mano.",
      "Los strings son inmutables: no se pueden modificar en el lugar, cualquier operación crea un string nuevo. Esto importa cuando armás etiquetas o reportes que se generan muchas veces por turno.",
    ],
    example: `# Etiqueta de lote para el sensor de presión
sucursal = "Deposito Norte"
lote = 214
presion = 3.1

etiqueta = f"[{sucursal}] Lote {lote}: {presion} bar"
print(etiqueta)
print(etiqueta.upper())`,
    quiz: [
      { q: "¿Qué devuelve f\"Stock: {5 + 3}\"?", opts: ["'Stock: 5+3'", "'Stock: {5+3}'", "'Stock: 8'", "Error"], correct: 2 },
      { q: "¿Los strings en Python se pueden modificar in-place?", opts: ["Sí, siempre", "No, son inmutables", "Solo si son cortos", "Solo con .replace()"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función etiqueta_lote(sucursal, lote, unidades) que devuelva \"{sucursal} - Lote {lote}: {unidades} u.\" usando f-strings.",
      starter: `def etiqueta_lote(sucursal, lote, unidades):
    # tu código acá
    pass`,
      tests: `assert etiqueta_lote("Norte", 12, 40) == "Norte - Lote 12: 40 u.", "Fallo caso 1"
assert etiqueta_lote("Sur", 3, 5) == "Sur - Lote 3: 5 u.", "Fallo caso 2"
print("TESTS_OK")`,
    },
  },

  L05: {
    code: "L05",
    materia: "Programación I - IA",
    title: "Conversión de tipos e input",
    fuente: "MIT 6.100L — Lecture 2 (casting, input) | CS50P W0 | Think Python cap. 5",
    theory: [
      "input() siempre devuelve un string, aunque el usuario tipee un número. Para operar matemáticamente con ese valor hay que convertirlo con int() o float() según corresponda.",
      "str(), int() y float() son funciones de conversión: toman un valor y devuelven una versión nueva en ese tipo. Si la conversión es imposible (por ejemplo int(\"abc\")) Python tira un error.",
    ],
    example: `# Simulación de una lectura ingresada a mano
texto_stock = "48"      # como si viniera de un input()
stock = int(texto_stock)
stock_actualizado = stock - 5
print(f"Quedan {stock_actualizado} unidades")`,
    quiz: [
      { q: "¿Qué tipo devuelve siempre input()?", opts: ["int", "float", "str", "bool"], correct: 2 },
      { q: "¿Qué pasa con int(\"12.5\")?", opts: ["Da 12", "Da 12.5", "Da error", "Da '12.5'"], correct: 2 },
    ],
    exercise: {
      prompt: "Escribí una función a_entero_doble(texto) que reciba un string con un número entero y devuelva ese número multiplicado por 2 (como int).",
      starter: `def a_entero_doble(texto):
    # tu código acá
    pass`,
      tests: `assert a_entero_doble("10") == 20, "Fallo con '10'"
assert a_entero_doble("0") == 0, "Fallo con '0'"
print("TESTS_OK")`,
    },
  },

  L06: {
    code: "L06",
    materia: "Programación I - IA",
    title: "Condicionales if/elif/else",
    fuente: "MIT 6.100L — Lecture 2: Branching | CS50P W1: Conditionals | Think Python cap. 5",
    theory: [
      "if evalúa una condición booleana: si es True ejecuta ese bloque, si no pasa al elif (si hay) o al else. Se pueden comparar valores con ==, !=, <, >, <=, >=, y combinar condiciones con and/or/not.",
      "Solo se ejecuta UNA rama del if/elif/else, la primera que dé True. El orden de las condiciones importa cuando hay rangos que se superponen.",
    ],
    example: `presion = 4.8
if presion > 4.5:
    estado = "ALERTA"
elif presion > 3.0:
    estado = "NORMAL"
else:
    estado = "BAJA"
print(estado)`,
    quiz: [
      { q: "Si presion = 3.0 en el ejemplo, ¿qué valor toma estado?", opts: ["ALERTA", "NORMAL", "BAJA", "Error"], correct: 1 },
      { q: "¿Cuántas ramas de un if/elif/else se llegan a ejecutar?", opts: ["Todas las que den True", "Solo la primera que dé True", "Ninguna", "Solo el else"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función clasificar(stock) que devuelva \"CRITICO\" si stock < 5, \"BAJO\" si stock < 15, y \"OK\" en cualquier otro caso.",
      starter: `def clasificar(stock):
    # tu código acá
    pass`,
      tests: `assert clasificar(2) == "CRITICO", "Fallo con 2"
assert clasificar(10) == "BAJO", "Fallo con 10"
assert clasificar(50) == "OK", "Fallo con 50"
print("TESTS_OK")`,
    },
  },

  L07: {
    code: "L07",
    materia: "Programación I - IA",
    title: "El loop while",
    fuente: "MIT 6.100L — Lecture 3: Iteration | CS50P W2: Loops | Think Python cap. 7",
    theory: [
      "while repite un bloque mientras la condición sea True. A diferencia de un if, vuelve a chequear la condición después de cada vuelta — por eso hace falta modificar algo adentro del loop para que en algún momento se vuelva False, o el programa nunca termina (loop infinito).",
      "Es el loop ideal cuando no sabés de antemano cuántas veces hay que repetir algo, como reponer stock hasta llegar a un mínimo.",
    ],
    example: `stock = 2
reposiciones = 0
while stock < 10:
    stock += 3
    reposiciones += 1
print(f"Se repuso {reposiciones} veces, stock final {stock}")`,
    quiz: [
      { q: "¿Qué pasa si en un while nunca se modifica la condición?", opts: ["Se ejecuta una sola vez", "Loop infinito", "Error de sintaxis", "Se salta el loop"], correct: 1 },
      { q: "¿En qué momento se vuelve a chequear la condición de un while?", opts: ["Solo al principio", "Después de cada vuelta del loop", "Nunca", "Al final del programa"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función turnos_hasta(stock_inicial, minimo) que devuelva cuántos turnos (cada turno consume 4 unidades) hacen falta hasta que el stock caiga por debajo de minimo.",
      starter: `def turnos_hasta(stock_inicial, minimo):
    # tu código acá
    pass`,
      tests: `assert turnos_hasta(20, 5) == 4, "Fallo con (20,5)"
assert turnos_hasta(10, 8) == 1, "Fallo con (10,8)"
print("TESTS_OK")`,
    },
  },

  L08: {
    code: "L08",
    materia: "Programación I - IA",
    title: "for y range",
    fuente: "MIT 6.100L — Lecture 3-4 (Iteration, Loops over Strings) | CS50P W2 | Tutorial §4.2-4.3 (es)",
    theory: [
      "for recorre los elementos de una secuencia (una lista, un string, o los números que genera range()) uno por uno, sin que tengas que llevar la cuenta a mano como en un while.",
      "range(n) genera números de 0 a n-1; range(a, b) va de a a b-1. Es la forma habitual de repetir algo una cantidad fija de veces.",
    ],
    example: `ventas_semana = [120, 95, 140, 80, 110]
total = 0
for dia in range(len(ventas_semana)):
    total += ventas_semana[dia]
print(f"Total semanal: {total}")`,
    quiz: [
      { q: "¿Qué genera range(3)?", opts: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "Solo 3"], correct: 1 },
      { q: "¿Cuándo conviene usar for en vez de while?", opts: ["Cuando no sabés cuántas vueltas hacen falta", "Cuando sabés de antemano cuántas veces repetir", "Nunca", "Son siempre intercambiables"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función suma_pares(n) que sume todos los números pares entre 0 y n (inclusive), usando un for con range.",
      starter: `def suma_pares(n):
    # tu código acá
    pass`,
      tests: `assert suma_pares(4) == 6, "Fallo con 4 (0+2+4)"
assert suma_pares(1) == 0, "Fallo con 1"
print("TESTS_OK")`,
    },
  },

  L09: {
    code: "L09",
    materia: "Programación I - IA",
    title: "break, continue y loops anidados",
    fuente: "MIT 6.100L — Lecture 4: Guess-and-Check | CS50P W2 | Tutorial §4.4-4.5 (es)",
    theory: [
      "break corta el loop de inmediato, sin importar si la condición seguía dando True. continue salta el resto del cuerpo y pasa directo a la siguiente vuelta, sin cortar el loop entero.",
      "Los loops anidados (un for/while dentro de otro) sirven para recorrer estructuras de dos niveles, como sucursales que a su vez tienen varios productos. break solo corta el loop más interno en el que está escrito.",
    ],
    example: `sucursales = [[5, 8, 0], [3, 6, 9]]
for suc in sucursales:
    for stock in suc:
        if stock == 0:
            print("Producto agotado encontrado")
            break
        print(stock)`,
    quiz: [
      { q: "¿Qué hace continue?", opts: ["Corta el loop entero", "Salta a la siguiente vuelta sin ejecutar el resto del bloque", "Reinicia el loop desde cero", "Termina el programa"], correct: 1 },
      { q: "En loops anidados, ¿a qué loop afecta un break?", opts: ["A todos los loops", "Solo al loop más interno donde está escrito", "Solo al externo", "A ninguno"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función primer_agotado(stocks) que reciba una lista de números y devuelva el índice del primer valor igual a 0, usando break. Si no hay ninguno, devolvé -1.",
      starter: `def primer_agotado(stocks):
    # tu código acá
    pass`,
      tests: `assert primer_agotado([5, 3, 0, 8]) == 2, "Fallo con lista con agotado"
assert primer_agotado([5, 3, 8]) == -1, "Fallo con lista sin agotado"
print("TESTS_OK")`,
    },
  },

  L10: {
    code: "L10",
    materia: "Programación I - IA",
    title: "Listas",
    fuente: "MIT 6.100L — Lecture 9-10: Lambda, Tuples and Lists / Mutability | CS50P W2 | Think Python cap. 9",
    theory: [
      "Una lista es una colección ordenada y mutable: podés acceder a un elemento por su índice (empieza en 0), agregarle elementos con .append(), y cambiar valores existentes asignando por índice.",
      "Las listas son mutables: si guardás la misma lista en dos variables, modificar una modifica la otra, porque ambas apuntan al mismo objeto en memoria. Esto se retoma en la próxima lección con aliasing.",
    ],
    example: `stock_sucursal = [40, 12, 0, 25]
stock_sucursal.append(8)
stock_sucursal[2] = 5
print(stock_sucursal)
print("Cantidad de productos:", len(stock_sucursal))`,
    quiz: [
      { q: "¿Cuál es el índice del primer elemento de una lista?", opts: ["1", "0", "-1", "Depende de la lista"], correct: 1 },
      { q: "¿Qué método agrega un elemento al final de una lista?", opts: [".add()", ".append()", ".push()", ".insert(0)"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función reponer(stock, indice, cantidad) que sume cantidad al elemento en esa posición de la lista stock y devuelva la lista actualizada.",
      starter: `def reponer(stock, indice, cantidad):
    # tu código acá
    pass`,
      tests: `assert reponer([10, 5, 8], 1, 3) == [10, 8, 8], "Fallo caso 1"
assert reponer([0, 0], 0, 6) == [6, 0], "Fallo caso 2"
print("TESTS_OK")`,
    },
  },

  L11: {
    code: "L11",
    materia: "Programación I - IA",
    title: "Métodos de listas y slicing",
    fuente: "MIT 6.100L — Lecture 10-11: Mutability, Aliasing, Cloning | CS50P W2 | Tutorial §5.1 (es)",
    theory: [
      "El slicing lista[a:b] devuelve una sublista nueva con los elementos desde el índice a hasta b-1. lista[-3:] te da los últimos 3 elementos, muy útil para \"las últimas N ventas\".",
      "Ojo con aliasing: lista2 = lista1 no crea una copia, ambas variables apuntan a la misma lista. Para clonar de verdad hay que usar lista1[:] o list(lista1).",
    ],
    example: `ventas = [120, 95, 140, 80, 110, 200, 60]
ultimas_3 = ventas[-3:]
copia_real = ventas[:]
print("Últimas 3:", ultimas_3)
ventas.sort()
print("Ordenadas:", ventas)`,
    quiz: [
      { q: "¿Qué devuelve [10, 20, 30, 40][1:3]?", opts: ["[10, 20]", "[20, 30]", "[20, 30, 40]", "[30, 40]"], correct: 1 },
      { q: "¿lista2 = lista1 crea una copia independiente?", opts: ["Sí, siempre", "No, ambas apuntan a la misma lista", "Solo si la lista tiene números", "Solo con .copy()"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función ultimas_ventas(ventas, n) que devuelva los últimos n elementos de la lista ventas usando slicing.",
      starter: `def ultimas_ventas(ventas, n):
    # tu código acá
    pass`,
      tests: `assert ultimas_ventas([10, 20, 30, 40, 50], 2) == [40, 50], "Fallo caso 1"
assert ultimas_ventas([1, 2, 3], 5) == [1, 2, 3], "Fallo caso 2 (n mayor al largo)"
print("TESTS_OK")`,
    },
  },

  L12: {
    code: "L12",
    materia: "Programación I - IA",
    title: "Diccionarios",
    fuente: "MIT 6.100L — Dictionaries (sigue a Lecture 11) | CS50P W2 (dicts) | Think Python cap. 10; Tutorial §5.5 (es)",
    theory: [
      "Un diccionario guarda pares clave-valor: en vez de acceder por posición como en una lista, accedés por nombre (\"stock\": 40). Es ideal para representar un producto o una sucursal con varios campos.",
      "dic.get(clave, valor_default) evita errores cuando la clave no existe: devuelve el valor por defecto en vez de romper el programa. dic.items() te deja iterar clave y valor juntos con un for.",
    ],
    example: `producto = {"nombre": "Gaseosa 2L", "stock": 18, "precio": 1450}
print(producto["nombre"], "->", producto["stock"], "unidades")
producto["stock"] = producto["stock"] - 3
for clave, valor in producto.items():
    print(clave, ":", valor)`,
    quiz: [
      { q: "¿Cómo se accede al valor de la clave 'stock' en un diccionario d?", opts: ["d[0]", "d.stock", "d['stock']", "d->stock"], correct: 2 },
      { q: "¿Qué hace d.get('precio', 0) si 'precio' no existe en d?", opts: ["Tira un error", "Devuelve 0", "Devuelve None siempre", "Crea la clave"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función total_stock(productos) que reciba una lista de diccionarios (cada uno con clave 'stock') y devuelva la suma de todos los stocks.",
      starter: `def total_stock(productos):
    # tu código acá
    pass`,
      tests: `assert total_stock([{"stock": 5}, {"stock": 10}]) == 15, "Fallo caso 1"
assert total_stock([]) == 0, "Fallo con lista vacía"
print("TESTS_OK")`,
    },
  },

  L13: {
    code: "L13",
    materia: "Programación I - IA",
    title: "Tuplas y sets: cuándo usar cada una",
    fuente: "MIT 6.100L — Lecture 9 (tuples) | Tutorial §5.3-5.4 (es, sets) | Think Python cap. 11",
    theory: [
      "Una tupla (a, b) es como una lista pero inmutable: una vez creada no se puede modificar. Se usa para agrupar valores que van siempre juntos, como coordenadas o un par (sucursal, producto).",
      "Un set es una colección sin orden y sin elementos repetidos. Sirve para sacar duplicados de una lista o chequear pertenencia muy rápido, aunque perdés el orden y los índices.",
    ],
    example: `ubicacion = (34.5, -58.4)   # tupla: lat, lon
sucursales_con_faltante = ["Norte", "Sur", "Norte", "Oeste", "Sur"]
unicas = set(sucursales_con_faltante)
print(ubicacion)
print(unicas)`,
    quiz: [
      { q: "¿Se puede modificar un elemento de una tupla después de creada?", opts: ["Sí", "No", "Solo el primero", "Solo si es un número"], correct: 1 },
      { q: "¿Qué devuelve set([1, 2, 2, 3, 3, 3])?", opts: ["Da error", "{1, 2, 3}", "[1, 2, 2, 3, 3, 3]", "(1, 2, 3)"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función sucursales_unicas(lista) que reciba una lista de nombres de sucursal (con repetidos) y devuelva la cantidad de sucursales distintas, usando un set.",
      starter: `def sucursales_unicas(lista):
    # tu código acá
    pass`,
      tests: `assert sucursales_unicas(["Norte", "Sur", "Norte"]) == 2, "Fallo caso 1"
assert sucursales_unicas([]) == 0, "Fallo con lista vacía"
print("TESTS_OK")`,
    },
  },

  L14: {
    code: "L14",
    materia: "Programación I - IA",
    title: "Funciones: definir y llamar",
    fuente: "MIT 6.100L — Lecture 7: Decomposition, Abstraction, Functions | CS50P W0 | Think Python cap. 3",
    theory: [
      "Una función agrupa código reutilizable bajo un nombre: se define una vez con def nombre(parametros): y se llama todas las veces que haga falta. Los parámetros son variables locales, solo existen dentro de la función.",
      "return devuelve un valor y termina la función ahí mismo. Si una función no tiene return explícito, devuelve None. Separar el programa en funciones chicas hace mucho más fácil probar y reutilizar cada pedazo de lógica.",
    ],
    example: `def calcular_iva(precio):
    return precio * 1.21

def precio_final(precio, descuento):
    con_iva = calcular_iva(precio)
    return con_iva - descuento

print(precio_final(1000, 50))`,
    quiz: [
      { q: "¿Qué devuelve una función sin return explícito?", opts: ["0", "''", "None", "Error"], correct: 2 },
      { q: "¿Los parámetros de una función son visibles fuera de ella?", opts: ["Sí, siempre", "No, son locales a la función", "Solo si son globales", "Depende del tipo"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función precio_con_descuento(precio, porcentaje) que devuelva el precio final aplicando ese porcentaje de descuento.",
      starter: `def precio_con_descuento(precio, porcentaje):
    # tu código acá
    pass`,
      tests: `assert precio_con_descuento(1000, 10) == 900, "Fallo con 10%"
assert precio_con_descuento(200, 0) == 200, "Fallo con 0%"
print("TESTS_OK")`,
    },
  },

  L15: {
    code: "L15",
    materia: "Programación I - IA",
    title: "Parámetros por defecto y retorno múltiple",
    fuente: "MIT 6.100L — Lecture 8: Functions as Objects | Tutorial §4.9 (es)",
    theory: [
      "Un parámetro con valor por defecto (def f(x, tasa=1.21):) es opcional: si no lo pasás al llamar la función, usa ese valor. Los parámetros con defecto siempre van después de los obligatorios.",
      "Python permite devolver varios valores separados por coma (return a, b); en realidad empaqueta una tupla, y del lado de quien llama se puede desempaquetar directo: minimo, maximo = calcular(...).",
    ],
    example: `def resumen_stock(valores, minimo_alerta=10):
    bajo = [v for v in valores if v < minimo_alerta]
    return min(valores), max(valores), len(bajo)

piso, techo, cant_bajo = resumen_stock([5, 40, 8, 22])
print(piso, techo, cant_bajo)`,
    quiz: [
      { q: "¿En qué orden van los parámetros con defecto en la definición?", opts: ["Antes que los obligatorios", "Después de los obligatorios", "En cualquier orden", "No se pueden mezclar"], correct: 1 },
      { q: "¿Qué tipo de dato arma Python cuando hacés return a, b?", opts: ["Una lista", "Una tupla", "Un diccionario", "Un set"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función rango_precios(precios, moneda='ARS') que devuelva dos valores: el precio mínimo y el máximo de la lista precios.",
      starter: `def rango_precios(precios, moneda="ARS"):
    # tu código acá
    pass`,
      tests: `assert rango_precios([500, 1200, 300]) == (300, 1200), "Fallo caso 1"
assert rango_precios([10]) == (10, 10), "Fallo con un solo precio"
print("TESTS_OK")`,
    },
  },

  L16: {
    code: "L16",
    materia: "Programación I - IA",
    title: "Errores y try/except",
    fuente: "MIT 6.100L — Exceptions/Assertions | CS50P W3: Exceptions | Tutorial §8 (es)",
    theory: [
      "Cuando una operación puede fallar en tiempo de ejecución (dividir por cero, convertir texto no numérico), Python lanza una excepción y corta el programa ahí, salvo que la envuelvas en un bloque try/except.",
      "try contiene el código riesgoso; except captura el tipo de error esperado (ValueError, ZeroDivisionError, etc.) y define qué hacer en vez de romper todo. Conviene capturar el error puntual que esperás, no todo con un except genérico.",
    ],
    example: `def precio_por_unidad(total, unidades):
    try:
        return total / unidades
    except ZeroDivisionError:
        return 0

print(precio_por_unidad(1000, 4))
print(precio_por_unidad(1000, 0))`,
    quiz: [
      { q: "¿Qué excepción tira dividir por 0 en Python?", opts: ["ValueError", "ZeroDivisionError", "TypeError", "IndexError"], correct: 1 },
      { q: "¿Qué código va dentro del bloque try?", opts: ["El que maneja el error", "El que puede fallar", "El que siempre se ejecuta al final", "Ninguno"], correct: 1 },
    ],
    exercise: {
      prompt: "Escribí una función convertir_stock(texto) que reciba un string y devuelva su valor como int; si no se puede convertir (ValueError), devolvé 0 en vez de romper.",
      starter: `def convertir_stock(texto):
    # tu código acá
    pass`,
      tests: `assert convertir_stock("15") == 15, "Fallo con '15'"
assert convertir_stock("abc") == 0, "Fallo con texto inválido"
print("TESTS_OK")`,
    },
  },

  L17: {
    code: "L17",
    materia: "Programación I - IA",
    title: "Proyecto integrador",
    fuente: "Problem Sets 1-3 de MIT 6.100L (nivel de exigencia del integrador)",
    theory: [
      "Este proyecto junta todo lo visto en el módulo: variables y tipos, strings, condicionales, loops, listas/diccionarios, funciones y manejo de errores, con el mismo nivel de exigencia que un problem set de MIT 6.100L.",
      "No hay teoría nueva acá — la lección es resolver un caso completo, como lo harías con datos reales de una sucursal, dividiendo el problema en funciones chicas y probando cada una por separado antes de armar el todo.",
    ],
    example: `# Ejemplo de apoyo: combina condicionales + try/except + f-strings
def clasificar_lote(nombre, stock, minimo=10):
    try:
        stock = int(stock)
    except ValueError:
        return f"{nombre}: dato inválido"
    if stock < minimo:
        return f"{nombre}: REPONER ({stock} u.)"
    return f"{nombre}: OK ({stock} u.)"

print(clasificar_lote("Gaseosa 2L", "7"))`,
    quiz: [
      { q: "¿Cuál es el objetivo principal de un proyecto integrador?", opts: ["Aprender un tema nuevo", "Combinar y aplicar todo lo visto hasta ahora", "Memorizar sintaxis", "Solo repasar teoría"], correct: 1 },
    ],
    exercise: {
      prompt:
        "Escribí una función reporte_sucursal(productos) que reciba una lista de diccionarios, cada uno con 'nombre' y 'stock' (el stock puede venir como string). Para cada producto: si el stock no se puede convertir a número devolvé \"{nombre}: dato inválido\"; si es menor a 10 devolvé \"{nombre}: REPONER\"; si no, \"{nombre}: OK\". Devolvé una lista de strings, uno por producto, en el mismo orden.",
      starter: `def reporte_sucursal(productos):
    # tu código acá
    pass`,
      tests: `entrada = [{"nombre": "Gaseosa", "stock": "7"}, {"nombre": "Agua", "stock": "40"}, {"nombre": "Hielo", "stock": "x"}]
assert reporte_sucursal(entrada) == ["Gaseosa: REPONER", "Agua: OK", "Hielo: dato inválido"], "Fallo caso principal"
assert reporte_sucursal([]) == [], "Fallo con lista vacía"
print("TESTS_OK")`,
    },
  },
  },
  MDIS: {
    M01: {
      code: "M01",
      materia: "Matemática Discreta",
      title: "Proposiciones y demostración directa",
      fuente: "MIT 6.042J — Lec 1: Introduction and proofs | Libro LLM cap. 1",
      theory: ["Una proposición es una afirmación que es verdadera o falsa, sin punto medio: \"el stock del depósito Norte es 0\" lo es; \"¿cuánto stock hay?\" no. Una demostración es un argumento que establece que una proposición es verdadera siempre, no solo en los casos que probaste.", "Acá está la trampa que abre el curso de MIT: probar muchos casos NO demuestra nada. El polinomio n² + n + 41 da primo para n = 0, 1, 2... ¡hasta 39! Y en n = 40 falla. Verificar ejemplos sirve para buscar contraejemplos, nunca para demostrar."],
      example: "# El polinomio de Euler: parece que siempre da primo... hasta que no.\ndef es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, int(n**0.5) + 1):\n        if n % d == 0:\n            return False\n    return True\n\nfor n in [0, 1, 2, 10, 39, 40]:\n    valor = n*n + n + 41\n    print(f\"n={n}: {valor} -> primo: {es_primo(valor)}\")",
      quiz: [{ q: "¿Cuál de estas es una proposición?", opts: ["¿Queda stock?", "Traé más cajas", "El lote 12 tiene 40 unidades", "Ojalá llegue el camión"], correct: 2 }, { q: "Verificar que una afirmación vale para 1000 casos...", opts: ["La demuestra", "No la demuestra, pero puede encontrar un contraejemplo", "La refuta", "Es lo mismo que una demostración"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función primer_contraejemplo(limite) que devuelva el primer n entre 0 y limite (inclusive) tal que n*n + n + 41 NO es primo, o -1 si no hay ninguno en ese rango. Podés reutilizar la idea de es_primo del ejemplo.",
        starter: "def primer_contraejemplo(limite):\n    # tu código acá\n    pass",
        tests: "assert primer_contraejemplo(50) == 40, \"El primer contraejemplo del polinomio de Euler es n=40\"\nassert primer_contraejemplo(30) == -1, \"Hasta 30 no hay contraejemplo\"\nprint(\"TESTS_OK\")",
      },
    },
    M02: {
      code: "M02",
      materia: "Matemática Discreta",
      title: "Lógica: conectivos y cuantificadores",
      fuente: "MIT 6.042J — Libro LLM cap. 3 (Logical Formulas; sin clase propia en F2010)",
      theory: ["Los conectivos combinan proposiciones: AND (las dos verdaderas), OR (al menos una), NOT (la invierte) e IMPLICA (p → q). La implicación es la más traicionera: solo es falsa cuando p es verdadera y q falsa. Si p es falsa, p → q es verdadera automáticamente (\"verdad vacía\").", "Los cuantificadores dicen sobre cuántos casos habla la afirmación: ∀ (\"para todo\") y ∃ (\"existe\"). Negarlos los intercambia: la negación de \"todas las sucursales tienen stock\" es \"existe una sucursal sin stock\" — no \"ninguna tiene stock\"."],
      example: "# Tabla de verdad de la implicación p -> q\nprint(\"p     q     p->q\")\nfor p in [True, False]:\n    for q in [True, False]:\n        implica = (not p) or q\n        print(f\"{p!s:5} {q!s:5} {implica}\")",
      quiz: [{ q: "¿Cuándo es FALSA la implicación p → q?", opts: ["Cuando p y q son falsas", "Solo cuando p es verdadera y q es falsa", "Siempre que q es falsa", "Nunca"], correct: 1 }, { q: "La negación de \"todas las cajas están selladas\" es:", opts: ["Ninguna caja está sellada", "Existe al menos una caja sin sellar", "Todas las cajas están sin sellar", "No se puede negar"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función implica(p, q) que devuelva el valor de verdad de p → q (recordá: equivale a (not p) or q).",
        starter: "def implica(p, q):\n    # tu código acá\n    pass",
        tests: "assert implica(True, True) == True, \"V -> V es V\"\nassert implica(True, False) == False, \"V -> F es F (el único caso falso)\"\nassert implica(False, True) == True, \"F -> V es V\"\nassert implica(False, False) == True, \"F -> F es V (verdad vacía)\"\nprint(\"TESTS_OK\")",
      },
    },
    M03: {
      code: "M03",
      materia: "Matemática Discreta",
      title: "Contradicción y contrapositiva",
      fuente: "MIT 6.042J — Lec 1: Introduction and proofs | Libro LLM cap. 1",
      theory: ["Demostración por contradicción: suponés que la proposición es falsa y derivás un absurdo; entonces tenía que ser verdadera. Es la técnica de la demostración clásica de que √2 es irracional, vista en la primera clase de MIT.", "La contrapositiva de p → q es (no q) → (no p), y es lógicamente EQUIVALENTE a la original — demostrar una es demostrar la otra. Ojo: no confundir con la recíproca q → p, que NO es equivalente."],
      example: "# La contrapositiva tiene exactamente la misma tabla de verdad\ndef implica(p, q):\n    return (not p) or q\n\nprint(\"p     q     p->q  (~q)->(~p)\")\nfor p in [True, False]:\n    for q in [True, False]:\n        original = implica(p, q)\n        contra = implica(not q, not p)\n        print(f\"{p!s:5} {q!s:5} {original!s:5} {contra}\")",
      quiz: [{ q: "La contrapositiva de \"si llueve, el depósito se moja\" es:", opts: ["Si el depósito se moja, llueve", "Si el depósito NO se moja, NO llueve", "Si no llueve, el depósito no se moja", "El depósito siempre se moja"], correct: 1 }, { q: "En una demostración por contradicción, se empieza:", opts: ["Probando muchos casos", "Suponiendo que la proposición es falsa", "Suponiendo que es verdadera", "Con la contrapositiva"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función contrapositiva(p, q) que devuelva el valor de verdad de (not q) → (not p). Los tests verifican que coincide con implica(p, q) en los 4 casos.",
        starter: "def contrapositiva(p, q):\n    # tu código acá (podés definir implica adentro o repetir la fórmula)\n    pass",
        tests: "for p in [True, False]:\n    for q in [True, False]:\n        assert contrapositiva(p, q) == ((not p) or q), f\"Difiere de p->q en p={p}, q={q}\"\nprint(\"TESTS_OK\")",
      },
    },
    M04: {
      code: "M04",
      materia: "Matemática Discreta",
      title: "Inducción",
      fuente: "MIT 6.042J — Lec 2: Induction | Libro LLM cap. 5",
      theory: ["La inducción demuestra que algo vale para TODOS los naturales con dos pasos: el caso base (vale para n = 0 o 1) y el paso inductivo (si vale para n, vale para n+1). Es como una fila de fichas de dominó: tirás la primera y garantizás que cada una voltea a la siguiente.", "El ejemplo canónico de la clase 2 de MIT: 1 + 2 + ... + n = n(n+1)/2. El paso inductivo suma (n+1) a ambos lados de la hipótesis y verifica que la fórmula se mantiene."],
      example: "# La fórmula de Gauss coincide con la suma explícita, caso por caso\nfor n in [1, 5, 10, 100]:\n    suma_explicita = sum(range(1, n + 1))\n    formula = n * (n + 1) // 2\n    print(f\"n={n}: suma={suma_explicita}, formula={formula}, coinciden: {suma_explicita == formula}\")",
      quiz: [{ q: "¿Cuáles son los dos pasos de una demostración por inducción?", opts: ["Hipótesis y tesis", "Caso base y paso inductivo", "Contradicción y contrapositiva", "Probar n=0 y n=1000"], correct: 1 }, { q: "En el paso inductivo se demuestra que:", opts: ["La proposición vale para n=0", "Si vale para n, entonces vale para n+1", "Vale para todos los n a la vez", "Existe un n donde vale"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función suma_gauss(n) que devuelva 1 + 2 + ... + n usando la fórmula cerrada n(n+1)/2 (con división entera, sin loops).",
        starter: "def suma_gauss(n):\n    # tu código acá\n    pass",
        tests: "assert suma_gauss(1) == 1, \"Caso base\"\nassert suma_gauss(10) == 55, \"Fallo con 10\"\nassert suma_gauss(100) == 5050, \"Fallo con 100 (el clásico de Gauss)\"\nprint(\"TESTS_OK\")",
      },
    },
    M05: {
      code: "M05",
      materia: "Matemática Discreta",
      title: "Inducción fuerte",
      fuente: "MIT 6.042J — Lec 3: Strong induction | Libro LLM cap. 5",
      theory: ["La inducción fuerte cambia la hipótesis: en vez de asumir que la proposición vale solo para n, asumís que vale para TODOS los valores anteriores (desde el caso base hasta n) para probar n+1. Sirve cuando el paso n+1 depende de casos más chicos que el inmediato anterior.", "El ejemplo de la clase 3 de MIT: con estampillas de 3 y 5 centavos se puede formar cualquier franqueo desde 8 en adelante. Para armar n+1 restás una estampilla y usás la hipótesis sobre un caso anterior — necesitás varios casos base (8, 9, 10)."],
      example: "# Todo franqueo >= 8 se arma con estampillas de 3 y 5\ndef armar_franqueo(n):\n    for a in range(n // 3 + 1):\n        if (n - 3 * a) % 5 == 0:\n            return (a, (n - 3 * a) // 5)\n    return None\n\nfor n in [8, 9, 10, 11, 17]:\n    a, b = armar_franqueo(n)\n    print(f\"{n} = 3x{a} + 5x{b}\")",
      quiz: [{ q: "La inducción fuerte asume que la proposición vale para:", opts: ["Solo n", "Todos los valores desde el caso base hasta n", "n+1", "Algún n"], correct: 1 }, { q: "En el problema de las estampillas de 3 y 5, ¿por qué hacen falta varios casos base?", opts: ["Por elegancia", "Porque el paso inductivo retrocede 3, no 1", "Porque 8 es par", "No hacen falta"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función franqueo(n) que, para n >= 8, devuelva una tupla (a, b) con cantidades de estampillas de 3 y 5 tales que 3a + 5b = n. Cualquier solución válida sirve.",
        starter: "def franqueo(n):\n    # tu código acá\n    pass",
        tests: "for n in [8, 9, 10, 23, 100]:\n    a, b = franqueo(n)\n    assert a >= 0 and b >= 0 and 3*a + 5*b == n, f\"Solución inválida para {n}\"\nprint(\"TESTS_OK\")",
      },
    },
    M06: {
      code: "M06",
      materia: "Matemática Discreta",
      title: "Conjuntos y funciones",
      fuente: "MIT 6.042J — Libro LLM cap. 4 (Mathematical Data Types; sin clase propia en F2010)",
      theory: ["Un conjunto es una colección sin orden ni repetidos. Las operaciones básicas: unión (todo lo que está en alguno), intersección (lo que está en ambos), diferencia (lo de uno que no está en el otro). Dos conjuntos son disjuntos si su intersección es vacía.", "Una función asigna a cada elemento del dominio exactamente un elemento del codominio. En Python, los sets y dicts son la traducción directa de estas ideas — por eso este tema ya te sonaba de PRG1 (L13): acá le ponemos el formalismo."],
      example: "# Operaciones de conjuntos con proveedores de dos sucursales\nprov_norte = {\"Coca\", \"Arcor\", \"Quilmes\"}\nprov_sur = {\"Arcor\", \"Bimbo\"}\n\nprint(\"Unión:\", prov_norte | prov_sur)\nprint(\"Intersección:\", prov_norte & prov_sur)\nprint(\"Solo Norte:\", prov_norte - prov_sur)\nprint(\"Disjuntos:\", prov_norte.isdisjoint(prov_sur))",
      quiz: [{ q: "Dos conjuntos son disjuntos cuando:", opts: ["Tienen el mismo tamaño", "Su intersección es vacía", "Su unión es vacía", "Uno contiene al otro"], correct: 1 }, { q: "Una función asigna a cada elemento del dominio:", opts: ["Cero o más valores", "Exactamente un valor", "Al menos dos valores", "Un valor solo si existe"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función proveedores_compartidos(suc_a, suc_b) que reciba dos listas de proveedores (pueden tener repetidos) y devuelva un set con los proveedores que están en ambas.",
        starter: "def proveedores_compartidos(suc_a, suc_b):\n    # tu código acá\n    pass",
        tests: "assert proveedores_compartidos([\"Coca\", \"Arcor\", \"Coca\"], [\"Arcor\", \"Bimbo\"]) == {\"Arcor\"}, \"Fallo caso 1\"\nassert proveedores_compartidos([\"Coca\"], [\"Bimbo\"]) == set(), \"Fallo con disjuntos\"\nprint(\"TESTS_OK\")",
      },
    },
    M07: {
      code: "M07",
      materia: "Matemática Discreta",
      title: "Relaciones y órdenes parciales",
      fuente: "MIT 6.042J — Lec 11: Relations, partial orders, and scheduling | Libro LLM cap. 9",
      theory: ["Una relación sobre un conjunto es un conjunto de pares (a, b): \"a depende de b\", \"a es prerrequisito de b\". Tres propiedades clave: reflexiva (todo elemento se relaciona consigo mismo), simétrica (si a~b entonces b~a) y transitiva (si a~b y b~c, entonces a~c).", "Un orden parcial es una relación reflexiva, antisimétrica y transitiva — como los prerrequisitos entre materias de esta carrera. \"Parcial\" porque puede haber elementos incomparables: MDIS y ALG no dependen una de otra, se pueden cursar en paralelo. Es exactamente el tema de scheduling de la Lec 11 de MIT."],
      example: "# Chequear si una relación es reflexiva sobre un conjunto de tareas\ntareas = {\"comprar\", \"recibir\", \"vender\"}\nrelacion = {(\"comprar\", \"comprar\"), (\"recibir\", \"recibir\"),\n            (\"vender\", \"vender\"), (\"comprar\", \"recibir\")}\n\nreflexiva = all((t, t) in relacion for t in tareas)\nprint(\"¿Reflexiva?:\", reflexiva)",
      quiz: [{ q: "Una relación es transitiva si:", opts: ["a~a para todo a", "a~b implica b~a", "a~b y b~c implican a~c", "No tiene pares repetidos"], correct: 2 }, { q: "En un orden parcial, dos elementos incomparables significan que:", opts: ["Hay un error en la relación", "Ninguno precede al otro (pueden ir en paralelo)", "Son iguales", "La relación no es reflexiva"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función es_reflexiva(elementos, relacion) que reciba un set de elementos y un set de pares (tuplas) y devuelva True si todo elemento se relaciona consigo mismo.",
        starter: "def es_reflexiva(elementos, relacion):\n    # tu código acá\n    pass",
        tests: "assert es_reflexiva({\"a\", \"b\"}, {(\"a\",\"a\"), (\"b\",\"b\"), (\"a\",\"b\")}) == True, \"Fallo caso reflexivo\"\nassert es_reflexiva({\"a\", \"b\"}, {(\"a\",\"a\"), (\"a\",\"b\")}) == False, \"Falta (b,b)\"\nprint(\"TESTS_OK\")",
      },
    },
    M08: {
      code: "M08",
      materia: "Matemática Discreta",
      title: "Divisibilidad y MCD: el algoritmo de Euclides",
      fuente: "MIT 6.042J — Lec 4: Number theory I | Libro LLM cap. 8",
      theory: ["a divide a b si b = k·a para algún entero k. El máximo común divisor (MCD) de a y b es el mayor entero que divide a ambos. La clase 4 de MIT lo presenta con el problema de los bidones de agua de Duro de Matar 3: con bidones de 3 y 5 galones solo podés medir múltiplos de mcd(3,5) = 1.", "El algoritmo de Euclides calcula el MCD con una idea de hace 2300 años: mcd(a, b) = mcd(b, a mod b), repitiendo hasta que el resto sea 0. Es rapidísimo incluso con números enormes — por eso sigue siendo la base de la criptografía moderna."],
      example: "# Euclides paso a paso\na, b = 1071, 462\nwhile b != 0:\n    print(f\"mcd({a}, {b})\")\n    a, b = b, a % b\nprint(f\"MCD = {a}\")",
      quiz: [{ q: "El paso central del algoritmo de Euclides es:", opts: ["mcd(a,b) = mcd(a-1, b)", "mcd(a,b) = mcd(b, a mod b)", "mcd(a,b) = a*b", "Probar todos los divisores"], correct: 1 }, { q: "¿Cuándo termina el algoritmo de Euclides?", opts: ["Cuando a == b", "Cuando el resto es 0", "Después de a pasos", "Cuando a es primo"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función mcd(a, b) que calcule el máximo común divisor con el algoritmo de Euclides.",
        starter: "def mcd(a, b):\n    # tu código acá\n    pass",
        tests: "assert mcd(1071, 462) == 21, \"El ejemplo clásico de Euclides\"\nassert mcd(3, 5) == 1, \"Los bidones de Duro de Matar 3\"\nassert mcd(12, 0) == 12, \"mcd con 0\"\nprint(\"TESTS_OK\")",
      },
    },
    M09: {
      code: "M09",
      materia: "Matemática Discreta",
      title: "Aritmética modular y congruencias",
      fuente: "MIT 6.042J — Lec 5: Number theory II | Libro LLM cap. 8",
      theory: ["a ≡ b (mod m) significa que a y b dejan el mismo resto al dividir por m — o, equivalente, que m divide a (a − b). Es la aritmética del reloj: 15 hs ≡ 3 (mod 12). Suma y producto se llevan bien con el módulo: podés reducir antes o después y da lo mismo.", "La clase 5 de MIT usa esto para criptografía: los sistemas tipo RSA funcionan porque operar módulo m es fácil, pero deshacerlo sin la clave es computacionalmente durísimo. Vos ya usás congruencias sin saberlo: el dígito verificador de un código de barras es una cuenta módulo 10."],
      example: "# La aritmética del reloj y la propiedad clave del módulo\nprint(\"15 horas en reloj de 12:\", 15 % 12)\na, b, m = 47, 23, 12\nprint(\"(a+b) % m =\", (a + b) % m)\nprint(\"((a%m)+(b%m)) % m =\", ((a % m) + (b % m)) % m)  # da lo mismo",
      quiz: [{ q: "a ≡ b (mod m) significa que:", opts: ["a == b", "a y b dejan el mismo resto al dividir por m", "a divide a b", "a y b son primos"], correct: 1 }, { q: "¿Cuánto es 17 ≡ ? (mod 5)?", opts: ["0", "1", "2", "3"], correct: 2 }],
      exercise: {
        prompt: "Escribí una función son_congruentes(a, b, m) que devuelva True si a ≡ b (mod m).",
        starter: "def son_congruentes(a, b, m):\n    # tu código acá\n    pass",
        tests: "assert son_congruentes(15, 3, 12) == True, \"15 y 3 en reloj de 12\"\nassert son_congruentes(17, 2, 5) == True, \"17 mod 5 = 2\"\nassert son_congruentes(10, 3, 4) == False, \"10 mod 4 = 2, no 3\"\nprint(\"TESTS_OK\")",
      },
    },
    M10: {
      code: "M10",
      materia: "Matemática Discreta",
      title: "Grafos: definiciones y coloreo",
      fuente: "MIT 6.042J — Lec 6: Graph theory and coloring | Libro LLM cap. 11",
      theory: ["Un grafo son vértices (puntos) y aristas (conexiones entre pares). El grado de un vértice es cuántas aristas lo tocan. En código, la representación más práctica es un diccionario de adyacencia: cada vértice mapea a la lista de sus vecinos — mirá cómo conecta con los dicts de PRG1.", "La clase 6 de MIT presenta el coloreo: asignar colores a los vértices de modo que vecinos tengan colores distintos. Su aplicación original es armar horarios de exámenes sin choques — el mismo problema que asignar turnos a empleados que no pueden solaparse."],
      example: "# Sucursales conectadas por rutas de reparto (dict de adyacencia)\ngrafo = {\n    \"Norte\": [\"Sur\", \"Oeste\"],\n    \"Sur\": [\"Norte\", \"Oeste\"],\n    \"Oeste\": [\"Norte\", \"Sur\"],\n    \"Este\": [],\n}\nfor v, vecinos in grafo.items():\n    print(f\"{v}: grado {len(vecinos)}\")",
      quiz: [{ q: "El grado de un vértice es:", opts: ["Su color", "La cantidad de aristas que lo tocan", "Su posición en el dibujo", "La cantidad total de vértices"], correct: 1 }, { q: "En un coloreo válido, dos vértices vecinos:", opts: ["Tienen el mismo color", "Tienen colores distintos", "No tienen color", "Son del mismo grado"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función grado(grafo, v) que reciba un dict de adyacencia y un vértice, y devuelva su grado (cantidad de vecinos).",
        starter: "def grado(grafo, v):\n    # tu código acá\n    pass",
        tests: "g = {\"a\": [\"b\", \"c\"], \"b\": [\"a\"], \"c\": [\"a\"], \"d\": []}\nassert grado(g, \"a\") == 2, \"a tiene 2 vecinos\"\nassert grado(g, \"d\") == 0, \"d está aislado\"\nprint(\"TESTS_OK\")",
      },
    },
    M11: {
      code: "M11",
      materia: "Matemática Discreta",
      title: "Matching y grafos bipartitos",
      fuente: "MIT 6.042J — Lec 7: Matching problems | Libro LLM cap. 11",
      theory: ["Un matching es un conjunto de aristas sin vértices en común: cada elemento queda emparejado con a lo sumo uno del otro lado. La clase 7 de MIT lo presenta como el problema de emparejar de forma estable — la misma matemática que asignar repartidores a rutas: cada repartidor una ruta, cada ruta un repartidor.", "Un grafo bipartito tiene sus vértices partidos en dos grupos y todas las aristas cruzan de un grupo al otro (repartidores ↔ rutas). El matching perfecto empareja a todos; el teorema de Hall dice exactamente cuándo es posible."],
      example: "# ¿Esta asignación repartidor->ruta es un matching válido?\nasignacion = [(\"Marcos\", \"Ruta1\"), (\"Ana\", \"Ruta2\"), (\"Luis\", \"Ruta3\")]\nizquierda = [a for a, _ in asignacion]\nderecha = [b for _, b in asignacion]\nvalido = len(set(izquierda)) == len(izquierda) and len(set(derecha)) == len(derecha)\nprint(\"Matching válido:\", valido)",
      quiz: [{ q: "En un matching, dos aristas distintas:", opts: ["Comparten exactamente un vértice", "No comparten ningún vértice", "Comparten los dos vértices", "Deben cruzarse"], correct: 1 }, { q: "Un grafo bipartito es aquel donde:", opts: ["Todos los vértices tienen grado 2", "Los vértices se parten en dos grupos y las aristas cruzan entre ellos", "Hay exactamente dos aristas", "No hay ciclos"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función es_matching(pares) que reciba una lista de tuplas (izq, der) y devuelva True si ningún elemento (de ningún lado) aparece más de una vez.",
        starter: "def es_matching(pares):\n    # tu código acá\n    pass",
        tests: "assert es_matching([(\"Marcos\",\"R1\"), (\"Ana\",\"R2\")]) == True, \"Matching válido\"\nassert es_matching([(\"Marcos\",\"R1\"), (\"Marcos\",\"R2\")]) == False, \"Marcos repetido\"\nassert es_matching([(\"Marcos\",\"R1\"), (\"Ana\",\"R1\")]) == False, \"Ruta R1 repetida\"\nprint(\"TESTS_OK\")",
      },
    },
    M12: {
      code: "M12",
      materia: "Matemática Discreta",
      title: "Árboles y árbol de expansión mínima",
      fuente: "MIT 6.042J — Lec 8: Graph theory II: minimum spanning trees | Libro LLM cap. 11",
      theory: ["Un árbol es un grafo conexo sin ciclos, y siempre cumple: n vértices, n−1 aristas. Un árbol de expansión de un grafo conexo es un subconjunto de aristas que conecta todos los vértices sin formar ciclos — la red mínima que mantiene todo comunicado.", "Si las aristas tienen peso (costo de cada tramo de ruta), el árbol de expansión MÍNIMA (MST) es el de peso total más chico: la forma más barata de conectar todas las sucursales. La clase 8 de MIT demuestra que el enfoque goloso — elegir siempre la arista más barata que no arme ciclo — encuentra el óptimo."],
      example: "# Dos formas de conectar 4 sucursales: comparar el costo total\nopcion_a = [(\"N\",\"S\",10), (\"S\",\"O\",5), (\"O\",\"E\",8)]\nopcion_b = [(\"N\",\"S\",10), (\"N\",\"O\",12), (\"N\",\"E\",15)]\nfor nombre, aristas in [(\"A\", opcion_a), (\"B\", opcion_b)]:\n    total = sum(peso for _, _, peso in aristas)\n    print(f\"Opción {nombre}: costo total {total}\")",
      quiz: [{ q: "Un árbol con n vértices tiene exactamente:", opts: ["n aristas", "n-1 aristas", "n+1 aristas", "2n aristas"], correct: 1 }, { q: "El árbol de expansión mínima de un grafo con pesos es:", opts: ["El camino más corto entre dos vértices", "El subconjunto de aristas más barato que conecta todo sin ciclos", "El grafo completo", "El árbol con más aristas"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función costo_total(aristas) que reciba una lista de tuplas (origen, destino, peso) y devuelva la suma de los pesos.",
        starter: "def costo_total(aristas):\n    # tu código acá\n    pass",
        tests: "assert costo_total([(\"N\",\"S\",10), (\"S\",\"O\",5)]) == 15, \"Fallo caso 1\"\nassert costo_total([]) == 0, \"Sin aristas, costo 0\"\nprint(\"TESTS_OK\")",
      },
    },
    M13: {
      code: "M13",
      materia: "Matemática Discreta",
      title: "Conectividad y recorridos",
      fuente: "MIT 6.042J — Lec 9: Communication networks + Lec 10: Graph theory III | Libro LLM cap. 11",
      theory: ["Un camino es una secuencia de vértices donde cada uno es vecino del siguiente; un grafo es conexo si hay camino entre cualquier par. Las clases 9 y 10 de MIT estudian redes de comunicación con exactamente esta pregunta: ¿si se cae un enlace, sigue todo conectado?", "Para responder \"¿hay camino de A a B?\" en código, el recorrido estándar es: arrancás en A, visitás sus vecinos, después los vecinos de los vecinos, marcando visitados para no ciclar. Es la base de BFS/DFS que vas a formalizar en ALGO — acá te alcanza con la versión con una lista pendientes y un set de visitados."],
      example: "# ¿Llega la mercadería de Norte a Este por la red de rutas?\ngrafo = {\"Norte\": [\"Sur\"], \"Sur\": [\"Norte\", \"Oeste\"],\n         \"Oeste\": [\"Sur\", \"Este\"], \"Este\": [\"Oeste\"]}\n\npendientes, visitados = [\"Norte\"], set()\nwhile pendientes:\n    actual = pendientes.pop()\n    if actual in visitados:\n        continue\n    visitados.add(actual)\n    pendientes.extend(grafo[actual])\nprint(\"Alcanzables desde Norte:\", sorted(visitados))",
      quiz: [{ q: "Un grafo es conexo si:", opts: ["Todos los vértices tienen el mismo grado", "Hay camino entre cualquier par de vértices", "No tiene ciclos", "Tiene una sola arista"], correct: 1 }, { q: "Al recorrer un grafo, ¿para qué sirve el set de visitados?", opts: ["Para ordenar los vértices", "Para no visitar el mismo vértice dos veces (y no ciclar)", "Para contar aristas", "No sirve para nada"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función hay_camino(grafo, origen, destino) que devuelva True si existe un camino entre origen y destino en el dict de adyacencia (usá el patrón pendientes + visitados del ejemplo).",
        starter: "def hay_camino(grafo, origen, destino):\n    # tu código acá\n    pass",
        tests: "g = {\"a\": [\"b\"], \"b\": [\"a\", \"c\"], \"c\": [\"b\"], \"d\": []}\nassert hay_camino(g, \"a\", \"c\") == True, \"a llega a c vía b\"\nassert hay_camino(g, \"a\", \"d\") == False, \"d está aislado\"\nassert hay_camino(g, \"a\", \"a\") == True, \"Un vértice se alcanza a sí mismo\"\nprint(\"TESTS_OK\")",
      },
    },
    M14: {
      code: "M14",
      materia: "Matemática Discreta",
      title: "Sumas y series",
      fuente: "MIT 6.042J — Lec 12: Sums | Libro LLM cap. 13",
      theory: ["Muchos análisis terminan en una suma: total de operaciones, total de intereses, total acumulado. Las dos que resuelven casi todo: la aritmética (1+2+...+n = n(n+1)/2, ya la demostraste por inducción en M04) y la geométrica (1 + x + x² + ... + xⁿ = (x^(n+1) − 1)/(x − 1) para x ≠ 1).", "La geométrica aparece cada vez que algo crece o decrece a ritmo constante — la clase 12 de MIT la usa para calcular el valor de una anualidad: cuánto valen hoy pagos futuros con inflación. Un tema que en Argentina no hace falta explicar."],
      example: "# Suma geométrica: forma explícita vs. fórmula cerrada\nx, n = 2, 10\nexplicita = sum(x**k for k in range(n + 1))\nformula = (x**(n + 1) - 1) // (x - 1)\nprint(f\"Suma de potencias de {x} hasta {n}: {explicita}\")\nprint(f\"Fórmula cerrada: {formula}, coinciden: {explicita == formula}\")",
      quiz: [{ q: "La suma 1 + x + x² + ... + xⁿ (x ≠ 1) tiene fórmula cerrada:", opts: ["n(n+1)/2", "(x^(n+1) − 1)/(x − 1)", "xⁿ", "n·x"], correct: 1 }, { q: "¿Cuánto vale 1 + 2 + 4 + 8 + 16?", opts: ["30", "31", "32", "producto de todos"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función suma_geometrica(x, n) que devuelva 1 + x + x² + ... + xⁿ para x entero ≥ 2 (usá la fórmula cerrada con división entera).",
        starter: "def suma_geometrica(x, n):\n    # tu código acá\n    pass",
        tests: "assert suma_geometrica(2, 4) == 31, \"1+2+4+8+16 = 31\"\nassert suma_geometrica(3, 3) == 40, \"1+3+9+27 = 40\"\nassert suma_geometrica(2, 0) == 1, \"Solo el término 1\"\nprint(\"TESTS_OK\")",
      },
    },
    M15: {
      code: "M15",
      materia: "Matemática Discreta",
      title: "Asintótica y notación O",
      fuente: "MIT 6.042J — Lec 13: Sums and asymptotics | Libro LLM cap. 13",
      theory: ["La notación O compara cómo crecen las funciones cuando n se hace grande, ignorando constantes y términos menores: 3n² + 50n + 7 es O(n²), porque para n grande el n² domina todo. Es el lenguaje con el que vas a medir algoritmos en PRG2 y ALGO.", "La jerarquía que hay que tener tatuada, de más lento a más rápido crecimiento: constante < log n < n < n log n < n² < 2ⁿ. Un algoritmo O(2ⁿ) es inservible ya con n = 60; uno O(n log n) procesa millones sin despeinarse."],
      example: "# Ver la jerarquía de crecimiento con números concretos\nimport math\nfor n in [10, 100, 1000]:\n    print(f\"n={n}: log={math.log2(n):.0f}, n={n}, nlogn={n*math.log2(n):.0f}, n2={n**2}\")",
      quiz: [{ q: "3n² + 50n + 7 es:", opts: ["O(n)", "O(n²)", "O(n³)", "O(50n)"], correct: 1 }, { q: "Ordenados de crecimiento más lento a más rápido:", opts: ["n², n log n, n", "n, n log n, n²", "n log n, n, n²", "n², n, log n"], correct: 1 }],
      exercise: {
        prompt: "Un algoritmo con dos loops anidados sobre n elementos hace n² comparaciones, más n operaciones de preparación. Escribí operaciones(n) que devuelva el total exacto (n² + n).",
        starter: "def operaciones(n):\n    # tu código acá\n    pass",
        tests: "assert operaciones(10) == 110, \"100 + 10\"\nassert operaciones(100) == 10100, \"Con n=100 el n2 ya domina: 10000 vs 100\"\nassert operaciones(1) == 2, \"Caso mínimo\"\nprint(\"TESTS_OK\")",
      },
    },
    M16: {
      code: "M16",
      materia: "Matemática Discreta",
      title: "Recurrencias",
      fuente: "MIT 6.042J — Lec 14: Divide and conquer recurrences + Lec 15: Linear recurrences",
      theory: ["Una recurrencia define una cantidad en función de casos más chicos: T(n) = 2·T(n−1) + 1. Es la contracara matemática de la recursión en código, y el modo natural de medir cuánto cuesta un algoritmo que se llama a sí mismo.", "El ejemplo con el que abre la clase 14 de MIT: las Torres de Hanoi. Mover n discos exige mover n−1, mover el grande, y mover n−1 de nuevo: T(n) = 2T(n−1) + 1, cuya solución cerrada es 2ⁿ − 1. Con 64 discos, más pasos que segundos tiene la edad del universo — las recurrencias te dicen eso antes de ejecutar nada."],
      example: "# Torres de Hanoi: la recurrencia y su fórmula cerrada coinciden\ndef hanoi(n):\n    if n == 0:\n        return 0\n    return 2 * hanoi(n - 1) + 1\n\nfor n in [1, 3, 5, 10]:\n    print(f\"T({n}) = {hanoi(n)}, fórmula 2^n - 1 = {2**n - 1}\")",
      quiz: [{ q: "La recurrencia de Hanoi T(n) = 2T(n−1) + 1 tiene solución cerrada:", opts: ["n²", "2ⁿ − 1", "2n + 1", "n!"], correct: 1 }, { q: "Una recurrencia define una cantidad:", opts: ["Con un valor fijo", "En función de casos más chicos de sí misma", "Solo con sumas", "Sin caso base"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función movimientos_hanoi(n) que calcule los movimientos mínimos para n discos usando la recurrencia T(n) = 2·T(n−1) + 1 con T(0) = 0 (recursiva o con loop).",
        starter: "def movimientos_hanoi(n):\n    # tu código acá\n    pass",
        tests: "assert movimientos_hanoi(0) == 0, \"Caso base\"\nassert movimientos_hanoi(3) == 7, \"3 discos, 7 movimientos\"\nassert movimientos_hanoi(10) == 1023, \"2^10 - 1\"\nprint(\"TESTS_OK\")",
      },
    },
    M17: {
      code: "M17",
      materia: "Matemática Discreta",
      title: "Conteo I: reglas básicas y permutaciones",
      fuente: "MIT 6.042J — Lec 16: Counting rules I | Libro LLM cap. 14",
      theory: ["Regla del producto: si una decisión tiene a opciones y la siguiente b, hay a·b combinaciones totales. Regla de la suma: si dos casos no se pueden dar a la vez, se suman. Con esas dos reglas se cuenta casi todo — la clase 16 de MIT las usa para contar contraseñas posibles.", "Una permutación es un ordenamiento: n elementos se ordenan de n! formas (n factorial: n·(n−1)·...·1). Si solo elegís y ordenás k de los n, son n·(n−1)·...·(n−k+1) = n!/(n−k)! formas."],
      example: "# ¿De cuántas formas se pueden ordenar 5 productos en una góndola?\nimport math\nn = 5\nprint(f\"Permutaciones de {n}: {math.factorial(n)}\")\n# ¿Y elegir y ordenar 3 de 5 en la vidriera?\nprint(\"Elegir y ordenar 3 de 5:\", math.factorial(5) // math.factorial(2))",
      quiz: [{ q: "Un menú tiene 3 entradas y 4 platos principales. ¿Cuántos menús (entrada + plato)?", opts: ["7", "12", "34", "3"], correct: 1 }, { q: "¿De cuántas formas se ordenan 4 elementos distintos?", opts: ["4", "16", "24", "8"], correct: 2 }],
      exercise: {
        prompt: "Escribí una función ordenamientos(n, k) que devuelva de cuántas formas se pueden elegir y ordenar k elementos de n, es decir n!/(n−k)! (podés usar math.factorial o un loop).",
        starter: "def ordenamientos(n, k):\n    # tu código acá\n    pass",
        tests: "assert ordenamientos(5, 5) == 120, \"5! = 120\"\nassert ordenamientos(5, 3) == 60, \"5*4*3\"\nassert ordenamientos(4, 0) == 1, \"Elegir 0: una sola forma (no elegir nada)\"\nprint(\"TESTS_OK\")",
      },
    },
    M18: {
      code: "M18",
      materia: "Matemática Discreta",
      title: "Conteo II: combinaciones, palomar e inclusión-exclusión",
      fuente: "MIT 6.042J — Lec 17: Counting rules II | Libro LLM cap. 14-15",
      theory: ["Una combinación elige k de n SIN importar el orden: C(n,k) = n!/(k!(n−k)!). La diferencia con la permutación es esa: elegir 3 productos para una promo (combinación) no es lo mismo que ordenarlos en la vidriera (permutación).", "Dos herramientas más de la clase 17: el principio del palomar (si metés más palomas que casilleros, algún casillero tiene dos — con 13 personas, seguro dos cumplen el mismo mes) e inclusión-exclusión (|A ∪ B| = |A| + |B| − |A ∩ B|: si sumás dos grupos que se solapan, restá el solapamiento para no contar doble)."],
      example: "# Combinaciones e inclusión-exclusión\nimport math\nprint(\"Elegir 3 productos de 10 para la promo:\", math.comb(10, 3))\nclientes_norte, clientes_sur, en_ambas = 120, 80, 25\nprint(\"Clientes totales (sin contar doble):\", clientes_norte + clientes_sur - en_ambas)",
      quiz: [{ q: "C(5, 2) — elegir 2 de 5 sin orden — vale:", opts: ["20", "10", "25", "7"], correct: 1 }, { q: "Con 13 personas, el principio del palomar garantiza que:", opts: ["Todas cumplen en meses distintos", "Al menos dos cumplen el mismo mes", "Alguien cumple en enero", "Nada"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función combinaciones(n, k) que devuelva C(n, k) = n!/(k!(n−k)!) usando math.factorial (sin usar math.comb).",
        starter: "import math\n\ndef combinaciones(n, k):\n    # tu código acá\n    pass",
        tests: "assert combinaciones(5, 2) == 10, \"C(5,2) = 10\"\nassert combinaciones(10, 3) == 120, \"C(10,3) = 120\"\nassert combinaciones(4, 4) == 1, \"Elegir todos: una forma\"\nprint(\"TESTS_OK\")",
      },
    },
    M19: {
      code: "M19",
      materia: "Matemática Discreta",
      title: "Probabilidad: espacios muestrales",
      fuente: "MIT 6.042J — Lec 18: Probability introduction | Libro LLM cap. 16",
      theory: ["El espacio muestral es el conjunto de todos los resultados posibles de un experimento; un evento es un subconjunto. Cuando todos los resultados son igualmente probables, P(evento) = casos favorables / casos totales. Dos dados tienen 36 resultados; \"suma 7\" tiene 6 → P = 6/36 = 1/6.", "La regla de oro de la clase 18 de MIT, ilustrada con el problema de Monty Hall: la intuición probabilística falla seguido; el método de armar el espacio muestral completo y contar, no. Ante la duda, enumerá — y en Python enumerar es un doble for."],
      example: "# Espacio muestral de dos dados: contar en vez de intuir\nfavorables = 0\nfor d1 in range(1, 7):\n    for d2 in range(1, 7):\n        if d1 + d2 == 7:\n            favorables += 1\nprint(f\"P(suma 7) = {favorables}/36\")",
      quiz: [{ q: "Con resultados equiprobables, la probabilidad de un evento es:", opts: ["Siempre 1/2", "Casos favorables sobre casos totales", "Casos totales sobre favorables", "El tamaño del espacio muestral"], correct: 1 }, { q: "El espacio muestral de tirar dos dados tiene:", opts: ["12 resultados", "36 resultados", "6 resultados", "21 resultados"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función casos_suma(objetivo) que devuelva cuántos resultados de tirar dos dados suman exactamente objetivo (enumerá con doble for).",
        starter: "def casos_suma(objetivo):\n    # tu código acá\n    pass",
        tests: "assert casos_suma(7) == 6, \"La suma más probable\"\nassert casos_suma(2) == 1, \"Solo (1,1)\"\nassert casos_suma(13) == 0, \"Imposible con dos dados\"\nprint(\"TESTS_OK\")",
      },
    },
    M20: {
      code: "M20",
      materia: "Matemática Discreta",
      title: "Probabilidad condicional y Bayes",
      fuente: "MIT 6.042J — Lec 19: Conditional probability | Libro LLM cap. 17",
      theory: ["P(A|B) es la probabilidad de A sabiendo que B ocurrió: restringís el espacio muestral a B. La fórmula: P(A|B) = P(A y B) / P(B). El teorema de Bayes la da vuelta: P(A|B) = P(B|A)·P(A) / P(B) — te deja pasar de \"probabilidad del síntoma dada la causa\" a \"probabilidad de la causa dado el síntoma\".", "La clase 19 de MIT lo aplica al clásico del test médico: si una condición afecta al 1% y el test acierta el 90%, un positivo NO significa 90% de tener la condición — los falsos positivos del 99% sano pesan muchísimo. Es el mismo cálculo detrás de un detector de anomalías de stock: pocas alertas verdaderas entre muchas falsas."],
      example: "# Bayes con el clásico del test: contando sobre 10000 casos\npoblacion = 10000\nenfermos = int(poblacion * 0.01)          # 1% tiene la condición\nsanos = poblacion - enfermos\npositivos_verdaderos = int(enfermos * 0.90)   # sensibilidad 90%\nfalsos_positivos = int(sanos * 0.10)          # 10% de falsos positivos\ntotal_positivos = positivos_verdaderos + falsos_positivos\nprint(f\"P(enfermo | positivo) = {positivos_verdaderos}/{total_positivos}\"\n      f\" = {positivos_verdaderos/total_positivos:.2%}\")",
      quiz: [{ q: "P(A|B) se calcula como:", opts: ["P(A) · P(B)", "P(A y B) / P(B)", "P(A) + P(B)", "P(B) / P(A)"], correct: 1 }, { q: "En el ejemplo del test (1% de prevalencia, 90% de acierto), un positivo implica probabilidad de estar enfermo:", opts: ["Del 90%", "Mucho menor al 90%, por los falsos positivos", "Del 100%", "Del 1%"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función prob_condicional(casos_ab, casos_b) que devuelva P(A|B) = casos_ab / casos_b redondeada a 4 decimales.",
        starter: "def prob_condicional(casos_ab, casos_b):\n    # tu código acá\n    pass",
        tests: "assert prob_condicional(90, 1080) == 0.0833, \"El caso del test médico\"\nassert prob_condicional(6, 36) == 0.1667, \"Suma 7 en dos dados\"\nassert prob_condicional(0, 10) == 0.0, \"Evento imposible\"\nprint(\"TESTS_OK\")",
      },
    },
    M21: {
      code: "M21",
      materia: "Matemática Discreta",
      title: "Independencia",
      fuente: "MIT 6.042J — Lec 20: Independence | Libro LLM cap. 18",
      theory: ["Dos eventos son independientes si saber que uno ocurrió no cambia la probabilidad del otro: P(A y B) = P(A)·P(B). Dos tiradas de dado son independientes; \"llueve\" y \"caen las ventas del delivery\" seguramente no.", "La advertencia de la clase 20 de MIT: asumir independencia sin justificarla es de los errores más caros del razonamiento probabilístico — su ejemplo son fallas judiciales reales por multiplicar probabilidades de eventos que no eran independientes. Antes de multiplicar, preguntate si un evento informa sobre el otro."],
      example: "# Verificar independencia con el espacio muestral de dos dados\ntotal = 36\np_d1_par = 18 / total          # primer dado par\np_suma_7 = 6 / total           # suma 7\ncasos_ambos = sum(1 for d1 in range(1,7) for d2 in range(1,7)\n                  if d1 % 2 == 0 and d1 + d2 == 7)\np_ambos = casos_ambos / total\nprint(f\"P(A)·P(B) = {p_d1_par * p_suma_7:.4f}\")\nprint(f\"P(A y B) = {p_ambos:.4f}\")\nprint(\"Independientes:\", abs(p_ambos - p_d1_par * p_suma_7) < 1e-9)",
      quiz: [{ q: "A y B son independientes cuando:", opts: ["P(A y B) = P(A) + P(B)", "P(A y B) = P(A) · P(B)", "P(A) = P(B)", "No pueden ocurrir juntos"], correct: 1 }, { q: "¿Se puede asumir independencia entre dos eventos cualesquiera?", opts: ["Sí, siempre", "No: hay que justificar que uno no informa sobre el otro", "Solo si son del mismo experimento", "Solo con dados"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función son_independientes(p_a, p_b, p_ab) que devuelva True si p_ab es igual a p_a·p_b con tolerancia de 1e-9 (comparación de floats).",
        starter: "def son_independientes(p_a, p_b, p_ab):\n    # tu código acá\n    pass",
        tests: "assert son_independientes(0.5, 1/6, 1/12) == True, \"Dado par y suma 7\"\nassert son_independientes(0.5, 0.5, 0.4) == False, \"0.4 != 0.25\"\nprint(\"TESTS_OK\")",
      },
    },
    M22: {
      code: "M22",
      materia: "Matemática Discreta",
      title: "Variables aleatorias",
      fuente: "MIT 6.042J — Lec 21: Random variables | Libro LLM cap. 19",
      theory: ["Una variable aleatoria asigna un número a cada resultado del experimento: \"la suma de los dos dados\", \"las unidades vendidas hoy\". Su distribución dice con qué probabilidad toma cada valor — en Python, un dict {valor: probabilidad} que debe sumar 1.", "Sobre una variable aleatoria podés preguntar por eventos: P(ventas ≥ 10) es la suma de las probabilidades de todos los valores que cumplen la condición. Ese pasaje de \"resultados\" a \"números con distribución\" es lo que permite calcular esperanzas en la próxima lección."],
      example: "# Distribución de la demanda diaria de un producto\ndemanda = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.2, 4: 0.1}\nprint(\"Suma de probabilidades:\", sum(demanda.values()))\np_al_menos_2 = sum(p for valor, p in demanda.items() if valor >= 2)\nprint(f\"P(demanda >= 2) = {p_al_menos_2:.1f}\")",
      quiz: [{ q: "Una variable aleatoria es:", opts: ["Un número al azar sin regla", "Una función que asigna un número a cada resultado del experimento", "Siempre un dado", "Un evento"], correct: 1 }, { q: "Las probabilidades de una distribución deben sumar:", opts: ["0", "1", "100", "Depende del experimento"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función prob_al_menos(dist, umbral) que reciba un dict {valor: prob} y devuelva P(X ≥ umbral) redondeada a 4 decimales.",
        starter: "def prob_al_menos(dist, umbral):\n    # tu código acá\n    pass",
        tests: "d = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.2, 4: 0.1}\nassert prob_al_menos(d, 2) == 0.7, \"0.4+0.2+0.1\"\nassert prob_al_menos(d, 0) == 1.0, \"Todos los valores\"\nassert prob_al_menos(d, 5) == 0.0, \"Ningún valor llega\"\nprint(\"TESTS_OK\")",
      },
    },
    M23: {
      code: "M23",
      materia: "Matemática Discreta",
      title: "Esperanza",
      fuente: "MIT 6.042J — Lec 22: Expectation I + Lec 23: Expectation II | Libro LLM cap. 19",
      theory: ["La esperanza E[X] es el promedio ponderado por probabilidad: E[X] = Σ valor·probabilidad. Es \"el promedio a la larga\": si la demanda diaria tiene esperanza 2.0, en 30 días esperás vender unas 60 unidades — el número que necesitás para decidir cuánto stock reponer.", "La propiedad estrella de las clases 22-23 de MIT: la linealidad. E[X + Y] = E[X] + E[Y] SIEMPRE, sean o no independientes las variables. Eso permite partir un problema enorme (demanda total de 3 sucursales) en pedazos simples y sumar las esperanzas."],
      example: "# Esperanza de la demanda diaria + linealidad entre sucursales\ndemanda_norte = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.2, 4: 0.1}\ne_norte = sum(v * p for v, p in demanda_norte.items())\nprint(f\"E[demanda Norte] = {e_norte}\")\ne_sur = 1.5\nprint(f\"E[demanda total] = E[Norte] + E[Sur] = {e_norte + e_sur}\")",
      quiz: [{ q: "La esperanza de una variable aleatoria es:", opts: ["Su valor más probable", "El promedio ponderado por probabilidad de sus valores", "Su valor máximo", "Siempre un entero"], correct: 1 }, { q: "La linealidad de la esperanza, E[X+Y] = E[X] + E[Y], vale:", opts: ["Solo si X e Y son independientes", "Siempre, sean o no independientes", "Solo con dados", "Nunca"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función esperanza(dist) que reciba un dict {valor: prob} y devuelva E[X] = Σ valor·prob redondeada a 4 decimales.",
        starter: "def esperanza(dist):\n    # tu código acá\n    pass",
        tests: "assert esperanza({0: 0.1, 1: 0.2, 2: 0.4, 3: 0.2, 4: 0.1}) == 2.0, \"Demanda esperada 2.0\"\nassert esperanza({1: 0.5, 2: 0.5}) == 1.5, \"Promedio simple\"\nassert esperanza({7: 1.0}) == 7.0, \"Variable constante\"\nprint(\"TESTS_OK\")",
      },
    },
    M24: {
      code: "M24",
      materia: "Matemática Discreta",
      title: "Desviaciones y paseos aleatorios",
      fuente: "MIT 6.042J — Lec 24: Large deviations + Lec 25: Random walks | Libro LLM cap. 20-21",
      theory: ["¿Qué tan lejos de su esperanza puede caer una variable? La desigualdad de Markov da la primera cota: si X ≥ 0, entonces P(X ≥ a) ≤ E[X]/a. Con demanda esperada 2, la probabilidad de que un día pidan 10 o más es a lo sumo 2/10 = 0.2 — sin saber nada más de la distribución.", "La clase 25 cierra con paseos aleatorios: un valor que sube o baja al azar en cada paso. Es el modelo del jugador que apuesta hasta quebrar (\"gambler's ruin\") — y la matemática detrás del PageRank de Google, que la clase menciona como aplicación estrella. Simular mil paseos y promediar es tu primera herramienta de análisis probabilístico computacional."],
      example: "# Paseo aleatorio reproducible: caja que sube o baja $1 por operación\nimport random\nrandom.seed(42)\nsaldo, historia = 100, []\nfor _ in range(20):\n    saldo += random.choice([-1, 1])\n    historia.append(saldo)\nprint(\"Saldo final tras 20 pasos:\", saldo)\nprint(\"Mínimo del recorrido:\", min(historia))",
      quiz: [{ q: "La desigualdad de Markov (X ≥ 0) dice que P(X ≥ a) es a lo sumo:", opts: ["a / E[X]", "E[X] / a", "E[X] · a", "1 − E[X]"], correct: 1 }, { q: "Un paseo aleatorio es:", opts: ["Un valor que sube o baja al azar en cada paso", "Una caminata determinística", "Un grafo sin ciclos", "Una suma geométrica"], correct: 0 }],
      exercise: {
        prompt: "Escribí una función cota_markov(esperanza, a) que devuelva la cota superior de Markov para P(X ≥ a), es decir esperanza/a, redondeada a 4 decimales.",
        starter: "def cota_markov(esperanza, a):\n    # tu código acá\n    pass",
        tests: "assert cota_markov(2, 10) == 0.2, \"Demanda esperada 2, cota para >=10\"\nassert cota_markov(3, 4) == 0.75, \"Fallo caso 2\"\nassert cota_markov(5, 5) == 1.0, \"Cota trivial cuando a = E[X]\"\nprint(\"TESTS_OK\")",
      },
    },
    M25: {
      code: "M25",
      materia: "Matemática Discreta",
      title: "Proyecto integrador",
      fuente: "MIT 6.042J — Problem sets 6, 8 y 12 + exámenes con solución de OCW (nivel de exigencia)",
      theory: ["Este integrador junta las tres partes del curso, igual que los exámenes de 6.042J: estructuras discretas (grafos y conectividad), conteo, y probabilidad (distribuciones y esperanza). No hay teoría nueva: hay un problema con varias piezas.", "El caso: una red de sucursales conectadas por rutas, cada una con su distribución de demanda diaria. Hay que responder preguntas de conectividad (¿la mercadería llega?) y de planificación (¿cuánta demanda total esperar?) — grafos de M10-M13 más esperanza de M22-M23, en una sola función."],
      example: "# Las dos piezas del integrador, por separado\ngrafo = {\"Deposito\": [\"Norte\"], \"Norte\": [\"Deposito\", \"Sur\"], \"Sur\": [\"Norte\"]}\ndemandas = {\"Norte\": {1: 0.5, 2: 0.5}, \"Sur\": {2: 0.3, 3: 0.7}}\n\ne_total = sum(sum(v * p for v, p in dist.items()) for dist in demandas.values())\nprint(f\"Demanda total esperada por día: {e_total}\")",
      quiz: [{ q: "El integrador combina principalmente:", opts: ["Solo grafos", "Grafos/conectividad + esperanza de variables aleatorias", "Solo probabilidad", "Teoría de números"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función plan_reparto(grafo, demandas, deposito) que devuelva un dict con: 'alcanzables' (set de sucursales de demandas a las que hay camino desde deposito, usá el patrón de M13) y 'demanda_esperada' (suma de las esperanzas de las distribuciones SOLO de las sucursales alcanzables, redondeada a 4 decimales).",
        starter: "def plan_reparto(grafo, demandas, deposito):\n    # tu código acá\n    pass",
        tests: "g = {\"D\": [\"N\"], \"N\": [\"D\", \"S\"], \"S\": [\"N\"], \"X\": []}\ndem = {\"N\": {1: 0.5, 2: 0.5}, \"S\": {2: 1.0}, \"X\": {9: 1.0}}\nr = plan_reparto(g, dem, \"D\")\nassert r[\"alcanzables\"] == {\"N\", \"S\"}, \"X está aislada, no debe entrar\"\nassert r[\"demanda_esperada\"] == 3.5, \"E[N]=1.5 + E[S]=2.0\"\nr2 = plan_reparto({\"D\": []}, dem, \"D\")\nassert r2[\"alcanzables\"] == set() and r2[\"demanda_esperada\"] == 0, \"Depósito aislado\"\nprint(\"TESTS_OK\")",
      },
    },
  },
  ALG: {
    A01: {
      code: "A01",
      materia: "Álgebra Lineal",
      title: "Vectores y combinaciones lineales",
      fuente: "MIT 18.06SC — The Geometry of Linear Equations | 3Blue1Brown cap. 1-2",
      theory: ["Un vector es una flecha desde el origen: [3, 2] es \"3 a la derecha, 2 arriba\". Pero también es una lista de números que podés sumar componente a componente y escalar (multiplicar por un número). Esas dos operaciones — sumar y escalar — son TODO el álgebra lineal, como insiste 3Blue1Brown.", "Una combinación lineal de vectores v y w es a·v + b·w: los estirás por un número y los sumás. Pensá el stock de una sucursal como un vector [gaseosas, aguas, snacks]: sumar el stock de dos sucursales es sumar sus vectores; duplicar un pedido es escalar el vector."],
      example: "# Suma de vectores y escalado, componente a componente\ndef sumar(v, w):\n    return [a + b for a, b in zip(v, w)]\n\ndef escalar(k, v):\n    return [k * a for a in v]\n\nstock_norte = [40, 12, 8]   # [gaseosas, aguas, snacks]\nstock_sur = [15, 30, 5]\nprint(\"Stock total:\", sumar(stock_norte, stock_sur))\nprint(\"Pedido doble del Norte:\", escalar(2, stock_norte))",
      quiz: [{ q: "¿Cuáles son las dos operaciones fundamentales del álgebra lineal?", opts: ["Multiplicar y dividir", "Sumar vectores y escalarlos", "Rotar y trasladar", "Derivar e integrar"], correct: 1 }, { q: "La combinación lineal 2·[1,0] + 3·[0,1] da:", opts: ["[2,3]", "[3,2]", "[5,5]", "[2,0]"], correct: 0 }],
      exercise: {
        prompt: "Escribí una función combinacion(a, v, b, w) que devuelva la combinación lineal a·v + b·w de dos vectores (listas de igual longitud).",
        starter: "def combinacion(a, v, b, w):\n    # tu código acá\n    pass",
        tests: "assert combinacion(2, [1,0], 3, [0,1]) == [2, 3], \"2*[1,0]+3*[0,1]\"\nassert combinacion(1, [40,12], 1, [15,30]) == [55, 42], \"Suma de stock\"\nassert combinacion(0, [9,9], 5, [1,2]) == [5, 10], \"Anular el primero\"\nprint(\"TESTS_OK\")",
      },
    },
    A02: {
      code: "A02",
      materia: "Álgebra Lineal",
      title: "Producto matriz-vector y span",
      fuente: "MIT 18.06SC — The Geometry of Linear Equations | 3Blue1Brown cap. 3",
      theory: ["Multiplicar una matriz por un vector es tomar una combinación lineal de las columnas de la matriz, con pesos dados por el vector. A·x = x1·(columna 1) + x2·(columna 2) + ... Esta es LA idea que 3Blue1Brown pone en el centro: la matriz transforma el espacio, y A·x te dice a dónde va a parar x.", "El span de un conjunto de vectores es todo lo que podés alcanzar con sus combinaciones lineales. Dos vectores no alineados en el plano tienen span = todo el plano; si están alineados, su span es apenas una recta."],
      example: "# A·x como combinación lineal de las columnas de A\ndef matriz_por_vector(A, x):\n    # A es lista de FILAS; el resultado es un vector\n    return [sum(A[i][j] * x[j] for j in range(len(x))) for i in range(len(A))]\n\nA = [[1, 2],\n     [3, 4]]\nx = [1, 1]\nprint(\"A·x =\", matriz_por_vector(A, x))  # columna1 + columna2 = [3, 7]",
      quiz: [{ q: "Multiplicar A·x equivale a:", opts: ["Sumar todas las filas de A", "Una combinación lineal de las columnas de A con pesos x", "El determinante de A", "Escalar x por 2"], correct: 1 }, { q: "El span de dos vectores alineados (uno múltiplo del otro) es:", opts: ["Todo el plano", "Una recta", "Un solo punto", "El espacio 3D"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función matriz_por_vector(A, x) que multiplique la matriz A (lista de filas) por el vector x y devuelva el vector resultante.",
        starter: "def matriz_por_vector(A, x):\n    # tu código acá\n    pass",
        tests: "assert matriz_por_vector([[1,2],[3,4]], [1,1]) == [3, 7], \"columna1+columna2\"\nassert matriz_por_vector([[1,0],[0,1]], [5,9]) == [5, 9], \"Identidad no cambia x\"\nassert matriz_por_vector([[2,0],[0,2]], [3,4]) == [6, 8], \"Escala por 2\"\nprint(\"TESTS_OK\")",
      },
    },
    A03: {
      code: "A03",
      materia: "Álgebra Lineal",
      title: "Independencia lineal, base y dimensión",
      fuente: "MIT 18.06SC — Independence, Basis and Dimension | 3Blue1Brown cap. 2",
      theory: ["Un conjunto de vectores es linealmente independiente si ninguno es combinación lineal de los otros — ninguno es \"redundante\". Si uno se puede armar con los demás, es dependiente y no aporta dirección nueva.", "Una base es un conjunto de vectores independientes que generan todo el espacio (su span es todo). La cantidad de vectores de una base es la dimensión. En el plano, cualquier par de vectores no alineados es una base: dimensión 2."],
      example: "# Dos vectores son dependientes si uno es múltiplo del otro (caso 2D)\ndef son_dependientes_2d(v, w):\n    # dependientes si el determinante 2x2 es 0\n    return v[0]*w[1] - v[1]*w[0] == 0\n\nprint(\"[1,2] y [2,4]:\", son_dependientes_2d([1,2], [2,4]))  # True: w = 2v\nprint(\"[1,0] y [0,1]:\", son_dependientes_2d([1,0], [0,1]))  # False: base",
      quiz: [{ q: "Un conjunto de vectores es linealmente independiente si:", opts: ["Todos son iguales", "Ninguno es combinación lineal de los otros", "Suman cero", "Son ortogonales"], correct: 1 }, { q: "La dimensión de un espacio es:", opts: ["La cantidad de vectores que tenés", "La cantidad de vectores de una base", "La longitud del vector más largo", "Siempre 3"], correct: 1 }],
      exercise: {
        prompt: "En 2D, dos vectores [a,b] y [c,d] son dependientes si a·d − b·c = 0. Escribí son_dependientes(v, w) que devuelva True si los vectores 2D v y w son linealmente dependientes.",
        starter: "def son_dependientes(v, w):\n    # tu código acá\n    pass",
        tests: "assert son_dependientes([1,2], [2,4]) == True, \"[2,4] = 2*[1,2]\"\nassert son_dependientes([1,0], [0,1]) == False, \"Base canónica: independientes\"\nassert son_dependientes([3,6], [1,2]) == True, \"Múltiplos\"\nprint(\"TESTS_OK\")",
      },
    },
    A04: {
      code: "A04",
      materia: "Álgebra Lineal",
      title: "Multiplicación de matrices como composición",
      fuente: "MIT 18.06SC — Multiplication and Inverse Matrices | 3Blue1Brown cap. 4",
      theory: ["Multiplicar dos matrices A·B significa aplicar primero la transformación B y después A — es COMPOSICIÓN de transformaciones, la idea central de la clase 4 de Strang y del cap. 4 de 3Blue1Brown. Por eso el orden importa: A·B casi nunca es igual a B·A.", "Mecánicamente, la entrada (i,j) del producto es el producto punto de la fila i de A con la columna j de B. Es como aplicar dos ajustes de stock en cadena: el resultado depende de cuál hacés primero."],
      example: "# Producto de matrices: (fila de A) · (columna de B)\ndef multiplicar(A, B):\n    n, m, p = len(A), len(B), len(B[0])\n    return [[sum(A[i][k]*B[k][j] for k in range(m)) for j in range(p)] for i in range(n)]\n\nA = [[1, 2], [0, 1]]\nB = [[1, 0], [3, 1]]\nprint(\"A·B =\", multiplicar(A, B))\nprint(\"B·A =\", multiplicar(B, A))  # distinto: el orden importa",
      quiz: [{ q: "El producto de matrices A·B representa:", opts: ["Sumar A y B", "Aplicar B y después A (composición)", "El promedio de A y B", "Siempre lo mismo que B·A"], correct: 1 }, { q: "La entrada (i,j) de A·B es:", opts: ["A[i][j] + B[i][j]", "El producto punto de la fila i de A con la columna j de B", "A[i][j] · B[i][j]", "La suma de la fila i"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función multiplicar(A, B) que devuelva el producto de dos matrices (listas de filas) compatibles.",
        starter: "def multiplicar(A, B):\n    # tu código acá\n    pass",
        tests: "assert multiplicar([[1,2],[0,1]], [[1,0],[3,1]]) == [[7,2],[3,1]], \"Fallo caso 1\"\nassert multiplicar([[1,0],[0,1]], [[5,6],[7,8]]) == [[5,6],[7,8]], \"Identidad\"\nprint(\"TESTS_OK\")",
      },
    },
    A05: {
      code: "A05",
      materia: "Álgebra Lineal",
      title: "Sistemas y eliminación de Gauss",
      fuente: "MIT 18.06SC — Elimination with Matrices | 3Blue1Brown cap. 3 (contexto)",
      theory: ["Resolver un sistema de ecuaciones es encontrar el vector x tal que A·x = b. La eliminación de Gauss lo logra restando múltiplos de una fila a las otras para dejar ceros debajo de la diagonal (forma triangular), y después despejando de abajo hacia arriba.", "Es el mismo método que aprendiste en el secundario para resolver dos ecuaciones con dos incógnitas, pero sistematizado para que una computadora lo haga con cientos de variables. Strang lo presenta como la operación de trabajo del álgebra lineal computacional."],
      example: "# Un paso de eliminación: dejar un 0 en A[1][0]\nA = [[2, 1],\n     [4, 3]]\nb = [5, 11]\nfactor = A[1][0] / A[0][0]        # 4/2 = 2\nA[1] = [A[1][j] - factor*A[0][j] for j in range(2)]\nb[1] = b[1] - factor*b[0]\nprint(\"A triangular:\", A)         # [[2,1],[0,1]]\nprint(\"b:\", b)                    # [5, 1]  ->  x2 = 1, luego x1 = 2",
      quiz: [{ q: "Resolver A·x = b significa encontrar:", opts: ["El determinante", "El vector x que cumple la ecuación", "La inversa de b", "Las columnas de A"], correct: 1 }, { q: "La eliminación de Gauss busca dejar la matriz en forma:", opts: ["Diagonal de unos", "Triangular (ceros debajo de la diagonal)", "Toda de ceros", "Simétrica"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función eliminar_paso(A, b, i, j) que reste a la fila i el múltiplo de la fila j necesario para dejar A[i][j] = 0, aplicando el mismo factor a b. Devolvé la tupla (A, b) modificada. Asumí A[j][j] != 0.",
        starter: "def eliminar_paso(A, b, i, j):\n    # tu código acá\n    pass",
        tests: "A = [[2,1],[4,3]]; b = [5,11]\nA2, b2 = eliminar_paso(A, b, 1, 0)\nassert A2[1] == [0, 1], \"Debe dejar 0 en A[1][0]\"\nassert b2[1] == 1, \"b actualizado\"\nprint(\"TESTS_OK\")",
      },
    },
    A06: {
      code: "A06",
      materia: "Álgebra Lineal",
      title: "La matriz inversa",
      fuente: "MIT 18.06SC — Multiplication and Inverse Matrices | 3Blue1Brown cap. 7 (inverse, column space)",
      theory: ["La inversa de A, escrita A⁻¹, es la matriz que deshace lo que A hace: A·A⁻¹ = I (la identidad). Si A transforma el espacio, A⁻¹ lo devuelve a como estaba. Con ella, resolver A·x = b es directo: x = A⁻¹·b.", "No toda matriz tiene inversa: 3Blue1Brown lo explica hermoso — si A aplasta el espacio a una dimensión menor (determinante 0), la información se pierde y no hay forma de deshacerla. Para una matriz 2×2 [[a,b],[c,d]], la inversa existe si ad − bc ≠ 0."],
      example: "# Inversa de una matriz 2x2 (si el determinante no es 0)\ndef inversa_2x2(A):\n    a, b = A[0]\n    c, d = A[1]\n    det = a*d - b*c\n    if det == 0:\n        return None\n    return [[ d/det, -b/det],\n            [-c/det,  a/det]]\n\nA = [[4, 7], [2, 6]]\nprint(\"A⁻¹ =\", inversa_2x2(A))",
      quiz: [{ q: "La inversa A⁻¹ cumple que:", opts: ["A + A⁻¹ = 0", "A · A⁻¹ = I (identidad)", "A⁻¹ = 2A", "A⁻¹ = Aᵀ siempre"], correct: 1 }, { q: "Una matriz 2×2 tiene inversa cuando:", opts: ["Sus filas son iguales", "Su determinante ad−bc ≠ 0", "Todos sus valores son positivos", "Es simétrica"], correct: 1 }],
      exercise: {
        prompt: "Escribí inversa_2x2(A) que devuelva la inversa de una matriz 2×2 [[a,b],[c,d]] como [[d/det,-b/det],[-c/det,a/det]] con det=ad−bc, o None si det es 0.",
        starter: "def inversa_2x2(A):\n    # tu código acá\n    pass",
        tests: "r = inversa_2x2([[4,7],[2,6]])\nassert r == [[0.6, -0.7], [-0.2, 0.4]], \"Inversa incorrecta\"\nassert inversa_2x2([[1,2],[2,4]]) is None, \"Determinante 0: sin inversa\"\nprint(\"TESTS_OK\")",
      },
    },
    A07: {
      code: "A07",
      materia: "Álgebra Lineal",
      title: "Espacio columna y espacio nulo",
      fuente: "MIT 18.06SC — Column Space and Nullspace | 3Blue1Brown cap. 7-8",
      theory: ["El espacio columna de A es el span de sus columnas: todos los b para los que A·x = b tiene solución. Si b no está en el espacio columna, el sistema no tiene solución — no hay combinación de las columnas que lo alcance.", "El espacio nulo es el conjunto de todos los x tales que A·x = 0. Siempre contiene al vector cero; si contiene algo más, significa que las columnas son dependientes. 3Blue1Brown lo llama el \"kernel\": lo que la transformación aplasta al origen."],
      example: "# ¿Está el vector cero en el espacio nulo? (siempre sí)\ndef matriz_por_vector(A, x):\n    return [sum(A[i][j]*x[j] for j in range(len(x))) for i in range(len(A))]\n\nA = [[1, 2], [2, 4]]   # columnas dependientes\nx_cero = [0, 0]\nprint(\"A·0 =\", matriz_por_vector(A, x_cero))\n# [1,-0.5] escalado: probamos un x no trivial del espacio nulo\nx = [2, -1]\nprint(\"A·[2,-1] =\", matriz_por_vector(A, x))  # [0,0]: x está en el espacio nulo",
      quiz: [{ q: "El espacio columna de A contiene:", opts: ["Todos los x posibles", "Todos los b para los que A·x=b tiene solución", "Solo el vector cero", "Las filas de A"], correct: 1 }, { q: "El espacio nulo de A es el conjunto de x tales que:", opts: ["A·x = b", "A·x = 0", "x = 0 únicamente", "A·x = x"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función esta_en_nulo(A, x) que devuelva True si A·x da el vector cero (es decir, x está en el espacio nulo de A).",
        starter: "def esta_en_nulo(A, x):\n    # tu código acá\n    pass",
        tests: "assert esta_en_nulo([[1,2],[2,4]], [2,-1]) == True, \"[2,-1] anula A\"\nassert esta_en_nulo([[1,2],[2,4]], [0,0]) == True, \"El cero siempre está\"\nassert esta_en_nulo([[1,2],[2,4]], [1,1]) == False, \"[1,1] no se anula\"\nprint(\"TESTS_OK\")",
      },
    },
    A08: {
      code: "A08",
      materia: "Álgebra Lineal",
      title: "Los cuatro subespacios fundamentales",
      fuente: "MIT 18.06SC — The Four Fundamental Subspaces | 3Blue1Brown cap. 8 (contexto)",
      theory: ["Toda matriz A define cuatro subespacios: el espacio columna y el espacio nulo (ya vistos), más el espacio fila (span de las filas) y el espacio nulo izquierdo. Es el \"teorema fundamental del álgebra lineal\" que Strang considera el corazón del curso.", "La relación clave, que resume toda la Unidad I: el rango r (cantidad de columnas independientes) determina las dimensiones de los cuatro. Para una matriz de n columnas, dim(espacio columna) = r y dim(espacio nulo) = n − r. Lo que no aporta dirección nueva, va al espacio nulo."],
      example: "# El rango = cantidad de columnas independientes (caso 2x2 simple)\ndef rango_2x2(A):\n    # si las dos columnas son dependientes, rango 1; si no, rango 2\n    a, b = A[0]\n    c, d = A[1]\n    return 2 if (a*d - b*c) != 0 else 1\n\nprint(\"Rango de [[1,2],[3,4]]:\", rango_2x2([[1,2],[3,4]]))  # 2\nprint(\"Rango de [[1,2],[2,4]]:\", rango_2x2([[1,2],[2,4]]))  # 1 (dependientes)",
      quiz: [{ q: "¿Cuántos subespacios fundamentales define toda matriz?", opts: ["2", "3", "4", "Depende del tamaño"], correct: 2 }, { q: "Para una matriz de n columnas y rango r, la dimensión del espacio nulo es:", opts: ["r", "n", "n − r", "n + r"], correct: 2 }],
      exercise: {
        prompt: "Para una matriz 2×2, el rango es 2 si el determinante ad−bc ≠ 0, y 1 si es 0 (asumiendo que no es la matriz nula). Escribí rango_2x2(A) que lo devuelva.",
        starter: "def rango_2x2(A):\n    # tu código acá\n    pass",
        tests: "assert rango_2x2([[1,2],[3,4]]) == 2, \"Independientes\"\nassert rango_2x2([[1,2],[2,4]]) == 1, \"Dependientes\"\nprint(\"TESTS_OK\")",
      },
    },
    A09: {
      code: "A09",
      materia: "Álgebra Lineal",
      title: "Producto interno, longitud y ortogonalidad",
      fuente: "MIT 18.06SC — Orthogonal Vectors and Subspaces | 3Blue1Brown cap. 9",
      theory: ["El producto interno (o producto punto) de dos vectores es la suma de sus productos componente a componente: [a,b]·[c,d] = a·c + b·d. Da un número, y ese número mide cuánto \"apuntan en la misma dirección\" dos vectores.", "Dos vectores son ortogonales (perpendiculares) si su producto interno es 0. Y la longitud de un vector es la raíz de su producto interno consigo mismo: |v| = √(v·v), que es Pitágoras en n dimensiones. 3Blue1Brown conecta el producto punto con la proyección — la base de la próxima lección."],
      example: "# Producto punto, longitud y test de ortogonalidad\nimport math\n\ndef punto(v, w):\n    return sum(a*b for a, b in zip(v, w))\n\ndef longitud(v):\n    return math.sqrt(punto(v, v))\n\nprint(\"[1,2]·[3,4] =\", punto([1,2], [3,4]))       # 11\nprint(\"|[3,4]| =\", longitud([3,4]))               # 5.0\nprint(\"¿[1,0]⊥[0,1]?:\", punto([1,0], [0,1]) == 0)  # True",
      quiz: [{ q: "El producto interno de [2,3] y [4,1] es:", opts: ["11", "8", "14", "5"], correct: 0 }, { q: "Dos vectores son ortogonales cuando su producto interno es:", opts: ["1", "0", "Negativo", "Su longitud"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función son_ortogonales(v, w) que devuelva True si el producto interno de v y w (vectores de igual longitud) es 0.",
        starter: "def son_ortogonales(v, w):\n    # tu código acá\n    pass",
        tests: "assert son_ortogonales([1,0], [0,1]) == True, \"Ejes perpendiculares\"\nassert son_ortogonales([1,2], [2,-1]) == True, \"1*2 + 2*(-1) = 0\"\nassert son_ortogonales([1,1], [1,1]) == False, \"Producto = 2\"\nprint(\"TESTS_OK\")",
      },
    },
    A10: {
      code: "A10",
      materia: "Álgebra Lineal",
      title: "Proyecciones",
      fuente: "MIT 18.06SC — Projections onto Subspaces | 3Blue1Brown cap. 9",
      theory: ["Proyectar un vector b sobre otro vector a es encontrar la \"sombra\" de b en la dirección de a: el punto de la recta de a más cercano a b. La fórmula sale del producto interno: la proyección es (a·b / a·a) · a.", "¿Por qué importa? Porque cuando un sistema A·x = b NO tiene solución (b no está en el espacio columna), lo mejor que podés hacer es proyectar b sobre el espacio columna y resolver eso. Esa es la idea de mínimos cuadrados de la próxima lección — el motor del ajuste de datos en estadística y ML."],
      example: "# Proyección de b sobre la dirección de a\ndef punto(v, w):\n    return sum(x*y for x, y in zip(v, w))\n\ndef proyeccion(a, b):\n    escala = punto(a, b) / punto(a, a)\n    return [escala * ai for ai in a]\n\nprint(\"Proyección de [1,1] sobre [2,0]:\", proyeccion([2,0], [1,1]))  # [1.0, 0.0]",
      quiz: [{ q: "La proyección de b sobre a es:", opts: ["a + b", "(a·b / a·a) · a", "El producto punto a·b", "b − a"], correct: 1 }, { q: "¿Para qué sirve proyectar cuando A·x=b no tiene solución?", opts: ["Para nada", "Para encontrar la mejor solución aproximada (mínimos cuadrados)", "Para invertir A", "Para calcular el determinante"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función proyeccion(a, b) que devuelva la proyección del vector b sobre la dirección del vector a, usando (a·b / a·a)·a.",
        starter: "def proyeccion(a, b):\n    # tu código acá\n    pass",
        tests: "assert proyeccion([2,0], [1,1]) == [1.0, 0.0], \"Sombra sobre el eje x\"\nassert proyeccion([1,1], [2,0]) == [1.0, 1.0], \"Sombra sobre la diagonal\"\nprint(\"TESTS_OK\")",
      },
    },
    A11: {
      code: "A11",
      materia: "Álgebra Lineal",
      title: "Mínimos cuadrados",
      fuente: "MIT 18.06SC — Projection Matrices and Least Squares | PS Unidad II",
      theory: ["Cuando tenés más ecuaciones que incógnitas (más datos que parámetros), casi nunca hay una recta que pase por todos los puntos. Mínimos cuadrados encuentra la recta que MINIMIZA la suma de los errores al cuadrado — la \"mejor\" en el sentido de la menor distancia total.", "Es la técnica detrás de la regresión lineal que vas a ver en ML: ajustar una tendencia a datos ruidosos. La conexión con álgebra lineal es directa — minimizar el error al cuadrado es proyectar el vector de datos sobre el espacio columna, exactamente lo de la lección anterior."],
      example: "# Ajuste de una recta y = m·x + c por mínimos cuadrados (fórmula cerrada 1D)\ndef ajuste_recta(xs, ys):\n    n = len(xs)\n    sx, sy = sum(xs), sum(ys)\n    sxx = sum(x*x for x in xs)\n    sxy = sum(x*y for x, y in zip(xs, ys))\n    m = (n*sxy - sx*sy) / (n*sxx - sx*sx)\n    c = (sy - m*sx) / n\n    return m, c\n\n# Ventas que crecen con ruido\nm, c = ajuste_recta([1,2,3,4], [2,4,5,8])\nprint(f\"Mejor recta: y = {m:.2f}x + {c:.2f}\")",
      quiz: [{ q: "Mínimos cuadrados encuentra la recta que minimiza:", opts: ["La cantidad de puntos", "La suma de los errores al cuadrado", "La pendiente", "El determinante"], correct: 1 }, { q: "Mínimos cuadrados es la base de qué técnica de ML:", opts: ["Clustering", "Regresión lineal", "Árboles de decisión", "Redes neuronales"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función pendiente_minimos_cuadrados(xs, ys) que devuelva la pendiente m = (n·Σxy − Σx·Σy)/(n·Σx² − (Σx)²) del ajuste por mínimos cuadrados, redondeada a 4 decimales.",
        starter: "def pendiente_minimos_cuadrados(xs, ys):\n    # tu código acá\n    pass",
        tests: "assert pendiente_minimos_cuadrados([1,2,3,4], [2,4,6,8]) == 2.0, \"Recta perfecta y=2x\"\nassert pendiente_minimos_cuadrados([0,1,2], [1,2,3]) == 1.0, \"Pendiente 1\"\nprint(\"TESTS_OK\")",
      },
    },
    A12: {
      code: "A12",
      materia: "Álgebra Lineal",
      title: "El determinante",
      fuente: "MIT 18.06SC — Properties of Determinants + Determinant Formulas and Cofactors | 3Blue1Brown cap. 6",
      theory: ["El determinante de una matriz es un número que mide cuánto la transformación estira o encoge el área (en 2D) o el volumen (en 3D). 3Blue1Brown lo hace inolvidable: si det = 2, las áreas se duplican; si det = 0, todo se aplasta a una dimensión menor (y por eso no hay inversa).", "Para una matriz 2×2 [[a,b],[c,d]], el determinante es ad − bc. El signo indica si la transformación invierte la orientación (como un espejo). Es la misma cuenta que ya usaste para detectar dependencia lineal y para invertir: todo está conectado."],
      example: "# El determinante como factor de escala de área\ndef det_2x2(A):\n    return A[0][0]*A[1][1] - A[0][1]*A[1][0]\n\nprint(\"det[[3,0],[0,2]] =\", det_2x2([[3,0],[0,2]]))  # 6: área x6\nprint(\"det[[1,2],[2,4]] =\", det_2x2([[1,2],[2,4]]))  # 0: aplasta el espacio",
      quiz: [{ q: "El determinante mide:", opts: ["La suma de la diagonal", "Cuánto la transformación estira el área/volumen", "La longitud del vector", "El rango"], correct: 1 }, { q: "Si el determinante es 0, la matriz:", opts: ["Es la identidad", "No tiene inversa (aplasta el espacio)", "Es simétrica", "Tiene rango máximo"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función det_2x2(A) que devuelva el determinante ad−bc de una matriz 2×2 [[a,b],[c,d]].",
        starter: "def det_2x2(A):\n    # tu código acá\n    pass",
        tests: "assert det_2x2([[3,0],[0,2]]) == 6, \"Escala de área 6\"\nassert det_2x2([[1,2],[2,4]]) == 0, \"Singular\"\nassert det_2x2([[1,0],[0,1]]) == 1, \"Identidad no cambia área\"\nprint(\"TESTS_OK\")",
      },
    },
    A13: {
      code: "A13",
      materia: "Álgebra Lineal",
      title: "Autovalores y autovectores",
      fuente: "MIT 18.06SC — Eigenvalues and Eigenvectors | 3Blue1Brown cap. 14",
      theory: ["Un autovector de A es un vector especial que, al aplicarle la transformación A, NO cambia de dirección — solo se estira o encoge. Cuánto se estira es el autovalor λ. En fórmula: A·v = λ·v. 3Blue1Brown los muestra como los \"ejes\" que la transformación deja quietos.", "Son la herramienta más importante de la materia para IA: revelan la estructura profunda de una transformación. En una matriz de Markov modelan el estado de equilibrio; en PCA (que verás en ML) los autovectores de la matriz de covarianza son las direcciones de máxima variación de los datos."],
      example: "# Verificar que v es autovector de A con autovalor lambda\ndef matriz_por_vector(A, x):\n    return [sum(A[i][j]*x[j] for j in range(len(x))) for i in range(len(A))]\n\nA = [[2, 0], [0, 3]]   # diagonal: autovectores son los ejes\nv = [1, 0]             # eje x\nAv = matriz_por_vector(A, v)\nprint(\"A·[1,0] =\", Av, \"= 2·[1,0] -> autovalor 2\")",
      quiz: [{ q: "Un autovector de A cumple que A·v es:", opts: ["El vector cero", "λ·v (mismo vector, escalado)", "Perpendicular a v", "La identidad"], correct: 1 }, { q: "En PCA (ML), los autovectores dan:", opts: ["El promedio de los datos", "Las direcciones de máxima variación de los datos", "El error del modelo", "La cantidad de datos"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función es_autovector(A, v, lam) que devuelva True si A·v == lam·v (es decir, v es autovector de A con autovalor lam). Trabajá con enteros para comparación exacta.",
        starter: "def es_autovector(A, v, lam):\n    # tu código acá\n    pass",
        tests: "assert es_autovector([[2,0],[0,3]], [1,0], 2) == True, \"eje x, autovalor 2\"\nassert es_autovector([[2,0],[0,3]], [0,1], 3) == True, \"eje y, autovalor 3\"\nassert es_autovector([[2,0],[0,3]], [1,1], 2) == False, \"[1,1] no es autovector\"\nprint(\"TESTS_OK\")",
      },
    },
    A14: {
      code: "A14",
      materia: "Álgebra Lineal",
      title: "Diagonalización",
      fuente: "MIT 18.06SC — Diagonalization and Powers of A | 3Blue1Brown cap. 14",
      theory: ["Diagonalizar A es escribirla como A = S·Λ·S⁻¹, donde Λ es una matriz diagonal con los autovalores y S tiene los autovectores como columnas. Es cambiar a las \"coordenadas naturales\" de la transformación, donde todo se vuelve un simple estiramiento por eje.", "El pago enorme: elevar A a una potencia grande se vuelve trivial, porque Aⁿ = S·Λⁿ·S⁻¹ y elevar una diagonal es solo elevar cada autovalor. Así se calcula el estado a largo plazo de un proceso (una cadena de Markov de stock entre sucursales, por ejemplo) sin multiplicar la matriz mil veces."],
      example: "# Elevar una matriz diagonal es elevar cada elemento (la clave de diagonalizar)\ndef potencia_diagonal(diag, n):\n    return [d**n for d in diag]\n\nautovalores = [2, 3]\nprint(\"Λ^5 (diagonal):\", potencia_diagonal(autovalores, 5))  # [32, 243]",
      quiz: [{ q: "Diagonalizar A significa escribirla como:", opts: ["A = S + Λ", "A = S·Λ·S⁻¹ (autovectores y autovalores)", "A = Aᵀ", "A = 2A"], correct: 1 }, { q: "¿Por qué diagonalizar facilita calcular Aⁿ?", opts: ["Porque elevar una matriz diagonal es elevar cada autovalor", "Porque A se vuelve la identidad", "Porque n desaparece", "No lo facilita"], correct: 0 }],
      exercise: {
        prompt: "Escribí una función potencia_diagonal(diag, n) que reciba una lista con los elementos de la diagonal y devuelva la lista con cada elemento elevado a la n.",
        starter: "def potencia_diagonal(diag, n):\n    # tu código acá\n    pass",
        tests: "assert potencia_diagonal([2,3], 5) == [32, 243], \"2^5 y 3^5\"\nassert potencia_diagonal([1,0], 10) == [1, 0], \"1 y 0 a cualquier potencia\"\nprint(\"TESTS_OK\")",
      },
    },
    A15: {
      code: "A15",
      materia: "Álgebra Lineal",
      title: "Matrices simétricas y definidas positivas",
      fuente: "MIT 18.06SC — Symmetric Matrices and Positive Definiteness | 3Blue1Brown cap. 14 (contexto)",
      theory: ["Una matriz es simétrica si es igual a su transpuesta (A = Aᵀ): el valor en (i,j) es igual al de (j,i). Estas matrices son las mejores del álgebra lineal: sus autovalores son siempre reales y sus autovectores siempre ortogonales.", "Una matriz simétrica es definida positiva si todos sus autovalores son positivos — geométricamente, actúa siempre \"hacia afuera\", sin invertir ninguna dirección. Aparecen en todos lados en ML: las matrices de covarianza (base de PCA) son simétricas y semidefinidas positivas por construcción."],
      example: "# Verificar si una matriz es simétrica (A == A transpuesta)\ndef es_simetrica(A):\n    n = len(A)\n    return all(A[i][j] == A[j][i] for i in range(n) for j in range(n))\n\nprint(\"[[2,1],[1,3]] simétrica:\", es_simetrica([[2,1],[1,3]]))  # True\nprint(\"[[2,1],[0,3]] simétrica:\", es_simetrica([[2,1],[0,3]]))  # False",
      quiz: [{ q: "Una matriz es simétrica si:", opts: ["Todos sus valores son iguales", "A = Aᵀ (igual a su transpuesta)", "Su determinante es 1", "Es diagonal"], correct: 1 }, { q: "Las matrices de covarianza en ML (base de PCA) son:", opts: ["Siempre la identidad", "Simétricas y (semi)definidas positivas", "Antisimétricas", "Sin autovalores"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función es_simetrica(A) que devuelva True si la matriz cuadrada A es igual a su transpuesta (A[i][j] == A[j][i] para todo i, j).",
        starter: "def es_simetrica(A):\n    # tu código acá\n    pass",
        tests: "assert es_simetrica([[2,1],[1,3]]) == True, \"Simétrica\"\nassert es_simetrica([[2,1],[0,3]]) == False, \"No simétrica\"\nassert es_simetrica([[5]]) == True, \"1x1 siempre simétrica\"\nprint(\"TESTS_OK\")",
      },
    },
    A16: {
      code: "A16",
      materia: "Álgebra Lineal",
      title: "SVD: descomposición en valores singulares",
      fuente: "MIT 18.06SC — Singular Value Decomposition | 3Blue1Brown cap. 15-16 (contexto)",
      theory: ["La SVD escribe CUALQUIER matriz como A = U·Σ·Vᵀ: una rotación (Vᵀ), un estiramiento por ejes (Σ, diagonal con los valores singulares), y otra rotación (U). Es la generalización de los autovalores a matrices que no son cuadradas, y Strang la considera la culminación del curso.", "Es la herramienta más poderosa de la materia para IA: los valores singulares dicen cuánta \"información\" aporta cada dirección. Quedarte con los más grandes y descartar los chicos comprime datos perdiendo lo mínimo — es la base de la compresión de imágenes, los sistemas de recomendación y la reducción de dimensionalidad (PCA) que verás en ML."],
      example: "# Los valores singulares ordenados dicen qué direcciones conservar\n# (simulamos: en la práctica salen de la SVD; acá mostramos la idea de truncar)\nvalores_singulares = [9.5, 4.2, 0.8, 0.1]\ntotal = sum(valores_singulares)\nacumulado = 0\nfor i, s in enumerate(valores_singulares):\n    acumulado += s\n    print(f\"Con {i+1} componentes: {acumulado/total:.1%} de la información\")",
      quiz: [{ q: "La SVD descompone una matriz A como:", opts: ["A = S·Λ·S⁻¹", "A = U·Σ·Vᵀ (rotación, estiramiento, rotación)", "A = A·Aᵀ", "A = I"], correct: 1 }, { q: "¿Para qué sirve quedarse con los valores singulares más grandes?", opts: ["Para invertir A", "Para comprimir datos perdiendo lo mínimo (base de PCA)", "Para hacer A simétrica", "Para nada"], correct: 1 }],
      exercise: {
        prompt: "Los valores singulares miden información por dirección. Escribí una función energia_acumulada(valores, k) que devuelva qué fracción del total representan los primeros k valores singulares (suma de los primeros k sobre suma total), redondeada a 4 decimales.",
        starter: "def energia_acumulada(valores, k):\n    # tu código acá\n    pass",
        tests: "assert energia_acumulada([9.5, 4.2, 0.8, 0.1], 2) == 0.9384, \"Primeros 2 de 4\"\nassert energia_acumulada([5, 5], 1) == 0.5, \"Mitad\"\nassert energia_acumulada([1, 2, 3], 3) == 1.0, \"Todos\"\nprint(\"TESTS_OK\")",
      },
    },
    A17: {
      code: "A17",
      materia: "Álgebra Lineal",
      title: "Proyecto integrador",
      fuente: "MIT 18.06SC — Problem sets y exámenes de las 3 unidades (nivel de exigencia)",
      theory: ["Este integrador junta las piezas centrales de la materia sin librerías: operar con vectores y matrices, y aplicar el producto interno. Es el nivel de un examen de 18.06SC, resoluble a mano o en código.", "El caso combina lo visto: representar datos como vectores, multiplicar por una matriz de transformación, y medir con producto interno — el flujo exacto que hace una capa de una red neuronal (multiplicar por pesos) o una proyección de datos en PCA."],
      example: "# Las piezas del integrador: matriz·vector + producto interno\ndef matriz_por_vector(A, x):\n    return [sum(A[i][j]*x[j] for j in range(len(x))) for i in range(len(A))]\n\ndef punto(v, w):\n    return sum(a*b for a, b in zip(v, w))\n\nA = [[1, 0], [0, 2]]\nx = [3, 4]\ny = matriz_por_vector(A, x)\nprint(\"A·x =\", y, \"| |A·x|² =\", punto(y, y))",
      quiz: [{ q: "El flujo 'multiplicar por una matriz de pesos' es la operación central de:", opts: ["Un árbol de decisión", "Una capa de una red neuronal", "Una base de datos", "Un grafo"], correct: 1 }],
      exercise: {
        prompt: "Escribí una función transformar_y_medir(A, x) que: (1) calcule y = A·x (matriz por vector), y (2) devuelva el producto interno de y consigo mismo (y·y, es decir la longitud al cuadrado del resultado). Todo sin librerías.",
        starter: "def transformar_y_medir(A, x):\n    # tu código acá\n    pass",
        tests: "assert transformar_y_medir([[1,0],[0,2]], [3,4]) == 73, \"y=[3,8], 9+64=73\"\nassert transformar_y_medir([[1,0],[0,1]], [3,4]) == 25, \"Identidad: 9+16=25\"\nassert transformar_y_medir([[0,0],[0,0]], [5,5]) == 0, \"Matriz nula\"\nprint(\"TESTS_OK\")",
      },
    },
  },
  PRG2: {
    P01: {
      code: "P01",
      materia: "Estructuras de Datos",
      title: "Análisis de costo y notación O",
      fuente: "Princeton Algorithms Part I — Week 1: Analysis of Algorithms | Libro §1.4",
      theory: ["Antes de elegir una estructura hay que saber medir su costo. La notación O describe cómo crece el tiempo (o la memoria) de un algoritmo cuando la entrada n se agranda, ignorando constantes: recorrer una lista es O(n), y dos loops anidados son O(n²). Ya viste esto en MDIS M15; acá se vuelve la herramienta de trabajo diaria.", "El método de Sedgewick es científico: medís tiempos reales, formulás una hipótesis (\"esto es O(n²)\") y la verificás. La clave práctica: cuando n se duplica, un algoritmo O(n) tarda el doble, uno O(n²) tarda 4 veces más, y uno O(2ⁿ) se vuelve inusable. Elegir bien la estructura es elegir bien el exponente."],
      example: "# Contar operaciones: lineal O(n) vs cuadrático O(n²)\ndef operaciones_lineales(n):\n    ops = 0\n    for i in range(n):\n        ops += 1\n    return ops\n\ndef operaciones_cuadraticas(n):\n    ops = 0\n    for i in range(n):\n        for j in range(n):\n            ops += 1\n    return ops\n\nfor n in [10, 100]:\n    print(f\"n={n}: lineal={operaciones_lineales(n)}, cuadrático={operaciones_cuadraticas(n)}\")",
      quiz: [{ q: "Si un algoritmo es O(n²) y n se duplica, el tiempo se multiplica por:", opts: ["2", "4", "8", "No cambia"], correct: 1 }, { q: "Recorrer una lista de n elementos una sola vez es:", opts: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correct: 1 }],
      exercise: {
        prompt: "Un algoritmo con dos loops anidados sobre n elementos hace n² operaciones. Escribí costo_cuadratico(n) que devuelva exactamente cuántas operaciones hace (n²), contándolas con loops reales (no uses n**2 directo).",
        starter: "def costo_cuadratico(n):\n    # tu código acá (contá con dos loops anidados)\n    pass",
        tests: "assert costo_cuadratico(3) == 9, \"3x3\"\nassert costo_cuadratico(10) == 100, \"10x10\"\nassert costo_cuadratico(0) == 0, \"Sin elementos\"\nprint(\"TESTS_OK\")",
      },
    },
    P02: {
      code: "P02",
      materia: "Estructuras de Datos",
      title: "Union-Find: conectividad dinámica",
      fuente: "Princeton Algorithms Part I — Week 1: Union-Find | Libro §1.5",
      theory: ["Union-Find resuelve la pregunta \"¿están estos dos elementos conectados?\" cuando las conexiones se van agregando de a una. Es el primer algoritmo del curso de Sedgewick, y modela cosas como: ¿estas dos sucursales están en la misma red de reparto?, ¿estos dos puntos de una grilla están conectados por agua? (el problema de percolación).", "La idea base (quick-find): cada elemento tiene un identificador de grupo. Están conectados si comparten identificador. Unir dos grupos es reasignar todos los del grupo de uno al del otro. Sedgewick muestra cómo las versiones mejoradas (quick-union, con pesos y compresión de caminos) bajan drásticamente el costo — el corazón de la Semana 1."],
      example: "# Quick-find: id[i] es el grupo del elemento i\nids = list(range(5))  # 5 elementos, cada uno en su propio grupo: [0,1,2,3,4]\n\ndef conectados(ids, p, q):\n    return ids[p] == ids[q]\n\ndef unir(ids, p, q):\n    grupo_p = ids[p]\n    grupo_q = ids[q]\n    for i in range(len(ids)):\n        if ids[i] == grupo_p:\n            ids[i] = grupo_q\n\nprint(\"¿0 y 2 conectados?:\", conectados(ids, 0, 2))  # False\nunir(ids, 0, 2)\nprint(\"Tras unir(0,2):\", conectados(ids, 0, 2))       # True",
      quiz: [{ q: "¿Qué pregunta resuelve Union-Find?", opts: ["Ordenar elementos", "Si dos elementos están conectados", "Buscar el máximo", "Contar duplicados"], correct: 1 }, { q: "En quick-find, dos elementos están conectados si:", opts: ["Son iguales", "Comparten el mismo identificador de grupo", "Son vecinos en la lista", "Su suma es par"], correct: 1 }],
      exercise: {
        prompt: "Implementá quick-find. Escribí unir(ids, p, q) que reciba la lista de identificadores y conecte p con q reasignando todos los del grupo de p al grupo de q. Devolvé la lista modificada.",
        starter: "def unir(ids, p, q):\n    # tu código acá\n    pass",
        tests: "ids = [0, 1, 2, 3, 4]\nids = unir(ids, 0, 2)\nassert ids[0] == ids[2], \"0 y 2 deben quedar conectados\"\nids = unir(ids, 2, 4)\nassert ids[0] == ids[4], \"Transitividad: 0 conectado con 4\"\nprint(\"TESTS_OK\")",
      },
    },
    P03: {
      code: "P03",
      materia: "Estructuras de Datos",
      title: "Pilas (stacks)",
      fuente: "Princeton Algorithms Part I — Week 2: Stacks and Queues | Libro §1.3",
      theory: ["Una pila es una colección LIFO: \"último en entrar, primero en salir\", como una pila de platos. Solo dos operaciones: push (apilar arriba) y pop (sacar el de arriba). Sedgewick la presenta como una de las dos estructuras fundamentales para guardar colecciones.", "¿Dónde aparece? En el \"deshacer\" de cualquier programa (Ctrl+Z saca la última acción), en la evaluación de expresiones, y en el recorrido de estructuras. En Python una lista con append (push) y pop() ya se comporta como pila — pero el punto es entender la mecánica LIFO, no solo usarla."],
      example: "# Pila con lista: append = push, pop = sacar el último\npila = []\npila.append(\"abrir caja\")     # push\npila.append(\"contar stock\")   # push\npila.append(\"cerrar caja\")    # push\nprint(\"Último en entrar:\", pila[-1])\nprint(\"Sale:\", pila.pop())    # \"cerrar caja\" (LIFO)\nprint(\"Ahora arriba:\", pila[-1])",
      quiz: [{ q: "Una pila (stack) sigue el orden:", opts: ["Primero en entrar, primero en salir", "Último en entrar, primero en salir (LIFO)", "Por prioridad", "Aleatorio"], correct: 1 }, { q: "El 'deshacer' (Ctrl+Z) de un programa se modela naturalmente con:", opts: ["Una cola", "Una pila", "Un árbol", "Una tabla hash"], correct: 1 }],
      exercise: {
        prompt: "Implementá la operación pop de una pila. Escribí pop(pila) que quite y devuelva el último elemento de la lista pila (el de arriba). Si la pila está vacía, devolvé None.",
        starter: "def pop(pila):\n    # tu código acá\n    pass",
        tests: "p = [\"a\", \"b\", \"c\"]\nassert pop(p) == \"c\", \"Sale el último (LIFO)\"\nassert p == [\"a\", \"b\"], \"La pila queda sin el último\"\nassert pop([]) is None, \"Pila vacía devuelve None\"\nprint(\"TESTS_OK\")",
      },
    },
    P04: {
      code: "P04",
      materia: "Estructuras de Datos",
      title: "Colas (queues)",
      fuente: "Princeton Algorithms Part I — Week 2: Stacks and Queues | Libro §1.3",
      theory: ["Una cola es una colección FIFO: \"primero en entrar, primero en salir\", como la fila del banco. Dos operaciones: enqueue (agregar al fondo) y dequeue (sacar del frente). Es la otra estructura fundamental de la Semana 2 de Sedgewick, opuesta a la pila.", "¿Dónde aparece? En cualquier cosa que se procese \"por orden de llegada\": pedidos en un local, tareas en una impresora, mensajes en un sistema. También es el motor del recorrido BFS de grafos que viste asomar en MDIS M13. La diferencia con la pila es solo de qué punta sacás."],
      example: "# Cola con lista: append al fondo, pop(0) del frente\ncola = []\ncola.append(\"pedido 1\")   # enqueue\ncola.append(\"pedido 2\")   # enqueue\ncola.append(\"pedido 3\")   # enqueue\nprint(\"Se atiende primero:\", cola[0])\nprint(\"Sale:\", cola.pop(0))  # \"pedido 1\" (FIFO)\nprint(\"Ahora al frente:\", cola[0])",
      quiz: [{ q: "Una cola (queue) sigue el orden:", opts: ["Último en entrar, primero en salir", "Primero en entrar, primero en salir (FIFO)", "Por prioridad", "Aleatorio"], correct: 1 }, { q: "La diferencia esencial entre pila y cola es:", opts: ["El tamaño máximo", "De qué extremo se saca el elemento", "El tipo de dato que guardan", "La velocidad"], correct: 1 }],
      exercise: {
        prompt: "Implementá la operación dequeue de una cola. Escribí dequeue(cola) que quite y devuelva el PRIMER elemento de la lista cola (el del frente, FIFO). Si está vacía, devolvé None.",
        starter: "def dequeue(cola):\n    # tu código acá\n    pass",
        tests: "c = [\"p1\", \"p2\", \"p3\"]\nassert dequeue(c) == \"p1\", \"Sale el primero (FIFO)\"\nassert c == [\"p2\", \"p3\"], \"La cola queda sin el primero\"\nassert dequeue([]) is None, \"Cola vacía devuelve None\"\nprint(\"TESTS_OK\")",
      },
    },
    P05: {
      code: "P05",
      materia: "Estructuras de Datos",
      title: "Listas enlazadas",
      fuente: "Princeton Algorithms Part I — Week 2: Stacks and Queues (implementación) | Libro §1.3",
      theory: ["Una lista enlazada guarda cada elemento en un \"nodo\" que apunta al siguiente, en vez de tenerlos contiguos como un array. Sedgewick la usa para implementar pilas y colas sin límite de tamaño fijo. La ventaja: insertar al principio es O(1) siempre. La desventaja: para llegar al elemento k hay que recorrer desde el inicio, O(n).", "En Python se modela con un dict o clase por nodo: {valor, siguiente}. No es que reemplace a la lista de Python (que es un array dinámico), sino que enseña el trade-off central de las estructuras: acceso rápido por posición (array) vs. inserción rápida en los extremos (lista enlazada)."],
      example: "# Lista enlazada con nodos {valor, sig}. Recorrerla siguiendo los punteros.\nnodo3 = {\"valor\": \"c\", \"sig\": None}\nnodo2 = {\"valor\": \"b\", \"sig\": nodo3}\nnodo1 = {\"valor\": \"a\", \"sig\": nodo2}  # cabeza\n\nactual = nodo1\nwhile actual is not None:\n    print(actual[\"valor\"])\n    actual = actual[\"sig\"]",
      quiz: [{ q: "En una lista enlazada, cada nodo guarda:", opts: ["Solo su valor", "Su valor y una referencia al siguiente nodo", "Todos los valores", "Un índice numérico"], correct: 1 }, { q: "Insertar al principio de una lista enlazada cuesta:", opts: ["O(n)", "O(1)", "O(n²)", "O(log n)"], correct: 1 }],
      exercise: {
        prompt: "Escribí longitud(cabeza) que recorra una lista enlazada de nodos {valor, sig} desde la cabeza y devuelva cuántos nodos tiene. Una cabeza None significa lista vacía (longitud 0).",
        starter: "def longitud(cabeza):\n    # tu código acá\n    pass",
        tests: "n3 = {\"valor\": \"c\", \"sig\": None}\nn2 = {\"valor\": \"b\", \"sig\": n3}\nn1 = {\"valor\": \"a\", \"sig\": n2}\nassert longitud(n1) == 3, \"3 nodos\"\nassert longitud(n3) == 1, \"1 nodo\"\nassert longitud(None) == 0, \"Lista vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P06: {
      code: "P06",
      materia: "Estructuras de Datos",
      title: "Ordenamientos elementales",
      fuente: "Princeton Algorithms Part I — Week 2: Elementary Sorts | Libro §2.1",
      theory: ["Los primeros ordenamientos de Sedgewick son selection sort e insertion sort, ambos O(n²). Selection sort busca el mínimo y lo pone al principio, repitiendo con el resto. Insertion sort va tomando cada elemento y lo inserta en su lugar entre los ya ordenados, como cuando ordenás cartas en la mano.", "Son \"lentos\" (O(n²)) pero valen oro pedagógicamente: enseñan el patrón de comparar-e-intercambiar y sirven de baseline. Insertion sort además es rapidísimo cuando la lista ya está casi ordenada — un detalle que Sedgewick aprovecha en los algoritmos avanzados. Los rápidos (O(n log n)) vienen en las próximas lecciones."],
      example: "# Selection sort: buscar el mínimo y ponerlo adelante, repetir\ndef selection_sort(a):\n    a = a[:]  # copia para no mutar el original\n    for i in range(len(a)):\n        min_idx = i\n        for j in range(i + 1, len(a)):\n            if a[j] < a[min_idx]:\n                min_idx = j\n        a[i], a[min_idx] = a[min_idx], a[i]\n    return a\n\nprint(selection_sort([40, 12, 8, 25, 3]))",
      quiz: [{ q: "Selection sort e insertion sort tienen costo:", opts: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correct: 2 }, { q: "¿Qué hace selection sort en cada paso?", opts: ["Divide la lista al medio", "Busca el mínimo del resto y lo pone en su lugar", "Compara con un pivote", "Usa una tabla hash"], correct: 1 }],
      exercise: {
        prompt: "Implementá selection sort. Escribí selection_sort(a) que devuelva una NUEVA lista con los elementos de a ordenados de menor a mayor, usando el método de buscar el mínimo (no uses sorted() ni .sort()).",
        starter: "def selection_sort(a):\n    # tu código acá\n    pass",
        tests: "assert selection_sort([3, 1, 2]) == [1, 2, 3], \"Orden básico\"\nassert selection_sort([40, 12, 8, 25, 3]) == [3, 8, 12, 25, 40], \"Caso 5 elementos\"\nassert selection_sort([]) == [], \"Lista vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P07: {
      code: "P07",
      materia: "Estructuras de Datos",
      title: "Mergesort",
      fuente: "Princeton Algorithms Part I — Week 3: Mergesort | Libro §2.2",
      theory: ["Mergesort es el primer ordenamiento rápido de Sedgewick: O(n log n). Usa divide y vencerás (la recurrencia que viste en MDIS M16): parte la lista al medio, ordena cada mitad recursivamente, y después MEZCLA (merge) las dos mitades ordenadas en una sola. La magia está en el merge: fusionar dos listas ya ordenadas es O(n).", "El costo O(n log n) sale de la recurrencia T(n) = 2·T(n/2) + n: hay log n niveles de división y cada nivel cuesta n en mezclar. Es la garantía de mergesort: SIEMPRE O(n log n), sin importar cómo venga la entrada. Su desventaja es que necesita memoria extra para la mezcla."],
      example: "# El corazón de mergesort: mezclar dos listas ya ordenadas\ndef merge(izq, der):\n    resultado = []\n    i = j = 0\n    while i < len(izq) and j < len(der):\n        if izq[i] <= der[j]:\n            resultado.append(izq[i]); i += 1\n        else:\n            resultado.append(der[j]); j += 1\n    resultado.extend(izq[i:])\n    resultado.extend(der[j:])\n    return resultado\n\nprint(merge([1, 4, 8], [2, 3, 9]))  # [1, 2, 3, 4, 8, 9]",
      quiz: [{ q: "Mergesort tiene costo:", opts: ["O(n²)", "O(n log n) siempre", "O(n)", "O(2ⁿ)"], correct: 1 }, { q: "El paso 'merge' de mergesort:", opts: ["Divide la lista", "Fusiona dos listas ya ordenadas en O(n)", "Busca el mínimo", "Usa un pivote"], correct: 1 }],
      exercise: {
        prompt: "Implementá el paso merge. Escribí merge(izq, der) que reciba dos listas YA ordenadas y devuelva una sola lista ordenada con todos sus elementos, recorriéndolas en paralelo (no uses sorted()).",
        starter: "def merge(izq, der):\n    # tu código acá\n    pass",
        tests: "assert merge([1,4,8], [2,3,9]) == [1,2,3,4,8,9], \"Mezcla intercalada\"\nassert merge([], [1,2]) == [1,2], \"Una vacía\"\nassert merge([5], [1]) == [1,5], \"Un elemento cada una\"\nprint(\"TESTS_OK\")",
      },
    },
    P08: {
      code: "P08",
      materia: "Estructuras de Datos",
      title: "Quicksort",
      fuente: "Princeton Algorithms Part I — Week 3: Quicksort | Libro §2.3",
      theory: ["Quicksort es el otro gran ordenamiento de la Semana 3, y el más usado en la práctica. Elige un pivote, particiona la lista en \"menores que el pivote\" y \"mayores que el pivote\", y ordena cada parte recursivamente. En promedio es O(n log n) y usa poca memoria extra — por eso es el default de muchas librerías.", "El detalle que Sedgewick remarca: su peor caso es O(n²) (si el pivote siempre resulta el peor posible), pero elegir el pivote al azar lo vuelve improbable. La diferencia con mergesort: quicksort particiona ANTES de recursión (el trabajo está en dividir bien), mergesort mezcla DESPUÉS (el trabajo está en combinar)."],
      example: "# Partición: separar en menores y mayores que el pivote\ndef particionar(a, pivote):\n    menores = [x for x in a if x < pivote]\n    iguales = [x for x in a if x == pivote]\n    mayores = [x for x in a if x > pivote]\n    return menores, iguales, mayores\n\nmen, ig, may = particionar([40, 12, 8, 25, 3], 12)\nprint(\"Menores:\", men, \"| Iguales:\", ig, \"| Mayores:\", may)",
      quiz: [{ q: "Quicksort ordena:", opts: ["Buscando el mínimo cada vez", "Particionando alrededor de un pivote y recurriendo", "Mezclando mitades ordenadas", "Con una tabla hash"], correct: 1 }, { q: "El peor caso de quicksort es O(n²), pero se evita en la práctica:", opts: ["Usando más memoria", "Eligiendo el pivote al azar", "Ordenando dos veces", "No se puede evitar"], correct: 1 }],
      exercise: {
        prompt: "Implementá quicksort. Escribí quicksort(a) que devuelva una nueva lista ordenada, eligiendo como pivote el primer elemento y usando particiones (menores, iguales, mayores) con recursión. No uses sorted().",
        starter: "def quicksort(a):\n    # tu código acá (caso base: lista de 0 o 1 elemento ya está ordenada)\n    pass",
        tests: "assert quicksort([3, 1, 2]) == [1, 2, 3], \"Orden básico\"\nassert quicksort([40, 12, 8, 25, 3]) == [3, 8, 12, 25, 40], \"5 elementos\"\nassert quicksort([5, 5, 1]) == [1, 5, 5], \"Con repetidos\"\nassert quicksort([]) == [], \"Vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P09: {
      code: "P09",
      materia: "Estructuras de Datos",
      title: "Colas de prioridad y heaps",
      fuente: "Princeton Algorithms Part I — Week 4: Priority Queues | Libro §2.4",
      theory: ["Una cola de prioridad no saca el primero que entró (como la cola normal) ni el último (como la pila), sino el de MAYOR prioridad. Sedgewick la implementa con un heap binario: un árbol donde cada padre es mayor (o menor) que sus hijos, lo que deja el elemento prioritario siempre en la raíz.", "Lo potente del heap: insertar y sacar el máximo son ambos O(log n), mucho mejor que buscar el máximo en una lista (O(n)) cada vez. Aparece en todo lo que procesa \"lo más urgente primero\": pedidos por prioridad, el algoritmo de Dijkstra (que verás en ALGO), y la compresión de datos."],
      example: "# El máximo de un heap está en la raíz. Simulamos con el módulo heapq (min-heap).\nimport heapq\ntareas = []\nheapq.heappush(tareas, (2, \"reponer stock\"))   # (prioridad, tarea)\nheapq.heappush(tareas, (1, \"cerrar caja\"))      # prioridad 1 = más urgente\nheapq.heappush(tareas, (3, \"limpiar\"))\nprint(\"Más urgente:\", heapq.heappop(tareas))    # (1, \"cerrar caja\")",
      quiz: [{ q: "Una cola de prioridad saca siempre:", opts: ["El primero que entró", "El último que entró", "El de mayor prioridad", "Uno al azar"], correct: 2 }, { q: "Insertar y sacar el máximo en un heap binario cuestan:", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correct: 1 }],
      exercise: {
        prompt: "Sin usar heapq: escribí sacar_maximo(a) que reciba una lista de números, quite y devuelva el máximo (simulando el 'pop' de una cola de prioridad de máximo). Si está vacía, devolvé None. La lista queda sin ese elemento.",
        starter: "def sacar_maximo(a):\n    # tu código acá\n    pass",
        tests: "lista = [3, 7, 2, 7, 1]\nassert sacar_maximo(lista) == 7, \"El máximo\"\nassert lista.count(7) == 1, \"Quitó solo una ocurrencia del máximo\"\nassert sacar_maximo([]) is None, \"Vacía devuelve None\"\nprint(\"TESTS_OK\")",
      },
    },
    P10: {
      code: "P10",
      materia: "Estructuras de Datos",
      title: "Heapsort",
      fuente: "Princeton Algorithms Part I — Week 4: Priority Queues (heapsort) | Libro §2.4",
      theory: ["Heapsort ordena usando la idea de la cola de prioridad: metés todos los elementos en un heap y los vas sacando de a uno; como cada extracción da el máximo (o mínimo), salen ordenados. Es O(n log n), como mergesort y quicksort.", "Su ventaja sobre mergesort: ordena \"in place\", sin memoria extra significativa. Su desventaja frente a quicksort: suele ser más lento en la práctica por cómo accede a memoria. Sedgewick lo presenta como el cierre natural del tema de heaps: la estructura que sirve para priorizar también sirve para ordenar."],
      example: "# Heapsort conceptual: sacar repetidamente el mínimo de un heap\nimport heapq\ndef heapsort(a):\n    h = a[:]\n    heapq.heapify(h)          # convierte la lista en heap: O(n)\n    return [heapq.heappop(h) for _ in range(len(h))]\n\nprint(heapsort([40, 12, 8, 25, 3]))  # [3, 8, 12, 25, 40]",
      quiz: [{ q: "Heapsort ordena:", opts: ["Buscando el mínimo linealmente", "Metiendo todo en un heap y sacándolo de a uno", "Con un pivote", "Mezclando mitades"], correct: 1 }, { q: "La ventaja de heapsort sobre mergesort es:", opts: ["Es más simple", "Ordena in place, sin memoria extra significativa", "Es siempre más rápido", "No necesita comparaciones"], correct: 1 }],
      exercise: {
        prompt: "Implementá heapsort usando heapq. Escribí heapsort(a) que devuelva una nueva lista ordenada de menor a mayor, convirtiendo a en heap y sacando los elementos de a uno. No uses sorted() ni .sort().",
        starter: "import heapq\n\ndef heapsort(a):\n    # tu código acá\n    pass",
        tests: "assert heapsort([3, 1, 2]) == [1, 2, 3], \"Orden básico\"\nassert heapsort([40, 12, 8, 25, 3]) == [3, 8, 12, 25, 40], \"5 elementos\"\nassert heapsort([]) == [], \"Vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P11: {
      code: "P11",
      materia: "Estructuras de Datos",
      title: "Tablas de símbolos y búsqueda binaria",
      fuente: "Princeton Algorithms Part I — Week 4: Elementary Symbol Tables | Libro §3.1",
      theory: ["Una tabla de símbolos asocia claves con valores — es el concepto abstracto detrás del diccionario de Python y de cualquier índice. Sedgewick arranca con la implementación sobre un array ordenado, donde buscar una clave se hace con búsqueda binaria.", "La búsqueda binaria es la joya: en una lista ORDENADA, en vez de mirar elemento por elemento (O(n)), mirás el del medio y descartás la mitad que no puede contener la clave, repitiendo. Eso da O(log n): en un millón de elementos, unas 20 comparaciones. La condición es que esté ordenada — por eso ordenar importa tanto."],
      example: "# Búsqueda binaria: descartar la mitad en cada paso (lista ordenada)\ndef busqueda_binaria(a, clave):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        medio = (lo + hi) // 2\n        if a[medio] == clave:\n            return medio\n        elif a[medio] < clave:\n            lo = medio + 1\n        else:\n            hi = medio - 1\n    return -1  # no está\n\nprint(\"Índice de 25:\", busqueda_binaria([3, 8, 12, 25, 40], 25))  # 3\nprint(\"Índice de 7:\", busqueda_binaria([3, 8, 12, 25, 40], 7))    # -1",
      quiz: [{ q: "La búsqueda binaria requiere que la lista esté:", opts: ["Vacía", "Ordenada", "Sin repetidos", "Al revés"], correct: 1 }, { q: "La búsqueda binaria en n elementos cuesta:", opts: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 }],
      exercise: {
        prompt: "Implementá búsqueda binaria. Escribí busqueda_binaria(a, clave) que reciba una lista ORDENADA y devuelva el índice de clave, o -1 si no está, descartando la mitad en cada paso.",
        starter: "def busqueda_binaria(a, clave):\n    # tu código acá\n    pass",
        tests: "assert busqueda_binaria([3,8,12,25,40], 25) == 3, \"Encuentra 25\"\nassert busqueda_binaria([3,8,12,25,40], 3) == 0, \"Primer elemento\"\nassert busqueda_binaria([3,8,12,25,40], 7) == -1, \"No está\"\nassert busqueda_binaria([], 5) == -1, \"Lista vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P12: {
      code: "P12",
      materia: "Estructuras de Datos",
      title: "Árboles binarios de búsqueda (BST)",
      fuente: "Princeton Algorithms Part I — Week 4: BSTs | Libro §3.2",
      theory: ["Un árbol binario de búsqueda (BST) organiza claves de modo que, en cada nodo, todo lo menor va a la izquierda y todo lo mayor a la derecha. Retomás los árboles de MDIS M12, ahora con una regla de orden que hace la búsqueda eficiente: en promedio O(log n), porque cada comparación descarta un subárbol entero.", "La ventaja sobre el array ordenado (P11): en un BST insertar también es O(log n) en promedio, mientras que en un array ordenado insertar es O(n) porque hay que correr elementos. La trampa, que Sedgewick remarca: si insertás claves ya ordenadas, el BST degenera en una lista (O(n)) — lo que motiva los árboles balanceados de la próxima lección."],
      example: "# BST con nodos {clave, izq, der}. Insertar respeta menor-izquierda, mayor-derecha.\ndef insertar(nodo, clave):\n    if nodo is None:\n        return {\"clave\": clave, \"izq\": None, \"der\": None}\n    if clave < nodo[\"clave\"]:\n        nodo[\"izq\"] = insertar(nodo[\"izq\"], clave)\n    elif clave > nodo[\"clave\"]:\n        nodo[\"der\"] = insertar(nodo[\"der\"], clave)\n    return nodo\n\nraiz = None\nfor c in [25, 12, 40, 8]:\n    raiz = insertar(raiz, c)\nprint(\"Raíz:\", raiz[\"clave\"], \"| izq:\", raiz[\"izq\"][\"clave\"], \"| der:\", raiz[\"der\"][\"clave\"])",
      quiz: [{ q: "En un BST, comparado con un nodo, las claves menores van:", opts: ["A la derecha", "A la izquierda", "En la raíz", "Se descartan"], correct: 1 }, { q: "¿Por qué un BST puede degenerar a O(n)?", opts: ["Por usar mucha memoria", "Si se insertan claves ya ordenadas, queda como una lista", "Por tener claves repetidas", "Nunca degenera"], correct: 1 }],
      exercise: {
        prompt: "Escribí buscar(nodo, clave) que busque una clave en un BST de nodos {clave, izq, der} y devuelva True si está, False si no. Aprovechá el orden: bajá a la izquierda si la clave es menor, a la derecha si es mayor.",
        starter: "def buscar(nodo, clave):\n    # tu código acá\n    pass",
        tests: "def insertar(nodo, clave):\n    if nodo is None: return {\"clave\": clave, \"izq\": None, \"der\": None}\n    if clave < nodo[\"clave\"]: nodo[\"izq\"] = insertar(nodo[\"izq\"], clave)\n    elif clave > nodo[\"clave\"]: nodo[\"der\"] = insertar(nodo[\"der\"], clave)\n    return nodo\nraiz = None\nfor c in [25, 12, 40, 8]: raiz = insertar(raiz, c)\nassert buscar(raiz, 40) == True, \"40 está\"\nassert buscar(raiz, 8) == True, \"8 está (hoja izquierda)\"\nassert buscar(raiz, 99) == False, \"99 no está\"\nassert buscar(None, 5) == False, \"Árbol vacío\"\nprint(\"TESTS_OK\")",
      },
    },
    P13: {
      code: "P13",
      materia: "Estructuras de Datos",
      title: "Árboles balanceados (panorama)",
      fuente: "Princeton Algorithms Part I — Week 5: Balanced Search Trees | Libro §3.3",
      theory: ["Un árbol balanceado se reorganiza automáticamente al insertar para que nunca degenere en lista: garantiza O(log n) SIEMPRE, no solo en promedio. Sedgewick enseña los árboles rojo-negro, que mantienen el balance con reglas de color en los nodos y rotaciones.", "No hace falta memorizar la mecánica de las rotaciones para entender el punto: es la solución al problema que dejó abierto el BST (P12). La altura de un árbol balanceado de n nodos es siempre ~log n, y esa altura es exactamente lo que cuesta buscar, insertar o borrar. En Python, el dict y el set usan hashing (próxima lección), pero muchas bases de datos usan árboles balanceados por debajo."],
      example: "# La altura de un árbol determina el costo. Balanceado: altura ~ log2(n).\nimport math\ndef altura_de_lista(nodo):\n    # BST degenerado (lista): altura = n\n    n = 0\n    while nodo is not None:\n        n += 1\n        nodo = nodo.get(\"der\")\n    return n\n\nfor n in [1, 15, 1023, 1_000_000]:\n    print(f\"n={n}: degenerado={n}, balanceado~{math.ceil(math.log2(n+1))}\")",
      quiz: [{ q: "La ventaja de un árbol balanceado sobre un BST común es:", opts: ["Usa menos memoria", "Garantiza O(log n) siempre, sin degenerar", "No necesita comparaciones", "Es más fácil de programar"], correct: 1 }, { q: "La altura de un árbol balanceado con n nodos es aproximadamente:", opts: ["n", "n²", "log n", "1"], correct: 2 }],
      exercise: {
        prompt: "La altura de un árbol balanceado con n nodos es ceil(log2(n+1)). Escribí altura_balanceada(n) que la devuelva como entero. Para n=0 devolvé 0.",
        starter: "import math\n\ndef altura_balanceada(n):\n    # tu código acá\n    pass",
        tests: "assert altura_balanceada(1) == 1, \"1 nodo, altura 1\"\nassert altura_balanceada(7) == 3, \"7 nodos, altura 3\"\nassert altura_balanceada(0) == 0, \"Árbol vacío\"\nprint(\"TESTS_OK\")",
      },
    },
    P14: {
      code: "P14",
      materia: "Estructuras de Datos",
      title: "Tablas hash",
      fuente: "Princeton Algorithms Part I — Week 6: Hash Tables | Libro §3.4",
      theory: ["Una tabla hash logra búsqueda e inserción en O(1) promedio — más rápido que cualquier árbol. La idea: una función hash convierte la clave en un número (un índice de un array), y ahí se guarda el valor. Es la estructura detrás del dict y el set de Python.", "El problema son las colisiones: dos claves distintas que caen en el mismo índice. Sedgewick enseña dos soluciones — encadenamiento (guardar una lista en cada índice) y sondeo lineal (buscar el siguiente hueco libre). El costo O(1) depende de una buena función hash que reparta parejo; con una mala, todo colisiona y degenera a O(n)."],
      example: "# Hash simple: índice = clave % tamaño. Colisión = mismo índice.\ndef indice_hash(clave, tamano):\n    return hash(clave) % tamano\n\ntamano = 5\nfor palabra in [\"gaseosa\", \"agua\", \"snack\"]:\n    print(f\"{palabra} -> índice {indice_hash(palabra, tamano)}\")",
      quiz: [{ q: "Una tabla hash logra búsqueda en:", opts: ["O(log n)", "O(1) promedio", "O(n)", "O(n²)"], correct: 1 }, { q: "Una colisión en una tabla hash es cuando:", opts: ["La tabla se llena", "Dos claves distintas caen en el mismo índice", "La clave no existe", "El hash es negativo"], correct: 1 }],
      exercise: {
        prompt: "Implementá una tabla hash con encadenamiento simple. Escribí insertar(tabla, clave, valor) donde tabla es una lista de listas (buckets). Calculá el índice con hash(clave) % len(tabla) y agregá el par (clave, valor) a ese bucket. Devolvé la tabla.",
        starter: "def insertar(tabla, clave, valor):\n    # tu código acá\n    pass",
        tests: "tabla = [[] for _ in range(4)]\ninsertar(tabla, \"a\", 1)\ninsertar(tabla, \"b\", 2)\n# el par debe estar en el bucket correspondiente al hash\nidx_a = hash(\"a\") % 4\nassert (\"a\", 1) in tabla[idx_a], \"El par (a,1) debe estar en su bucket\"\ntotal = sum(len(b) for b in tabla)\nassert total == 2, \"Dos pares insertados en total\"\nprint(\"TESTS_OK\")",
      },
    },
    P15: {
      code: "P15",
      materia: "Estructuras de Datos",
      title: "Aplicaciones de tablas de símbolos",
      fuente: "Princeton Algorithms Part I — Week 6: Symbol Table Applications | Libro §3.5",
      theory: ["Con tablas de símbolos (dicts/hash) se resuelven elegantemente problemas que serían O(n²) a fuerza bruta. El ejemplo clásico de Sedgewick: contar frecuencias. Recorrés los datos una vez, y por cada elemento incrementás su contador en la tabla — O(n) total en vez de contar cada uno recorriendo todo.", "Es el patrón más útil del día a día: detectar duplicados, agrupar por categoría, indexar. En tu ERP: contar cuántas ventas hubo por producto, o agrupar pedidos por sucursal, es exactamente esto. La tabla de símbolos convierte búsquedas repetidas en accesos O(1)."],
      example: "# Contar frecuencias con un dict: O(n) en una pasada\ndef frecuencias(datos):\n    conteo = {}\n    for x in datos:\n        conteo[x] = conteo.get(x, 0) + 1\n    return conteo\n\nventas = [\"gaseosa\", \"agua\", \"gaseosa\", \"snack\", \"gaseosa\"]\nprint(frecuencias(ventas))  # {'gaseosa': 3, 'agua': 1, 'snack': 1}",
      quiz: [{ q: "Contar frecuencias con una tabla de símbolos cuesta:", opts: ["O(n²)", "O(n)", "O(log n)", "O(1)"], correct: 1 }, { q: "El patrón 'agrupar por categoría' se resuelve naturalmente con:", opts: ["Una pila", "Una cola", "Una tabla de símbolos (dict)", "Un heap"], correct: 2 }],
      exercise: {
        prompt: "Escribí mas_frecuente(datos) que reciba una lista y devuelva el elemento que más veces aparece, usando un dict de conteo. Si hay empate, devolvé cualquiera de los máximos. Lista vacía devuelve None.",
        starter: "def mas_frecuente(datos):\n    # tu código acá\n    pass",
        tests: "assert mas_frecuente([\"a\",\"b\",\"a\",\"a\"]) == \"a\", \"a aparece 3 veces\"\nassert mas_frecuente([1]) == 1, \"Un solo elemento\"\nassert mas_frecuente([]) is None, \"Lista vacía\"\nprint(\"TESTS_OK\")",
      },
    },
    P16: {
      code: "P16",
      materia: "Estructuras de Datos",
      title: "Elegir la estructura adecuada (síntesis)",
      fuente: "Princeton Algorithms Part I — Síntesis del curso | Libro cap. 1-3",
      theory: ["El verdadero aprendizaje de la materia no es implementar cada estructura, sino saber CUÁL usar. La regla: pila para LIFO (deshacer), cola para FIFO (orden de llegada), cola de prioridad para \"lo más urgente\", tabla hash para búsqueda rápida por clave, BST/balanceado para búsqueda rápida MANTENIENDO orden.", "El criterio de Sedgewick es siempre el costo según la operación dominante: si vas a buscar mucho por clave sin importar el orden, hash (O(1)); si necesitás recorrer en orden o buscar rangos, árbol (O(log n) pero ordenado); si insertás/sacás solo por los extremos, pila o cola (O(1)). Elegir mal la estructura es la causa más común de un programa lento."],
      example: "# La misma tarea, distinta estructura según lo que importe\n# ¿Buscar rápido por clave? -> dict (hash). ¿Mantener orden? -> lista ordenada.\ninventario = {\"gaseosa\": 40, \"agua\": 12}   # hash: acceso O(1) por nombre\nprint(\"Stock de gaseosa (O(1)):\", inventario[\"gaseosa\"])\n\n# ¿Procesar lo más urgente? -> cola de prioridad\nimport heapq\nurgencias = [(2, \"reponer\"), (1, \"cerrar\")]\nheapq.heapify(urgencias)\nprint(\"Primero:\", heapq.heappop(urgencias))",
      quiz: [{ q: "Para buscar rápido por clave SIN importar el orden, conviene:", opts: ["Una pila", "Una tabla hash (dict)", "Una cola", "Una lista sin ordenar"], correct: 1 }, { q: "Para buscar rápido MANTENIENDO los elementos ordenados, conviene:", opts: ["Una tabla hash", "Un árbol de búsqueda balanceado", "Una pila", "Una cola"], correct: 1 }],
      exercise: {
        prompt: "Dado un caso, elegí la estructura. Escribí estructura_para(caso) que devuelva: 'pila' si caso=='deshacer', 'cola' si caso=='orden_llegada', 'prioridad' si caso=='mas_urgente', 'hash' si caso=='buscar_por_clave'. Para cualquier otro, 'lista'.",
        starter: "def estructura_para(caso):\n    # tu código acá\n    pass",
        tests: "assert estructura_para(\"deshacer\") == \"pila\", \"LIFO\"\nassert estructura_para(\"orden_llegada\") == \"cola\", \"FIFO\"\nassert estructura_para(\"mas_urgente\") == \"prioridad\", \"Cola de prioridad\"\nassert estructura_para(\"buscar_por_clave\") == \"hash\", \"Tabla hash\"\nassert estructura_para(\"otra_cosa\") == \"lista\", \"Default\"\nprint(\"TESTS_OK\")",
      },
    },
    P17: {
      code: "P17",
      materia: "Estructuras de Datos",
      title: "Proyecto integrador",
      fuente: "Princeton Algorithms Part I — Programming assignments (nivel de exigencia) | Libro cap. 1-3",
      theory: ["Este integrador combina varias estructuras en un caso realista, al nivel de un programming assignment de Princeton. No hay tema nuevo: hay que elegir bien y componer lo aprendido.", "El caso: procesar pedidos que llegan con una prioridad, manteniendo además un índice para consultar rápido cuántos pedidos hay por cliente. Eso combina una cola de prioridad (para atender por urgencia) con una tabla de símbolos (para contar por cliente) — dos estructuras del curso trabajando juntas."],
      example: "# Las piezas del integrador: prioridad + conteo por clave\nimport heapq\npedidos = []\nheapq.heappush(pedidos, (1, \"urgente de cliente A\"))\nheapq.heappush(pedidos, (3, \"normal de cliente B\"))\nconteo = {\"A\": 1, \"B\": 1}\nprint(\"Atender primero:\", heapq.heappop(pedidos))\nprint(\"Pedidos de A:\", conteo[\"A\"])",
      quiz: [{ q: "El integrador combina cola de prioridad + tabla de símbolos para:", opts: ["Ordenar más rápido", "Atender por urgencia Y contar por cliente a la vez", "Ahorrar memoria", "Evitar colisiones"], correct: 1 }],
      exercise: {
        prompt: "Escribí resumen_pedidos(pedidos) que reciba una lista de tuplas (prioridad, cliente). Devolvé un dict con: 'primero' = el cliente del pedido de MENOR prioridad numérica (más urgente), y 'por_cliente' = un dict {cliente: cantidad de pedidos}. Si no hay pedidos, 'primero' es None y 'por_cliente' es {}.",
        starter: "def resumen_pedidos(pedidos):\n    # tu código acá\n    pass",
        tests: "p = [(3, \"B\"), (1, \"A\"), (2, \"A\")]\nr = resumen_pedidos(p)\nassert r[\"primero\"] == \"A\", \"El más urgente (prioridad 1) es de A\"\nassert r[\"por_cliente\"] == {\"B\": 1, \"A\": 2}, \"Conteo por cliente\"\nr2 = resumen_pedidos([])\nassert r2[\"primero\"] is None and r2[\"por_cliente\"] == {}, \"Sin pedidos\"\nprint(\"TESTS_OK\")",
      },
    },
  },
};

const MATERIAS_CONFIG = {
  PRG1: {
    nombre: "Programación I - IA",
    nivel: "NIVEL 0",
    order: ["L01","L02","L03","L04","L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L17"],
  },
  MDIS: {
    nombre: "Matemática Discreta",
    nivel: "NIVEL 0",
    order: ["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12","M13","M14","M15","M16","M17","M18","M19","M20","M21","M22","M23","M24","M25"],
  },
  ALG: {
    nombre: "Álgebra Lineal",
    nivel: "NIVEL 0",
    order: ["A01","A02","A03","A04","A05","A06","A07","A08","A09","A10","A11","A12","A13","A14","A15","A16","A17"],
  },
  PRG2: {
    nombre: "Estructuras de Datos",
    nivel: "NIVEL 1",
    order: ["P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15","P16","P17"],
  },
};

// Helpers para resolver una lección por (materia, code)
function getLesson(materia, code) { return MATERIAS_CONTENIDO[materia][code]; }
function getOrder(materia) { return MATERIAS_CONFIG[materia].order; }

// Resto del árbol de conocimiento (todavía sin contenido interactivo)
const OTHER_TREE = [
  {
    nivel: "NIVEL 0",
    items: [
      { code: "MDIS", name: "Matemática Discreta", status: "disponible" },
    ],
  },
  {
    nivel: "NIVEL 1",
    items: [
      { code: "AMAT", name: "Análisis Matemático", status: "bloqueado" },
      { code: "FINF", name: "Fundamentos de Informática", status: "bloqueado" },
      { code: "IIA", name: "Intro a la IA (CS221)", status: "bloqueado" },
    ],
  },
  {
    nivel: "NIVEL 2 → TÍTULO: ANALISTA",
    items: [
      { code: "PROB", name: "Probabilidad y Estadística", status: "bloqueado" },
      { code: "ALGO", name: "Algoritmos (MIT 6.006)", status: "bloqueado" },
    ],
  },
];

const T = {
  bg: "#101418",
  panel: "#171c22",
  paper: "#f6f5f1",
  ink: "#1c2126",
  line: "#2a323b",
  led: { ok: "#35c46f", warn: "#e8a530", off: "#4a555f", cur: "#4da3ff" },
  accent: "#e8a530",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
};

function Led({ color }) {
  return (
    <span
      style={{
        width: 8, height: 8, borderRadius: "50%", background: color,
        boxShadow: `0 0 6px ${color}88`, display: "inline-block", flexShrink: 0,
      }}
    />
  );
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 10, letterSpacing: 1, color: "#8b98a5",
      border: `1px solid ${T.line}`, padding: "2px 6px", borderRadius: 3,
    }}>{children}</span>
  );
}

// ---------- Pyodide loader ----------
let pyodidePromise = null;
function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/pyodide/0.23.4/pyodide.js";
      s.onload = async () => {
        try {
          const py = await window.loadPyodide({
            indexURL: "https://cdnjs.cloudflare.com/ajax/libs/pyodide/0.23.4/",
          });
          resolve(py);
        } catch (e) { reject(e); }
      };
      s.onerror = () => reject(new Error("No se pudo cargar Pyodide"));
      document.head.appendChild(s);
    });
  }
  return pyodidePromise;
}

async function runPython(code) {
  const py = await getPyodide();
  let out = "";
  py.setStdout({ batched: (s) => (out += s + "\n") });
  py.setStderr({ batched: (s) => (out += s + "\n") });
  try {
    await py.runPythonAsync(code);
    return { ok: true, out: out || "(sin salida)" };
  } catch (e) {
    return { ok: false, out: out + String(e.message || e) };
  }
}

// ---------- Editor ----------
function CodeEditor({ value, onChange, height = 160 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      style={{
        width: "100%", height, resize: "vertical", boxSizing: "border-box",
        background: "#0c1013", color: "#d7e2ec", border: `1px solid ${T.line}`,
        borderRadius: 6, padding: 12, fontFamily: T.mono, fontSize: 13,
        lineHeight: 1.55, outline: "none", tabSize: 4,
      }}
    />
  );
}

function Output({ result }) {
  if (!result) return null;
  return (
    <pre style={{
      margin: "8px 0 0", padding: 10, borderRadius: 6, fontSize: 12.5,
      fontFamily: T.mono, whiteSpace: "pre-wrap", wordBreak: "break-word",
      background: result.ok ? "#0d1f15" : "#22100f",
      color: result.ok ? "#8fe3b0" : "#f0a196",
      border: `1px solid ${result.ok ? "#1d4a30" : "#5a2521"}`,
    }}>{result.out}</pre>
  );
}

function RunBtn({ onClick, busy, label = "▶ Ejecutar" }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      style={{
        marginTop: 8, padding: "8px 16px", borderRadius: 6, border: "none",
        background: busy ? "#3a4450" : T.accent, color: "#14171c",
        fontFamily: T.mono, fontSize: 12.5, fontWeight: 700, cursor: busy ? "wait" : "pointer",
        letterSpacing: 0.5,
      }}
    >{busy ? "Cargando entorno…" : label}</button>
  );
}

// ---------- Sidebar tree ----------
function TreePanel({ current, currentMateria, completed, onSelect }) {
  // Materias con lecciones interactivas (PRG1, MDIS). El resto son placeholders.
  const materiasInteractivas = Object.keys(MATERIAS_CONFIG);

  function lessonsDe(materia) {
    const order = getOrder(materia);
    const done = completed[materia] || new Set();
    return order.map((code, i) => {
      const lesson = getLesson(materia, code);
      const isDone = done.has(code);
      const isCurrent = materia === currentMateria && code === current;
      const prevDone = i === 0 || done.has(order[i - 1]);
      const locked = !isDone && !isCurrent && !prevDone;
      return { code, name: lesson.title, done: isDone, current: isCurrent, locked };
    });
  }

  const materiaBox = (materia) => {
    const cfg = MATERIAS_CONFIG[materia];
    const lessons = lessonsDe(materia);
    const activa = materia === currentMateria;
    return (
      <div key={materia}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "6px 6px",
          borderRadius: 5, background: activa ? "#1e2630" : "transparent",
        }}>
          <Led color={activa ? T.led.cur : T.led.ok} />
          <span style={{ fontFamily: T.mono, fontSize: 10, color: "#71808d", width: 40 }}>{materia}</span>
          <span style={{ fontFamily: T.sans, fontSize: 13, color: "#dbe3ea", flex: 1 }}>{cfg.nombre}</span>
        </div>
        <div style={{ marginLeft: 22, borderLeft: `1px solid ${T.line}`, paddingLeft: 10, margin: "4px 0 6px 15px" }}>
          {lessons.map((l) => (
            <div
              key={l.code}
              onClick={() => !l.locked && onSelect(materia, l.code)}
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "3.5px 4px",
                borderRadius: 4, opacity: l.locked ? 0.4 : 1,
                background: l.current ? "#243040" : "transparent",
                cursor: l.locked ? "not-allowed" : "pointer",
              }}
            >
              <Led color={l.done ? T.led.ok : l.current ? T.led.cur : T.led.off} />
              <span style={{ fontFamily: T.mono, fontSize: 9.5, color: "#66737f" }}>{l.code}</span>
              <span style={{
                fontFamily: T.sans, fontSize: 12.5,
                color: l.current ? "#fff" : "#b9c4cd",
                fontWeight: l.current ? 600 : 400,
              }}>{l.name}</span>
              {l.locked && <span style={{ fontSize: 10 }}>🔒</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const placeholderItem = (it) => (
    <div key={it.code} style={{
      display: "flex", alignItems: "center", gap: 8, padding: "6px 6px",
      borderRadius: 5, opacity: it.status === "bloqueado" ? 0.45 : 1,
    }}>
      <Led color={it.status === "disponible" ? T.led.ok : T.led.off} />
      <span style={{ fontFamily: T.mono, fontSize: 10, color: "#71808d", width: 40 }}>{it.code}</span>
      <span style={{ fontFamily: T.sans, fontSize: 13, color: "#dbe3ea", flex: 1 }}>{it.name}</span>
      {it.status === "bloqueado" && <span style={{ fontSize: 11 }}>🔒</span>}
    </div>
  );

  return (
    <div style={{ padding: "16px 12px", overflowY: "auto", height: "100%" }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: "#8b98a5", letterSpacing: 2, marginBottom: 4 }}>
        RED DE CONOCIMIENTO
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: "#e8edf2", marginBottom: 16 }}>
        Ing. en Inteligencia Artificial
      </div>

      {/* Render de cada nivel del árbol: materias interactivas (por su campo nivel) + placeholders */}
      {OTHER_TREE.map((nivel) => {
        // Materias interactivas que pertenecen a este nivel
        const interactivasDeNivel = materiasInteractivas.filter(
          (m) => MATERIAS_CONFIG[m].nivel === nivel.nivel
        );
        // Placeholders de este nivel que NO son materias interactivas
        const placeholdersDeNivel = nivel.items.filter(
          (it) => !materiasInteractivas.includes(it.code)
        );
        return (
          <div key={nivel.nivel} style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: T.mono, fontSize: 10, letterSpacing: 1.5, color: T.accent,
              borderBottom: `1px solid ${T.line}`, paddingBottom: 4, marginBottom: 8,
            }}>{nivel.nivel}</div>
            {interactivasDeNivel.map((m) => materiaBox(m))}
            {placeholdersDeNivel.map((it) => placeholderItem(it))}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Quiz ----------
function Quiz({ lesson }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const allOk = checked && lesson.quiz.every((q, i) => answers[i] === q.correct);
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Tag>CONTROL</Tag>
        <span style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 15 }}>Quiz de comprensión</span>
      </div>
      {lesson.quiz.map((q, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13.5, marginBottom: 6 }}>{i + 1}. {q.q}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {q.opts.map((o, j) => {
              const sel = answers[i] === j;
              const showState = checked && sel;
              const ok = showState && j === q.correct;
              const bad = showState && j !== q.correct;
              return (
                <button key={j}
                  onClick={() => { setAnswers({ ...answers, [i]: j }); setChecked(false); }}
                  style={{
                    fontFamily: T.mono, fontSize: 12, padding: "6px 10px", borderRadius: 5,
                    cursor: "pointer",
                    border: `1.5px solid ${ok ? "#2f9e5f" : bad ? "#c05248" : sel ? "#4a5866" : "#d8d5cc"}`,
                    background: ok ? "#e2f5e9" : bad ? "#fae4e1" : sel ? "#e9ecef" : "#fff",
                    color: T.ink,
                  }}>{o}</button>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={() => setChecked(true)}
        style={{
          fontFamily: T.mono, fontSize: 12, fontWeight: 700, padding: "7px 14px",
          borderRadius: 5, border: "none", background: T.ink, color: "#fff", cursor: "pointer",
        }}>Corregir</button>
      {checked && (
        <span style={{ marginLeft: 10, fontFamily: T.mono, fontSize: 12.5, color: allOk ? "#2f9e5f" : "#c05248" }}>
          {allOk ? "✔ APROBADO — ejercicio desbloqueado" : "✘ Revisá las marcadas en rojo"}
        </span>
      )}
    </div>
  );
}

// ---------- Tutor (Claude API, modo socrático) ----------
function Tutor({ lesson, getStudentCode }) {
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: `Soy tu tutor de esta lección. Preguntame lo que no te cierre sobre "${lesson.title}" — te voy a guiar con preguntas antes que darte respuestas hechas.` },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => { boxRef.current?.scrollTo(0, 1e9); }, [msgs]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const system = `Sos el tutor IA de "Universidad Privada", plataforma personal de estudio de Nicolás (español rioplatense, tratamiento de vos).
CONTEXTO DE LECCIÓN [${lesson.code}] "${lesson.title}" — Materia: ${lesson.materia}. Fuente: ${lesson.fuente}.
Teoría vista: ${lesson.theory.join(" ")}
Ejercicio activo: ${lesson.exercise.prompt}
Código actual del alumno:\n${getStudentCode()}
REGLAS: Modo socrático — guiá con preguntas y pistas incrementales; NO des la solución completa del ejercicio salvo pedido explícito y en ese caso avisá que conviene intentarlo antes. Respuestas cortas (2-5 oraciones). Solo temas de la lección o prerequisitos.`;
      // FIX: la API exige que el primer mensaje sea "user".
      // Se excluye el saludo inicial hardcodeado del historial enviado.
      const historialAPI = next.filter((m, i) => !(i === 0 && m.role === "assistant"));
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system,
          messages: historialAPI.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await r.json();
      if (!r.ok || data.type === "error") {
        throw new Error(data?.error?.message || `HTTP ${r.status}`);
      }
      const reply = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n") || "No pude generar respuesta.";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      // FIX: mostrar el error real para poder diagnosticar
      setMsgs((m) => [...m, { role: "assistant", content: `Tutor no disponible: ${e.message}. Probá de nuevo.` }]);
    } finally { setBusy(false); }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${T.line}`, display: "flex", alignItems: "center", gap: 8 }}>
        <Led color={T.led.ok} />
        <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1.5, color: "#8b98a5" }}>TUTOR · MODO SOCRÁTICO</span>
      </div>
      <div ref={boxRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "88%", padding: "8px 11px", borderRadius: 8,
            background: m.role === "user" ? "#2b3a4d" : "#1d242c",
            border: `1px solid ${T.line}`,
            color: "#dde5ec", fontFamily: T.sans, fontSize: 13, lineHeight: 1.5,
            whiteSpace: "pre-wrap",
          }}>{m.content}</div>
        ))}
        {busy && <div style={{ fontFamily: T.mono, fontSize: 11, color: "#71808d" }}>tutor escribiendo…</div>}
      </div>
      <div style={{ padding: 10, borderTop: `1px solid ${T.line}`, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Preguntá sobre la lección…"
          style={{
            flex: 1, background: "#0c1013", border: `1px solid ${T.line}`, borderRadius: 6,
            padding: "9px 11px", color: "#e2e9ef", fontFamily: T.sans, fontSize: 13, outline: "none",
          }}
        />
        <button onClick={send} disabled={busy} style={{
          padding: "0 14px", borderRadius: 6, border: "none", background: T.accent,
          color: "#14171c", fontFamily: T.mono, fontWeight: 700, fontSize: 12, cursor: "pointer",
        }}>Enviar</button>
      </div>
    </div>
  );
}

// ---------- Lesson panel ----------
function LessonPanel({ lesson, materia, codeRef, onPass }) {
  const [exampleCode, setExampleCode] = useState(lesson.example);
  const [exampleOut, setExampleOut] = useState(null);
  const [exCode, setExCode] = useState(lesson.exercise.starter);
  const [exOut, setExOut] = useState(null);
  const [exPassed, setExPassed] = useState(false);
  const [busy, setBusy] = useState(false);
  codeRef.current = exCode;

  async function runExample() {
    setBusy(true);
    setExampleOut(await runPython(exampleCode));
    setBusy(false);
  }
  async function runExercise() {
    setBusy(true);
    const r = await runPython(exCode + "\n\n" + lesson.exercise.tests);
    setExOut(r);
    const passed = r.ok && r.out.includes("TESTS_OK");
    setExPassed(passed);
    if (passed) onPass(materia, lesson.code);
    setBusy(false);
  }

  const order = getOrder(materia);
  const nextIndex = order.indexOf(lesson.code) + 1;
  const nextLesson = nextIndex < order.length ? getLesson(materia, order[nextIndex]) : null;

  return (
    <div style={{ overflowY: "auto", height: "100%", background: T.paper }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "26px 26px 60px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Tag>{lesson.code}</Tag>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: "#7a766c" }}>{lesson.materia}</span>
        </div>
        <h1 style={{ fontFamily: T.sans, fontSize: 26, fontWeight: 800, color: T.ink, margin: "10px 0 2px" }}>
          {lesson.title}
        </h1>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: "#8a857a", marginBottom: 20 }}>
          Fuente: {lesson.fuente}
        </div>

        {lesson.theory.map((p, i) => (
          <p key={i} style={{ fontFamily: T.sans, fontSize: 14.5, lineHeight: 1.65, color: "#2c3238" }}>{p}</p>
        ))}

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Tag>PROBALO</Tag>
          <span style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 15, color: T.ink }}>Ejemplo editable</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <CodeEditor value={exampleCode} onChange={setExampleCode} height={170} />
          <RunBtn onClick={runExample} busy={busy} />
          <Output result={exampleOut} />
        </div>

        <Quiz lesson={lesson} />

        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8 }}>
          <Tag>EJERCICIO</Tag>
          <span style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 15, color: T.ink }}>Calificado con tests automáticos</span>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.6, color: "#2c3238" }}>
          {lesson.exercise.prompt}
        </p>
        <CodeEditor value={exCode} onChange={setExCode} height={140} />
        <RunBtn onClick={runExercise} busy={busy} label="▶ Ejecutar tests" />
        <Output result={exOut} />
        {exPassed && (
          <div style={{
            marginTop: 12, padding: "12px 14px", borderRadius: 6,
            background: "#e2f5e9", border: "1.5px solid #2f9e5f",
            fontFamily: T.mono, fontSize: 13, fontWeight: 700, color: "#1d6b3f",
          }}>
            ✔ EJERCICIO APROBADO{nextLesson ? ` — ${nextLesson.code} ${nextLesson.title} desbloqueada` : " — ¡Módulo completo!"}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- App shell ----------
export default function App() {
  const [tab, setTab] = useState("leccion");
  const [currentMateria, setCurrentMateria] = useState("PRG1");
  const [current, setCurrent] = useState("L03");
  // Progreso independiente por materia (Set de códigos aprobados)
  const [completed, setCompleted] = useState({
    PRG1: new Set(["L01", "L02"]),
    MDIS: new Set(),
  });
  const codeRef = useRef(getLesson("PRG1", "L03").exercise.starter);
  const isNarrow = typeof window !== "undefined" && window.innerWidth < 900;
  const [narrow, setNarrow] = useState(isNarrow);
  useEffect(() => {
    const f = () => setNarrow(window.innerWidth < 900);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const lesson = getLesson(currentMateria, current);

  function handleSelect(materia, code) {
    setCurrentMateria(materia);
    setCurrent(code);
    if (narrow) setTab("leccion");
  }
  function handlePass(materia, code) {
    setCompleted((prev) => {
      const next = { ...prev, [materia]: new Set(prev[materia]) };
      next[materia].add(code);
      return next;
    });
  }

  const header = (
    <div style={{
      height: 48, background: T.panel, borderBottom: `1px solid ${T.line}`,
      display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0,
    }}>
      <Led color={T.led.ok} />
      <span style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 2.5, color: "#e8edf2", fontWeight: 700 }}>
        UNIVERSIDAD PRIVADA
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: "#66737f", letterSpacing: 1 }}>
        v0.4 · SESIÓN ACTIVA
      </span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: T.mono, fontSize: 10.5, color: "#8b98a5" }}>
        RACHA: 4 días · HOY: 32 min
      </span>
    </div>
  );

  if (narrow) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
        {header}
        <div style={{ display: "flex", background: T.panel, borderBottom: `1px solid ${T.line}` }}>
          {[["temas", "Temas"], ["leccion", "Lección"], ["tutor", "Tutor"]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
              background: tab === k ? T.bg : "transparent",
              color: tab === k ? T.accent : "#8b98a5",
              fontFamily: T.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1,
              borderBottom: tab === k ? `2px solid ${T.accent}` : "2px solid transparent",
            }}>{label}</button>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          {tab === "temas" && <div style={{ height: "100%", background: T.panel }}><TreePanel current={current} currentMateria={currentMateria} completed={completed} onSelect={handleSelect} /></div>}
          {tab === "leccion" && <LessonPanel key={currentMateria + lesson.code} lesson={lesson} materia={currentMateria} codeRef={codeRef} onPass={handlePass} />}
          {tab === "tutor" && <div style={{ height: "100%", background: T.panel }}><Tutor key={currentMateria + lesson.code} lesson={lesson} getStudentCode={() => codeRef.current} /></div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
      {header}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <div style={{ width: 270, background: T.panel, borderRight: `1px solid ${T.line}`, flexShrink: 0 }}>
          <TreePanel current={current} currentMateria={currentMateria} completed={completed} onSelect={handleSelect} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <LessonPanel key={currentMateria + lesson.code} lesson={lesson} materia={currentMateria} codeRef={codeRef} onPass={handlePass} />
        </div>
        <div style={{ width: 320, background: T.panel, borderLeft: `1px solid ${T.line}`, flexShrink: 0 }}>
          <Tutor key={currentMateria + lesson.code} lesson={lesson} getStudentCode={() => codeRef.current} />
        </div>
      </div>
    </div>
  );
}
