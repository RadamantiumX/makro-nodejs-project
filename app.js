import express, { json } from 'express'

// import movies from './movies.json' assert { type: 'json' } Forma no oficial

import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config' // Importamos la configuracion de DOTENV
// import { type } from 'node:os'
// import fs from 'node:fs'

// Como leer un JSON en ESModules
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) // Alternativa: Parseamos a JSON

export const createApp = ({ movieModel }) => {
  const app = express()

  // MIDDLEWARE
  app.use(json())

  // CORS
  app.use(corsMiddleware())

  app.disable('x-powered-by')

  // Cargamos las rutas del enrrutador, siempre utilizando el mismo recurso de movies
  // A la funcion de rutas le tenemos que pasar el MODELO
  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234 // Utilizamos la variable de entorno del proceso

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
