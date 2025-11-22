import { useState } from "react";
import axios from "axios";
import { Tarefa } from "../models/tarefa";
import '../App.css';

export default function CadastrarTarefas() {
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function cadastrarTarefaAPI(e: React.FormEvent) {
    e.preventDefault();
    
    if (!titulo.trim()) {
      setMensagem("Por favor, digite um título para a tarefa.");
      return;
    }

    try {
      setLoading(true);
      setMensagem("");

      const novaTarefa: Partial<Tarefa> = {
        titulo: titulo.trim(),
        status: "Não iniciada" // Será definido automaticamente pelo backend
      };

      await axios.post("http://localhost:5000/api/tarefas/cadastrar", novaTarefa);
      
      setMensagem("Tarefa cadastrada com sucesso!");
      setTitulo(""); // Limpa o campo após cadastro
      
      // Opcional: Recarregar a lista de tarefas se necessário
      // buscarTarefasAPI();
      
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      setMensagem("Erro ao cadastrar tarefa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="cadastrar-tarefas">
      <h1>Cadastrar Nova Tarefa</h1>

      <form onSubmit={cadastrarTarefaAPI} className="form-cadastro">
        <div className="campo-group">
          <label htmlFor="titulo">Título da Tarefa:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da tarefa..."
            disabled={loading}
            maxLength={100}
          />
        </div>

        <button 
          type="submit" 
          className="btn-cadastrar"
          disabled={loading || !titulo.trim()}
        >
          {loading ? "Cadastrando..." : "Cadastrar Tarefa"}
        </button>

        {mensagem && (
          <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}