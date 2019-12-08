const Koa = require('koa')

const app = new Koa()


app.use(async (ctx, next) => {
    let start = new Date().getTime()
    console.log("第一层开始")
    await next()

    console.log('第一层结束')
    let end = new Date().getTime()
    let timer = end - start
    console.log(timer)
})
app.use(async (ctx, next) => {
    console.log("第二层开始")
    await next()
    console.log('第二层结束')
})

function aaa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log('-----')
            resolve('------')
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    console.log("第三层开始")
    await aaa()
    console.log('第三层结束')
})

app.listen(9090, () => {
    console.log("启动成功")
})