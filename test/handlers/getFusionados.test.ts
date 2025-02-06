import { handler } from '../../src/handlers/getFusionados';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('aws-sdk', () => {
  const mockPut = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        put: mockPut,
      })),
    },
  };
});

const mockAxios = new MockAdapter(axios);

describe('getFusionados Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  it('debe fusionar datos de SWAPI y la API meteorológica correctamente', async () => {
    // Mock de SWAPI para 10 personajes
    const swapiMocks = Array.from({ length: 10 }, (_, i) => ({
      name: `Character ${i + 1}`,
      height: `${160 + i}`,
      mass: `${70 + i}`,
      homeworld: `https://swapi.dev/api/planets/${i + 1}/`,
    }));
  
    swapiMocks.forEach((mock, index) => {
      mockAxios.onGet(`https://swapi.dev/api/people/${index + 1}/`).reply(200, mock);
    });
  
    // Mock de la API meteorológica
    mockAxios.onGet(/api.open-meteo.com/).reply(200, {
      current_weather: {
        temperature: 15,
      },
      current_weather_units: {
        temperature: '°C',
      },
    });
  
    // Ejecutar la función
    const result = await handler({} as any);
  
    // Verificar la respuesta
    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.length).toBe(10); // Debe haber 10 elementos fusionados
  });
  it('debe manejar errores correctamente', async () => {
    // Mock de error en SWAPI
    mockAxios.onGet('https://swapi.dev/api/people/1/').reply(500);

    // Ejecutar la función
    const result = await handler({} as any);

    // Verificar la respuesta de error
    expect(result.statusCode).toBe(500);
    expect(result.body).toContain('Internal Server Error');
  });
});