import Router, { RouterContext } from "koa-router";
import { rateLimiter } from "../security/rateLimiter";
import { DatasetItem } from '../interfaces/Dataset.interface';

export const dataset: DatasetItem[] = [];

const datasetRoute = new Router({
    prefix: "/dataset"
});

datasetRoute.get("/", rateLimiter(15, 1), async (ctx: RouterContext) => {
    ctx.body = dataset;
});

export default datasetRoute;
