import { Sequelize } from 'sequelize'
import { dbConfig } from '../config/index.js'

const db = new Sequelize(dbConfig)

export default db
    
