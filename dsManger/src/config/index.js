import path from 'path'

const __dirname = path.resolve();
// const dbConfig =  'postgres://user:pass@example.com:5432/dbname'
// const dbConfig =  'sqlite::' + path.join(__dirname, 'database.db')
const dbConfig =  'sqlite:./database.db' 
const secretKey = `dwafawwg`
const expiresIn = '30d'

export {
    dbConfig,
    secretKey,
    expiresIn
}