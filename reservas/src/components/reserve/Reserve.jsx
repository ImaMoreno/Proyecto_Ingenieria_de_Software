import React, { useState, useContext } from 'react';
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch.js'
import { SearchContext } from '../../context/SearchContext'

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`hotels/room/${hotelId}`)
    const[selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)


    const getDatesInRange = (startDate, endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        const dates = [];
        while(date <= end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+ 1);
        }

        return dates;
    };

    const allDates= getDatesInRange(dates[0].startDate,dates[0].endDate);
    // const allDates = dates && dates[0] ? getDatesInRange(dates[0].startDate, dates[0].endDate) : [];

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date)=> 
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    } 

    const handleSelect= (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms, value]
            : selectedRooms.filter((item)=> item !== value)
        );
        
    }

    const handleClick = (e) =>{
        
    }
    
    return (
        <div className='reserve'>
            <div className='rContainer'>
                <FontAwesomeIcon
                icon={faCircleXmark}
                className='rClose'
                onClick={(e) => setOpen(false)}
                />
                <span>Seleccione habitaciones:</span>
                {data.map((item)=>(
        
                    <div className='rItem'>
                        <div className='rItemInfo'>
                            <div className='rTitle'>{item.title}</div>
                            <div className='rDesc'>{item.desc}</div>
                            <div className='rMax'>
                                Max. personas: <strong>{item.maxPeople}</strong>
                                </div>
                            <div className='rPrice'>{item.price}</div>
                        </div>
                        {item.roomNumbers.map((roomNumber)=>(
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" 

                                value={roomNumber._id} 
                                onChange={handleSelect}
                                disabled={!isAvailable(roomNumber)}
                                />
                            </div>
                        ))

                        }
                        

                    </div>
                ))}
                <button onClick={handleClick} className='rButton'>Reservar Ahora</button>
            </div>
        </div>
    )
}

export default Reserve;