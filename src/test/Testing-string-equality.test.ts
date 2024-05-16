import { beforeEach, describe, it, expect, afterEach } from 'vitest';
import { sayHelloTo } from '../utils/Testing-string-equality';

describe("The string package", () => {
    describe("the sayHelloTo function", () => {
        it("should return 'Hi, Peter!' if the argument is 'Peter'", () => {
            const actual = sayHelloTo("John");
            const expected = "Hi, John!";
            expect(actual).toBe(expected);
        });

        it("should throw an error if no argument is provided", () => {
            expect(() => sayHelloTo('')).toThrow("No data in argument");
        });
    });
});
