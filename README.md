# D3JS

## El proyecto consta de los siguientes archivos:  
- all_billionaires_1997_2023.csv: es el archivo del que se obtienen los datos originales.
    + URL: https://www.kaggle.com/datasets/guillemservera/forbes-billionaires-1997-2023
- LimpiezaDatasetD3.ipynb: archivo jupyter utilizado para:
    + Filtrar del archivo original por los top 10 billonarios del 2023
    + Obtener de estos 10 millonarios la evolución de su net_worth
    + Eliminar los atributos sobrantes   
- all_billionaires_1997_2023.json: es el archivo final que será utilizado en el desarrollo de la actividad

- index.html: contiene la estructura de la página web 
- script.js: añade interactividad a los gráficos de D3.js
- styles.css: proporciona estilos para mejorar el aspecto visual de la página

## Modo de uso
Para poder acceder a la actividad, es necesario disponer de algún tipo de servidor, como puede ser la extensión *Live Server* de VSCode.  
A continuación, habrá que abrir el archivo *index.html* en el navegador con el servidor. En el caso de *Live Server*, la URL debería ser la siguiente:
`http://localhost:5500/index.html`

Una vez cargado el archivo, se podrá ver dos gráficos:
- **Net Worth de los billonarios en 2023 (billones de dólares) [1]**: representa el ránking de los 10 billonarios más ricos ordenados de forma descendente.
- **Suma de Net Worth por Año: Total (billones de dólares) [2]**: al cargar la página, esta gráfica representará el neto total de todos los años de todos los billonarios sumados.

Cuando se selecciona una de las barras de la gráfica [1], la gráfica [2] se actualizará, mostrando la suma de Net Worth por Año del billonario seleccionado.

También se dispondrça de un botón interactivo **Resetear**, que servirá para recargar la página y por consiguiente, ver de nuevo la gráfica [2] del total.