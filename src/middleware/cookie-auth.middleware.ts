import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../context";
import axios from 'axios';
/**
 * Global auth middleware 
 */
export class CookieAuthMiddleware implements MiddlewareInterface<Context> {

    async use({ context, info }: ResolverData<Context>, next: NextFn) {
        // Add HTTP Bearer Tokens
        if (context.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.token}`;
        }

        return next();
    }

}