import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components from Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ moodData }: { moodData: number[] }) => {
  const data = {
    labels: ["Happiness", "Sadness", "Disgust", "Fear", "Surprise", "Anger"],
    datasets: [
      {
        label: "Today's Mood",
        data: [
          moodData[0],
          moodData[1],
          moodData[2],
          moodData[3],
          moodData[4],
          moodData[5],
        ], // Sample data points
        backgroundColor: "rgba(34, 202, 236, 0.2)", // Transparent fill color
        borderColor: "rgba(34, 202, 236, 1)", // Border color of the radar chart
        borderWidth: 2,
        pointBackgroundColor: "rgba(34, 202, 236, 1)", // Color of the points on the chart
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
      r: {
        min: 0,
        max: 100,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curve
      },
    },
  };

  return (
    <div className="w-full h-96 mt-4">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
