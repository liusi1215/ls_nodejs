
const qs = require('querystring')

function postparam(ctx) {
    return new Promise((resolve, reject) => {
        let str = ''
        ctx.req.on('data', (chunk) => {
            str += chunk
            console.log(str)
        })
        ctx.req.on('end', () => {
            resolve(qs.parse(str))
        })
    })
}


module.exports = () => {
    return async (ctx, next) => {
        ctx.request.body = await postparam(ctx)
        await next()
    }
}