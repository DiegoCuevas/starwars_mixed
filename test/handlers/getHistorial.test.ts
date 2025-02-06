import { handler } from '../../src/handlers/getHistorial';
import { DynamoDB } from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const scanMock = jest.fn();

  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        scan: scanMock,
      })),
    },
  };
});

const dynamoMock = new DynamoDB.DocumentClient() as jest.Mocked<DynamoDB.DocumentClient>;
const scanMock = dynamoMock.scan;

describe('getHistorial handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DYNAMODB_TABLE = 'TestTable';
  });

  it('should return a successful response with items', async () => {
    scanMock.mockReturnValueOnce({
      promise: jest.fn().mockResolvedValue({
        Items: [{ id: '1', name: 'Test Item' }],
      }),
    } as any);

    const event = {} as any; // Simulamos un evento vacío
    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual([{ id: '1', name: 'Test Item' }]);
    expect(scanMock).toHaveBeenCalledWith({ TableName: 'TestTable' });
  });

  it('should return an error response if DynamoDB fails', async () => {
    scanMock.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
    } as any);

    const event = {} as any;
    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Internal Server Error' });
  });
});
