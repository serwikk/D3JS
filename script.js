
var queue = d3.queue()

queue.await(function(error) {

    if (error) {
        console.error("Error al cargar los archivos:", error);
    } else {
        console.log("Todos los archivos se han cargado correctamente.");
        // Llamar a otras funciones o realizar cualquier operación necesaria aquí

       function cargarDatos() {
    return new Promise((resolve, reject) => {
        d3.json("https://raw.githubusercontent.com/serwikk/D3JS/main/all_billionaires_1997_2023.json")
            .then(function(data) {
                // Resolver la promesa con los datos sin modificar
                resolve(data);
            })
            .catch(function(error) {
                // Rechazar la promesa con el error
                reject(error);
            });
    });
}

// Llamar a la función cargarDatos() para cargar los datos
cargarDatos()
    .then(function(data) {
        // Ordenar los datos por 'net_worth' de mayor a menor
        data.sort((a, b) => b.net_worth - a.net_worth);
        
        // Filtrar los 20 primeros datos
        const top20 = data.slice(0, 20);
        
        // Llamar a la función para crear la visualización con los datos filtrados
        createBarChart(top20);
    })
    .catch(function(error) {
        console.error("Error al cargar los datos:", error);
    });

 
// Función para crear el gráfico de barras
function createBarChart(data) {
    // Configuración del gráfico
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
 
    // Crear el elemento SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    // Escaladores
    const xScale = d3.scaleBand().range([0, width]).padding(0.4);
    const yScale = d3.scaleLinear().range([height, 0]);
 
    // Dominios de los escaladores
    xScale.domain(data.map(d => d.name));
    yScale.domain([0, d3.max(data, d => +d.net_worth)]);
 
    // Colores
    const colorScale = d3.scaleOrdinal(d3.schemeCategory20);
 
    // Crear barras
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.name))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(+d.net_worth))
        .attr("height", d => height - yScale(+d.net_worth))
        .attr("fill", (d, i) => colorScale(i));
 
    // Agregar ejes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
 
    svg.append("g")
        .call(d3.axisLeft(yScale));
 
    // Agregar etiquetas de datos
    svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(+d.net_worth) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.net_worth.toLocaleString()); // Formatea el número a formato local
}
    }
});

