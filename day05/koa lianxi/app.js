
const Koa = require('koa')

const static = require('koa-static')

const router = require('koa-router')()

const path = require('path')

const bodyparser = require("koa-bodyparser")

let app = new Koa()

let query = require('./public/index')

app.use(static(path.join(__dirname, "public")))

app.use(bodyparser())

app
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/api/ls', async (ctx) => {
    // console.log(ctx.query) // let { limit } = ctx.query  // console.log(limit)
    let list = await query('select * from user')
    ctx.body = {
        code: 1,
        msg: "查询成功",
        data: list
    }
})

router.post('/api/lss', async (ctx) => {
    // console.log(ctx.request.body)
    let { username, password } = ctx.request.body
    // console.log(username, password)

    if (username && password) {
        let userlist = await query('select * from user where username=?', [username])
        if (userlist.length) {
            ctx.body = {
                code: 3,
                msg: "用户已存在"
            }
        } else {
            try {
                await query('insert into  user (username,password) values (?,?)', [username, password])
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "参数不对"
        }
    }
})

// 删除
router.get('/api/del', async (ctx) => {
    console.log(ctx.query)
    let { id } = ctx.query
    if (id) {
        await query('delete from user where id=?', [id])
        ctx.body = {
            code: 1,
            msg: "删除成功"
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "没有此id"
        }
    }
})

// 修改
router.post('/api/change', async (ctx) => {
    let { username, password, id } = ctx.request.body;
    // console.log(username, password, id)
    if (username && password && id) {
        let obj = await query('select * from user where id=?', [id])
        // console.log(obj[0].id)
        if (obj[0].username == username) {
            ctx.body = {
                code: 2,
                msg: "此用户已存在"
            }
        } else {
            try {
                await query('update user set username=?,password=? where id=?', [username, password, id])
                ctx.body = {
                    code: 1,
                    msg: "修改成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: "修改失败"
                }
            }
        }

    }

})

// 分页器
router.get('/api/fen', async (ctx) => {
    let { pagenum, limit } = ctx.query
    let oulist = await query(`select count(*) from user `)
    let start = (pagenum - 1) * limit
    try {
        let list = await query(`select * from user limit ${start},${limit}`)
        // console.log(list)
        ctx.body = {
            code: 1,
            msg1: list,
            data1: oulist[0]['count(*)']
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: "失败"
        }
    }
})

app.listen(3000, () => {
    console.log("成功")
})