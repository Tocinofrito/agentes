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
    for (const nodo of pila) {
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

        console.log("No se encontró una solución para la búsqueda en anchura.");
        console.log("Nodos visitados BFS:");
        for (const estado of visitado) {
            imprimir(estado, "nodos-visitados-bfs");
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

        console.log("No se encontró una solución para la búsqueda en profundidad.");
        console.log("Nodos visitados DFS:");
        for (const estado of visitado) {
            imprimir(estado, "nodos-visitados-dfs");
        }
        return visitado;
    }

    return busqueda_comun([]);
}



function generar_hijos(nodo, estructura, visitado) {
    const estado = nodo.valor;
    const posicion_cero = estado.indexOf(0);
    const movimientos = {
        0: [1, 2],
        1: [0, 3],
        2: [0, 3],
        3: [1, 2]
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
    // const estado_final = solucion[solucion.length - 1];
    // const table = document.createElement("table");
    // const caption = document.createElement("caption");
    // caption.textContent = "Estado final:";
    // table.appendChild(caption);
    // for (let i = 0; i < estado_final.length; i += 2) {
    //     const row = document.createElement("tr");
    //     for (let j = 0; j < 2; j++) {
    //         const cell = document.createElement("th");
    //         cell.textContent = estado_final[i + j];
    //         row.appendChild(cell);
    //     }
    //     table.appendChild(row);
    // }
    // document.getElementById(id).appendChild(table);
}

// function imprimir(estado, id) {
//     const table = document.createElement("table");

//     const caption = document.createElement("caption");
//     caption.textContent = "Estado:";
//     table.appendChild(caption);
//     for (let i = 0; i < estado.length; i += 2) {
//         const row = document.createElement("tr");
//         for (let j = 0; j < 2; j++) {
//             const cell = document.createElement("th");
//             cell.textContent = estado[i + j];
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }
//     document.getElementById(id).appendChild(table);
// }

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
    const visitadosDFS = busqueda_profundidad(raiz, estadoFinal);
});
