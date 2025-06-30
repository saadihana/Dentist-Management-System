import "../../styles/dayCount.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DayCount(){
    const [count , setCount]= useState([]);
    useEffect(()=>{
        const fetchTodayCount = async ()=>{
            const response = await axios.get('http://localhost:5000/api/getRdvToday');
            setCount(response.data.reverse());
        };
        fetchTodayCount();
    })
    return(
        <div id="day-count">
            {count.map((item)=>{
                if(item.gender!=='total'){
                    return (
                        <span>
                            <p>{item.gender}</p>
                            <p>{item.count}</p>
                        </span>
                    )
                }else{
                    return(
                        <span>
                            <p>Patients en attente</p>
                            <p>{item.count}</p>
                        </span>
                    )
                }
            })}
        </div>
    )
}

export default DayCount;