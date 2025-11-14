namespace API.Models;

public class Tarefa
{
    public Tarefa()
    {
        TarefaId = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
        Status = "Não iniciada";
    }

    
    public string TarefaId { get; set; } = Guid.NewGuid().ToString();
    public string? Titulo { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public string? Status { get; set; } = "Não iniciada";
}
