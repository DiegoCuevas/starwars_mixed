// src/utils/cache.ts
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const CACHE_TABLE = 'api-cache-table';

export const getFromCache = async (key: string) => {
  const result = await dynamoDb
    .get({
      TableName: CACHE_TABLE,
      Key: { id: key },
    })
    .promise();

  if (result.Item && new Date().getTime() - result.Item.timestamp < 30 * 60 * 1000) {
    return result.Item.data;
  }
  return null;
};

export const saveToCache = async (key: string, data: any) => {
  await dynamoDb
    .put({
      TableName: CACHE_TABLE,
      Item: {
        id: key,
        data,
        timestamp: new Date().getTime(),
      },
    })
    .promise();
};