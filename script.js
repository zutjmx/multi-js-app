document.getElementById("modalButtonDetalle").addEventListener("click", () => {
    console.log("Se da click en el botón de detalle");
    infoGeneralColombia();
});

async function infoGeneralColombia() {
    try {
        const response = await fetch('https://api-colombia.com/api/v1/Country/Colombia');
        
        if (!response.ok) {
            Swal.fire({
                title: "Colombia API",
                text: "Error al cargar la información de Colombia",
                icon: "error",
            });
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        
        console.log(data);

        despliegaDatos(data);

        Swal.fire({
            title: "Colombia API",
            text: "Se ha cargado la información de Colombia",
            icon: "success",
        });

    } catch (error) {
        Swal.fire({
            title: "Colombia API",
            text: "Error al cargar la información de Colombia",
            icon: "error",
        });
        console.error('Error fetching data:', error);
    }    
}

const despliegaDatos = (datos) => {
    const titulo = document.getElementById("tituloCabecera");
    const descripcion = document.getElementById("tituloDescripcion");
    const capital = document.getElementById("tituloCapital");
    titulo.innerHTML = datos.name;
    descripcion.innerHTML = datos.description;
    capital.innerHTML = datos.stateCapital;
}