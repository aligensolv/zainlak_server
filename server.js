import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from'cors'
import express from 'express'
import { port } from './config.js'

import {NOT_FOUND} from './constants/status_codes.js'

import CategoryApi from './routes/category.js'
import UserApi from './routes/user.js'
import OtpApi from './routes/otp.js'
import TechnicianApi from './routes/technician.js'
import ProductApi from './routes/product.js'
import AboutApi from './routes/about.js'
import TermsApi from './routes/terms.js'
import ReservationApi from './routes/reservation.js'
import ManagerApi from './routes/managers.js'
import SliderApi from './routes/slider.js'
import logger from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express();

app.use(cors())


app.use('/public',express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './public')))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    '/api', 
    CategoryApi,
    UserApi,
    OtpApi,
    TechnicianApi,
    ProductApi,
    AboutApi,
    TermsApi,
    ReservationApi,
    ManagerApi,
    SliderApi
)

app.use(ErrorHandlerMiddleware)

app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        let lib = await import('./utils/database_connection.js')
        if(await lib.default){
            app.listen(port, () => console.log(`[server] listening on ${port}`))
        }
    }catch(err){
        logger.error(err.message)
    }
}
main()
