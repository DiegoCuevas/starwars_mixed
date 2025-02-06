# API de Starwars mixed

Esta API proporciona endpoints para fusionar, almacenar y mostrar los datos de la API de starwars y una api de clima.
Está construida con AWS Lambda, API Gateway y DynamoDB.

## Requisitos previos

- Node.js (versión 20.x o superior)
- AWS CLI configurado con las credenciales adecuadas
- Serverless Framework instalado globalmente (`npm install -g serverless`)

## Configuración

1. Clona este repositorio:

   ```
   git clone git@github.com:DiegoCuevas/starwars_mixed.git
   cd starwars_mixed
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Crea un archivo `.env` como el .env_template, en la raíz del proyecto con el siguiente contenido:

   ```
   TABLE=nombre_de_tu_tabla_dynamodb
   ```

   Reemplaza `nombre_de_tu_tabla_dynamodb` con el nombre real de tu tabla en DynamoDB.

4. Despliega la aplicación:
   ```
   serverless deploy
   ```

## Uso

La API proporciona los siguientes endpoints:

### GET /fusionados

Este endpoint debe consultar ambas APIs y devolver los datos fusionados.

Ejemplo de solicitud:

```
curl --location 'https://9ex8my4ja6.execute-api.us-east-1.amazonaws.com/dev/fusionados'
```

### POST /almacenar

Permite almacenar información personalizada (no relacionada con las APIs externas) en la base de datos.

Ejemplo de solicitud:

```
bash
curl --location 'https://9ex8my4ja6.execute-api.us-east-1.amazonaws.com/dev/almacenar' \
--header 'Content-Type: application/json' \
--data '   {
   "id": "Luke Skywalker",
   "character": {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "homeworld": "https://swapi.dev/api/planets/1/"
   },
   "weather": {
      "temperature": "-1.2 °C"
   },
   "timestamp": "2025-02-06T00:27:48.564Z"
}'
```

### GET /historial

Retorna el historial de todas las respuestas almacenadas por el endpoint /fusionados, ordenado
cronológicamente y paginado.

Ejemplo de solicitud:

```
curl --location 'https://9ex8my4ja6.execute-api.us-east-1.amazonaws.com/dev/historial'
```

# Desarrollo

Para ejecutar la aplicación localmente:

```
serverless offline
```

# Pruebas

Usé la libreria `jest` para algunas pruebas unitarias.

Para ejecutar las pruebas es con el siguiente comando:

```
npm test
```
