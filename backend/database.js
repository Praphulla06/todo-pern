import pg from 'pg'
import {config} from 'dotenv'

config();
const {Pool} = pg;

const pool = new Pool({
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "host": process.env.HOST,
    "port": process.env.HOST_DB,
    "database": process.env.DATABASE
})

export default pool;