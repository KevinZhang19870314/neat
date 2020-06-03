import "reflect-metadata";
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { Context } from "./context";
import { buildLoginRoute } from "./login/login";
import { proxyTable } from './proxy.conf';
import * as cookieParser from 'cookie-parser';
import { CookieAuthMiddleware } from "./middleware/cookie-auth.middleware";
import { Configuration, getBaseUrl } from "./const.conf";
import { resolvers } from "./resolvers";

async function bootstrap() {
    // Only for localhost https unsafe cert
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = <any>0;

    console.log(process.env['NODE_ENV']);

    const schema = await buildSchema({
        resolvers: resolvers,
        container: Container,
        globalMiddlewares: [CookieAuthMiddleware]
    });

    // Create GraphQL server
    const server = new ApolloServer({
        schema,
        persistedQueries: false,
        context: (integrationContext: { req: http.IncomingMessage, res: http.ServerResponse }) => {
            let ctx: Context = {
                req: integrationContext.req,
                res: integrationContext.res,
                mode: <any>process.env['NODE_ENV'] || 'development',
                baseUrl: getBaseUrl(),
                // TODO: kevinzhang paste the real token for gorest
                token: '###token###'
            }

            return ctx;
        },
        playground: {
            settings: {
                "request.credentials": "same-origin"
            }
        }
    });

    const app = express();
    // proxy api requests
    if (process.argv.indexOf('--localhost') > -1) {
        console.log('proxy api requests...');
        Object.keys(proxyTable).forEach(function (context) {
            var options = proxyTable[context]
            if (typeof options === 'string') {
                options = { target: options }
            }
            app.use(createProxyMiddleware(options.filter || context, options))
        });
    }

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    buildLoginRoute(app);

    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000/graphql`)
    });
}

bootstrap();

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}