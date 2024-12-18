import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Define an interface for the journal type
interface Journal {
  createdAt: string;
  moodData: number[];
}

// Define props interface
interface LineChartProps {
  journals: Journal[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC<LineChartProps> = ({ journals }) => {
  const chartData = React.useMemo((): ChartData<"line"> => {
    const labels = journals.map((journal) =>
      new Date(journal.createdAt).toLocaleDateString()
    );

    const emotionSeries: number[][] = Array.from({ length: 6 }, () => []);

    journals.forEach((journal) => {
      journal.moodData.forEach((value, index) => {
        emotionSeries[index].push(value);
      });
    });

    return {
      labels,
      datasets: [
        {
          label: "Happiness",
          data: emotionSeries[0],
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
        {
          label: "Sadness",
          data: emotionSeries[1],
          borderColor: "rgba(153,102,255,1)",
          fill: false,
        },
        {
          label: "Disgust",
          data: emotionSeries[2],
          borderColor: "rgba(255,159,64,1)",
          fill: false,
        },
        {
          label: "Fear",
          data: emotionSeries[3],
          borderColor: "rgba(255,99,132,1)",
          fill: false,
        },
        {
          label: "Surprise",
          data: emotionSeries[4],
          borderColor: "rgba(54,162,235,1)",
          fill: false,
        },
        {
          label: "Anger",
          data: emotionSeries[5],
          borderColor: "rgba(255,206,86,1)",
          fill: false,
        },
      ],
    };
  }, [journals]);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Mood Progress Over Time" },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
