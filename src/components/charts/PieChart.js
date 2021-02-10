import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {

    const {values} = props;
    if(values !== null){
        var valuesArray = [values.redMarker,values.yallowMarker,values.greenMarker];
    }

    const data = {
        labels : ['Points de collecte rouges','Points de collecte jaunes','Points de collecte vertes'],
        datasets : [
            {
                label : "Nombre des points de collecte",
                data : valuesArray,
                backgroundColor: [
                    'rgba(230, 82, 82, 1)',
                    'rgba(251, 233, 57, 1)',
                    'rgba(74, 179, 25, 1)'
                ]
            }
        ]
    };

    const options = {
        title : {
            display: true,
            text: 'Pie Chart'
        }
    }
    return (
        <div>
            <Pie data={data} options={options} width={40} height={34} />
        </div>
    )
}

export default PieChart
