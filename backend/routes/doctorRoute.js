import express from 'express'
import { doctorsList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel} from '../controllers/doctorControllers.js'
import { authDoctor } from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorsList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)


export default doctorRouter;