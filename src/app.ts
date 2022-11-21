require('dotenv').config()

import 'reflect-metadata'
import express from 'express'
import config from 'config'
import bodyParser from 'body-parser'
import { NOTHING } from './consts/nothing.const'
import { DbHelper } from './helpers/db.helper'
import { rootRouter } from './routers/root.router'
import { NothingType } from './types/nothing.type'

const port: string = config.get('port')
const app = express()

app.use(bodyParser.json())
app.use(rootRouter)

DbHelper.initialize()
  .then<NothingType>((): NothingType => {
    app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) })
    return NOTHING
  }).catch<never>((error): never => {
    console.error(error)
    process.exit(1)
})
