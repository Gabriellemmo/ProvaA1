import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListarTarefas from "./components/listar-tarefa";
import CadastrarTarefas from "./components/cadastrar-tarefas"; // ← Importe o novo componente
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tarefas">Listar Tarefas</Link></li>
          <li><Link to="/tarefas/cadastrar">Cadastrar Tarefas</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ListarTarefas />} />
        <Route path="/tarefas" element={<ListarTarefas />} />
        <Route path="/tarefas/cadastrar" element={<CadastrarTarefas />} /> {/* ← Adicione esta linha */}
      </Routes>

      <footer>Desenvolvimento Web Gabriel Lemmo</footer>
    </BrowserRouter>
  );
}

