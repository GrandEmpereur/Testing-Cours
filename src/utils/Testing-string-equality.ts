export function sayHelloTo(person: string) {
    if (!person) {
        throw new Error("No data in argument");
    }
    return `Hi, ${person}!`;
}
