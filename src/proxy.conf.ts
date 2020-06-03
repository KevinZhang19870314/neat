
export const proxyTable = {
    "/public-api": {
        target: 'https://gorest.co.in', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        secure: false
    }
};