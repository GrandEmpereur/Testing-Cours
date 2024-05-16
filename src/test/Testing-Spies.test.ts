import User from "../utils/Testing-Spies";
import { describe, it, expect, vi } from 'vitest';

describe("The isValid function", () => {
    it("should call validateName, validateEmail, validatePassword functions when isValid is called", () => {
        // Arrange
        const user = new User("smith", "smith@test.com");

        // Mock the methods
        const validateNameSpy = vi.spyOn(user, 'validateName');
        const validateEmailSpy = vi.spyOn(user, 'validateEmail');
        const validatePasswordSpy = vi.spyOn(user, 'validatePassword');

        // Action
        user.isValid();

        // Assertion
        expect(validateNameSpy).toHaveBeenCalled();
        expect(validateEmailSpy).toHaveBeenCalled();
        expect(validatePasswordSpy).toHaveBeenCalled();

        // Clean up
        validateNameSpy.mockRestore();
        validateEmailSpy.mockRestore();
        validatePasswordSpy.mockRestore();
    });
});
