import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import './progress.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const Progress = () => {
    const [goal, setGoal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [monthlyProgress, setMonthlyProgress] = useState([]);

    const updateProgress = () => {
        if (goal === 0) return;

        setMonthlyProgress((prevProgress) => [
            ...prevProgress,
            { month: new Date().toLocaleString('default', { month: 'short' }), value: amount },
        ]);
    };

    const chartData = {
        labels: monthlyProgress.map((item) => item.month),
        datasets: [
            {
                data: monthlyProgress.map((item) => item.value),
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#00d4ff',
                tension: 0.3, // Suaviza as linhas do gráfico
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // 🔥 REMOVE A LEGENDA COMPLETAMENTE
            },
            tooltip: {
                callbacks: {
                    label: (context) => `R$ ${context.raw.toLocaleString('pt-BR')}`,
                },
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    return (
        <div className="progress-container">
            <div className="goal-section">
                <h2>Metas Financeiras</h2>

                <div className="input-group">
                    <label>Meta Financeira</label>
                    <input
                        type="number"
                        value={goal}
                        onChange={(e) => setGoal(Number(e.target.value))}
                        placeholder="Digite sua meta"
                    />
                </div>

                <div className="input-group">
                    <label>Valor Atual</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Digite o valor atual"
                    />
                </div>

                <button onClick={updateProgress}>Atualizar Progresso</button>
            </div>

            <div className="chart-section">
                {monthlyProgress.length > 0 && (
                    <div className="chart-container">
                        <h3>Progresso da Meta</h3>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Progress;
