import Router from "koa-router";
import koaBody from "koa-body";
import dotenv from "dotenv";
import path from "path";

// Services
import { rateLimiter } from "../security/rateLimiter";

const ROUTER_OPTIONS = {
    prefix: "/",
};

// Load environment variables from .env.development or .env
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});


/**
 * Router for handling requests to /api/giftcards.
 */
export default new Router(ROUTER_OPTIONS)

    /**
     */
    .get("/", rateLimiter(15, 1), koaBody(), async (ctx: any) => {
        ctx.body = "Hello, World!";
    })

