import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WalletPage.css';

const WalletPage = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState({
    despesas: { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
    ganhos: { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
    investimento: { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  // Configuração do Axios com useCallback
  const api = useCallback(() => {
    const instance = axios.create({
      baseURL: 'https://fc4e-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  // Função para carregar a carteira do usuário
  const loadWallet = useCallback(async () => {
    try {
      console.log("Fazendo requisição para carregar a carteira...");
      const response = await api().get(`/wallet?userId=${userId}`);
      console.log("Resposta do servidor:", response.data);

      if (response.data) {
        setWalletData({
          despesas: response.data.despesas || { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
          ganhos: response.data.ganhos || { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
          investimento: response.data.investimento || { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
        });
      }
    } catch (err) {
      console.error("Erro ao carregar a carteira:", err);
      if (err.response?.status === 404) {
        // Se a carteira não existir, cria uma nova
        await handleCreateWallet();
      } else {
        setError(`Erro: ${err.message} - Verifique sua conexão`);
      }
    } finally {
      setLoading(false); // Garante que o loading seja definido como false
    }
  }, [api, userId]);

  // Função para criar uma nova carteira
  const handleCreateWallet = useCallback(async () => {
    try {
      const newWallet = {
        userId: Number(userId), // Usar o userId recuperado
        despesas: { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
        ganhos: { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
        investimento: { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
      };

      console.log("Enviando payload para criar carteira:", newWallet);

      // Usar PUT para criar/atualizar a carteira
      const response = await api().put('/wallet', newWallet);

      console.log("Resposta do servidor:", response.data);

      setWalletData({
        despesas: response.data.despesas || { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
        ganhos: response.data.ganhos || { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
        investimento: response.data.investimento || { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
      });
    } catch (err) {
      console.error("Erro ao criar carteira:", err);
      setError(`Erro ao criar carteira: ${err.message}`);
    } finally {
      setLoading(false); // Garante que o loading seja definido como false
    }
  }, [api, userId]);

  // Carregar a carteira ao montar o componente
  useEffect(() => {
    if (userId) {
      loadWallet();
    }
  }, [userId, loadWallet]);

  // Função para lidar com mudanças nos inputs
  const handleChange = (e, category) => {
    const { name, value } = e.target;
    setWalletData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: parseFloat(value) || 0 // Converte o valor para número ou usa 0 se for inválido
      }
    }));
  };

  // Função para salvar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userId: Number(userId), // Usar o userId recuperado
        despesas: walletData.despesas,
        ganhos: walletData.ganhos,
        investimento: walletData.investimento
      };

      console.log("Payload enviado:", payload); // Depuração

      // Usar PUT para atualizar a carteira
      const response = await api().put('/wallet', payload);
      console.log("Resposta do servidor:", response.data); // Depuração

      alert('Alterações salvas com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError('Erro ao salvar: ' + (err.response?.data?.message || err.message));
    }
  };

  // Exibir loading enquanto os dados são carregados
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="wallet-page">
      <header className="wallet-header">
        <h1 className="wallet-title">
          {walletData ? 'Sua Carteira Financeira' : 'Nova Carteira'}
        </h1>
        {error && <p className="error-message">{error}</p>}
      </header>

      {walletData ? (
        <form onSubmit={handleSubmit} className="wallet-form">
          {/* Seção de Despesas */}
          <section className="section-container">
            <h2 className="section-title">Despesas</h2>
            <div className="input-grid">
              {Object.entries(walletData.despesas || {}).map(([key, value]) => (
                <div key={key} className="input-group">
                  <label className="input-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, 'despesas')}
                    className="glow-input"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Ganhos */}
          <section className="section-container">
            <h2 className="section-title">Ganhos</h2>
            <div className="input-grid">
              {Object.entries(walletData.ganhos || {}).map(([key, value]) => (
                <div key={key} className="input-group">
                  <label className="input-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, 'ganhos')}
                    className="glow-input"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Investimentos */}
          <section className="section-container">
            <h2 className="section-title">Investimentos</h2>
            <div className="input-grid">
              {Object.entries(walletData.investimento || {}).map(([key, value]) => (
                <div key={key} className="input-group">
                  <label className="input-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, 'investimento')}
                    className="glow-input"
                  />
                </div>
              ))}
            </div>
          </section>

          <button type="submit" className="glow-button">
            Salvar Alterações
          </button>
        </form>
      ) : (
        <div className="no-wallet-container">
          <h2 className="no-wallet-title">Carteira não encontrada</h2>
          <button className="create-button" onClick={handleCreateWallet}>
            Criar Nova Carteira
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletPage;