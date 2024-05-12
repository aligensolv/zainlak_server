import './utils/database_connection.js'

import ReservationRepository from "./repositories/Reservation.js";

let output = await ReservationRepository.getAllReservations()

console.log(output);