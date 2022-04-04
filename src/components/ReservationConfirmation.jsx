import React from 'react'
import {cancelable, totalPrice} from '../services/Functions'
import dayjs from 'dayjs'

const ReservationConfirmation = ( { reservation, suite }) => {
  return (
    <div>
                 <p>Souhaitez vous confirmer votre reservation ?</p>
                <p>Du { dayjs(reservation.startDate).format('DD/MM/YYYY') } au { dayjs(reservation.endDate).format('DD/MM/YYYY') } </p>
                <p>
                    <span className="fw-bold">Tarif : {suite.price*(dayjs(reservation.endDate).diff( dayjs(reservation.startDate) , "d"))} Euros </span>
                    pour { dayjs(reservation.endDate).diff( dayjs(reservation.startDate) , "d") } nuitée(s)
                </p>
    </div>
  )
}

export default ReservationConfirmation