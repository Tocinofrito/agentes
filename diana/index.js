function Tabla() {
    
  var P = document.getElementById("Columnas").value;
  console.log(P);
  P = parseInt(P,10);
  P === 4 ? console.log('enteero'):console.log('strng')
  var TablaC = document.getElementById("Tabla")
  
  TablaC.innerHTML = "";

  let MP = []

  for(let k = 0; k < P; k++){
      let arrClass = new Array(P).fill(0);
      arrClass[k] = 1;
      MP.push(arrClass);
      

  }



  var tabla ="<table>";
  for(var i = 0; i < P; i++) {
      tabla += "<tr>";
      for(var j = 0; j < P; j++) {
          tabla += "<td>" + "  " + MP[i][j] + "  " + "</td>";
      }
      tabla += "</tr>";
  }
  tabla += "</table>";
  TablaC.innerHTML = tabla;

}