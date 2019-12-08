const Koa = require('koa')

const path = require('path')

const router = require('koa-router')()

const static = require('koa-static')

const query = require('./db/index')

// 封装的bodyparser
const bodyparser = require('./middleware/bodyparser')

const app = new Koa()

// 使用bodyparser
app.use(bodyparser())

app.use(router.routes())

app.use(static(path.join(__dirname, "public")))



// 整个数据

router.get('/api/getlist', async (ctx) => {
    let glist = await query('select * from list')
    ctx.body = {
        code: 1,
        glist
    }
})
// 分页器
router.get('/api/limit', async (ctx) => {
    let { page = 1, pagesize = 3 } = ctx.query
    console.log(page, pagesize)
    let total = await query('select count(*) from list') //总条数
    let start = (page - 1) * pagesize
    // console.log(total)
    try {
        let data = await query(`select * from list limit ${start} ,${pagesize}`)
        console.log(data)
        ctx.body = {
            code: 1,
            data,
            total: total[0]['count(*)']
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: "没有数据"
        }
    }
})

// 添加
router.post('/api/add', async (ctx) => {
    let { name, pasd } = ctx.request.body
    // console.log(name, pasd)
    if (name && pasd) {
        let namelist = await query('select * from list where name=?', [name])
        // console.log(namelist)
        if (namelist.length) {
            ctx.body = {
                code: 2,
                msg: "用户已存在"
            }
        } else {
            try {
                await query('insert into list (name,pasd) values (?,?)', [name, pasd])
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
            code: 3,
            msg: "参数不对"
        }
    }
})

// 删除
router.get('/api/del', async (ctx) => {
    let { id } = ctx.query
    console.log(id)
    if (id) {
        await query('delete from list where id=?', [id])
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
router.post('/api/edit', async (ctx) => {
    let { name, pasd, id } = ctx.request.body;
    if (name && pasd && id) {
        let obj = await query('select * from list where id=?', [id])
        // console.log(obj[0].id)
        if (obj[0].name == name) {
            ctx.body = {
                code: 2,
                msg: "此用户已存在"
            }
        } else {
            try {
                await query('update list set name=?,pasd=? where id=?', [name, pasd, id])
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

app.listen(3000, () => {
    console.log('服务启动成功')
})