const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})



router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
//个人主页
router.get('/profile/:userName',async(ctx,next)=>{
  const {userName} = ctx.params;//获取参数
  ctx.body = {
    title:'this is a profile page!',
    userName
  }
})

//加载更多
router.get('/loadMore/:userName/:pageIndex',async(ctx,next)=>{
  const{userName,pageIndex} = ctx.params;
  ctx.body={
    title:'this is loadMore API',
    userName,
    pageIndex
  }
})
module.exports = router
