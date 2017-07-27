import http           from 'http'
import bodyParser     from 'body-parser'
import express        from 'express'
import boom           from 'express-boom'
import methodOverride from 'method-override'
import router         from './router'
import middleware     from './middleware'
import cors           from 'cors'

const app = express()

app.server = http.createServer(app)

app.use(cors())

app.use(bodyParser.urlencoded(
  { extended: false }
))

app.use(bodyParser.json({
	limit : '100kb'
}))

app.use(methodOverride())

app.use(boom());

// internal middleware
app.use(middleware())

// Api endpoints
app.use('/api/v1/', router())

app.use('/', (req, res, next) => {
  res.boom.notFound('missing');
  return
})

app.server.listen(process.env.PORT || 8080)

console.log(`REST API server is listening at ${app.server.address().port} 🌏`)
