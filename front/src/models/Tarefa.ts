// models/tarefa.ts
export interface Tarefa {
  tarefaId: string;
  titulo: string;
  criadoEm: string; // ← camelCase para bater com a API
  status: string;
}