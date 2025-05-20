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

document.getElementById("modalButtonGrafica").addEventListener("click", () => {
    console.log("Se da click en el botón de la gráfica");
    despliegaGrafica();
});

const despliegaGrafica = () => {
    console.log("Se despliega la gráfica");

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            labels: generaEtiquetas(),
            datasets: [{
                label: '# De Votos',
                //data: [12, 19, 3, 5, 2, 3],
                data: generaDatos(),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

const generaEtiquetas = () => {
    const etiquetas = [];
    for (let i = 0; i < 100; i++) {
        etiquetas.push('Candidato' + i);
    }
    return etiquetas;
}

const generaDatos = () => {
    const datos = [];
    for (let i = 0; i < 100; i++) {
        datos.push(Math.floor(Math.random() * 100));
    }
    return datos;
}
