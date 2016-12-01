import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()
app.use('/', express.static('dist'))
app.use(bodyParser.json())

app.get('/api/uploads/:id', (req, res) => {
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
      snippetId:  'x1',
      selections: [{
        annotationId: 'a1', start: 0, end: 3
      }, {
        annotationId: 'a2', start: 3, end: 6
      }]
    }],
    annotations: [{
      id:    'a1',
      title: 'un',
      body:  'the first annotation'
    }, {
      id:    'a2',
      title: 'deux',
      body:  'the second annotation'
    }]
  })
})

app.listen(process.env.PORT || 3000)
