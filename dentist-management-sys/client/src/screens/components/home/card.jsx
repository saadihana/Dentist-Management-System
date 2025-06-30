import '../../styles/card.css'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Card(props){
    const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(true);
    useEffect(() => {

        const getCount = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/total/'+props.title);
            setCount(response.data[0].count);
            setLoading(false);
          } catch (err) {
            // setError('Failed to fetch patients');
            setLoading(false);
            console.error('Error fetching Patients:', err);
          }
        };
        // if(props.title=='Rendez-vous'){
            getCount();
        // }
      }, []);
    // if(props.title=='Rendez-vous'){
    //     getCount();
    // }
    if (loading) return <div>Loading Patients...</div>;
    return(
        <div className="card" style={{backgroundColor:props.color}}>
            <div>
                <p>{props.title}</p>
                <p>{count??0}</p>
            </div>
            <img src={props.image} alt="" id='icon'/>
        </div>
    )
}

export default Card