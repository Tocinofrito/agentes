function calcularEcuacion() {
  // Obtener la entrada del usuario
  //Se obtiene el valor de la caja input definida en el html
  var ecuacionInput = document.getElementById("ecuacionInput");
  var ecuacion = ecuacionInput.value;

  // Validar si la entrada no está vacía
  if (ecuacion.trim() !== "") {
    // Realizar la solicitud al servidor para obtener los resultados (puedes hacerlo usando AJAX o Fetch)

    // Supongamos que el resultado es el siguiente
    var resultado = resolverEcuacion(ecuacion);

    // Mostrar la entrada y salida en la tabla
    mostrarResultados(ecuacion, resultado);
  } else {
    alert("Por favor, ingrese una ecuación.");
  }
}

function resolverEcuacion(ecuacion) {
  // Dividir la ecuación en partes
  //Se dividirá a partir de el "="
  var partes = ecuacion.split("=");
  var LadoIzq = partes[0].trim();
  var LadoDer = partes[1].trim();

  // Encontrar términos en ambos lados
  //Lo que hace es delimitar dependiendo del signo desde un signo a antes del otro para tomarlo como un término
  var TerIzq = LadoIzq.match(/[+-]?[^+-]+/g);
  var TerDer = LadoDer.match(/[+-]?[^+-]+/g);

  // Inicializar sumatorias
  //Esto se suma conforme los terminos dependientes o independientes
  var sumXIzq = 0;
  var sumIzq = 0;
  var sumXDer = 0;
  var sumDer = 0;

  // Calcular sumatorias para el lado izquierdo
  //lo que hacemos es verificar si tiene x el término, en caso de se suma a sumXIzq o en caso de ser el independiente pos el que no lleva
  //Eliminamos el char "x" y hacemos la suma
  for (var i = 0; i < TerIzq.length; i++) {
    var termino = TerIzq[i].trim();
    if (termino.includes('x')) {
      sumXIzq += eval(termino.replace('x', ''));
    } else {
      sumIzq += eval(termino);
    }
  }

  // Calcular sumatorias para el lado derecho
  //Lo mismo que el anterior
  for (var j = 0; j < TerDer.length; j++) {
    var termino = TerDer[j].trim();
    if (termino.includes('x')) {
      sumXDer += eval(termino.replace('x', ''));
    } else {
      sumDer += eval(termino);
    }
  }

  // Calcular la solución
  //La solución se hace con un despeje normal de x suponiento no existe el termino independiente
  //Entonces primero cambiamos el signo de uno de los 2 lados para dejarlo en un lado y sumamos algebraicamente
  //Después verificamos si el término que acompaña a x es 0, de ser así no existe solución, después hacemos la suma de los independientes
  //Ya con su despeje, y retornamos el valor como texto
  sumXIzq = sumXIzq + sumXDer * -1;
  if (sumXIzq !== 0) {
    sumDer = -1 * sumIzq + sumDer;
    var resultado = sumDer / sumXIzq;
    return "x=" + resultado;
  } else {
    return "Sin solución";
  }
}
//Esta funcion toma la tabla definida en el index.html, al tomarla podemos modificar el contenido
//En este caso añadimos cada solucion que calculamos, mostramos la entrada que es la ecuacion a resolver
//Y su solución respecto a x

function mostrarResultados(entrada, salida) {
  var table = document.getElementById("resultadosTable");

  // Crear una nueva fila
  var row = table.insertRow();

  // Insertar celdas para la entrada, igual y salida
  var cellEntrada = row.insertCell(0);
  var cellIgual = row.insertCell(1);
  var cellSalida = row.insertCell(2);

  // Asignar valores a las celdas
  cellEntrada.innerHTML = "<strong>Entrada:</strong> " + entrada;
  cellIgual.innerHTML = "<strong>=</strong>";
  cellSalida.innerHTML = "<strong>Salida:</strong> " + salida;
}
