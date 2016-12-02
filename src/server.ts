import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'

const app = express()
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(bodyParser.json())

app.post('/api/uploads', (request, response) => {
  const json = request.body
  json.id = 1
  response.status(201).json(json)
})

app.get('/api/uploads/:id', (request, response) => {
  response.json({
    snippets: [{
      id:    'x1',
      title: 'one',
      body:  'first body'
    }, {
      id:    'x2',
      title: 'two',
      body:  'second body'
    }],
    snippetSelections: {
      x1: [{
        annotationId: 'a1', start: 0, end: 3
      }, {
        annotationId: 'a2', start: 3, end: 6
      }]
    },
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

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 3000)
