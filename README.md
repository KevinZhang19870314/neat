# neat

neat - **N**odejs + **E**xpress + **A**pollo server + **T**ype-graphql

A nodejs server app demo integrate with express, type-graphql, apollo server and gorest open api.

### 1. Go to gorest sign in page to get a token: https://gorest.co.in/user/login.html;
### 2. Paste token to index.ts Context.token property;
```js
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
```
### 3. npm i;
### 4. npm start, open http://localhost:4000/graphql.
