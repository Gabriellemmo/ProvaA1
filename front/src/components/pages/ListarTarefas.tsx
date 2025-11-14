import { useState } from "react";
import Tarefa from "../../models/Tarefa";  
import "./ListarTarefas.css";
function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  return (
    <div className="listar-tarefas">
      <h2>Listar Tarefas</h2>
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

export default ListarTarefas;
