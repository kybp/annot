import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()
app.use('/', express.static('dist'))
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000)
