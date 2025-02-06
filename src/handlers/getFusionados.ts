// src/handlers/getFusionados.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

// export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   try {
//     const swapiBaseUrl = 'https://swapi.dev/api/people/';
//     const characterIds = Array.from({ length: 10 }, (_, i) => i + 1);

//     const characterPromises = characterIds.map(async (id) => {
//       const response = await axios.get(`${swapiBaseUrl}${id}/`);
//       return response.data;
//     });

//     const characters = await Promise.all(characterPromises);

//     const weatherBaseUrl = 'https://api.open-meteo.com/v1/forecast';
//     const latitude = 40.7128; // Latitud de Nueva York (puedes cambiarla)
//     const longitude = -74.006; // Longitud de Nueva York (puedes cambiarla)

//     const weatherResponse = await axios.get(
//       `${weatherBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
//     );
//     const weather = weatherResponse.data;

//     // Fusionar datos de personajes y clima
//     const fusedData = characters.map((character) => ({
//       id: character.name,
//       character: {
//         name: character.name,
//         height: character.height,
//         mass: character.mass,
//         homeworld: character.homeworld,
//       },
//       weather: {
//         temperature: weather.current_weather.temperature + " " + weather.current_weather_units.temperature,
//       },
//       timestamp: new Date().toISOString(),
//     }));

//     console.log(fusedData, "fusedData");

//     const putPromises = fusedData.map((data) =>
//       dynamoDb
//         .put({
//           TableName: process.env.DYNAMODB_TABLE!,
//           Item: data,
//         })
//         .promise()
//     );

//     await Promise.all(putPromises);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(fusedData),
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Internal Server Error' }),
//     };
//   }
// };
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const swapiBaseUrl = 'https://swapi.dev/api/people/';
    const characterIds = Array.from({ length: 10 }, (_, i) => i + 1);

    const characterPromises = characterIds.map(async (id) => {
      const response = await axios.get(`${swapiBaseUrl}${id}/`);
      return response.data;
    });

    const characters = await Promise.all(characterPromises);

    const weatherBaseUrl = 'https://api.open-meteo.com/v1/forecast';
    const latitude = 40.7128; // Latitud de Nueva York (puedes cambiarla)
    const longitude = -74.006; // Longitud de Nueva York (puedes cambiarla)

    const weatherResponse = await axios.get(
      `${weatherBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weather = weatherResponse.data;

    // Fusionar datos de personajes y clima
    const fusedData = characters.map((character) => ({
      id: character.name,
      character: {
        name: character.name,
        height: character.height,
        mass: character.mass,
        homeworld: character.homeworld,
      },
      weather: {
        temperature: weather.current_weather.temperature + " " + weather.current_weather_units.temperature,
      },
      timestamp: new Date().toISOString(),
    }));

    console.log(fusedData, "fusedData");

    const putPromises = fusedData.map((data) =>
      dynamoDb
        .put({
          TableName: process.env.DYNAMODB_TABLE!,
          Item: data,
        })
        .promise()
    );

    await Promise.all(putPromises);

    return {
      statusCode: 200,
      body: JSON.stringify(fusedData),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};