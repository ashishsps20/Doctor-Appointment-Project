import express from 'express'
import { doctorsList, loginDoctor, appointmentsDoctor } from '../controllers/doctorControllers.js'
import { authDoctor } from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorsList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)

export default doctorRouter;