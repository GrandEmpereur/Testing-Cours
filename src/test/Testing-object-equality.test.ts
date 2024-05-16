import User from "../utils/Testing-object-equality";
import { describe, it, expect } from 'vitest';

interface IUser {
    name: string;
    email: string;
    errors: string[];
}

describe("The User class", () => {
    it("should create a new user", () => {
        const user1 = new User("smith", "smith@test.com");
        const expectedUser: IUser = {
            name: "smith",
            email: "smith@test.com",
            errors: [],
        };
        expect(user1.name).toBe(expectedUser.name);
        expect(user1.email).toBe(expectedUser.email);
        expect(user1.errors).toEqual(expectedUser.errors);
    });

    describe("validateName", () => {
        it("should create new error message if the user name is less than 5 characters", () => {
            const user2 = new User("tom", "tom@test.com");
            user2.validateName();
            expect(user2.errors).toContain("the name must be at least 5 chars long");
        });

        it("should create new error message if the name is required", () => {
            const user3 = new User("", "user@test.com");
            user3.validateName();
            expect(user3.errors).toContain("the name is required");
        });
    });
});
