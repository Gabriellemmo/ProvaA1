import React from 'react';
import logo from './logo.svg';
import './App.css';
import CadastrarTarefas from './components/pages/Cadastrartarefas';
import ListarTarefas from './components/pages/ListarTarefas';
function App() {
  return (
    <div className="App">
      <CadastrarTarefas />
      <ListarTarefas />
    </div>
  );
}

export default App;
