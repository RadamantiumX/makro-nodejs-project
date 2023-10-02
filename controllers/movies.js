// import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js' // Validaciones
// import { MovieModel } from '../models/mongodb/movie.js'
// En el controlador decidimos que es lo vamos a RENDERIZAR
// Importamos el modelo con MYSQL
// import { MovieModel } from '../models/mysql/movie.js'

export class MovieController {
  constructor ({ movieModel }) { // El contructor va recibir un parametro del MODELO
    this.movieModel = movieModel
  }

  // Para obtener las peliculas
  getAll = async (req, res) => {
    const { genre } = req.query // Le pasamos el query params
    // Utilizamos el MODELO
    const movies = await this.movieModel.getAll({ genre }) // Llamamos al metodo estatico para conseguir todas las peliculas
    res.json(movies) // Devolvemos todas las peliculas
  }

  // Obtener una pelicula por ID
  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id }) // Utilizamos el MODELO
    if (movie) return res.json(movie) // Si la encuentra
    res.status(404).json({ message: 'Movie not found' })
  }

  // Crear un pelicula
  createMovie = async (req, res) => {
    const result = validateMovie(req.body) // Validamos
    // Si hay ERROR
    if (result.error) {
      // Parseamos para que nos muestre el ERROR correctamente
      return res.status(400).json({ error: JSON.parse(result.error.message) }) // Bad Request
    }
    const newMovie = await this.movieModel.createMovie({ input: result.data }) // Utilizamos el MODELO
    res.status(201).json(newMovie) // Codigo: Se ha creado el recurso
  }

  // Modificar parte de una pelicula
  updatedMovie = async (req, res) => {
    const result = validatePartialMovie(req.body)
    // Si falla la validacion
    if (!result.success) {
      return res.status(400).json({ erro: JSON.parse(result.error.message) })
    }

    // Recuperamos la id de los parametros
    const { id } = req.params
    const updatedMovie = await this.movieModel.updateMovie({ id, input: result.data }) // Utilizamos el MODELO

    // Devolvemos el JSON de la pelicula actualizada
    return res.json(updatedMovie)
  }

  // Eliminar una pelicula
  deletedMovie = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.deleteMovie({ id }) // Utilizamos el MODELO

    if (!result) { // Si la funcion nos devuelve FALSE
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
