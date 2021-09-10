const router = require('koa-router')()
var robot = require('robotjs')


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  var mouse = robot.getMousePos()
  console.log()
  ctx.body = 'Mouse is at x:' + mouse.x + ' y:' + mouse.y
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
