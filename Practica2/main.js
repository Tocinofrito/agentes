class Nodo {
    constructor(valor, padre = null) {
        this.valor = valor;
        this.padre = padre;
        this.hijos = [];
    }
}

function imprimir_cola(cola, id) {
    const div = document.createElement("div");
    div.innerHTML = "<h3>Cola:</h3>";
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Estado de la cola:";
    table.appendChild(caption);
    for (const nodo of cola) {
        const row = document.createElement("tr");
        for (let i = 0; i < nodo.valor.length; i++) {
            const cell = document.createElement("th");
            cell.textContent = nodo.valor[i];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    div.appendChild(table);
    document.getElementById(id).appendChild(div);
}

function imprimir_pila(pila, id) {
    const div = document.createElement("div");
    div.innerHTML = "<h3>Pila:</h3>";
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Estado de la pila:";
    table.appendChild(caption);
    
    // Recorrer la pila en sentido inverso
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
    
    div.appendChild(table);
    document.getElementById(id).appendChild(div);
}


function busqueda_anchura(raiz, objetivo) {
    function busqueda_comun(cola) {
        const visitado = new Set();
        cola.push(raiz);
        visitado.add(raiz.valor.toString());
        
        while (cola.length > 0) {
            // Imprimir el estado de la cola antes de procesarla en esta iteración
            imprimir_cola(cola, "estados");

            const nodo = cola.shift();
            if (JSON.stringify(nodo.valor) === JSON.stringify(objetivo)) {
                document.getElementById("solucion-bfs").innerHTML = "<h3>Solución BFS:</h3>";
                imprimir_sol(nodo, "solucion-bfs");
                return visitado;
            }

            generar_hijos(nodo, cola, visitado);
        }

      
        return visitado;
    }

    return busqueda_comun([]);
}

function busqueda_profundidad(raiz, objetivo) {
    function busqueda_comun(pila) {
        const visitado = new Set();
        pila.push(raiz);
        visitado.add(raiz.valor.toString());

        while (pila.length > 0) {
            // Imprimir el estado de la pila antes de procesarla en esta iteración
            imprimir_pila(pila, "estados");

            const nodo = pila.pop();
            if (JSON.stringify(nodo.valor) === JSON.stringify(objetivo)) {
                document.getElementById("solucion-dfs").innerHTML = "<h3>Solución DFS:</h3>";
                imprimir_sol(nodo, "solucion-dfs");
                return visitado;
            }

            generar_hijos(nodo, pila, visitado);
        }

        
        return visitado;
    }

    return busqueda_comun([]);
}



function generar_hijos(nodo, estructura, visitado) {
    const estado = nodo.valor;
    const posicion_cero = estado.indexOf(0);
    const movimientos = {
        0: [2, 1],
        1: [3, 0],
        2: [3, 0],
        3: [2, 1]
    };
    for (const movimiento of movimientos[posicion_cero]) {
        const nuevo_estado = estado.slice();
        nuevo_estado[posicion_cero] = nuevo_estado[movimiento];
        nuevo_estado[movimiento] = 0;
        if (!visitado.has(nuevo_estado.toString())) {
            const hijo_nodo = new Nodo(nuevo_estado, nodo);
            nodo.hijos.push(hijo_nodo);
            estructura.push(hijo_nodo);
            visitado.add(nuevo_estado.toString());
        }
    }
}

function imprimir_sol(nodo, id) {
    const solucion = [];
    while (nodo !== null) {
        solucion.push(nodo.valor);
        nodo = nodo.padre;
    }

    console.log(solucion.length)
    console.log(solucion)
    for (let i = solucion.length - 1; i >= 0; i--) {
        imprimir(solucion[i], id);
    }
}
// Obtener datos de las tablas
document.getElementById("solve").addEventListener("click", () => {
    const estadoInicial = [];
    const estadoFinal = [];
    document.querySelectorAll("#estado-inicial th").forEach(cell => estadoInicial.push(parseInt(cell.textContent)));
    document.querySelectorAll("#estado-final th").forEach(cell => estadoFinal.push(parseInt(cell.textContent)));
    console.log("Estado inicial:", estadoInicial);
    console.log("Estado final:", estadoFinal);

    // Se genera el nodo raiz
    const raiz = new Nodo(estadoInicial);
    const visitadosBFS = busqueda_anchura(raiz, estadoFinal);
    console.log(visitadosBFS)
    const visitadosDFS = busqueda_profundidad(raiz, estadoFinal);
    console.log(visitadosDFS)
});
