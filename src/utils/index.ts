import { Router } from "express";
import middleware from "../middleware";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middleware: Wrapper[],
    router: Router
) => {
    for (const f of middleware) {
        f(router);
    }
}
