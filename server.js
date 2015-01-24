var things = require('./things'),
    parse = require("co-body"),
    compress = require('koa-compress'),
    logger = require('koa-logger'),
    serve = require('koa-static'),
    route = require('koa-route'),
    koa = require('koa');

var app = koa();

app.use(logger());

app.use(route.get('/data/:collectionName', things.list));
app.use(route.get('/data/:collectionName/:id', things.fetch));
app.use(route.post('/data/:collectionName', things.add));
app.use(route.put('/data/:collectionName/:id', things.modify));
app.use(route.delete('/data/:collectionName/:id', things.remove));

app.use(serve("web"));

app.use(compress());

app.listen(process.env.PORT);