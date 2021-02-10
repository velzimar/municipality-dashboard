import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {

    const data = {
        labels : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Décembre'],
        datasets : [
            {
                label : "Nombre des points de collecte rouges",
                data : [7,2,4,2,5,4,5,0,1,4,6,2],
                borderColor : 'rgba(230, 82, 82, 1)',
                backgroundColor : 'rgba(230, 82, 82, 0.2)',
                pointBackgroundColor : 'rgba(230, 82, 82, 0.2)',
                pointBorderColor : 'rgba(230, 82, 82, 1)'
            },
            {
                label : "Nombre des points de collecte jaunes",
                data : [1,0,8,4,7,2,1,3,2,5,9,0],
                borderColor : 'rgba(251, 233, 57, 1)',
                backgroundColor : 'rgba(251, 233, 57, 0.2)',
                pointBackgroundColor : 'rgba(251, 233, 57, 0.2)',
                pointBorderColor : 'rgba(251, 233, 57, 1)'
            },
            {
                label : "Nombre des points de collecte vertes",
                data : [9,5,3,0,1,4,7,8,0,2,4,6],
                borderColor : 'rgba(74, 179, 25, 1)',
                backgroundColor : 'rgba(74, 179, 25, 0.2)',
                pointBackgroundColor : 'rgba(74, 179, 25, 0.2)',
                pointBorderColor : 'rgba(74, 179, 25, 1)'
            }

        ]
    };

    const options = {
        title : {
            display: true,
            text: 'Line Chart'
        }
    };
    return (
        <div>
            <Line data={data} options={options} width={40} height={30.5}/>
        </div>
    )
}

export default LineChart
