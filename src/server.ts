import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()
app.use('/', express.static('dist'))
app.use(bodyParser.json())

app.get('/api/uploads/:id', (req, res) => {
  const annotationId = 'a1'

  res.json({
    snippets: [{
      id:    'x1',
      title: 'one',
      body:  'first body'
    }, {
      id:    'x2',
      title: 'two',
      body:  'second body'
    }],
    snippetSelections: [{
      snippetId:  'one',
      selections: [{
        annotationId, start: 0, end: 1
      }, {
        annotationId, start: 2, end: 3
      }]
    }]
  })
})

app.listen(process.env.PORT || 3000)
