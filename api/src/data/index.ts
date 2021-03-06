import Knex from 'knex'
import logger from '../utils/logging'
import { IndividualCar } from '../external/api/general'
import { CarType } from '../external/api/cars'

const IS_DEV = process.env.NODE_ENV !== 'production'

let db: Knex
if (IS_DEV) {
  logger.info('Not in production, using dev database')
  db = require('./dev')
} else {
  logger.info('Running in PRODUCTION, using live database')
  throw new Error('Not implemented yet')
}

const CARS = 'cars'

type CarTable = {
  vin: string
  registered_year: string
  color: string
}
;(async () => {
  if (IS_DEV) {
    logger.warn('Running in dev DROP ALL mode')
    await db.schema.dropTable('cars')
  }

  const hasBeenInited = await db.schema.hasTable('cars')

  if (hasBeenInited) {
    logger.info('DB has already been initialized, skipping..')
    return
  }

  await db.schema.createTable('cars', tb => {
    tb.increments()
    tb.string('vin').notNullable()
    tb.dateTime('registered_year').notNullable()
    tb.string('color').notNullable()
  })
})()

const mapToCar = (car: IndividualCar): CarTable => ({
  vin: car.understellsnr,
  registered_year: car.siste_reg_dato,
  color: car.farge,
})

export const newCar = async (car: IndividualCar) => {
  const data: CarTable = mapToCar(car)

  logger.debug(`Inserting ${data.vin}`)

  await db(CARS).insert(data)
}

export const newCars = async (cars: IndividualCar[]) => {
  await db.transaction(async trx => {
    const inserts = cars.map(car =>
      db(CARS)
        .insert(mapToCar(car))
        .transacting(trx),
    )

    try {
      await Promise.all(inserts)
      await trx.commit()
    } catch (e) {
      console.log(e)
      logger.error(`Transaction failed, reason: ${e.message}`)
      await trx.rollback()
    }
  })
}

export const lastCars = async (): Promise<CarType[]> => {
  return db(CARS).select()
}
