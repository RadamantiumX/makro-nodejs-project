import mysql from 'mysql2/promise' // Para utilizar las promesas

// Configuración de conexion
const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'movies_db'
}

// Le pasamos las credenciales de la BASE DE DATOS EN PRODUCCION o por defecto la LOCAL
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

// Establecemos la conexion
const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      // Tomamos el parametro y lo pasamos a minuscula
      const lowerCaseGenre = genre.toLowerCase()

      // Obtenemos los datos en consulta por genero
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]) // Se hace de esta forma para evitar el SQL INYECTION, lo tranforma en una cadena de texto que no se puede evaluar

      // Si no encuentra el genero
      if (genres.length === 0) return []

      // Obtenemos la ID del primer resultado de genre
      const [{ id }] = genres

      return []
    }
    // Realizamos la consulta
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, UUID() AS id FROM movie;'
      // 'SELECT * FROM movie;'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, UUID() id FROM movie WHERE id = ?', [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }

  static async createMovie ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // Creamos el UUID por medio de MYSQL
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult
    try {
    // Utilizamos el UUID
      const result = await connection.query('INSERT INTO movie (id, title,year, director, duration, poster, rate) VALUES ( ?,?,?,?,?,?,? )', [uuid, title, year, director, duration, poster, rate])
    } catch (e) { // Menejamos los errores
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query('SELECT * FROM movie WHERE id = ?', [uuid])

    return movies[0]
  }

  static async deleteMovie ({ id }) {
    // Primero verificamos la existencia de esa ID
    const [movieIndex] = await connection.query('SELECT * FROM movie WHERE id = ?', [id])
    if (movieIndex.length === 0) return false
    // Si existe pasamos a borrar esa pelicula
    const [movies] = await connection.query('DELETE FROM movie WHERE id = ?', [id])
    return true
  }

  static async updateMovie ({ id, input }) {
    // Primero verificamos al existencia de esa ID
    const [movieIndex] = await connection.query('SELECT * FROM movie WHERE id = ?', [id])
    if (movieIndex.length === 0) return false
    // Si existe, separamos la KEY del VALUE para utilizarlos en la sentencia SQL
    for (const [key, value] of Object.entries(input)) {
      try {
        const result = await connection.query(`UPDATE movie SET ${key} = ${value} WHERE id = ?`, [id])
      } catch (e) {
        throw new Error('Error to update movie')
      }
    }
    // Si todo salio bien, mostramos nuevamente esa pelicula modificada
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, UUID() id FROM movie WHERE id = ?', [id])

    return movies[0] // Retornamos valor de pelicula modificada
  }
}
