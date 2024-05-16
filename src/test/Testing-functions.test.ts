import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { calldependance, action } from '../function';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('action function', () => {
    it('should return a greeting message', () => {
        const result = action('World');
        expect(result).toBe('Hello, World!');
    });
});

describe('calldependance function', () => {
    it('should call the /action endpoint and return the response', async () => {
        mockedAxios.get.mockResolvedValue({ data: 'Hello, World!' });
        const result = await calldependance('World');
        expect(result).toBe('Hello, World!');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/action?name=World');
    });
});
