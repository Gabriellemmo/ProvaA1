import { useState } from "react";
import Tarefa from "../../models/Tarefa";   
        import "./Cadastrartarefas.css";

        function CadastrarTarefas() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
      descricao,
      concluida: false,
    };
    setTarefas([...tarefas, novaTarefa]);
    setTitulo("");
    setDescricao("");
  };

  return (
    <div className="cadastrar-tarefas">
      <h2>Cadastrar Tarefas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastrarTarefas;
