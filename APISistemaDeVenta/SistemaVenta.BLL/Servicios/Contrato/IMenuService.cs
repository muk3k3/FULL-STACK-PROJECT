using System;
using System.Collections.Generic;
using System.Text;
using SistemaVenta.DTO;

namespace SistemaVenta.BLL.Servicios.Contrato
{
    public interface IMenuService
    {
        Task<List<MenuDTO>> Lista(int idUsuario);
    }
}
