import dayjs from 'dayjs'

export const alreadySelected = (array, search ) => {
    let selected = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i].title === search.title) {
            return false;
        }
    }
    return selected;
}



// couleur du titre dans la liste des Recettes
export const textColorBS = ($isPublished, $isPublic) => {
    if(!$isPublished) {
        return "text-danger"
    }else{
        if(!$isPublic) {
            return "text-primary"
        }else{
            return "text-success"
        }
    }
}


export const  ArrayAvgNote = (myArray) => {
    var i = 0, summ = 0, ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++].note;
}
    return summ * 20  / ArrayLen ;
}


export const addDaysToDate = (date, days) =>{
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}


export const booked = (startDateFilter, endDateFilter, reservations) => {
    let isBooked = false
    reservations.forEach(reservation => { 
        //console.log(Date.parse(startDateFilter), Date.parse(endDateFilter));
        if( (Date.parse(reservation.startDate) < Date.parse(startDateFilter)&& Date.parse(startDateFilter) < Date.parse(reservation.endDate))
            ||
            (Date.parse(reservation.startDate) < Date.parse(endDateFilter)&& Date.parse(endDateFilter) < Date.parse(reservation.endDate))
        )
          {
            isBooked = true;
          }  
    })
  
    return isBooked;
}

export const cancelable = ($startDate) => {
    const today =  dayjs();
    const dateMax = dayjs($startDate).subtract(3,'days');
    
    return (today < dateMax)  
}


export const totalPrice = ($reservation) => {
    const start = dayjs($reservation.startDate);
    const end = dayjs($reservation.endDate);
    const numberOfDays = end.diff( start , "d")
    return $reservation.suite.price * numberOfDays
}