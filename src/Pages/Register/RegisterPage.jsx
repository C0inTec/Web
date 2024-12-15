import React from "react";
import './registro.css'
import { useNavigate } from "react-router-dom";


function Registro (){

    return(

        <div className="container"> 
            <form>
            <h1 className="titulo">Cadastro</h1>

                <div className="campoLogin">
                 <input type="email" placeholder="Email"/>
                 </div>

                 <div className="campoSureLogin">
                 <input type="email" placeholder="Confirmar email"/>
                 </div>
 
                 <div className="campoSenha" >
                 <input type="password" placeholder="Senha"/>
                 </div>

                 <div className="campoSureSenha" >
                 <input type="password" placeholder="Confirmar Senha"/>
                 </div>
                    
                    <div>

                    <label className="aceiteTermos">
                         <input type="checkbox"></input>
                         Aceite os termos 
                     </label>

                    </div>


                 <button className="botao" >Cadastre-se </button>

            </form>
          
        </div>
    )
}

export default Registro;