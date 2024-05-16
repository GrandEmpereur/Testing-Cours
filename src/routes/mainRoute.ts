import Router, { RouterContext } from "koa-router";
import dotenv from "dotenv";
import path from "path";
import { rateLimiter } from "../security/rateLimiter";

const ROUTER_OPTIONS = {
    prefix: "/",
};

// Load environment variables from .env.development or .env
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

export default new Router(ROUTER_OPTIONS)

    .get("/", rateLimiter(15, 1), async (ctx: RouterContext) => {
        ctx.body = {
            "message": "Welcome to the hotel API"
        }
    })

    .get("/dataset", rateLimiter(15, 1), async (ctx: RouterContext) => {
        ctx.body = {
            "message": "Welcome to the hotel API",
        }
    })