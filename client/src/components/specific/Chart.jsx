import { Line, Doughnut } from "react-chartjs-2"
import { Chart as ChartJs, CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend } from "chart.js"
import { orange, orangeLight, purple, purpleLight } from "../../constants/color"
import { getLast7Days } from "../../lib/Features"

ChartJs.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend)
const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        }, y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
}
const LineChart = ({ value = [] }) => {
    const data = {
        labels,
        datasets: [{
            data: value,
            label: "Revenu",
            fill: true,
            backgroundColor: purpleLight,
            borderColor: purple
        }]
    }

    return <Line data={data} options={lineChartOptions} />
}
const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
    cutout: 120
}
const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [{
            data: value,
            fill: true,
            backgroundColor: [purpleLight, orangeLight],
            hoverBackgroundColor: [purple, orange],
            borderColor: [purple, orange],
            offset: 40
        }]
    };

    return <Doughnut style={{
        zIndex: 10
    }} data={data} options={doughnutChartOptions} />
}

export { LineChart, DoughnutChart }