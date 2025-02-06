// src/handlers/almacenar.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || '{}');

    const item = {
      id: new Date().toISOString(),
      ...body,
    };

    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE!,
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};