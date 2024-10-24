import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../styles/analytics.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Analytics = () => {
  const analyticsData = {
    revenue: 5500,
    orders: 125,
    aov: 100,
  };

  const membersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Members",
        data: [2000, 1800, 2500, 1500, 1200, 2000],
        borderColor: "#6525B3",
        backgroundColor: "#A558FF",
        tension: 0.2,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const participantData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Participant rate",
        data: [50, 100, 150, 125, 180, 40],
        backgroundColor: "#CE9CFF",
        borderRadius: 4,
      },
    ],
  };

  const pointEarnedData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total point earned",
        data: [2000, 4000, 3000, 1500, 1000, 8000],
        backgroundColor: "#9035FF",
      },
    ],
  };

  const pointRedeemedData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total point redeemed",
        data: [2000, 1500, 2500, 2000, 1000, 2500],
        borderColor: "#6525B3",
        backgroundColor: "#A558FF",
        tension: 0.2,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const referralData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Successful referrals",
        data: [2000, 800, 4000, 1800, 800, 6000, 7000, 7500, 7200, 7300],
        backgroundColor: "#9035FF",
      },
    ],
  };

  const gaugeData = {
    labels: ["Bad", "Medium", "Good"],
    datasets: [
      {
        data: [50, 50, 0],
        backgroundColor: ["#5500B3", "#e0e0e0", "#5500B3"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const referralOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value;
          },
          stepSize: 1000,
          min: 500,
          max: 9000,
        },
      },
    },
  };

  const gaugeOptions = {
    responsive: true,
    rotation: 270,
    circumference: 180,
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.analyticsContainer}>
      {/* First section: Program analytics */}
      <div className={styles.analyticsSection}>
        <div>
          <h2 className={styles.analyticsTitle}>Program analytics</h2>
          <p className={styles.analyticsSubtitle}>
            Here's what's happening in your rewards program
          </p>
        </div>

        <div className={styles.analyticsCards}>
          <div className={styles.analyticsCard}>
            <p className={styles.cardTitle}>Revenue influenced</p>
            <h3 className={styles.cardValue}>${analyticsData.revenue}</h3>
          </div>
          <div className={styles.analyticsCard}>
            <p className={styles.cardTitle}>Order influenced</p>
            <h3 className={styles.cardValue}>{analyticsData.orders}</h3>
          </div>
          <div className={styles.analyticsCard}>
            <p className={styles.cardTitle}>Average order value</p>
            <h3 className={styles.cardValue}>${analyticsData.aov}</h3>
          </div>
        </div>
      </div>

      {/* Second section: Program Engagement */}
      <div className={styles.programEngagement}>
        <h2 className={styles.analyticsTitle}>Program Engagement</h2>
        <div className={styles.analyticsCharts}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Members</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <Line data={membersData} options={options} />
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Participant rate</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <Bar data={participantData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Third section: Point Overview */}
      <div className={styles.pointOverview}>
        <h2 className={styles.analyticsTitle}>Point overview</h2>
        <div className={styles.analyticsCharts}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Total point earned</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <Bar data={pointEarnedData} options={options} />
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Total point redeemed</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <Line data={pointRedeemedData} options={options} />
          </div>
        </div>
      </div>

      {/* Fourth section: Referral Program */}
      <div className={styles.referralProgram}>
        <h2 className={styles.analyticsTitle}>Referral program</h2>
        <div className={styles.analyticsCharts}>
          <div className={styles.chartContainerBar}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Successful referrals</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <Bar data={referralData} options={referralOptions} />
          </div>
          <div className={styles.chartContainersBar}>
            <div className={styles.chartHeader}>
              <p className={styles.cardTitle}>Successful referrals</p>
              <select className={styles.dropdown}>
                <option>6 Months</option>
              </select>
            </div>
            <div className={styles.doughnutWrapper}>
              <Doughnut
                data={gaugeData}
                options={gaugeOptions}
                width={370}
                height={400}
              />
              <div className={styles.doughnutLabels}>
                <span className={styles.labelBad}>Bad</span>
                <span className={styles.labelMedium}>Medium</span>
                <span className={styles.labelGood}>Good</span>
              </div>
              <div className={styles.gaugeText}>
                <h4>50% Feedback engagement</h4>
                <p>50% Goal completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
