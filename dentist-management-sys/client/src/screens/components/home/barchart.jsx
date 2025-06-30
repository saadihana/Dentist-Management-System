import { BarChart, Bar, XAxis, Tooltip,Cell, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/barchart.css'

const PatientsPerDayChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients-per-day'); // Adjust the endpoint as needed
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const colors = ['#8B9467', '#3498DB', '#F7DC6F', '#E74C3C', '#2ECC71', '#9B59B6', '#1ABC9C'];

    return (
        <ResponsiveContainer width="30%" height={200}>
            {/* <h6>Patients de la semaine</h6> */}
            <BarChart className="bar-chart" data={data}>
                <XAxis dataKey="Day"/>
                {/* <YAxis/> */}
                <Tooltip/>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Bar dataKey="count" fill="#34f23a" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PatientsPerDayChart;
