import * as _ from 'lodash'
import { Dictionary } from 'lodash'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Request } from 'express'
import * as path from 'path'
import * as pgPromise from 'pg-promise'
import { IDatabase } from 'pg-promise'
import { Annotation, HighlightSelection, Snippet } from './models'

const url = process.env.DATABASE_URL || 'postgres://localhost:5432/annot'
const db  = pgPromise()(url)

const app = express()
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(bodyParser.json())

/**
 * Save a single selection in the database.
 */
export const insertSelection = (
  { start, end, annotationId, snippetId, uploadId }:
  { start: number, end: number,
    annotationId: number, snippetId: number, uploadId: number },
  db: IDatabase<{}>
): Promise<void> => {
  return db.none(
    `INSERT INTO selections
       (start, finish, annotation_id, snippet_id, upload_id)
     VALUES ($1, $2, $3, $4, $5);`,
    [start, end, annotationId, snippetId, uploadId]
  )
}

/**
 * A simple abstraction over snippets and annotations, to tidy up the
 * signature of [[getDbIds]]. This abstraction could probably be used
 * in other places in the project, but right now it isn't, which is
 * why it lives here instead of in `models.ts`.
 */
type blob = {
  id:    string
  title: string
  body:  string
}

/**
 * Insert an array of items into the database, and return a map of
 * their client-provided temporary ID's to their permanent ID's in the
 * database.
 *
 * When the client submits an upload to be saved, it will have
 * generated its own page-unique ID's for each of the items. To
 * preserve the links between objects as they are saved in the
 * database, we need to provide a way of translating the client-side
 * ID's into database ones.
 */
export const getDbIds = (
  { blobs, uploadId, db, table }:
  { blobs: blob[], uploadId: number, db: IDatabase<{}>, table: string }
): Promise<Dictionary<number>> => {
  const promises: Promise<[string, number]>[] =
    blobs.map(({ id, title, body }, index) => (
      db.one(`INSERT INTO ${table} (title, body, upload_id, index)
              VALUES ($1, $2, $3, $4)
              RETURNING id;`,
             [title, body, uploadId, index])
        .then(row => [id, row.id])
    ))
  return Promise.all(promises).then(pairs => _.fromPairs(pairs))
}

const saveUplad = (request: Request): Promise<number> => {
  const getUploadId =
    db.one('INSERT INTO uploads DEFAULT VALUES RETURNING id;')
    .then(row => row.id)

  const annotationIds = getUploadId.then((uploadId) => getDbIds({
    blobs: request.body.annotations,
    db, table: 'annotations', uploadId
  }))

  const snippetIds = getUploadId.then((uploadId) => getDbIds({
    blobs: request.body.snippets,
    db, table: 'snippets', uploadId
  }))

  return Promise.all([getUploadId, annotationIds, snippetIds])
    .then(([uploadId, dbAnnotationIds, dbSnippetIds]) => {
      const snippetSelections = request.body.snippetSelections

      for (let clientSnippetId of Object.keys(snippetSelections)) {
        const snippetId = dbSnippetIds[clientSnippetId]

        for (let selection of snippetSelections[clientSnippetId]) {
          const annotationId = dbAnnotationIds[selection.annotationId]

          insertSelection({
            start: selection.start, end: selection.end,
            snippetId, annotationId, uploadId
          }, db)
        }
      }

      return uploadId
    })
}

app.post('/api/uploads', (request, response) => {
  saveUplad(request).then((uploadId) => {
    db.one('SELECT * FROM uploads WHERE id = $1;', uploadId)
      .then((upload) => response.status(201).json(upload))
  }).catch((error) => response.status(500).json(error))
})

type State = {
  snippets:          Snippet[]
  snippetSelections: { [snippetId: string]: HighlightSelection[] }
  annotations:       Annotation[]
}

app.get('/api/uploads/:id', (request, response) => {
  const uploadId = request.params.id

  const getSnippets = db.manyOrNone(
    `SELECT id, title, body FROM snippets
     WHERE upload_id = $1
     ORDER BY index;`,
    uploadId).then((snippets) => (
      snippets.map((snippet) => Object.assign({}, snippet, {
        id: 'snippet-' + snippet.id
      }))
    ))

  const getAnnotations = db.manyOrNone(
    `SELECT id, title, body FROM annotations
     WHERE upload_id = $1
     ORDER BY index;`,
    uploadId).then((snippets) => (
      snippets.map((snippet) => Object.assign({}, snippet, {
        id: 'annotation-' + snippet.id
      }))
    ))

  const getSelections = db.manyOrNone(
    `SELECT id, start, finish, annotation_id, snippet_id FROM selections
     WHERE upload_id = $1;`,
    uploadId)

  Promise.all([getSnippets, getAnnotations, getSelections])
    .then(([snippets, annotations, selections]) => {
      const json: State = { snippets, annotations, snippetSelections: {} }

      snippets.forEach((snippet) => {
        json.snippetSelections[snippet.id] = []
      })

      selections.forEach((selection) => {
        json.snippetSelections['snippet-' + selection.snippet_id].push({
          start:        selection.start,
          end:          selection.finish,
          annotationId: 'annotation-' + selection.annotation_id
        })
      })

      response.status(200).json(json)
    }).catch(error => {console.log(error);response.status(500).json(error)})
})

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 3000)
