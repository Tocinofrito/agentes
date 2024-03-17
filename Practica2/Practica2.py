from collections import deque

class Nodo:
    def __init__(self, valor, padre=None):
        self.valor = valor
        self.padre = padre
        self.hijos = []

def busqueda_anchura(raiz, objetivo):
    def busqueda_comun(cola):
        visitado = set()
        cola.append(raiz)
        visitado.add(tuple(raiz.valor))

        while cola:
            nodo = cola.popleft()
            if nodo.valor == objetivo:
                print("Búsqueda en anchura:")
                imprimir_sol(nodo)
                return visitado
    
            generar_hijos(nodo, cola, visitado)
    
        print("No se encontró una solución para la búsqueda en anchura.")
        print("Nodos visitados:")
        for estado in visitado:
            imprimir(estado)
        return visitado

    return busqueda_comun(deque())

def busqueda_profundidad(raiz, objetivo):
    def busqueda_comun(pila):
        visitado = set()
        pila.append(raiz)
        visitado.add(tuple(raiz.valor))

        while pila:
            nodo = pila.pop()
            if nodo.valor == objetivo:
                print("Búsqueda en profundidad:")
                imprimir_sol(nodo)
                return visitado
    
            generar_hijos(nodo, pila, visitado)
    
        print("No se encontró una solución para la búsqueda en profundidad.")
        print("Nodos visitados:")
        for estado in visitado:
            imprimir(estado)
        return visitado

    return busqueda_comun([])

def generar_hijos(nodo, estructura, visitado):
    estado = nodo.valor
    posicion_cero = estado.index(0)
    movimientos = {
        0: [1, 2],
        1: [0, 3],
        2: [0, 3],
        3: [1, 2]
    }
    for movimiento in movimientos[posicion_cero]:
        nuevo_estado = estado[:]
        nuevo_estado[posicion_cero], nuevo_estado[movimiento] = nuevo_estado[movimiento], nuevo_estado[posicion_cero]
        if tuple(nuevo_estado) not in visitado:
            hijo_nodo = Nodo(nuevo_estado, padre=nodo)
            nodo.hijos.append(hijo_nodo)
            estructura.append(hijo_nodo)
            visitado.add(tuple(nuevo_estado))

def imprimir_sol(nodo):
    solucion = []
    while nodo is not None:
        solucion.append(nodo.valor)
        nodo = nodo.padre
    for estado in reversed(solucion):
        imprimir(estado)
    print()
    print("Estado final:")
    imprimir(solucion[0])

def imprimir(estado):
    for i in range(0, len(estado), 2):
        print(f"{estado[i]:<3} {estado[i+1]}")
    print()

# Leer datos
datos = input("Ingrese los datos: ")
elementos = datos.split()
# Conversión tipo string a int
estado_inicial = [int(elemento) for elemento in elementos]
print("Estado inicial:")
imprimir(estado_inicial)
# Se genera el nodo raiz
raiz = Nodo(estado_inicial)
estado_final = [0, 3, 1, 2]
visitados_bfs = busqueda_anchura(raiz, estado_final)
print()
visitados_dfs = busqueda_profundidad(raiz, estado_final)
