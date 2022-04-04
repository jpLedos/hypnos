import React, {useState} from 'react'
import {addDaysToDate, booked} from '../services/Functions'
import dateFormat from "dateformat"

const FilterDates = ({startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter }) => {

    const $dayMax = addDaysToDate(Date(),90);

    const handleChangeStartDate = (e) => {
        setStartDateFilter(e.target.value);
        setEndDateFilter(addDaysToDate(e.target.value,1));
    }
    
    const handleChangeEndDate = (e) => {
        setEndDateFilter(e.target.value);
    }

  return (
    <div className="d-md-flex date-filter-container text-center justify-content-center">
    DU <input   className = "date-filter" 
                onChange={(e)=>handleChangeStartDate(e)} 
                value={dateFormat(startDateFilter,"yyyy-mm-dd")} 
                min={ dateFormat(Date(),"yyyy-mm-dd") } 
                max= { dateFormat($dayMax,"yyyy-mm-dd") }
                id="startDateFilter" 
                type="date" />
    &nbsp; AU  &nbsp;
        <input 
                className = "date-filter" 
                onChange={(e)=>handleChangeEndDate(e)} 
                value={dateFormat(endDateFilter,"yyyy-mm-dd")} 
                min={ dateFormat(addDaysToDate(startDateFilter,1),"yyyy-mm-dd") } 
                max= { dateFormat(addDaysToDate(startDateFilter,7),"yyyy-mm-dd") }
                id="endDateFilter"
                type="date" />     
</div>
  )
}

export default FilterDates