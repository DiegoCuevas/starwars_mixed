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
   git clone git@github.com:DiegoCuevas/starShips-aws.git
   cd api-naves
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

### GET /starships

Obtiene todas las naves estelares.

Ejemplo de solicitud:
```
curl https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips

```
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
--data '{
  "nombre": "X-wing2",
  "modelo": "T-65 X-wing2",
  "fabricante": "Incom Corporation2",
  "costoEnCreditos": "149999",
  "longitud": "12.5",
  "velocidadMaximaAtmosfera": "1050",
  "tripulacion": "1"
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
Usé la libreria `vitest` para algunas pruebas unitarias.

Para ejecutar las pruebas es con el siguiente comando:
```
npm test
```