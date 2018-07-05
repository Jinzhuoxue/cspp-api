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
import multer from 'multer'

let upload  = multer({ storage: multer.memoryStorage() });

const app = express()

app.post('/single', upload.single('file'), (req, res) => {
	console.dir(req.headers);
  console.log(req.body);
  console.log(req.file);
  res.send();
});

app.post('/array', upload.array('somefile'), (req, res) => {
  console.log(req.body)
  console.log(req.files);
  res.send();
});

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

// app.use(bodyParser.raw({ type: 'multipart/form-data' }))


// application/x-www-form-urlencoded
// text/plain
// application/json
//  text/xml
// text/html

app.use(responseTime())

//app.use(methodOverride())

app.use(boom());

// internal middleware
//app.use(middleware())

// Api endpoints
app.use('/api/v1/', router())

app.use('/', (req, res, next) => {
	// console.log('empty queried.');
  // console.log(req.body.user.name);
  //   console.log(req.body.user.email);
  res.boom.notFound();
  return
})

app.server.listen(process.env.PORT || 8080)

console.log(`Orsay Commerce Cloud REST API server is running`)
