import moment from 'moment'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import Reservation from '../models/Reservation.js'
import CustomError from '../interfaces/custom_error_class.js'
import { BAD_REQUEST, NOT_CHANGED } from '../constants/status_codes.js'

class ReservationRepository{
    static async getAllReservations(status){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    if(status != undefined){
                        const reservations = await Reservation.find({ status }).populate([
                            {
                                path: 'user',
                                ref: 'User'
                            },
                            {
                                path: 'technician',
                                ref: 'Technician'
                            }
                        ])
                        return resolve(reservations)
                    }

                    const reservations = await Reservation.find({}).populate([
                        {
                            path: 'user',
                            ref: 'User'
                        },
                        {
                            path: 'technician',
                            ref: 'Technician'
                        }
                    ])
                    return resolve(reservations)
                }
            )
        )
    }
    static async getUserReservations(user){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {

                    const reservations = await Reservation.find({user:user}).populate([
                        {
                            path: 'user',
                            ref: 'User'
                        },
                        {
                            path: 'technician',
                            ref: 'Technician'
                        }
                    ])
                    return resolve(reservations)
                }
            )
        )
    }

    static async getAllReservationsCount(){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const count = await Reservation.countDocuments({})
                    return resolve(count)
                }
            )
        )
    }

    static async deleteAllReservations(){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const result = await Reservation.deleteMany({})
                    if(result.deletedCount == 0 && await this.getAllReservationsCount() != 0){
                        const delete_reservation_error = new CustomError('Failed to delete all Reservations', NOT_CHANGED)
                        return reject(delete_reservation_error)
                    }

                    return resolve('All Reservations were deleted successfully')
                }
            )
        )
    }

    static async deleteReservation(reservation_id){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const result = await Reservation.deleteOne({ _id: reservation_id })
                    if(result.deletedCount == 0){
                        const delete_reservation_error = new CustomError('Failed to delete reservation', NOT_CHANGED)
                        return reject(delete_reservation_error)
                    }

                    return resolve('reservation was deleted successfully')
                }
            )
        )
    }

    static async createReservation({user, technician, date, time}){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const existingSameReservation = await Reservation.findOne({
                        technician,
                        user,
                        date,
                        time:time
                    })

                    if(existingSameReservation){
                        const already_booked_error = new CustomError("You Already Have This Booking", BAD_REQUEST)
                        return reject(already_booked_error)
                    }

                    const otherExistingReservation = await Reservation.findOne({
                        technician,
                        date,
                        time:time
                    })

                    if(otherExistingReservation){
                        const already_booked_error = new CustomError("Date Is Taken By Another User", BAD_REQUEST)
                        return reject(already_booked_error)
                    }

                    const existingDelayedReservations = await Reservation.find({
                        technician,
                        date,
                        $or: [
                          { time: (+time + 1).toString() },
                          { time: (+time - 1).toString() } 
                        ]
                    });

                    if(existingDelayedReservations.length > 0){
                        const invalid_date_error = new CustomError('Please try another time', BAD_REQUEST)
                        return reject(invalid_date_error)
                    }

                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')
                    const reservation = await Reservation.create({
                        created_at,user, technician, date, time
                    })

                    return resolve(reservation)
                }
            )
        )
    }

    static async completeReservation(reservation_id){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const completed_at = moment().format('DD-MM-YYYY HH:mm:ss')
                    const reservation = await Reservation.updateOne({ _id: reservation_id },{
                        status: 'completed', completed_at
                    })

                    return resolve(reservation)
                }
            )
        )
    }
}

export default ReservationRepository