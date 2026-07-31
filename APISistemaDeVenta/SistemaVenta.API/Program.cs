using SistemaVenta.IOC;

var builder = WebApplication.CreateBuilder(args);

// 1. Agregar servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.InyectarDependencias(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });

});

var app = builder.Build();

// 2. Habilitar Swagger en entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sistema Venta API v1");
        // Al establecer RoutePrefix en string.Empty, Swagger responderá en la raíz: http://localhost:5110/
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("NuevaPolitica");

app.UseAuthorization();

app.MapControllers();

app.Run();
