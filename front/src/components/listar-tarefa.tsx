import { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../models/tarefa";
import '../App.css';


export default function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarTarefasAPI();
  }, []);

  async function buscarTarefasAPI() {
    try {
      setLoading(true);
      const resposta = await axios.get("http://localhost:5000/api/tarefas/listar");
      setTarefas(resposta.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  }

  async function alterarStatus(id: string) {
    try {
      await axios.put(`http://localhost:5000/api/tarefas/alterar/${id}`);
      buscarTarefasAPI();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  }

  async function deletarTarefa(id: string) {
    try {
      await axios.delete(`http://localhost:5000/api/tarefas/remover/${id}`);
      buscarTarefasAPI();
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  }

  function formatDate(dateString?: string) {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleString();
  }

  return (
    <div id="listar-tarefas">
      <h1>Listar Tarefas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <div className="container-tabela">
          <table className="tabela-tarefas">

            <thead>
              <tr className="linha-header">
                <th>ID</th>
                <th>Título</th>
                <th>Status</th>
                <th>Criado Em</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {tarefas.map((t) => (
                <tr key={t.tarefaId}>
                  <td className="celula-id">{t.tarefaId}</td>
                  <td>{t.titulo}</td>
                  <td>{t.status}</td>
                  <td>{formatDate(t.criadoEm)}</td>

                  <td>
                    <button className="btn-alterar" onClick={() => alterarStatus(t.tarefaId)}>
                      Alternar status
                    </button>

                    <button
                      className="btn-deletar"
                      onClick={() => {
                        if (window.confirm("Deseja realmente deletar esta tarefa?")) {
                          deletarTarefa(t.tarefaId);
                        }
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
