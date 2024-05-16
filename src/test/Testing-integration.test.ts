import { describe, it, beforeEach, afterEach, expect, beforeAll, afterAll } from 'vitest';
import { Server, createServer } from 'http';
import request from 'supertest';
import { createApp } from '../server';
//@ts-ignore
import faker from 'faker-br';
import getPort from 'get-port';
import { dataset } from '../routes/datasetRoute';
import { DatasetItem } from '../interfaces/Dataset.interface';

let server: Server;
let serverAddress: string;

beforeAll(async () => {
    const app = await createApp();
    const port = await getPort();
    server = createServer(app.callback()).listen(port);
    serverAddress = `http://localhost:${port}`;
});

beforeEach(() => {
    // Create a new dataset with random faker data
    dataset.length = 0; // Clear the existing dataset
    for (let i = 0; i < 10; i++) {
        dataset.push({
            streetName: faker.address.streetName(),
            streetNumber: faker.address.streetAddress(),
        });
    }
});

afterEach(() => {
    // Clear dataset
    dataset.length = 0;
});

afterAll(() => {
    server.close();
});

describe('Integration testing with supertest and faker-br', () => {
    it('should have a dataset with 10 items', () => {
        expect(dataset).toHaveLength(10);
    });

    it('should contain valid street names and numbers', () => {
        dataset.forEach((item: DatasetItem) => {
            expect(item.streetName).toBeTruthy();
            expect(item.streetNumber).toBeTruthy();
        });
    });
});

describe('API Endpoints', () => {
    it('should respond with 200 on GET /', async () => {
        const response = await request(serverAddress).get('/');
        expect(response.status).toBe(200);
    });

    it('should respond with a valid dataset on GET /dataset', async () => {
        const response = await request(serverAddress).get('/dataset');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                streetName: expect.any(String),
                streetNumber: expect.any(String),
            }),
        ]));
    });
});
