import * as dotenv from "dotenv";
import Koa from "koa";
import path from "path";
import cors from "@koa/cors";
import hotel from "./routes/hotel";
import mainRoute from "./routes/mainRoute";
import datasetRoute from "./routes/datasetRoute";
import functionRoutes from './routes/functionRoutes';

// Load environment variables from .env.development or .env
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

/**
 * Main entry point of the application.
 * Initializes the Koa application and starts the server.
 */
async function main(): Promise<void> {
    const app = await createApp();
    const port = process.env.PORT || 3001;  // Use port 3001 to match the tests
    console.log(`Server listening on port http://localhost:${port}`);
    app.listen(port);
}

/**
 * Initializes and configures the Koa application.
 * @returns The initialized Koa application.
 */
export async function createApp(): Promise<Koa> {
    const app = new Koa();

    // Enable CORS
    app.use(cors());

    app.use(hotel.routes());
    app.use(mainRoute.routes());
    app.use(datasetRoute.routes());
    app.use(functionRoutes.routes());  // Add the new routes

    // Global error handling middleware
    app.on('error', (err, ctx) => {
        console.error('server error', err);
        ctx.status = 500;
        ctx.body = {
            "status": 500,
            "message": "Internal server error",
            "error": err.message || " "
        };
    });

    return app;
}

if (!module.parent) {
    main();
}

export default createApp;
