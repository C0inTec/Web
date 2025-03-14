import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import "../Dashboard/dashboard.css";


function Dashboard() {

    const [items, setItems] = useState([]); // Lista de dívidas e rendimentos
    const [form, setForm] = useState({ description: "", amount: "", type: "income" }); // Estado do formulário
    const [editingId, setEditingId] = useState(null); // ID do item sendo editado
  
    // Função para lidar com a submissão do formulário
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.description || !form.amount) return alert("Preencha todos os campos!");
      
      if (editingId) {
        // Salva as alterações no item
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingId ? { ...item, ...form } : item
          )
        );
        setEditingId(null); // Reseta o modo de edição
      } else{
        const newItem = { ...form, id: Date.now() }; // Adiciona um ID único
        setItems([...items, newItem]);
      }
     
      setForm({ description: "", amount: "", type: "income" }); // Reseta o formulário
    };
    
    const handleEdit = (id) => {
      const itemToEdit = items.find((item) => item.id === id);
      if (itemToEdit) {
        setForm(itemToEdit); // Preenche o formulário com os dados do item
        setEditingId(id); // Define o ID do item sendo editado
      }
    };

    // Função para deletar um item
    const handleDelete = (id) => {
      setItems(items.filter((item) => item.id !== id));
    };
  
    // Cálculo do saldo disponível
    const balance = items.reduce(
      (acc, item) =>
        item.type === "income" ? acc + parseFloat(item.amount) : acc - parseFloat(item.amount),
      0
    );
  
    return (
      <div className="form-container">
        <h1 className="form-container_title">Controle de Dívidas e Rendimentos</h1>
  
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="input">
          <input
            type="text"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Valor"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Montante</option>
            <option value="debt">Dívida</option>
          </select>
          <button type="submit" className="button_add">
            {editingId? "Salvar ": "Adicionar"}
          </button>
        </form>
  

        {/* Lista de dívidas e rendimentos */}
        <ul className="table-container">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div>
                <p className="font-medium">{item.description}</p>
                <p
                className={`item-amount ${item.type === "income" ? "income" : "debt"}`}
               >
                  R$ {parseFloat(item.amount).toFixed(2)}
                </p>
              </div>
              <div className="icon-actions">
              <CiEdit 
              className="edit-icon"
              onClick={()=> handleEdit(item.id)}
              title="Editar"/>

              <BsTrashFill
              className="remove-icon"
              onClick={() => handleDelete(item.id)}
              title="Remover"
  />
              </div>

            </li>
          ))}
        </ul>
  
        {/* Saldo disponível */}
        <div>
          <h2 className="text-lg font-bold">Saldo disponível:</h2>
          <p
            className={`saldo_disponivel ${ balance >= 0 ? "positive" : "negative"}`}
          >
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }


export default Dashboard;
