// Cargar el archivo JSON
d3.json('all_billionaires_1997_2023.json').then(function(data) {
    // Filtrar los datos para incluir solo aquellos cuyo valor en la columna "year" sea igual a 2023
    var filteredData = data.filter(function(d) {
        return d.year === 2023;
    });

    // Ordenar los datos por net worth en orden descendente
    filteredData.sort(function(a, b) {
        return b.net_worth - a.net_worth;
    });

    // Configurar las dimensiones del gráfico de barras
    var barChartWidth = 600;
    var barChartHeight = 400;
    var margin = { top: 30, right: 0, bottom: 30, left: 125 };

    // Crear el contenedor SVG para el gráfico de barras
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", barChartWidth + margin.left + margin.right)
                .attr("height", barChartHeight + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Escala para el eje x (ahora será la escala vertical)
    var yScale = d3.scaleBand()
                    .domain(filteredData.map(function(d) { return d.full_name; }))
                    .range([0, barChartHeight])
                    .padding(0.1);

    // Escala para el eje y (ahora será la escala horizontal)
    var xScale = d3.scaleLinear()
                    .domain([0, d3.max(filteredData, function(d) { return d.net_worth; })])
        .range([0, barChartWidth]);
    
    
    /*PRUEBA DE CHART CON EL TOTAL */

    sumaPorAnyos(data)
    

    // Agregar las barras al gráfico de barras con evento de clic
    svg.selectAll(".bar")
    .data(filteredData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("y", function(d) { return yScale(d.full_name); })
    .attr("height", yScale.bandwidth())
    .attr("x", 0) // La posición x comienza en 0
    .attr("width", function(d) { return xScale(d.net_worth); }) // El ancho depende del net worth
    .style("cursor", "pointer") // Cambia el cursor al pasar sobre las barras
    .on("click", function(event,d) {
        // Cambia la clase de todas las barras a la clase original
        svg.selectAll(".bar").classed("selected", false);
        // Cambia la clase de la barra seleccionada a la clase de selección
        d3.select(this).classed("selected", true);
        updateLineChart(d.full_name);
    });


    
    // Agregar el eje y al gráfico de barras
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Agregar el eje x al gráfico de barras
    svg.append("g")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(xScale));

    // Agregar título al eje y
    // svg.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - margin.left)
    //     .attr("x", 0 - (barChartHeight / 2))
    //     .attr("dy", "1em")
    //     .style("text-anchor", "middle")
    //     .text("Nombre");

    // Agregar título al eje x
    svg.append("text")
        .attr("transform", "translate(" + (barChartWidth / 2) + " ," + (barChartHeight + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Net Worth");

    // Agregar título al gráfico de barras
    svg.append("text")
        .attr("x", (barChartWidth / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        // .style("margin-top", "20px")
        .text("Net Worth de los billonarios en 2023 (billones de dólares)");



        
    // Actualizar el gráfico de líneas con la evolución del net worth para una persona seleccionada
    function updateLineChart(fullName) {
        // Filtrar los datos para la persona seleccionada
        var lineChartData = data.filter(function(d) {
            return d.full_name === fullName;
        });

        // Configurar dimensiones del gráfico de líneas
        var lineChartWidth = 600;
        var lineChartHeight = 400;
        var lineChartMargin = { top: 30, right: 20, bottom: 30, left: 70 };

        // Crear escala para el eje x
        var lineXScale = d3.scaleLinear()
                            .domain(d3.extent(lineChartData, function(d) { return d.year; }))
                            .range([0, lineChartWidth]);

        // Crear escala para el eje y
        var lineYScale = d3.scaleLinear()
                            .domain([0, d3.max(lineChartData, function(d) { return d.net_worth; })])
                            .range([lineChartHeight, 0]);

        // Crear la línea
        var line = d3.line()
                    .x(function(d) { return lineXScale(d.year); })
                    .y(function(d) { return lineYScale(d.net_worth); });

        // Eliminar el gráfico de líneas anterior
        d3.select("#line-chart").select("svg").remove();

        // Crear el contenedor SVG para el nuevo gráfico de líneas
        var lineSvg = d3.select("#line-chart")
                        .append("svg")
                        .attr("width", lineChartWidth + lineChartMargin.left + lineChartMargin.right)
                        .attr("height", lineChartHeight + lineChartMargin.top + lineChartMargin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + lineChartMargin.left + "," + lineChartMargin.top + ")");

        // Agregar la línea al gráfico de líneas
        lineSvg.append("path")
                .datum(lineChartData)
                .attr("class", "line")
                .attr("d", line);

        // Agregar el eje x al gráfico de líneas
        lineSvg.append("g")
                .attr("transform", "translate(0," + lineChartHeight + ")")
                .call(d3.axisBottom(lineXScale));

        // Agregar el eje y al gráfico de líneas
        lineSvg.append("g")
                .call(d3.axisLeft(lineYScale));

        // Agregar título al eje x del gráfico de líneas
        lineSvg.append("text")
                .attr("transform", "translate(" + (lineChartWidth / 2) + " ," + (lineChartHeight + lineChartMargin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Año");

        // Agregar título al eje y del gráfico de líneas
        // lineSvg.append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", 0 - lineChartMargin.left)
        //         .attr("x", 0 - (lineChartHeight / 2))
        //         .attr("dy", "1em")
        //         .style("text-anchor", "middle")
        //         .text("Net Worth");

        // Agregar título al gráfico de líneas
        lineSvg.append("text")
                .attr("x", (lineChartWidth / 2))
                .attr("y", 0 - (lineChartMargin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .text("Evolución del Net Worth: " + fullName + " (billones de dólares)");
    }
}).catch(function(error) {
    // Manejar el error si ocurre algún problema al cargar el archivo
    console.error('Error al cargar el archivo JSON:', error);
});

function sumaPorAnyos(data) {

    data_agrupada = data.reduce(function(acc, cur) {
        if (acc[cur.year]) {
            acc[cur.year] += cur.net_worth;
        } else {
            acc[cur.year] = cur.net_worth;
        }
        return acc;
    }, {});

    // Convertir el objeto agrupado en un array de objetos con propiedades year y net_worth
    var lineChartData = Object.keys(data_agrupada).map(function(year) {
        return { year: parseInt(year), net_worth: data_agrupada[year] };
    });

    console.log(lineChartData)

    // Configurar dimensiones del gráfico de líneas
    var lineChartWidth = 600;
    var lineChartHeight = 400;
    var lineChartMargin = { top: 30, right: 20, bottom: 30, left: 70 };

    // Crear escala para el eje x
    var lineXScale = d3.scaleLinear()
                        .domain(d3.extent(lineChartData, function(d) { return d.year; }))
                        .range([0, lineChartWidth]);

    // Crear escala para el eje y
    var lineYScale = d3.scaleLinear()
                        .domain([0, d3.max(lineChartData, function(d) { return d.net_worth; })])
                        .range([lineChartHeight, 0]);

    // Crear la línea
    var line = d3.line()
                .x(function(d) { return lineXScale(d.year); })
                .y(function(d) { return lineYScale(d.net_worth); });

    // Eliminar el gráfico de líneas anterior
    d3.select("#line-chart").select("svg").remove();

    // Crear el contenedor SVG para el nuevo gráfico de líneas
    var lineSvg = d3.select("#line-chart")
                    .append("svg")
                    .attr("width", lineChartWidth + lineChartMargin.left + lineChartMargin.right)
                    .attr("height", lineChartHeight + lineChartMargin.top + lineChartMargin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + lineChartMargin.left + "," + lineChartMargin.top + ")");

    // Agregar la línea al gráfico de líneas
    lineSvg.append("path")
            .datum(lineChartData)
            .attr("class", "line")
            .attr("d", line);

    // Agregar el eje x al gráfico de líneas
    lineSvg.append("g")
            .attr("transform", "translate(0," + lineChartHeight + ")")
            .call(d3.axisBottom(lineXScale));

    // Agregar el eje y al gráfico de líneas
    lineSvg.append("g")
            .call(d3.axisLeft(lineYScale));

    // Agregar título al eje x del gráfico de líneas
    lineSvg.append("text")
            .attr("transform", "translate(" + (lineChartWidth / 2) + " ," + (lineChartHeight + lineChartMargin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Año");

    // Agregar título al gráfico de líneas
    lineSvg.append("text")
            .attr("x", (lineChartWidth / 2))
            .attr("y", 0 - (lineChartMargin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Suma de Net Worth por Año: Total (billones de dólares)");

}

function reset() {
    location.reload();
}


