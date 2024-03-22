// Definición de la clase Nodo
class Nodo {
    constructor(valor, padre = null) {
        this.valor = valor; // Valor del nodo
        this.padre = padre; // Referencia al nodo padre
        this.hijos = []; // Array para almacenar los nodos hijos
    }
}

// Función para imprimir el estado de la cola
function imprimir_cola(cola, id) {
    // Crear un nuevo elemento div para contener la cola
    const div = document.createElement("div");
    div.innerHTML = "<h3>Cola:</h3>"; // Encabezado para la cola

    // Crear una tabla para mostrar el estado de la cola
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Estado de la cola:"; // Título de la tabla
    table.appendChild(caption);

    // Recorrer la cola y agregar cada nodo a la tabla
    for (const nodo of cola) {
        const row = document.createElement("tr");
        for (let i = 0; i < nodo.valor.length; i++) {
            const cell = document.createElement("th");
            cell.textContent = nodo.valor[i];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Agregar la tabla al div y luego el div al contenedor con el ID especificado
    div.appendChild(table);
    document.getElementById(id).appendChild(div);
}

// Función para imprimir el estado de la pila
function imprimir_pila(pila, id) {
    // Crear un nuevo elemento div para contener la pila
    const div = document.createElement("div");
    div.innerHTML = "<h3>Pila:</h3>"; // Encabezado para la pila

    // Crear una tabla para mostrar el estado de la pila
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Estado de la pila:"; // Título de la tabla
    table.appendChild(caption);

    // Recorrer la pila en sentido inverso y agregar cada nodo a la tabla
    for (let i = pila.length - 1; i >= 0; i--) {
        const nodo = pila[i];
        const row = document.createElement("tr");
        for (let j = 0; j < nodo.valor.length; j++) {
            const cell = document.createElement("th");
            cell.textContent = nodo.valor[j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Agregar la tabla al div y luego el div al contenedor con el ID especificado
    div.appendChild(table);
    document.getElementById(id).appendChild(div);
}

// Función para la búsqueda en anchura
function busqueda_anchura(raiz, objetivo) {
    // Función interna para la búsqueda común
    function busqueda_comun(cola) {
        const visitado = new Set();
        cola.push(raiz); // Agregar el nodo raíz a la cola
        visitado.add(raiz.valor.toString()); // Marcar el nodo raíz como visitado

        // Mientras la cola no esté vacía
        while (cola.length > 0) {
            // Imprimir el estado actual de la cola antes de procesarla en esta iteración
            imprimir_cola(cola, "estados");

            const nodo = cola.shift(); // Sacar el primer nodo de la cola
            // Si el estado del nodo es igual al objetivo, se ha encontrado la solución
            if (JSON.stringify(nodo.valor) === JSON.stringify(objetivo)) {
                document.getElementById("solucion-bfs").innerHTML = "<h3>Solución BFS:</h3>";
                imprimir_sol(nodo, "solucion-bfs"); // Imprimir la solución
                return visitado; // Devolver el conjunto de nodos visitados
            }

            generar_hijos(nodo, cola, visitado); // Generar hijos y agregarlos a la cola
        }

        return visitado; // Devolver el conjunto de nodos visitados si no se encontró solución
    }

    return busqueda_comun([]); // Llamar a la función de búsqueda común con una cola vacía
}

// Función para la búsqueda en profundidad
function busqueda_profundidad(raiz, objetivo) {
    // Función interna para la búsqueda común
    function busqueda_comun(pila) {
        const visitado = new Set();
        pila.push(raiz); // Agregar el nodo raíz a la pila
        visitado.add(raiz.valor.toString()); // Marcar el nodo raíz como visitado

        // Mientras la pila no esté vacía
        while (pila.length > 0) {
            // Imprimir el estado actual de la pila antes de procesarla en esta iteración
            imprimir_pila(pila, "estados");

            const nodo = pila.pop(); // Sacar el último nodo de la pila
            // Si el estado del nodo es igual al objetivo, se ha encontrado la solución
            if (JSON.stringify(nodo.valor) === JSON.stringify(objetivo)) {
                document.getElementById("solucion-dfs").innerHTML = "<h3>Solución DFS:</h3>";
                imprimir_sol(nodo, "solucion-dfs"); // Imprimir la solución
                return visitado; // Devolver el conjunto de nodos visitados
            }

            generar_hijos(nodo, pila, visitado); // Generar hijos y agregarlos a la pila
        }

        return visitado; // Devolver el conjunto de nodos visitados si no se encontró solución
    }

    return busqueda_comun([]); // Llamar a la función de búsqueda común con una pila vacía
}

// Función para generar los hijos de un nodo dado
function generar_hijos(nodo, estructura, visitado) {
    const estado = nodo.valor; // Estado actual del nodo
    const posicion_cero = estado.indexOf(0); // Posición del cero en el estado
    const movimientos = {
        0: [2, 1],
        1: [3, 0],
        2: [3, 0],
        3: [2, 1]
    };

    // Recorrer los movimientos posibles desde la posición del cero
    for (const movimiento of movimientos[posicion_cero]) {
        const nuevo_estado = estado.slice(); // Crear una copia del estado actual
        nuevo_estado[posicion_cero] = nuevo_estado[movimiento]; // Realizar el movimiento
        nuevo_estado[movimiento] = 0; // Colocar el cero en la nueva posición

        // Si el nuevo estado no ha sido visitado previamente
        if (!visitado.has(nuevo_estado.toString())) {
            const hijo_nodo = new Nodo(nuevo_estado, nodo); // Crear un nuevo nodo hijo
            nodo.hijos.push(hijo_nodo); // Agregar el hijo al nodo actual
            estructura.push(hijo_nodo); // Agregar el hijo a la estructura (cola o pila)
            visitado.add(nuevo_estado.toString()); // Marcar el nuevo estado como visitado
        }
    }
}

// Función para imprimir la solución encontrada
function imprimir_sol(nodo, id) {
    const solucion = [];
    while (nodo !== null) {
        solucion.push(nodo.valor);
        nodo = nodo.padre;
    }

    // Imprimir la solución en el orden inverso
    for (let i = solucion.length - 1; i >= 0; i--) {
        imprimir(solucion[i], id);
    }
}

// Obtener datos de las tablas y realizar la búsqueda
document.getElementById("solve").addEventListener("click", () => {
    const estadoInicial = [];
    const estadoFinal = [];
    document.querySelectorAll("#estado-inicial th").forEach(cell => estadoInicial.push(parseInt(cell.textContent)));
    document.querySelectorAll("#estado-final th").forEach(cell => estadoFinal.push(parseInt(cell.textContent)));
    console.log("Estado inicial:", estadoInicial);
    console.log("Estado final:", estadoFinal);

    // Se genera el nodo raíz
    const raiz = new Nodo(estadoInicial);

    // Realizar la búsqueda en anchura y en profundidad
    const visitadosBFS = busqueda_anchura(raiz, estadoFinal);
    console.log(visitadosBFS)
    const visitadosDFS = busqueda_profundidad(raiz, estadoFinal);
    console.log(visitadosDFS)
});
