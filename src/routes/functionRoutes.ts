import Router, { RouterContext } from 'koa-router';
import { calldependance, action } from '../function';
import { rateLimiter } from '../security/rateLimiter';

const router = new Router();

router.get('/action', rateLimiter(15, 1), async (ctx: RouterContext) => {
    const name = ctx.query.name as string;
    console.log(`Received /action request with name: ${name}`);
    ctx.body = action(name);
});

router.get('/calldependance', rateLimiter(15, 1), async (ctx: RouterContext) => {
    const name = ctx.query.name as string;
    console.log(`Received /calldependance request with name: ${name}`);
    const result = await calldependance(name);
    console.log(`Response from /calldependance: ${result}`);
    ctx.body = result;
});

export default router;
