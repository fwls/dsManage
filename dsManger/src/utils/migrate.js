import db from "./db.js";
import * as models from '../models/index.js'

await db.sync({ alter: true });
