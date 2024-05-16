import axios from 'axios';

// Group 1, 3, 5: calldependance function
export async function calldependance(name: string): Promise<string> {
    console.log(`Calling /action?name=${name}`);
    const response = await axios.get(`http://localhost:3001/action?name=${name}`);
    console.log(`Response from /action: ${response.data}`);
    return response.data;
}

// Group 2, 4, 6: action function
export function action(name: string): string {
    return `Hello, ${name}!`;
}
