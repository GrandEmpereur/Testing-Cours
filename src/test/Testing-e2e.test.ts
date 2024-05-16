import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('End-to-End Test', () => {
    it('should call /calldependance and return the correct message', async () => {
        const response = await axios.get('https://testing-cours-118ff93ae024.herokuapp.com/calldependance?name=World').catch((err) => err.response);
        expect(response.data).toBe('Hello, World!');
    });
});
