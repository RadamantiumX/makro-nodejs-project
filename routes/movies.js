import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
// Inicializamos y exportamos ROUTER
  const movieRouter = Router()

  // Creamos una nueva instancia del CONTROLADOR
  const movieController = new MovieController({ movieModel })

  // Utilizamos la ASINCRONIA para los MODELOS: No esperamos como se pueden manejar los datos
  // Llamamos al controlador para realizar las operaciones

  // Utilizamos la nueva instancia

  // Ruta: Obtener todas las peliculas
  movieRouter.get('/', movieController.getAll)

  // Para crear una pelicula
  movieRouter.post('/', movieController.createMovie)

  // Para obtener una pelicula por el ID
  movieRouter.get('/:id', movieController.getById)

  // Para borrar una pelicula por el ID
  movieRouter.delete('/:id', movieController.deletedMovie)

  // Para modificar parte de una pelicula
  movieRouter.patch('/:id', movieController.updatedMovie)

  return movieRouter
}
