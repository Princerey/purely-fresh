import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const FreshnessChart = ({ items }) => {
    const getColor = (freshness, threshold) => {
        const percentage = freshness;
        if (percentage >= 75) return "#4caf50"; // Green
        if (percentage >= 50) return "#ffeb3b"; // Yellow
        if (percentage >= 25) return "#ff9800"; // Orange
        return "#f44336"; // Red
    };

    const data = {
        labels: items.map(item => item.name),
        datasets: [{
            data: items.map(item => item.freshness),
            backgroundColor: items.map(item => getColor(item.freshness, item.threshold)),
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // This allows the chart to scale with the container
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        const threshold = items[tooltipItem.dataIndex].threshold;
                        return `${label}: ${value}% (Shelf Life: ${threshold} days) `;
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-[600px] flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">Freshness Pie Chart</h2>
            <div style={{ width: '600px', height: '600px' }}> {/* Adjust the width and height as needed */}
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default FreshnessChart;
