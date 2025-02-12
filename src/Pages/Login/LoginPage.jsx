import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig"; // Certifique-se do caminho correto.

function Login() {
  const [isRegistering, setIsRegistering] = useState(false); // Alternar entre Login e Cadastro
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); // Apenas para cadastro
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para o popup
  const [error, setError] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  // Alternar entre Login e Cadastro
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(""); // Limpar erros ao alternar
  };

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("Usuário não encontrado.");
          break;
        case "auth/wrong-password":
          setError("Senha incorreta.");
          break;
        case "auth/invalid-email":
          setError("Formato de email inválido.");
          break;
        default:
          setError("Erro ao fazer login. Tente novamente.");
          break;
      }
    }
  };

  // Função para lidar com o cadastro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário cadastrado:", userCredential.user);
      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");

      setTimeout(()=> {
        setSuccessMessage("");
        navigate("/dashboard")
      }, 3000);

    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este email já está cadastrado.");
          break;
        case "auth/weak-password":
          setError("Senha muito fraca. Use pelo menos 6 caracteres.");
          break;
        default:
          setError("Erro ao cadastrar. Tente novamente.");
          break;
      }
    }
  };

  return (
    <div className="background-Login">
        <h1 className="titulo">CoinTech</h1>

      <div className="container-container">

      <div className="container">
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h1>{isRegistering ? "Cadastro" : "Login"}</h1>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="campoLogin">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campoSenha">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Campo de confirmação de senha apenas no cadastro */}
          {isRegistering && (
            <div className="campoSenha">
              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Opção "Lembrar de mim" no Login */}
          {!isRegistering && (
            <div className="recall-forget">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Lembrar de mim
              </label>
              <a href="#">Esqueceu a senha?</a>
            </div>
          )}

          {/* Botão de ação (Login ou Cadastro) */}
          <button className="botao" type="submit">
            {isRegistering ? "Cadastrar" : "Entrar"}
          </button>

          {/* Alternar entre Login e Cadastro */}
          <div className="linkcadastro">
            <p>
              {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
                {isRegistering ? "Fazer Login" : "Registre-se"}
              </a>
            </p>
          </div>
        </form>
      </div>
        
        {/* Popup de sucesso */}
      {successMessage && (
        <div className="popup">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
      </div>
  );
}

export default Login;
