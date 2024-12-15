import React from "react";
import './login.css'
import { useNavigate } from "react-router-dom";





function Login (){
      
    const irPara  = useNavigate();

    return(
        <>
        <div className="container">
       

        <h1 className="titulo"> CoinTech </h1>

        
              <form>
                 <h1>Login</h1>
                 <div className="campoLogin">
                 <input type="email" placeholder="Email"/>
               
                 </div>
 
                 <div className="campoSenha" >
                 <input type="password" placeholder="Senha"/>
                 </div>
 
                 <div className="recall-forget">
                     <label>
                         <input type="checkbox"></input>
                         Lembrar de mim
                     </label>
                 <a href="#"> Esqueceu a senha ?</a>
                 </div>
                 <button className="botao">Entrar</button>
 
                 <div className="linkcadastro">
                     <p>Não tem uma conta ?    <a href="#" onClick={() => {irPara("/Registro")}}> Registre-se</a>
                     </p>
                 </div>
             </form>
        </div>
       
        </>
    
    

    )


    }



export default Login;
