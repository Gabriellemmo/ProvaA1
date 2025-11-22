using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Registrar contexto (somente uma vez)
builder.Services.AddDbContext<AppDataContext>();

// Habilitar CORS
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

// Usar CORS antes dos endpoints
app.UseCors("Acesso Total");

app.MapGet("/", () => "GabrielLEMMO");

// ------------------- ENDPOINTS -------------------

// GET: http://localhost:5000/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
        return Results.Ok(ctx.Tarefas.ToList());

    return Results.NotFound("Nenhuma tarefa encontrada");
});

// POST: http://localhost:5000/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    // Validação básica
    if (string.IsNullOrWhiteSpace(tarefa.Titulo))
        return Results.BadRequest("Título da tarefa é obrigatório");

    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created($"/api/tarefas/{tarefa.TarefaId}", tarefa);
});

// PUT: http://localhost:5000/api/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId == id);

    if (tarefa == null)
        return Results.NotFound($"Tarefa com ID {id} não encontrada");

    // Lógica simplificada de alteração de status
    tarefa.Status = tarefa.Status switch
    {
        "Não iniciada" => "Em andamento",
        "Em andamento" => "Concluída",
        "Concluída" => "Não iniciada", // Opcional: permite ciclar
        _ => "Não iniciada"
    };

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

// DELETE: http://localhost:5000/api/tarefas/remover/{id}
app.MapDelete("/api/tarefas/remover/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId == id);

    if (tarefa == null)
        return Results.NotFound($"Tarefa com ID {id} não encontrada");

    ctx.Tarefas.Remove(tarefa);
    ctx.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Titulo}' removida com sucesso");
});

// GET: http://localhost:5000/api/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Where(t => t.Status != "Concluída")
        .ToList();

    if (!tarefas.Any())
        return Results.NotFound("Nenhuma tarefa não concluída encontrada");

    return Results.Ok(tarefas);
});

// GET: http://localhost:5000/api/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Where(t => t.Status == "Concluída")
        .ToList();

    if (!tarefas.Any())
        return Results.NotFound("Nenhuma tarefa concluída encontrada");

    return Results.Ok(tarefas);
});

// GET: http://localhost:5000/api/tarefas/{id} - Buscar por ID
app.MapGet("/api/tarefas/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId == id);

    if (tarefa == null)
        return Results.NotFound($"Tarefa com ID {id} não encontrada");

    return Results.Ok(tarefa);
});

app.Run();