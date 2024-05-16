class User {
    name: string;
    email: string;
    errors: string[];

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.errors = [];
    }

    validateName(): void {
        if (this.name) {
            if (this.name.length < 5) {
                this.errors.push("the name must be at least 5 chars long");
            }
        } else {
            this.errors.push("the name is required");
        }
    }

    validateEmail(): void {
        console.log("validating email...");
    }

    validatePassword(): void {
        console.log("validating password...");
    }

    isValid(): void {
        this.validateName();
        this.validateEmail();
        this.validatePassword();
    }
}

export default User;
