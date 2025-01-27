import React, { useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig"; // Certifique-se do caminho correto.

function Login() {
  const [email, setEmail] = useState(""); // Estado para o email
  const [password, setPassword] = useState(""); // Estado para a senha
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [rememberMe, setRememberMe] = useState(false); // Lembrar de mim (opcional)
  const navigate = useNavigate();

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Realiza login com Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);

      // Redirecionar para outra página após login bem-sucedido
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao fazer login:", err);

      // Tratamento de erros específicos do Firebase Authentication
      switch (err.code) {
        case "auth/user-not-found":
          setError("Usuário não encontrado. Verifique o email digitado.");
          break;
        case "auth/wrong-password":
          setError("Senha incorreta. Por favor, tente novamente.");
          break;
        case "auth/invalid-email":
          setError("Formato de email inválido. Verifique e tente novamente.");
          break;
        default:
          setError("Erro ao fazer login. Por favor, tente novamente mais tarde.");
          break;
      }
    }
  };

  return (
    <>
   
      <div className="container">
        <h1 className="titulo">CoinTech</h1>

        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe mensagem de erro */}

          <div className="campoLogin">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
              required
            />
          </div>

          <div className="campoSenha">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
              required
            />
          </div>

          <div className="recall-forget">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} // Atualiza o estado de "Lembrar de mim"
              />
              Lembrar de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>

          <button className="botao" type="submit">
            Entrar
          </button>

          <div className="linkcadastro">
            <p>
              Não tem uma conta?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Previne o comportamento padrão do link
                  navigate("/registro"); // Redireciona para a página de registro
                }}
              >
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
