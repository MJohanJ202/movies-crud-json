import { Request, Response } from 'express'
import { uuid } from '../../consts.js'
import { models } from '../../models/index.js'

const moviesModel = models.movies

const getAll = async (req: Request, res: Response) => {
  const { genre } = req.query

  if (genre) {
    const movies = await moviesModel.find({ queryName: 'genre', queryValue: genre })
    return res.send({ success: true, data: { movies } })
  }

  const movies = await moviesModel.findAll()
  return res.send({ success: true, data: { movies } })
}

const getById = async (req: Request, res: Response) => {
  const id = req.params['id'] as uuid
  const movie = await moviesModel.findById(id)

  if (!movie) return res.status(404).send({ success: false, error: 'Movie not found.' })
  return res.send({ success: true, data: { movie } })
}

const create = async (req: Request, res: Response) => {
  try {
    const movieId = await moviesModel.create(req.body)
    return res.status(201).send({ success: true, message: 'Created successfully!', data: { movieId } })
  } catch (err) {
    console.log('Error in creating a movie: ', err)
    return res.status(500).send({ success: false, errors: [err] })
  }
}

const update = async (req: Request, res: Response) => {
  const { body, params } = req
  const movieId = params['id'] as uuid
  try {
    const saveMovie = await moviesModel.update(movieId, body)
    return res.status(200).send({ success: true, data: { saveMovie } })
  } catch (error) {
    console.log('Error updating the movie: ', error)
    return res.status(500).send({ success: false, errors: [error] })
  }
}

const remove = async (req: Request, res: Response) => {
  const movieId = req.params['id'] as uuid
  try {
    await moviesModel.delete(movieId)
    return res.status(200).send({ success: true, message: "Deleted Successfully!" })
  } catch (e) {
    return res.status(500).send({ success: false, errors: ['Server Error'] })
  }
}

export { create, getAll, getById, remove, update }

