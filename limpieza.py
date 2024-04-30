import pandas as pd
import csv
import json

def csv_to_df(csv_file):
    # Abre el archivo CSV y lee los datos
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        data = [row for row in csv_reader]

    # Convierte los datos a un DataFrame de pandas
    df = pd.DataFrame(data)
    return df

def csv_to_json(csv_file, json_file):
    # Obtén el DataFrame desde el archivo CSV
    df = csv_to_df(csv_file)

    print(df.columns)

    
    # Escribe el DataFrame en formato JSON
    df.to_json(json_file, orient='records', indent=4)

    print(f"El archivo CSV '{csv_file}' ha sido convertido exitosamente a JSON en '{json_file}'.")

# Nombre del archivo CSV de entrada y del archivo JSON de salida
csv_filename = 'all_billionaires_1997_2023.csv'
json_filename = 'salida.json'

# Llama a la función para convertir
csv_to_json(csv_filename, json_filename)
