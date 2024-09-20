let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let indiceModificacion = null;

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let descripcionGasto = document.getElementById("descripcionGasto").value;

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);

    console.log(nombreGasto);
    console.log(valorGasto);
    //Para probar que nuestro boton funciona
    //alert("Click del usuario")
    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlLista = "";
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        htmlLista += `<li>
        <strong>${elemento}</strong> (COP ${valorGasto}) - ${descripcionGasto} 
        <button class="buttonEliminar" onclick="eliminarGasto(${posicion});">Eliminar</button>
        <button class="buttonEditar" onclick="editarGasto(${posicion});">Editar</button>
        </li>`;
        //Calculamos el total de gastos
        totalGastos += Number(valorGasto);
        //console.log(totalGastos);
        //console.log(htmlLista);
        //console.log(elemento);
        //console.log(posicion);
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    document.getElementById("mensaje").value = "";

    // Lanza una advertencia si los gastos son superiores a 150
    if (totalGastos > 1500000) {
        mensaje.textContent = "Tus gastos son elevados, revisa tus costos.";
        mensaje.style.color = "red";
    } else {
        mensaje.textContent = "Tus gastos son moderados";
        mensaje.style.color = "green";
    }

    limpiar();
}

function limpiar() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("valorGasto").value = listaValoresGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionesGastos[posicion];

    //Guardar el indice del gasto que se va a modificar
    indiceModificacion = posicion;

    //cambiar la visibilidad de los botones
    document.getElementById("agregarGasto").style.display = "none";
    document.getElementById("actualizarGasto").style.display = "inline";
}

function actualizarGasto() {
    //Si hay un gasto en proceso de modificacion, actualiza los valores
    if (indiceModificacion !== null) {
        listaNombresGastos[indiceModificacion] = document.getElementById("nombreGasto").value;
        listaValoresGastos[indiceModificacion] = document.getElementById("valorGasto").value;
        listaDescripcionesGastos[indiceModificacion] = document.getElementById("descripcionGasto").value;

        actualizarListaGastos();
        limpiar();
    }
}
