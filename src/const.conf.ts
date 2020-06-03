export const Configuration = {
    BaseUrlDev: 'https://gorest.co.in',
    BaseUrlPro: 'https://gorest.co.in'
}

export function getBaseUrl() {
    return <any>process.env['NODE_ENV'] === 'production' ? Configuration.BaseUrlPro : Configuration.BaseUrlDev;
}