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
    
    Swal.fire({
        title: 'Multi App JS',
        text: "Generando Gráfica ...",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false
    });
    
    despliegaGrafica();
});

const despliegaGrafica = async () => {
    console.log("Se despliega la gráfica");

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: await generaEtiquetas(),
            datasets: [{
                label: '# De Votos',
                data: await generaDatos(),
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

    Swal.close();

}

const generaEtiquetas = async () => {
    const etiquetas = [];

    try {
        await getPersonasData().then((personas) => {
            console.log('Personas: ', personas);
            console.log('Cuantas Personas: ', personas.length);
            personas.forEach((persona) => {
                console.log('Persona: ', persona.first_name + " " + persona.last_name);
                etiquetas.push(persona.first_name + " " + persona.last_name);
            });
        });
    
        return etiquetas;
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
            title: "Multi App JS",
            text: "Error al cargar la información de personas",
            icon: "error",
        });
        return etiquetas;
    }
  
}

const generaDatos = async () => {
    const datos = [];
    let numPersonas = 0;

    try {
        await getPersonasData().then((personas) => {        
            console.log('Cuantas Personas: ', personas.length);
            numPersonas = personas.length;
            for (let i = 0; i < numPersonas; i++) {
                datos.push(Math.floor(Math.random() * 100));
            }   
        });
       
        return datos;    
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
            title: "Multi App JS",
            text: "Error al cargar la información de personas",
            icon: "error",
        });
        return datos;
    }

}

const getPersonaData = async () => {
    // Si se necesitan varias personas usar: https://randomuser.me/api/?results=10
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    console.log('datos: ',data);
    return data.results[0];
}

const getPersonasData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", "2c31e070");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://my.api.mockaroo.com/clientes_mockaroo.json", requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('datos: ',data);
        return data;        
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
            title: "Multi App JS",
            text: "Error al cargar la información de personas",
            icon: "error",
        });
        return [];
    }
}