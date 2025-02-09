import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './progress.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Progress = () => {
    const [goal, setGoal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [montlyProgress, setMontlyProgress] = useState([]);

    const updateProgress = () => {
        if (goal === 0) return;

        const progressPercentage = (amount / goal) * 100;
        setMontlyProgress((prevProgress) => [
            ...prevProgress,
            { month: new Date().toLocaleString('default', { month: 'short' }), progress: progressPercentage },
        ]);
    };

    const chartData = {
        labels: montlyProgress.map((item) => item.month),
        datasets: [
            {
                label: 'Progresso da Meta (%)',
                data: montlyProgress.map((item) => item.progress),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="progress-container">
            <h2>Metas Financeiras</h2>

            <div className="input-container">
                <label>Meta Financeira</label>
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Digite sua meta"
                />
            </div>

            <div className="input-container">
                <label>Valor Atual</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Digite o valor atual"
                />
            </div>

            <button className="update-button" onClick={updateProgress}>Atualizar Progresso</button>

            {montlyProgress.length > 0 && (
                <div className="chart-container">
                    <h3>Progresso da Meta</h3>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default Progress;
