import http           from 'http'
import bodyParser     from 'body-parser'
import express        from 'express'
import boom           from 'express-boom'
import methodOverride from 'method-override'
import router         from './router'
//import middleware     from './middleware'
import cors           from 'cors'
import helmet         from 'helmet'
import responseTime from 'response-time'

const app = express()

app.server = http.createServer(app)

// providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors())

// secure Express/Connect apps with various HTTP headers
app.use(helmet())
if (process.env.NODE_ENV !== 'production') {
  app.use(helmet.noCache())
}

// parses urlencoded bodies and only looks at requests where the Content-Type header matches the type 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded(
  { extended: false }
))

// app.use(bodyParser.urlencoded(
//   { extended: true }
// ))

// parses json and only looks at requests where the Content-Type header matches the type 'application/json'
app.use(bodyParser.json({
	limit : '100kb'
}))

app.use(bodyParser.raw({ type: 'application/json' }))

app.use(responseTime())

app.use(boom());

// internal middleware
//app.use(middleware())

// Api endpoints
app.use('/api/v1/', router())

app.use('/', (req, res, next) => {
  res.boom.notFound();
  return
})

let port = process.env.PORT || 8080

app.server.listen(port)

console.log(`REST API server is running on port : ${port}`)
