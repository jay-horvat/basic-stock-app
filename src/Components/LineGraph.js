import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const LineGraph = ({historyData}) => {

  const datesArray = historyData.map(({ timestamp }) => timestamp);
  const priceArray = historyData.map(({ close }) => close);
  
  datesArray.reverse();

  const chartData = {
    labels: datesArray,  
    datasets: [
      {
        label: 'Stock Price',
        data: priceArray,  
        fill: false,
        backgroundColor: 'rgba(250,250,250,1)',
        borderColor: 'rgba(2,2,1,1)',
      },
    ],
  };

    const chartOptions = {
            plugins: {
            title: {
                display: true,
                text: 'Price History',
                font: {
                size: 18,
                family: 'Arial',
                weight: 'bold',
                color: 'black'
                }
            },

            legend: {
                display: false,
                },
          },
          elements: {
            backgroundColor: 'rgba(250, 250, 250, 1)',
        }

      };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineGraph;